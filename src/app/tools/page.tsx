"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";
import { BookmarkButton } from "@/components/BookmarkButton";

export default function ToolsPage() {
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
            lBox Tools
          </span>
        </motion.h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Browse our collection of simple yet powerful tools to streamline your workflow.
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
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.05, duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{tool.title}</CardTitle>
                    <BookmarkButton 
                      toolId={tool.id}
                      toolTitle={tool.title}
                      toolDescription={tool.description}
                      toolHref={tool.href}
                    />
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{tool.content}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <Link href={tool.href}>Use Tool</Link>
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
                <th className="text-left py-3 px-4 font-medium">Tool</th>
                <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Description</th>
                <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Details</th>
                <th className="text-right py-3 px-4 font-medium w-[150px]"></th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, index) => (
                <motion.tr 
                  key={tool.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                  className={index !== tools.length - 1 ? "border-b" : ""}
                >
                  <td className="py-3 px-4 text-muted-foreground text-center">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{tool.title}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm hidden md:table-cell">{tool.description}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm hidden lg:table-cell">{tool.content}</td>
                  <td className="py-3 px-4 text-right flex items-center justify-end gap-2">
                    <BookmarkButton 
                      toolId={tool.id}
                      toolTitle={tool.title}
                      toolDescription={tool.description}
                      toolHref={tool.href}
                    />
                    <Button variant="outline" size="sm" asChild>
                      <Link href={tool.href}>Use</Link>
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

const tools = [
  {
    id: "html-to-jsx",
    title: "HTML to JSX Converter",
    description: "Convert HTML into clean JSX",
    content: "Transform HTML markup to JSX for React applications with proper syntax transformations and React best practices.",
    href: "/tools/html-to-jsx"
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create customizable QR codes",
    content: "Generate QR codes for URLs, text, contact information, WiFi networks and more with customization options.",
    href: "/tools/qr-code-generator"
  },
  {
    id: "color-palette-generator",
    title: "Color Palette Generator",
    description: "Create color schemes from input/image",
    content: "Generate harmonious color palettes from a base color or extract palettes from uploaded images for your designs.",
    href: "/tools/color-palette-generator"
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder",
    description: "Decode and inspect JWT tokens",
    content: "Securely analyze JWT tokens to view header, payload, and verify signatures for debugging and development.",
    href: "/tools/jwt-decoder"
  },
  {
    id: "base64-tool",
    title: "Base64 Encoder/Decoder",
    description: "Convert to/from Base64",
    content: "Encode text to Base64 or decode Base64 strings for data transfer, APIs, and authentication workflows.",
    href: "/tools/base64-tool"
  },
  {
    id: "markdown-previewer",
    title: "Markdown Previewer",
    description: "Live preview + export Markdown",
    content: "Write Markdown with real-time preview and export to HTML for documentation, readme files, and content creation.",
    href: "/tools/markdown-previewer"
  },
  {
    id: "box-shadow-generator",
    title: "CSS Box Shadow Generator",
    description: "Visual tool for box shadows",
    content: "Create and customize CSS box shadows with real-time preview and instant code output for your web projects.",
    href: "/tools/box-shadow-generator"
  },
  {
    id: "favicon-generator",
    title: "Favicon Generator",
    description: "Create favicons in all sizes",
    content: "Upload a 512x512 pixel image and get all the favicon sizes you need for your website or PWA.",
    href: "/tools/favicon-generator"
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Clean and format JSON data",
    content: "Easily beautify, minify, and validate your JSON with this simple formatting tool.",
    href: "/tools/json-formatter"
  },
  {
    id: "meta-tag-generator",
    title: "Meta Tag Generator",
    description: "Create SEO-friendly meta tags",
    content: "Generate comprehensive meta tags to improve your website's SEO and social media sharing appearance.",
    href: "/tools/meta-tag-generator"
  },
  {
    id: "css-gradient-generator",
    title: "CSS Gradient Generator",
    description: "Create beautiful CSS gradients",
    content: "Design custom linear, radial, and conic gradients with a visual editor for your web projects.",
    href: "/tools/css-gradient-generator"
  },
  {
    id: "lorem-ipsum-generator",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text",
    content: "Create dummy text for your designs and layouts in various formats.",
    href: "/tools/lorem-ipsum-generator"
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    description: "Live regex tester + highlighter",
    content: "Test and debug regular expressions with real-time matching and detailed results.",
    href: "/tools/regex-tester"
  },
  {
    id: "html-entities-converter",
    title: "HTML Entities Converter",
    description: "Convert text ↔ HTML entities",
    content: "Encode text to HTML entities or decode entities back to regular text for safe display in HTML.",
    href: "/tools/html-entities-converter"
  },
  {
    id: "svg-to-png-converter",
    title: "SVG to PNG Converter",
    description: "Convert SVG files to PNG",
    content: "Transform scalable vector graphics to PNG raster images with customizable size and transparency options.",
    href: "/tools/svg-to-png-converter"
  },
  {
    id: "timestamp-converter",
    title: "Timestamp Converter",
    description: "UNIX ↔ readable date",
    content: "Convert between UNIX timestamps and human-readable dates for debugging, logging, and API development.",
    href: "/tools/timestamp-converter"
  },
  {
    id: "uuid-generator",
    title: "UUID Generator",
    description: "Generate secure UUIDs",
    content: "Create version 1, 4, and 5 UUIDs for databases, APIs, and distributed systems with customizable options.",
    href: "/tools/uuid-generator"
  }
]; 