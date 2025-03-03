"use client";
import { FaStar } from "react-icons/fa";

const ProductRating = ({ rating }: { rating: number }) => {
  return (
    <div className="mt-2 flex justify-center items-center gap-1">
      <FaStar className="text-yellow-400" />
      <span className="text-lg">{rating || "4.0"}</span>
    </div>
  );
};

export default ProductRating;