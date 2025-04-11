"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for the eyes
  const firstEyeRef = useRef<HTMLDivElement>(null);
  const secondEyeRef = useRef<HTMLDivElement>(null);

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
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-700 to-black">
              DevT
              <span className="relative inline-flex items-center justify-center">
                <motion.span
                  ref={firstEyeRef}
                  className="inline-block relative mx-[0.03em]"
                  style={{ width: '0.5em', height: '0.5em' }}
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
                  className="inline-block relative mx-[0.03em]"
                  style={{ width: '0.5em', height: '0.5em' }}
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
          </Link>
          <nav className="hidden gap-6 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" className="hidden md:flex" asChild>
            <Link href="/tools">Start Using Tools</Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="default" size="sm" className="mt-2" asChild>
              <Link href="/tools">Start Using Tools</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
} 