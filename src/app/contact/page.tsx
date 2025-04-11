"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, MessageSquare, User, Send, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { saveContactForm } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { ContactFormData } from "@/types/firebase";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    setIsLoaded(true);
    
    // Pre-fill form if user is logged in
    if (user) {
      if (user.displayName) setFormState(prev => ({ ...prev, name: user.displayName || "" }));
      if (user.email) setFormState(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const contactData: ContactFormData = {
        type: 'contact',
        name: formState.name,
        email: formState.email,
        message: formState.message
      };
      
      const result = await saveContactForm(contactData);
      
      if (!result.success) {
        throw new Error("Failed to send your message");
      }
      
      // Success
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center">
      <div className="container max-w-6xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl border bg-card shadow-sm">
          {/* Left side - Image/CTA */}
          <motion.div 
            className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground p-12 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 right-0 h-40 bg-white/10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-black/10"></div>
              {Array(5).fill(0).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: `${Math.random() * 300 + 100}px`,
                    height: `${Math.random() * 300 + 100}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
              ))}
            </div>
            
            <div className="relative">
              <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
              <p className="text-primary-foreground/80 max-w-md mb-8">
                Have questions or feedback about our tools? Drop us a message and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-sm text-primary-foreground/70">support@devtoolbox.app</p>
                  </div>
                </div>
                
                <div>
                  <Button 
                    variant="secondary" 
                    className="mt-6"
                    asChild
                  >
                    <Link href="/tools" className="inline-flex items-center gap-2">
                      Try our tools <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative mt-8 text-sm text-primary-foreground/70">
              &copy; {new Date().getFullYear()} DevToolBox. All rights reserved.
            </div>
          </motion.div>
          
          {/* Right side - Form */}
          <motion.div 
            className="p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
              <p className="text-muted-foreground mb-8">We're excited to hear from you!</p>
              
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-[320px]">
                    Thank you for contacting us. We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Your name" 
                        className="pl-10"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="Your email address" 
                        className="pl-10"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <textarea 
                        id="message" 
                        name="message"
                        placeholder="How can we help?" 
                        className="flex min-h-[150px] w-full rounded-md border border-input px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="pt-3">
                    <Button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-2"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 