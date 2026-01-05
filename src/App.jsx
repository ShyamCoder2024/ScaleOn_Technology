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

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from './lib/utils';

function App() {
  const [theme, setTheme] = useState('light');

  // Refs for dark theme sections
  const growthEnginesRef = useRef(null);
  const whatWeDontDoRef = useRef(null);
  const ticking = useRef(false); // For scroll throttling

  // Scroll-based theme detection with RAF throttling
  const updateTheme = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const viewportCenter = scrollY + windowHeight / 2;

    let shouldBeDark = false;

    // Check if viewport center is within any dark section
    const darkSections = [growthEnginesRef.current, whatWeDontDoRef.current];

    for (const section of darkSections) {
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionBottom = sectionTop + rect.height;

        // If viewport center is within this section, it should be dark
        if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
          shouldBeDark = true;
          break;
        }
      }
    }

    setTheme(shouldBeDark ? 'dark' : 'light');
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateTheme);
      ticking.current = true;
    }
  }, [updateTheme]);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    updateTheme();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, updateTheme]);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 ease-out relative",
      theme === 'dark' ? "bg-[#050505]" : "bg-white"
    )}>
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
