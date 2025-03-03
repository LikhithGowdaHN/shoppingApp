"use client";

import { LuSquare, LuLayoutGrid, LuColumns4 } from "react-icons/lu";

type LayoutSwitcherProps = {
  itemsPerRow: number;
  setItemsPerRow: (num: number) => void;
};

const LayoutSwitcher = ({ itemsPerRow, setItemsPerRow }: LayoutSwitcherProps) => (
  <div className="mt-4 flex gap-3">
    {[1, 2, 3].map((num) => (
      <button
        key={num}
        className={`p-2 rounded-lg transition ${
          itemsPerRow === num ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"
        }`}
        onClick={() => setItemsPerRow(num)}
      >
        {num === 1 ? <LuSquare size={24} /> : num === 2 ? <LuColumns4 size={24} /> : <LuLayoutGrid size={24} />}
      </button>
    ))}
  </div>
);

export default LayoutSwitcher;