"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import SelectCategories from "@/components/select-categories";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

// START
export default function Authentication() {
  interface WorkDataProps {
    title?: string;
    body?: string;
  }

  const router = useRouter();
  const [workData, setWorkData] = useState<WorkDataProps>({
    title: "",
    body: "",
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setWorkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleErrorMessage = (error: AxiosError) => {
    // let message;
    // switch (error.status) {
    //     case 401:
    //         message = "Email or Password incorrect.";
    //         break;
    //     case 429:
    //         message = "Too many requests. Please try again later.";
    //         break;
    //     default:
    //         message =
    //             "An unexpected error occurred. Please try again later.";
    // }
    // toast.error(error.stringify());
    console.log(error);
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/works", {
        title: workData.title,
        body: workData.body,
        categories: selectedCategories,
      });
      const work = response.data;
      console.log(work);
      toast.success("New Work Created.");
      router.push("/");
    } catch (error) {
      handleErrorMessage(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-3/4">
      {loading && (
        <div className="absolute bg-mist-900/60 w-full h-full flex justify-center items-center z-10">
          <Spinner className="size-8" />
        </div>
      )}
      <Toaster position="top-center" richColors />
      <form
        onSubmit={handlePost}
        className="flex flex-col justify-center items-center min-h-4/5"
      >
        <FieldGroup className="lg:w-3/4 xl:w-2/3 mx-8">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              type="text"
              name="title"
              value={workData.title}
              onChange={handleChange}
              placeholder="Make sure the title is unique."
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="body">Body</FieldLabel>
            <Textarea
              id="body"
              name="body"
              value={workData.body}
              onChange={handleChange}
              placeholder="Type your writings here."
              className="h-50 "
            />
          </Field>
          <Field className="flex flex-col gap-1">
            <FieldLabel className="font-semibold text-sm">
              Categories
            </FieldLabel>
            <SelectCategories
              value={selectedCategories}
              onChange={setSelectedCategories}
            />
          </Field>

          {/* Temp debug untuk melihat isi state array of string kamu */}
          <p className="text-xs text-gray-400">
            State selectedCategories: {JSON.stringify(selectedCategories)}
          </p>
          <Field orientation="horizontal">
            <Button type="submit">Post</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
