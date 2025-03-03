"use client";
import { useCart } from "@/app/products/store/useCart";
import { toast } from "react-hot-toast";

const AddToCartButton = ({
  productId,
  title,
  price,
  quantity,
}: {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}) => {
  const { addToCart } = useCart();

  return (
    <button
      className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-600 w-full"
      onClick={() => {
        addToCart({ id: productId, title, price, quantity });
        toast.success(`${title} added to cart!`);
      }}
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;