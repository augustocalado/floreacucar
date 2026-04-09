"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductOption } from "@/lib/mock-data";

export type CartItem = {
  cartId: string;
  product: Product;
  quantity: number;
  selectedOptions: ProductOption[];
  totalPrice: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, selectedOptions: ProductOption[]) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  count: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("pipoca-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pipoca-cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity: number, selectedOptions: ProductOption[]) => {
    const optionPrice = selectedOptions.reduce((acc, opt) => acc + opt.price_extra, 0);
    const unitPrice = product.price_base + optionPrice;
    
    const newItem: CartItem = {
      cartId: Math.random().toString(36).substring(7),
      product,
      quantity,
      selectedOptions,
      totalPrice: unitPrice * quantity,
    };

    setItems((prev) => [...prev, newItem]);
    setIsCartOpen(true); // Open cart automatically when item added
  };

  const removeFromCart = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const count = items.length;

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      cartTotal, 
      count,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
