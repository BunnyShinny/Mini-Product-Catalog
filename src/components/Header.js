"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Dropdown from "./Dropdown";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#F8F7F7] text-black">
      <div className="flex justify-center items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Mini Product Catalog</h2>

        <button
          className="sm:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav
        className={`flex-col sm:flex sm:flex-row sm:justify-center sm:space-x-6 text-lg font-medium border-b border-gray-200 transition-all duration-300 ${
          isOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        <Link
          href="/"
          className={`hover:underline p-4 ${pathname === "/" ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>


        <Link
          href="/search"
          className={`hover:underline p-4 ${pathname === "/search" ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
        >
          Cart
        </Link>
        
      </nav>
    </header>
  );
}
