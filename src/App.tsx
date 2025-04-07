
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components directly from where they exist
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorksSection from './components/HowItWorksSection';
import { WhoWeAre } from './components/landing/WhoWeAre.tsx';
import Footer from './components/Footer';

// Import UI components
import { Toaster } from '@/components/ui/toaster';
import NavBar from './components/NavBar';

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
  </>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <NavBar />
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
