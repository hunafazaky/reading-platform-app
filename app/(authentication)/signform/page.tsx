"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

// START
export default function Authentication() {
  interface UserDataProps {
    email?: string;
    pen_name?: string;
    password?: string;
    password2?: string;
  }

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isSignIn, setIsSignIn] = useState(true);
  const [userData, setUserData] = useState<UserDataProps>({
    email: "",
    pen_name: "",
    password: "",
    password2: "",
  });
  // const [isSignIn, setIsSignIn] = useState(true);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFetch = async (route: string, userData: object) => {
    try {
      const res = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      console.log(`result data:`, result);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown Error Occured.";
      console.log(`Connection Failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // setLoading(true);

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password2, pen_name, ...cleanUserData } = userData;
    // console.log("Data yang siap dikirim ke API:", cleanUserData);
    // await handleFetch("/api/signin", cleanUserData);
    try {
      const response = await api.post("/users/signin", {
        email: userData.email,
        password: userData.password,
      });
      const { accessToken, user } = response.data;

      // 1. Simpan token & user ke Zustand (Client Memory)
      setAuth(accessToken, user);

      // 2. Buat cookie tipis non-HttpOnly agar terbaca oleh Next.js Middleware (Proteksi Rute)
      setCookie("is_signed", "true", { maxAge: 7 * 24 * 60 * 60 }); // 7D Refresh Token

      // 3. Redirect ke halaman utama
      router.push("/");
    } catch (error) {
      console.error("Login gagal:", error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (userData.password !== userData.password2) {
      setStatus("Password and Retype Password are different.");
      return;
    }

    console.log("Data yang siap dikirim ke API:", userData);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password2, ...cleanUserData } = userData;
    console.log("Data yang siap dikirim ke API:", cleanUserData);
    await handleFetch("/api/signup", cleanUserData);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh">
      <h1 className="text-2xl font-bold my-4">Reading Platform</h1>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {isSignIn ? "Get into your account" : "Create new account"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={isSignIn ? handleSignIn : handleSignUp}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  required
                />
              </div>

              {isSignIn ? (
                <section className="mb-2">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline opacity-70"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </section>
              ) : (
                <section className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Pen Name</Label>
                    <Input
                      id="pen_name"
                      type="text"
                      name="pen_name"
                      value={userData.pen_name}
                      onChange={handleChange}
                      placeholder="Your Pen Name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password2">Retype Password</Label>
                      <Input
                        id="password2"
                        type="password"
                        name="password2"
                        value={userData.password2}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <p className="ml-auto inline-block text-sm opacity-70">
                        Minimum 8 characters, including at least 1 uppercase
                        letter and 1 number.
                      </p>
                      <p className="text-red-400">{status}</p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
            <CardAction>
              Or
              <Button
                variant="link"
                onClick={() => setIsSignIn((prev) => !prev)}
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Button>
              {isSignIn ? "to create new account" : "to get into your account"}
            </CardAction>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
