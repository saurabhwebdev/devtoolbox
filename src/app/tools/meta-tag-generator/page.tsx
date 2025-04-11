"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MetaCodeBlock } from "./MetaCodeBlock";
import Link from "next/link";

export default function MetaTagGeneratorPage() {
  // Basic SEO
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  
  // Open Graph
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogType, setOgType] = useState("website");
  
  // Twitter
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterSite, setTwitterSite] = useState("");
  const [twitterCreator, setTwitterCreator] = useState("");
  
  // Active tab
  const [activeTab, setActiveTab] = useState("basic");
  
  // Generation state
  const [generated, setGenerated] = useState(false);
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('meta_tag_generator_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        
        // Basic SEO
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
        if (data.keywords) setKeywords(data.keywords);
        if (data.author) setAuthor(data.author);
        if (data.canonicalUrl) setCanonicalUrl(data.canonicalUrl);
        
        // Open Graph
        if (data.ogTitle) setOgTitle(data.ogTitle);
        if (data.ogDescription) setOgDescription(data.ogDescription);
        if (data.ogUrl) setOgUrl(data.ogUrl);
        if (data.ogImage) setOgImage(data.ogImage);
        if (data.ogType) setOgType(data.ogType);
        
        // Twitter
        if (data.twitterCard) setTwitterCard(data.twitterCard);
        if (data.twitterSite) setTwitterSite(data.twitterSite);
        if (data.twitterCreator) setTwitterCreator(data.twitterCreator);
      } catch (e) {
        console.error("Error parsing saved meta tag data", e);
      }
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      title,
      description,
      keywords,
      author,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogUrl,
      ogImage,
      ogType,
      twitterCard,
      twitterSite,
      twitterCreator
    };
    
    localStorage.setItem('meta_tag_generator_data', JSON.stringify(dataToSave));
  }, [
    title, description, keywords, author, canonicalUrl,
    ogTitle, ogDescription, ogUrl, ogImage, ogType,
    twitterCard, twitterSite, twitterCreator
  ]);
  
  const handleGenerate = () => {
    setGenerated(true);
  };
  
  const handleReset = () => {
    // Reset all fields
    setTitle("");
    setDescription("");
    setKeywords("");
    setAuthor("");
    setCanonicalUrl("");
    setOgTitle("");
    setOgDescription("");
    setOgUrl("");
    setOgImage("");
    setOgType("website");
    setTwitterCard("summary_large_image");
    setTwitterSite("");
    setTwitterCreator("");
    setGenerated(false);
    
    // Clear localStorage
    localStorage.removeItem('meta_tag_generator_data');
  };
  
  const handleOgSync = () => {
    setOgTitle(title);
    setOgDescription(description);
  };

  return (
    <div className="container py-12 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Meta Tag Generator</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Create SEO-friendly meta tags for your website, including Open Graph tags for social media sharing.
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
                <TabsTrigger value="twitter">Twitter</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input 
                    id="title" 
                    placeholder="My Awesome Page" 
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="A brief description of your page content (150-160 characters recommended)"
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {description.length} / 160 characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input 
                    id="keywords" 
                    placeholder="keyword1, keyword2, keyword3" 
                    value={keywords}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate with commas
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input 
                    id="author" 
                    placeholder="John Doe" 
                    value={author}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="canonical">Canonical URL</Label>
                  <Input 
                    id="canonical" 
                    placeholder="https://www.example.com/page" 
                    value={canonicalUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCanonicalUrl(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="opengraph" className="space-y-4 pt-4">
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleOgSync}
                  >
                    Copy from Basic SEO
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og-title">OG Title</Label>
                  <Input 
                    id="og-title" 
                    placeholder="Title for social sharing" 
                    value={ogTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setOgTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og-description">OG Description</Label>
                  <Textarea 
                    id="og-description" 
                    placeholder="Description for social sharing"
                    value={ogDescription}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setOgDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og-url">OG URL</Label>
                  <Input 
                    id="og-url" 
                    placeholder="https://www.example.com/page" 
                    value={ogUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setOgUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og-image">OG Image URL</Label>
                  <Input 
                    id="og-image" 
                    placeholder="https://www.example.com/image.jpg" 
                    value={ogImage}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setOgImage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 1200x630 pixels
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og-type">OG Type</Label>
                  <select 
                    id="og-type"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    value={ogType}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setOgType(e.target.value)}
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="blog">Blog</option>
                    <option value="product">Product</option>
                    <option value="profile">Profile</option>
                  </select>
                </div>
              </TabsContent>
              
              <TabsContent value="twitter" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter-card">Twitter Card</Label>
                  <select 
                    id="twitter-card"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    value={twitterCard}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setTwitterCard(e.target.value)}
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary with Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter-site">Twitter Site</Label>
                  <Input 
                    id="twitter-site" 
                    placeholder="@yoursite" 
                    value={twitterSite}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTwitterSite(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter-creator">Twitter Creator</Label>
                  <Input 
                    id="twitter-creator" 
                    placeholder="@username" 
                    value={twitterCreator}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTwitterCreator(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button 
                onClick={handleGenerate}
                disabled={!title && !description}
              >
                Generate Meta Tags
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Preview</h3>
            
            {generated ? (
              <MetaCodeBlock 
                title={title}
                description={description}
                keywords={keywords}
                author={author}
                canonicalUrl={canonicalUrl}
                ogTitle={ogTitle || title}
                ogDescription={ogDescription || description}
                ogUrl={ogUrl || canonicalUrl}
                ogImage={ogImage}
                ogType={ogType}
                twitterCard={twitterCard}
                twitterSite={twitterSite}
                twitterCreator={twitterCreator}
              />
            ) : (
              <div className="bg-muted/40 rounded-md p-6 flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-center">
                  Fill in the form and click "Generate Meta Tags" to see your code here
                </p>
              </div>
            )}
            
            <div className="bg-muted/40 rounded-md p-4">
              <h4 className="font-medium mb-2">Learn More About Meta Tags</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Meta tags help search engines and social platforms understand your content
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex">
                  <span className="text-primary mr-2">•</span>
                  <Link href="https://developers.google.com/search/docs/beginner/seo-starter-guide" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank">
                    Google's SEO Starter Guide
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">•</span>
                  <Link href="https://ogp.me/" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank">
                    Open Graph Protocol
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-primary mr-2">•</span>
                  <Link href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank">
                    Twitter Cards Documentation
                  </Link>
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
              <h3 className="text-lg font-medium">What are meta tags?</h3>
              <p className="text-sm text-muted-foreground">
                Meta tags are snippets of text that describe a page's content. They don't appear on the page itself, but in the page's HTML. 
                These tags help search engines understand the content on your pages and how to display them in search results.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Why are meta tags important for SEO?</h3>
              <p className="text-sm text-muted-foreground">
                Meta tags are crucial for SEO because they help search engines understand your content and how to index it. 
                Well-crafted meta tags can improve your visibility in search results, increase click-through rates, and help social 
                media platforms display your content correctly when shared.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What's the difference between Open Graph and Twitter cards?</h3>
              <p className="text-sm text-muted-foreground">
                Open Graph (OG) tags were developed by Facebook to control how content appears when shared on social media platforms. 
                Twitter Cards are Twitter's equivalent system. While there's overlap between them, Twitter Cards offer some Twitter-specific 
                features, which is why it's recommended to include both sets of tags for optimal sharing across all platforms.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How long should my meta description be?</h3>
              <p className="text-sm text-muted-foreground">
                While there's no fixed character limit, Google typically displays about 155-160 characters of a meta description on desktop 
                (less on mobile). It's best to keep your descriptions concise, compelling, and between 120-160 characters to ensure they 
                display fully in search results.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Should every page have unique meta tags?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, each page on your website should have unique meta tags that accurately describe that specific page's content. 
                Duplicate meta tags across multiple pages can confuse search engines and may harm your SEO efforts. This generator 
                helps you create unique meta tags for each page.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-center">
                Want to learn more about meta tags and SEO best practices?{' '}
                <Link href="/blog/meta-tag-generator" className="text-primary hover:underline">
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