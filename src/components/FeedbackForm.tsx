"use client";

import { useState, useEffect } from "react";
import { Lightbulb, MessageSquare, Send, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { saveFeedback, saveToolRequest } from "@/lib/firebase";
import { FeedbackData, ToolRequestData } from "@/types/firebase";
import { useAuth } from "@/context/AuthContext";

export function FeedbackForm() {
  const [formType, setFormType] = useState<"feedback" | "tool-request">("feedback");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [toolName, setToolName] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signInWithGoogle, isFirebaseAvailable } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (formType === "feedback") {
        const feedbackData: FeedbackData = {
          type: "feedback",
          name: user?.displayName || name,
          email: user?.email || email,
          message,
        };
        
        const result = await saveFeedback(feedbackData);
        
        if (!result.success) {
          throw new Error("Failed to save feedback");
        }
      } else {
        const toolRequestData: ToolRequestData = {
          type: "tool-request",
          name: user?.displayName || name,
          email: user?.email || email,
          toolName,
          toolDescription,
        };
        
        const result = await saveToolRequest(toolRequestData);
        
        if (!result.success) {
          throw new Error("Failed to save tool request");
        }
      }
      
      // Success
      setSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        resetForm();
        setIsOpen(false);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!isFirebaseAvailable) {
        throw new Error("Authentication services are currently unavailable");
      }
      
      const result = await signInWithGoogle();
      if (!result.success) {
        throw new Error("Failed to sign in with Google");
      }
    } catch (err) {
      console.error("Error signing in:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setToolName("");
    setToolDescription("");
    setFormType("feedback");
    setError(null);
  };

  // Pre-fill form fields if user is logged in
  useEffect(() => {
    if (user) {
      if (user.displayName) setName(user.displayName);
      if (user.email) setEmail(user.email || "");
    }
  }, [user]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Share Your Thoughts</DialogTitle>
              <DialogDescription>
                Submit feedback or request a new tool for DevToolBox.
              </DialogDescription>
            </DialogHeader>
            
            {!loading && !user ? (
              // Show login prompt if user is not authenticated
              <div className="flex flex-col items-center space-y-6 py-8">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <LogIn className="h-8 w-8 text-primary" />
                </div>
                <p className="text-center text-muted-foreground">
                  Please sign in to submit feedback or request tools.
                </p>
                <Button 
                  onClick={handleSignIn}
                  disabled={isLoading || !isFirebaseAvailable}
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Sign in with Google
                    </>
                  )}
                </Button>
                
                {!isFirebaseAvailable && !error && (
                  <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm">
                    Authentication services are currently unavailable. Some features may be limited.
                  </div>
                )}
                
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
              </div>
            ) : (
              // Show form if user is authenticated
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="form-type">What would you like to do?</Label>
                  <RadioGroup 
                    id="form-type" 
                    value={formType} 
                    onValueChange={(value) => setFormType(value as "feedback" | "tool-request")}
                    className="flex flex-col space-y-1.5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feedback" id="feedback-option" />
                      <Label htmlFor="feedback-option" className="font-normal cursor-pointer">
                        Share feedback about DevToolBox
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tool-request" id="tool-request-option" />
                      <Label htmlFor="tool-request-option" className="font-normal cursor-pointer">
                        Request a new tool
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {!user && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                )}

                {formType === "feedback" ? (
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Feedback</Label>
                    <Textarea 
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you think about DevToolBox..."
                      required
                      className="min-h-[120px]"
                    />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="tool-name">Tool Name</Label>
                      <Input 
                        id="tool-name"
                        value={toolName}
                        onChange={(e) => setToolName(e.target.value)}
                        placeholder="What should the tool be called?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tool-description">Tool Description</Label>
                      <Textarea 
                        id="tool-description"
                        value={toolDescription}
                        onChange={(e) => setToolDescription(e.target.value)}
                        placeholder="Describe what the tool should do..."
                        required
                        className="min-h-[120px]"
                      />
                    </div>
                  </>
                )}

                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {formType === "feedback" ? <MessageSquare className="h-6 w-6" /> : <Lightbulb className="h-6 w-6" />}
            </div>
            <h3 className="text-xl font-medium text-center">Thank You!</h3>
            <p className="text-center text-muted-foreground max-w-[320px]">
              {formType === "feedback" 
                ? "We appreciate your feedback and will use it to improve DevToolBox." 
                : "Thanks for your tool suggestion! We'll review it and consider adding it to DevToolBox."}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 