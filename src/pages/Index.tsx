import React from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import DemoSection from "@/components/DemoSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhoWeAreSection />
      <BenefitsSection />
      <DemoSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
};

export default Index;
