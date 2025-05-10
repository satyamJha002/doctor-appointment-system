"use client";

import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-white shadow-md text-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <h1 className="text-xl md:text-2xl font-semibold">
              Doctor Appointment System
            </h1>
          </Link>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-6 font-semibold text-base">
              <li>
                <Link href="/doctors">
                  <button className="hover:text-red-500 transition-colors">
                    Doctors
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/appointments">
                  <button className="hover:text-red-500 transition-colors">
                    Appointments
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-4 text-center font-semibold">
              <li>
                <button
                  className="w-full py-2 hover:text-red-500 transition-colors"
                  onClick={toggleMenu}
                >
                  Doctors
                </button>
              </li>
              <li>
                <button
                  className="w-full py-2 hover:text-red-500 transition-colors"
                  onClick={toggleMenu}
                >
                  Appointments
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
