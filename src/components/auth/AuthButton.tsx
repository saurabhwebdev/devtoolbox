"use client";

import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "./LoginModal";
import { UserMenu } from "./UserMenu";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthButton() {
  const { user, loading } = useAuth();

  // Show skeleton loader while auth state is loading
  if (loading) {
    return (
      <Skeleton className="h-8 w-20 rounded-md" />
    );
  }

  return user ? <UserMenu /> : <LoginModal />;
} 