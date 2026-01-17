import { Star, Quote } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';

const reviews = [
  { name: 'Sarah & Michael Thompson', location: 'Fort Collins, CO', project: 'Kitchen Remodel', rating: 5, text: 'From start to finish, Stoneworks exceeded our expectations. The team helped us select the perfect quartzite slab and the installation was flawless. Our kitchen is now the heart of our home.', date: '2 months ago' },
  { name: 'David Chen', location: 'Loveland, CO', project: 'Master Bathroom', rating: 5, text: 'I interviewed several fabricators and Stoneworks stood out for their attention to detail. The marble vanity they created is stunning - everyone who visits asks about it.', date: '3 months ago' },
  { name: 'Jennifer Martinez', location: 'Windsor, CO', project: 'Outdoor Kitchen', rating: 5, text: 'We were nervous about outdoor stone, but the team at Stoneworks guided us to the perfect granite that handles Colorado weather beautifully. Two years later, it still looks brand new.', date: '4 months ago' },
  { name: 'Robert & Linda Palmer', location: 'Greeley, CO', project: 'Kitchen Island', rating: 5, text: 'The waterfall island they created is the centerpiece of our home. The precision of the miter cuts and the seamless installation exceeded our expectations.', date: '1 month ago' },
  { name: 'Amanda Foster', location: 'Longmont, CO', project: 'Full Kitchen', rating: 5, text: 'Working with Stoneworks was a pleasure from day one. They helped us stay within budget while still getting beautiful quartz countertops.', date: '5 months ago' },
  { name: 'James Wilson', location: 'Fort Collins, CO', project: 'Bathroom Vanity', rating: 5, text: 'Quick turnaround, fair pricing, and excellent communication. The granite vanity top is exactly what we wanted.', date: '2 weeks ago' },
];

const ReviewsPage = () => {
  return (
    <Layout>
      <PageHero badge="Reviews" title="What Our Clients" titleAccent="Are Saying" description="Don't just take our word for it. See what Northern Colorado homeowners say about their Stoneworks experience." />
      
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <div className="text-center">
              <div className="font-serif text-5xl font-medium text-foreground mb-2">4.9</div>
              <div className="flex justify-center gap-1 mb-1">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-bronze text-bronze" />)}</div>
              <span className="label-caps text-muted-foreground">Google Reviews</span>
            </div>
            <div className="w-px h-16 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="font-serif text-5xl font-medium text-foreground mb-2">150+</div>
              <span className="label-caps text-muted-foreground">Total Reviews</span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">Featured Reviews from Google • <a href="#" className="text-primary hover:underline">Read all reviews on Google →</a></p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-card p-8 rounded-lg shadow-soft relative">
                <div className="absolute -top-4 right-8 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                </div>
                <div className="flex gap-1 mb-4">{[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-bronze text-bronze" />)}</div>
                <p className="text-foreground leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-serif text-lg font-medium text-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.project} • {review.location}</div>
                  <div className="text-xs text-muted-foreground mt-1">{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReviewsPage;
