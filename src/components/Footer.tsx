
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <div className="mb-4">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-propcloud-600">
                  PropCloud<span className="text-propcloud-400">.io</span>
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              AI-powered property management assistant that automates guest communication,
              bookings, pricing, and operations to maximize your revenue.
            </p>
          </div>

          <div className="mt-6 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-propcloud-600">Features</a>
                </li>
                <li>
                  <a href="#demo" className="text-muted-foreground hover:text-propcloud-600">Demo</a>
                </li>
                <li>
                  <a href="#waitlist" className="text-muted-foreground hover:text-propcloud-600">Join Waitlist</a>
                </li>
                <li>
                  <Link to="/login" className="text-muted-foreground hover:text-propcloud-600">Login</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  Email: contact@propcloud.io
                </li>
                <li className="text-muted-foreground">
                  Support: help@propcloud.io
                </li>
                <li className="text-muted-foreground">
                  Phone: +1 (321) 344-0508
                </li>
              </ul>
            </div>
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
