import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
            
            <h3 className="text-xl font-medium mt-6 mb-3">1. Attribute Names</h3>
            <p>
              Several HTML attributes have different names in JSX because some words are reserved in JavaScript:
            </p>
            <div className="my-4 p-4 border border-muted rounded-md">
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
            
            <h3 className="text-xl font-medium mt-6 mb-3">2. Self-Closing Tags</h3>
            <p>
              In HTML, some tags don't need a closing tag (like &lt;img&gt; or &lt;input&gt;). In JSX, all tags must be explicitly closed,
              either with a matching end tag or with a self-closing tag syntax.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border border-muted rounded-md">
                <p className="font-medium mb-2">HTML:</p>
                <pre className="text-xs font-mono">
{`<img src="image.jpg">
<br>
<input type="text">`}
                </pre>
              </div>
              <div className="p-4 border border-muted rounded-md">
                <p className="font-medium mb-2">JSX:</p>
                <pre className="text-xs font-mono">
{`<img src="image.jpg" />
<br />
<input type="text" />`}
                </pre>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">3. Style Attribute</h3>
            <p>
              In HTML, styles are specified as strings. In JSX, styles are specified as objects with camelCased properties:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border border-muted rounded-md">
                <p className="font-medium mb-2">HTML:</p>
                <pre className="text-xs font-mono">
{`<div style="color: red; font-size: 14px; background-color: #f0f0f0;">
  Styled content
</div>`}
                </pre>
              </div>
              <div className="p-4 border border-muted rounded-md">
                <p className="font-medium mb-2">JSX:</p>
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
            
            <h3 className="text-xl font-medium mt-6 mb-3">4. JavaScript Expressions</h3>
            <p>
              JSX allows you to embed JavaScript expressions within curly braces:
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
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
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Common Challenges in HTML to JSX Conversion</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">1. HTML Comments</h3>
            <p>
              HTML comments <code className="text-sm font-mono">&lt;!-- comment --&gt;</code> must be replaced with JavaScript comments <code className="text-sm font-mono">{'{/* comment */}'}</code> in JSX.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">2. Inline event handlers</h3>
            <p>
              HTML event handlers that contain strings must be converted to JavaScript functions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border border-muted rounded-md">
                <p className="font-medium mb-2">HTML:</p>
                <pre className="text-xs font-mono">
{`<button onclick="alert('Hello')">Click me</button>`}
                </pre>
              </div>
              <div className="p-4 border border-muted rounded-md">
                <p className="font-medium mb-2">JSX:</p>
                <pre className="text-xs font-mono">
{`<button onClick={() => alert('Hello')}>Click me</button>`}
                </pre>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">3. Form Elements</h3>
            <p>
              Handling form elements in React typically involves controlled components, where the form data is
              handled by React state:
            </p>
            <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono my-4">
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
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Best Practices for JSX and React Components</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Component Structure</h3>
            <ul className="list-disc pl-6 my-4">
              <li>Break large components into smaller, reusable pieces</li>
              <li>Use functional components with hooks for most cases</li>
              <li>Keep components focused on a single responsibility</li>
              <li>Consider component composition instead of inheritance</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Naming Conventions</h3>
            <ul className="list-disc pl-6 my-4">
              <li>Use PascalCase for component names (e.g., <code className="text-sm font-mono">UserProfile</code>)</li>
              <li>Use camelCase for prop names (e.g., <code className="text-sm font-mono">firstName</code>)</li>
              <li>Use descriptive names that indicate functionality</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">JSX Formatting</h3>
            <ul className="list-disc pl-6 my-4">
              <li>Use proper indentation for readability</li>
              <li>Put each prop on a new line when a component has many props</li>
              <li>Group related attributes together</li>
              <li>Use fragments (<code className="text-sm font-mono">&lt;&gt;...&lt;/&gt;</code>) to avoid unnecessary wrapper divs</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Performance Considerations</h3>
            <ul className="list-disc pl-6 my-4">
              <li>Use keys when rendering lists to help React identify changes efficiently</li>
              <li>Memoize expensive calculations with <code className="text-sm font-mono">useMemo</code></li>
              <li>Optimize callback functions with <code className="text-sm font-mono">useCallback</code></li>
              <li>Consider code-splitting with dynamic imports for large components</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Tools for HTML to JSX Conversion</h2>
            <p>
              While manual conversion is educational, several tools can help automate the process:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>DevToolBox's <Link href="/tools/html-to-jsx" className="text-primary hover:underline">HTML to JSX Converter</Link></li>
              <li>Transform plugin in the React Developer Tools</li>
              <li>Various online converters and IDE extensions</li>
              <li>The <code className="text-sm font-mono">htmltojsx</code> npm package for programmatic conversion</li>
            </ul>
            <div className="my-6 p-4 bg-primary/10 rounded-md">
              <p className="font-medium">Pro Tip:</p>
              <p className="text-sm mt-1">
                Even when using automated conversion tools, always review the generated JSX to ensure it follows React
                best practices and to make any necessary adjustments for your specific application architecture.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
            <p>
              Converting HTML to JSX is a common task when integrating existing designs into a React application or
              migrating from traditional web applications. Understanding the key differences and following best practices
              will help you create maintainable, performant React components.
            </p>
            <p>
              While the syntax differences may seem cumbersome at first, they enable JSX to seamlessly bridge HTML-like
              templates with the full power of JavaScript, allowing for dynamic, interactive user interfaces that are both
              powerful and maintainable.
            </p>
            <p>
              Ready to convert your HTML to JSX? Try our <Link href="/tools/html-to-jsx" className="text-primary hover:underline">HTML to JSX Converter tool</Link> to
              simplify the process.
            </p>
          </section>
        </div>
      </article>
      
      <div className="flex flex-col items-center space-y-4">
        <Card className="w-full max-w-2xl p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Try the HTML to JSX Converter Tool</h3>
            <p className="text-muted-foreground">
              Convert your HTML markup to JSX with proper syntax transformations and customization options.
            </p>
            <Button asChild>
              <Link href="/tools/html-to-jsx">Open HTML to JSX Converter</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 