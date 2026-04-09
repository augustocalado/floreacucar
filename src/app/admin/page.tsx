"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  MoreVertical,
  ChevronRight,
  Search,
  CheckCircle2,
  Clock,
  Truck
} from "lucide-react";

// Mock orders for the admin dashboard
const mockOrders = [
  {
    id: "ORD-7231",
    customer: "Maria Silva",
    total: 45.80,
    status: "preparing",
    items: "2x Ninho com Nutella",
    date: "Hoje, 14:20"
  },
  {
    id: "ORD-7230",
    customer: "João Pereira",
    total: 22.90,
    status: "delivering",
    items: "1x Caramelo Salgado",
    date: "Hoje, 13:45"
  },
  {
    id: "ORD-7229",
    customer: "Ana Souza",
    total: 89.00,
    status: "completed",
    items: "3x Parmesão Trufado, 1x Red Velvet",
    date: "Hoje, 12:10"
  },
  {
    id: "ORD-7228",
    customer: "Carlos Lima",
    total: 35.00,
    status: "pending",
    items: "1x Ninho com Nutella (G)",
    date: "Hoje, 11:55"
  }
];

export default function AdminDashboard() {
  const [filter, setFilter] = useState("all");

  const stats = [
    { label: "Vendas Hoje", value: "R$ 1.240,50", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Novos Pedidos", value: "12", icon: ShoppingBag, color: "text-gold", bg: "bg-gold/10" },
    { label: "Entregues", value: "45", icon: Truck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Clientes", value: "128", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 lg:p-10">
      <div className="container mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brown-dark">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie seus pedidos e estoque em tempo real.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar pedido..." 
                className="rounded-full border border-cream bg-white pl-10 pr-4 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <button className="rounded-full bg-brown-dark px-6 py-2 text-sm font-bold text-white hover:bg-brown">
              Sair
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm border border-cream/50">
              <div className={`rounded-2xl p-3 ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-brown-dark">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table-like View */}
        <div className="mt-10 rounded-3xl bg-white shadow-sm border border-cream/50 overflow-hidden">
          <div className="border-b border-cream/50 p-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-brown-dark">Pedidos Recentes</h2>
            <div className="flex gap-2">
               {["all", "pending", "preparing", "completed"].map((f) => (
                 <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    filter === f ? "bg-brown-dark text-white" : "bg-zinc-100 text-muted-foreground hover:bg-zinc-200"
                  }`}
                 >
                   {f === "all" ? "Todos" : f.charAt(0).toUpperCase() + f.slice(1)}
                 </button>
               ))}
            </div>
          </div>

          <div className="divide-y divide-zinc-100">
            {mockOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-6 hover:bg-zinc-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl ${
                    order.status === 'completed' ? 'bg-green-100 text-green-600' : 
                    order.status === 'preparing' ? 'bg-amber-100 text-amber-600' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {order.status === 'completed' ? <CheckCircle2 className="h-6 w-6" /> : 
                     order.status === 'preparing' ? <Clock className="h-6 w-6" /> : <Package className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-brown-dark">{order.customer}</h3>
                    <p className="text-xs text-muted-foreground">{order.items}</p>
                    <div className="mt-1 flex items-center gap-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{order.id}</span>
                       <span className="text-[10px] text-zinc-400">•</span>
                       <span className="text-[10px] text-zinc-400">{order.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-bold text-brown-dark">R$ {order.total.toFixed(2)}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'completed' ? 'text-green-600' : 
                      order.status === 'preparing' ? 'text-amber-600' : 
                      order.status === 'delivering' ? 'text-blue-600' : 'text-zinc-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <button className="rounded-full p-2 hover:bg-zinc-100">
                    <ChevronRight className="h-5 w-5 text-zinc-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-zinc-50 p-4 text-center">
            <button className="text-sm font-bold text-gold hover:underline">Ver todos os pedidos</button>
          </div>
        </div>
      </div>
    </div>
  );
}
