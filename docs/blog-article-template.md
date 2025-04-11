# Blog Article Template and Standardization Guide

This document outlines the standardized structure and styling for all blog articles in the DevToolBox application. Following these guidelines ensures a consistent user experience across all blog content.

## File Structure

All blog articles should be placed in their respective directories under `src/app/blog/[article-name]/page.tsx`.

## Import Statements

Every blog article should include the following imports:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
```

Additional imports should be added as needed for specific components.

## Metadata

Each article must include appropriate metadata:

```tsx
export const metadata = {
  title: "Article Title - DevToolBox",
  description: "A concise and informative description of the article content.",
  keywords: ["keyword1", "keyword2", "keyword3"],
  openGraph: {
    title: "Article Title",
    description: "Same description as above",
    type: "article",
    publishedTime: "YYYY-MM-DDT00:00:00Z",
    authors: ["DevToolBox Team"],
  }
};
```

## Basic Page Structure

The basic structure should follow:

```tsx
export default function ArticleNameBlogPost() {
  return (
    <div className="container py-12 space-y-12">
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Article Title
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Published: Month DD, YYYY</span>
          <span>•</span>
          <span>X min read</span>
        </div>
        
        <div className="space-y-6">
          {/* Content sections go here */}
        </div>
      </article>
    </div>
  );
}
```

## Content Sections

### Introduction Section

Every article should start with an introduction section:

```tsx
<section>
  <p className="lead">
    Introductory paragraph that summarizes the article and hooks the reader.
  </p>
  
  <p>
    Additional context or information about the article's content.
  </p>

  <div className="my-6 p-4 bg-primary/5 rounded-md">
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="flex-1">
        <h3 className="text-xl font-medium">Try Our Tool Name</h3>
        <p className="text-muted-foreground mt-2">
          Brief description of what the tool does and its benefits.
        </p>
      </div>
      <Button asChild className="shrink-0">
        <Link href="/tools/tool-name">Try the Tool</Link>
      </Button>
    </div>
  </div>
</section>
```

### Content Sections

Each section should follow this pattern:

```tsx
<section>
  <h2 className="text-2xl font-bold mt-8 mb-4">Section Title</h2>
  
  <p>
    Section content...
  </p>
  
  {/* Other elements like lists, code blocks, etc. */}
</section>
```

## UI Components

### Tabbed Content

For content that can be logically divided into tabs:

```tsx
<div className="not-prose my-8">
  <Tabs defaultValue="tab1" className="w-full">
    <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full h-auto">
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    </TabsList>
    
    <TabsContent value="tab1">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2">Tab 1 Title</h3>
          <p className="text-muted-foreground mb-4">
            Tab 1 content...
          </p>
          {/* Additional content */}
        </CardContent>
      </Card>
    </TabsContent>
    
    {/* Repeat for other tabs */}
  </Tabs>
</div>
```

### Highlighted Boxes

For tips, notes, or important information:

```tsx
<div className="my-6 p-4 bg-primary/10 rounded-md">
  <p className="font-medium">Tip Title:</p>
  <p className="text-sm mt-2">
    Tip content...
  </p>
</div>
```

For less emphasized information:

```tsx
<div className="my-6 p-4 bg-muted/50 rounded-md">
  <p className="text-sm">
    <strong>Note:</strong> Note content...
  </p>
</div>
```

### Code Blocks

Code blocks should be formatted as:

```tsx
<div className="p-3 bg-muted/30 rounded-md">
  <pre className="text-xs overflow-x-auto">
    <code>// Your code here</code>
  </pre>
</div>
```

For longer code examples:

```tsx
<div className="p-3 bg-muted/30 rounded-md">
  <pre className="text-xs overflow-x-auto">
{`// Multi-line code example
function example() {
  return 'Hello world';
}`}
  </pre>
</div>
```

## Styling Guidelines

1. Use the `space-y-6` class for appropriate spacing between content sections
2. Maintain consistent heading hierarchies (h1 for title, h2 for sections, h3 for subsections)
3. Use `text-muted-foreground` for secondary text
4. Wrap non-prose elements (like tabs) with `not-prose` class

## Example Articles

For reference, see these articles that follow the standardized format:
- `src/app/blog/color-palette-generator/page.tsx`
- `src/app/blog/jwt-decoder/page.tsx`
- `src/app/blog/markdown-previewer/page.tsx`
- `src/app/blog/box-shadow-generator/page.tsx` 