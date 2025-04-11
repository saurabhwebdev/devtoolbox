import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog - DevToolBox",
  description: "Read the latest articles, guides, and tutorials about web development tools and techniques.",
  keywords: ["developer blog", "web development", "coding tutorials", "dev tools", "programming guides"],
};

export default function BlogIndexPage() {
  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          DevToolBox Blog
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Tutorials, guides, and insights about web development tools and techniques.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col h-full">
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
        ))}
      </div>
    </div>
  );
}

const blogPosts = [
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