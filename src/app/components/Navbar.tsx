"use client";
import Link from "next/link";
import { useCart } from "@/app/products/store/useCart";

export default function Navbar() {
  const { cart } = useCart(); // Get cart state

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/" className="text-xl font-bold">🛍 MyShop</Link>
      
      <Link href="/cart" className="flex items-center space-x-2">
        🛒 <span>Cart ({cart.length})</span>
      </Link>
    </nav>
  );
}