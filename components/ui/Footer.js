"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="text-purple-500 text-xl md:text-2xl font-bold">
        <Link href="#" >
          <span className="text-white">V</span>Mock <span className="text-xs">Ai</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap space-x-6 text-sm text-gray-300">
          <li>
            <Link href="/" className="hover:text-purple-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-purple-500 transition">
              Pricing
            </Link>
          </li>
          {/* <li>
            <Link href="#" className="hover:text-purple-500 transition">
              Contact Us
            </Link>
          </li> */}
          <li>
            <Link href="/help" className="hover:text-purple-500 transition">
            Help
            </Link>
          </li>
          {/* <li>
            <Link href="#" className="hover:text-purple-500 transition">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-purple-500 transition">
              Terms of Service
            </Link>
          </li> */}
        </ul>

        {/* Copyright Information */}
        <div className="text-gray-400 text-xs mt-4 md:mt-0">
          © 2025 Virtual Mock Ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
