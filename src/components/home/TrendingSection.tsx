import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTrendingProducts } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';

export const TrendingSection = () => {
  const trendingProducts = getTrendingProducts();

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Hot Right Now</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Trending Products
            </h2>
            <p className="text-muted-foreground">
              Discover what everyone's talking about this week
            </p>
          </div>
          <Link
            to="/products?filter=trending"
            className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
