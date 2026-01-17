interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader = ({
  badge,
  title,
  titleAccent,
  description,
  centered = true,
  className = ""
}: SectionHeaderProps) => {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-16 ${className}`}>
      {badge && (
        <span className="label-caps text-muted-foreground mb-4 block">{badge}</span>
      )}
      <h2 className="heading-section text-foreground mb-6">
        {title}
        {titleAccent && (
          <>
            <br />
            <span className="italic font-normal text-muted-foreground">{titleAccent}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="body-large text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
