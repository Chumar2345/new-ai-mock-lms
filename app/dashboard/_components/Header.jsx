"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu

export const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <header
      className="flex items-center justify-between p-4 bg-black border-b-4 border-purple-700 shadow-lg"
    >
      {/* Logo */}
      <div className="text-purple-500 text-xl md:text-2xl font-bold">
        <Link href="/">
          <span className="text-white">V</span>Mock <span className="text-xs">Ai</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        <Link href="/dashboard">
          <span
            className={`hover:text-gray-200 font-medium transition-all cursor-pointer ${
              path === "/dashboard" ? "text-purple-400 font-bold" : "text-white"
            }`}
          >
            Dashboard
          </span>
        </Link>
        <Link href="/dashboard/upgrade">
          <span
            className={` hover:text-gray-200 font-medium transition-all cursor-pointer ${
              path === "/dashboard/upgrade" ? "text-purple-400 font-bold" : "text-white"
            }`}
          >
            Upgrade
          </span>
        </Link>
      </nav>

      {/* User Button & Mobile Menu */}
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" onSignOut={handleSignOut} />

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black shadow-lg md:hidden flex flex-col items-center gap-4 py-4 border-t border-purple-700">
          <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
            <span className={`hover:text-gray-200 text-lg font-medium transition-all cursor-pointer ${
              path === "/dashboard" ? "text-purple-400 font-bold" : "text-white"
            }`}>
              Dashboard
            </span>
          </Link>
          <Link href="/dashboard/upgrade" onClick={() => setMenuOpen(false)}>
            <span className={`hover:text-gray-200 text-lg font-medium transition-all cursor-pointer ${
              path === "/dashboard/upgrade" ? "text-purple-400 font-bold" : "text-white"
            }`}>
              Upgrade
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};
