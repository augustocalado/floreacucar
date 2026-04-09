"use client";

import { useState } from "react";
import {
  BarChart3,
  ShoppingBag,
  Users,
  Truck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Save,
  RotateCcw,
  Image as ImageIcon,
  Star,
  ArrowUpRight,
  Bell,
  Search,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { KDSView } from "@/components/admin/KDSView";
import { useStore } from "@/context/StoreContext";

type View = "dashboard" | "orders" | "products" | "customers" | "kds" | "settings";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockOrders = [
  { id: "ORD-7231", customer: "Maria Silva",  total: 45.80, status: "preparing", items: "2x Ninho com Nutella (M)",          time: "14:20", avatar: "MS" },
  { id: "ORD-7230", customer: "João Pereira", total: 22.90, status: "delivering", items: "1x Caramelo Salgado (P)",           time: "13:45", avatar: "JP" },
  { id: "ORD-7229", customer: "Ana Souza",    total: 89.00, status: "completed",  items: "3x Parmesão Trufado, 1x Red Velvet", time: "12:10", avatar: "AS" },
  { id: "ORD-7228", customer: "Carlos Lima",  total: 35.00, status: "pending",    items: "1x Ninho com Nutella (G)",           time: "11:55", avatar: "CL" },
  { id: "ORD-7227", customer: "Laura Mota",   total: 58.50, status: "completed",  items: "2x Red Velvet (M), 1x Ervas Finas", time: "11:00", avatar: "LM" },
  { id: "ORD-7226", customer: "Pedro Alves",  total: 27.00, status: "pending",    items: "1x Parmesão Trufado (G)",           time: "10:30", avatar: "PA" },
];

const mockProducts = [
  { id: "p1", name: "Ninho com Nutella",  category: "Doce",    price: 22.90, stock: 18, status: "active" },
  { id: "p2", name: "Caramelo Salgado",   category: "Salgada", price: 18.90, stock: 7,  status: "active" },
  { id: "p3", name: "Parmesão Trufado",   category: "Premium", price: 32.90, stock: 3,  status: "low"    },
  { id: "p4", name: "Red Velvet",         category: "Doce",    price: 26.90, stock: 0,  status: "out"    },
  { id: "p5", name: "Ervas Finas",        category: "Salgada", price: 20.90, stock: 12, status: "active" },
];

const mockCustomers = [
  { id: "c1", name: "Maria Silva",  orders: 8,  spent: 312.50, lastOrder: "Hoje",       avatar: "MS" },
  { id: "c2", name: "Ana Souza",    orders: 5,  spent: 245.00, lastOrder: "Ontem",      avatar: "AS" },
  { id: "c3", name: "João Pereira", orders: 3,  spent: 98.90,  lastOrder: "03/04/2026", avatar: "JP" },
  { id: "c4", name: "Laura Mota",   orders: 12, spent: 578.00, lastOrder: "Hoje",       avatar: "LM" },
  { id: "c5", name: "Carlos Lima",  orders: 2,  spent: 67.80,  lastOrder: "01/04/2026", avatar: "CL" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
const statusConfig: Record<string, { label: string; className: string; icon: React.ComponentType<{className?: string}> }> = {
  pending:   { label: "Pendente",    className: "bg-amber-50  text-amber-700  border-amber-200",  icon: Clock        },
  preparing: { label: "Preparando",  className: "bg-blue-50   text-blue-700   border-blue-200",   icon: Package      },
  delivering:{ label: "Em Entrega",  className: "bg-purple-50 text-purple-700 border-purple-200", icon: Truck        },
  completed: { label: "Entregue",    className: "bg-green-50  text-green-700  border-green-200",  icon: CheckCircle2 },
  low:       { label: "Estoque Baixo",className:"bg-amber-50  text-amber-700  border-amber-200",  icon: AlertCircle  },
  out:       { label: "Sem Estoque", className: "bg-red-50    text-red-700    border-red-200",    icon: AlertCircle  },
  active:    { label: "Ativo",       className: "bg-green-50  text-green-700  border-green-200",  icon: CheckCircle2 },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? statusConfig.active;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${cfg.className}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 text-xs font-black text-brown-dark">
      {initials}
    </div>
  );
}

// ─── Views ────────────────────────────────────────────────────────────────────

function DashboardView() {
  const stats = [
    { label: "Receita Hoje",  value: "R$ 1.240",  change: "+12%", icon: BarChart3,  color: "gold" },
    { label: "Novos Pedidos", value: "12",         change: "+3",   icon: ShoppingBag, color: "blue" },
    { label: "Entregues",     value: "45",         change: "+8",   icon: Truck,      color: "green" },
    { label: "Clientes",      value: "128",        change: "+5",   icon: Users,      color: "purple" },
  ];

  const colorMap: Record<string, string> = {
    gold:   "from-amber-500   to-yellow-400",
    blue:   "from-blue-600    to-cyan-400",
    green:  "from-emerald-600 to-teal-400",
    purple: "from-purple-600  to-violet-400",
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brown-dark">Boa tarde! 👋</h1>
          <p className="mt-1 text-muted-foreground">Aqui está o resumo de hoje da sua loja.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Buscar..." className="rounded-2xl border border-cream bg-white pl-10 pr-4 py-2.5 text-sm focus:border-gold focus:outline-none" />
          </div>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-cream bg-white hover:bg-cream transition-colors">
            <Bell className="h-5 w-5 text-brown-dark" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-black text-white">3</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-cream/50">
            <div className="flex items-start justify-between">
              <div className={`rounded-2xl bg-gradient-to-br p-3 ${colorMap[s.color]}`}>
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                <TrendingUp className="h-3 w-3" />
                {s.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-black text-brown-dark">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-3xl bg-white shadow-sm border border-cream/50 overflow-hidden">
        <div className="flex items-center justify-between border-b border-cream/40 px-6 py-5">
          <h2 className="text-lg font-bold text-brown-dark">Pedidos Recentes</h2>
          <button className="flex items-center gap-1 text-sm font-bold text-gold hover:underline">
            Ver todos <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="divide-y divide-zinc-50">
          {mockOrders.slice(0, 4).map((o) => (
            <div key={o.id} className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50/50 transition-colors">
              <Avatar initials={o.avatar} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brown-dark truncate">{o.customer}</p>
                <p className="text-xs text-muted-foreground truncate">{o.items}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-brown-dark">R$ {o.total.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{o.time}</p>
              </div>
              <StatusBadge status={o.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-3xl bg-white shadow-sm border border-cream/50 overflow-hidden">
        <div className="border-b border-cream/40 px-6 py-5">
          <h2 className="text-lg font-bold text-brown-dark">Mais Vendidos</h2>
        </div>
        <div className="divide-y divide-zinc-50">
          {mockProducts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-4">
              <span className="w-5 text-center text-sm font-black text-gold">#{i + 1}</span>
              <div className="flex-1">
                <p className="font-bold text-brown-dark">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <p className="font-bold text-brown-dark">R$ {p.price.toFixed(2)}</p>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersView() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "pending", "preparing", "delivering", "completed"];
  const filtered = filter === "all" ? mockOrders : mockOrders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-brown-dark">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie e acompanhe todos os pedidos da loja.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              filter === f ? "bg-brown-dark text-white shadow-md" : "bg-white border border-cream text-muted-foreground hover:bg-cream/40"
            }`}>
            {f === "all" ? "Todos" : statusConfig[f]?.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-white shadow-sm border border-cream/50 overflow-hidden">
        <div className="divide-y divide-zinc-50">
          {filtered.map(o => (
            <div key={o.id} className="flex items-center gap-4 px-6 py-5 hover:bg-zinc-50/50 transition-colors">
              <Avatar initials={o.avatar} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-bold text-brown-dark">{o.customer}</p>
                  <span className="text-xs font-mono text-muted-foreground">{o.id}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">{o.items}</p>
              </div>
              <p className="text-xs text-muted-foreground shrink-0">{o.time}</p>
              <p className="w-24 text-right font-bold text-brown-dark shrink-0">R$ {o.total.toFixed(2)}</p>
              <StatusBadge status={o.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brown-dark">Produtos</h1>
          <p className="text-muted-foreground">Catálogo e estoque da sua loja.</p>
        </div>
        <button className="rounded-2xl bg-gold px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-gold/20 hover:bg-gold/90 transition-all">
          + Novo Produto
        </button>
      </div>

      <div className="rounded-3xl bg-white shadow-sm border border-cream/50 overflow-hidden">
        <div className="divide-y divide-zinc-50">
          {mockProducts.map(p => (
            <div key={p.id} className="flex items-center gap-5 px-6 py-5 hover:bg-zinc-50/50 transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream">
                <span className="text-2xl">🍿</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brown-dark">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <div className="text-center shrink-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Estoque</p>
                <p className={`font-bold ${p.stock === 0 ? "text-red-600" : p.stock <= 5 ? "text-amber-600" : "text-brown-dark"}`}>
                  {p.stock} un.
                </p>
              </div>
              <p className="w-24 text-right font-bold text-brown-dark shrink-0">R$ {p.price.toFixed(2)}</p>
              <StatusBadge status={p.status} />
              <button className="text-xs font-bold text-gold hover:underline shrink-0">Editar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomersView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-brown-dark">Clientes</h1>
        <p className="text-muted-foreground">Histórico e fidelidade dos seus clientes.</p>
      </div>

      <div className="rounded-3xl bg-white shadow-sm border border-cream/50 overflow-hidden">
        <div className="divide-y divide-zinc-50">
          {mockCustomers.map(c => (
            <div key={c.id} className="flex items-center gap-4 px-6 py-5 hover:bg-zinc-50/50 transition-colors">
              <Avatar initials={c.avatar} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brown-dark">{c.name}</p>
                <p className="text-xs text-muted-foreground">Último pedido: {c.lastOrder}</p>
              </div>
              <div className="text-center shrink-0">
                <p className="text-xs text-muted-foreground">Pedidos</p>
                <p className="font-bold text-brown-dark">{c.orders}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">Gasto Total</p>
                <p className="font-bold text-gold">R$ {c.spent.toFixed(2)}</p>
              </div>
              <div className="flex shrink-0">
                {[...Array(Math.min(c.orders, 5))].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  const { storeName, logoUrl, setStoreName, setLogoUrl } = useStore();
  const [tempName, setTempName] = useState(storeName);
  const [tempLogo, setTempLogo] = useState(logoUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStoreName(tempName);
    setLogoUrl(tempLogo);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-brown-dark">Configurações</h1>
        <p className="text-muted-foreground">Personalize as informações da sua loja.</p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-cream/50">
        <h2 className="mb-6 font-bold text-brown-dark">Identidade da Loja</h2>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nome da Loja</label>
            <input required value={tempName} onChange={e => setTempName(e.target.value)}
              className="w-full rounded-2xl border border-cream px-5 py-4 text-brown-dark focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
              placeholder="Ex: Flor e Açúcar" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">URL da Logo (Opcional)</label>
            <div className="flex gap-3">
              <input value={tempLogo} onChange={e => setTempLogo(e.target.value)}
                className="flex-1 rounded-2xl border border-cream px-5 py-4 text-brown-dark focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                placeholder="https://..." />
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cream bg-zinc-50 overflow-hidden">
                {tempLogo ? (
                  <img src={tempLogo} alt="Preview" className="h-full w-full object-contain" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-zinc-300" />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">Se vazio, exibe o ícone de pipoca padrão.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gold py-4 font-bold text-white shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 active:scale-95 disabled:opacity-50">
              {isSaving ? <RotateCcw className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              {saved ? "Salvo! ✓" : isSaving ? "Salvando..." : "Salvar Alterações"}
            </button>
            <button type="button" onClick={() => { setTempName(storeName); setTempLogo(logoUrl); }}
              className="rounded-2xl border border-cream bg-white px-6 font-bold text-brown-dark hover:bg-zinc-50 transition-all">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
        <p className="text-sm text-brown-dark/70">
          <strong className="text-gold">Dica:</strong> O nome e a logo são exibidos na barra de navegação, no rodapé e nos resumos do WhatsApp enviados automaticamente.
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<View>("dashboard");

  const views: Record<View, React.ReactNode> = {
    dashboard: <DashboardView />,
    orders:    <OrdersView />,
    kds:       <KDSView />,
    products:  <ProductsView />,
    customers: <CustomersView />,
    settings:  <SettingsView />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto p-8">
        {views[activeView]}
      </main>
    </div>
  );
}
