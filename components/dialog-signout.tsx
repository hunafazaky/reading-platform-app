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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SignOutIcon } from "@phosphor-icons/react";

import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function DialogSignOut() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleSignOut = async () => {
    try {
      await api.delete("/users/signout");
    } catch (error) {
      console.error(
        "Backend sign out failed, clearing frontend anyway:",
        error,
      );
    } finally {
      clearAuth();
      router.push("/signform");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <SignOutIcon />
          Sign Out
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <SignOutIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Sign Out?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove access to your account in this device.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleSignOut}>
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
