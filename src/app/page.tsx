"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState(popularTools);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTools(popularTools);
      return;
    }
    
    const filtered = popularTools.filter(tool => 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredTools(filtered);
  }, [searchTerm]);

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

  // Refs for the eyes
  const firstEyeRef = React.useRef<HTMLDivElement>(null);
  const secondEyeRef = React.useRef<HTMLDivElement>(null);

  // Calculate position for each eye
  const firstEyePosition = calculateEyePosition(firstEyeRef as React.RefObject<HTMLElement>, 0);
  const secondEyePosition = calculateEyePosition(secondEyeRef as React.RefObject<HTMLElement>, 1);

  return (
    <div className="container max-w-5xl py-12 space-y-8">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center space-y-8 pt-12"
      >
        <motion.h1 
          className="text-5xl font-bold tracking-tight sm:text-6xl"
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
            lBox
          </span>
        </motion.h1>
        
        <motion.p 
          className="max-w-[550px] text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          All the tools you need. In one place.
        </motion.p>

        <motion.div 
          className="w-full max-w-md relative"
          initial={{ opacity: 0, y: 10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for tools..."
            className="w-full pl-10 pr-4 py-6 rounded-full border-muted-foreground/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </motion.section>

      {/* Popular Tools Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-xl font-medium">Popular Tools</h2>
          
          {filteredTools.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -2, scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full px-4 py-2 h-auto" 
                    asChild
                  >
                    <Link href={tool.href}>{tool.title}</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No tools found matching your search. Try a different term.
            </div>
          )}
          
          <div className="mt-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tools" className="flex items-center gap-1">
                View all tools <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

const popularTools = [
  {
    title: "HTML to JSX Converter",
    description: "Transform HTML markup to JSX for React applications.",
    href: "/tools/html-to-jsx",
    keywords: ["html", "jsx", "react", "converter"]
  },
  {
    title: "QR Code Generator",
    description: "Create customizable QR codes for URLs, text, and more.",
    href: "/tools/qr-code-generator",
    keywords: ["qr", "generator", "code", "scan"]
  },
  {
    title: "Color Palette Generator",
    description: "Create harmonious color schemes from a base color or image.",
    href: "/tools/color-palette-generator",
    keywords: ["color", "palette", "design", "scheme"]
  },
  {
    title: "JSON Formatter",
    description: "Beautify, minify, and validate your JSON data with ease.",
    href: "/tools/json-formatter",
    keywords: ["json", "format", "beautify", "validate"]
  },
  {
    title: "Markdown Previewer",
    description: "Write Markdown with real-time preview and export to HTML.",
    href: "/tools/markdown-previewer",
    keywords: ["markdown", "preview", "md", "editor"]
  },
  {
    title: "UUID Generator",
    description: "Create secure UUIDs for databases, APIs, and systems.",
    href: "/tools/uuid-generator",
    keywords: ["uuid", "generator", "unique", "identifier"]
  }
];
