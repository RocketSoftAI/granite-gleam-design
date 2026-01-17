import { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEOHead from '@/components/SEOHead';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateFAQSchema } from '@/config/seo';

const faqData = [
  { category: 'General', question: 'How long does a typical countertop project take?', answer: 'Most residential projects are completed within 2-3 weeks from material selection to installation. Kitchen projects typically take 2-3 weeks, bathrooms 1-2 weeks.' },
  { category: 'General', question: 'Do you offer free estimates?', answer: 'Yes! We provide free in-home consultations and estimates. Contact us to schedule your appointment.' },
  { category: 'Materials', question: 'What\'s the difference between quartz and quartzite?', answer: 'Quartz is an engineered surface (90-95% ground quartz with resin), while quartzite is a natural stone. Quartzite is harder and more heat-resistant but requires sealing.' },
  { category: 'Materials', question: 'Which countertop material is most durable?', answer: 'Quartzite is the hardest natural stone, followed by granite. Quartz (engineered) offers excellent durability with no sealing required.' },
  { category: 'Care', question: 'How do I care for granite countertops?', answer: 'Clean daily with mild soap and water. Seal annually to protect against stains. Avoid harsh chemicals that can break down the sealer.' },
  { category: 'Care', question: 'Do quartz countertops need to be sealed?', answer: 'No. Quartz is non-porous and never needs sealing - one of its major advantages over natural stone.' },
  { category: 'Pricing', question: 'How much do countertops cost?', answer: 'Prices range from $50-$250+ per square foot installed, depending on material, edge profile, and project complexity. Contact us for a personalized quote.' },
  { category: 'Installation', question: 'Do I need to be home during installation?', answer: 'Someone should be present to provide access and answer any questions. Most installations take 4-6 hours.' },
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = faqData.filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase()));

  // Generate FAQ schema for all FAQs
  const faqSchema = generateFAQSchema(faqData);

  return (
    <Layout>
      <SEOHead schema={faqSchema} />
      <PageHero badge="FAQ" title="Frequently Asked" titleAccent="Questions" description="Find answers to common questions about our materials, process, and services." />
      
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search questions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 h-14 text-lg" />
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filtered.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg px-6 border-none shadow-soft">
                <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-6">
                  <div>
                    <span className="label-caps text-primary text-xs block mb-1">{faq.category}</span>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No questions match your search. Try different keywords.</p>}
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
