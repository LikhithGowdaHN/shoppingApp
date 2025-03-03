"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SortDropdownProps = {
  sortOrder: string;
  setSortOrder: (order: string) => void;
};

const SortDropdown = ({ sortOrder, setSortOrder }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        onClick={() => setOpen(!open)}
      >
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
                className={`block w-full text-left px-4 py-2 hover:bg-gray-700 transition ${
                  sortOrder === order ? "bg-gray-700" : ""
                }`}
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

export default SortDropdown;