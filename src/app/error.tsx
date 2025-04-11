"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    
    // Set a user-friendly error message
    setErrorMessage(
      error.message && error.message.length < 100
        ? error.message
        : "An unexpected error occurred"
    );
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-20 text-center">
      <div className="space-y-6 max-w-[600px]">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-destructive">Error</h1>
          <h2 className="text-3xl font-bold tracking-tight">Something went wrong</h2>
          <p className="text-xl text-muted-foreground">
            {errorMessage}
          </p>
        </div>
        
        <div className="h-[1px] w-full bg-border my-8" />
        
        <p className="text-muted-foreground">
          We apologize for the inconvenience. You can try to:
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild variant="outline">
            <a href="/">Go to homepage</a>
          </Button>
        </div>
      </div>
    </div>
  );
} 