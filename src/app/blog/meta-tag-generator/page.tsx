import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "The Complete Guide to Meta Tags in 2025 - DevToolBox",
  description: "Learn how to optimize your website's SEO with proper meta tags implementation, including Open Graph for social media.",
  keywords: ["meta tags", "meta tag generator", "SEO", "open graph", "website optimization", "meta description"],
  openGraph: {
    title: "The Complete Guide to Meta Tags in 2025",
    description: "Learn how to optimize your website's SEO with proper meta tags implementation, including Open Graph for social media.",
    type: "article",
    publishedTime: "2025-05-15T00:00:00Z",
    authors: ["DevToolBox Team"],
  }
};

export default function MetaTagGeneratorBlogPost() {
  return (
    <div className="container py-12 space-y-12">
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          The Complete Guide to Meta Tags in 2025
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Published: May 15, 2025</span>
          <span>•</span>
          <span>10 min read</span>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
            <p>
              Meta tags are snippets of text that describe a page's content but don't appear on the page itself. 
              They live in the <code className="bg-muted px-1 rounded">{'<head>'}</code> section of your HTML and provide 
              structured metadata about your web page to search engines and social media platforms.
            </p>
            <p>
              In this comprehensive guide, we'll explore everything you need to know about meta tags in 2025 — 
              from basic SEO tags to advanced social media optimization, and how they impact your site's 
              visibility and shareability.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Why Meta Tags Matter</h2>
            <p>
              Meta tags might be invisible to your site visitors, but they play a crucial role in how your content 
              is perceived and ranked by search engines and social platforms. Here's why they matter:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li><strong>Search Engine Optimization (SEO):</strong> Proper meta tags help search engines understand your content, improving ranking potential</li>
              <li><strong>Click-Through Rates:</strong> Compelling meta descriptions can increase click-through rates from search results</li>
              <li><strong>Social Media Sharing:</strong> Open Graph and Twitter Card tags control how your content appears when shared on social platforms</li>
              <li><strong>Content Indexing:</strong> Tags guide search engines on how to crawl and index your pages</li>
              <li><strong>User Experience:</strong> Accurate meta information helps users find relevant content</li>
            </ul>
            <p>
              In 2025's highly competitive digital landscape, optimizing every aspect of your web presence is essential, 
              and meta tags provide a significant opportunity to improve visibility with relatively minimal effort.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Essential Meta Tags for SEO</h2>
            <p>
              While there are dozens of potential meta tags, these core tags have the most impact on SEO:
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Title Tag</h3>
            <p>
              While not technically a meta tag (it's a separate HTML element), the title tag is arguably the most 
              important part of your page's metadata. It appears as the clickable headline in search results and 
              browser tabs.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<title>Primary Keyword - Secondary Keyword | Brand Name</title>`}
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>Best practices:</strong> Keep titles under 60 characters, place important keywords near the beginning, 
              make them compelling and relevant to the page content.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Meta Description</h3>
            <p>
              The meta description provides a brief summary of your page's content. While it doesn't directly 
              impact rankings, it significantly affects click-through rates from search results.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<meta name="description" content="A concise, compelling description of your page that includes key phrases and a call to action, ideally between 140-160 characters." />`}
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>Best practices:</strong> Keep descriptions between 140-160 characters, include relevant keywords naturally, 
              write compelling copy with a call to action, make each description unique.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Canonical Tag</h3>
            <p>
              The canonical tag helps prevent duplicate content issues by indicating the "preferred" version of a page.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<link rel="canonical" href="https://www.example.com/preferred-page/" />`}
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>Best practices:</strong> Use on similar or duplicate pages, ensure the URL is absolute, 
              implement consistently across your site.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Meta Robots Tag</h3>
            <p>
              The robots tag tells search engines how to crawl and index your page.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<meta name="robots" content="index, follow" />`}
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>Best practices:</strong> Only use when you need to override default behavior, understand the 
              different directives (index/noindex, follow/nofollow, etc.).
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Meta Keywords</h3>
            <p>
              Once important, meta keywords have minimal SEO value in 2025 as major search engines no longer use them 
              for ranking. However, some smaller search engines still reference them.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<meta name="keywords" content="keyword1, keyword2, keyword3" />`}
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>Best practices:</strong> If used, keep the list brief (5-7 keywords), relevant to the page content, 
              and separated by commas.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Social Media Meta Tags</h2>
            <p>
              Social media meta tags control how your content appears when shared on platforms like Facebook, 
              Twitter, LinkedIn, and Pinterest. Implementing these correctly can significantly increase engagement.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Open Graph (OG) Tags</h3>
            <p>
              Developed by Facebook but used by many platforms, Open Graph tags define how your content appears 
              when shared on social media.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="A compelling description for social sharing" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />`}
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>Best practices:</strong> Use high-quality images (1200×630px recommended), write 
              social-specific titles and descriptions, specify the correct content type (website, article, product, etc.).
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Twitter Card Tags</h3>
            <p>
              Twitter Cards provide a rich media experience when your content is shared on Twitter.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="A compelling description for Twitter" />
