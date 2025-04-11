"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "./CopyButton";
import Link from "next/link";

type GenerationType = "paragraphs" | "sentences" | "words";

export default function LoremIpsumGeneratorPage() {
  // Generator options
  const [type, setType] = useState<GenerationType>("paragraphs");
  const [count, setCount] = useState(3);
  const [minWordsPerSentence, setMinWordsPerSentence] = useState(5);
  const [maxWordsPerSentence, setMaxWordsPerSentence] = useState(15);
  const [minSentencesPerParagraph, setMinSentencesPerParagraph] = useState(3);
  const [maxSentencesPerParagraph, setMaxSentencesPerParagraph] = useState(7);
  
  // Output options
  const [startWithLoremIpsum, setStartWithLoremIpsum] = useState(true);
  const [includeHtml, setIncludeHtml] = useState(false);
  
  // Generator state
  const [generatedText, setGeneratedText] = useState("");
  
  // Load saved options from localStorage on component mount
  useEffect(() => {
    const savedOptions = localStorage.getItem('lorem_ipsum_generator_options');
    if (savedOptions) {
      try {
        const options = JSON.parse(savedOptions);
        
        if (options.type) setType(options.type);
        if (options.count !== undefined) setCount(options.count);
        if (options.minWordsPerSentence !== undefined) setMinWordsPerSentence(options.minWordsPerSentence);
        if (options.maxWordsPerSentence !== undefined) setMaxWordsPerSentence(options.maxWordsPerSentence);
        if (options.minSentencesPerParagraph !== undefined) setMinSentencesPerParagraph(options.minSentencesPerParagraph);
        if (options.maxSentencesPerParagraph !== undefined) setMaxSentencesPerParagraph(options.maxSentencesPerParagraph);
        if (options.startWithLoremIpsum !== undefined) setStartWithLoremIpsum(options.startWithLoremIpsum);
        if (options.includeHtml !== undefined) setIncludeHtml(options.includeHtml);
      } catch (e) {
        console.error("Error parsing saved Lorem Ipsum options", e);
      }
    }
  }, []);
  
  // Save options to localStorage whenever they change
  useEffect(() => {
    const options = {
      type,
      count,
      minWordsPerSentence,
      maxWordsPerSentence,
      minSentencesPerParagraph,
      maxSentencesPerParagraph,
      startWithLoremIpsum,
      includeHtml
    };
    
    localStorage.setItem('lorem_ipsum_generator_options', JSON.stringify(options));
  }, [
    type, count, minWordsPerSentence, maxWordsPerSentence,
    minSentencesPerParagraph, maxSentencesPerParagraph, 
    startWithLoremIpsum, includeHtml
  ]);
  
  // Latin words for the generator
  const latinWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", 
    "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", 
    "aute", "irure", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat", 
    "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", 
    "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum",
    "at", "vero", "eos", "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
    "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores", "quas",
    "molestias", "excepturi", "occaecati", "cupiditate", "provident", "similique", "mollitia",
    "animi", "perspiciatis", "unde", "omnis", "iste", "natus", "error", "rem", "aperiam",
    "eaque", "ipsa", "ab", "illo", "inventore", "veritatis", "quasi", "architecto", "beatae",
    "vitae", "dicta", "explicabo", "aspernatur", "aut", "odit", "fugit", "consequuntur",
    "magni", "dolores", "ratione", "voluptatem", "nesciunt", "neque", "porro", "quisquam"
  ];
  
  // Special starting text for Lorem Ipsum
  const loremIpsumStart = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  
  // Helper function to get random integer between min and max (inclusive)
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Helper function to capitalize first letter of a string
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Generate a random sentence
  const generateSentence = (isFirst = false) => {
    if (isFirst && startWithLoremIpsum) {
      return loremIpsumStart;
    }
    
    const numWords = getRandomInt(minWordsPerSentence, maxWordsPerSentence);
    let sentence = [];
    
    for (let i = 0; i < numWords; i++) {
      const randomWordIndex = Math.floor(Math.random() * latinWords.length);
      sentence.push(latinWords[randomWordIndex]);
    }
    
    // Capitalize first letter and add period
    sentence[0] = capitalizeFirstLetter(sentence[0]);
    return sentence.join(" ") + ".";
  };
  
  // Generate a random paragraph
  const generateParagraph = (isFirst = false) => {
    const numSentences = getRandomInt(minSentencesPerParagraph, maxSentencesPerParagraph);
    let paragraph = [];
    
    for (let i = 0; i < numSentences; i++) {
      paragraph.push(generateSentence(isFirst && i === 0));
    }
    
    return paragraph.join(" ");
  };
  
  // Generate Lorem Ipsum text
  const generateLoremIpsum = () => {
    let result = "";
    
    if (type === "paragraphs") {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph(i === 0));
      }
      result = includeHtml ? paragraphs.map(p => `<p>${p}</p>`).join("\n") : paragraphs.join("\n\n");
    } 
    else if (type === "sentences") {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence(i === 0));
      }
      result = sentences.join(" ");
      
      if (includeHtml) {
        result = `<p>${result}</p>`;
      }
    } 
    else if (type === "words") {
      // For words, we'll just grab random words without sentence structure
      const randomWords = [];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * latinWords.length);
        randomWords.push(latinWords[randomIndex]);
      }
      
      // If start with Lorem Ipsum is selected, replace the first few words
      if (startWithLoremIpsum && count >= 2) {
        randomWords[0] = "Lorem";
        randomWords[1] = "ipsum";
      }
      
      result = randomWords.join(" ");
      
      if (includeHtml) {
        result = `<p>${result}</p>`;
      }
    }
    
    setGeneratedText(result);
  };
  
  const handleGenerate = () => {
    generateLoremIpsum();
  };
  
  const handleReset = () => {
    setType("paragraphs");
    setCount(3);
    setMinWordsPerSentence(5);
    setMaxWordsPerSentence(15);
    setMinSentencesPerParagraph(3);
    setMaxSentencesPerParagraph(7);
    setStartWithLoremIpsum(true);
    setIncludeHtml(false);
    setGeneratedText("");
    
    localStorage.removeItem('lorem_ipsum_generator_options');
  };

  return (
    <div className="container py-12 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Lorem Ipsum Generator</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Generate placeholder text for designs, mockups, or content layouts.
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Generator Options</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
              
              <Tabs value={type} onValueChange={(value) => setType(value as GenerationType)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="paragraphs">Paragraphs</TabsTrigger>
                  <TabsTrigger value="sentences">Sentences</TabsTrigger>
                  <TabsTrigger value="words">Words</TabsTrigger>
                </TabsList>
                
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Number of {type}: {count}</Label>
                    </div>
                    <Slider
                      min={1}
                      max={type === "paragraphs" ? 10 : type === "sentences" ? 25 : 500}
                      step={1}
                      value={[count]}
                      onValueChange={(values: number[]) => setCount(values[0])}
                    />
                  </div>
                  
                  {(type === "paragraphs" || type === "sentences") && (
                    <div className="space-y-2">
                      <Label>Words per sentence: {minWordsPerSentence} - {maxWordsPerSentence}</Label>
                      <div className="pl-2 pr-2">
                        <Slider
                          min={3}
                          max={25}
                          step={1}
                          value={[minWordsPerSentence, maxWordsPerSentence]}
                          onValueChange={(values: number[]) => {
                            setMinWordsPerSentence(values[0]);
                            setMaxWordsPerSentence(values[1]);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {type === "paragraphs" && (
                    <div className="space-y-2">
                      <Label>Sentences per paragraph: {minSentencesPerParagraph} - {maxSentencesPerParagraph}</Label>
                      <div className="pl-2 pr-2">
                        <Slider
                          min={1}
                          max={12}
                          step={1}
                          value={[minSentencesPerParagraph, maxSentencesPerParagraph]}
                          onValueChange={(values: number[]) => {
                            setMinSentencesPerParagraph(values[0]);
                            setMaxSentencesPerParagraph(values[1]);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Tabs>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Output Options</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="start-with-lorem"
                    checked={startWithLoremIpsum}
                    onCheckedChange={setStartWithLoremIpsum}
                  />
                  <Label htmlFor="start-with-lorem">Start with "Lorem ipsum"</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="include-html"
                    checked={includeHtml}
                    onCheckedChange={setIncludeHtml}
                  />
                  <Label htmlFor="include-html">Include HTML tags</Label>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleGenerate}
                  className="w-full"
                >
                  Generate Lorem Ipsum
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Generated Text</h3>
              {generatedText && <CopyButton text={generatedText} />}
            </div>
            
            <div className="bg-muted/40 rounded-md p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
              {generatedText ? (
                <div className="text-sm whitespace-pre-wrap">
                  {includeHtml ? (
                    <div className="font-mono text-xs">{generatedText}</div>
                  ) : (
                    generatedText
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>Configure options and click "Generate Lorem Ipsum" to create placeholder text</p>
                </div>
              )}
            </div>
            
            <div className="bg-muted/40 rounded-md p-4">
              <h4 className="font-medium mb-2">How to Use Lorem Ipsum</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Lorem Ipsum is commonly used for:
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex">
                  <span className="text-primary mr-2">•</span>
                  <span>Website mockups and wireframes</span>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">•</span>
                  <span>Design previews before real content is available</span>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">•</span>
                  <span>Testing font styles and typography</span>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">•</span>
                  <span>Checking how text flows in various layouts</span>
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
              <h3 className="text-lg font-medium">What is Lorem Ipsum text?</h3>
              <p className="text-sm text-muted-foreground">
                Lorem Ipsum is placeholder text commonly used in the design, printing, and publishing industries to demonstrate 
                the visual form of a document without the distraction of meaningful content. It has roots in a piece of classical 
                Latin literature from 45 BC.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Why do designers use Lorem Ipsum?</h3>
              <p className="text-sm text-muted-foreground">
                Designers use Lorem Ipsum because it has a relatively normal distribution of letters and word spacing, making it 
                look like readable English while not distracting viewers with actual content. This allows them to focus on visual 
                elements rather than getting distracted by readable text.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">When should I use Lorem Ipsum vs. real content?</h3>
              <p className="text-sm text-muted-foreground">
                Lorem Ipsum is best used in early design stages when layout and visual hierarchy are being established. When testing 
                user experience, evaluating messaging, or preparing for final production, it's better to use real content that reflects 
                the actual text that will appear in the final product.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What do the Lorem Ipsum words mean?</h3>
              <p className="text-sm text-muted-foreground">
                The standard Lorem Ipsum passage comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) 
                by Cicero, written in 45 BC. The words themselves are Latin, though the traditional Lorem Ipsum text has been altered and doesn't translate 
                directly to meaningful Latin.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Should I use HTML tags with Lorem Ipsum?</h3>
              <p className="text-sm text-muted-foreground">
                Including HTML tags with Lorem Ipsum text can be helpful when designing web pages to visualize how different text 
                elements (headings, paragraphs, lists, etc.) will look in the context of your design. Our generator offers this option 
                to help you create more realistic mockups.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-center">
                Want to learn more about Lorem Ipsum and effective usage in design?{' '}
                <Link href="/blog/lorem-ipsum-generator" className="text-primary hover:underline">
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