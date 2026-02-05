import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import TargetAudience from './components/TargetAudience';
import ProblemSolution from './components/ProblemSolution';
import SystemServices from './components/SystemServices';
import GrowthEngines from './components/GrowthEngines';
import HowItWorks from './components/HowItWorks';
import WhatWeDontDo from './components/WhatWeDontDo';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

import { useState, useEffect, useRef } from 'react';
import { cn } from './lib/utils';

function App() {
  const [theme, setTheme] = useState('light');

  // Refs for dark theme sections
  const growthEnginesRef = useRef(null);
  const whatWeDontDoRef = useRef(null);
  const ticking = useRef(false); // For scroll throttling
  const lastScrollTime = useRef(0); // For additional throttling

  // Refs for theme logic
  const darkSectionsInView = useRef(new Set());
  const themeDebounceRef = useRef(null);
  const lastThemeRef = useRef('light');

  // PERFORMANCE: Use Intersection Observer with specific trigger line

  // PERFORMANCE: Use Intersection Observer with specific trigger line
  // This ensures smooth transitions only when the section dominates the view
  useEffect(() => {
    const options = {
      root: null,
      threshold: 0,
      // Create a trigger line at 25% from the top of the viewport
      // Top margin -25% pushes top edge down to 25%
      // Bottom margin -75% pushes bottom edge up to 25%
      // Result: A thin detection line at 25% height
      rootMargin: '-25% 0px -75% 0px'
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.dataset.darkSection;

        if (entry.isIntersecting) {
          darkSectionsInView.current.add(sectionId);
        } else {
          darkSectionsInView.current.delete(sectionId);
        }
      });

      // Calculate new theme
      const newTheme = darkSectionsInView.current.size > 0 ? 'dark' : 'light';

      // ANTI-BLINK: Debounce theme changes
      // Only update theme after stable state for 50ms
      // This prevents rapid flickering during fast scrolls
      if (newTheme !== lastThemeRef.current) {
        if (themeDebounceRef.current) {
          clearTimeout(themeDebounceRef.current);
        }
        themeDebounceRef.current = setTimeout(() => {
          lastThemeRef.current = newTheme;
          setTheme(newTheme);
        }, 50);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe dark sections
    if (growthEnginesRef.current) {
      growthEnginesRef.current.dataset.darkSection = 'growthEngines';
      observer.observe(growthEnginesRef.current);
    }
    if (whatWeDontDoRef.current) {
      whatWeDontDoRef.current.dataset.darkSection = 'whatWeDontDo';
      observer.observe(whatWeDontDoRef.current);
    }

    return () => {
      observer.disconnect();
      if (themeDebounceRef.current) {
        clearTimeout(themeDebounceRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen relative",
        // Faster transition for smoother feel during scroll
        "transition-colors duration-700 ease-out",
        theme === 'dark' ? "bg-[#050505]" : "bg-white"
      )}
    >

      <Header theme={theme} />
      <main>
        <Hero />
        <TrustBar />
        <TargetAudience />
        <ProblemSolution />
        <SystemServices />
        <div ref={growthEnginesRef}>
          <GrowthEngines />
        </div>
        <HowItWorks />
        <div ref={whatWeDontDoRef}>
          <WhatWeDontDo />
        </div>
        <SocialProof theme={theme} />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
