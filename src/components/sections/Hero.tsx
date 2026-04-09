"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-cream/30 px-4 py-20">
      {/* Background patterns could go here */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-gold blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-brown blur-[120px]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold mb-6">
            Artesanal • Crocante • Gourmet
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl font-serif text-5xl font-extrabold leading-tight text-brown-dark md:text-7xl lg:text-8xl"
        >
          A Melhor Pipoca do <br />
          <span className="text-gold">Seu Dia a Dia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg text-brown/80 md:text-xl"
        >
          Descubra uma explosão de sabores irresistíveis. Da clássica caramelizada à sofisticada trufada, levamos a experiência gourmet até você.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#cardapio"
            className="group flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-white shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:scale-105"
          >
            Ver Cardápio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#sobre"
            className="flex items-center justify-center rounded-full border-2 border-brown-dark/10 bg-white px-8 py-4 text-sm font-bold text-brown-dark transition-all hover:bg-cream"
          >
            Nossa História
          </a>
        </motion.div>
      </div>
    </section>
  );
}
