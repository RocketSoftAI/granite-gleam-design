interface FormPlaceholderProps {
  formId: string;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Placeholder component for GHL form embeds
 * Replace the inner content with your GHL embed script
 */
const FormPlaceholder = ({ 
  formId, 
  title = "Request a Quote",
  description = "GHL form embed will go here",
  className = ""
}: FormPlaceholderProps) => {
  return (
    <div 
      id={formId}
      className={`bg-card/95 backdrop-blur-sm p-8 lg:p-10 rounded-lg shadow-elevated ${className}`}
    >
      <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mb-6">
        {description}
      </p>
      
      {/* GHL EMBED PLACEHOLDER */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
        <div className="text-muted-foreground">
          <p className="font-medium mb-2">GHL Form Placeholder</p>
          <p className="text-xs">Form ID: {formId}</p>
          <p className="text-xs mt-2">Replace this div with your GHL embed script:</p>
          <code className="block mt-2 text-xs bg-background p-2 rounded">
            {`<!-- GHL Form Embed -->`}
          </code>
        </div>
      </div>
    </div>
  );
};

export default FormPlaceholder;
