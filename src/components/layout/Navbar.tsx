"use client";

import { ShoppingCart, Menu, Popcorn } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { count, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cream/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 lg:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <Popcorn className="h-8 w-8 text-gold" />
            <span className="hidden font-serif text-xl font-bold tracking-tight text-brown-dark sm:block">
              Flor e Açúcar
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="#cardapio" className="text-sm font-medium hover:text-gold transition-colors">
            Cardápio
          </Link>
          <Link href="#sobre" className="text-sm font-medium hover:text-gold transition-colors">
            Sobre Nós
          </Link>
          <Link href="#contato" className="text-sm font-medium hover:text-gold transition-colors">
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-brown-dark hover:text-gold transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button className="hidden rounded-full bg-brown-dark px-6 py-2 text-sm font-semibold text-cream hover:bg-brown transition-colors sm:block">
            Área Admin
          </button>
        </div>
      </div>
    </header>
  );
}
