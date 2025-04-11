"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { toast } from "sonner";
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export default function UuidGeneratorPage() {
  // Generated UUIDs
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([]);
  
  // Settings
  const [uuidVersion, setUuidVersion] = useState<"v1" | "v4" | "v5">("v4");
  const [quantity, setQuantity] = useState<number>(1);
  const [format, setFormat] = useState<"lowercase" | "uppercase">("lowercase");
  const [includeDashes, setIncludeDashes] = useState<boolean>(true);
  
  // For UUID v5 (namespace)
  const [namespace, setNamespace] = useState<string>("");
  const [name, setName] = useState<string>("");
  
  // Predefined namespaces
  const predefinedNamespaces = {
    dns: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    url: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
    oid: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
    x500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8"
  };
  
  // Active tab
  const [activeTab, setActiveTab] = useState("generator");
  
  // Generate UUIDs based on settings
  const generateUuids = () => {
    try {
      const newUuids: string[] = [];
      
      for (let i = 0; i < quantity; i++) {
        let uuid: string;
        
        if (uuidVersion === "v1") {
          uuid = uuidv1();
        } else if (uuidVersion === "v4") {
          uuid = uuidv4();
        } else if (uuidVersion === "v5") {
          if (!namespace || !name) {
            toast.error("Namespace and name are required for UUID v5");
            return;
          }
          
          try {
            uuid = uuidv5(name, namespace);
          } catch (error) {
            toast.error("Invalid namespace for UUID v5");
            return;
          }
        } else {
          throw new Error("Invalid UUID version");
        }
        
        // Format UUID according to settings
        if (!includeDashes) {
          uuid = uuid.replace(/-/g, "");
        }
        
        if (format === "uppercase") {
          uuid = uuid.toUpperCase();
        }
        
        newUuids.push(uuid);
      }
      
      setGeneratedUuids(newUuids);
      toast.success(`Generated ${quantity} UUID${quantity > 1 ? "s" : ""}`);
    } catch (error) {
      console.error("UUID generation error:", error);
      toast.error("Error generating UUIDs");
    }
  };
  
  // Copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };
  
  // Copy all UUIDs as a list
  const handleCopyAll = () => {
    if (generatedUuids.length === 0) {
      toast.error("No UUIDs to copy");
      return;
    }
    
    const text = generatedUuids.join("\n");
    navigator.clipboard.writeText(text)
      .then(() => toast.success("All UUIDs copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };
  
  // Select a predefined namespace
  const handlePredefinedNamespace = (namespaceKey: keyof typeof predefinedNamespaces) => {
    setNamespace(predefinedNamespaces[namespaceKey]);
  };
  
  // Handle quantity changes
  const handleQuantityChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0 && num <= 100) {
      setQuantity(num);
    }
  };
  
  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">UUID Generator</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Generate secure, standardized UUIDs for your applications, databases, and distributed systems.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/uuid-generator" className="text-sm underline underline-offset-4">
            Learn about UUIDs
          </Link>
        </div>
      </div>
      
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="information">Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>UUID Version</Label>
                  <RadioGroup 
                    value={uuidVersion} 
                    onValueChange={(value) => setUuidVersion(value as "v1" | "v4" | "v5")}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="v4" id="v4" className="mt-1" />
                      <div>
                        <Label htmlFor="v4" className="font-medium">Version 4 (Random)</Label>
                        <p className="text-sm text-muted-foreground">
                          Generated using random numbers. Most common and secure for most use cases.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="v1" id="v1" className="mt-1" />
                      <div>
                        <Label htmlFor="v1" className="font-medium">Version 1 (Time-based)</Label>
                        <p className="text-sm text-muted-foreground">
                          Generated using the current timestamp and MAC address. Useful for ordered IDs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="v5" id="v5" className="mt-1" />
                      <div>
                        <Label htmlFor="v5" className="font-medium">Version 5 (Name-based SHA-1)</Label>
                        <p className="text-sm text-muted-foreground">
                          Generated from a namespace ID and a name. Produces consistent IDs from the same inputs.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                {uuidVersion === "v5" && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="namespace">Namespace UUID</Label>
                      <Input 
                        id="namespace" 
                        placeholder="e.g., 6ba7b810-9dad-11d1-80b4-00c04fd430c8" 
                        value={namespace}
                        onChange={(e) => setNamespace(e.target.value)}
                      />
                      <div className="pt-1 flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePredefinedNamespace("dns")}
                        >
                          DNS
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePredefinedNamespace("url")}
                        >
                          URL
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePredefinedNamespace("oid")}
                        >
                          OID
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePredefinedNamespace("x500")}
                        >
                          X500
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="e.g., example.com or username" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="quantity">Quantity (1-100)</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="1" 
                    max="100" 
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                  />
                </div>
                
                <div className="space-y-4 pt-2">
                  <Label>Format Options</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeDashes" 
                      checked={includeDashes}
                      onCheckedChange={(checked) => setIncludeDashes(checked === true)}
                    />
                    <Label htmlFor="includeDashes" className="text-sm">Include dashes (-)</Label>
                  </div>
                  
                  <RadioGroup 
                    value={format} 
                    onValueChange={(value) => setFormat(value as "lowercase" | "uppercase")}
                    className="flex space-x-4 pt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lowercase" id="lowercase" />
                      <Label htmlFor="lowercase">Lowercase</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="uppercase" id="uppercase" />
                      <Label htmlFor="uppercase">Uppercase</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button className="w-full mt-6" size="lg" onClick={generateUuids}>
                  Generate UUID{quantity > 1 ? "s" : ""}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Generated UUIDs</Label>
                  {generatedUuids.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCopyAll}
                    >
                      Copy All
                    </Button>
                  )}
                </div>
                
                <div className="border rounded-md min-h-[300px] max-h-[500px] overflow-y-auto p-4 bg-muted/30">
                  {generatedUuids.length > 0 ? (
                    <ul className="space-y-2">
                      {generatedUuids.map((uuid, index) => (
                        <li key={index} className="flex items-center justify-between gap-2 group">
                          <code className="text-xs font-mono">{uuid}</code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity" 
                            onClick={() => handleCopy(uuid)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                            <span className="sr-only">Copy</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      <p>No UUIDs generated yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="information" className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What is a UUID?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across both space and time, 
                  with minimal effort to avoid generating duplicate identifiers.
                </p>
                <p className="text-sm text-muted-foreground">
                  The standard UUID format consists of 32 hexadecimal digits displayed in 5 groups separated by hyphens: 
                  8-4-4-4-12 (e.g., 550e8400-e29b-41d4-a716-446655440000).
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">UUID Versions</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary/50 pl-4 py-1">
                    <h4 className="font-medium mb-1">Version 1 (Time-based)</h4>
                    <p className="text-sm text-muted-foreground">
                      Created from a timestamp and the MAC address of the computer that generated it. 
                      Ensures uniqueness across space and time but may reveal information about when and where it was generated.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary/50 pl-4 py-1">
                    <h4 className="font-medium mb-1">Version 4 (Random)</h4>
                    <p className="text-sm text-muted-foreground">
                      Created using random or pseudo-random numbers. Most commonly used version due to its 
                      strong randomness properties, making it suitable for most applications requiring unique identifiers.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary/50 pl-4 py-1">
                    <h4 className="font-medium mb-1">Version 5 (Name-based with SHA-1)</h4>
                    <p className="text-sm text-muted-foreground">
                      Generated by hashing a namespace identifier and name. Given the same namespace and name, 
                      the same UUID will always be generated, making it useful for creating identifiers from consistent inputs.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Common Use Cases</h3>
                <ul className="space-y-2 text-sm list-disc pl-4">
                  <li><strong>Database Primary Keys:</strong> UUIDs make excellent primary keys, especially in distributed systems.</li>
                  <li><strong>Distributed Systems:</strong> Generate IDs across multiple systems without coordination.</li>
                  <li><strong>Session IDs:</strong> Secure, non-sequential identifiers for user sessions.</li>
                  <li><strong>Content Addressing:</strong> Uniquely identify content or resources.</li>
                  <li><strong>Transaction IDs:</strong> Track transactions across multiple systems.</li>
                </ul>
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
            <h3 className="text-lg font-semibold mb-2">What is a UUID and why would I need one?</h3>
            <p className="text-sm text-muted-foreground">
              A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. 
              They're designed to be globally unique without requiring a central registration authority. UUIDs are useful 
              for database keys, session IDs, and any scenario where you need a unique identifier that won't conflict with others.
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Which UUID version should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Version 4 (random) is recommended for most use cases as it provides strong randomness and privacy. 
              Use Version 1 (time-based) when you need sortable UUIDs, and Version 5 (name-based) when you need 
              to generate consistent IDs from the same input (like for URL slugs or content addressing).
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">How unique are UUIDs? Can they collide?</h3>
            <p className="text-sm text-muted-foreground">
              The probability of a UUID collision is extremely low. For Version 4 UUIDs, the odds of generating a 
              duplicate are about 1 in 2^122 (or 1 in 5.3×10^36). To put that in perspective, you would need to 
              generate 1 billion UUIDs every second for 85 years to have a 50% chance of a single collision.
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Are UUIDs secure for sensitive information?</h3>
            <p className="text-sm text-muted-foreground">
              Version 4 UUIDs are generated using random numbers and are generally secure for most purposes. 
              However, they are not cryptographically secure for all use cases. Version 1 UUIDs include MAC addresses 
              and timestamps, which may reveal information about when and where they were created.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
} 