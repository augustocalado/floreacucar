"use client";

import { useStore } from "@/context/StoreContext";
import { Popcorn, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

// Social icon SVGs (lucide-react v1 doesn't export Instagram/Facebook)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export function Footer() {
  const { storeName, logoUrl } = useStore();

  return (
    <footer className="bg-brown-dark text-white">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              {logoUrl ? (
                <img src={logoUrl} alt={storeName} className="h-10 w-auto object-contain brightness-0 invert" />
              ) : (
                <Popcorn className="h-10 w-10 text-gold" />
              )}
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {storeName}
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed">
              Transformando momentos simples em experiências gourmet extraordinárias através do sabor único da nossa pipoca artesanal.
            </p>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-gold hover:text-white">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-gold hover:text-white">
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gold">Atalhos</h3>
            <ul className="space-y-4 text-zinc-400">
              <li>
                <Link href="/#categorias" className="flex items-center gap-2 transition-colors hover:text-white">
                  <ArrowRight className="h-3 w-3 text-gold" />
                  Cardápio
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="flex items-center gap-2 transition-colors hover:text-white">
                  <ArrowRight className="h-3 w-3 text-gold" />
                  Finalizar Pedido
                </Link>
              </li>
              <li>
                <Link href="/admin" className="flex items-center gap-2 transition-colors hover:text-white">
                  <ArrowRight className="h-3 w-3 text-gold" />
                  Área do Cliente
                </Link>
              </li>
              <li>
                <Link href="/admin" className="flex items-center gap-2 transition-colors hover:text-white">
                  <ArrowRight className="h-3 w-3 text-gold" />
                  Portal Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gold">Contato</h3>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-gold" />
                <div>
                  <p className="font-bold text-zinc-200">WhastsApp</p>
                  <a href="https://wa.me/5511999999999" target="_blank" className="hover:text-white">(11) 99999-9999</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gold" />
                <div>
                  <p className="font-bold text-zinc-200">Endereço</p>
                  <p>Av. das Pipocas, 123 - Gourmet City, SP</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gold">Horário</h3>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-gold" />
                <div>
                  <p className="font-bold text-zinc-200">Segunda à Sexta</p>
                  <p>10h às 22h</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-gold" />
                <div>
                  <p className="font-bold text-zinc-200">Sábado e Domingo</p>
                  <p>14h às 23h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} {storeName} Artesanal. Todos os direitos reservados.</p>
          <p className="mt-2 text-[10px] uppercase tracking-widest opacity-50">Desenvolvido com sofisticação</p>
        </div>
      </div>
    </footer>
  );
}
