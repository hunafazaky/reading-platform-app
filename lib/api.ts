const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function apiFetch(endpoint: string, options: RequestInit = {}) {
//   const url = `${BASE_URL}${endpoint}`;

//   // Berikan header default seperti Content-Type
//   const defaultHeaders = {
//     "Content-Type": "application/json",
//     ...options.headers,
//   };

//   const response = await fetch(url, {
//     ...options,
//     headers: defaultHeaders,
//   });

//   // Jika response error, lempar ke blok catch
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// }

import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { setCookie, deleteCookie } from "cookies-next";

export const api = axios.create({
  baseURL: BASE_URL,
  // baseURL: 'https://myapi.onrender.com/api',
  withCredentials: true, // Wajib agar cookie refresh token dari backend terkirim otomatis
});

// 1. Request Interceptor: Tempelkan Access Token otomatis jika ada
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Response Interceptor: Tangani refresh token saat mendapati error 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika error 401 (Unauthorized) dan request ini belum pernah dicoba ulang (_retry)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Panggil endpoint refresh backend (cookie refresh token otomatis terkirim)
        const response = await axios.post(
          `${BASE_URL}/refresh`,
          {},
          { withCredentials: true },
        );

        const { accessToken } = response.data;

        // Update token baru ke Zustand store
        useAuthStore
          .getState()
          .setAuth(accessToken, useAuthStore.getState().user!);

        // Tulis ulang flag cookie pendek untuk Next.js Middleware
        setCookie("is_logged_in", "true", { maxAge: 15 * 60 }); // 15 menit sesuaikan access token

        // Jalankan kembali request awal yang sempat gagal dengan token baru
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh token juga gagal/expired, hapus semua session dan tendang ke login
        useAuthStore.getState().clearAuth();
        deleteCookie("is_logged_in");
        window.location.href = "/signform";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
