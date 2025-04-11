"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardCopy, Download, Info, FileText, Copy, Undo } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MarkdownPreviewerPage() {
  const [markdown, setMarkdown] = useState<string>("");
  const [renderedHtml, setRenderedHtml] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [exportFormat, setExportFormat] = useState<string>("html");
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
  // Sample markdown content
  const sampleMarkdown = `# Markdown Example

## Basic Formatting

**Bold text** and _italic text_

~~Strikethrough text~~

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested Item A
  - Nested Item B

### Ordered List
1. First item
2. Second item
3. Third item

## Links and Images

[Visit DevToolBox](https://devtoolbox.com)

![Alt text for an image](https://via.placeholder.com/150)

## Code Blocks

Inline \`code\` example

\`\`\`javascript
// Code block with syntax highlighting
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Task Lists

- [x] Completed task
- [ ] Incomplete task

## Horizontal Rule

---

## Footnotes

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.
`;
  
  // Load saved markdown from localStorage
  useEffect(() => {
    try {
      const savedMarkdown = localStorage.getItem("markdownPreviewer_markdown");
      
      if (savedMarkdown) {
        setMarkdown(savedMarkdown);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);
  
  // Save markdown to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("markdownPreviewer_markdown", markdown);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [markdown]);
  
  // Add to history when markdown changes (throttled)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (markdown && (history.length === 0 || markdown !== history[historyIndex])) {
        // Truncate forward history if we're in the middle of the history
        const newHistory = [...history.slice(0, historyIndex + 1), markdown];
        // Limit history size to 50 entries
        const limitedHistory = newHistory.slice(-50);
        setHistory(limitedHistory);
        setHistoryIndex(limitedHistory.length - 1);
      }
    }, 1000); // Throttle to once per second
    
    return () => clearTimeout(timeoutId);
  }, [markdown, history, historyIndex]);
  
  // Render markdown to HTML
  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        if (!markdown) {
          setRenderedHtml("");
          return;
        }
        
        // We'll use a simpler markdown solution for now 
        // that doesn't have the type compatibility issues
        const { unified } = await import('unified');
        const { default: remarkParse } = await import('remark-parse');
        const { default: remarkRehype } = await import('remark-rehype');
        const { default: rehypeStringify } = await import('rehype-stringify');
        const { default: rehypeRaw } = await import('rehype-raw');
        const { default: remarkGfm } = await import('remark-gfm');
        
        // Process markdown with plugins
        const processor = unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(rehypeStringify);
        
        const result = await processor.process(markdown);
        setRenderedHtml(String(result));
      } catch (error) {
        console.error("Error rendering markdown:", error);
        setRenderedHtml(`<p class="text-red-500">Error rendering markdown</p>`);
      }
    };
    
    renderMarkdown();
  }, [markdown]);
  
  // Handle textarea change
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Copy to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`${label} copied to clipboard`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy to clipboard");
      }
    );
  };
  
  // Load sample markdown
  const loadSample = () => {
    setMarkdown(sampleMarkdown);
  };
  
  // Clear editor
  const clearEditor = () => {
    if (markdown.trim() === "") return;
    
    if (confirm("Are you sure you want to clear the editor? This action cannot be undone.")) {
      setMarkdown("");
      toast.success("Editor cleared");
    }
  };
  
  // Export content based on selected format
  const exportContent = () => {
    try {
      let content = "";
      let filename = "document";
      let type = "";
      
      switch (exportFormat) {
        case "html":
          content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Export</title>
  <style>
    body { 
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    pre { background: #f5f5f5; padding: 1em; border-radius: 4px; overflow-x: auto; }
    code { font-family: monospace; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    th { background-color: #f0f0f0; }
    blockquote { border-left: 4px solid #ddd; padding-left: 1em; color: #666; }
    img { max-width: 100%; }
  </style>
</head>
<body>
${renderedHtml}
</body>
</html>`;
          filename = "exported-document.html";
          type = "text/html";
          break;
          
        case "markdown":
          content = markdown;
          filename = "document.md";
          type = "text/markdown";
          break;
          
        case "text":
          // Simple HTML to text conversion
          const htmlToText = (html: string) => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            return temp.textContent || temp.innerText || "";
          };
          content = htmlToText(renderedHtml);
          filename = "document.txt";
          type = "text/plain";
          break;
          
        default:
          throw new Error("Unsupported export format");
      }
      
      // Create download link
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Exported as ${filename}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export content");
    }
  };
  
  // Undo/Redo functions
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  
  const handleUndo = () => {
    if (canUndo) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };
  
  const handleRedo = () => {
    if (canRedo) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };
  
  return (
    <div className="container py-12 space-y-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Markdown Previewer</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Write and preview Markdown with real-time rendering and export options.
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleUndo}
            disabled={!canUndo}
          >
            <Undo className="h-4 w-4 mr-1" />
            Undo
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRedo}
            disabled={!canRedo}
          >
            <Undo className="h-4 w-4 mr-1 rotate-180" />
            Redo
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadSample}>
            Load Sample
          </Button>
          <Button variant="outline" size="sm" onClick={clearEditor}>
            Clear
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowCheatsheet(!showCheatsheet)}
          >
            <Info className="h-4 w-4 mr-1" />
            {showCheatsheet ? "Hide" : "Show"} Cheatsheet
          </Button>
        </div>
      </div>
      
      {showCheatsheet && (
        <Card className="my-2">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Headers</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`# Heading 1
## Heading 2
### Heading 3
#### Heading 4`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Emphasis</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`*italic* or _italic_
**bold** or __bold__
***bold & italic***
~~strikethrough~~`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Lists</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`- Unordered item
* Unordered item
1. Ordered item
- [ ] Task item
- [x] Completed task`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Links & Images</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`[Link text](https://example.com)
![Alt text](image-url.jpg)
[Link with title](https://example.com "Title")`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Code</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`\`inline code\`

\`\`\`javascript
// code block
function example() {
  return true;
}
\`\`\``}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Quotes & Dividers</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`> Blockquote text
> Multiple lines

---
Horizontal rule`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Tables</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`| Header | Header |
|--------|--------|
| Cell   | Cell   |
| Cell   | Cell   |`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Footnotes</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`Text with footnote[^1]

[^1]: Footnote content`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Other Elements</h3>
              <pre className="bg-muted p-2 rounded text-xs">
{`- Escaping: \\* \\_ \\[ \\]
- Emojis: :smile: :heart:
- HTML: <span style="color:red">Text</span>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="edit" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="min-h-[500px] flex flex-col space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="markdown-input">Markdown Editor</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(markdown, "Markdown")}
              disabled={!markdown}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy Markdown
            </Button>
          </div>
          
          <Textarea
            id="markdown-input"
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Type or paste your Markdown here..."
            className="font-mono flex-1 min-h-[400px] text-sm"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="min-h-[500px] space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <Label>Preview</Label>
            <div className="flex items-center gap-2">
              <Select 
                defaultValue="html" 
                onValueChange={(value) => setExportFormat(value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Export As" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="text">Plain Text</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={exportContent}
                disabled={!markdown}
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(renderedHtml, "HTML")}
                disabled={!renderedHtml}
              >
                <ClipboardCopy className="h-4 w-4 mr-1" />
                Copy HTML
              </Button>
            </div>
          </div>
          
          <Card className="min-h-[400px]">
            <CardContent className="p-6">
              {markdown ? (
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>Start typing in the editor to see the preview here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-muted/40 rounded-lg p-4 mt-8">
        <h2 className="text-lg font-medium mb-2">Tips for Using Markdown</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Use headers to structure your document with # for h1, ## for h2, etc.</li>
          <li>Create lists with dashes (-), asterisks (*), or numbers (1. 2. 3.)</li>
          <li>Format code with backticks (`) for inline code, or triple backticks (```) for code blocks</li>
          <li>Add syntax highlighting by specifying the language after the opening triple backticks</li>
          <li>Create tables with pipes (|) and hyphens (-) for the header separator</li>
        </ul>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is-markdown">
            <AccordionTrigger>What is Markdown and why should I use it?</AccordionTrigger>
            <AccordionContent>
              Markdown is a lightweight markup language that allows you to format text using simple symbols instead of complex HTML. 
              It's faster to write, easier to read in its raw form, and can be converted to HTML and other formats. Developers use 
              Markdown for documentation, README files, writing blog posts, and creating content that needs simple formatting.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="differences">
            <AccordionTrigger>What are the differences between Markdown flavors?</AccordionTrigger>
            <AccordionContent>
              Standard Markdown (CommonMark) provides basic formatting, while GitHub Flavored Markdown (GFM) adds features 
              like tables, task lists, and strikethrough text. Other flavors include MultiMarkdown, Markdown Extra, and 
              platform-specific implementations. Our previewer supports GitHub Flavored Markdown, which is the most 
              widely used variant in developer communities.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="data-saved">
            <AccordionTrigger>Is my data stored on your servers?</AccordionTrigger>
            <AccordionContent>
              No, all processing happens in your browser. Your Markdown content is only saved in your browser's local storage 
              for convenience, so you can return to your work later. We never send your content to our servers, and the 
              processing is done entirely client-side.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="export-formats">
            <AccordionTrigger>What export formats are supported?</AccordionTrigger>
            <AccordionContent>
              Currently, you can export your content as HTML (with basic styling), raw Markdown, or plain text. The HTML export 
              includes a basic CSS stylesheet to ensure your content looks good when viewed in a browser. We're considering 
              adding more export formats like PDF in future updates.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="images">
            <AccordionTrigger>Can I include images in my Markdown?</AccordionTrigger>
            <AccordionContent>
              Yes, you can include images using the standard Markdown syntax: <code>![Alt text](image-url.jpg)</code>. 
              When previewing, images will be displayed if the URL is accessible. However, our previewer doesn't currently 
              support direct image uploads - you'll need to host your images elsewhere and reference them by URL.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="gfm-support">
            <AccordionTrigger>Does this support GitHub-style Markdown?</AccordionTrigger>
            <AccordionContent>
              Yes, our Markdown previewer supports GitHub Flavored Markdown (GFM), which includes features like tables, 
              task lists with checkboxes, strikethrough text, and automatic URL linking. It also supports syntax highlighting 
              for code blocks when you specify the language after the opening triple backticks.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="browser-compatibility">
            <AccordionTrigger>Which browsers are supported?</AccordionTrigger>
            <AccordionContent>
              Our Markdown previewer works in all modern browsers including Chrome, Firefox, Safari, and Edge. 
              It should also function on mobile devices, though the editing experience is optimized for desktop use. 
              If you encounter any compatibility issues, please let us know.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button asChild variant="outline">
          <Link href="/blog/markdown-previewer">
            Read our guide on mastering Markdown
          </Link>
        </Button>
      </div>
    </div>
  );
} 