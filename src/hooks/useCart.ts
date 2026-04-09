"use client";

import { useState, useEffect } from "react";
import { Product, ProductOption } from "@/lib/mock-data";

export type CartItem = {
  cartId: string;
  product: Product;
  quantity: number;
  selectedOptions: ProductOption[];
  totalPrice: number;
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
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

  // Save cart to localStorage on changes
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
  };

  const removeFromCart = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    count: items.reduce((acc, item) => acc + item.quantity, 0),
  };
}
