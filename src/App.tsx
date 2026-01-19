import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RedirectHandler from "@/components/RedirectHandler";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "@/components/Analytics";
import { PageLoadingSkeleton } from "@/components/LoadingSkeleton";

// Eager load homepage for best FCP/LCP
import Index from "./pages/Index";

// Lazy load all other routes for smaller initial bundle
const NotFound = lazy(() => import("./pages/NotFound"));
const ServicesPage = lazy(() => import("./pages/services"));
const MaterialPage = lazy(() => import("./pages/services/MaterialPage"));
const StockProgram = lazy(() => import("./pages/StockProgram"));
const StockProgramColors = lazy(() => import("./pages/StockProgramColors"));
const EdgeStyles = lazy(() => import("./pages/EdgeStyles"));
const SinkStyles = lazy(() => import("./pages/SinkStyles"));
const About = lazy(() => import("./pages/About"));
const Process = lazy(() => import("./pages/Process"));
const Contact = lazy(() => import("./pages/Contact"));
const Reviews = lazy(() => import("./pages/Reviews"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ServiceArea = lazy(() => import("./pages/ServiceArea"));
const BlogPage = lazy(() => import("./pages/blog"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const SpecialOffer = lazy(() => import("./pages/SpecialOffer"));
const Book = lazy(() => import("./pages/Book"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
        <ScrollToTop />
        <Analytics />
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:material" element={<MaterialPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/service-area" element={<ServiceArea />} />
            <Route path="/stock-program" element={<StockProgram />} />
            <Route path="/stock-program-colors" element={<StockProgramColors />} />
            <Route path="/edge-styles" element={<EdgeStyles />} />
            <Route path="/sink-styles" element={<SinkStyles />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/special-offer" element={<SpecialOffer />} />
            <Route path="/book" element={<Book />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
