"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { toast } from "sonner";
import { load as yamlLoad, dump as yamlDump } from 'js-yaml';

export default function YamlJsonConverterPage() {
  // State for input, converted output, and errors
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState<"json-to-yaml" | "yaml-to-json">("json-to-yaml");
  const [indentSize, setIndentSize] = useState(2);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('yaml_json_converter_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.input) setInput(data.input);
        if (data.mode) setMode(data.mode);
        if (data.indentSize) setIndentSize(data.indentSize);
      } catch (e) {
        console.error("Error parsing saved YAML/JSON converter data", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      input,
      mode,
      indentSize
    };
    
    localStorage.setItem('yaml_json_converter_data', JSON.stringify(dataToSave));
  }, [input, mode, indentSize]);

  // Perform conversion whenever input, mode, or indent size changes
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setIsError(false);
      setErrorMessage("");
      return;
    }

    try {
      if (mode === "json-to-yaml") {
        // Parse JSON and convert to YAML
        const parsedJson = JSON.parse(input);
        const yamlString = yamlDump(parsedJson, { indent: indentSize });
        setOutput(yamlString);
        setIsError(false);
        setErrorMessage("");
      } else {
        // Parse YAML and convert to JSON
        const parsedYaml = yamlLoad(input);
        const jsonString = JSON.stringify(parsedYaml, null, indentSize);
        setOutput(jsonString);
        setIsError(false);
        setErrorMessage("");
      }
    } catch (error) {
      setOutput("");
      setIsError(true);
      setErrorMessage((error as Error).message);
    }
  }, [input, mode, indentSize]);

  const handleReset = () => {
    setInput("");
    setOutput("");
    setIsError(false);
    setErrorMessage("");
    localStorage.removeItem('yaml_json_converter_data');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success(`${mode === "json-to-yaml" ? "YAML" : "JSON"} copied to clipboard`);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      toast.success("Pasted from clipboard");
    } catch (error) {
      toast.error("Failed to read from clipboard");
    }
  };

  const handleSwitchMode = () => {
    // Switch the conversion mode
    setMode(mode === "json-to-yaml" ? "yaml-to-json" : "json-to-yaml");
    
    // If we have valid output, use it as the new input to allow going back and forth
    if (output && !isError) {
      setInput(output);
    }
  };

  return (
    <div className="container py-12 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">YAML ↔ JSON Converter</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Convert between YAML and JSON formats seamlessly. Perfect for configuration files, data interchange, and API development.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/yaml-json-converter" className="text-sm underline underline-offset-4">
            Learn about YAML and JSON formats
          </Link>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-md border shadow-sm">
          <Button
            variant={mode === "json-to-yaml" ? "default" : "ghost"}
            size="sm"
            className="rounded-r-none"
            onClick={() => setMode("json-to-yaml")}
          >
            JSON → YAML
          </Button>
          <Button
            variant={mode === "yaml-to-json" ? "default" : "ghost"}
            size="sm"
            className="rounded-l-none"
            onClick={() => setMode("yaml-to-json")}
          >
            YAML → JSON
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="converter-input" className="text-lg font-medium">
              {mode === "json-to-yaml" ? "JSON Input" : "YAML Input"}
            </Label>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePaste}>Paste</Button>
              <Button size="sm" variant="outline" onClick={handleReset}>Reset</Button>
            </div>
          </div>
          <Textarea 
            id="converter-input"
            placeholder={mode === "json-to-yaml" ? "Paste your JSON here" : "Paste your YAML here"}
            className="font-mono h-[400px] resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-medium">
              {mode === "json-to-yaml" ? "YAML Output" : "JSON Output"}
            </Label>
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
              {output && !isError && (
                <Button size="sm" variant="outline" onClick={handleCopy}>Copy</Button>
              )}
              <Button size="sm" variant="outline" onClick={handleSwitchMode}>
                Swap
              </Button>
            </div>
          </div>

          {isError ? (
            <Card className="p-4 border-destructive">
              <p className="text-destructive font-medium">Error</p>
              <p className="text-sm text-destructive/80">{errorMessage}</p>
            </Card>
          ) : (
            <div className="bg-muted rounded-md overflow-auto h-[400px]">
              {output ? (
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Enter valid {mode === "json-to-yaml" ? "JSON" : "YAML"} to see the conversion
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">What's the difference between YAML and JSON?</h3>
            <p className="text-muted-foreground">YAML is a human-friendly data serialization standard, while JSON is a lightweight data-interchange format. YAML supports comments, anchors, and references, making it more readable and flexible than JSON.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">When should I use YAML vs JSON?</h3>
            <p className="text-muted-foreground">Use YAML for configuration files, documentation, and when human readability is important. Use JSON for APIs, data storage, and when compatibility with JavaScript is needed.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Is my data safe?</h3>
            <p className="text-muted-foreground">Yes! All conversions happen entirely in your browser. We don't store or send your data to any server, ensuring complete privacy and security.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">What YAML features are supported?</h3>
            <p className="text-muted-foreground">This converter supports YAML 1.2 specification including basic types, collections, and multi-document support. Some advanced YAML features like anchors and aliases might not be preserved during conversion.</p>
          </Card>
        </div>
      </div>
    </div>
  );
} 