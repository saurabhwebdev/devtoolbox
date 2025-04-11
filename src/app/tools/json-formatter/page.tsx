"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { toast } from "sonner";

export default function JsonFormatterPage() {
  // Input and output
  const [inputJson, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [activeTab, setActiveTab] = useState("formatted");

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('json_formatter_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.inputJson) setInputJson(data.inputJson);
        if (data.indentSize) setIndentSize(data.indentSize);
      } catch (e) {
        console.error("Error parsing saved JSON formatter data", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      inputJson,
      indentSize
    };
    
    localStorage.setItem('json_formatter_data', JSON.stringify(dataToSave));
  }, [inputJson, indentSize]);

  // Format JSON whenever input changes
  useEffect(() => {
    if (!inputJson.trim()) {
      setFormattedJson("");
      setIsError(false);
      setErrorMessage("");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setFormattedJson(formatted);
      setIsError(false);
      setErrorMessage("");
    } catch (error) {
      setFormattedJson("");
      setIsError(true);
      setErrorMessage((error as Error).message);
    }
  }, [inputJson, indentSize]);

  const handleReset = () => {
    setInputJson("");
    setFormattedJson("");
    setIsError(false);
    setErrorMessage("");
    setIndentSize(2);
    localStorage.removeItem('json_formatter_data');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    toast.success("JSON copied to clipboard");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputJson(text);
      toast.success("Pasted from clipboard");
    } catch (error) {
      toast.error("Failed to read from clipboard");
    }
  };

  const renderTreeView = () => {
    if (!formattedJson || isError) return null;
    
    try {
      const data = JSON.parse(formattedJson);
      return (
        <div className="bg-muted p-4 rounded-md overflow-auto">
          <JSONTreeView data={data} level={0} />
        </div>
      );
    } catch (error) {
      return <div className="text-destructive">Error rendering tree view</div>;
    }
  };

  return (
    <div className="container py-12 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">JSON Formatter</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Format and beautify your JSON with tree view to make it more readable for debugging APIs.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/json-formatter" className="text-sm underline underline-offset-4">
            Learn about JSON formatting
          </Link>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="json-input" className="text-lg font-medium">Input JSON</Label>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePaste}>Paste</Button>
              <Button size="sm" variant="outline" onClick={handleReset}>Reset</Button>
            </div>
          </div>
          <Textarea 
            id="json-input"
            placeholder="Paste your JSON here"
            className="font-mono h-[400px] resize-none"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-medium">Output</Label>
            <div className="flex gap-2 items-center">
              <Label htmlFor="indent-size" className="text-sm mr-2">Indent:</Label>
              <select
                id="indent-size"
                className="h-9 rounded-md border border-input px-3 py-1 text-sm"
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
              >
                <option value="2">2 spaces</option>
                <option value="4">4 spaces</option>
                <option value="8">8 spaces</option>
              </select>
              {formattedJson && !isError && (
                <Button size="sm" variant="outline" onClick={handleCopy}>Copy</Button>
              )}
            </div>
          </div>

          {isError ? (
            <Card className="p-4 border-destructive">
              <p className="text-destructive font-medium">Error</p>
              <p className="text-sm text-destructive/80">{errorMessage}</p>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="formatted">Formatted</TabsTrigger>
                <TabsTrigger value="tree">Tree View</TabsTrigger>
              </TabsList>
              <TabsContent value="formatted" className="mt-4">
                {formattedJson ? (
                  <div className="bg-muted rounded-md overflow-auto">
                    <pre className="p-4 text-sm font-mono whitespace-pre-wrap">{formattedJson}</pre>
                  </div>
                ) : (
                  <Card className="p-4 text-center text-muted-foreground">
                    Enter valid JSON to see the formatted output
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="tree" className="mt-4">
                {formattedJson ? (
                  renderTreeView()
                ) : (
                  <Card className="p-4 text-center text-muted-foreground">
                    Enter valid JSON to see the tree view
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">What happens to my JSON data?</h3>
            <p className="text-muted-foreground">Your JSON is processed entirely in your browser. We don't store or send your data to any server, ensuring complete privacy and security.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Can I format very large JSON files?</h3>
            <p className="text-muted-foreground">Yes, but browser performance may vary. For extremely large files (over 10MB), you might experience some lag during formatting or when using the tree view.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Why does my JSON show errors?</h3>
            <p className="text-muted-foreground">The most common issues are missing quotes around property names, trailing commas, or using single quotes instead of double quotes. JSON has strict syntax requirements.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Can I convert between JSON and other formats?</h3>
            <p className="text-muted-foreground">This tool is specifically for formatting JSON. For conversion between JSON and other formats like XML, CSV, or YAML, we recommend using a dedicated converter tool.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface JSONTreeViewProps {
  data: any;
  level: number;
  pathKey?: string;
}

function JSONTreeView({ data, level, pathKey }: JSONTreeViewProps) {
  const [expanded, setExpanded] = useState(level < 2);
  
  if (data === null) {
    return <span className="text-gray-500">null</span>;
  }

  if (typeof data === 'boolean') {
    return <span className="text-purple-500">{data.toString()}</span>;
  }

  if (typeof data === 'number') {
    return <span className="text-blue-500">{data}</span>;
  }

  if (typeof data === 'string') {
    return <span className="text-green-500">"{data}"</span>;
  }

  const isArray = Array.isArray(data);
  const isEmpty = isArray ? data.length === 0 : Object.keys(data).length === 0;

  if (isEmpty) {
    return <span>{isArray ? "[]" : "{}"}</span>;
  }

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const marginLeft = `${level * 1.5}rem`;
  
  return (
    <div className="flex flex-col" style={{ marginLeft: pathKey ? 0 : marginLeft }}>
      {pathKey !== undefined && (
        <div className="flex items-center">
          <button 
            onClick={toggleExpand} 
            className="mr-1 focus:outline-none text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            {expanded ? "▼" : "▶"}
          </button>
          <span className="font-medium mr-1">
            {pathKey}:
          </span>
        </div>
      )}
      
      {expanded && (
        <div className="ml-4 border-l-2 pl-2 border-gray-200 dark:border-gray-700">
          {isArray ? (
            data.map((item: any, index: number) => (
              <div key={index} className="my-1">
                <JSONTreeView 
                  data={item} 
                  level={level + 1}
                  pathKey={`[${index}]`}
                />
              </div>
            ))
          ) : (
            Object.entries(data).map(([key, value]) => (
              <div key={key} className="my-1">
                <JSONTreeView 
                  data={value} 
                  level={level + 1}
                  pathKey={key}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
} 