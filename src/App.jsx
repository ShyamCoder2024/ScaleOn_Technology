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

  // PERFORMANCE: Use Intersection Observer with wider detection zone for mobile reliability
  // This ensures the header theme switches correctly on all devices including during fast scrolls
  useEffect(() => {
    const options = {
      root: null,
      threshold: 0,
      // Wider detection zone: trigger when section reaches top 15% of viewport
      // This is more reliable on mobile than a thin trigger line
      // Top margin -15% pushes detection down to 15% from top
      // Bottom margin -85% pushes detection up, creating zone at top 15%
      rootMargin: '-15% 0px -85% 0px'
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

      // Update theme with minimal debounce (16ms = 1 frame) for responsiveness
      // This prevents flickering while being fast enough for mobile scrolling
      if (newTheme !== lastThemeRef.current) {
        if (themeDebounceRef.current) {
          clearTimeout(themeDebounceRef.current);
        }
        themeDebounceRef.current = setTimeout(() => {
          lastThemeRef.current = newTheme;
          setTheme(newTheme);
        }, 16);
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
    <div className="min-h-screen relative isolate">
      {/* PERFORMANCE: Fixed background layer prevents repainting the entire DOM tree on theme change */}
      <div
        className={cn(
          "fixed inset-0 -z-50 transition-colors duration-700 ease-out",
          theme === 'dark' ? "bg-[#050505]" : "bg-white"
        )}
      />

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
