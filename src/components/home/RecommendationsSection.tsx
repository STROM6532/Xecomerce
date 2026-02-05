import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, getRecommendedProducts } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';

export const RecommendationsSection = () => {
  const recommendedProducts = getRecommendedProducts().slice(0, 4);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI Recommendations</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Recommended For You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes your preferences, browsing history, and trends to suggest
            products you'll love with up to 98% accuracy.
          </p>
        </motion.div>

        {/* Recommendation Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[
            'For You',
            'Based on History',
            'Trending Now',
            'Similar Items',
            'Bought Together',
          ].map((type, index) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                index === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:border-primary/30'
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/recommendations"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Recommendations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
