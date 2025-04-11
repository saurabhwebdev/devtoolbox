"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Match {
  start: number;
  end: number;
  text: string;
}

export default function RegexTesterPage() {
  // Input values
  const [pattern, setPattern] = useState("");
  const [inputText, setInputText] = useState("");
  
  // Flags
  const [globalFlag, setGlobalFlag] = useState(true);
  const [caseInsensitiveFlag, setCaseInsensitiveFlag] = useState(false);
  const [multilineFlag, setMultilineFlag] = useState(false);
  const [dotAllFlag, setDotAllFlag] = useState(false);
  
  // Results
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Active tab
  const [activeTab, setActiveTab] = useState("tester");
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('regex_tester_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.pattern) setPattern(data.pattern);
        if (data.inputText) setInputText(data.inputText);
        if (data.globalFlag !== undefined) setGlobalFlag(data.globalFlag);
        if (data.caseInsensitiveFlag !== undefined) setCaseInsensitiveFlag(data.caseInsensitiveFlag);
        if (data.multilineFlag !== undefined) setMultilineFlag(data.multilineFlag);
        if (data.dotAllFlag !== undefined) setDotAllFlag(data.dotAllFlag);
      } catch (e) {
        console.error("Error parsing saved regex tester data", e);
      }
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      pattern,
      inputText,
      globalFlag,
      caseInsensitiveFlag,
      multilineFlag,
      dotAllFlag
    };
    
    localStorage.setItem('regex_tester_data', JSON.stringify(dataToSave));
  }, [pattern, inputText, globalFlag, caseInsensitiveFlag, multilineFlag, dotAllFlag]);
  
  // Process regex and find matches
  useEffect(() => {
    if (!pattern || !inputText) {
      setMatches([]);
      setMatchCount(0);
      setIsError(false);
      setErrorMessage("");
      return;
    }
    
    try {
      // Build flags string
      let flags = "";
      if (globalFlag) flags += "g";
      if (caseInsensitiveFlag) flags += "i";
      if (multilineFlag) flags += "m";
      if (dotAllFlag) flags += "s";
      
      const regex = new RegExp(pattern, flags);
      
      // Find all matches
      const matchResults: Match[] = [];
      let match;
      
      if (globalFlag) {
        while ((match = regex.exec(inputText)) !== null) {
          matchResults.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0]
          });
          
          // Prevent infinite loops for zero-length matches (like /^/ or /$/g)
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(inputText);
        if (match) {
          matchResults.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0]
          });
        }
      }
      
      setMatches(matchResults);
      setMatchCount(matchResults.length);
      setIsError(false);
      setErrorMessage("");
    } catch (error) {
      setMatches([]);
      setMatchCount(0);
      setIsError(true);
      setErrorMessage((error as Error).message);
    }
  }, [pattern, inputText, globalFlag, caseInsensitiveFlag, multilineFlag, dotAllFlag]);
  
  const handleReset = () => {
    setPattern("");
    setInputText("");
    setGlobalFlag(true);
    setCaseInsensitiveFlag(false);
    setMultilineFlag(false);
    setDotAllFlag(false);
    setMatches([]);
    setMatchCount(0);
    setIsError(false);
    setErrorMessage("");
    
    // Clear localStorage
    localStorage.removeItem('regex_tester_data');
  };
  
  const handleCopyPattern = () => {
    navigator.clipboard.writeText(pattern);
  };

  const buildHighlightedText = () => {
    if (!inputText || matches.length === 0) return inputText;
    
    // Convert text to JSX with highlighted matches
    let lastIndex = 0;
    const parts: JSX.Element[] = [];
    
    matches.forEach((match, index) => {
      // Add non-matching text before this match
      if (match.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {inputText.slice(lastIndex, match.start)}
          </span>
        );
      }
      
      // Add highlighted match
      parts.push(
        <span key={`match-${index}`} className="bg-yellow-500/30 dark:bg-yellow-500/50 rounded px-0.5">
          {match.text}
        </span>
      );
      
      lastIndex = match.end;
    });
    
    // Add remaining text after the last match
    if (lastIndex < inputText.length) {
      parts.push(
        <span key="text-end">
          {inputText.slice(lastIndex)}
        </span>
      );
    }
    
    return <div className="whitespace-pre-wrap font-mono text-sm">{parts}</div>;
  };

  return (
    <div className="container py-12 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Regex Tester</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Test and debug your regular expressions with live highlighting and match information.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/regex-tester" className="text-sm underline underline-offset-4">
            Read our guide on regex
          </Link>
        </div>
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tester">Regex Tester</TabsTrigger>
            <TabsTrigger value="guide">Quick Reference</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tester" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pattern">Regular Expression</Label>
                  <div className="flex">
                    <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                      /
                    </div>
                    <Input 
                      id="pattern" 
                      placeholder="your-pattern-here"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      className="rounded-l-none"
                    />
                    <div className="bg-muted flex items-center px-3 rounded-r-md border border-l-0 border-input">
                      /
                      {globalFlag && "g"}
                      {caseInsensitiveFlag && "i"}
                      {multilineFlag && "m"}
                      {dotAllFlag && "s"}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Flags</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="globalFlag" 
                        checked={globalFlag} 
                        onCheckedChange={(checked) => setGlobalFlag(checked === true)}
                      />
                      <Label htmlFor="globalFlag" className="cursor-pointer">Global (g)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="caseInsensitiveFlag" 
                        checked={caseInsensitiveFlag} 
                        onCheckedChange={(checked) => setCaseInsensitiveFlag(checked === true)}
                      />
                      <Label htmlFor="caseInsensitiveFlag" className="cursor-pointer">Case Insensitive (i)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="multilineFlag" 
                        checked={multilineFlag} 
                        onCheckedChange={(checked) => setMultilineFlag(checked === true)}
                      />
                      <Label htmlFor="multilineFlag" className="cursor-pointer">Multiline (m)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="dotAllFlag" 
                        checked={dotAllFlag} 
                        onCheckedChange={(checked) => setDotAllFlag(checked === true)}
                      />
                      <Label htmlFor="dotAllFlag" className="cursor-pointer">Dot All (s)</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inputText">Test String</Label>
                  <Textarea 
                    id="inputText" 
                    placeholder="Enter text to test your regex against"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={handleCopyPattern} variant="outline">
                    Copy Regex
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    Reset All
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Results</h3>
                    <Badge variant={isError ? "destructive" : matchCount > 0 ? "default" : "outline"}>
                      {isError ? "Error" : `${matchCount} match${matchCount !== 1 ? "es" : ""}`}
                    </Badge>
                  </div>
                  
                  {isError ? (
                    <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive">
                      {errorMessage}
                    </div>
                  ) : (
                    <div className="p-4 rounded-md bg-muted/50 border min-h-[150px] max-h-[400px] overflow-y-auto">
                      {buildHighlightedText()}
                    </div>
                  )}
                  
                  {matches.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Match Details</h4>
                      <div className="max-h-[200px] overflow-y-auto">
                        {matches.map((match, index) => (
                          <div key={index} className="text-sm p-2 border-b last:border-0">
                            <div className="flex justify-between">
                              <span className="font-medium">Match {index + 1}</span>
                              <span className="text-xs text-muted-foreground">
                                Position: {match.start}-{match.end}
                              </span>
                            </div>
                            <code className="text-xs block mt-1 bg-muted p-1 rounded">
                              {match.text}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="guide" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Regular Expression Quick Reference</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 space-y-2">
                  <h4 className="font-medium">Character Classes</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="font-mono">\d</td>
                        <td>Any digit (0-9)</td>
                      </tr>
                      <tr>
                        <td className="font-mono">\w</td>
                        <td>Word character (a-z, A-Z, 0-9, _)</td>
                      </tr>
                      <tr>
                        <td className="font-mono">\s</td>
                        <td>Whitespace character</td>
                      </tr>
                      <tr>
                        <td className="font-mono">[abc]</td>
                        <td>Any character in the set</td>
                      </tr>
                      <tr>
                        <td className="font-mono">[^abc]</td>
                        <td>Any character not in the set</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                
                <Card className="p-4 space-y-2">
                  <h4 className="font-medium">Quantifiers</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="font-mono">*</td>
                        <td>0 or more</td>
                      </tr>
                      <tr>
                        <td className="font-mono">+</td>
                        <td>1 or more</td>
                      </tr>
                      <tr>
                        <td className="font-mono">?</td>
                        <td>0 or 1</td>
                      </tr>
                      <tr>
                        <td className="font-mono">{"{3}"}</td>
                        <td>Exactly 3</td>
                      </tr>
                      <tr>
                        <td className="font-mono">{"{3,5}"}</td>
                        <td>Between 3 and 5</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                
                <Card className="p-4 space-y-2">
                  <h4 className="font-medium">Anchors and Boundaries</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="font-mono">^</td>
                        <td>Start of string</td>
                      </tr>
                      <tr>
                        <td className="font-mono">$</td>
                        <td>End of string</td>
                      </tr>
                      <tr>
                        <td className="font-mono">\b</td>
                        <td>Word boundary</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                
                <Card className="p-4 space-y-2">
                  <h4 className="font-medium">Common Patterns</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="font-mono">^.{"{5,}"}$</td>
                        <td>Minimum 5 characters</td>
                      </tr>
                      <tr>
                        <td className="font-mono">[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"}</td>
                        <td>Simple email validation</td>
                      </tr>
                      <tr>
                        <td className="font-mono">^(https?|ftp)://</td>
                        <td>URL protocol</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
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
            <h3 className="text-lg font-medium mb-2">What are regular expressions?</h3>
            <p className="text-muted-foreground">Regular expressions (regex) are patterns used to match character combinations in strings. They provide a powerful way to search, extract, and manipulate text.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">What do the different flags mean?</h3>
            <p className="text-muted-foreground">The 'g' flag enables global matching (find all matches), 'i' makes matching case-insensitive, 'm' enables multiline mode, and 's' allows the dot to match newlines.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Why isn't my regex working?</h3>
            <p className="text-muted-foreground">Common regex issues include missing escape characters for special symbols, incorrect character classes, or not accounting for edge cases. Check the syntax guide for help.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Is my data secure when using this tool?</h3>
            <p className="text-muted-foreground">Yes. All processing happens in your browser. Your patterns and text aren't sent to any server, ensuring your data remains private and secure.</p>
          </Card>
        </div>
      </div>
    </div>
  );
} 