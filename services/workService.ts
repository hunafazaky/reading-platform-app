// src/services/workService.ts
import { api } from "@/lib/api";

export const getWorks = async () => {
  const response = await api.get("/works");
  return response.data; // Mengembalikan data array dari backend
};

export const postWork = async (req: Request) => {
  const response = await api.post("/works", req.body);
  return response.data; // Mengembalikan data array dari backend
};
