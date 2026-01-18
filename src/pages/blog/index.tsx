import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import { blogPosts, getAllCategories } from '@/data/blog';
import { useState } from 'react';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...getAllCategories()];
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <Layout>
      <PageHero
        badge="Blog"
        title="Stone & Design"
        titleAccent="Insights"
        description="Expert advice, design inspiration, and care tips from the Stoneworks of Colorado team."
      />

      {/* Category Filter */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 justify-center" role="group" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:bg-secondary'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {activeCategory === 'All' && (
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <Link to={`/blog/${blogPosts[0].slug}`} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              </div>
              
              <div>
                <span className="label-caps text-primary mb-3 block">{blogPosts[0].category}</span>
                <h2 className="heading-section text-foreground mb-4 group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="body-large text-muted-foreground mb-6">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </span>
                </div>
                
                <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          {activeCategory === 'All' && (
            <SectionHeader
              badge="Latest Articles"
              title="More From"
              titleAccent="Our Blog"
            />
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === 'All' ? filteredPosts.slice(1) : filteredPosts).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-foreground">{post.category}</span>
                  </div>
                </div>
                
                <div className="p-6 lg:p-8">
                  <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No articles in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <SectionHeader
            badge="Get Expert Advice"
            title="Ready to Start"
            titleAccent="Your Project?"
            description="Our team is here to answer your questions and help you choose the perfect countertops for your home."
          />
          
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
