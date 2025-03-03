"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="absolute left-4 top-4 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
      aria-label="Go back"
    >
      <ChevronLeft size={24} color="white" strokeWidth={2.5} />
    </button>
  );
};

export default BackButton;