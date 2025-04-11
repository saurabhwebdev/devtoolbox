"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "sonner";

export default function HtmlToJsxPage() {
  // State for the HTML input and JSX output
  const [html, setHtml] = useState<string>("");
  const [jsx, setJsx] = useState<string>("");
  
  // Options
  const [componentize, setComponentize] = useState<boolean>(false);
  const [useReactFragment, setUseReactFragment] = useState<boolean>(true);
  const [preserveClassName, setPreserveClassName] = useState<boolean>(true);
  
  // Active tab
  const [activeTab, setActiveTab] = useState("converter");
  
  // Sample HTML
  const sampleHtml = `<div class="container">
  <h1 class="title">Hello World</h1>
  <p class="content">This is a <strong>sample</strong> HTML snippet.</p>
  <ul class="list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>`;

  // Load saved settings and code from localStorage
  useEffect(() => {
    try {
      const savedHtml = localStorage.getItem("htmlToJsx_html");
      const savedComponentize = localStorage.getItem("htmlToJsx_componentize");
      const savedUseReactFragment = localStorage.getItem("htmlToJsx_useReactFragment");
      const savedPreserveClassName = localStorage.getItem("htmlToJsx_preserveClassName");
      
      if (savedHtml) setHtml(savedHtml);
      if (savedComponentize) setComponentize(savedComponentize === "true");
      if (savedUseReactFragment) setUseReactFragment(savedUseReactFragment === "true");
      if (savedPreserveClassName) setPreserveClassName(savedPreserveClassName === "true");
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);
  
  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("htmlToJsx_html", html);
      localStorage.setItem("htmlToJsx_componentize", componentize.toString());
      localStorage.setItem("htmlToJsx_useReactFragment", useReactFragment.toString());
      localStorage.setItem("htmlToJsx_preserveClassName", preserveClassName.toString());
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [html, componentize, useReactFragment, preserveClassName]);
  
  // Convert HTML to JSX
  const convertToJsx = () => {
    if (!html.trim()) {
      toast.error("Please enter some HTML to convert");
      return;
    }
    
    try {
      let result = html;
      
      // Replace HTML attributes with JSX attributes
      result = result
        // class to className (if preserveClassName is true)
        .replace(/class=/g, preserveClassName ? "className=" : "class=")
        // for to htmlFor
        .replace(/for=/g, "htmlFor=")
        // Handle self-closing tags
        .replace(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g, 
          (match, tag, attributes) => {
            if (attributes.endsWith('/')) {
              return `<${tag}${attributes}>`;
            }
            return `<${tag}${attributes} />`;
          }
        )
        // Convert inline style from string to object
        .replace(/style="([^"]*)"/g, (match, styles) => {
          const styleObj = styles
            .split(';')
            .filter(Boolean)
            .map((style: string) => {
              const [property, value] = style.split(':').map((s: string) => s.trim());
              // Convert CSS property to camelCase
              const camelCaseProp = property.replace(/-([a-z])/g, (_: string, letter: string) => letter.toUpperCase());
              return `${camelCaseProp}: "${value}"`;
            })
            .join(', ');
          
          return `style={{${styleObj}}}`;
        });
      
      // Wrap in component if needed
      if (componentize) {
        result = `import React from 'react';\n\nexport default function Component() {\n  return (\n    ${
          useReactFragment ? '<>\n    ' : ''
        }${result.split('\n').map(line => '    ' + line).join('\n')}\n    ${
          useReactFragment ? '</>' : ''
        }\n  );\n}`;
      } else if (useReactFragment) {
        // Just wrap in fragments if not componentizing
        result = `<>\n${result}\n</>`;
      }
      
      setJsx(result);
      toast.success("HTML converted to JSX");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Error converting HTML to JSX");
    }
  };
  
  // Load sample
  const loadSample = () => {
    setHtml(sampleHtml);
    toast.success("Sample HTML loaded");
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    if (!jsx) {
      toast.error("No JSX to copy");
      return;
    }
    
    navigator.clipboard.writeText(jsx)
      .then(() => toast.success("JSX copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };
  
  // Clear inputs and outputs
  const handleClear = () => {
    setHtml("");
    setJsx("");
    toast.success("Cleared");
  };
  
  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">HTML to JSX Converter</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Easily convert HTML markup to JSX for your React applications with proper syntax transformations.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/html-to-jsx" className="text-sm underline underline-offset-4">
            Learn about HTML to JSX conversion
          </Link>
        </div>
      </div>
      
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="converter">Converter</TabsTrigger>
            <TabsTrigger value="information">Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="converter" className="pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="html-input" className="text-base font-medium">
                      HTML Input
                    </Label>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={loadSample}>
                        Load Sample
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleClear}>
                        Clear
                      </Button>
                    </div>
                  </div>
                  <textarea
                    id="html-input"
                    className="h-[400px] w-full resize-none rounded-md border border-input bg-background p-2 font-mono text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Paste your HTML here..."
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="jsx-output" className="text-base font-medium">
                      JSX Output
                    </Label>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      Copy
                    </Button>
                  </div>
                  <textarea
                    id="jsx-output"
                    className="h-[400px] w-full resize-none rounded-md border border-input bg-background p-2 font-mono text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="JSX will appear here..."
                    value={jsx}
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="text-base font-medium">Conversion Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="componentize"
                    checked={componentize}
                    onCheckedChange={(checked) => setComponentize(checked === true)}
                  />
                  <div>
                    <Label htmlFor="componentize" className="font-medium">Wrap in Component</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate a complete React component with imports
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="react-fragment"
                    checked={useReactFragment}
                    onCheckedChange={(checked) => setUseReactFragment(checked === true)}
                  />
                  <div>
                    <Label htmlFor="react-fragment" className="font-medium">Use React Fragments</Label>
                    <p className="text-sm text-muted-foreground">
                      Wrap JSX in React Fragments (&lt;&gt;...&lt;/&gt;)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="preserve-classname"
                    checked={preserveClassName}
                    onCheckedChange={(checked) => setPreserveClassName(checked === true)}
                  />
                  <div>
                    <Label htmlFor="preserve-classname" className="font-medium">Convert class to className</Label>
                    <p className="text-sm text-muted-foreground">
                      Replace class attributes with className
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-2">
              <Button size="lg" onClick={convertToJsx}>
                Convert to JSX
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="information" className="pt-4">
            <div className="prose prose-sm max-w-none dark:prose-invert space-y-4">
              <h3 className="text-lg font-medium">What is JSX?</h3>
              <p>
                JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It&apos;s commonly used with React to describe what the UI should look like. JSX produces React &quot;elements&quot; that render to the DOM.
              </p>
              
              <h3 className="text-lg font-medium">Key HTML to JSX Differences</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><code className="text-sm font-mono">class</code> becomes <code className="text-sm font-mono">className</code></li>
                <li><code className="text-sm font-mono">for</code> becomes <code className="text-sm font-mono">htmlFor</code></li>
                <li>Self-closing tags must be explicitly closed with <code className="text-sm font-mono">/&gt;</code></li>
                <li>Inline styles are objects, not strings (e.g., <code className="text-sm font-mono">{'style={{color: "red"}}'}</code>)</li>
                <li>CSS properties use camelCase (e.g., <code className="text-sm font-mono">backgroundColor</code> not <code className="text-sm font-mono">background-color</code>)</li>
                <li>Custom data attributes use <code className="text-sm font-mono">data-*</code> format</li>
              </ul>
              
              <h3 className="text-lg font-medium">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Break large components into smaller, reusable pieces</li>
                <li>Use meaningful component names (PascalCase)</li>
                <li>Keep components pure and focused on a single responsibility</li>
                <li>Properly format and indent JSX for readability</li>
                <li>Use keys when rendering lists to help React identify changes efficiently</li>
              </ul>
              
              <h3 className="text-lg font-medium">When to Use This Tool</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Converting HTML templates to React components</li>
                <li>Migrating from HTML-based frameworks to React</li>
                <li>Using HTML snippets from design systems in React projects</li>
                <li>Learning the differences between HTML and JSX syntax</li>
              </ul>
              
              <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Why do I need to convert HTML to JSX?</h4>
                  <p className="text-sm text-muted-foreground">
                    React uses JSX syntax which, while similar to HTML, has key differences in attribute naming and formatting. Converting standard HTML to JSX ensures your code works properly in React components.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Can I convert entire HTML pages at once?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, but for large HTML documents, it's recommended to break them into smaller components for better React architecture. This tool can handle complete pages, but consider structuring your final code into modular components.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">What happens to JavaScript event handlers in HTML?</h4>
                  <p className="text-sm text-muted-foreground">
                    HTML event handlers like <code className="text-sm font-mono">onclick</code> are converted to React's camelCase format (<code className="text-sm font-mono">onClick</code>). However, the string-based JavaScript inside these attributes should be replaced with actual JavaScript functions in your React code.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Does this converter handle all HTML attributes?</h4>
                  <p className="text-sm text-muted-foreground">
                    This converter handles common HTML attributes including class/className and for/htmlFor transformations. For specialized or custom attributes, you may need to manually adjust the output.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Why should I wrap JSX in a Fragment?</h4>
                  <p className="text-sm text-muted-foreground">
                    React requires a single parent element for component returns. Fragments (<code className="text-sm font-mono">&lt;&gt;...&lt;/&gt;</code>) allow you to group multiple elements without adding extra nodes to the DOM, keeping your HTML structure clean.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
} 