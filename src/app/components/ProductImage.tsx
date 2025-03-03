"use client";
import Image from "next/image";

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative w-[350px] h-[350px] rounded-lg overflow-hidden mx-auto">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
};

export default ProductImage;