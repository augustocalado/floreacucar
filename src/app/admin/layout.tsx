"use client";

import { StoreProvider } from "@/context/StoreContext";
import { CartProvider } from "@/context/CartContext";

// Admin has its own layout — no store navbar or footer
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </StoreProvider>
  );
}
