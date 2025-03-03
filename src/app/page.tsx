import { redirect } from "next/navigation";

export default function Home() {
  redirect("/products"); // Redirect to Product List Page
  return null;
}