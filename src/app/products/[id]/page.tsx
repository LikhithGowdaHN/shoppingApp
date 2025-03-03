"use client";
import { useEffect, useState } from "react";
import { fetchProductById } from "@/app/lib/api";
import { useParams, useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import QuantitySelector from "@/app/components/QuantitySelector";
import ProductImage from "@/app/components/ProductImage";
import ProductRating from "@/app/components/ProductRating";
import AddToCartButton from "@/app/components/AddToCartButton";

type ProductType = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  rating: number;
  category: string;
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(Number(id));
        if (productData) {
          setProduct(productData);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/404");
      }
    };

    fetchProduct();
  }, [id, router]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-2xl font-bold animate-pulse">
          Loading<span className="dot-animation">...</span>
        </p>
        <style jsx>{`
          @keyframes dots {
            0% { content: "."; }
            25% { content: ".."; }
            50% { content: "..."; }
            75% { content: "...."; }
            100% { content: "....."; }
          }
          .dot-animation::after {
            display: inline-block;
            animation: dots 1.5s infinite steps(5);
            content: "...";
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-6 max-w-[1000px] mx-auto relative">
      
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>

      {/* Product Image */}
      <div className="mt-12 flex justify-center">
        <ProductImage src={product.thumbnail} alt={product.title} />
      </div>

      {/* Product Details */}
      <div className="mt-6 text-center px-4">
        <h1 className="text-4xl font-extrabold">{product.title}</h1>

        {/* Category */}
        <p className="text-gray-400 text-sm mt-1 uppercase">{product.category}</p>

        {/* Rating */}
        <ProductRating rating={product.rating} />

        {/* Description */}
        <p className="text-gray-400 mt-4 text-lg">{product.description}</p>

        {/* Quantity Selector */}
        <div className="mt-4">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>

        {/* Price */}
        <p className="text-3xl font-bold mt-5">${product.price}</p>

        {/* Add to Cart Button */}
        <div className="mt-6">
          <AddToCartButton 
            productId={product.id} 
            title={product.title} 
            price={product.price} 
            quantity={quantity} 
          />
        </div>
      </div>
    </div>
  );
}