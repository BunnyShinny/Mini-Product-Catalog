"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Dropdown from "./Dropdown";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { totalQty,totalTypes } = useCart();
  return (
    <header className="bg-blue-800 text-white">
      <div className="flex justify-center items-center px-6 py-4 border-b-[1px] border-[#d5d5d5]">
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
        className={` bg-[#f8f7f7] text-black flex-col sm:flex sm:flex-row sm:justify-center sm:space-x-6 text-lg font-medium border-b border-gray-200 transition-all duration-300 ${
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
          href="/cart"
          className={`hover:underline p-4 ${pathname === "/cart" ? "underline" : ""}`}
          onClick={() => setIsOpen(false)}
        >
          🛒 Cart: {totalTypes}
        </Link>
        
      </nav>
    </header>
  );
}
