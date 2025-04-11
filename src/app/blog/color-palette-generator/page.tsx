import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Color Palette Theory: Creating Harmonious Combinations for Web Design",
  description: "Learn color theory fundamentals, explore color harmony techniques, and discover how to create effective color palettes for your web projects.",
  keywords: ["color theory", "color palette", "color wheel", "color harmony", "web design", "color combinations", "UI design"]
};

export default function ColorPaletteGeneratorBlogPage() {
  return (
    <div className="container py-12 space-y-12">
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Color Palette Theory: Creating Harmonious Combinations for Web Design
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Published: May 15, 2025</span>
          <span>•</span>
          <span>9 min read</span>
        </div>
        
        <div className="space-y-6">
          <section>
            <p className="lead">
              Color is one of the most powerful tools in a designer's arsenal. The right color palette can evoke emotions, 
              establish brand identity, improve usability, and create memorable experiences for users. In this guide, 
              we'll explore the fundamentals of color theory, different harmony methods, and practical techniques for 
              creating effective color palettes for your web projects.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Color Theory Basics</h2>
            <p>
              Color theory is a framework that guides the use and combination of colors in design. Understanding these 
              fundamentals will help you make informed decisions when creating color palettes:
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">The Color Wheel</h3>
            <p>
              The color wheel is a circular diagram that shows the relationships between primary, secondary, and tertiary colors. 
              It serves as the foundation for creating harmonious color combinations:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li><strong>Primary colors:</strong> Red, blue, and yellow</li>
              <li><strong>Secondary colors:</strong> Created by mixing primary colors (purple, green, and orange)</li>
              <li><strong>Tertiary colors:</strong> Created by mixing primary and secondary colors</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">Color Properties</h3>
            <p>
              Each color has three main properties that affect its appearance and how it interacts with other colors:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li><strong>Hue:</strong> The pure color itself (like red, green, or blue)</li>
              <li><strong>Saturation:</strong> The intensity or purity of a color (from vivid to gray)</li>
              <li><strong>Brightness/Value:</strong> The lightness or darkness of a color</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Color Harmony Methods</h2>
            <p>
              Color harmony refers to the pleasing arrangement of colors based on their relationships on the color wheel. 
              Our Color Palette Generator tool implements several harmony methods you can use to create balanced and 
              aesthetically pleasing combinations:
            </p>

            <div className="not-prose my-8">
              <Tabs defaultValue="complementary" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto">
                  <TabsTrigger value="complementary">Complementary</TabsTrigger>
                  <TabsTrigger value="analogous">Analogous</TabsTrigger>
                  <TabsTrigger value="triadic">Triadic</TabsTrigger>
                  <TabsTrigger value="more">More</TabsTrigger>
                </TabsList>
                
                <TabsContent value="complementary">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Complementary Colors</h3>
                      <p className="text-muted-foreground mb-4">
                        Colors positioned opposite each other on the color wheel. This scheme creates high contrast and 
                        visual vibrancy.
                      </p>
                      <div className="flex space-x-2 mb-3">
                        <div className="w-full h-12 bg-blue-600 rounded-md"></div>
                        <div className="w-full h-12 bg-orange-500 rounded-md"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Best for:</strong> Highlighting call-to-action elements, creating energy, and establishing focal points.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analogous">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Analogous Colors</h3>
                      <p className="text-muted-foreground mb-4">
                        Colors positioned adjacent to each other on the color wheel. This scheme creates a harmonious, 
                        cohesive look with less contrast.
                      </p>
                      <div className="flex space-x-2 mb-3">
                        <div className="w-full h-12 bg-blue-400 rounded-md"></div>
                        <div className="w-full h-12 bg-blue-600 rounded-md"></div>
                        <div className="w-full h-12 bg-indigo-600 rounded-md"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Best for:</strong> Creating calm, serene designs or establishing visual continuity.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="triadic">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Triadic Colors</h3>
                      <p className="text-muted-foreground mb-4">
                        Three colors equally spaced around the color wheel. This scheme provides high contrast while 
                        maintaining harmony.
                      </p>
                      <div className="flex space-x-2 mb-3">
                        <div className="w-full h-12 bg-blue-600 rounded-md"></div>
                        <div className="w-full h-12 bg-red-500 rounded-md"></div>
                        <div className="w-full h-12 bg-yellow-400 rounded-md"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Best for:</strong> Vibrant designs that need variety while remaining balanced.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="more">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Additional Harmony Methods</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Split-Complementary</h4>
                          <p className="text-sm text-muted-foreground">
                            A base color plus the two colors adjacent to its complement, offering high contrast with less tension.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Tetradic (Rectangle)</h4>
                          <p className="text-sm text-muted-foreground">
                            Four colors arranged in two complementary pairs, offering rich color possibilities.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Monochromatic</h4>
                          <p className="text-sm text-muted-foreground">
                            Different shades, tones, and tints of a single hue, creating a cohesive and sophisticated look.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Shades</h4>
                          <p className="text-sm text-muted-foreground">
                            Various lightness and darkness levels of the same color, useful for creating depth.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Color Psychology in Design</h2>
            <p>
              Colors evoke emotional and psychological responses. Understanding these associations can help you 
              select colors that align with your design goals:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li><strong>Red:</strong> Energy, passion, attention, urgency</li>
              <li><strong>Blue:</strong> Trust, calmness, stability, professionalism</li>
              <li><strong>Green:</strong> Growth, health, nature, wealth</li>
              <li><strong>Yellow:</strong> Optimism, clarity, warmth, caution</li>
              <li><strong>Purple:</strong> Creativity, luxury, wisdom, spirituality</li>
              <li><strong>Orange:</strong> Enthusiasm, friendliness, confidence</li>
              <li><strong>Black:</strong> Elegance, power, sophistication</li>
              <li><strong>White:</strong> Simplicity, cleanliness, purity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Creating Effective Color Palettes</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">The 60-30-10 Rule</h3>
            <p>
              A classic approach to color distribution in design:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li><strong>60%:</strong> Dominant color (backgrounds, large elements)</li>
              <li><strong>30%:</strong> Secondary color (supporting elements)</li>
              <li><strong>10%:</strong> Accent color (calls to action, highlights)</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">Color Contrast for Accessibility</h3>
            <p>
              Ensuring sufficient contrast between text and background colors is crucial for readability and 
              accessibility. The Web Content Accessibility Guidelines (WCAG) recommend:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li>A minimum contrast ratio of 4.5:1 for normal text</li>
              <li>A minimum contrast ratio of 3:1 for large text</li>
            </ul>
            <div className="my-6 p-4 bg-muted/50 rounded-md">
              <p className="font-medium">Accessibility Tip:</p>
              <p className="text-sm mt-2">
                Consider using tools like the Color Contrast Checker to ensure your design meets accessibility standards.
                Always test your color combinations with users who have different types of color vision deficiencies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Extracting Colors from Images</h2>
            <p>
              Finding inspiration from existing images is a powerful technique for creating cohesive color palettes. 
              Our Color Palette Generator tool includes an image color extraction feature that identifies the dominant 
              colors in an uploaded image.
            </p>
            <p>
              This approach is particularly useful when:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li>Designing a website that features specific imagery</li>
              <li>Creating a brand identity based on a logo or key visual</li>
              <li>Looking for inspiration from nature, art, or photography</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Using the Color Palette Generator Tool</h2>
            <p>
              Our <Link href="/tools/color-palette-generator" className="text-primary hover:underline">Color Palette Generator</Link> offers 
              two main ways to create color palettes:
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">Generate from a Base Color</h3>
            <ol className="list-decimal pl-6 my-4 space-y-1">
              <li>Select a base color using the color picker or enter a hex code</li>
              <li>Choose a harmony method (complementary, analogous, triadic, etc.)</li>
              <li>View your generated palette with HEX, RGB, and HSL values</li>
              <li>Click any color to copy its value to your clipboard</li>
              <li>Export your palette as JSON for use in other tools</li>
            </ol>

            <h3 className="text-xl font-medium mt-6 mb-3">Extract Colors from an Image</h3>
            <ol className="list-decimal pl-6 my-4 space-y-1">
              <li>Upload an image by clicking the "Select Image" button</li>
              <li>The tool will analyze the image and extract the most prominent colors</li>
              <li>View the extracted palette with HEX, RGB, and HSL values</li>
              <li>Click any color to copy its value</li>
              <li>Export the extracted palette as JSON</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Practical Applications in Web Design</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">UI Component Color Systems</h3>
            <p>
              Modern web applications often use a systematic approach to color with defined roles:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li><strong>Primary:</strong> Brand color used for primary actions and key elements</li>
              <li><strong>Secondary:</strong> Complementary color for secondary actions and supporting elements</li>
              <li><strong>Accent:</strong> Highlight color for drawing attention to specific elements</li>
              <li><strong>Neutral:</strong> Grayscale colors for text, backgrounds, and dividers</li>
              <li><strong>Semantic:</strong> Colors that indicate status (success, warning, error, info)</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">Dark Mode Considerations</h3>
            <p>
              When designing for both light and dark modes:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li>Don't simply invert colors; adjust saturation and brightness for comfort</li>
              <li>Reduce the brightness and saturation of vibrant colors for dark mode</li>
              <li>Ensure sufficient contrast in both modes</li>
              <li>Consider using the monochromatic or shades harmony methods to create dark mode variants</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
            <p>
              Color is a fundamental aspect of web design that goes beyond aesthetics to influence usability, 
              emotional response, and brand perception. By understanding color theory principles and using 
              tools like our Color Palette Generator, you can create harmonious, accessible, and effective 
              color combinations for your web projects.
            </p>
            <p>
              Remember that while color theory provides useful guidelines, great design often involves balancing 
              rules with creative intuition. Experiment with different harmony methods, be mindful of accessibility 
              requirements, and always consider your target audience and brand identity when making color decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">How many colors should I use in my web design?</h3>
                <p>
                  Most effective color schemes use 3-5 colors (excluding shades of gray). Using too many colors can create visual chaos, 
                  while too few might limit your design options. The 60-30-10 rule provides a good starting point for color distribution.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Can I use multiple harmony methods in one design?</h3>
                <p>
                  Yes, you can combine different harmony methods to create more complex palettes. For example, you might use an analogous 
                  palette for your main UI and add a complementary accent color for call-to-action buttons.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">How do I ensure my colors work well together?</h3>
                <p>
                  Start with a harmony method as a foundation, then adjust saturation and brightness to create balance. Make sure to 
                  maintain sufficient contrast for readability. Test your palette in context to see how the colors interact with each other.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Should my color palette match my brand colors?</h3>
                <p>
                  Your brand colors should be incorporated into your palette, but you don't need to use them exclusively. Use your primary 
                  brand color as a starting point, then build a harmonious palette around it using one of the color harmony methods.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">How do I choose colors for data visualizations?</h3>
                <p>
                  For data visualizations, choose colors that are easily distinguishable and maintain their distinctiveness for colorblind users. 
                  Consider using a colorblind-safe palette and ensure sufficient contrast between adjacent colors in charts and graphs.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
      
      <div className="flex flex-col items-center space-y-4">
        <Card className="w-full max-w-2xl p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Try Our Color Palette Generator Tool</h3>
            <p className="text-muted-foreground">
              Create harmonious color schemes from a base color or extract colors from images for your web and design projects.
            </p>
            <Button asChild>
              <Link href="/tools/color-palette-generator">Open Color Palette Generator</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 