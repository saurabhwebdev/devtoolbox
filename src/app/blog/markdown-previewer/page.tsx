import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Mastering Markdown: A Comprehensive Guide for Developers - DevToolBox",
  description: "Learn the fundamentals of Markdown syntax, best practices, and advanced techniques for creating well-formatted documentation, README files, and content.",
  keywords: ["Markdown", "markup language", "documentation", "GitHub Flavored Markdown", "text formatting", "README", "technical writing"],
  openGraph: {
    title: "Mastering Markdown: A Comprehensive Guide for Developers",
    description: "Learn the fundamentals of Markdown syntax, best practices, and advanced techniques for creating well-formatted documentation, README files, and content.",
    type: "article",
    publishedTime: "2025-05-14T00:00:00Z",
    authors: ["DevToolBox Team"],
  }
};

export default function MarkdownPreviewerBlogPost() {
  return (
    <div className="container py-12 space-y-12">
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Mastering Markdown: A Comprehensive Guide for Developers
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Published: May 14, 2025</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
        
        <div className="space-y-6">
          <section>
            <p className="lead">
              Markdown has become the de facto standard for writing documentation, README files, and
              content for the web. Its simple syntax allows developers to create beautifully formatted
              documents without the overhead of complex markup languages. This guide will help you master
              Markdown and leverage its full potential for your projects.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">What is Markdown?</h2>
            <p>
              Markdown is a lightweight markup language created by John Gruber in 2004, with the goal of making it easy to 
              write and read text that can be converted to structurally valid HTML. It uses plain text formatting syntax 
              designed to be converted to HTML and other formats using a tool (also called Markdown).
            </p>
            <p>
              The key design philosophy behind Markdown is readability. Documents written in Markdown should be 
              readable as-is, without looking like they've been marked up with tags or formatting instructions.
            </p>
            <div className="my-6 p-4 bg-muted/50 rounded-md">
              <h3 className="text-lg font-medium mb-2">Key Benefits of Markdown</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Simplicity:</strong> Easy to learn and use, with minimal syntax to remember</li>
                <li><strong>Readability:</strong> Clean plain text format that's readable even without rendering</li>
                <li><strong>Portability:</strong> Works across platforms and can be converted to many formats</li>
                <li><strong>Focus on Content:</strong> Helps writers focus on content rather than formatting</li>
                <li><strong>Widely Supported:</strong> Used by GitHub, Stack Overflow, Reddit, and many other platforms</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Markdown Basics</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Headers</h3>
            <p>
              Headers in Markdown are created using hash (#) symbols. The number of hashes indicates the header level:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Markdown</h4>
                <pre className="text-xs overflow-x-auto">
{`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`}
                </pre>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Result</h4>
                <div className="text-xs">
                  <h1 className="text-xl font-bold">Heading 1</h1>
                  <h2 className="text-lg font-bold">Heading 2</h2>
                  <h3 className="text-base font-bold">Heading 3</h3>
                  <h4 className="text-sm font-bold">Heading 4</h4>
                  <h5 className="text-xs font-bold">Heading 5</h5>
                  <h6 className="text-xs font-bold">Heading 6</h6>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Paragraph and Text Formatting</h3>
            <p>
              Paragraphs in Markdown are separated by one or more blank lines. Basic text formatting includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Markdown</h4>
                <pre className="text-xs overflow-x-auto">
{`This is a paragraph with *italic* text.

This paragraph has **bold** text and also
has a line break without starting a new paragraph.

Here's some text with ~~strikethrough~~.

You can also do inline \`code\` like this.`}
                </pre>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Result</h4>
                <div className="text-xs">
                  <p>This is a paragraph with <em>italic</em> text.</p>
                  <p>This paragraph has <strong>bold</strong> text and also<br />has a line break without starting a new paragraph.</p>
                  <p>Here's some text with <del>strikethrough</del>.</p>
                  <p>You can also do inline <code>code</code> like this.</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Lists</h3>
            <p>
              Markdown supports both ordered (numbered) and unordered lists:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Markdown</h4>
                <pre className="text-xs overflow-x-auto">
{`### Unordered List
- Item 1
- Item 2
  - Nested item A
  - Nested item B
- Item 3

### Ordered List
1. First item
2. Second item
   1. Nested item 1
   2. Nested item 2
3. Third item`}
                </pre>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Result</h4>
                <div className="text-xs">
                  <h3 className="text-base font-bold">Unordered List</h3>
                  <ul className="list-disc ml-5">
                    <li>Item 1</li>
                    <li>Item 2
                      <ul className="list-disc ml-5">
                        <li>Nested item A</li>
                        <li>Nested item B</li>
                      </ul>
                    </li>
                    <li>Item 3</li>
                  </ul>
                  <h3 className="text-base font-bold mt-2">Ordered List</h3>
                  <ol className="list-decimal ml-5">
                    <li>First item</li>
                    <li>Second item
                      <ol className="list-decimal ml-5">
                        <li>Nested item 1</li>
                        <li>Nested item 2</li>
                      </ol>
                    </li>
                    <li>Third item</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Links and Images</h3>
            <p>
              Markdown makes it easy to add links and embed images:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Markdown</h4>
                <pre className="text-xs overflow-x-auto">
{`### Links
[Visit DevToolBox](https://devtoolbox.com)

[Link with title](https://devtoolbox.com "DevToolBox Homepage")

### Images
![Alt text for the image](https://via.placeholder.com/150)

[![Clickable image](https://via.placeholder.com/150)](https://devtoolbox.com)`}
                </pre>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Result</h4>
                <div className="text-xs">
                  <h3 className="text-base font-bold">Links</h3>
                  <p><a href="#" className="text-blue-500 hover:underline">Visit DevToolBox</a></p>
                  <p><a href="#" className="text-blue-500 hover:underline" title="DevToolBox Homepage">Link with title</a></p>
                  
                  <h3 className="text-base font-bold mt-2">Images</h3>
                  <p>Image placeholder (150x150)</p>
                  <p>Clickable image placeholder (150x150)</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Advanced Markdown Features</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Code Blocks</h3>
            <p>
              Code blocks are essential for technical documentation. Markdown supports both inline code and multi-line code blocks with syntax highlighting:
            </p>
            <div className="p-3 bg-muted/30 rounded-md my-4">
              <h4 className="text-sm font-semibold mb-2">Markdown</h4>
              <pre className="text-xs overflow-x-auto">
{`\`\`\`javascript
// A simple JavaScript function
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

\`\`\`css
/* CSS styling example */
body {
  font-family: sans-serif;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
\`\`\``}
              </pre>
            </div>
            <p>
              The language identifier after the opening backticks (like <code>javascript</code> or <code>css</code>) 
              enables syntax highlighting specific to that language. Most Markdown processors support a wide range
              of programming languages.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Tables</h3>
            <p>
              Tables in Markdown are created using pipes and dashes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Markdown</h4>
                <pre className="text-xs overflow-x-auto">
{`| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:---------------:|-------------:|
| Text         | Text            | Text         |
| Longer text  | Longer text     | Longer text  |`}
                </pre>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Result</h4>
                <div className="text-xs">
                  <table className="min-w-full border text-center">
                    <thead className="border-b">
                      <tr>
                        <th className="border px-2 py-1">Header 1</th>
                        <th className="border px-2 py-1">Header 2</th>
                        <th className="border px-2 py-1">Header 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">Cell 1</td>
                        <td className="border px-2 py-1">Cell 2</td>
                        <td className="border px-2 py-1">Cell 3</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Cell 4</td>
                        <td className="border px-2 py-1">Cell 5</td>
                        <td className="border px-2 py-1">Cell 6</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-2">The second table demonstrates column alignment (left, center, right).</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Blockquotes</h3>
            <p>
              Blockquotes can be used to highlight quotes or important notes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Markdown</h4>
                <pre className="text-xs overflow-x-auto">
{`> This is a simple blockquote.

> This is a multi-line blockquote.
> It can span multiple lines.
>
> It can also contain multiple paragraphs.

> Blockquotes can also be nested.
>> This is a nested blockquote.
>>> And this is nested even deeper.`}
                </pre>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Result</h4>
                <div className="text-xs">
                  <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-2 italic">
                    This is a simple blockquote.
                  </blockquote>
                  <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-2 italic">
                    <p>This is a multi-line blockquote. It can span multiple lines.</p>
                    <p>It can also contain multiple paragraphs.</p>
                  </blockquote>
                  <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-2 italic">
                    Blockquotes can also be nested.
                    <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-2 italic">
                      This is a nested blockquote.
                      <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-2 italic">
                        And this is nested even deeper.
                      </blockquote>
                    </blockquote>
                  </blockquote>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Task Lists</h3>
            <p>
              Task lists (or checkbox lists) are especially useful for tracking progress:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Markdown</h4>
                <pre className="text-xs overflow-x-auto">
{`### Project Tasks
- [x] Complete project setup
- [x] Create basic documentation
- [ ] Implement core features
  - [x] Feature A
  - [ ] Feature B
  - [ ] Feature C
- [ ] Write tests
- [ ] Deploy application`}
                </pre>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Result</h4>
                <div className="text-xs">
                  <h3 className="text-base font-bold">Project Tasks</h3>
                  <ul className="list-none">
                    <li><input type="checkbox" checked readOnly /> Complete project setup</li>
                    <li><input type="checkbox" checked readOnly /> Create basic documentation</li>
                    <li>
                      <input type="checkbox" readOnly /> Implement core features
                      <ul className="list-none ml-5">
                        <li><input type="checkbox" checked readOnly /> Feature A</li>
                        <li><input type="checkbox" readOnly /> Feature B</li>
                        <li><input type="checkbox" readOnly /> Feature C</li>
                      </ul>
                    </li>
                    <li><input type="checkbox" readOnly /> Write tests</li>
                    <li><input type="checkbox" readOnly /> Deploy application</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">GitHub Flavored Markdown (GFM)</h2>
            <p>
              GitHub Flavored Markdown (GFM) is a dialect of Markdown that adds extra features specifically helpful
              for documentation and technical writing. Many of these features have become standard across various 
              Markdown implementations.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Key GFM Features</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Syntax Highlighting</h4>
                <p className="text-sm">
                  GFM enhances code blocks with syntax highlighting for a wide range of programming languages.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Task Lists</h4>
                <p className="text-sm">
                  The checkbox-based task lists shown earlier are a GFM extension that's widely supported now.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Tables</h4>
                <p className="text-sm">
                  GFM standardized the pipe-based table format that has become common across Markdown implementations.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Strikethrough</h4>
                <p className="text-sm">
                  Text can be struck through using double tildes (<code>~~text~~</code>).
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Autolinked References</h4>
                <p className="text-sm">
                  GFM automatically creates links for URLs, issue references (#123), and @mentions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Emoji Support</h4>
                <p className="text-sm">
                  GFM supports emoji shortcodes like <code>:smile:</code> and <code>:heart:</code>.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Best Practices for Writing Markdown</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">1. Use Headers for Document Structure</h3>
                <p>
                  Create a clear hierarchy with headers. Start with a single H1 (#) for the title, followed by H2s (##) for
                  main sections, and H3s (###) for subsections. Well-structured documents are easier to navigate and understand.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">2. Be Consistent with Formatting</h3>
                <p>
                  Choose a consistent style for your Markdown elements. For example, if you use hyphens (-) for unordered lists,
                  stick with them throughout your document rather than mixing with asterisks (*).
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">3. Use Line Breaks Wisely</h3>
                <p>
                  In many Markdown parsers, a single line break doesn't create a new paragraph. Use blank lines to
                  separate paragraphs. This makes your source Markdown more readable and ensures correct rendering.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">4. Preview Before Publishing</h3>
                <p>
                  Always preview your Markdown before publishing to catch any formatting issues. Our 
                  <Link href="/tools/markdown-previewer" className="text-primary hover:underline"> Markdown Previewer tool </Link>
                  is perfect for this purpose.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">5. Use Reference-Style Links for Readability</h3>
                <p>
                  For documents with many links, consider using reference-style links to keep the main text clean:
                </p>
                <pre className="text-xs bg-muted/30 p-2 rounded overflow-x-auto my-2">
{`Check out [DevToolBox][1] for more developer tools.

[1]: https://devtoolbox.com "DevToolBox Homepage"`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">6. Include a Table of Contents for Long Documents</h3>
                <p>
                  For lengthy documents, include a manually created table of contents with links to headers:
                </p>
                <pre className="text-xs bg-muted/30 p-2 rounded overflow-x-auto my-2">
{`## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Advanced Features](#advanced-features)
  - [Feature One](#feature-one)
  - [Feature Two](#feature-two)
- [Conclusion](#conclusion)`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">7. Use Code Blocks Appropriately</h3>
                <p>
                  Always specify the language for syntax highlighting in code blocks when possible. This improves readability
                  and helps readers understand the code better.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Common Use Cases for Markdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">README Files</h3>
                <p className="text-sm">
                  Markdown is the standard format for project README files on GitHub, GitLab, and other code 
                  repositories. A good README includes project description, installation instructions, usage examples,
                  and contribution guidelines.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <p className="text-sm">
                  Technical documentation, user guides, and wikis are commonly written in Markdown. Documentation
                  platforms like ReadTheDocs, Docusaurus, and GitBook all support Markdown as their primary format.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">Blog Posts</h3>
                <p className="text-sm">
                  Many blogging platforms like Jekyll, Hugo, and Ghost use Markdown for content creation. It allows
                  writers to focus on content rather than formatting details.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">Forums & Comments</h3>
                <p className="text-sm">
                  Platforms like Reddit, Stack Overflow, and Discord support Markdown for formatting comments
                  and posts, making technical discussions easier to format.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">Notes & To-Do Lists</h3>
                <p className="text-sm">
                  Applications like Notion, Obsidian, and VS Code support Markdown for note-taking and
                  knowledge management, combining simplicity with powerful formatting.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">Presentations</h3>
                <p className="text-sm">
                  Tools like Marp, Reveal.js, and Slidev allow creating presentations directly from
                  Markdown files, simplifying the creation process for technical talks.
                </p>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Using Our Markdown Previewer Tool</h2>
            <p>
              Our <Link href="/tools/markdown-previewer" className="text-primary hover:underline">Markdown Previewer</Link> tool 
              provides a seamless environment for writing and previewing Markdown content. Key features include:
            </p>
            
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Real-time Preview:</strong> See your formatted Markdown instantly as you type
              </li>
              <li>
                <strong>Syntax Highlighting:</strong> Proper highlighting for code blocks in various programming languages
              </li>
              <li>
                <strong>GitHub Flavored Markdown Support:</strong> Including tables, task lists, and strikethrough text
              </li>
              <li>
                <strong>Export Options:</strong> Export your content as HTML, Markdown, or plain text
              </li>
              <li>
                <strong>Markdown Cheatsheet:</strong> Quick reference for common Markdown syntax
              </li>
              <li>
                <strong>Local Storage:</strong> Your work is automatically saved in your browser
              </li>
              <li>
                <strong>Undo/Redo:</strong> Track changes and revert when needed
              </li>
            </ul>
            
            <p>
              The tool is perfect for drafting README files, documentation, blog posts, or any content that
              requires structured formatting. You can work on your content, preview it in real-time, and then
              export it in your preferred format.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
            <p>
              Markdown has revolutionized how developers write and format text for the web. Its simplicity,
              readability, and widespread support have made it the lingua franca of technical documentation
              and content creation.
            </p>
            <p>
              By mastering Markdown, you'll streamline your workflow, improve your documentation, and communicate
              more effectively with both technical and non-technical audiences. Its gentle learning curve makes
              it accessible to beginners, while its flexibility accommodates advanced users.
            </p>
            <p>
              Whether you're documenting code, writing technical blogs, or creating project README files,
              Markdown offers the perfect balance between simplicity and capability. Start using our
              <Link href="/tools/markdown-previewer" className="text-primary hover:underline"> Markdown Previewer </Link>
              to experiment with Markdown and incorporate it into your development workflow.
            </p>
          </section>
        </div>
      </article>
      
      <div className="flex justify-center mt-12">
        <Button asChild>
          <Link href="/tools/markdown-previewer">
            Try the Markdown Previewer Tool
          </Link>
        </Button>
      </div>
    </div>
  );
} 