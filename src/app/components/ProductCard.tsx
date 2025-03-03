"use client";

import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

type ProductType = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  rating: number;
};

type ProductCardProps = {
  product: ProductType;
  itemsPerRow: number;
};

const ProductCard = ({ product, itemsPerRow }: ProductCardProps) => (
  <Link key={product.id} href={`/products/${product.id}`}>
    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative w-full overflow-hidden rounded-lg" style={{ height: itemsPerRow === 1 ? "500px" : "150px" }}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mt-2">
        <div className="flex items-center text-yellow-500">
          <FaStar size={14} />
          <span className="ml-1 text-sm">{product.rating || "4.0"}</span>
        </div>
        <h2 className="text-lg font-semibold mt-1">{product.title}</h2>
        <p className="text-gray-400 text-sm">{product.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-lg font-bold">${product.price}</p>
          <button className="bg-yellow-500 text-black p-1 rounded-full hover:bg-yellow-600">+</button>
        </div>
      </div>
    </div>
  </Link>
);

export default ProductCard;