"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { HexColorPicker } from "react-colorful";
import { ClipboardCopy, FileText, RotateCcw, Info, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BoxShadow {
  id: string;
  hOffset: number;
  vOffset: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export default function BoxShadowGeneratorPage() {
  const [shadows, setShadows] = useState<BoxShadow[]>([]);
  const [boxColor, setBoxColor] = useState("#ffffff");
  const [boxWidth, setBoxWidth] = useState(200);
  const [boxHeight, setBoxHeight] = useState(200);
  const [borderRadius, setBorderRadius] = useState(0);
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);
  const [shadowCode, setShadowCode] = useState("");

  // Initialize with a default shadow
  useEffect(() => {
    // Try to load from localStorage first
    try {
      const savedState = localStorage.getItem("boxShadowGenerator");
      
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setShadows(parsedState.shadows || []);
        setBoxColor(parsedState.boxColor || "#ffffff");
        setBoxWidth(parsedState.boxWidth || 200);
        setBoxHeight(parsedState.boxHeight || 200);
        setBorderRadius(parsedState.borderRadius || 0);
      } else {
        // Default shadow if nothing in localStorage
        setShadows([
          {
            id: generateId(),
            hOffset: 5,
            vOffset: 5,
            blur: 10,
            spread: 0,
            color: "rgba(0, 0, 0, 0.5)",
            inset: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      // Fallback to default shadow
      setShadows([
        {
          id: generateId(),
          hOffset: 5,
          vOffset: 5,
          blur: 10,
          spread: 0,
          color: "rgba(0, 0, 0, 0.5)",
          inset: false,
        },
      ]);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (shadows.length > 0) {
      try {
        localStorage.setItem(
          "boxShadowGenerator",
          JSON.stringify({
            shadows,
            boxColor,
            boxWidth,
            boxHeight,
            borderRadius,
          })
        );
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [shadows, boxColor, boxWidth, boxHeight, borderRadius]);

  // Generate shadow CSS string
  useEffect(() => {
    const shadowString = generateShadowCSS();
    setShadowCode(shadowString);
  }, [shadows]);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
  };

  const generateShadowCSS = () => {
    if (shadows.length === 0) return "none";
    
    const shadowStrings = shadows.map((shadow) => {
      return `${shadow.inset ? "inset " : ""}${shadow.hOffset}px ${shadow.vOffset}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
    });
    
    return shadowStrings.join(", ");
  };

  const addShadow = () => {
    const newShadow: BoxShadow = {
      id: generateId(),
      hOffset: 5,
      vOffset: 5,
      blur: 10,
      spread: 0,
      color: "rgba(0, 0, 0, 0.5)",
      inset: false,
    };
    
    setShadows([...shadows, newShadow]);
  };

  const removeShadow = (id: string) => {
    if (shadows.length <= 1) {
      toast.error("You need at least one shadow");
      return;
    }
    
    setShadows(shadows.filter((shadow) => shadow.id !== id));
  };

  const updateShadow = (id: string, property: keyof BoxShadow, value: any) => {
    setShadows(
      shadows.map((shadow) => {
        if (shadow.id === id) {
          return { ...shadow, [property]: value };
        }
        return shadow;
      })
    );
  };

  const copyCSS = () => {
    const css = `box-shadow: ${shadowCode};`;
    navigator.clipboard.writeText(css).then(
      () => {
        toast.success("CSS copied to clipboard");
      },
      () => {
        toast.error("Failed to copy to clipboard");
      }
    );
  };

  const resetGenerator = () => {
    if (confirm("Are you sure you want to reset all settings?")) {
      setShadows([
        {
          id: generateId(),
          hOffset: 5,
          vOffset: 5,
          blur: 10,
          spread: 0,
          color: "rgba(0, 0, 0, 0.5)",
          inset: false,
        },
      ]);
      setBoxColor("#ffffff");
      setBoxWidth(200);
      setBoxHeight(200);
      setBorderRadius(0);
      toast.success("Generator reset to defaults");
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CSS Box Shadow Generator</h1>
        <p className="text-muted-foreground">
          Create and customize CSS box shadows with a visual editor for your web projects.
        </p>
      </div>

      <Tabs defaultValue="editor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="editor">Visual Editor</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Preview Panel */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="text-lg font-semibold">Preview</div>
                  
                  <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-md min-h-[300px]">
                    <div
                      style={{
                        width: `${boxWidth}px`,
                        height: `${boxHeight}px`,
                        backgroundColor: boxColor,
                        borderRadius: `${borderRadius}px`,
                        boxShadow: shadowCode,
                      }}
                      className="transition-all duration-200"
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="box-width">Width (px)</Label>
                      <Input
                        id="box-width"
                        type="number"
                        min="10"
                        max="400"
                        value={boxWidth}
                        onChange={(e) => setBoxWidth(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="box-height">Height (px)</Label>
                      <Input
                        id="box-height"
                        type="number"
                        min="10"
                        max="400"
                        value={boxHeight}
                        onChange={(e) => setBoxHeight(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="border-radius">Border Radius (px)</Label>
                    <Slider
                      id="border-radius"
                      min={0}
                      max={100}
                      step={1}
                      value={[borderRadius]}
                      onValueChange={(value) => setBorderRadius(value[0])}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Box Color</Label>
                    <div className="relative">
                      <div
                        className="w-full h-10 rounded border cursor-pointer"
                        style={{ backgroundColor: boxColor }}
                        onClick={() => setActiveColorPicker(activeColorPicker === "box" ? null : "box")}
                      ></div>
                      {activeColorPicker === "box" && (
                        <div className="absolute z-10 mt-2">
                          <HexColorPicker color={boxColor} onChange={setBoxColor} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="text-lg font-semibold">CSS Code</div>
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      <code>box-shadow: {shadowCode};</code>
                    </pre>
                  </div>
                  <Button onClick={copyCSS} className="w-full" variant="outline">
                    <ClipboardCopy className="mr-2 h-4 w-4" />
                    Copy CSS
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Controls Panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">Shadow Controls</div>
                    <div className="flex space-x-2">
                      <Button onClick={addShadow} size="sm" variant="outline">
                        <Plus className="mr-1 h-4 w-4" />
                        Add Shadow
                      </Button>
                      <Button onClick={resetGenerator} size="sm" variant="outline">
                        <RotateCcw className="mr-1 h-4 w-4" />
                        Reset
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {shadows.map((shadow, index) => (
                      <div
                        key={shadow.id}
                        className="p-4 border rounded-md space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Shadow {index + 1}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeShadow(shadow.id)}
                            disabled={shadows.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Horizontal Offset ({shadow.hOffset}px)</Label>
                            <Slider
                              min={-50}
                              max={50}
                              step={1}
                              value={[shadow.hOffset]}
                              onValueChange={(value) =>
                                updateShadow(shadow.id, "hOffset", value[0])
                              }
                              className="py-4"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Vertical Offset ({shadow.vOffset}px)</Label>
                            <Slider
                              min={-50}
                              max={50}
                              step={1}
                              value={[shadow.vOffset]}
                              onValueChange={(value) =>
                                updateShadow(shadow.id, "vOffset", value[0])
                              }
                              className="py-4"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Blur Radius ({shadow.blur}px)</Label>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              value={[shadow.blur]}
                              onValueChange={(value) =>
                                updateShadow(shadow.id, "blur", value[0])
                              }
                              className="py-4"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Spread Radius ({shadow.spread}px)</Label>
                            <Slider
                              min={-50}
                              max={50}
                              step={1}
                              value={[shadow.spread]}
                              onValueChange={(value) =>
                                updateShadow(shadow.id, "spread", value[0])
                              }
                              className="py-4"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Shadow Color</Label>
                          <div className="relative">
                            <div
                              className="w-full h-10 rounded border cursor-pointer"
                              style={{ backgroundColor: shadow.color }}
                              onClick={() => setActiveColorPicker(activeColorPicker === shadow.id ? null : shadow.id)}
                            ></div>
                            {activeColorPicker === shadow.id && (
                              <div className="absolute z-10 mt-2">
                                <HexColorPicker
                                  color={shadow.color}
                                  onChange={(color: string) =>
                                    updateShadow(shadow.id, "color", color)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`inset-${shadow.id}`}
                            checked={shadow.inset}
                            onCheckedChange={(checked) =>
                              updateShadow(shadow.id, "inset", checked)
                            }
                          />
                          <Label htmlFor={`inset-${shadow.id}`}>Inset Shadow</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <h2 className="text-xl font-semibold">About CSS Box Shadows</h2>
              </div>
              
              <p>
                The CSS <code className="text-sm bg-muted px-1 rounded">box-shadow</code> property adds shadow effects 
                around an element's frame. You can set multiple effects separated by commas.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="syntax">
                  <AccordionTrigger>Syntax</AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md my-2">
                      <pre className="text-sm whitespace-pre-wrap">
                        <code>box-shadow: [inset] h-offset v-offset blur spread color;</code>
                      </pre>
                    </div>
                    <ul className="space-y-2 mt-4">
                      <li>
                        <strong>inset</strong> - Optional. If specified, the shadow is drawn inside the element.
                      </li>
                      <li>
                        <strong>h-offset</strong> - Required. The horizontal offset of the shadow. Positive values place the shadow on the right side of the box, negative values on the left.
                      </li>
                      <li>
                        <strong>v-offset</strong> - Required. The vertical offset of the shadow. Positive values place the shadow below the box, negative values above it.
                      </li>
                      <li>
                        <strong>blur</strong> - Optional. The blur radius. The higher the value, the more blurred the shadow will be.
                      </li>
                      <li>
                        <strong>spread</strong> - Optional. The spread radius. Positive values increase the size of the shadow, negative values decrease the size. Default is 0 (the shadow is the same size as the element).
                      </li>
                      <li>
                        <strong>color</strong> - Optional. The color of the shadow. If not specified, it defaults to the text color.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="examples">
                  <AccordionTrigger>Common Examples</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Basic Drop Shadow</h3>
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md my-2">
                          <pre className="text-sm">
                            <code>box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);</code>
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Material Design Shadow</h3>
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md my-2">
                          <pre className="text-sm">
                            <code>box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);</code>
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Inset Shadow (Inner Shadow)</h3>
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md my-2">
                          <pre className="text-sm">
                            <code>box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);</code>
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Glowing Effect</h3>
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md my-2">
                          <pre className="text-sm">
                            <code>box-shadow: 0 0 15px rgba(81, 203, 238, 1);</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="tips">
                  <AccordionTrigger>Tips and Best Practices</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      <li>
                        <strong>Performance:</strong> Multiple box shadows can impact rendering performance. Consider using fewer shadows or optimizing for production.
                      </li>
                      <li>
                        <strong>Dark Mode:</strong> For dark mode interfaces, use lighter shadow colors or reduce opacity to make shadows visible.
                      </li>
                      <li>
                        <strong>Realistic Shadows:</strong> For realistic shadows, use multiple box-shadows with varying opacity and blur values.
                      </li>
                      <li>
                        <strong>Animation:</strong> Box shadows can be animated, but consider using transform for better performance when possible.
                      </li>
                      <li>
                        <strong>Accessibility:</strong> Ensure sufficient contrast between the element and its background when adding shadows.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="alternatives">
                  <AccordionTrigger>Alternatives to Box Shadow</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      <li>
                        <strong>filter: drop-shadow()</strong> - Works with irregular shapes and transparent elements better than box-shadow.
                      </li>
                      <li>
                        <strong>text-shadow</strong> - For text elements specifically.
                      </li>
                      <li>
                        <strong>SVG shadows</strong> - For more complex shadow effects that aren't possible with CSS.
                      </li>
                      <li>
                        <strong>Background gradients</strong> - Can be used to create shadow-like effects in some cases.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="flex justify-between mt-6">
                <Link href="/blog/box-shadow-generator" className="text-primary hover:underline flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Read our detailed guide on CSS Box Shadows
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 