
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-propcloud-600">
                  PropCloud<span className="text-propcloud-400">.io</span>
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              AI-powered property management assistant that automates guest communication,
              bookings, pricing, and operations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-propcloud-600">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-propcloud-600">
                  Team
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-propcloud-600">
                  AI Communication
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-propcloud-600">
                  Dynamic Pricing
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-propcloud-600">
                  Operations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: contact@propcloud.io
              </li>
              <li>
                <a href="#waitlist" className="text-muted-foreground hover:text-propcloud-600">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PropCloud.io. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-propcloud-600">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-propcloud-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
