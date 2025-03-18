"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  return (
    <header className="bg-black text-white">
      <nav className="flex justify-between items-center px-6 md:px-8 py-4">
        
        {/* Logo */}
        <div className="text-purple-500 text-xl md:text-2xl font-bold">
          <Link href="/" className="hover:text-purple-500">
            <span className="text-white">V</span>Mock <span className="text-xs">Ai</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-sm md:text-lg">
          <li>
            <Link 
              href="/" 
              className={`hover:text-purple-500 transition ${pathname === "/" ? "text-purple-400 font-bold" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/pricing" 
              className={`hover:text-purple-500 transition ${pathname === "/pricing" ? "text-purple-400 font-bold" : ""}`}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link 
              href="/help" 
              className={`hover:text-purple-500 transition ${pathname === "/help" ? "text-purple-400 font-bold" : ""}`}
            >
              Help
            </Link>
          </li>
        </ul>

        {/* Get Started Button & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="hidden md:block bg-purple-500 px-4 py-2 rounded-full text-white hover:bg-purple-600 transition text-sm md:text-base"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden bg-black shadow-lg border-t border-purple-700">
          <ul className="flex flex-col items-center gap-4 py-4 text-lg">
            <li>
              <Link 
                href="/" 
                className={`hover:text-purple-500 ${pathname === "/" ? "text-purple-400 font-bold" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className={`hover:text-purple-500 ${pathname === "/pricing" ? "text-purple-400 font-bold" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/help" 
                className={`hover:text-purple-500 ${pathname === "/help" ? "text-purple-400 font-bold" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                href="/sign-in"
                className="bg-purple-500 px-4 py-2 rounded-full text-white hover:bg-purple-600 transition text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
