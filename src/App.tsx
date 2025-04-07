
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Landing Page Sections
import HeroSection from './components/sections/HeroSection.tsx';
import FeaturesSection from './components/sections/FeaturesSection.tsx';
import BenefitsSection from './components/sections/BenefitsSection.tsx';
import HowItWorksSection from './components/sections/HowItWorksSection.tsx';
import { WhoWeAre } from './components/landing/WhoWeAre.tsx';
import CTASection from './components/sections/CTASection.tsx';

// Import Layout Components
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';

// Import Toaster for notifications
import { Toaster } from '@/components/ui/toaster';

// Placeholder pages for routing
const LoginPage = () => <div>Login Page Placeholder</div>;
const WaitlistPage = () => <div>Waitlist Page Placeholder</div>;
const DashboardPage = () => <div>Dashboard Placeholder</div>;

// Define the Landing Page structure
const LandingPage = () => (
  <>
    <HeroSection />
    <BenefitsSection />
    <FeaturesSection />
    <HowItWorksSection />
    <WhoWeAre />
    <CTASection />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            {/* Add dashboard route later when built */}
            {/* <Route path="/dashboard/*" element={<DashboardPage />} /> */}
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
