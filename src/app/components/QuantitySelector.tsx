"use client";
import { CirclePlus, CircleMinus } from "lucide-react";

const QuantitySelector = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
}) => {
  return (
    <div className="mt-4 bg-gray-800 px-6 py-3 rounded-full flex justify-between items-center w-[200px] mx-auto">
      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white hover:text-gray-400">
        <CircleMinus size={28} />
      </button>
      <span className="text-xl font-bold text-yellow-500">{quantity}</span>
      <button onClick={() => setQuantity(quantity + 1)} className="text-white hover:text-gray-400">
        <CirclePlus size={28} />
      </button>
    </div>
  );
};

export default QuantitySelector;