<meta name="twitter:image" content="https://example.com/image.jpg" />`}
            </pre>
            <p className="text-sm text-muted-foreground">
              <strong>Best practices:</strong> Choose the appropriate card type (summary, summary_large_image, app, or player), 
              include your Twitter handle, optimize images for Twitter's dimensions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Technical Meta Tags</h2>
            <p>
              These tags provide technical instructions to browsers and crawlers.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Viewport</h3>
            <p>
              The viewport tag controls how your page appears on mobile devices and is essential for responsive design.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<meta name="viewport" content="width=device-width, initial-scale=1" />`}
            </pre>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Charset</h3>
            <p>
              Defines the character encoding for your HTML document.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<meta charset="UTF-8" />`}
            </pre>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Language</h3>
            <p>
              Specifies the language of your page content.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`<html lang="en">`}
            </pre>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Meta Tags Best Practices in 2025</h2>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li><strong>Uniqueness:</strong> Create unique meta information for each page</li>
              <li><strong>Relevance:</strong> Ensure meta content accurately reflects page content</li>
              <li><strong>Length:</strong> Respect character limits (60 for titles, 160 for descriptions)</li>
              <li><strong>Keywords:</strong> Include relevant keywords naturally, not in a forced way</li>
              <li><strong>Testing:</strong> Regularly test how your pages appear in search results and social shares</li>
              <li><strong>Structured Data:</strong> Complement meta tags with JSON-LD structured data</li>
              <li><strong>Mobile Optimization:</strong> Ensure meta tags support mobile and responsive design</li>
              <li><strong>Updates:</strong> Revisit and update meta tags when content changes</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Common Meta Tag Mistakes to Avoid</h2>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Using the same title and description across multiple pages</li>
              <li>Writing vague or generic descriptions that don't encourage clicks</li>
              <li>Keyword stuffing in meta elements</li>
              <li>Exceeding recommended character limits</li>
              <li>Neglecting social media tags</li>
              <li>Using low-quality or wrongly sized images for social sharing</li>
              <li>Forgetting to update meta tags when page content changes</li>
              <li>Including misleading information that doesn't match the actual content</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Using Our Meta Tag Generator</h2>
            <p>
              Creating the perfect set of meta tags for each page can be time-consuming. Our Meta Tag Generator 
              simplifies this process:
            </p>
            <ol className="list-decimal pl-6 my-4 space-y-2">
              <li>Enter your page title, description, and other basic SEO information</li>
              <li>Add Open Graph details for optimal social media sharing</li>
              <li>Configure Twitter Card settings for Twitter-specific sharing</li>
              <li>Preview how your content will appear in search results and social media</li>
              <li>Copy the generated code to paste into your HTML file</li>
            </ol>
            <div className="mt-8">
              <Link href="/tools/meta-tag-generator">
                <Button size="lg" className="mb-4">
                  Try Our Meta Tag Generator
                </Button>
              </Link>
            </div>
            <p>
              By using our tool, you can ensure your pages have properly formatted meta tags that follow 
              current best practices, helping improve both SEO and social sharing potential.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
            <p>
              Meta tags remain a fundamental aspect of technical SEO and content optimization in 2025. 
              While they aren't the only factor in search rankings or social engagement, they provide 
              an important foundation that guides how your content is perceived, displayed, and ranked.
            </p>
            <p>
              By implementing a comprehensive meta tag strategy that encompasses SEO, social media, and 
              technical requirements, you can significantly improve your content's visibility and engagement 
              across the digital landscape.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}