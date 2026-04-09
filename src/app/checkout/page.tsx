"use client";

import { useCart } from "@/context/CartContext";
import { ArrowLeft, Send, CreditCard, QrCode, Banknote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [isFinishing, setIsFinishing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "pix",
  });

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFinishing(true);

    // Generate WhatsApp Summary
    let summary = `*Novo Pedido - Flor e Açúcar*%0A%0A`;
    summary += `*Cliente:* ${formData.name}%0A`;
    summary += `*Telefone:* ${formData.phone}%0A`;
    summary += `*Endereço:* ${formData.address}%0A`;
    summary += `*Pagamento:* ${formData.paymentMethod.toUpperCase()}%0A%0A`;
    summary += `*Itens:*%0A`;
    
    items.forEach((item) => {
      const options = item.selectedOptions.map(o => o.name).join(", ");
      summary += `- ${item.quantity}x ${item.product.name} (${options})%0A`;
    });
    
    summary += `%0A*Total: ${formattedTotal}*`;

    // WhatsApp Link
    const whatsappNumber = "5511999999999"; // Exemplo
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${summary}`;

    // Simulate flow
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      // clearCart();
      // maybe redirect to a success page
      setIsFinishing(false);
    }, 1000);
  };

  if (items.length === 0 && !isFinishing) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center space-y-4 px-4">
        <h2 className="text-2xl font-bold text-brown-dark">Seu carrinho está vazio!</h2>
        <p className="text-muted-foreground">Adicione alguns sabores deliciosos antes de finalizar.</p>
        <Link href="/" className="rounded-full bg-gold px-8 py-3 font-bold text-white">
          Voltar ao Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-bold text-gold">
        <ArrowLeft className="h-4 w-4" />
        Voltar para o Cardápio
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left: Form */}
        <div className="space-y-10">
          <div>
            <h1 className="font-serif text-4xl font-bold text-brown-dark">Finalizar Pedido</h1>
            <p className="mt-2 text-muted-foreground">Preencha os dados para entrega e pagamento.</p>
          </div>

          <form onSubmit={handleFinish} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brown/60 uppercase tracking-wider">
                  Nome Completo
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-cream bg-white px-5 py-4 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="Como devemos te chamar?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brown/60 uppercase tracking-wider">
                  WhatsApp para contato
                </label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-cream bg-white px-5 py-4 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brown/60 uppercase tracking-wider">
                  Endereço de Entrega
                </label>
                <input
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-cream bg-white px-5 py-4 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="Rua, número, bairro e complemento"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-brown/60 uppercase tracking-wider">
                Forma de Pagamento
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, paymentMethod: 'pix' }))}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                    formData.paymentMethod === 'pix' ? "border-gold bg-gold/5 ring-1 ring-gold" : "border-cream hover:bg-cream/30"
                  }`}
                >
                  <QrCode className="h-6 w-6 text-gold" />
                  <span className="text-xs font-bold">PIX</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, paymentMethod: 'cartao' }))}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                    formData.paymentMethod === 'cartao' ? "border-gold bg-gold/5 ring-1 ring-gold" : "border-cream hover:bg-cream/30"
                  }`}
                >
                  <CreditCard className="h-6 w-6 text-gold" />
                  <span className="text-xs font-bold">CARTÃO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, paymentMethod: 'dinheiro' }))}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                    formData.paymentMethod === 'dinheiro' ? "border-gold bg-gold/5 ring-1 ring-gold" : "border-cream hover:bg-cream/30"
                  }`}
                >
                  <Banknote className="h-6 w-6 text-gold" />
                  <span className="text-xs font-bold">DINHEIRO</span>
                </button>
              </div>
            </div>

            <button
              disabled={isFinishing}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gold py-5 font-bold text-white shadow-xl shadow-gold/20 transition-all hover:bg-gold/90 hover:scale-[1.02] disabled:opacity-50"
            >
              {isFinishing ? "Processando..." : (
                <>
                  Confirmar e Enviar para WhatsApp
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Summary */}
        <div className="rounded-3xl bg-cream/50 p-8 lg:sticky lg:top-24 h-fit">
          <h3 className="font-serif text-2xl font-bold text-brown-dark">Resumo do Pedido</h3>
          
          <div className="mt-8 space-y-6">
            {items.map((item) => (
              <div key={item.cartId} className="flex gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-cream bg-white">
                  <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="font-bold text-brown-dark">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity}x {item.selectedOptions.map(o => o.name).join(", ")}
                  </p>
                  <p className="mt-1 text-sm font-bold text-gold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.totalPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-4 border-t border-brown/10 pt-6">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formattedTotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Entrega</span>
              <span className="text-sm font-bold text-gold uppercase">A combinar</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-brown-dark pt-2">
              <span>Total</span>
              <span className="text-gold">{formattedTotal}</span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-4 text-xs text-muted-foreground border border-cream">
            <p>
              Ao clicar em finalizar, você será redirecionado para o WhatsApp da loja para confirmar os detalhes e combinar o horário da entrega.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
