import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEOHead
        customSEO={{
          title: 'Privacy Policy | Stoneworks of Colorado',
          description: 'Privacy policy for Stoneworks of Colorado. Learn how we collect, use, and protect your personal information.',
          canonicalPath: '/privacy-policy',
        }}
      />
      
      <PageHero 
        title="Privacy Policy"
        description="How we protect your information"
      />
      
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto prose prose-stone dark:prose-invert">
            <p className="text-muted-foreground text-sm mb-8">
              Last Updated: January 18, 2026
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-6">
              When you use our website or request a quote, we collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Project details (areas, timeline, budget range)</li>
              <li>Property information</li>
              <li>Any additional information you choose to provide</li>
            </ul>

            <h2 className="font-serif text-2xl font-medium mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Respond to your inquiries and provide quotes</li>
              <li>Schedule appointments and consultations</li>
              <li>Send you project updates and service information</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our services and website</li>
            </ul>

            <h2 className="font-serif text-2xl font-medium mb-4">3. SMS/Text Message Communications</h2>
            <p className="text-muted-foreground mb-6">
              By providing your phone number and consenting to receive text messages, you agree to receive SMS communications from Stoneworks of Colorado. These may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Appointment reminders and confirmations</li>
              <li>Project updates and status notifications</li>
              <li>Promotional offers and special discounts</li>
              <li>Service-related information</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP to any text message. Reply HELP for assistance.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">4. Information Sharing</h2>
            <p className="text-muted-foreground mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties except as necessary to provide our services, comply with law, or protect our rights.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="font-serif text-2xl font-medium mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground mb-6">
              Stoneworks of Colorado<br />
              3555 S Lincoln Ave<br />
              Loveland, CO 80537<br />
              Email: office@stoneworksofcolorado.com<br />
              Phone: (970) 493-1992
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
