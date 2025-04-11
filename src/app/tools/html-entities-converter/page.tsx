"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function HtmlEntitiesConverterPage() {
  // Input text and output
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  // Conversion direction
  const [direction, setDirection] = useState<"toEntities" | "fromEntities">("toEntities");
  
  // Entity type
  const [entityType, setEntityType] = useState<"named" | "numeric" | "all">("named");
  
  // Active tab
  const [activeTab, setActiveTab] = useState("converter");

  // Conversion functions
  const convertTextToEntities = (text: string): string => {
    // Simple conversion for basic entities
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };
  
  const convertEntitiesToText = (text: string): string => {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent || "";
  };
  
  const handleConvert = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to convert");
      return;
    }
    
    try {
      let result;
      if (direction === "toEntities") {
        result = convertTextToEntities(inputText);
      } else {
        result = convertEntitiesToText(inputText);
      }
      
      setOutputText(result);
      toast.success("Conversion completed");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Error during conversion");
    }
  };
  
  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setDirection("toEntities");
    setEntityType("named");
    toast.success("Reset successful");
  };
  
  const handleCopy = () => {
    if (!outputText) {
      toast.error("Nothing to copy");
      return;
    }
    
    navigator.clipboard.writeText(outputText)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">HTML Entities Converter</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Convert text to HTML entities and vice versa for safe use in HTML documents.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/html-entities-converter" className="text-sm underline underline-offset-4">
            Learn about HTML entities
          </Link>
        </div>
      </div>
      
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="converter">Converter</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
          </TabsList>
          
          <TabsContent value="converter" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <Label>Conversion Direction</Label>
                <RadioGroup 
                  value={direction} 
                  onValueChange={(value) => setDirection(value as "toEntities" | "fromEntities")}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="toEntities" id="toEntities" />
                    <Label htmlFor="toEntities">Text to HTML Entities</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fromEntities" id="fromEntities" />
                    <Label htmlFor="fromEntities">HTML Entities to Text</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {direction === "toEntities" && (
                <div className="flex flex-col gap-3">
                  <Label>Entity Type</Label>
                  <RadioGroup 
                    value={entityType} 
                    onValueChange={(value) => setEntityType(value as "named" | "numeric" | "all")}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="named" id="named" />
                      <Label htmlFor="named">Named Entities (e.g., &amp;lt;)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="numeric" id="numeric" />
                      <Label htmlFor="numeric">Numeric Entities (e.g., &amp;#60;)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">Mixed (Named when available, numeric otherwise)</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
            
            <div className="grid gap-6 pt-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="input" className="text-base">Input</Label>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
                
                <Textarea
                  id="input"
                  placeholder={direction === "toEntities" ? "Enter text to convert to HTML entities" : "Enter HTML entities to convert to text"}
                  className="min-h-[200px] font-mono text-sm"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="output" className="text-base">Output</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopy}
                    disabled={!outputText}
                  >
                    Copy
                  </Button>
                </div>
                
                <div className="relative">
                  <Textarea
                    id="output"
                    className="min-h-[200px] font-mono text-sm"
                    value={outputText}
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-center">
              <Button size="lg" onClick={handleConvert}>Convert</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="reference" className="pt-4">
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-2 px-4 text-left">Character</th>
                      <th className="py-2 px-4 text-left">Named Entity</th>
                      <th className="py-2 px-4 text-left">Numeric Entity</th>
                      <th className="py-2 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">&lt;</td>
                      <td className="py-2 px-4 font-mono">&amp;lt;</td>
                      <td className="py-2 px-4 font-mono">&amp;#60;</td>
                      <td className="py-2 px-4">Less than sign</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">&gt;</td>
                      <td className="py-2 px-4 font-mono">&amp;gt;</td>
                      <td className="py-2 px-4 font-mono">&amp;#62;</td>
                      <td className="py-2 px-4">Greater than sign</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">&amp;</td>
                      <td className="py-2 px-4 font-mono">&amp;amp;</td>
                      <td className="py-2 px-4 font-mono">&amp;#38;</td>
                      <td className="py-2 px-4">Ampersand</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">&quot;</td>
                      <td className="py-2 px-4 font-mono">&amp;quot;</td>
                      <td className="py-2 px-4 font-mono">&amp;#34;</td>
                      <td className="py-2 px-4">Double quotation mark</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">&#39;</td>
                      <td className="py-2 px-4 font-mono">none</td>
                      <td className="py-2 px-4 font-mono">&amp;#39;</td>
                      <td className="py-2 px-4">Single quotation mark</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* FAQ Section */}
      <div className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">What are HTML entities?</h3>
            <p className="text-muted-foreground">HTML entities are special codes used to represent characters that might otherwise be interpreted as HTML markup or aren't readily available on a keyboard, like &amp;copy; for ©.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">When should I use named vs. numeric entities?</h3>
            <p className="text-muted-foreground">Named entities (like &amp;amp;) are more readable and memorable. Numeric entities (like &amp;#38;) are useful for characters without named equivalents and provide better cross-browser compatibility.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Why do I need to encode special characters?</h3>
            <p className="text-muted-foreground">Encoding special characters prevents them from being interpreted as HTML code, helps avoid XSS vulnerabilities, and ensures consistent display across different browsers and character encodings.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Is my data secure when using this tool?</h3>
            <p className="text-muted-foreground">Yes. All conversion happens in your browser. Your text is never sent to any server, ensuring your data remains private and secure.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}