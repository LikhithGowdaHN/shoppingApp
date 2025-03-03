"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/lib/api";
import CategoryTabs from "@/app/components/CategoryTabs";
import LayoutSwitcher from "@/app/components/LayoutSwitcher";
import SortDropdown from "@/app/components/SortDropdown";
import ProductCard from "@/app/components/ProductCard";

type ProductType = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  rating: number;
  category: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [sortOrder, setSortOrder] = useState("low");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.products);
        const uniqueCategories = Array.from(new Set(data.products.map((p) => p.category)));
        setCategories(["All", ...uniqueCategories]);
      })
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "low" ? a.price - b.price : b.price - a.price
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-2xl font-bold animate-pulse">Loading<span className="dot-animation">...</span></p>
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

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-black text-white p-6 max-w-[1000px] mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-6">Explore Our Products</h1>

      <CategoryTabs 
        selected={selectedCategory} 
        setSelected={setSelectedCategory} 
        categories={categories} 
      />

      <div className="flex justify-between items-center mt-4">
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <LayoutSwitcher itemsPerRow={itemsPerRow} setItemsPerRow={setItemsPerRow} />
      </div>

      <div className="mt-6 grid gap-4" style={{ gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} itemsPerRow={itemsPerRow} />
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center gap-4">
        <button 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}