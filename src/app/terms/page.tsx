export default function TermsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using our services, you agree to be bound by these Terms of Service. 
          If you do not agree to all of these terms, you may not use our services.
        </p>
        
        <h2>2. Accounts and Registration</h2>
        <p>
          When you create an account with us, you agree to provide accurate and complete information.
          You are responsible for safeguarding your account credentials and for all activities that occur under your account.
        </p>
        
        <h2>3. User Content</h2>
        <p>
          Any content you submit, post, or display on or through our services is your responsibility.
          By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use,
          reproduce, modify, publish, and distribute such content.
        </p>
        
        <h2>4. Intellectual Property</h2>
        <p>
          Our services and content (excluding user content) are protected by copyright, trademark, 
          and other laws. Our trademarks and visual identity may not be used without our prior written permission.
        </p>
        
        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your account and access to our services at our sole discretion, 
          without notice, for conduct that we believe violates these Terms of Service or is harmful to other users,
          us, or third parties, or for any other reason.
        </p>
        
        <h2>6. Disclaimer of Warranties</h2>
        <p>
          Our services are provided "as is" without any warranties, expressed or implied.
          We do not warrant that our services will be error-free or uninterrupted.
        </p>
        
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at:
          <br />
          Email: legal@example.com
          <br />
          Address: 123 Demo Street, City, Country
        </p>
      </div>
    </div>
  );
} 