
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-propcloud-600">
            PropCloud<span className="text-propcloud-400">.io</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#benefits">Benefits</NavLink>
          <NavLink href="#demo">Demo</NavLink>
          <Button asChild variant="outline" className="ml-2">
            <Link to="/dashboard">Demo Dashboard</Link>
          </Button>
          <Button asChild className="ml-2">
            <a href="#waitlist">Join Waitlist</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </MobileNavLink>
            <MobileNavLink
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </MobileNavLink>
            <MobileNavLink
              href="#benefits"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefits
            </MobileNavLink>
            <MobileNavLink
              href="#demo"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demo
            </MobileNavLink>
            <Button
              asChild
              variant="outline"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link to="/dashboard">Demo Dashboard</Link>
            </Button>
            <Button
              asChild
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a href="#waitlist">Join Waitlist</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors font-medium"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className="text-foreground py-2 border-b border-border block"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavBar;
