import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  MessageSquare, 
  Search, 
  Bell, 
  Mic,
  Image,
  LineChart
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Recommendations',
    description: 'Hybrid ML models combining collaborative and content-based filtering for 98% accuracy.',
    color: 'from-primary to-accent',
  },
  {
    icon: TrendingUp,
    title: 'Price Intelligence',
    description: 'Predict optimal purchase timing and get alerts when prices drop on your wishlist.',
    color: 'from-success to-emerald-400',
  },
  {
    icon: MessageSquare,
    title: 'Sentiment Analysis',
    description: 'NLP-powered review analysis with fake detection and summarization.',
    color: 'from-warning to-amber-400',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Natural language search that understands context and user intent.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Mic,
    title: 'Voice Shopping',
    description: 'Hands-free shopping experience with voice commands and search.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Image,
    title: 'Visual Search',
    description: 'Upload images to find similar products instantly using computer vision.',
    color: 'from-rose-500 to-orange-400',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Personalized notifications for deals, restocks, and price drops.',
    color: 'from-indigo-500 to-violet-400',
  },
  {
    icon: LineChart,
    title: 'Analytics Dashboard',
    description: 'Deep insights into your shopping patterns and savings.',
    color: 'from-teal-500 to-green-400',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the most advanced e-commerce technology, designed to make
            your shopping smarter, faster, and more personalized.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
