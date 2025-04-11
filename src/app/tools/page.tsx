"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";

export default function ToolsPage() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Developer Tools
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Browse our collection of simple yet powerful tools to streamline your workflow.
        </p>
      </div>

      <div className="flex justify-end">
        <div className="inline-flex rounded-md border shadow-sm">
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
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.title} className="h-full">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
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
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-3 px-4 font-medium">Tool</th>
                <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Description</th>
                <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Details</th>
                <th className="text-right py-3 px-4 font-medium w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, index) => (
                <tr key={tool.title} className={index !== tools.length - 1 ? "border-b" : ""}>
                  <td className="py-3 px-4 font-medium">{tool.title}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm hidden md:table-cell">{tool.description}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm hidden lg:table-cell">{tool.content}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={tool.href}>Use</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const tools = [
  {
    title: "HTML to JSX Converter",
    description: "Convert HTML into clean JSX",
    content: "Transform HTML markup to JSX for React applications with proper syntax transformations and React best practices.",
    href: "/tools/html-to-jsx"
  },
  {
    title: "QR Code Generator",
    description: "Create customizable QR codes",
    content: "Generate QR codes for URLs, text, contact information, WiFi networks and more with customization options.",
    href: "/tools/qr-code-generator"
  },
  {
    title: "Color Palette Generator",
    description: "Create color schemes from input/image",
    content: "Generate harmonious color palettes from a base color or extract palettes from uploaded images for your designs.",
    href: "/tools/color-palette-generator"
  },
  {
    title: "JWT Decoder",
    description: "Decode and inspect JWT tokens",
    content: "Securely analyze JWT tokens to view header, payload, and verify signatures for debugging and development.",
    href: "/tools/jwt-decoder"
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Convert to/from Base64",
    content: "Encode text to Base64 or decode Base64 strings for data transfer, APIs, and authentication workflows.",
    href: "/tools/base64-tool"
  },
  {
    title: "Markdown Previewer",
    description: "Live preview + export Markdown",
    content: "Write Markdown with real-time preview and export to HTML for documentation, readme files, and content creation.",
    href: "/tools/markdown-previewer"
  },
  {
    title: "CSS Box Shadow Generator",
    description: "Visual tool for box shadows",
    content: "Create and customize CSS box shadows with real-time preview and instant code output for your web projects.",
    href: "/tools/box-shadow-generator"
  },
  {
    title: "Favicon Generator",
    description: "Create favicons in all sizes",
    content: "Upload a 512x512 pixel image and get all the favicon sizes you need for your website or PWA.",
    href: "/tools/favicon-generator"
  },
  {
    title: "JSON Formatter",
    description: "Clean and format JSON data",
    content: "Easily beautify, minify, and validate your JSON with this simple formatting tool.",
    href: "/tools/json-formatter"
  },
  {
    title: "Meta Tag Generator",
    description: "Create SEO-friendly meta tags",
    content: "Generate comprehensive meta tags to improve your website's SEO and social media sharing appearance.",
    href: "/tools/meta-tag-generator"
  },
  {
    title: "CSS Gradient Generator",
    description: "Create beautiful CSS gradients",
    content: "Design custom linear, radial, and conic gradients with a visual editor for your web projects.",
    href: "/tools/css-gradient-generator"
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text",
    content: "Create dummy text for your designs and layouts in various formats.",
    href: "/tools/lorem-ipsum-generator"
  },
  {
    title: "Regex Tester",
    description: "Live regex tester + highlighter",
    content: "Test and debug regular expressions with real-time matching and detailed results.",
    href: "/tools/regex-tester"
  },
  {
    title: "HTML Entities Converter",
    description: "Convert text ↔ HTML entities",
    content: "Encode text to HTML entities or decode entities back to regular text for safe display in HTML.",
    href: "/tools/html-entities-converter"
  },
  {
    title: "SVG to PNG Converter",
    description: "Convert SVG files to PNG",
    content: "Transform scalable vector graphics to PNG raster images with customizable size and transparency options.",
    href: "/tools/svg-to-png-converter"
  },
  {
    title: "Timestamp Converter",
    description: "UNIX ↔ readable date",
    content: "Convert between UNIX timestamps and human-readable dates for debugging, logging, and API development.",
    href: "/tools/timestamp-converter"
  },
  {
    title: "UUID Generator",
    description: "Generate secure UUIDs",
    content: "Create version 1, 4, and 5 UUIDs for databases, APIs, and distributed systems with customizable options.",
    href: "/tools/uuid-generator"
  }
]; 