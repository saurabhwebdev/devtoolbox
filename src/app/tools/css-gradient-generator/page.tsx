"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { GradientPreview } from "./GradientPreview";
import { CssCodeBlock } from "./CssCodeBlock";
import Link from "next/link";

type GradientType = "linear" | "radial" | "conic";
type ColorStop = {
  color: string;
  position: number;
  id: string;
};

export default function CssGradientGeneratorPage() {
  // Gradient type
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  
  // Linear gradient properties
  const [linearAngle, setLinearAngle] = useState(90);
  
  // Radial gradient properties
  const [radialShape, setRadialShape] = useState("circle");
  const [radialPosition, setRadialPosition] = useState("center");
  
  // Conic gradient properties
  const [conicAngle, setConicAngle] = useState(0);
  const [conicPosition, setConicPosition] = useState("center");
  
  // Common properties
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: "#3498db", position: 0, id: "stop-1" },
    { color: "#9b59b6", position: 100, id: "stop-2" },
  ]);
  
  // CSS Output
  const [cssProp, setCssProp] = useState("background");
  const [includeVendorPrefixes, setIncludeVendorPrefixes] = useState(true);
  const [includeFallback, setIncludeFallback] = useState(true);
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('css_gradient_generator_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        
        if (data.gradientType) setGradientType(data.gradientType);
        if (data.linearAngle !== undefined) setLinearAngle(data.linearAngle);
        if (data.radialShape) setRadialShape(data.radialShape);
        if (data.radialPosition) setRadialPosition(data.radialPosition);
        if (data.conicAngle !== undefined) setConicAngle(data.conicAngle);
        if (data.conicPosition) setConicPosition(data.conicPosition);
        if (data.colorStops) setColorStops(data.colorStops);
        if (data.cssProp) setCssProp(data.cssProp);
        if (data.includeVendorPrefixes !== undefined) setIncludeVendorPrefixes(data.includeVendorPrefixes);
        if (data.includeFallback !== undefined) setIncludeFallback(data.includeFallback);
      } catch (e) {
        console.error("Error parsing saved gradient data", e);
      }
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      gradientType,
      linearAngle,
      radialShape,
      radialPosition,
      conicAngle,
      conicPosition,
      colorStops,
      cssProp,
      includeVendorPrefixes,
      includeFallback
    };
    
    localStorage.setItem('css_gradient_generator_data', JSON.stringify(dataToSave));
  }, [
    gradientType, linearAngle, radialShape, radialPosition,
    conicAngle, conicPosition, colorStops, cssProp,
    includeVendorPrefixes, includeFallback
  ]);
  
  const handleAddColorStop = () => {
    // Find a midpoint position for the new color stop
    let midpoint = 50;
    if (colorStops.length >= 2) {
      // Sort stops by position
      const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
      // Find the largest gap between stops and place the new one there
      let maxGap = 0;
      let gapPosition = 50;
      
      for (let i = 0; i < sortedStops.length - 1; i++) {
        const gap = sortedStops[i + 1].position - sortedStops[i].position;
        if (gap > maxGap) {
          maxGap = gap;
          gapPosition = sortedStops[i].position + gap / 2;
        }
      }
      
      midpoint = gapPosition;
    }
    
    // Generate a random color
    const colors = ["#f44336", "#9c27b0", "#3f51b5", "#03a9f4", "#009688", "#8bc34a", "#ffeb3b", "#ff9800"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setColorStops([
      ...colorStops,
      { 
        color: randomColor, 
        position: midpoint, 
        id: `stop-${Date.now()}` 
      }
    ]);
  };
  
  const handleRemoveColorStop = (id: string) => {
    // Don't allow removing if we only have 2 stops
    if (colorStops.length <= 2) return;
    
    setColorStops(colorStops.filter(stop => stop.id !== id));
  };
  
  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setColorStops(colorStops.map(stop => 
      stop.id === id ? { ...stop, ...updates } : stop
    ));
  };
  
  const handleReset = () => {
    setGradientType("linear");
    setLinearAngle(90);
    setRadialShape("circle");
    setRadialPosition("center");
    setConicAngle(0);
    setConicPosition("center");
    setColorStops([
      { color: "#3498db", position: 0, id: "stop-1" },
      { color: "#9b59b6", position: 100, id: "stop-2" },
    ]);
    setCssProp("background");
    setIncludeVendorPrefixes(true);
    setIncludeFallback(true);
    
    localStorage.removeItem('css_gradient_generator_data');
  };
  
  // Generate CSS gradient string
  const generateGradient = () => {
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    // Create the color stops string
    const stopsString = sortedStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(", ");
    
    // Build the gradient based on type
    let gradient = "";
    
    if (gradientType === "linear") {
      gradient = `linear-gradient(${linearAngle}deg, ${stopsString})`;
    } 
    else if (gradientType === "radial") {
      gradient = `radial-gradient(${radialShape} at ${radialPosition}, ${stopsString})`;
    } 
    else if (gradientType === "conic") {
      gradient = `conic-gradient(from ${conicAngle}deg at ${conicPosition}, ${stopsString})`;
    }
    
    return gradient;
  };

  return (
    <div className="container py-12 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">CSS Gradient Generator</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Create beautiful CSS gradients with a visual editor and get ready-to-use CSS code.
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Gradient Editor</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
              
              <Tabs value={gradientType} onValueChange={(value) => setGradientType(value as GradientType)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="linear">Linear</TabsTrigger>
                  <TabsTrigger value="radial">Radial</TabsTrigger>
                  <TabsTrigger value="conic">Conic</TabsTrigger>
                </TabsList>
                
                <TabsContent value="linear" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="angle">Angle: {linearAngle}°</Label>
                    </div>
                    <Slider
                      id="angle"
                      min={0}
                      max={360}
                      step={1}
                      value={[linearAngle]}
                      onValueChange={(values: number[]) => setLinearAngle(values[0])}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="radial" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="radial-shape">Shape</Label>
                    <select 
                      id="radial-shape"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      value={radialShape}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setRadialShape(e.target.value)}
                    >
                      <option value="circle">Circle</option>
                      <option value="ellipse">Ellipse</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="radial-position">Position</Label>
                    <select 
                      id="radial-position"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      value={radialPosition}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setRadialPosition(e.target.value)}
                    >
                      <option value="center">Center</option>
                      <option value="top left">Top Left</option>
                      <option value="top">Top</option>
                      <option value="top right">Top Right</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                      <option value="bottom left">Bottom Left</option>
                      <option value="bottom">Bottom</option>
                      <option value="bottom right">Bottom Right</option>
                    </select>
                  </div>
                </TabsContent>
                
                <TabsContent value="conic" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="conic-angle">Angle: {conicAngle}°</Label>
                    </div>
                    <Slider
                      id="conic-angle"
                      min={0}
                      max={360}
                      step={1}
                      value={[conicAngle]}
                      onValueChange={(values: number[]) => setConicAngle(values[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="conic-position">Position</Label>
                    <select 
                      id="conic-position"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      value={conicPosition}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setConicPosition(e.target.value)}
                    >
                      <option value="center">Center</option>
                      <option value="top left">Top Left</option>
                      <option value="top">Top</option>
                      <option value="top right">Top Right</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                      <option value="bottom left">Bottom Left</option>
                      <option value="bottom">Bottom</option>
                      <option value="bottom right">Bottom Right</option>
                    </select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Color Stops</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddColorStop}
                  disabled={colorStops.length >= 10}
                >
                  Add Color
                </Button>
              </div>
              
              <div className="space-y-3">
                {colorStops.map((stop) => (
                  <div key={stop.id} className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-md border cursor-pointer"
                      style={{ backgroundColor: stop.color }}
                    >
                      <input 
                        type="color" 
                        value={stop.color}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateColorStop(stop.id, { color: e.target.value })}
                        className="opacity-0 w-full h-full cursor-pointer"
                      />
                    </div>
                    
                    <Input 
                      type="text"
                      value={stop.color}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateColorStop(stop.id, { color: e.target.value })}
                      className="w-24"
                    />
                    
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[stop.position]}
                      onValueChange={(values: number[]) => updateColorStop(stop.id, { position: values[0] })}
                      className="flex-1"
                    />
                    
                    <span className="text-sm w-9 text-right">{stop.position}%</span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveColorStop(stop.id)}
                      disabled={colorStops.length <= 2}
                      className="h-7 w-7 p-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">CSS Output Options</h3>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="css-property">CSS Property</Label>
                  <select 
                    id="css-property"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    value={cssProp}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCssProp(e.target.value)}
                  >
                    <option value="background">background</option>
                    <option value="background-image">background-image</option>
                    <option value="border-image">border-image</option>
                    <option value="text-fill-color">text-fill-color (webkit only)</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="vendor-prefixes"
                    checked={includeVendorPrefixes}
                    onCheckedChange={setIncludeVendorPrefixes}
                  />
                  <Label htmlFor="vendor-prefixes">Include vendor prefixes</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="fallback"
                    checked={includeFallback}
                    onCheckedChange={setIncludeFallback}
                  />
                  <Label htmlFor="fallback">Include fallback solid color</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Preview</h3>
            
            <GradientPreview 
              gradient={generateGradient()}
            />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">CSS Code</h3>
              
              <CssCodeBlock 
                gradient={generateGradient()}
                property={cssProp}
                includeVendorPrefixes={includeVendorPrefixes}
                includeFallback={includeFallback}
                fallbackColor={colorStops[0]?.color || "#000000"}
              />
            </div>
            
            <div className="bg-muted/40 rounded-md p-4">
              <h4 className="font-medium mb-2">Gradient Compatibility</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Modern CSS gradients are supported in all major browsers
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <span>Internet Explorer 11 and below only support linear gradients with vendor prefixes</span>
                </li>
                <li className="flex">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <span>Conic gradients have limited support in older browsers</span>
                </li>
                <li className="flex">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All modern browsers support the gradients generated by this tool</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
      
      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What are CSS gradients?</h3>
              <p className="text-sm text-muted-foreground">
                CSS gradients are a way to display smooth transitions between two or more colors. They allow you to create 
                visually appealing backgrounds and elements without using image files, which helps with page load times and 
                responsive design.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What's the difference between linear, radial, and conic gradients?</h3>
              <p className="text-sm text-muted-foreground">
                Linear gradients transition colors along a straight line. Radial gradients transition colors outward from a central point 
                in a circular or elliptical pattern. Conic gradients transition colors around a center point (like a color wheel), 
                rather than radiating outward from it.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Are CSS gradients supported in all browsers?</h3>
              <p className="text-sm text-muted-foreground">
                Modern CSS gradients are supported in all current major browsers. Linear and radial gradients have excellent support, 
                while conic gradients have good support in newer browsers. For older browsers, the vendor prefixes option in this tool 
                provides better compatibility, and the fallback color ensures something appears even in very old browsers.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How do I use the generated CSS code?</h3>
              <p className="text-sm text-muted-foreground">
                Simply copy the generated CSS code and paste it into your stylesheet. You can also use it directly in the style attribute 
                of an HTML element. The code is ready to use without any modifications. If you need compatibility with older browsers, 
                enable the "Include vendor prefixes" option.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How do color stops work in gradients?</h3>
              <p className="text-sm text-muted-foreground">
                Color stops determine where along the gradient path each color is positioned. They're expressed as percentages (0% to 100%). 
                By adjusting the positions of color stops, you can create custom transitions, abrupt color changes, or smooth blends between colors.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-center">
                Want to learn more about CSS gradients and design techniques?{' '}
                <Link href="/blog/css-gradient-generator" className="text-primary hover:underline">
                  Read our comprehensive guide
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
} 