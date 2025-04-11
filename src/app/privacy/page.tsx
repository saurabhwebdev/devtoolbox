"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Mail, Shield, Lock, FileText } from "lucide-react";

export default function PrivacyPage() {
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
          Privacy Policy
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
                      At DevToolBox, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                      protect, and share information about you when you use our website and tools at devtoolbox.app 
                      (our "Services").
                    </p>
                    <p>
                      By using our Services, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-start gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">2. Information We Collect</h2>
                  <div className="mt-4 space-y-4">
                    <p className="text-muted-foreground">
                      We collect minimal information to provide and improve our Services:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <div>
                          <span className="font-medium text-foreground">Usage Data:</span> We may collect anonymous information about how you interact with our tools, 
                          including which tools you use, how often, and basic analytics to improve our service.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <div>
                          <span className="font-medium text-foreground">Contact Information:</span> If you contact us directly, we may receive additional information 
                          about you, such as your name, email address, and the contents of your message.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <div>
                          <span className="font-medium text-foreground">Cookies and Similar Technologies:</span> We use cookies to enhance your experience and collect 
                          usage information. You can control cookies through your browser settings.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-medium">3. How We Process Your Data</h2>
                  <div className="mt-4 space-y-4">
                    <p className="text-muted-foreground">
                      Most of our tools process data directly in your browser. This means:
                    </p>
                    <div className="bg-muted/40 rounded-md p-4">
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mr-1">✓</span>
                          Your files and data typically don't leave your device when using our tools
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mr-1">✓</span>
                          We don't store the content you process with our tools on our servers
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mr-1">✓</span>
                          Your data remains private and secure on your device
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">4. How We Use Your Information</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We use the information we collect to:
                </p>
                <ul className="space-y-2 text-muted-foreground pl-5 list-disc">
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Monitor and analyze usage trends to enhance user experience</li>
                  <li>Protect against, identify, and prevent fraud and other illegal activity</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">5. Data Sharing and Disclosure</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We do not sell your personal information. We may share information in the following situations:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-medium text-foreground">Service Providers:</span> We may share data with third-party vendors who provide services on our behalf, such as hosting and analytics.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-medium text-foreground">Compliance with Laws:</span> We may disclose information where required by law or to protect our rights.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-medium text-foreground">Business Transfers:</span> If we're involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">6. Your Rights</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                  <div className="bg-muted/30 p-3 rounded-md">Access or obtain a copy of your data</div>
                  <div className="bg-muted/30 p-3 rounded-md">Correct inaccurate data</div>
                  <div className="bg-muted/30 p-3 rounded-md">Delete your data</div>
                  <div className="bg-muted/30 p-3 rounded-md">Object to or restrict certain processing</div>
                </div>
                <p className="text-muted-foreground">
                  To exercise these rights, please contact us using the information below.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">7. Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement reasonable security measures to protect your information. However, no method of 
                  transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">8. Children's Privacy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our Services are not intended for children under 13. We do not knowingly collect personal information 
                  from children under 13. If you are a parent or guardian and believe your child has provided us with 
                  personal information, please contact us.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-medium mb-4">9. Changes to This Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date.
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
                      If you have any questions about this Privacy Policy, please contact us at:
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