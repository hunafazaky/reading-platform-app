"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { TrashIcon } from "@phosphor-icons/react";

// 1. IMPORT HEEPER DARI TANSTACK
import { useQueryClient } from "@tanstack/react-query";

export function DialogDeleteWork({ id }: { id: string }) {
  // 2. INISIALISASI QUERY CLIENT
  const queryClient = useQueryClient();

  const handleDeleteWork = async () => {
    try {
      // Hapus data di backend
      await api.delete(`/works/${id}`);

      // 3. KUNCI PERBAIKAN: Hancurkan cache lama agar TanStack otomatis fetch data baru
      // PENTING: Sesuaikan ['works'] dengan queryKey yang kamu pakai di useQuery daftar works kamu!
      queryClient.invalidateQueries({ queryKey: ["works"] });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-amber-600"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <TrashIcon />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <TrashIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Work?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete this work forever. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDeleteWork}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
