"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Mail, FileText, Shield, AlertTriangle, Check, Code, Link2 } from "lucide-react";

export default function TermsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="container max-w-4xl py-12 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center space-y-6"
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Terms of Service
        </motion.h1>

        <motion.p
          className="max-w-[650px] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Card className="p-6 md:p-8 shadow-sm">
          <div className="space-y-8">
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">1. Introduction</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p>
                      Welcome to DevToolBox! These Terms of Service ("Terms") govern your use of our website and tools 
                      at devtoolbox.app (our "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                      If you disagree with any part of the Terms, you may not access the Services.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">2. Use of Our Services</h2>
                  <div className="mt-4 space-y-4">
                    <p className="text-muted-foreground">
                      Our Services provide web-based tools designed for developers, designers, and other creative professionals.
                      You agree to use our Services only for lawful purposes and in accordance with these Terms. This includes:
                    </p>
                    <div className="bg-muted/40 rounded-md p-4">
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Not violating any applicable local, national, or international laws</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Not attempting to breach or circumvent our security measures</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Not using our Services to distribute malware or harmful code</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Not disrupting or burdening our Services with excessive traffic or resource usage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-start gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">3. Browser-Based Processing</h2>
                  <div className="mt-4 space-y-4">
                    <p className="text-muted-foreground">
                      Most of our tools process your data directly in your browser. This means:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mr-1">✓</span>
                        <span>Your files and data typically don't leave your device when using our tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mr-1">✓</span>
                        <span>We generally don't have access to the content you process with our tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mr-1">✓</span>
                        <span>You are responsible for backing up any important data you process with our tools</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Code className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">4. Intellectual Property</h2>
                  <div className="mt-4 space-y-4">
                    <p className="text-muted-foreground">
                      The DevToolBox name, logo, website, tools, and their contents are owned by DevToolBox and protected 
                      by copyright, trademark, and other intellectual property laws. You may not:
                    </p>
                    <ul className="space-y-2 text-muted-foreground pl-5 list-disc">
                      <li>Use our name, logo, or branding without permission</li>
                      <li>Copy, modify, or distribute our code without permission</li>
                      <li>Create derivative works based on our Services</li>
                      <li>Attempt to reverse engineer or extract our source code</li>
                    </ul>
                    <p className="text-muted-foreground">
                      You retain ownership of any content you process through our Services, but by using our Services,
                      you grant us a limited license to process that content as necessary to provide the Services.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Link2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">5. Third-Party Services</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p>
                      Our Services may contain links to third-party websites or services that are not owned or controlled by DevToolBox.
                      We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
                      third-party websites or services. You further acknowledge and agree that DevToolBox shall not be responsible 
                      or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection 
                      with the use of or reliance on any such content, goods, or services available on or through any such third-party 
                      websites or services.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">6. Limitation of Liability</h2>
                  <div className="mt-4 space-y-4">
                    <p className="text-muted-foreground">
                      To the maximum extent permitted by law, in no event shall DevToolBox be liable for any indirect, punitive, 
                      incidental, special, consequential, or exemplary damages, including without limitation damages for loss of 
                      profits, goodwill, use, data, or other intangible losses, arising out of or in connection with the use or 
                      inability to use the Services. DevToolBox shall not be liable for any damages or losses resulting from:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                      <div className="bg-muted/30 p-3 rounded-md flex items-start gap-2">
                        <span className="text-yellow-500 mr-1">⚠️</span>
                        <span>The use or inability to use our Services</span>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md flex items-start gap-2">
                        <span className="text-yellow-500 mr-1">⚠️</span>
                        <span>Any data loss or inaccuracy in processing</span>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md flex items-start gap-2">
                        <span className="text-yellow-500 mr-1">⚠️</span>
                        <span>Unauthorized access to or alteration of your data</span>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md flex items-start gap-2">
                        <span className="text-yellow-500 mr-1">⚠️</span>
                        <span>Any other matter relating to the Services</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">7. Disclaimer of Warranties</h2>
              <div className="bg-muted/40 rounded-md p-4 text-muted-foreground">
                <p>
                  Our Services are provided on an "as is" and "as available" basis, without any warranties of any kind, 
                  either express or implied. We do not guarantee that our Services will be uninterrupted, timely, secure, or 
                  error-free. We make no warranties regarding the accuracy, reliability, or completeness of any results obtained 
                  from using our Services.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">8. Changes to Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right to modify or replace these Terms at any time, at our sole discretion. 
                  We will provide notice of any significant changes by posting the new Terms on this page and updating 
                  the "Last updated" date. Your continued use of our Services after any such changes constitutes your 
                  acceptance of the new Terms.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">9. Governing Law</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, 
                  without regard to its conflict of law provisions.
        </p>
      </div>
            </section>
            
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">10. Contact Us</h2>
                  <div className="mt-4 space-y-4">
                    <p className="text-muted-foreground">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <div className="bg-muted/40 p-4 rounded-md inline-flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <Link href="mailto:support@devtoolbox.app" className="text-primary hover:underline">
                        support@devtoolbox.app
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 