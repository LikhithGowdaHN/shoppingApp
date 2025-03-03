"use client";
import Link from "next/link";
import { useCart } from "@/app/products/store/useCart";

export default function Navbar() {
  const { cart } = useCart(); // Get cart state

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-[1000px] mx-auto flex justify-between items-center">
        {/* 🏠 Shop Name */}
        <Link href="/" className="text-2xl font-bold">🛍 MyShop</Link>
        
        {/* 🛒 Cart */}
        <Link href="/cart" className="flex items-center gap-2 hover:text-gray-400">
          <span className="text-lg">🛒</span>
          <span className="text-lg">Cart ({cart.length})</span>
        </Link>
      </div>
    </nav>
  );
}