import type { Metadata } from "next";
import { CartProvider } from "./components/CartProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export const metadata: Metadata = {
  title: "My App Front",
  description: "Front",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <Navbar/>
      <main className="container mx-auto p-4">{children}</main>
      <Footer/>
    </CartProvider>
  );
}