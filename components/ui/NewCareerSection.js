"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function NewCareerSection() {
  return (
    <div className="career-section bg-black text-white py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4">Take charge of your career</h2>
        <p className="text-gray-300 mb-8">
          Get ready to become the best candidate for your dream job
        </p>

        {/* Call-to-Action Button */}
        <Link href="/sign-in" className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition mb-12">
          Try a Free Mock Interview Now
        </Link>

        {/* Social Media Links */}
        <h3 className="text-xl font-semibold mt-4 mb-4">Follow Our Journey</h3>
        <div className="flex justify-center items-center space-x-6 mb-8">
          <Link
            href="/"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-500 transition"
          >
            <FaFacebookF size={24} />
          </Link>
          <Link
            href="/"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-500 transition"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="/"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-500 transition"
          >
            <FaLinkedinIn size={24} />
          </Link>
          <Link
            href="/"
            // target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-500 transition"
          >
            <FaTwitter size={24} />
          </Link>
        </div>

        {/* Product Hunt Badge */}
        {/* <div className="flex justify-center">
          <a
            href="https://www.producthunt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:border-purple-500 transition"
          >
            <img
              src="/producthunt-logo.png" // Replace with the Product Hunt logo path
              alt="Product Hunt Logo"
              className="h-6"
            />
            <span>Find us on Product Hunt</span>
          </a>
        </div> */}
      </div>
    </div>
  );
}
