interface PageHeroProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  size?: 'default' | 'large';
}

const PageHero = ({ 
  badge,
  title, 
  titleAccent, 
  description, 
  backgroundImage,
  children,
  size = 'default'
}: PageHeroProps) => {
  const heightClass = size === 'large' ? 'min-h-[70vh]' : 'min-h-[50vh]';

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden pt-24`}>
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/50 to-charcoal/80" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-charcoal/90" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-4xl">
          {badge && (
            <span className="label-caps text-primary-foreground/60 mb-4 block">
              {badge}
            </span>
          )}
          <h1 className="heading-hero text-primary-foreground mb-6">
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="italic font-normal opacity-90">{titleAccent}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="body-large text-primary-foreground/80 max-w-2xl">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
