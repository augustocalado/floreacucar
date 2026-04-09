export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price_base: number;
  image_url: string;
  category_id: string;
  options?: ProductOption[];
};

export type ProductOption = {
  id: string;
  name: string;
  price_extra: number;
  type: 'size' | 'topping' | 'extra';
};

export const categories: Category[] = [
  { id: '1', name: 'Doces', slug: 'doces' },
  { id: '2', name: 'Salgadas', slug: 'salgadas' },
  { id: '3', name: 'Premium', slug: 'premium' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Flor e Açúcar Ninho com Nutella',
    description: 'Nossa campeã de vendas. Pipoca caramelizada coberta com leite Ninho e muita Nutella autêntica.',
    price_base: 22.90,
    image_url: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=800&auto=format&fit=crop',
    category_id: '1',
    options: [
      { id: 's1', name: 'Pequena (300g)', price_extra: 0, type: 'size' },
      { id: 's2', name: 'Média (500g)', price_extra: 10, type: 'size' },
      { id: 's3', name: 'Família (1kg)', price_extra: 25, type: 'size' },
      { id: 't1', name: 'Extra Nutella', price_extra: 5, type: 'topping' },
      { id: 't2', name: 'Leito em Pó Extra', price_extra: 3, type: 'topping' },
    ]
  },
  {
    id: 'p2',
    name: 'Caramelo Salgado & Flor de Sal',
    description: 'Equilíbrio perfeito entre o doce intenso do caramelo artesanal e o toque sofisticado da flor de sal.',
    price_base: 18.90,
    image_url: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=800&auto=format&fit=crop',
    category_id: '1',
    options: [
      { id: 's4', name: 'Pequena (300g)', price_extra: 0, type: 'size' },
      { id: 's5', name: 'Média (500g)', price_extra: 8, type: 'size' },
    ]
  },
  {
    id: 'p3',
    name: 'Parmesão Trufado',
    description: 'Para os paladares exigentes. Pipoca salgada com parmesão maturado e azeite de trufas negras.',
    price_base: 25.90,
    image_url: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=800&auto=format&fit=crop',
    category_id: '2',
    options: [
      { id: 's6', name: 'Pequena (300g)', price_extra: 0, type: 'size' },
      { id: 's7', name: 'Média (500g)', price_extra: 12, type: 'size' },
    ]
  },
  {
    id: 'p4',
    name: 'Red Velvet Gourmet',
    description: 'Inspirada no clássico bolo. Pipoca vermelha aveludada com cobertura de chocolate branco premium.',
    price_base: 24.90,
    image_url: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?q=80&w=800&auto=format&fit=crop',
    category_id: '3',
  }
];
