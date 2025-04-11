import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-20 text-center">
      <div className="space-y-6 max-w-[600px]">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
          <p className="text-xl text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="h-[1px] w-full bg-border my-8" />
        
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
          <br />
          Here are some helpful links instead:
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tools">Developer Tools</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog">Blog</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 