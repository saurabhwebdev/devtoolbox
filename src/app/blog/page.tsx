"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogIndexPage() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for the eyes
  const firstEyeRef = useRef<HTMLDivElement>(null);
  const secondEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateEyePosition = (eyeRef: React.RefObject<HTMLElement>, eyeIndex: number) => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    
    const eye = eyeRef.current;
    const eyeRect = eye.getBoundingClientRect();
    
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    // Calculate distance from eye center to mouse
    const distX = mousePosition.x - eyeCenterX;
    const distY = mousePosition.y - eyeCenterY;
    
    // Limit movement to 30% of eye size
    const maxMove = eyeRect.width * 0.3;
    const distance = Math.sqrt(distX * distX + distY * distY);
    const angle = Math.atan2(distY, distX);
    
    const moveDistance = Math.min(distance, maxMove);
    const moveX = (moveDistance * Math.cos(angle)) / maxMove;
    const moveY = (moveDistance * Math.sin(angle)) / maxMove;
    
    return { x: moveX * 30, y: moveY * 30 };
  };

  // Calculate position for each eye
  const firstEyePosition = calculateEyePosition(firstEyeRef as React.RefObject<HTMLElement>, 0);
  const secondEyePosition = calculateEyePosition(secondEyeRef as React.RefObject<HTMLElement>, 1);

  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.h1 
          className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-700 to-black">
            DevT
            <span className="relative inline-flex items-center justify-center">
              <motion.span
                ref={firstEyeRef}
                className="inline-block relative mx-[0.05em]"
                style={{ width: '0.7em', height: '0.7em' }}
              >
                {/* Outer eye */}
                <motion.span 
                  className="absolute inset-0 rounded-full bg-black"
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                {/* Iris */}
                <motion.span 
                  className="absolute inset-[15%] rounded-full bg-gray-800"
                />
                {/* Pupil */}
                <motion.span 
                  className="absolute inset-[40%] rounded-full bg-black"
                  style={{
                    transform: `translate(${firstEyePosition.x}%, ${firstEyePosition.y}%)`
                  }}
                  animate={{
                    scale: [1, 0.8, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
                {/* Highlight */}
                <motion.span 
                  className="absolute rounded-full bg-white h-[20%] w-[20%]"
                  style={{ 
                    top: `calc(25% + ${firstEyePosition.y * 0.5}%)`, 
                    left: `calc(60% + ${firstEyePosition.x * 0.5}%)` 
                  }}
                />
              </motion.span>
              
              <motion.span
                ref={secondEyeRef}
                className="inline-block relative mx-[0.05em]"
                style={{ width: '0.7em', height: '0.7em' }}
              >
                {/* Outer eye */}
                <motion.span 
                  className="absolute inset-0 rounded-full bg-black"
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />
                {/* Iris */}
                <motion.span 
                  className="absolute inset-[15%] rounded-full bg-gray-800"
                />
                {/* Pupil */}
                <motion.span 
                  className="absolute inset-[40%] rounded-full bg-black"
                  style={{
                    transform: `translate(${secondEyePosition.x}%, ${secondEyePosition.y}%)`
                  }}
                  animate={{
                    scale: [1, 0.8, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
                {/* Highlight */}
                <motion.span 
                  className="absolute rounded-full bg-white h-[20%] w-[20%]"
                  style={{ 
                    top: `calc(25% + ${secondEyePosition.y * 0.5}%)`, 
                    left: `calc(60% + ${secondEyePosition.x * 0.5}%)` 
                  }}
                />
              </motion.span>
            </span>
            lBox Blog
          </span>
        </motion.h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Tutorials, guides, and insights about web development tools and techniques.
        </p>
      </div>
      
      <div className="flex justify-end">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-flex rounded-md border shadow-sm"
        >
          <Button
            variant={viewMode === "card" ? "default" : "ghost"}
            size="sm"
            className="rounded-r-none"
            onClick={() => setViewMode("card")}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Cards
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            className="rounded-l-none"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </motion.div>
      </div>
      
      {viewMode === "card" ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.05, duration: 0.5 }}
            >
              <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/blog/${post.slug}`}>Read Article</Link>
                </Button>
              </CardFooter>
            </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="border rounded-lg overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-3 px-4 font-medium w-[50px]">#</th>
                <th className="text-left py-3 px-4 font-medium">Article</th>
                <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Read Time</th>
                <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Description</th>
                <th className="text-right py-3 px-4 font-medium w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post, index) => (
                <motion.tr 
                  key={post.slug}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                  className={index !== blogPosts.length - 1 ? "border-b" : ""}
                >
                  <td className="py-3 px-4 text-muted-foreground text-center">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{post.title}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm hidden md:table-cell">{post.date}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm hidden md:table-cell">{post.readTime} min</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm hidden lg:table-cell line-clamp-1">{post.excerpt}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>Read</Link>
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

const blogPosts = [
  {
    title: "YAML ↔ JSON Converter: Understanding the Two Popular Data Formats",
    slug: "yaml-json-converter",
    date: "May 16, 2025",
    readTime: 10,
    excerpt: "Learn about YAML and JSON formats, their differences, use cases, and how to convert between them efficiently for configuration files and data interchange."
  },
  {
    title: "Color Palette Theory: Creating Harmonious Combinations for Web Design",
    slug: "color-palette-generator",
    date: "May 15, 2025",
    readTime: 9,
    excerpt: "Learn color theory fundamentals, explore color harmony techniques, and discover how to create effective color palettes for your web projects."
  },
  {
    title: "Understanding JWT: Structure, Security, and Implementation Best Practices",
    slug: "jwt-decoder",
    date: "May 13, 2025",
    readTime: 10,
    excerpt: "Deep dive into JSON Web Tokens, how they work, security considerations, and best practices for implementing authentication in modern web applications."
  },
  {
    title: "The Developer's Guide to Base64 Encoding and Decoding",
    slug: "base64-tool",
    date: "May 12, 2025",
    readTime: 8,
    excerpt: "Learn about Base64 encoding, its use cases in web development, and implementation strategies for various programming languages and platforms."
  },
  {
    title: "Mastering Markdown: Syntax, Extensions, and Tools for Developers",
    slug: "markdown-previewer",
    date: "May 11, 2025",
    readTime: 9,
    excerpt: "Discover the full potential of Markdown for documentation, readme files, and content management with advanced syntax and best practices."
  },
  {
    title: "CSS Box Shadow Techniques for Modern Web Design",
    slug: "box-shadow-generator",
    date: "May 10, 2025",
    readTime: 7,
    excerpt: "Learn how to create depth, elevation, and visual interest with CSS box shadows, including advanced techniques and performance considerations."
  },
  {
    title: "QR Codes: A Comprehensive Guide to Generation and Best Practices",
    slug: "qr-code-generator",
    date: "May 10, 2025",
    readTime: 10,
    excerpt: "Learn about QR code technology, applications, error correction, and implementation strategies for your websites and applications."
  },
  {
    title: "Understanding HTML to JSX Conversion",
    slug: "html-to-jsx",
    date: "May 5, 2025",
    readTime: 8,
    excerpt: "Learn about the differences between HTML and JSX, conversion strategies, and best practices for React components."
  },
  {
    title: "Understanding UUIDs: The Universal Standard for Unique Identifiers",
    slug: "uuid-generator",
    date: "May 2, 2025",
    readTime: 9,
    excerpt: "Learn about Universally Unique Identifiers (UUIDs), their different versions, use cases, and best practices for implementation in modern applications."
  },
  {
    title: "Understanding UNIX Timestamps and Date Formats",
    slug: "timestamp-converter",
    date: "April 28, 2025",
    readTime: 10,
    excerpt: "Learn about UNIX timestamps, their significance in computing, and how to effectively work with different date and time formats in your applications."
  },
  {
    title: "SVG vs PNG: When and How to Convert Between Formats",
    slug: "svg-to-png-converter",
    date: "April 25, 2025",
    readTime: 11,
    excerpt: "Learn about the differences between SVG and PNG formats, when to use each, and the benefits of converting between them for your web projects."
  },
  {
    title: "Understanding Regular Expressions: A Comprehensive Guide",
    slug: "regex-tester",
    date: "April 22, 2025",
    readTime: 12,
    excerpt: "Learn how to use regular expressions for pattern matching, validation, and text manipulation in your web applications."
  },
  {
    title: "Understanding HTML Entities: A Guide for Web Developers",
    slug: "html-entities-converter",
    date: "April 20, 2025",
    readTime: 9,
    excerpt: "Learn how HTML entities work, why they're important for web security, and when to use them in your HTML documents."
  },
  {
    title: "Optimizing SEO with Effective Meta Tags",
    slug: "meta-tag-generator",
    date: "April 18, 2025",
    readTime: 10,
    excerpt: "Discover how to craft perfect meta tags that improve your site's SEO performance and enhance social media sharing."
  },
  {
    title: "CSS Gradients: Design Trends and Best Practices",
    slug: "css-gradient-generator",
    date: "April 15, 2025",
    readTime: 8,
    excerpt: "Explore current design trends using CSS gradients and learn techniques to create visually stunning backgrounds for your web projects."
  },
  {
    title: "The Complete Guide to Favicons in 2025",
    slug: "favicon-generator",
    date: "April 11, 2025",
    readTime: 12,
    excerpt: "Learn everything about favicons, why they're important, and how to implement them correctly across all platforms and devices."
  },
  {
    title: "Lorem Ipsum: History and Effective Usage in Design",
    slug: "lorem-ipsum-generator",
    date: "April 10, 2025",
    readTime: 7,
    excerpt: "Learn about the origins of Lorem Ipsum and discover strategies for using placeholder text effectively in your design workflow."
  },
  {
    title: "Making Sense of JSON: Format, Validate, and Beautify",
    slug: "json-formatter",
    date: "April 5, 2025",
    readTime: 8,
    excerpt: "Discover best practices for working with JSON data, from formatting and validation to troubleshooting common issues."
  }
]; 