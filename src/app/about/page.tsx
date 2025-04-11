"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Github, Twitter, Linkedin } from "lucide-react";

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="container max-w-5xl py-12 space-y-16">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center space-y-6"
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">DevToolBox</span>
        </motion.h1>

        <motion.p
          className="max-w-[650px] text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Simplifying development workflows with essential tools for developers, designers, and creators.
        </motion.p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-medium">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              DevToolBox was created with a simple goal: to provide developers with a collection of essential tools that streamline daily workflows.
            </p>
            <p>
              We believe that development tools should be accessible, fast, and easy to use. By centralizing common utilities in one place, we help developers focus on building great software instead of searching for tools.
            </p>
            <p>
              Our tools are designed to work across devices, browsers, and platforms, ensuring you can access them wherever you work.
            </p>
          </div>
          
          <div className="pt-4">
            <Button asChild>
              <Link href="/tools" className="flex items-center gap-1">
                Explore our tools <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-medium">Key Features</h2>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="pt-8"
      >
        <div className="border-t pt-8">
          <h2 className="text-2xl font-medium mb-6 text-center">Connect With Us</h2>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

const features = [
  {
    title: "Simple & Focused",
    description: "Each tool serves a specific purpose, designed to be intuitive and easy to use."
  },
  {
    title: "Free & Open Source",
    description: "All tools are available for free, with full client-side processing for data security."
  },
  {
    title: "Modern & Responsive",
    description: "Built with modern web technologies, ensuring a smooth experience on any device."
  },
  {
    title: "Growing Collection",
    description: "Continuously adding new tools based on developer needs and feedback."
  }
]; 