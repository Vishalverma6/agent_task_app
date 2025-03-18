import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full py-6 mt-10">
      <div className="container mx-auto text-center px-4">
        {/* App Title */}
        <h2 className="text-xl font-semibold">Task Management App</h2>
        <p className="text-sm text-gray-400 mt-2">
          Organize your tasks efficiently and boost productivity.
        </p>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition">Features</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Pricing</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Support</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Terms & Privacy</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaLinkedinIn size={18} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} Task Management App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
