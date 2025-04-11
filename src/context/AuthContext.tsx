"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged, signInWithGoogle as _signInWithGoogle, signOutUser as _signOutUser } from '@/lib/firebase';
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isFirebaseAvailable: boolean;
  signInWithGoogle: () => Promise<{ success: boolean; user?: User; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isFirebaseAvailable: false,
  signInWithGoogle: async () => ({ success: false, error: "Firebase not initialized" }),
  signOut: async () => ({ success: false, error: "Firebase not initialized" }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseAvailable, setIsFirebaseAvailable] = useState(false);
  
  // Safe wrapper for signInWithGoogle
  const signInWithGoogle = async () => {
    try {
      if (!isFirebaseAvailable) {
        toast.error("Firebase authentication is not available");
        return { success: false, error: "Firebase not initialized" };
      }
      
      const result = await _signInWithGoogle();
      if (!result.success) {
        toast.error("Failed to sign in with Google");
      }
      return result;
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Failed to sign in with Google");
      return { success: false, error };
    }
  };
  
  // Safe wrapper for signOut
  const signOut = async () => {
    try {
      if (!isFirebaseAvailable) {
        toast.error("Firebase authentication is not available");
        return { success: false, error: "Firebase not initialized" };
      }
      
      const result = await _signOutUser();
      if (!result.success) {
        toast.error("Failed to sign out");
      }
      return result;
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      return { success: false, error };
    }
  };

  useEffect(() => {
    try {
      // Check if Firebase is available by trying to use it
      const unsubscribe = onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
        setIsFirebaseAvailable(true);
      });
      
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase auth not initialized in AuthContext:", error);
      setLoading(false);
      setIsFirebaseAvailable(false);
      return () => {};
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isFirebaseAvailable, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 