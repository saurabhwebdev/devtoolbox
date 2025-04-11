"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ClipboardCopy, Check, AlertCircle, Info, Upload, FileText, Image } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function Base64ToolPage() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("encode");
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [showFaq, setShowFaq] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileResult, setFileResult] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [processingFile, setProcessingFile] = useState<boolean>(false);
  
  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedInputText = localStorage.getItem("base64Tool_inputText");
      const savedOutputText = localStorage.getItem("base64Tool_outputText");
      const savedActiveTab = localStorage.getItem("base64Tool_activeTab");
      const savedUrlSafe = localStorage.getItem("base64Tool_urlSafe");
      
      if (savedInputText) setInputText(savedInputText);
      if (savedOutputText) setOutputText(savedOutputText);
      if (savedActiveTab) setActiveTab(savedActiveTab);
      if (savedUrlSafe) setUrlSafe(savedUrlSafe === "true");
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);
  
  // Save state to localStorage whenever relevant state changes
  useEffect(() => {
    try {
      localStorage.setItem("base64Tool_inputText", inputText);
      localStorage.setItem("base64Tool_outputText", outputText);
      localStorage.setItem("base64Tool_activeTab", activeTab);
      localStorage.setItem("base64Tool_urlSafe", urlSafe.toString());
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [inputText, outputText, activeTab, urlSafe]);
  
  // Encode text to Base64
  const encodeToBase64 = (text: string, isUrlSafe: boolean = false) => {
    try {
      if (!text.trim()) {
        setOutputText("");
        return;
      }
      
      // Convert to Base64
      let encoded = btoa(unescape(encodeURIComponent(text)));
      
      // Make URL-safe if requested
      if (isUrlSafe) {
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
      
      setOutputText(encoded);
    } catch (error) {
      console.error("Base64 encoding error:", error);
      toast.error("Error encoding to Base64");
      setOutputText("");
    }
  };
  
  // Decode Base64 to text
  const decodeFromBase64 = (base64: string, isUrlSafe: boolean = false) => {
    try {
      if (!base64.trim()) {
        setOutputText("");
        return;
      }
      
      // Prepare Base64 string for decoding if it's URL-safe
      let preparedBase64 = base64;
      if (isUrlSafe) {
        // Replace URL-safe characters with standard Base64 characters
        preparedBase64 = preparedBase64.replace(/-/g, '+').replace(/_/g, '/');
        
        // Add padding if necessary
        const padding = preparedBase64.length % 4;
        if (padding) {
          preparedBase64 += '='.repeat(4 - padding);
        }
      }
      
      // Decode from Base64
      const decoded = decodeURIComponent(escape(atob(preparedBase64)));
      setOutputText(decoded);
    } catch (error) {
      console.error("Base64 decoding error:", error);
      toast.error("Invalid Base64 format");
      setOutputText("");
    }
  };
  
  // Handle input text change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    
    // Automatically process based on active tab
    if (activeTab === "encode") {
      encodeToBase64(newText, urlSafe);
    } else if (activeTab === "decode") {
      decodeFromBase64(newText, urlSafe);
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Clear outputs
    setOutputText("");
    setFileResult("");
    setSelectedFile(null);
    
    // Process existing input text based on new tab
    if (value === "encode" && inputText) {
      encodeToBase64(inputText, urlSafe);
    } else if (value === "decode" && inputText) {
      decodeFromBase64(inputText, urlSafe);
    }
  };
  
  // Handle URL-safe checkbox change
  const handleUrlSafeChange = (checked: boolean) => {
    setUrlSafe(checked);
    
    // Re-process existing input with new URL-safe setting
    if (activeTab === "encode" && inputText) {
      encodeToBase64(inputText, checked);
    } else if (activeTab === "decode" && inputText) {
      decodeFromBase64(inputText, checked);
    }
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
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setFileType(files[0].type);
      
      // Process the file
      processFile(files[0]);
    }
  };
  
  // Process file (convert to/from Base64)
  const processFile = (file: File) => {
    setProcessingFile(true);
    const reader = new FileReader();
    
    if (activeTab === "encode") {
      // Read as binary and convert to Base64
      reader.onload = (event) => {
        if (event.target?.result) {
          // Extract base64 part from data URL
          const base64String = event.target.result.toString().split(',')[1];
          
          // Apply URL-safe conversion if needed
          let result = base64String;
          if (urlSafe) {
            result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
          }
          
          setFileResult(result);
          setProcessingFile(false);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // For decode tab, only allow text files
      if (!file.type.includes('text')) {
        toast.error("For decoding, please select a text file containing Base64 data");
        setSelectedFile(null);
        setProcessingFile(false);
        return;
      }
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64Content = event.target.result.toString();
          setInputText(base64Content);
          decodeFromBase64(base64Content, urlSafe);
          setProcessingFile(false);
        }
      };
      reader.readAsText(file);
    }
  };
  
  // Save Base64 as file
  const saveBase64AsFile = () => {
    try {
      // Make sure we have some Base64 data to save
      if (!fileResult && !outputText) {
        toast.error("No encoded data to save");
        return;
      }
      
      // Get the Base64 data to save
      const base64Data = fileResult || outputText;
      
      // Prepare Base64 string for decoding if it's URL-safe
      let preparedBase64 = base64Data;
      if (urlSafe) {
        // Replace URL-safe characters with standard Base64 characters
        preparedBase64 = preparedBase64.replace(/-/g, '+').replace(/_/g, '/');
        
        // Add padding if necessary
        const padding = preparedBase64.length % 4;
        if (padding) {
          preparedBase64 += '='.repeat(4 - padding);
        }
      }
      
      // Create a download link
      const link = document.createElement('a');
      link.href = `data:application/octet-stream;base64,${preparedBase64}`;
      link.download = "decoded-file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("File saved successfully");
    } catch (error) {
      console.error("Error saving file:", error);
      toast.error("Error saving file");
    }
  };
  
  // Clear all fields
  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setSelectedFile(null);
    setFileResult("");
    toast.success("All fields cleared");
  };
  
  // Sample data for demonstration
  const loadSample = () => {
    const sampleText = activeTab === "encode" 
      ? "Hello, world! This is a sample text to demonstrate Base64 encoding."
      : "SGVsbG8sIHdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgdG8gZGVtb25zdHJhdGUgQmFzZTY0IGVuY29kaW5nLg==";
    
    setInputText(sampleText);
    
    if (activeTab === "encode") {
      encodeToBase64(sampleText, urlSafe);
    } else {
      decodeFromBase64(sampleText, urlSafe);
    }
  };
  
  return (
    <div className="container py-12 space-y-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Base64 Encoder/Decoder</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Convert text to and from Base64 encoding, with support for URL-safe Base64 and file conversion.
        </p>
      </div>
      
      <Tabs defaultValue="encode" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="encode">Encode to Base64</TabsTrigger>
          <TabsTrigger value="decode">Decode from Base64</TabsTrigger>
        </TabsList>
        
        <div className="my-6 flex items-center space-x-2">
          <Checkbox 
            id="url-safe" 
            checked={urlSafe} 
            onCheckedChange={handleUrlSafeChange} 
          />
          <Label htmlFor="url-safe" className="text-sm">
            URL-safe Base64 (replace + with -, / with _, and remove padding)
          </Label>
          
          <div className="ml-auto flex space-x-2">
            <Button variant="outline" size="sm" onClick={loadSample}>
              Load Sample
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear All
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowFaq(!showFaq)}>
              <Info className="h-4 w-4 mr-2" />
              {showFaq ? "Hide Help" : "Show Help"}
            </Button>
          </div>
        </div>
        
        {showFaq && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">About Base64 Encoding</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
                It's commonly used when there's a need to encode binary data for storage or transfer in environments 
                that only reliably support text content.
              </p>
              
              <h4 className="font-medium text-sm mt-4">Common uses:</h4>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1 mt-2">
                <li>Sending binary data in email attachments</li>
                <li>Embedding images directly in HTML/CSS using data URIs</li>
                <li>Storing complex data in JSON or XML</li>
                <li>Encoding binary data to avoid corruption during transfer</li>
              </ul>
              
              <h4 className="font-medium text-sm mt-4">URL-safe Base64:</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Standard Base64 uses characters that have special meaning in URLs. URL-safe Base64 replaces the + and / 
                characters with - and _ respectively, and omits the padding = characters, making it safe to include in URLs.
              </p>
            </CardContent>
          </Card>
        )}
        
        <TabsContent value="encode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="encode-input">Text to Encode</Label>
            <Textarea
              id="encode-input"
              placeholder="Enter text to encode to Base64..."
              value={inputText}
              onChange={handleInputChange}
              className="min-h-[120px] font-mono"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Or upload a file to encode</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                onChange={handleFileSelect}
                className="max-w-[280px]"
              />
              <Button variant="outline" size="icon" disabled={!selectedFile || processingFile}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="encode-output">Base64 Result</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => copyToClipboard(fileResult || outputText, "Base64 encoded text")}
                disabled={!outputText && !fileResult}
              >
                <ClipboardCopy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <Textarea
              id="encode-output"
              placeholder="Base64 encoded output will appear here..."
              value={fileResult || outputText}
              className="min-h-[120px] font-mono"
              readOnly
            />
          </div>
          
          {fileResult && (
            <div className="flex justify-end">
              <Button onClick={saveBase64AsFile} className="ml-auto" disabled={!fileResult}>
                <FileText className="h-4 w-4 mr-2" />
                Save Base64 as File
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="decode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="decode-input">Base64 to Decode</Label>
            <Textarea
              id="decode-input"
              placeholder="Enter Base64 to decode..."
              value={inputText}
              onChange={handleInputChange}
              className="min-h-[120px] font-mono"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Or upload a text file with Base64 content</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                onChange={handleFileSelect}
                className="max-w-[280px]"
                accept=".txt,.text,.b64"
              />
              <Button variant="outline" size="icon" disabled={!selectedFile || processingFile}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="decode-output">Decoded Result</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => copyToClipboard(outputText, "Decoded text")}
                disabled={!outputText}
              >
                <ClipboardCopy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <Textarea
              id="decode-output"
              placeholder="Decoded output will appear here..."
              value={outputText}
              className="min-h-[120px] font-mono"
              readOnly
            />
          </div>
          
          {outputText && outputText.startsWith('data:') && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Detected Data URI</h3>
              {outputText.startsWith('data:image/') ? (
                <div className="border rounded-lg p-4 flex justify-center">
                  <img 
                    src={outputText} 
                    alt="Decoded image" 
                    className="max-h-[300px] max-w-full object-contain" 
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  A data URI was detected. This could be a file or other binary data.
                </p>
              )}
              <div className="flex justify-end mt-4">
                <Button onClick={saveBase64AsFile}>
                  <FileText className="h-4 w-4 mr-2" />
                  Save Decoded Data as File
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="bg-muted/40 rounded-lg p-4 mt-8">
        <h2 className="text-lg font-medium mb-2">Tips for Using Base64</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Base64 encoding increases data size by approximately 33% compared to the original binary data</li>
          <li>Use URL-safe Base64 when sharing encoded data in URLs or query parameters</li>
          <li>For large files, consider alternative methods as Base64 is not space-efficient</li>
          <li>When decoding, ensure the Base64 string doesn't contain line breaks or extra whitespace</li>
          <li>Base64 is an encoding scheme, not an encryption method - it doesn't provide any security</li>
        </ul>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button asChild variant="outline">
          <Link href="/blog/base64-tool">
            Read our guide on Base64 encoding and decoding
          </Link>
        </Button>
      </div>
    </div>
  );
} 