"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookmarkButtonProps {
  toolId: string;
  toolTitle: string;
  toolDescription: string;
  toolHref: string;
}

export function BookmarkButton({ toolId, toolTitle, toolDescription, toolHref }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Load bookmark status when user is authenticated
    const checkBookmarkStatus = async () => {
      if (!user) {
        setIsBookmarked(false);
        return;
      }

      try {
        const bookmarkRef = doc(db, "users", user.uid, "bookmarks", toolId);
        const bookmarkDoc = await getDoc(bookmarkRef);
        setIsBookmarked(bookmarkDoc.exists());
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [user, toolId]);

  const toggleBookmark = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const bookmarkRef = doc(db, "users", user.uid, "bookmarks", toolId);
      
      if (isBookmarked) {
        // Remove bookmark
        await deleteDoc(bookmarkRef);
        setIsBookmarked(false);
      } else {
        // Add bookmark
        await setDoc(bookmarkRef, {
          id: toolId,
          title: toolTitle,
          description: toolDescription,
          href: toolHref,
          createdAt: new Date().toISOString()
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            disabled={isLoading}
            className="h-8 w-8"
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isBookmarked ? "Remove bookmark" : "Add bookmark"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 