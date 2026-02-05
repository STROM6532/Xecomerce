import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Sparkles, TrendingUp } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="card-premium overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-secondary/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.trending && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
              )}
              {product.newArrival && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success text-success-foreground text-xs font-medium">
                  New
                </span>
              )}
              {discount > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                  -{discount}%
                </span>
              )}
            </div>

            {/* AI Score */}
            {product.aiScore && (
              <div className="absolute top-3 right-3">
                <div className="glass px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium">{product.aiScore}%</span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Add to wishlist
                }}
              >
                <Heart className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium flex items-center gap-2 px-4 py-2 text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                Add
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.category}
            </span>
            <h3 className="font-display font-semibold mt-1 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'text-warning fill-warning'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
