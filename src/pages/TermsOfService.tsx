import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';

const TermsOfService = () => {
  return (
    <Layout>
      <SEOHead
        customSEO={{
          title: 'Terms of Service | Stoneworks of Colorado',
          description: 'Terms of service for Stoneworks of Colorado. Review our terms and conditions for using our website and services.',
          canonicalPath: '/terms-of-service',
        }}
      />
      
      <PageHero 
        title="Terms of Service"
        description="Terms and conditions for our services"
      />
      
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto prose prose-stone dark:prose-invert">
            <p className="text-muted-foreground text-sm mb-8">
              Last Updated: January 18, 2026
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing or using the Stoneworks of Colorado website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">2. Services Description</h2>
            <p className="text-muted-foreground mb-6">
              Stoneworks of Colorado provides countertop fabrication and installation services, including but not limited to granite, quartz, marble, and quartzite surfaces. All services are subject to availability and scheduling.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">3. Quotes and Pricing</h2>
            <p className="text-muted-foreground mb-6">
              All quotes provided are estimates based on the information available at the time. Final pricing may vary based on actual measurements, material selection, and project scope. Quotes are valid for 30 days unless otherwise stated.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">4. Appointments and Scheduling</h2>
            <p className="text-muted-foreground mb-6">
              Appointments scheduled through our website are subject to confirmation. We will contact you to confirm your appointment. Cancellations should be made at least 24 hours in advance.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">5. Communications Consent</h2>
            <p className="text-muted-foreground mb-6">
              By submitting a form on our website, you consent to receive communications from Stoneworks of Colorado via phone, email, and SMS. This may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Automated calls and text messages</li>
              <li>Prerecorded voice messages</li>
              <li>AI-powered voice or messaging systems</li>
              <li>Marketing and promotional communications</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              You may opt out at any time by replying STOP to any text message or following the opt-out instructions provided during a call.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground mb-6">
              All content on this website, including text, images, logos, and designs, is the property of Stoneworks of Colorado and is protected by copyright and trademark laws.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              Stoneworks of Colorado is not liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our liability is limited to the amount paid for services.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">8. Warranty</h2>
            <p className="text-muted-foreground mb-6">
              We stand behind our workmanship and provide warranties on our installations. Specific warranty terms will be provided with your project agreement.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground mb-6">
              These terms are governed by the laws of the State of Colorado. Any disputes shall be resolved in the courts of Larimer County, Colorado.
            </p>

            <h2 className="font-serif text-2xl font-medium mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              If you have questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
