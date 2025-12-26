import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  UtensilsCrossed, 
  QrCode, 
  ChefHat, 
  LayoutDashboard,
  ArrowRight,
  Smartphone,
  Users,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'QR Digital Menu',
    description: 'Scannable menus for every table with real-time ordering',
  },
  {
    icon: ChefHat,
    title: 'Kitchen Display',
    description: 'Real-time KDS with station routing and order timers',
  },
  {
    icon: Smartphone,
    title: 'Mobile POS',
    description: 'Touch-optimized checkout with GST invoicing',
  },
  {
    icon: Users,
    title: 'Multi-Role Access',
    description: 'Owner, manager, chef, waiter, and cashier roles',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <UtensilsCrossed className="w-4 h-4" />
              Restaurant Management Platform
            </div>
            
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground tracking-tight animate-fade-up">
              Resto<span className="text-primary">+</span>
            </h1>
            
            <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up">
              Complete digital dining solution with QR ordering, kitchen display, POS billing, and delivery management.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 animate-fade-up">
              <Button size="xl" asChild>
                <Link to="/menu">
                  View Demo Menu
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover-lift">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section className="container py-16 border-t border-border">
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/menu" className="group">
            <Card className="h-full hover-lift border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <QrCode className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">Public Menu</h3>
                  <p className="text-sm text-muted-foreground">Customer ordering interface</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard" className="group">
            <Card className="h-full hover-lift border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Staff management portal</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/kds" className="group">
            <Card className="h-full hover-lift border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-success flex items-center justify-center">
                  <ChefHat className="w-7 h-7 text-success-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">Kitchen Display</h3>
                  <p className="text-sm text-muted-foreground">Real-time order management</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
          Built by{" "}
          <a 
            href="https://csmajors.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary font-semibold hover:underline transition-all duration-200"
          >
            csmajors.tech

          </a>
          {" "}— Modern Restaurant Management System
        </p>
        </div>
      </footer>
    </div>
  );
}
