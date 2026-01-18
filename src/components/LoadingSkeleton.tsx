/**
 * Lightweight loading skeletons for Suspense fallbacks
 * Designed for minimal JS footprint and fast render
 */

// Page loading skeleton - minimal, fast to render
export const PageLoadingSkeleton = () => (
  <div className="min-h-screen bg-background animate-pulse">
    <div className="h-16 bg-muted/30" /> {/* Navbar placeholder */}
    <div className="container mx-auto px-6 py-24">
      <div className="h-8 w-48 bg-muted/30 rounded mb-4" />
      <div className="h-4 w-full max-w-xl bg-muted/30 rounded mb-2" />
      <div className="h-4 w-3/4 max-w-lg bg-muted/30 rounded" />
    </div>
  </div>
);

// Section loading skeleton - for lazy-loaded homepage sections
export const SectionLoadingSkeleton = () => (
  <div className="py-16 lg:py-24 bg-background animate-pulse">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="h-4 w-24 bg-muted/30 rounded mx-auto mb-4" />
        <div className="h-8 w-64 bg-muted/30 rounded mx-auto mb-4" />
        <div className="h-4 w-full max-w-md bg-muted/30 rounded mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-muted/30 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

// Minimal inline skeleton for small components
export const CardSkeleton = () => (
  <div className="h-64 bg-muted/30 rounded-lg animate-pulse" />
);

export default PageLoadingSkeleton;
