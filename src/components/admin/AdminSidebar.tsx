"use client";

import { useStore } from "@/context/StoreContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  ChevronRight,
  Popcorn,
  LogOut,
  UtensilsCrossed,
} from "lucide-react";

type View = "dashboard" | "orders" | "products" | "customers" | "kds" | "settings";

interface AdminSidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const navItems = [
  { id: "dashboard" as View, label: "Dashboard",    icon: LayoutDashboard },
  { id: "orders"    as View, label: "Pedidos",      icon: ShoppingBag },
  { id: "kds"       as View, label: "Cozinha (KDS)", icon: UtensilsCrossed },
  { id: "products"  as View, label: "Produtos",     icon: Package },
  { id: "customers" as View, label: "Clientes",     icon: Users },
  { id: "settings"  as View, label: "Configurações", icon: Settings },
];

export function AdminSidebar({ activeView, setActiveView }: AdminSidebarProps) {
  const { storeName, logoUrl } = useStore();

  return (
    <aside className="flex h-screen w-64 flex-col bg-brown-dark text-white shadow-2xl">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
        {logoUrl ? (
          <img src={logoUrl} alt={storeName} className="h-9 w-9 rounded-xl object-contain" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/20">
            <Popcorn className="h-5 w-5 text-gold" />
          </div>
        )}
        <div>
          <p className="font-serif text-base font-bold leading-tight">{storeName}</p>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Painel Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-gold text-white shadow-lg shadow-gold/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight className="h-4 w-4 opacity-70" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/40 transition-colors hover:bg-white/5 hover:text-white">
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
