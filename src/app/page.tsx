"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { ProductCard } from "@/components/products/ProductCard";
import { categories, products } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category_id === activeCategory);

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      <section id="cardapio" className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-brown-dark md:text-5xl">
            Nosso Cardápio
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Escolha entre nossas variedades irresistíveis. Cada grão é estourado no ar e caramelizado à mão.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
              activeCategory === "all"
                ? "bg-gold text-white shadow-lg shadow-gold/20"
                : "bg-cream text-brown-dark hover:bg-gold/10"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-gold text-white shadow-lg shadow-gold/20"
                  : "bg-cream text-brown-dark hover:bg-gold/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-muted-foreground">Em breve novos sabores nesta categoria!</p>
          </div>
        )}
      </section>

      {/* About Section - Brief */}
      <section id="sobre" className="bg-brown-dark py-24 text-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-video overflow-hidden rounded-3xl lg:aspect-square">
               <motion.div 
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="h-full w-full"
               >
                 <img 
                    src="https://images.unsplash.com/photo-1599307734125-9fc24248888b?q=80&w=800&auto=format&fit=crop" 
                    alt="Processo artesanal" 
                    className="h-full w-full object-cover"
                 />
               </motion.div>
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold md:text-5xl">
                O Segredo da Melhor <br /> Pipoca Gourmet
              </h2>
              <p className="text-lg opacity-80">
                Nossa jornada começou com uma paixão simples: transformar o milho tradicional em uma obra de arte gastronômica. 
                Utilizamos o grão "Mushroom", que estoura em formato arredondado, ideal para segurar nossas caldas exclusivas.
              </p>
              <ul className="grid gap-4 pt-4 sm:grid-cols-2">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold" />
                  Ingredientes Premium
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold" />
                  Produção Diária
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold" />
                  Crocância Garantida
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-gold" />
                  Sem Conservantes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
