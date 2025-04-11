"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AlertCircle, ClipboardCopy, Check, X, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import * as jose from 'jose';
import { jwtDecode } from "jwt-decode";

interface DecodedJwt {
  header: Record<string, any>;
  payload: Record<string, any>;
  signature: string;
}

enum VerificationStatus {
  UNKNOWN = "unknown",
  VERIFIED = "verified",
  INVALID = "invalid",
  ERROR = "error"
}

export default function JwtDecoderPage() {
  const [jwt, setJwt] = useState<string>("");
  const [decodedJwt, setDecodedJwt] = useState<DecodedJwt | null>(null);
  const [activeTab, setActiveTab] = useState<string>("decoder");
  const [secretKey, setSecretKey] = useState<string>("");
  const [isSecretBase64, setIsSecretBase64] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(VerificationStatus.UNKNOWN);
  const [verificationMessage, setVerificationMessage] = useState<string>("");
  const [showFaq, setShowFaq] = useState(false);
  
  // Load saved JWT and secret key from localStorage
  useEffect(() => {
    try {
      const savedJwt = localStorage.getItem("jwtDecoder_jwt");
      const savedSecretKey = localStorage.getItem("jwtDecoder_secretKey");
      const savedIsSecretBase64 = localStorage.getItem("jwtDecoder_isSecretBase64");
      
      if (savedJwt) {
        setJwt(savedJwt);
        decodeJwt(savedJwt);
      }
      
      if (savedSecretKey) setSecretKey(savedSecretKey);
      if (savedIsSecretBase64) setIsSecretBase64(savedIsSecretBase64 === "true");
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);
  
  // Save JWT and secret key to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("jwtDecoder_jwt", jwt);
      localStorage.setItem("jwtDecoder_secretKey", secretKey);
      localStorage.setItem("jwtDecoder_isSecretBase64", isSecretBase64.toString());
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [jwt, secretKey, isSecretBase64]);
  
  // Decode JWT
  const decodeJwt = (token: string) => {
    if (!token.trim()) {
      setDecodedJwt(null);
      setVerificationStatus(VerificationStatus.UNKNOWN);
      setVerificationMessage("");
      return;
    }
    
    try {
      // Basic decoding without verification
      const decoded = jwtDecode(token, { header: true }) as Record<string, any>;
      const payload = jwtDecode(token) as Record<string, any>;
      
      // Extract signature
      const parts = token.split('.');
      const signature = parts.length === 3 ? parts[2] : '';
      
      setDecodedJwt({
        header: decoded,
        payload,
        signature
      });
      
      // Reset verification status
      setVerificationStatus(VerificationStatus.UNKNOWN);
      setVerificationMessage("");
      
      // Automatically attempt to verify if we have a secret key
      if (secretKey) {
        verifyJwt(token, secretKey, isSecretBase64);
      }
    } catch (error) {
      console.error("JWT decoding error:", error);
      toast.error("Invalid JWT format");
      setDecodedJwt(null);
    }
  };
  
  // Handle JWT input change
  const handleJwtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJwt = e.target.value;
    setJwt(newJwt);
    decodeJwt(newJwt);
  };
  
  // Verify JWT signature
  const verifyJwt = async (token: string, secret: string, isBase64: boolean) => {
    if (!token || !secret) {
      setVerificationStatus(VerificationStatus.UNKNOWN);
      setVerificationMessage("Please provide both JWT and secret key");
      return;
    }
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        setVerificationStatus(VerificationStatus.ERROR);
        setVerificationMessage("Invalid JWT format");
        return;
      }
      
      // Get the algorithm from header
      const headerPayload = parts[0] + '.' + parts[1];
      const header = JSON.parse(atob(parts[0]));
      const alg = header.alg;
      
      if (!alg) {
        setVerificationStatus(VerificationStatus.ERROR);
        setVerificationMessage("No algorithm specified in JWT header");
        return;
      }
      
      let secretBuffer: Uint8Array;
      
      // Convert secret to appropriate format
      if (isBase64) {
        try {
          // Decode Base64
          const binaryString = atob(secret);
          secretBuffer = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            secretBuffer[i] = binaryString.charCodeAt(i);
          }
        } catch (error) {
          setVerificationStatus(VerificationStatus.ERROR);
          setVerificationMessage("Invalid Base64 secret key");
          return;
        }
      } else {
        // Use text as UTF-8
        secretBuffer = new TextEncoder().encode(secret);
      }
      
      // Create key based on algorithm
      let key;
      try {
        if (alg.startsWith('HS')) {
          key = await jose.importSecret(secretBuffer);
        } else {
          // For RS, ES, PS algorithms, a public key would be needed
          setVerificationStatus(VerificationStatus.ERROR);
          setVerificationMessage(`${alg} algorithm requires a public key, not a secret key`);
          return;
        }
      } catch (error) {
        setVerificationStatus(VerificationStatus.ERROR);
        setVerificationMessage("Invalid key format for algorithm");
        return;
      }
      
      // Verify the token
      try {
        const result = await jose.jwtVerify(token, key);
        setVerificationStatus(VerificationStatus.VERIFIED);
        setVerificationMessage("Signature verified successfully");
        
        // Check token expiration
        const payload = result.payload;
        const now = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < now) {
          setVerificationMessage("Signature verified, but token has expired");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus(VerificationStatus.INVALID);
        setVerificationMessage("Invalid signature");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus(VerificationStatus.ERROR);
      setVerificationMessage("Error verifying signature");
    }
  };
  
  // Handle verification
  const handleVerify = () => {
    verifyJwt(jwt, secretKey, isSecretBase64);
  };
  
  // Format JSON for display
  const formatJson = (obj: Record<string, any>) => {
    return JSON.stringify(obj, null, 2);
  };
  
  // Copy to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`${label} copied to clipboard`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy to clipboard");
      }
    );
  };
  
  // Format timestamp to human-readable date
  const formatTimestamp = (timestamp: number) => {
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    } catch (error) {
      return "Invalid timestamp";
    }
  };
  
  // Clear all fields
  const handleClear = () => {
    setJwt("");
    setSecretKey("");
    setDecodedJwt(null);
    setVerificationStatus(VerificationStatus.UNKNOWN);
    setVerificationMessage("");
    toast.success("All fields cleared");
  };
  
  // Sample JWT for demo
  const loadSample = () => {
    const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o";
    setJwt(sampleJwt);
    setSecretKey("secret");
    setIsSecretBase64(false);
    decodeJwt(sampleJwt);
    toast.success("Sample JWT loaded");
  };
  
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">JWT Decoder</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Decode and verify JSON Web Tokens (JWT) to inspect header, payload, and verify signatures.
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog/jwt-decoder">Read Guide</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowFaq(!showFaq)}>
            {showFaq ? "Hide FAQ" : "Show FAQ"}
          </Button>
        </div>
      </div>

      {showFaq && (
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-6 pb-4">
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  What is a JWT?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object. 
                  They're commonly used for authentication and information exchange in web applications.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  How are JWTs structured?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  JWTs consist of three parts: a header (algorithm and token type), a payload (claims and data), and a signature. 
                  These parts are Base64URL encoded and separated by dots.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  What is JWT verification?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Verification checks if the JWT's signature is valid and hasn't been tampered with. It requires the original 
                  secret key (for HMAC algorithms) or a public key (for RSA/ECDSA algorithms).
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  What is a Base64 secret key?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Some JWT implementations use binary secrets encoded in Base64. Toggle the "Base64 Secret" option if your 
                  secret is in Base64 format rather than plain text.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Is this tool secure?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Yes, all processing happens in your browser. No data is transmitted to our servers. 
                  Your JWT and secret keys never leave your device.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="decoder" className="w-full max-w-3xl mx-auto" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="decoder">Decoder</TabsTrigger>
          <TabsTrigger value="verifier">Verifier</TabsTrigger>
        </TabsList>
        
        <TabsContent value="decoder" className="p-4 border rounded-md mt-2 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="jwt">JWT Token</Label>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  Load Sample
                </Button>
                <Button variant="outline" size="sm" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
            <Textarea 
              id="jwt" 
              placeholder="Paste JWT here" 
              className="font-mono text-sm h-24" 
              value={jwt} 
              onChange={handleJwtChange}
            />
          </div>
          
          {decodedJwt && (
            <div className="space-y-6 pt-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Header</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(formatJson(decodedJwt.header), "Header")}
                    className="h-8 px-2"
                  >
                    <ClipboardCopy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-md overflow-auto text-xs font-mono">
                  {formatJson(decodedJwt.header)}
                </pre>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Payload</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(formatJson(decodedJwt.payload), "Payload")}
                    className="h-8 px-2"
                  >
                    <ClipboardCopy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-md overflow-auto text-xs font-mono">
                  {formatJson(decodedJwt.payload)}
                </pre>
              </div>
              
              {(decodedJwt.payload.exp || decodedJwt.payload.iat || decodedJwt.payload.nbf) && (
                <div className="bg-muted/50 p-4 rounded-md space-y-2">
                  <h3 className="font-semibold text-md">Time Claims</h3>
                  <div className="space-y-1 text-sm">
                    {decodedJwt.payload.iat && (
                      <div className="flex justify-between">
                        <span>Issued At (iat):</span>
                        <span>{formatTimestamp(decodedJwt.payload.iat)}</span>
                      </div>
                    )}
                    {decodedJwt.payload.exp && (
                      <div className="flex justify-between">
                        <span>Expires At (exp):</span>
                        <span>{formatTimestamp(decodedJwt.payload.exp)}</span>
                      </div>
                    )}
                    {decodedJwt.payload.nbf && (
                      <div className="flex justify-between">
                        <span>Not Before (nbf):</span>
                        <span>{formatTimestamp(decodedJwt.payload.nbf)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="verifier" className="p-4 border rounded-md mt-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jwt-verify">JWT Token</Label>
            <Textarea 
              id="jwt-verify" 
              placeholder="Paste JWT here" 
              className="font-mono text-sm h-24" 
              value={jwt} 
              onChange={handleJwtChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secret-key">Secret Key</Label>
            <Input 
              id="secret-key" 
              placeholder="Enter secret key" 
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="font-mono text-sm"
            />
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="base64-toggle"
                checked={isSecretBase64}
                onChange={(e) => setIsSecretBase64(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="base64-toggle" className="text-sm">Base64 Secret</Label>
            </div>
          </div>
          
          <Button onClick={handleVerify} className="w-full">Verify Signature</Button>
          
          {verificationStatus !== VerificationStatus.UNKNOWN && (
            <div className={`p-4 rounded-md ${
              verificationStatus === VerificationStatus.VERIFIED 
                ? 'bg-green-500/10 border border-green-500/20' 
                : verificationStatus === VerificationStatus.INVALID 
                  ? 'bg-red-500/10 border border-red-500/20' 
                  : 'bg-yellow-500/10 border border-yellow-500/20'
            }`}>
              <div className="flex items-start gap-2">
                {verificationStatus === VerificationStatus.VERIFIED ? (
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                ) : verificationStatus === VerificationStatus.INVALID ? (
                  <X className="h-5 w-5 text-red-500 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                )}
                <div>
                  <h4 className="font-medium">
                    {verificationStatus === VerificationStatus.VERIFIED
                      ? "Signature Valid"
                      : verificationStatus === VerificationStatus.INVALID
                      ? "Signature Invalid"
                      : "Verification Error"}
                  </h4>
                  <p className="text-sm mt-1">{verificationMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-muted/50 p-4 rounded-md text-sm space-y-2">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 text-blue-500" />
              <p>
                For HMAC algorithms (HS256, HS384, HS512), enter the secret key used to sign the token.
                For RSA and ECDSA algorithms, verification requires a public key which isn't supported in this tool.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center text-sm text-muted-foreground mt-8">
        <p>
          Learn more about JWTs in our{" "}
          <Link href="/blog/jwt-decoder" className="underline underline-offset-2">
            complete guide to JSON Web Tokens
          </Link>
        </p>
      </div>
    </div>
  );
} 