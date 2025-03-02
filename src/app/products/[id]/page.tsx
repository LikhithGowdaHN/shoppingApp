"use client";

import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { fetchProductById } from "@/app/lib/api";
import { useCart } from "@/app/products/store/useCart";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { CirclePlus, CircleMinus, ChevronLeft } from "lucide-react";

// Back Button Component
const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-white hover:text-gray-400 transition absolute left-5 top-5"
      aria-label="Go back"
    >
      <ChevronLeft size={24} color="#f8f7f7" strokeWidth={2.5} />
    </button>
  );
};

// Quantity Selector Component
const QuantitySelector = ({ quantity, setQuantity }: { quantity: number; setQuantity: (q: number) => void }) => (
  <div className="mt-4 bg-gray-800 px-4 py-2 rounded-full flex justify-between items-center w-[180px] mx-auto">
    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white hover:text-gray-400">
      <CircleMinus size={24} color="#f8f7f7" strokeWidth={2.5} />
    </button>
    <span className="text-lg font-bold text-yellow-500">{quantity}</span>
    <button onClick={() => setQuantity(quantity + 1)} className="text-white hover:text-gray-400">
      <CirclePlus size={24} color="#f8f7f7" strokeWidth={2.5} />
    </button>
  </div>
);

// Define Product Type
type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating?: number;
};

// Fetch Product by ID
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const product = await fetchProductById(Number(id));

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
  };
};

// Product Detail Page Component
export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="bg-black text-white p-6 relative max-w-[800px] mx-auto">
      {/* Back Button */}
      <BackButton />

      {/* Centered Product Image */}
      <div className="mt-8 flex justify-center items-center">
        <div className="relative w-[320px] h-[320px] flex justify-center items-center">
          <Image
            src={product.thumbnail}
            alt={product.title}
            layout="intrinsic"
            width={300}
            height={300}
            className="rounded-lg object-contain"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-6 px-4 text-center">
        <h1 className="text-2xl font-semibold">{product.title}</h1>

        {/* Rating */}
        <div className="mt-2 flex justify-center items-center">
          <FaStar className="text-yellow-400" />
          <span className="ml-1 text-lg">{product.rating || "4.0"}</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 mt-2">{product.description}</p>

        {/* Quantity Selector */}
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

        {/* Price */}
        <p className="text-xl font-semibold mt-4">${product.price}</p>

        {/* Add to Cart Button */}
        <button
          className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-600 w-full"
          onClick={() => {
            addToCart({ id: product.id, title: product.title, price: product.price, quantity });
            toast.success("Added to cart!");
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
