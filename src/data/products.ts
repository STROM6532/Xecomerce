export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  inStock: boolean;
  aiScore?: number;
  trending?: boolean;
  newArrival?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear audio with our AI-tuned wireless headphones featuring active noise cancellation and 40-hour battery life.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: 4.8,
    reviews: 2847,
    tags: ["wireless", "noise-canceling", "premium"],
    inStock: true,
    aiScore: 95,
    trending: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch Pro",
    description: "Track your health journey with AI-powered insights, GPS, heart rate monitoring, and 7-day battery life.",
    price: 449.99,
    originalPrice: 549.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: 4.9,
    reviews: 5621,
    tags: ["fitness", "smartwatch", "health"],
    inStock: true,
    aiScore: 98,
    trending: true,
    newArrival: true,
  },
  {
    id: "3",
    name: "Minimalist Leather Backpack",
    description: "Handcrafted from premium Italian leather with smart organization features and anti-theft design.",
    price: 189.99,
    originalPrice: 249.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    rating: 4.7,
    reviews: 1893,
    tags: ["leather", "minimalist", "travel"],
    inStock: true,
    aiScore: 87,
  },
  {
    id: "4",
    name: "Organic Skincare Set",
    description: "Complete skincare routine with AI-personalized products made from 100% organic ingredients.",
    price: 129.99,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
    rating: 4.6,
    reviews: 3421,
    tags: ["organic", "skincare", "natural"],
    inStock: true,
    aiScore: 82,
    newArrival: true,
  },
  {
    id: "5",
    name: "Designer Sunglasses",
    description: "Polarized lenses with UV protection in a timeless titanium frame designed by AI aesthetics engine.",
    price: 279.99,
    originalPrice: 350.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    rating: 4.5,
    reviews: 987,
    tags: ["sunglasses", "designer", "polarized"],
    inStock: true,
    aiScore: 79,
    trending: true,
  },
  {
    id: "6",
    name: "Smart Home Speaker",
    description: "AI voice assistant with room-filling sound and seamless smart home integration.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80",
    rating: 4.4,
    reviews: 2156,
    tags: ["smart-home", "speaker", "ai"],
    inStock: true,
    aiScore: 88,
  },
  {
    id: "7",
    name: "Ergonomic Office Chair",
    description: "AI-designed posture support with adaptive lumbar system and premium mesh construction.",
    price: 599.99,
    originalPrice: 799.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80",
    rating: 4.8,
    reviews: 4532,
    tags: ["ergonomic", "office", "comfort"],
    inStock: true,
    aiScore: 94,
  },
  {
    id: "8",
    name: "Premium Coffee Maker",
    description: "Barista-quality coffee at home with AI temperature control and automated brewing profiles.",
    price: 349.99,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    rating: 4.7,
    reviews: 1678,
    tags: ["coffee", "smart", "kitchen"],
    inStock: true,
    aiScore: 86,
    newArrival: true,
  },
];

export const categories = [
  { id: "electronics", name: "Electronics", icon: "💻", count: 156 },
  { id: "fashion", name: "Fashion", icon: "👗", count: 243 },
  { id: "beauty", name: "Beauty", icon: "✨", count: 89 },
  { id: "home", name: "Home & Living", icon: "🏠", count: 127 },
  { id: "kitchen", name: "Kitchen", icon: "🍳", count: 68 },
  { id: "sports", name: "Sports", icon: "⚽", count: 94 },
];

export const getRecommendedProducts = (userId?: string): Product[] => {
  return products.filter(p => p.aiScore && p.aiScore > 85);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(p => p.trending);
};

export const getSimilarProducts = (productId: string): Product[] => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  return products.filter(p => p.category === product.category && p.id !== productId).slice(0, 4);
};
