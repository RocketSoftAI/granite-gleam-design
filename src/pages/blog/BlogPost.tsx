import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Convert markdown-like content to HTML-friendly paragraphs
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Handle headers
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="font-serif text-2xl font-medium text-foreground mt-10 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      // Handle bullet lists
      if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
            {items.map((item, i) => (
              <li key={i}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      
      // Handle numbered lists
      if (paragraph.match(/^\d\./)) {
        const items = paragraph.split('\n').filter(line => line.match(/^\d\./));
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^\d\.\s*/, '')}</li>
            ))}
          </ol>
        );
      }

      // Handle bold text and regular paragraphs
      if (paragraph.includes('**')) {
        const parts = paragraph.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-6">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
            )}
          </p>
        );
      }

      // Handle italic text with *text*
      if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
        return (
          <p key={index} className="text-muted-foreground italic leading-relaxed mb-6">
            {paragraph.slice(1, -1)}
          </p>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-6">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-4xl">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <span className="label-caps text-primary-foreground/60 mb-4 block">{post.category}</span>
            <h1 className="heading-hero text-primary-foreground mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Main Content */}
            <article className="lg:col-span-3 max-w-none">
              <div className="prose prose-lg max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-8 p-8 bg-muted rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-xl text-primary">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium text-foreground mb-1">
                      {post.author}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Expert at Stoneworks of Colorado with years of experience in stone fabrication and design.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-32">
                <h3 className="font-serif text-lg font-medium text-foreground mb-6">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-3">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-serif text-base font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h4 className="font-serif text-lg font-medium text-foreground mb-2">
                    Ready to Get Started?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact us for a free consultation and quote.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Keep Reading"
            title="More Articles"
            titleAccent="You Might Like"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                to={`/blog/${relatedPost.slug}`}
                className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <span className="label-caps text-primary text-xs">{relatedPost.category}</span>
                  <h3 className="font-serif text-lg font-medium text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
