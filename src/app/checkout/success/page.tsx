"use client";

import { CheckCircle2, MessageCircle, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="rounded-full bg-green-100 p-6 text-green-600"
      >
        <CheckCircle2 className="h-20 w-20" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 font-serif text-4xl font-bold text-brown-dark md:text-5xl"
      >
        Pedido Recebido!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 max-w-md text-lg text-muted-foreground"
      >
        Obrigado pela preferência. Agora é só aguardar! Se você ainda não enviou o resumo para o nosso WhatsApp, clique no botão abaixo.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex flex-col gap-4 sm:flex-row"
      >
        <a
          href="https://wa.me/5511999999999" // Exemplo
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gold px-8 py-4 font-bold text-white shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
          Falar com Atendente
        </a>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-2xl border border-brown-dark/10 bg-white px-8 py-4 font-bold text-brown-dark transition-all hover:bg-cream"
        >
          <Home className="h-5 w-5" />
          Voltar ao Início
        </Link>
      </motion.div>
    </div>
  );
}
