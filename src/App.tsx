import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RedirectHandler from "@/components/RedirectHandler";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "@/components/Analytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/services";
import MaterialPage from "./pages/services/MaterialPage";
import About from "./pages/About";
import Process from "./pages/Process";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import Portfolio from "./pages/Portfolio";
import ServiceArea from "./pages/ServiceArea";
import BlogPage from "./pages/blog";
import BlogPost from "./pages/blog/BlogPost";
import SpecialOffer from "./pages/SpecialOffer";
import Book from "./pages/Book";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

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
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/special-offer" element={<SpecialOffer />} />
          <Route path="/book" element={<Book />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
