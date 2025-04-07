import React from 'react';
// Import routing capabilities if needed (assuming react-router-dom is used with Vite)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Landing Page Sections (using default imports with extensions)
import HeroSection from '@/components/sections/HeroSection.tsx';
import FeaturesSection from '@/components/sections/FeaturesSection.tsx';
import BenefitsSection from '@/components/sections/BenefitsSection.tsx';
import HowItWorksSection from '@/components/sections/HowItWorksSection.tsx';
import { WhoWeAre } from '@/components/landing/WhoWeAre.tsx'; // Assuming .tsx extension needed
import CTASection from '@/components/sections/CTASection.tsx';
// Assuming FAQs might be another component or part of WhoWeAre/CTASection

// Import Layout Components (with extensions)
import Header from '@/components/layout/Header.tsx';
import Footer from '@/components/layout/Footer.tsx';

// Placeholder pages for routing (if applicable)
const LoginPage = () => <div>Login Page Placeholder</div>;
const WaitlistPage = () => <div>Waitlist Page Placeholder</div>;
const DashboardPage = () => <div>Dashboard Placeholder</div>; // Add later

// Define the Landing Page structure
const LandingPage = () => (
  <>
    <HeroSection />
    <BenefitsSection />
    <FeaturesSection />
    <HowItWorksSection />
    <WhoWeAre />
    {/* Add FAQ component here if it exists */} 
    <CTASection />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header /> {/* Use the Header component */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            {/* Add dashboard route later when built */}
            {/* <Route path="/dashboard/*" element={<DashboardPage />} /> */}
          </Routes>
        </main>
        <Footer /> {/* Use the detailed footer */}
      </div>
    </Router>
  );
};

export default App;
