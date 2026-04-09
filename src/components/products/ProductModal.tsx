"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Product, ProductOption } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<ProductOption | null>(
    product.options?.find((o) => o.type === "size") || null
  );
  const [selectedToppings, setSelectedToppings] = useState<ProductOption[]>([]);

  const toggleTopping = (topping: ProductOption) => {
    setSelectedToppings((prev) =>
      prev.find((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const calculateTotal = () => {
    const sizePrice = selectedSize?.price_extra || 0;
    const toppingsPrice = selectedToppings.reduce((acc, t) => acc + t.price_extra, 0);
    return (product.price_base + sizePrice + toppingsPrice) * quantity;
  };

  const handleAddToCart = () => {
    const options = [...(selectedSize ? [selectedSize] : []), ...selectedToppings];
    addToCart(product, quantity, options);
    onClose();
    // Reset state for next time
    setQuantity(1);
    setSelectedToppings([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] z-[90] mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl md:inset-x-auto md:top-[15%]"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 w-full md:h-auto md:w-2/5">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute left-4 top-4 rounded-full bg-white/80 p-2 text-brown-dark backdrop-blur-sm hover:bg-white md:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="hidden justify-end md:flex">
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-cream"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-2">
                  <h2 className="font-serif text-2xl font-bold text-brown-dark">{product.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
                </div>

                <div className="mt-8 space-y-8">
                  {/* Sizes */}
                  {product.options?.some((o) => o.type === "size") && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-brown/60">
                        Escolha o Tamanho
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {product.options
                          .filter((o) => o.type === "size")
                          .map((size) => (
                            <button
                              key={size.id}
                              onClick={() => setSelectedSize(size)}
                              className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                                selectedSize?.id === size.id
                                  ? "border-gold bg-gold/5 ring-1 ring-gold"
                                  : "border-cream hover:border-gold/30"
                              }`}
                            >
                              <span className="text-sm font-medium">{size.name}</span>
                              {size.price_extra > 0 && (
                                <span className="text-xs text-gold">
                                  + R$ {size.price_extra.toFixed(2)}
                                </span>
                              )}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Toppings */}
                  {product.options?.some((o) => o.type === "topping") && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-brown/60">
                        Adicionais (Opcional)
                      </h4>
                      <div className="space-y-2">
                        {product.options
                          .filter((o) => o.type === "topping")
                          .map((topping) => (
                            <button
                              key={topping.id}
                              onClick={() => toggleTopping(topping)}
                              className="flex w-full items-center justify-between rounded-xl border border-cream p-3 transition-all hover:bg-cream/30"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                                  selectedToppings.find(t => t.id === topping.id)
                                    ? "bg-gold border-gold"
                                    : "border-brown/20 bg-white"
                                }`}>
                                  {selectedToppings.find(t => t.id === topping.id) && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span className="text-sm">{topping.name}</span>
                              </div>
                              <span className="text-xs text-gold font-medium">
                                + R$ {topping.price_extra.toFixed(2)}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between border-t pt-6">
                  <div className="flex items-center gap-4 rounded-2xl border border-cream p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-xl p-2 hover:bg-cream text-brown-dark"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[20px] text-center font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-xl p-2 hover:bg-cream text-brown-dark"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="flex flex-1 items-center justify-center gap-3 ml-6 rounded-2xl bg-gold py-4 font-bold text-white shadow-lg shadow-gold/20 hover:bg-gold/90 transition-all hover:scale-[1.02]"
                  >
                    Adicionar
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(calculateTotal())}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
