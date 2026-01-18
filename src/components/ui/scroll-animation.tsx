import { useRef, useEffect, ReactNode, useState } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';
  amount?: number;
}

// CSS-based scroll animations using IntersectionObserver
// Lightweight replacement for framer-motion to reduce bundle size by ~150KB
export const ScrollAnimation = ({
  children,
  className = '',
  delay = 0,
  variant = 'fadeUp',
  once = true,
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const getVariantStyles = () => {
    const baseHidden = 'opacity-0';
    const baseVisible = 'opacity-100';
    
    switch (variant) {
      case 'fadeUp':
        return {
          hidden: `${baseHidden} translate-y-8`,
          visible: `${baseVisible} translate-y-0`,
        };
      case 'fadeIn':
        return {
          hidden: baseHidden,
          visible: baseVisible,
        };
      case 'slideLeft':
        return {
          hidden: `${baseHidden} -translate-x-12`,
          visible: `${baseVisible} translate-x-0`,
        };
      case 'slideRight':
        return {
          hidden: `${baseHidden} translate-x-12`,
          visible: `${baseVisible} translate-x-0`,
        };
      case 'scale':
        return {
          hidden: `${baseHidden} scale-95`,
          visible: `${baseVisible} scale-100`,
        };
      default:
        return {
          hidden: `${baseHidden} translate-y-8`,
          visible: `${baseVisible} translate-y-0`,
        };
    }
  };

  const styles = getVariantStyles();
  const transitionClass = 'transition-all duration-700 ease-out';
  const delayStyle = delay > 0 ? { transitionDelay: `${delay * 1000}ms` } : {};

  return (
    <div
      ref={ref}
      className={`${transitionClass} ${isVisible ? styles.visible : styles.hidden} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

// Stagger container for animating children in sequence
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // Pass stagger delay to children via CSS custom property
        ['--stagger-delay' as string]: `${staggerDelay}s`,
        ['--is-visible' as string]: isVisible ? '1' : '0',
      }}
      data-stagger-visible={isVisible}
    >
      {children}
    </div>
  );
};

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export const StaggerItem = ({ children, className = '' }: StaggerItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [parentVisible, setParentVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Find index among siblings
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      setIndex(siblings.indexOf(element));

      // Watch for parent visibility changes
      const checkVisibility = () => {
        setParentVisible(parent.dataset.staggerVisible === 'true');
      };
      
      checkVisibility();
      const observer = new MutationObserver(checkVisibility);
      observer.observe(parent, { attributes: true, attributeFilter: ['data-stagger-visible'] });
      
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        parentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: parentVisible ? `${index * 0.1}s` : '0s' }}
    >
      {children}
    </div>
  );
};

// Parallax effect component - simplified for performance
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const Parallax = ({ children, className = '' }: ParallaxProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
