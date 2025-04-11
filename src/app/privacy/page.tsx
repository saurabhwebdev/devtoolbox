export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy explains how we collect, use, and share your personal information 
          when you use our services or visit our website.
        </p>
        
        <h2>2. Information We Collect</h2>
        <p>
          We may collect information that you provide to us directly, such as when you:
        </p>
        <ul>
          <li>Create an account</li>
          <li>Fill out a form</li>
          <li>Subscribe to our newsletter</li>
          <li>Contact us for support</li>
        </ul>
        
        <h2>3. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Communicate with you about updates and offers</li>
          <li>Personalize your experience</li>
          <li>Monitor and analyze usage patterns</li>
        </ul>
        
        <h2>4. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          Email: privacy@example.com
          <br />
          Address: 123 Demo Street, City, Country
        </p>
      </div>
    </div>
  );
} 