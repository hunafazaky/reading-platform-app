"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

export default function EditPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. Ambil currentUser dan fungsi updateUser dari Zustand store
  const currentUser = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  // Form state
  const [userData, setUserData] = useState({
    email: currentUser?.email || "",
    pen_name: currentUser?.pen_name || "",
    photo: currentUser?.photo || "",
    bio: currentUser?.bio || "",
  });

  // 2. PERBAIKAN: Sinkronkan form jika data currentUser baru selesai dimuat
  // useEffect(() => {
  //   if (currentUser) {
  //     setUserData({
  //       email: currentUser.email || "",
  //       pen_name: currentUser.pen_name || "",
  //       photo: currentUser.photo || "",
  //       bio: currentUser.bio || "",
  //     });
  //   }
  // }, [currentUser]);

  // 3. Setup Mutation dengan TanStack Query
  const mutation = useMutation({
    mutationFn: async (updatedData: {
      // email?: string;
      pen_name: string;
      photo: string;
      bio: string;
    }) => {
      // Pastikan id user ada sebelum menembak API
      if (!currentUser?.id) throw new Error("User ID not found");

      const response = await api.patch(`/users/${currentUser.id}`, updatedData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // PERBAIKAN A: Update Zustand store secara lokal agar UI di seluruh app langsung berubah
      updateUser(variables);

      toast.success("User updated successfully!");

      // PERBAIKAN B: Invalidate cache TanStack Query jika ada komponen lain yang menggunakan query ini
      if (currentUser?.id) {
        queryClient.invalidateQueries({ queryKey: ["user", currentUser.id] });
      }

      router.push("/");
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error("Failed to update user. Please try again.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      // email: userData.email, // Masukkan email jika backend mengizinkan update email
      pen_name: userData.pen_name,
      photo: userData.photo,
      bio: userData.bio,
    });
  };

  return (
    <div className="min-h-3/4 relative">
      {mutation.isPending && (
        <div className="absolute bg-mist-900/60 w-full h-full flex justify-center items-center z-10">
          <Spinner className="size-8" />
        </div>
      )}
      <Toaster position="top-center" richColors />
      <form
        key={currentUser?.id || "loading"}
        onSubmit={handleUpdate}
        className="flex flex-col justify-center items-center min-h-4/5"
      >
        <FieldGroup className="lg:w-3/4 xl:w-2/3 mx-8">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              value={userData.email}
              placeholder="user@example.com"
              required
              disabled
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="pen_name">Pen Name</FieldLabel>
            <Input
              id="pen_name"
              type="text"
              name="pen_name"
              value={userData.pen_name}
              onChange={handleChange}
              placeholder="User Example"
              required
              disabled={mutation.isPending}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              placeholder="Type your bio here."
              className="h-50"
              disabled={mutation.isPending}
            />
          </Field>

          <Field orientation="horizontal">
            {/* Disable button jika user ID belum siap */}
            <Button
              type="submit"
              disabled={mutation.isPending || !currentUser?.id}
            >
              {mutation.isPending ? "Updating..." : "Update User"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
