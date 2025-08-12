"use client"; // Needed for useState in Next.js App Router

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // lightweight icons

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#F8F7F7] text-black">
      {/* Top section */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Mini Product Catalog</h2>

        {/* Hamburger button (mobile) */}
        <button
          className="sm:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Nav links */}
      <nav
        className={`flex-col sm:flex sm:flex-row sm:justify-center sm:space-x-6 text-lg font-medium border-b border-gray-200 transition-all duration-300 ${
          isOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        <Link
          href="/"
          className={`hover:underline p-4 ${
            pathname === "/" ? "underline" : ""
          }`}
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/category"
          className={`hover:underline p-4 ${
            pathname === "/category" ? "underline" : ""
          }`}
          onClick={() => setIsOpen(false)}
        >
          Category
        </Link>
        <Link
          href="/search"
          className={`hover:underline p-4 ${
            pathname === "/search" ? "underline" : ""
          }`}
          onClick={() => setIsOpen(false)}
        >
          Search
        </Link>
        <Link
          href="/contact"
          className={`hover:underline p-4 ${
            pathname === "/contact" ? "underline" : ""
          }`}
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
