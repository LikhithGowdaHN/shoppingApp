"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { LuSquare, LuLayoutGrid, LuColumns4 } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const CategoryTabs = ({ selected, setSelected }) => {
  const categories = ["Donuts", "Ice Cream", "Bomboloni"];
  return (
    <div className="mt-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 mr-4 rounded-lg font-semibold transition ${
            selected === category ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setSelected(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const LayoutSwitcher = ({ itemsPerRow, setItemsPerRow }) => (
  <div className="mt-4 flex gap-3">
    {[1, 2, 3].map((num) => (
      <button
        key={num}
        className={`p-2 rounded-lg transition ${itemsPerRow === num ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
        onClick={() => setItemsPerRow(num)}
      >
        {num === 1 ? <LuSquare size={24} /> : num === 2 ? <LuColumns4 size={24} /> : <LuLayoutGrid size={24} />}
      </button>
    ))}
  </div>
);

const SortDropdown = ({ sortOrder, setSortOrder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition" onClick={() => setOpen(!open)}>
        Sort
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full ml-2 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden w-48 z-50"
          >
            {["low", "high"].map((order) => (
              <button
                key={order}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-700 transition ${sortOrder === order ? "bg-gray-700" : ""}`}
                onClick={() => {
                  setSortOrder(order);
                  setOpen(false);
                }}
              >
                Sort by {order === "low" ? "Low Price" : "High Price"}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductCard = ({ product, itemsPerRow }) => (
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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Donuts");
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [sortOrder, setSortOrder] = useState("low");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.products))
      .catch(() => setError("Failed to load products. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const sortedProducts = [...products].sort((a, b) => (sortOrder === "low" ? a.price - b.price : b.price - a.price));
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-black text-white p-6 max-w-[800px] mx-auto">
      <h1 className="text-3xl font-bold">Product List</h1>
      <CategoryTabs selected={selectedCategory} setSelected={setSelectedCategory} />
      <div className="flex flex-wrap justify-between items-center mt-4">
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <LayoutSwitcher itemsPerRow={itemsPerRow} setItemsPerRow={setItemsPerRow} />
      </div>
      <div className="mt-6 grid gap-4" style={{ gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} itemsPerRow={itemsPerRow} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span className="mx-4">{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
