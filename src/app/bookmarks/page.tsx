"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Bookmark, Loader2, ExternalLink, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion";

interface BookmarkItem {
  id: string;
  title: string;
  description: string;
  href: string;
  createdAt: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, loading } = useAuth();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (loading) return;
      
      if (!user) {
        setBookmarks([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const bookmarksRef = collection(db, "users", user.uid, "bookmarks");
        const q = query(bookmarksRef);
        const querySnapshot = await getDocs(q);
        
        const fetchedBookmarks: BookmarkItem[] = [];
        querySnapshot.forEach((doc) => {
          fetchedBookmarks.push(doc.data() as BookmarkItem);
        });
        
        // Sort by creation date (newest first)
        fetchedBookmarks.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setBookmarks(fetchedBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookmarks();
  }, [user, loading]);

  const removeBookmark = async (bookmarkId: string) => {
    if (!user) return;
    
    try {
      const bookmarkRef = doc(db, "users", user.uid, "bookmarks", bookmarkId);
      await deleteDoc(bookmarkRef);
      
      // Update local state
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <div className="container py-12 space-y-8">
      <motion.div 
        className="flex flex-col items-center text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <Bookmark className="inline-block mr-2 mb-1" />
          My Bookmarks
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {user 
            ? "Access your saved tools quickly from one place."
            : "Sign in to save and access your favorite tools."}
        </p>
      </motion.div>

      {loading || isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !user ? (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 space-y-4 text-center"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Bookmark className="h-16 w-16 text-muted-foreground/50" />
          <h2 className="text-xl font-medium">Sign in to view your bookmarks</h2>
          <p className="max-w-md text-muted-foreground">
            Create an account or sign in to save and access your favorite tools from any device.
          </p>
        </motion.div>
      ) : bookmarks.length === 0 ? (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 space-y-4 text-center"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Bookmark className="h-16 w-16 text-muted-foreground/50" />
          <h2 className="text-xl font-medium">No bookmarks yet</h2>
          <p className="max-w-md text-muted-foreground">
            Add tools to your bookmarks and they will appear here for quick access.
          </p>
          <Button asChild className="mt-2">
            <Link href="/tools">Browse Tools</Link>
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {bookmarks.map((bookmark, index) => (
            <motion.div
              key={bookmark.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{bookmark.title}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeBookmark(bookmark.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove bookmark</span>
                    </Button>
                  </div>
                  <CardDescription>{bookmark.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Added on {new Date(bookmark.createdAt).toLocaleDateString()}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" size="sm" className="w-full gap-2" asChild>
                    <Link href={bookmark.href}>
                      <ExternalLink className="h-4 w-4" />
                      <span>Use Tool</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
} 