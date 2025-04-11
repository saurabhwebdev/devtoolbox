import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Understanding HTML to JSX Conversion - DevToolBox",
  description: "Learn about the differences between HTML and JSX, conversion strategies, and best practices for React components.",
  keywords: ["HTML to JSX", "React", "JSX conversion", "React components", "frontend development", "web development"],
  openGraph: {
    title: "Understanding HTML to JSX Conversion",
    description: "Learn about the differences between HTML and JSX, conversion strategies, and best practices for React components.",
    type: "article",
    publishedTime: "2025-05-05T00:00:00Z",
    authors: ["DevToolBox Team"],
  }
};

export default function HtmlToJsxBlogPost() {
  return (
    <div className="container py-12 space-y-12">
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Understanding HTML to JSX Conversion
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Published: May 5, 2025</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
        
        <div className="space-y-6">
          <section>
            <p className="lead">
              When working with React, converting HTML to JSX is a common task for developers integrating existing 
              designs, third-party templates, or migrating traditional websites to React applications. While JSX 
              closely resembles HTML, there are important differences that require careful handling during conversion.
            </p>
            
            <p>
              This guide explains what JSX is, the key differences from HTML, common challenges in conversion, 
              and best practices for creating effective and maintainable React components.
            </p>
            
            <div className="my-6 p-4 bg-primary/5 rounded-md">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-medium">Try Our HTML to JSX Converter Tool</h3>
                  <p className="text-muted-foreground mt-2">
                    Quickly convert HTML code to valid JSX with our interactive tool. Perfect for React development and component migration.
                  </p>
                </div>
                <Button asChild className="shrink-0">
                  <Link href="/tools/html-to-jsx">Try the Tool</Link>
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">What is JSX?</h2>
            <p>
              JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML but comes with
              the full power of JavaScript. Developed by Facebook for React, JSX allows you to write HTML-like code
              in your JavaScript files, making it easier to visualize the UI structure within your code.
            </p>
            <p>
              Though it resembles HTML, JSX is actually closer to JavaScript. It gets transformed into JavaScript
              function calls during the build process, typically using tools like Babel.
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
{`// JSX code
const element = <h1>Hello, world!</h1>;

// Transformed JavaScript
const element = React.createElement('h1', null, 'Hello, world!');`}
            </pre>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Key Differences Between HTML and JSX</h2>
            
            <div className="not-prose my-8">
              <Tabs defaultValue="attributes" className="w-full">
                <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full h-auto">
                  <TabsTrigger value="attributes">Attribute Names</TabsTrigger>
                  <TabsTrigger value="tags">Self-Closing Tags</TabsTrigger>
                  <TabsTrigger value="style">Style Attribute</TabsTrigger>
                  <TabsTrigger value="expressions">JS Expressions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="attributes">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Different Attribute Names</h3>
                      <p className="text-muted-foreground mb-4">
                        Several HTML attributes have different names in JSX because some words are reserved in JavaScript:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead>
                            <tr>
                              <th className="text-left py-2">HTML</th>
                              <th className="text-left py-2">JSX</th>
                              <th className="text-left py-2">Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 font-mono">class</td>
                              <td className="py-2 font-mono">className</td>
                              <td className="py-2">"class" is a reserved word in JavaScript</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono">for</td>
                              <td className="py-2 font-mono">htmlFor</td>
                              <td className="py-2">"for" is a reserved word in JavaScript</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono">tabindex</td>
                              <td className="py-2 font-mono">tabIndex</td>
                              <td className="py-2">JSX uses camelCase property naming convention</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono">onclick</td>
                              <td className="py-2 font-mono">onClick</td>
                              <td className="py-2">All event handlers use camelCase in JSX</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tags">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Self-Closing Tags</h3>
                      <p className="text-muted-foreground mb-4">
                        In HTML, some tags don't need a closing tag (like &lt;img&gt; or &lt;input&gt;). In JSX, all tags must be explicitly closed,
                        either with a matching end tag or with a self-closing tag syntax.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="p-3 bg-muted/30 rounded-md">
                          <h4 className="text-sm font-semibold mb-2">HTML:</h4>
                          <pre className="text-xs font-mono">
{`<img src="image.jpg">
<br>
<input type="text">`}
                          </pre>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md">
                          <h4 className="text-sm font-semibold mb-2">JSX:</h4>
                          <pre className="text-xs font-mono">
{`<img src="image.jpg" />
<br />
<input type="text" />`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="style">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Style Attribute</h3>
                      <p className="text-muted-foreground mb-4">
                        In HTML, styles are specified as strings. In JSX, styles are specified as objects with camelCased properties:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="p-3 bg-muted/30 rounded-md">
                          <h4 className="text-sm font-semibold mb-2">HTML:</h4>
                          <pre className="text-xs font-mono">
{`<div style="color: red; font-size: 14px; background-color: #f0f0f0;">
  Styled content
</div>`}
                          </pre>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md">
                          <h4 className="text-sm font-semibold mb-2">JSX:</h4>
                          <pre className="text-xs font-mono">
{`<div style={{
  color: 'red',
  fontSize: '14px',
  backgroundColor: '#f0f0f0'
}}>
  Styled content
</div>`}
                          </pre>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Note that hyphenated CSS properties are written in camelCase in JSX (e.g., <code className="text-xs">background-color</code> becomes <code className="text-xs">backgroundColor</code>).
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="expressions">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">JavaScript Expressions</h3>
                      <p className="text-muted-foreground mb-4">
                        JSX allows you to embed JavaScript expressions within curly braces, enabling dynamic content and logic:
                      </p>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <pre className="text-xs overflow-x-auto font-mono">
{`// Variables
const name = 'John';
<h1>Hello, {name}!</h1>

// Functions
<button onClick={() => alert('Clicked!')}>Click me</button>

// Conditionals
<div>{isLoggedIn ? <UserGreeting /> : <GuestGreeting />}</div>

// Array mapping
<ul>
  {items.map(item => <li key={item.id}>{item.text}</li>)}
</ul>`}
                        </pre>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        This ability to use JavaScript directly within markup is one of the most powerful features of JSX.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Common Challenges in HTML to JSX Conversion</h2>
            
            <div className="not-prose my-8">
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full h-auto">
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="events">Event Handlers</TabsTrigger>
                  <TabsTrigger value="forms">Form Elements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="comments">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">HTML Comments</h3>
                      <p className="text-muted-foreground mb-4">
                        HTML comments must be replaced with JavaScript comments in JSX:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="p-3 bg-muted/30 rounded-md">
                          <h4 className="text-sm font-semibold mb-2">HTML:</h4>
                          <pre className="text-xs font-mono">
{`<div>
  <!-- This is an HTML comment -->
  <p>Some content</p>
</div>`}
                          </pre>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md">
                          <h4 className="text-sm font-semibold mb-2">JSX:</h4>
                          <pre className="text-xs font-mono">
{`<div>
  {/* This is a JSX comment */}
  <p>Some content</p>
</div>`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="events">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Inline Event Handlers</h3>
                      <p className="text-muted-foreground mb-4">
                        HTML event handlers that contain strings must be converted to JavaScript functions:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="p-3 bg-muted/30 rounded-md">
                          <h4 className="text-sm font-semibold mb-2">HTML:</h4>
                          <pre className="text-xs font-mono">
{`<button onclick="alert('Hello')">Click me</button>`}
                          </pre>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md">
                          <h4 className="text-sm font-semibold mb-2">JSX:</h4>
                          <pre className="text-xs font-mono">
{`<button onClick={() => alert('Hello')}>Click me</button>`}
                          </pre>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Note the camelCase naming convention for events in JSX (<code className="text-xs">onClick</code> instead of <code className="text-xs">onclick</code>).
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="forms">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Form Elements</h3>
                      <p className="text-muted-foreground mb-4">
                        Handling form elements in React typically involves controlled components, where the form data is
                        handled by React state:
                      </p>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <pre className="text-xs overflow-x-auto font-mono">
{`// HTML
<input type="text" value="default">

// JSX (Controlled component)
const [value, setValue] = useState('default');
<input 
  type="text" 
  value={value} 
  onChange={(e) => setValue(e.target.value)}
/>`}
                        </pre>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Using controlled components gives you more control over form data and validation in React applications.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Best Practices for JSX and React Components</h2>
            
            <div className="not-prose my-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Component Structure</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Break large components into smaller, reusable pieces</li>
                        <li>Use functional components with hooks for most cases</li>
                        <li>Keep components focused on a single responsibility</li>
                        <li>Consider component composition instead of inheritance</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Naming Conventions</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use PascalCase for component names (e.g., <code className="text-sm font-mono">UserProfile</code>)</li>
                        <li>Use camelCase for prop names (e.g., <code className="text-sm font-mono">firstName</code>)</li>
                        <li>Use descriptive names that indicate functionality</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">JSX Formatting</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use proper indentation for readability</li>
                        <li>Put each prop on a new line when a component has many props</li>
                        <li>Group related attributes together</li>
                        <li>Use fragments (<code className="text-sm font-mono">&lt;&gt;...&lt;/&gt;</code>) to avoid unnecessary wrapper divs</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Performance Considerations</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use keys when rendering lists to help React identify changes efficiently</li>
                        <li>Memoize expensive calculations with <code className="text-sm font-mono">useMemo</code></li>
                        <li>Optimize callback functions with <code className="text-sm font-mono">useCallback</code></li>
                        <li>Consider code-splitting with dynamic imports for large components</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Tools for HTML to JSX Conversion</h2>
            <p>
              Several tools can help streamline the conversion process from HTML to JSX:
            </p>
            
            <ul className="list-disc pl-6 my-4">
              <li>
                <strong>Online Converters:</strong> Web-based tools like our <Link href="/tools/html-to-jsx" className="text-primary hover:underline">HTML to JSX Converter</Link> that instantly transform HTML code to JSX
              </li>
              <li>
                <strong>IDE Extensions:</strong> Many code editors have plugins that can automatically convert HTML to JSX
              </li>
              <li>
                <strong>NPM Packages:</strong> Libraries like <code className="text-sm font-mono">htmltojsx</code> that can be integrated into build processes
              </li>
              <li>
                <strong>Browser DevTools:</strong> Copy HTML from browser inspector and paste into conversion tools
              </li>
            </ul>
            
            <div className="my-6 p-4 bg-primary/10 rounded-md">
              <p className="font-medium">Pro Tip:</p>
              <p className="text-sm mt-2">
                When converting large HTML templates to React components, first break the template into logical 
                sections before conversion. This makes it easier to create a component hierarchy that will be 
                more maintainable in the long run.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Using Our HTML to JSX Converter Tool</h2>
            <p>
              Our <Link href="/tools/html-to-jsx" className="text-primary hover:underline">HTML to JSX Converter</Link> provides 
              a simple way to transform HTML code into valid JSX for React applications. The tool offers several advantages:
            </p>
            
            <ul className="list-disc pl-6 my-4">
              <li>Instant conversion with real-time preview</li>
              <li>Automatic handling of attribute name changes (class to className, etc.)</li>
              <li>Proper formatting of self-closing tags</li>
              <li>Conversion of inline styles to JSX object syntax</li>
              <li>HTML comment transformation</li>
              <li>Support for large HTML snippets and complex structures</li>
            </ul>
            
            <p>
              Simply paste your HTML code into the editor, and the tool will automatically convert it to valid JSX
              that you can directly use in your React components.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
            <p>
              Converting HTML to JSX is a fundamental skill for React developers. While the syntax differences may seem 
              minor at first glance, understanding these nuances is crucial for writing efficient, maintainable React components.
            </p>
            
            <p>
              By following the best practices outlined in this guide and leveraging tools like our HTML to JSX converter, 
              you can streamline your development workflow and focus on building great React applications rather than 
              wrestling with syntax conversions.
            </p>
            
            <p>
              Whether you're migrating an existing website to React, integrating third-party templates, or simply 
              working with design mockups, mastering HTML to JSX conversion will make you a more effective React developer.
            </p>
          </section>
        </div>
      </article>
      
      <div className="flex justify-center mt-12">
        <Button asChild>
          <Link href="/tools/html-to-jsx">
            Try the HTML to JSX Converter Tool
          </Link>
        </Button>
      </div>
    </div>
  );
} 