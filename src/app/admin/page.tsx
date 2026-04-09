"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  ChevronRight,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Save,
  Image as ImageIcon
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

// Mock orders for the admin dashboard
const mockOrders = [
  /* ... previously defined mock orders ... */
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "settings">("dashboard");
  const [filter, setFilter] = useState("all");
  
  const { storeName, logoUrl, setStoreName, setLogoUrl } = useStore();
  
  // Local state for the form
  const [tempName, setTempName] = useState(storeName);
  const [tempLogo, setTempLogo] = useState(logoUrl);
  const [isSaving, setIsSaving] = useState(false);

  const stats = [
    { label: "Vendas Hoje", value: "R$ 1.240,50", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Novos Pedidos", value: "12", icon: ShoppingBag, color: "text-gold", bg: "bg-gold/10" },
    { label: "Entregues", value: "45", icon: Truck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Clientes", value: "128", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStoreName(tempName);
    setLogoUrl(tempLogo);
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 lg:p-10">
      <div className="container mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-brown-dark">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie seus pedidos e estoque em tempo real.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setActiveTab("dashboard")}
                className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
                  activeTab === "dashboard" ? "bg-brown-dark text-white" : "bg-white text-brown-dark border border-cream hover:bg-zinc-50"
                }`}
             >
               Dashboard
             </button>
             <button 
                onClick={() => setActiveTab("settings")}
                className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
                  activeTab === "settings" ? "bg-brown-dark text-white" : "bg-white text-brown-dark border border-cream hover:bg-zinc-50"
                }`}
             >
               Configurações
             </button>
            <button className="hidden rounded-full border border-cream bg-white px-6 py-2 text-sm font-bold text-brown-dark hover:bg-zinc-50 sm:block">
              Sair
            </button>
          </div>
        </header>

        {activeTab === "dashboard" ? (
          <>
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
                {/* ... mock orders display ... */}
                <div className="p-20 text-center text-muted-foreground">
                  Funcionalidade de listagem real em desenvolvimento.
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-10 max-w-2xl">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-cream/50">
              <h2 className="font-serif text-2xl font-bold text-brown-dark mb-6 flex items-center gap-2">
                <Settings className="h-6 w-6" />
                Configurações da Loja
              </h2>
              
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brown/60 uppercase tracking-wider">
                    Nome da Loja
                  </label>
                  <input
                    required
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full rounded-2xl border border-cream bg-white px-5 py-4 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    placeholder="Ex: Flor e Açúcar"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brown/60 uppercase tracking-wider">
                    URL da Logo (Opcional)
                  </label>
                  <div className="flex gap-4">
                    <input
                      value={tempLogo}
                      onChange={(e) => setTempLogo(e.target.value)}
                      className="flex-1 rounded-2xl border border-cream bg-white px-5 py-4 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="https://sua-logo.com/imagem.png"
                    />
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cream bg-zinc-50 overflow-hidden">
                      {tempLogo ? (
                        <img src={tempLogo} alt="Preview" className="h-full w-full object-contain" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-zinc-300" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Se vazio, será exibido o ícone padrão de pipoca.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gold py-4 font-bold text-white shadow-lg shadow-gold/20 hover:bg-gold/90 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSaving ? <RotateCcw className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                    {isSaving ? "Salvando..." : "Salvar Alterações"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTempName(storeName);
                      setTempLogo(logoUrl);
                    }}
                    className="px-6 rounded-2xl border border-cream bg-white font-bold text-brown-dark hover:bg-zinc-50 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 rounded-2xl bg-cream/30 p-6 border border-gold/10">
              <p className="text-sm text-brown-dark/70">
                <strong>Dica:</strong> O nome da loja é exibido na barra de navegação, no rodapé e nos resumos de pedidos enviados para o WhatsApp.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
