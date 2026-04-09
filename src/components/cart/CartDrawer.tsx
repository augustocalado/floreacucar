"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { items, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white p-6 shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-gold" />
                  <h2 className="font-serif text-xl font-bold text-brown-dark">Seu Pedido</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-2 hover:bg-cream"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-cream p-6">
                      <ShoppingBag className="h-12 w-12 text-brown/40" />
                    </div>
                    <p className="text-muted-foreground">Opa! Seu carrinho ainda está vazio.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm font-bold text-gold underline"
                    >
                      Voltar ao cardápio
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {items.map((item) => (
                      <li key={item.cartId} className="flex gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-xl border">
                          <Image
                            src={item.product.image_url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h4 className="font-bold text-brown-dark">{item.product.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-muted-foreground hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Tam: {item.selectedOptions.find(o => o.type === 'size')?.name || 'Base'}
                            {item.selectedOptions.some(o => o.type === 'topping') && (
                              <> • + {item.selectedOptions.filter(o => o.type === 'topping').length} Adicionais</>
                            )}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm">Qtd: {item.quantity}</span>
                            <span className="font-bold text-gold">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(item.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Subtotal</span>
                    <span className="text-gold">{formattedTotal}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Taxa de entrega calculada no checkout.
                  </p>
                  <Link 
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 flex w-full items-center justify-center rounded-2xl bg-gold py-4 font-bold text-white shadow-lg shadow-gold/20 hover:bg-gold/90 transition-all hover:scale-[1.02]"
                  >
                    Finalizar Pedido
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
