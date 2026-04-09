"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/mock-data";
import { ProductModal } from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-cream/50 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-brown-dark group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <span className="shrink-0 font-bold text-gold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price_base)}
            </span>
          </div>
          
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-auto pt-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cream py-3 text-sm font-bold text-brown-dark transition-all hover:bg-gold hover:text-white"
            >
              <Plus className="h-4 w-4" />
              Personalizar
            </button>
          </div>
        </div>
      </motion.div>

      <ProductModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
