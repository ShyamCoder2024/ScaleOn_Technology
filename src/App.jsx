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

import { useState } from 'react';
import { cn } from './lib/utils';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000 ease-in-out relative",
      theme === 'dark' ? "bg-[#050505]" : "bg-white"
    )}>
      <Header theme={theme} />
      <main>
        <Hero />
        <TrustBar />
        <TargetAudience />
        <ProblemSolution />
        <SystemServices setTheme={setTheme} />
        <GrowthEngines setTheme={setTheme} />
        <HowItWorks setTheme={setTheme} />
        <WhatWeDontDo setTheme={setTheme} />
        <SocialProof setTheme={setTheme} theme={theme} />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
