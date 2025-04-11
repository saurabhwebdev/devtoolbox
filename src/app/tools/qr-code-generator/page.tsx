"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { toast } from "sonner";
import QRCode from "qrcode";

export default function QRCodeGeneratorPage() {
  // QR Code content
  const [content, setContent] = useState<string>("");
  const [qrCodeDataURL, setQRCodeDataURL] = useState<string>("");
  
  // QR Code settings
  const [size, setSize] = useState<number>(200);
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [darkColor, setDarkColor] = useState<string>("#000000");
  const [lightColor, setLightColor] = useState<string>("#FFFFFF");
  const [margin, setMargin] = useState<number>(4);
  const [format, setFormat] = useState<"png" | "svg">("png");
  
  // Canvas reference for downloading
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Active tab
  const [activeTab, setActiveTab] = useState("generator");
  
  // Sample content types
  const sampleContentTypes = {
    url: "https://www.example.com",
    text: "This is a sample QR code text content",
    email: "mailto:example@example.com?subject=Hello&body=This%20is%20a%20test%20email",
    sms: "smsto:+1234567890:This is a test SMS message",
    wifi: "WIFI:S:NetworkName;T:WPA;P:Password;;",
    vcard: "BEGIN:VCARD\nVERSION:3.0\nN:Doe;John;;;\nFN:John Doe\nTITLE:Developer\nEMAIL:john.doe@example.com\nTEL:+1234567890\nEND:VCARD",
  };

  // Load saved settings and content from localStorage
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem("qrGenerator_content");
      const savedSize = localStorage.getItem("qrGenerator_size");
      const savedErrorCorrection = localStorage.getItem("qrGenerator_errorCorrection");
      const savedDarkColor = localStorage.getItem("qrGenerator_darkColor");
      const savedLightColor = localStorage.getItem("qrGenerator_lightColor");
      const savedMargin = localStorage.getItem("qrGenerator_margin");
      const savedFormat = localStorage.getItem("qrGenerator_format");
      
      if (savedContent) setContent(savedContent);
      if (savedSize) setSize(Number(savedSize));
      if (savedErrorCorrection) setErrorCorrection(savedErrorCorrection as "L" | "M" | "Q" | "H");
      if (savedDarkColor) setDarkColor(savedDarkColor);
      if (savedLightColor) setLightColor(savedLightColor);
      if (savedMargin) setMargin(Number(savedMargin));
      if (savedFormat) setFormat(savedFormat as "png" | "svg");
      
      // If we have saved content, generate the QR code on initial load
      if (savedContent) {
        generateQRCode(
          savedContent, 
          Number(savedSize) || size, 
          savedErrorCorrection as "L" | "M" | "Q" | "H" || errorCorrection,
          savedDarkColor || darkColor,
          savedLightColor || lightColor,
          Number(savedMargin) || margin,
          savedFormat as "png" | "svg" || format
        );
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("qrGenerator_content", content);
      localStorage.setItem("qrGenerator_size", size.toString());
      localStorage.setItem("qrGenerator_errorCorrection", errorCorrection);
      localStorage.setItem("qrGenerator_darkColor", darkColor);
      localStorage.setItem("qrGenerator_lightColor", lightColor);
      localStorage.setItem("qrGenerator_margin", margin.toString());
      localStorage.setItem("qrGenerator_format", format);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [content, size, errorCorrection, darkColor, lightColor, margin, format]);
  
  // Generate QR Code
  const generateQRCode = async (
    text: string,
    qrSize: number = size,
    qrErrorCorrection: "L" | "M" | "Q" | "H" = errorCorrection,
    qrDarkColor: string = darkColor,
    qrLightColor: string = lightColor,
    qrMargin: number = margin,
    qrFormat: "png" | "svg" = format
  ) => {
    if (!text.trim()) {
      toast.error("Please enter content for the QR code");
      return;
    }
    
    try {
      // QR Code options
      const options = {
        errorCorrectionLevel: qrErrorCorrection,
        margin: qrMargin,
        color: {
          dark: qrDarkColor,
          light: qrLightColor
        },
        width: qrSize,
      };

      // Generate QR code
      let qrData;
      if (qrFormat === "svg") {
        qrData = await QRCode.toString(text, {
          ...options,
          type: 'svg'
        });
        
        // Convert SVG to data URL
        const svgBlob = new Blob([qrData], { type: 'image/svg+xml' });
        setQRCodeDataURL(URL.createObjectURL(svgBlob));
      } else {
        // PNG format
        qrData = await QRCode.toDataURL(text, options);
        setQRCodeDataURL(qrData);
        
        // Also render to canvas for download
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, text, options);
        }
      }
      
      toast.success("QR code generated successfully");
    } catch (error) {
      console.error("QR code generation error:", error);
      toast.error("Error generating QR code");
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateQRCode(content, size, errorCorrection, darkColor, lightColor, margin, format);
  };
  
  // Download QR code
  const handleDownload = () => {
    if (!qrCodeDataURL) {
      toast.error("No QR code to download");
      return;
    }
    
    try {
      const downloadLink = document.createElement('a');
      
      if (format === "svg") {
        downloadLink.href = qrCodeDataURL;
        downloadLink.download = `qrcode-${Date.now()}.svg`;
      } else {
        // PNG format
        if (canvasRef.current) {
          downloadLink.href = canvasRef.current.toDataURL('image/png');
          downloadLink.download = `qrcode-${Date.now()}.png`;
        } else {
          downloadLink.href = qrCodeDataURL;
          downloadLink.download = `qrcode-${Date.now()}.png`;
        }
      }
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast.success(`QR code downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Error downloading QR code");
    }
  };
  
  // Load sample content
  const handleLoadSample = (type: keyof typeof sampleContentTypes) => {
    const sampleContent = sampleContentTypes[type];
    setContent(sampleContent);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} sample loaded`);
  };
  
  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Create customizable QR codes for URLs, text, contact information, and more.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/qr-code-generator" className="text-sm underline underline-offset-4">
            Learn about QR codes
          </Link>
        </div>
      </div>
      
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="information">Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="qr-content" className="text-base font-medium">QR Code Content</Label>
                      <Select
                        onValueChange={(value) => handleLoadSample(value as keyof typeof sampleContentTypes)}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Load sample" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="url">URL</SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="wifi">WiFi</SelectItem>
                          <SelectItem value="vcard">vCard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <textarea
                      id="qr-content"
                      className="h-[150px] w-full resize-none rounded-md border border-input bg-background p-2 font-mono text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Enter URL, text, or other content for your QR code..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="qr-size" className="text-sm">Size (px): {size}</Label>
                      <Slider
                        id="qr-size"
                        min={100}
                        max={400}
                        step={10}
                        value={[size]}
                        onValueChange={(value) => setSize(value[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qr-margin" className="text-sm">Margin (blocks): {margin}</Label>
                      <Slider
                        id="qr-margin"
                        min={0}
                        max={10}
                        step={1}
                        value={[margin]}
                        onValueChange={(value) => setMargin(value[0])}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dark-color" className="text-sm">Foreground Color</Label>
                      <div className="flex">
                        <Input
                          id="dark-color"
                          type="color"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="w-10 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="light-color" className="text-sm">Background Color</Label>
                      <div className="flex">
                        <Input
                          id="light-color"
                          type="color"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="w-10 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Error Correction Level</Label>
                    <RadioGroup
                      value={errorCorrection}
                      onValueChange={(value) => setErrorCorrection(value as "L" | "M" | "Q" | "H")}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="L" id="L" />
                        <Label htmlFor="L" className="text-sm">Low (7%)</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="M" id="M" />
                        <Label htmlFor="M" className="text-sm">Medium (15%)</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="Q" id="Q" />
                        <Label htmlFor="Q" className="text-sm">Quartile (25%)</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="H" id="H" />
                        <Label htmlFor="H" className="text-sm">High (30%)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Format</Label>
                    <RadioGroup
                      value={format}
                      onValueChange={(value) => setFormat(value as "png" | "svg")}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="png" id="png" />
                        <Label htmlFor="png" className="text-sm">PNG</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="svg" id="svg" />
                        <Label htmlFor="svg" className="text-sm">SVG</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button type="submit" className="w-full mt-4">Generate QR Code</Button>
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md w-full h-[350px] p-4">
                    {qrCodeDataURL ? (
                      <div className="flex flex-col items-center gap-2">
                        <img 
                          src={qrCodeDataURL} 
                          alt="Generated QR Code" 
                          className="max-w-full max-h-[300px]" 
                        />
                        <canvas ref={canvasRef} className="hidden" />
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p>QR code preview will appear here</p>
                        <p className="text-sm mt-2">Enter content and click &quot;Generate QR Code&quot;</p>
                      </div>
                    )}
                  </div>
                  
                  {qrCodeDataURL && (
                    <Button variant="outline" onClick={handleDownload} className="mt-4">
                      Download QR Code
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="information" className="pt-4">
            <div className="prose prose-sm max-w-none dark:prose-invert space-y-4">
              <h3 className="text-lg font-medium">What are QR Codes?</h3>
              <p>
                QR (Quick Response) codes are two-dimensional barcodes that can store various types of information. 
                They were created in 1994 by the Japanese company Denso Wave and have become widely used for 
                linking to websites, sharing contact information, making payments, and much more.
              </p>
              
              <h3 className="text-lg font-medium">QR Code Error Correction</h3>
              <p>
                QR codes include error correction capability to restore data if the code is damaged or partially obstructed.
                There are four error correction levels:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Level L (Low):</strong> 7% of codewords can be restored</li>
                <li><strong>Level M (Medium):</strong> 15% of codewords can be restored</li>
                <li><strong>Level Q (Quartile):</strong> 25% of codewords can be restored</li>
                <li><strong>Level H (High):</strong> 30% of codewords can be restored</li>
              </ul>
              <p>
                Higher error correction levels make the QR code more reliable but also more complex 
                (requiring more pixels to store the same amount of data).
              </p>
              
              <h3 className="text-lg font-medium">Common QR Code Content Formats</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>URL:</strong> Simple web address (e.g., <code className="text-sm font-mono">https://example.com</code>)</li>
                <li><strong>Email:</strong> Email address with optional subject and body (e.g., <code className="text-sm font-mono">mailto:example@example.com?subject=Hello&body=Message</code>)</li>
                <li><strong>SMS:</strong> Phone number with optional message (e.g., <code className="text-sm font-mono">smsto:+1234567890:Message text</code>)</li>
                <li><strong>WiFi:</strong> Network credentials (e.g., <code className="text-sm font-mono">WIFI:S:NetworkName;T:WPA;P:Password;;</code>)</li>
                <li><strong>vCard:</strong> Contact information in vCard format</li>
                <li><strong>MeCard:</strong> Simplified contact format (e.g., <code className="text-sm font-mono">MECARD:N:Name;TEL:+1234567890;EMAIL:email@example.com;;</code>)</li>
              </ul>
              
              <h3 className="text-lg font-medium">Best Practices for QR Codes</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Test your QR code with multiple scanning apps and devices</li>
                <li>Use a higher error correction level for public displays</li>
                <li>Ensure sufficient contrast between foreground and background colors</li>
                <li>Add a margin (quiet zone) around the QR code</li>
                <li>Keep content concise to reduce QR code complexity</li>
                <li>Consider using URL shorteners for long web addresses</li>
              </ul>
              
              <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">How much data can a QR code hold?</h4>
                  <p className="text-sm text-muted-foreground">
                    A standard QR code can store up to 7,089 numeric characters, 4,296 alphanumeric characters, or 2,953 binary bytes. However, for optimal scanning reliability, it's recommended to keep content concise.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Can I customize the appearance of QR codes?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can customize colors and add logos to the center of QR codes, but it's important to maintain sufficient contrast and not obstruct the positioning markers in the corners. This tool allows you to customize colors while maintaining scannability.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Why should I use SVG format for QR codes?</h4>
                  <p className="text-sm text-muted-foreground">
                    SVG (Scalable Vector Graphics) format provides better quality when resizing, as it preserves sharp edges regardless of scaling. PNG is better for direct web use, while SVG is preferable for print materials or cases where the code might be displayed at different sizes.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">What's the difference between static and dynamic QR codes?</h4>
                  <p className="text-sm text-muted-foreground">
                    Static QR codes (created by this tool) contain fixed information that cannot be changed after generation. Dynamic QR codes (typically provided by paid services) allow you to update the destination URL without changing the QR code itself.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">How do I create a QR code for WiFi credentials?</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the WiFi sample format: <code className="text-sm font-mono">WIFI:S:NetworkName;T:WPA;P:Password;;</code>, replacing NetworkName with your SSID, and Password with your network password. The T: parameter specifies encryption type (WPA, WEP, or none for open networks).
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