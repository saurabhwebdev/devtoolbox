import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container py-12 space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-6 pt-8 pb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-primary">DevToolBox</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium">Tiny Tools. Huge Help.</h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A collection of simple, powerful tools for developers, designers, and creators.
        </p>
        <div className="pt-4">
          <Button size="lg" asChild>
            <Link href="/tools">Start Using Tools</Link>
          </Button>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <Card key={tool.title} className="h-full">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{tool.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={tool.href}>Try it</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

const featuredTools = [
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
    title: "Color Converter",
    description: "Convert between color formats",
    content: "Transform colors between HEX, RGB, HSL, and more with this handy color utility.",
    href: "/tools/color-converter"
  },
  {
    title: "Markdown Editor",
    description: "Write and preview markdown",
    content: "Create beautiful markdown documents with live preview and syntax highlighting.",
    href: "/tools/markdown-editor"
  }
];
