"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle2, ChevronRight, AlertCircle, Flame, Bell } from "lucide-react";

type OrderStatus = "pending" | "preparing" | "ready";

interface KDSOrder {
  id: string;
  customer: string;
  items: { name: string; qty: number; notes?: string }[];
  status: OrderStatus;
  createdAt: Date;
  priority: boolean;
}

const initialOrders: KDSOrder[] = [
  {
    id: "ORD-7231",
    customer: "Maria Silva",
    items: [
      { name: "Ninho com Nutella", qty: 2, notes: "Tamanho M, sem cobertura extra" },
      { name: "Caramelo Salgado", qty: 1, notes: "Tamanho G" },
    ],
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    priority: false,
  },
  {
    id: "ORD-7230",
    customer: "João Pereira",
    items: [{ name: "Parmesão Trufado", qty: 1, notes: "Tamanho P" }],
    status: "pending",
    createdAt: new Date(Date.now() - 7 * 60 * 1000),
    priority: true,
  },
  {
    id: "ORD-7229",
    customer: "Ana Souza",
    items: [
      { name: "Red Velvet", qty: 2 },
      { name: "Ervas Finas", qty: 1, notes: "Tamanho G, sem pimenta" },
    ],
    status: "preparing",
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
    priority: false,
  },
  {
    id: "ORD-7228",
    customer: "Carlos Lima",
    items: [{ name: "Ninho com Nutella", qty: 3, notes: "Tamanho G, leite em pó extra" }],
    status: "preparing",
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    priority: false,
  },
  {
    id: "ORD-7227",
    customer: "Laura Mota",
    items: [{ name: "Caramelo Salgado", qty: 1 }],
    status: "ready",
    createdAt: new Date(Date.now() - 18 * 60 * 1000),
    priority: false,
  },
];

function useTimer() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);
}

function elapsed(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "< 1 min";
  return `${mins} min`;
}

function elapsedMinutes(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / 60000);
}

interface OrderCardProps {
  order: KDSOrder;
  onAdvance: (id: string) => void;
  onPriority: (id: string) => void;
}

function OrderCard({ order, onAdvance, onPriority }: OrderCardProps) {
  useTimer();
  const mins = elapsedMinutes(order.createdAt);
  const isLate = mins >= 10;
  const isCritical = mins >= 15;

  const advanceLabel: Record<OrderStatus, string | null> = {
    pending: "Iniciar Preparo",
    preparing: "Marcar Pronto",
    ready: null,
  };

  return (
    <div className={`rounded-3xl border-2 bg-white p-5 shadow-sm transition-all ${
      isCritical
        ? "border-red-400 shadow-red-100"
        : isLate
        ? "border-amber-400 shadow-amber-100"
        : order.priority
        ? "border-gold shadow-gold/10"
        : "border-cream/80"
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-muted-foreground">{order.id}</span>
            {order.priority && (
              <span className="flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-gold">
                <Flame className="h-3 w-3" /> Urgente
              </span>
            )}
          </div>
          <h3 className="mt-0.5 font-bold text-brown-dark">{order.customer}</h3>
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
          isCritical
            ? "bg-red-100 text-red-700"
            : isLate
            ? "bg-amber-100 text-amber-700"
            : "bg-zinc-100 text-zinc-600"
        }`}>
          {isCritical && <AlertCircle className="h-3 w-3" />}
          <Clock className="h-3 w-3" />
          {elapsed(order.createdAt)}
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-dashed border-cream" />

      {/* Items */}
      <ul className="space-y-2.5">
        {order.items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-[11px] font-black text-white">
              {item.qty}
            </span>
            <div>
              <p className="font-bold text-brown-dark text-sm">{item.name}</p>
              {item.notes && (
                <p className="text-xs text-muted-foreground mt-0.5">{item.notes}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="mt-5 flex gap-2">
        {advanceLabel[order.status] && (
          <button
            onClick={() => onAdvance(order.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 ${
              order.status === "preparing"
                ? "bg-green-600 shadow-green-200 shadow-md"
                : "bg-gold shadow-gold/20 shadow-md"
            }`}
          >
            {order.status === "preparing" ? (
              <><CheckCircle2 className="h-4 w-4" /> Pronto!</>
            ) : (
              <><ChevronRight className="h-4 w-4" /> {advanceLabel[order.status]}</>
            )}
          </button>
        )}
        {!order.priority && order.status !== "ready" && (
          <button
            onClick={() => onPriority(order.id)}
            title="Marcar como urgente"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cream hover:bg-gold/10 hover:border-gold transition-colors"
          >
            <Flame className="h-4 w-4 text-gold/60 hover:text-gold" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Column ───────────────────────────────────────────────────────────────────
interface ColumnProps {
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
}
function Column({ title, count, color, children }: ColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className={`flex items-center justify-between rounded-2xl px-4 py-3 ${color}`}>
        <h2 className="font-bold text-sm uppercase tracking-widest">{title}</h2>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-xs font-black">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-3 min-h-[200px]">
        {count === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-3xl border-2 border-dashed border-cream py-12 text-sm text-muted-foreground">
            Nenhum pedido
          </div>
        ) : children}
      </div>
    </div>
  );
}

// ─── Main KDS ─────────────────────────────────────────────────────────────────
export function KDSView() {
  const [orders, setOrders] = useState<KDSOrder[]>(initialOrders);
  const [alert, setAlert] = useState<string | null>(null);

  const advance = (id: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== id) return o;
        const next: OrderStatus = o.status === "pending" ? "preparing" : "ready";
        if (next === "ready") setAlert(`✅ Pedido ${id} marcado como pronto!`);
        return { ...o, status: next };
      })
    );
  };

  const markPriority = (id: string) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, priority: true } : o)));
    setAlert(`🔥 Pedido ${id} marcado como urgente!`);
  };

  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(t);
  }, [alert]);

  const pending   = orders.filter(o => o.status === "pending");
  const preparing = orders.filter(o => o.status === "preparing");
  const ready     = orders.filter(o => o.status === "ready");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brown-dark">
            KDS — Cozinha
          </h1>
          <p className="text-muted-foreground">Fluxo de pedidos em tempo real.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-green-50 border border-green-200 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-bold text-green-700">Ao vivo</span>
        </div>
      </div>

      {/* Toast alert */}
      {alert && (
        <div className="flex items-center gap-3 rounded-2xl bg-brown-dark px-5 py-3 text-sm font-bold text-white shadow-xl">
          <Bell className="h-4 w-4 text-gold" />
          {alert}
        </div>
      )}

      {/* Columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Column title="🟡 Pendente" count={pending.length} color="bg-amber-100 text-amber-800">
          {pending.map(o => (
            <OrderCard key={o.id} order={o} onAdvance={advance} onPriority={markPriority} />
          ))}
        </Column>

        <Column title="🔵 Preparando" count={preparing.length} color="bg-blue-100 text-blue-800">
          {preparing.map(o => (
            <OrderCard key={o.id} order={o} onAdvance={advance} onPriority={markPriority} />
          ))}
        </Column>

        <Column title="✅ Pronto" count={ready.length} color="bg-green-100 text-green-800">
          {ready.map(o => (
            <OrderCard key={o.id} order={o} onAdvance={advance} onPriority={markPriority} />
          ))}
        </Column>
      </div>
    </div>
  );
}
