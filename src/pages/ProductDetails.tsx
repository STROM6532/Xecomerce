import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  TrendingUp,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  ChevronRight,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { products, getSimilarProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const similarProducts = getSimilarProducts(id || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/products" className="text-primary mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const images = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/30 mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.trending && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-sm font-medium">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
                {/* AI Score */}
                {product.aiScore && (
                  <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">{product.aiScore}% Match</span>
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-warning fill-warning'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-8">{product.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? (
                    <span className="flex items-center gap-1 text-success">
                      <Check className="w-4 h-4" /> In Stock
                    </span>
                  ) : (
                    'Out of Stock'
                  )}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button size="lg" className="btn-premium flex-1 gap-2 py-6">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="p-6">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="p-6">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
                  { icon: Shield, label: '2 Year Warranty', desc: 'Full coverage' },
                  { icon: RotateCcw, label: 'Easy Returns', desc: '30 day policy' },
                ].map((feature) => (
                  <div key={feature.label} className="text-center p-4 rounded-xl bg-secondary/50">
                    <feature.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 gap-8">
                <TabsTrigger 
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4"
                >
                  Reviews ({product.reviews})
                </TabsTrigger>
                <TabsTrigger 
                  value="ai-insights"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Insights
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground">{product.description}</p>
                  <p className="text-muted-foreground mt-4">
                    Experience premium quality with our carefully crafted products. Each item is designed
                    with attention to detail and built to last. Our commitment to excellence ensures
                    you receive only the best.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Reviews coming soon...</p>
                </div>
              </TabsContent>
              <TabsContent value="ai-insights" className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Sentiment Score
                    </h4>
                    <p className="text-3xl font-bold text-primary mb-1">92%</p>
                    <p className="text-sm text-muted-foreground">Positive reviews</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-success/5 border border-success/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      Price Trend
                    </h4>
                    <p className="text-3xl font-bold text-success mb-1">Good Buy</p>
                    <p className="text-sm text-muted-foreground">Price is 15% below average</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-warning/5 border border-warning/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-warning" />
                      Quality Score
                    </h4>
                    <p className="text-3xl font-bold text-warning mb-1">Excellent</p>
                    <p className="text-sm text-muted-foreground">Top 5% in category</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-20"
            >
              <h2 className="font-display text-2xl font-bold mb-8">
                Similar Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
