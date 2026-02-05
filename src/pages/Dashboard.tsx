import { motion } from 'framer-motion';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  TrendingUp,
  Sparkles,
  Package,
  CreditCard,
  Bell,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const spendingData = [
  { month: 'Jan', amount: 120 },
  { month: 'Feb', amount: 250 },
  { month: 'Mar', amount: 180 },
  { month: 'Apr', amount: 420 },
  { month: 'May', amount: 310 },
  { month: 'Jun', amount: 280 },
];

const menuItems = [
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: ShoppingBag, label: 'Orders', href: '/dashboard/orders' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

const Dashboard = () => {
  const recentOrders = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="card-premium p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                  <div>
                    <h3 className="font-display font-bold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Premium Member</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                  <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 transition-colors text-destructive w-full">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Welcome */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-1">
                    Welcome back, John!
                  </h1>
                  <p className="text-muted-foreground">
                    Here's what's happening with your shopping
                  </p>
                </div>
                <Link to="/products">
                  <Button className="btn-premium gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Shop Now
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Package, label: 'Total Orders', value: '24', change: '+3 this month' },
                  { icon: Heart, label: 'Wishlist Items', value: '12', change: '2 on sale' },
                  { icon: TrendingUp, label: 'Savings', value: '$342', change: 'This year' },
                  { icon: Sparkles, label: 'AI Match Score', value: '94%', change: 'Very High' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-premium p-5"
                  >
                    <stat.icon className="w-6 h-6 text-primary mb-3" />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xs text-success mt-1">{stat.change}</p>
                  </motion.div>
                ))}
              </div>

              {/* Spending Chart */}
              <div className="card-premium p-6">
                <h3 className="font-display font-semibold mb-6">Spending Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={spendingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.75rem',
                        }}
                        formatter={(value) => [`$${value}`, 'Spent']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold">Recent Orders</h3>
                  <Link to="/dashboard/orders" className="text-primary text-sm font-medium hover:underline">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentOrders.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="card-premium p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="font-display font-semibold">AI Insights</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-card">
                    <p className="text-sm text-muted-foreground mb-1">Best Time to Buy</p>
                    <p className="font-semibold">Next Tuesday</p>
                    <p className="text-xs text-success">Expected 15% price drop</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card">
                    <p className="text-sm text-muted-foreground mb-1">Top Category</p>
                    <p className="font-semibold">Electronics</p>
                    <p className="text-xs text-muted-foreground">68% of your orders</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card">
                    <p className="text-sm text-muted-foreground mb-1">Price Alerts</p>
                    <p className="font-semibold">3 Items</p>
                    <p className="text-xs text-warning">On your wishlist dropped</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
