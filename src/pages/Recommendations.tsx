import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, TrendingUp, Package, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { products, getRecommendedProducts } from '@/data/products';
import { Button } from '@/components/ui/button';

const recommendationTypes = [
  {
    id: 'for-you',
    label: 'For You',
    icon: Sparkles,
    description: 'AI-curated picks based on your preferences',
    products: getRecommendedProducts(),
  },
  {
    id: 'trending',
    label: 'Trending Now',
    icon: TrendingUp,
    description: 'What everyone is loving this week',
    products: products.filter((p) => p.trending),
  },
  {
    id: 'new',
    label: 'New Arrivals',
    icon: Package,
    description: 'Fresh additions to our collection',
    products: products.filter((p) => p.newArrival),
  },
  {
    id: 'top-rated',
    label: 'Top Rated',
    icon: Star,
    description: 'Highest rated by our community',
    products: [...products].sort((a, b) => b.rating - a.rating).slice(0, 4),
  },
];

const Recommendations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by AI</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Your Personalized
              <br />
              <span className="text-gradient">Recommendations</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our AI analyzes your browsing history, preferences, and trending data
              to surface products you'll love.
            </p>
          </motion.div>

          {/* AI Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { label: 'Accuracy Rate', value: '98%' },
              { label: 'Products Analyzed', value: '50K+' },
              { label: 'Your Saved Time', value: '5 hrs' },
              { label: 'Match Score', value: '94%' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-card border border-border/50"
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Recommendation Sections */}
          {recommendationTypes.map((section, sectionIndex) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
              className="mb-16"
            >
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <section.icon className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-2xl font-bold">{section.label}</h2>
                  </div>
                  <p className="text-muted-foreground">{section.description}</p>
                </div>
                <Link
                  to={`/products?filter=${section.id}`}
                  className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.products.slice(0, 4).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </motion.section>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-16 p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">
              Want Better Recommendations?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Sign up to unlock the full power of our AI recommendation engine.
            </p>
            <Link to="/signup">
              <Button size="lg" className="btn-premium gap-2">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommendations;
