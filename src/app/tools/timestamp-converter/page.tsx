"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { toast } from "sonner";

export default function TimestampConverterPage() {
  // Unix timestamp input/output
  const [unixTimestamp, setUnixTimestamp] = useState<string>("");
  
  // Human-readable date parts
  const [dateString, setDateString] = useState<string>("");
  const [timeString, setTimeString] = useState<string>("");
  
  // Direction of conversion
  const [direction, setDirection] = useState<"toDate" | "toTimestamp">("toDate");
  
  // Timestamp unit
  const [timestampUnit, setTimestampUnit] = useState<"seconds" | "milliseconds">("seconds");
  
  // Timezone handling
  const [timezone, setTimezone] = useState<string>("local");
  
  // Active tab
  const [activeTab, setActiveTab] = useState("converter");
  
  // Current date/time for the "Now" button
  const getCurrentTimestamp = (): number => {
    return Math.floor(Date.now() / (timestampUnit === "seconds" ? 1000 : 1));
  };
  
  // Format a date object to YYYY-MM-DD
  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  // Format a date object to HH:MM:SS
  const formatTimeString = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  
  // Fill form with current date/time
  const handleSetNow = () => {
    const now = new Date();
    if (direction === "toTimestamp") {
      setDateString(formatDateString(now));
      setTimeString(formatTimeString(now));
    } else {
      setUnixTimestamp(getCurrentTimestamp().toString());
    }
    toast.success("Current time set");
  };
  
  // Reset all form fields
  const handleReset = () => {
    setUnixTimestamp("");
    setDateString("");
    setTimeString("");
    toast.success("Form reset");
  };
  
  // Copy result to clipboard
  const handleCopy = () => {
    let textToCopy = "";
    
    if (direction === "toDate" && dateString && timeString) {
      textToCopy = `${dateString} ${timeString}`;
    } else if (direction === "toTimestamp" && unixTimestamp) {
      textToCopy = unixTimestamp;
    } else {
      toast.error("Nothing to copy");
      return;
    }
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };
  
  // Convert timestamp to date
  const convertTimestampToDate = (timestamp: string): void => {
    if (!timestamp.trim()) {
      toast.error("Please enter a timestamp");
      return;
    }
    
    try {
      const parsedTimestamp = parseInt(timestamp, 10);
      if (isNaN(parsedTimestamp)) {
        throw new Error("Invalid timestamp");
      }
      
      const multiplier = timestampUnit === "seconds" ? 1000 : 1;
      const date = new Date(parsedTimestamp * multiplier);
      
      if (date.toString() === "Invalid Date") {
        throw new Error("Invalid date result");
      }
      
      setDateString(formatDateString(date));
      setTimeString(formatTimeString(date));
      toast.success("Conversion completed");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Invalid timestamp format");
    }
  };
  
  // Convert date to timestamp
  const convertDateToTimestamp = (date: string, time: string): void => {
    if (!date.trim()) {
      toast.error("Please enter a date");
      return;
    }
    
    if (!time.trim()) {
      toast.error("Please enter a time");
      return;
    }
    
    try {
      const dateTimeString = `${date}T${time}`;
      const dateObj = new Date(dateTimeString);
      
      if (dateObj.toString() === "Invalid Date") {
        throw new Error("Invalid date input");
      }
      
      const divider = timestampUnit === "seconds" ? 1000 : 1;
      const timestamp = Math.floor(dateObj.getTime() / divider);
      
      setUnixTimestamp(timestamp.toString());
      toast.success("Conversion completed");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Invalid date/time format");
    }
  };
  
  // Handle the conversion
  const handleConvert = () => {
    if (direction === "toDate") {
      convertTimestampToDate(unixTimestamp);
    } else {
      convertDateToTimestamp(dateString, timeString);
    }
  };
  
  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Timestamp Converter</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Convert between UNIX timestamps and human-readable dates for debugging, logging, and API development.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/timestamp-converter" className="text-sm underline underline-offset-4">
            Learn about timestamps
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
                  onValueChange={(value) => setDirection(value as "toDate" | "toTimestamp")}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="toDate" id="toDate" />
                    <Label htmlFor="toDate">Timestamp to Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="toTimestamp" id="toTimestamp" />
                    <Label htmlFor="toTimestamp">Date to Timestamp</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex flex-col gap-3">
                <Label>Timestamp Unit</Label>
                <RadioGroup 
                  value={timestampUnit} 
                  onValueChange={(value) => setTimestampUnit(value as "seconds" | "milliseconds")}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seconds" id="seconds" />
                    <Label htmlFor="seconds">Seconds (Unix standard)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="milliseconds" id="milliseconds" />
                    <Label htmlFor="milliseconds">Milliseconds (JavaScript standard)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="pt-4">
                {direction === "toDate" ? (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="unixTimestamp">UNIX Timestamp</Label>
                        <Button variant="outline" size="sm" onClick={handleSetNow}>
                          Use Current Time
                        </Button>
                      </div>
                      <Input
                        id="unixTimestamp"
                        type="text"
                        placeholder={timestampUnit === "seconds" ? "e.g., 1714499098" : "e.g., 1714499098000"}
                        value={unixTimestamp}
                        onChange={(e) => setUnixTimestamp(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <Label>Converted Date & Time</Label>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={dateString}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            step="1"
                            value={timeString}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label>Date & Time</Label>
                        <Button variant="outline" size="sm" onClick={handleSetNow}>
                          Use Current Time
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={dateString}
                            onChange={(e) => setDateString(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            step="1"
                            value={timeString}
                            onChange={(e) => setTimeString(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <Label htmlFor="unixTimestamp">UNIX Timestamp</Label>
                      <Input
                        id="unixTimestamp"
                        type="text"
                        placeholder="Converted timestamp will appear here"
                        value={unixTimestamp}
                        readOnly
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-6 flex items-center justify-center gap-4">
              <Button size="lg" onClick={handleConvert}>Convert</Button>
              <Button variant="outline" size="lg" onClick={handleReset}>Reset</Button>
              <Button variant="secondary" size="lg" onClick={handleCopy}>Copy</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="reference" className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About UNIX Timestamps</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  UNIX timestamps represent time as the number of seconds that have elapsed since January 1, 1970, at 00:00:00 UTC (the "UNIX Epoch").
                </p>
                <ul className="space-y-2 text-sm">
                  <li><strong>Standard UNIX timestamp:</strong> Seconds since the epoch (e.g., 1714499098)</li>
                  <li><strong>JavaScript timestamp:</strong> Milliseconds since the epoch (e.g., 1714499098000)</li>
                  <li><strong>Y2K38 problem:</strong> 32-bit systems can only represent timestamps until January 19, 2038</li>
                </ul>
              </div>
              
              <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold mb-2">Common Timestamp Values</h3>
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-2 px-4 text-left">Timestamp (seconds)</th>
                      <th className="py-2 px-4 text-left">Date & Time (UTC)</th>
                      <th className="py-2 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">0</td>
                      <td className="py-2 px-4">1970-01-01 00:00:00</td>
                      <td className="py-2 px-4">UNIX Epoch</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">946684800</td>
                      <td className="py-2 px-4">2000-01-01 00:00:00</td>
                      <td className="py-2 px-4">Y2K</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">1609459200</td>
                      <td className="py-2 px-4">2021-01-01 00:00:00</td>
                      <td className="py-2 px-4">Beginning of 2021</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">2147483647</td>
                      <td className="py-2 px-4">2038-01-19 03:14:07</td>
                      <td className="py-2 px-4">Maximum 32-bit timestamp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Common Use Cases</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Logging:</strong> Standardized way to record when events occurred</li>
                  <li><strong>API handling:</strong> Many APIs return timestamps in their responses</li>
                  <li><strong>Database storage:</strong> Efficient way to store time data</li>
                  <li><strong>Version control:</strong> Git and other systems use timestamps</li>
                  <li><strong>File systems:</strong> File creation and modification times</li>
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
            <h3 className="text-lg font-semibold mb-2">What is a UNIX timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              A UNIX timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC), not counting leap seconds. 
              It's a standardized way to represent a specific point in time across different systems.
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Why use timestamps instead of formatted dates?</h3>
            <p className="text-sm text-muted-foreground">
              Timestamps are language-independent, compact, easy to compare, and avoid issues with different time zones 
              and daylight saving time changes. They're also efficient for storage and calculations.
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">What's the difference between seconds and milliseconds?</h3>
            <p className="text-sm text-muted-foreground">
              Standard UNIX timestamps count seconds since the epoch, while JavaScript's Date.now() returns milliseconds. 
              To convert between them, multiply seconds by 1000 to get milliseconds, or divide milliseconds by 1000 to get seconds.
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">How do I get the current timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              In JavaScript: <code className="text-xs bg-muted p-1 rounded">Math.floor(Date.now() / 1000)</code> for seconds, 
              or just <code className="text-xs bg-muted p-1 rounded">Date.now()</code> for milliseconds. 
              In most other programming languages and Unix-like systems, there are built-in functions to get the current timestamp.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
} 