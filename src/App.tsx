import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightning, 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck,
  UserCheck,
  Wine,
  Calendar as CalendarIcon,
  MusicNote,
  Coffee,
  Atom,
  Rocket,
  Fire,
  Sparkle,
  Crown
} from '@phosphor-icons/react';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { MenuCard } from './components/MenuCard';
import { ServiceCard } from './components/ServiceCard';
import { CartDrawer } from './components/CartDrawer';
import { BookingDialog } from './components/BookingDialog';
import { SimpleAdminDashboard } from './components/SimpleAdminDashboard';
import { MobileNavigation } from './components/MobileNavigation';
import { EventsSection } from './components/EventsSection';
import { PayButton } from './components/PayButton';
import { RealTimeChat } from './components/RealTimeChat';
// import { AdvancedBookingSystem } from './components/AdvancedBookingSystem';
import { OwnerBackendSystem } from './components/OwnerBackendSystem';

import { useLanguageStore, translations } from './lib/translations';
import { fullMenu, services } from './data/content';
import { Service } from './types';
import { detectUserType } from './lib/pricing';
import { useIsMobile } from './hooks/use-mobile';

function App() {
  const { currentLanguage } = useLanguageStore();
  const t = translations[currentLanguage?.code || 'en'];
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [coffeeEnergy, setCoffeeEnergy] = useState(0);
  const isMobile = useIsMobile();
  
  const isGringo = detectUserType(currentLanguage?.code || 'en');

  // Coffee energy animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCoffeeEnergy(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setBookingDialogOpen(true);
  };

  const closeBookingDialog = () => {
    setBookingDialogOpen(false);
    setSelectedService(null);
  };

  const nuclearVariants = {
    initial: { scale: 0.8, opacity: 0, rotateY: -180 },
    animate: { scale: 1, opacity: 1, rotateY: 0 },
    exit: { scale: 0.8, opacity: 0, rotateY: 180 }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className={`min-h-screen bg-background power-pattern ${isMobile ? 'pb-20' : ''}`}>
      {/* PREMIUM NAVIGATION BAR */}
      <nav className="border-b-2 border-nuclear-blue bg-card/80 backdrop-blur-xl sticky top-0 z-50 nuclear-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-nuclear-blue to-electric-cyan rounded-full flex items-center justify-center nuclear-glow"
                  animate={pulseVariants.animate}
                >
                  <Lightning size={32} className="text-primary-foreground" weight="fill" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-black nuclear-text">🇨🇴 GATO BLANCO 🇨🇴</h1>
                  <p className="text-sm text-electric-cyan font-medium">
                    {currentLanguage?.code === 'es' ? 'CAFÉ COLOMBIANO PREMIUM' : 'PREMIUM COLOMBIAN COFFEE'}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 sm:gap-4"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {/* Coffee Meter */}
              <div className="hidden sm:flex items-center gap-2 bg-card/50 rounded-lg px-3 py-1 nuclear-border">
                <Coffee size={16} className="text-nuclear-blue" />
                <div className="w-16 h-2 bg-deep-space rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-nuclear-blue to-electric-cyan"
                    style={{ width: `${coffeeEnergy}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <span className="text-xs text-electric-cyan font-mono">{coffeeEnergy}%</span>
              </div>
              
              {isGringo && (
                <Badge className="bg-plasma-blue/20 text-plasma-blue border-plasma-blue nuclear-glow hidden sm:flex">
                  <Crown size={14} className="mr-1" />
                  {currentLanguage?.code === 'es' ? 'VISITANTE VIP PREMIUM' : 'VIP PREMIUM VISITOR'}
                </Badge>
              )}
              <LanguageSwitcher />
              {!isMobile && <CartDrawer />}
                <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="gap-2 nuclear-button"
              >
                <UserCheck size={16} />
                <span className="hidden sm:inline">
                  {isAdminMode 
                    ? (currentLanguage?.code === 'es' ? 'SALIR ADMIN' : 'EXIT ADMIN')
                    : (currentLanguage?.code === 'es' ? '🚀 ADMIN' : '🚀 ADMIN')
                  }
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {isAdminMode ? (
          <motion.div
            initial={nuclearVariants.initial}
            animate={nuclearVariants.animate}
            exit={nuclearVariants.exit}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <SimpleAdminDashboard />
            </div>
          </motion.div>
        ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
          {!isMobile && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid nuclear-border bg-card/50 backdrop-blur-sm">
                <TabsTrigger value="home" className="text-xs sm:text-sm nuclear-button">🏠 {t.nav.home}</TabsTrigger>
                <TabsTrigger value="menu" className="text-xs sm:text-sm nuclear-button">☕ {t.nav.menu}</TabsTrigger>
                <TabsTrigger value="drinks" className="text-xs sm:text-sm nuclear-button">🍹 {t.nav.drinks}</TabsTrigger>
                <TabsTrigger value="services" className="text-xs sm:text-sm nuclear-button">⚡ {t.nav.services}</TabsTrigger>
                <TabsTrigger value="events" className="text-xs sm:text-sm nuclear-button">🎉 {t.nav.events}</TabsTrigger>
                <TabsTrigger value="about" className="text-xs sm:text-sm nuclear-button">ℹ️ {t.nav.about}</TabsTrigger>
                <TabsTrigger value="owner" className="text-xs sm:text-sm nuclear-button">🚀 {isGringo ? 'Owner' : 'Dueño'}</TabsTrigger>
              </TabsList>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <TabsContent value="home" className="space-y-12">
              <motion.section 
                className="text-center space-y-8 py-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6">
                  <motion.h1 
                    className="text-5xl sm:text-8xl font-black nuclear-text"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 40px rgba(59, 130, 246, 0.8)",
                        "0 0 20px rgba(59, 130, 246, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {currentLanguage?.code === 'es' 
                      ? '☕ CAFÉ COLOMBIANO PREMIUM ☕'
                      : '☕ PREMIUM COLOMBIAN COFFEE ☕'
                    }
                  </motion.h1>
                  <motion.p 
                    className="text-2xl sm:text-4xl text-electric-cyan font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentLanguage?.code === 'es'
                      ? '🇨🇴 AUTÉNTICA EXPERIENCIA PAISA 🇨🇴'
                      : '🇨🇴 AUTHENTIC PAISA EXPERIENCE 🇨🇴'
                    }
                  </motion.p>
                  <motion.p 
                    className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {currentLanguage?.code === 'es'
                      ? 'Experimenta la auténtica cultura del café colombiano en el corazón de la Zona Rosa, Medellín! Nuestros baristas expertos crean bebidas artesanales con los mejores granos colombianos, ¡trayéndote el verdadero espíritu paisa! 🇨🇴☕'
                      : t.hero.description
                    }
                  </motion.p>
                </div>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Button 
                    size="lg" 
                    className="nuclear-button px-10 py-4 text-xl font-bold"
                    onClick={() => setActiveTab('services')}
                  >
                    <Coffee size={24} className="mr-2" />
                    {currentLanguage?.code === 'es' 
                      ? '🇨🇴 DESCUBRIR SERVICIOS'
                      : '🇨🇴 DISCOVER SERVICES'
                    }
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="nuclear-button px-10 py-4 text-xl gap-3"
                    onClick={() => setActiveTab('events')}
                  >
                    <MusicNote size={24} />
                    {currentLanguage?.code === 'es'
                      ? '🎵 EVENTOS PAISAS'
                      : '🎵 PAISA EVENTS'
                    }
                  </Button>
                  <PayButton amount={20000} />
                </motion.div>
              </motion.section>

              {/* NUCLEAR STATS GRID */}
              <motion.section 
                className="grid grid-cols-1 md:grid-cols-4 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, staggerChildren: 0.1 }}
              >
                {[
                  { icon: Star, value: "⭐ 4.9/5", label: currentLanguage?.code === 'es' ? "CALIFICACIÓN PREMIUM" : "PREMIUM RATING", color: "text-yellow-400" },
                  { icon: Coffee, value: "☕ 1000+", label: currentLanguage?.code === 'es' ? "TAZAS SERVIDAS" : "CUPS SERVED", color: "text-nuclear-blue" },
                  { icon: Lightning, value: "🇨🇴 AUTÉNTICO", label: currentLanguage?.code === 'es' ? "CAFÉ COLOMBIANO" : "COLOMBIAN COFFEE", color: "text-electric-cyan" },
                  { icon: Sparkle, value: "✨ LEGENDARIO", label: currentLanguage?.code === 'es' ? "SABOR PAISA" : "PAISA FLAVOR", color: "text-plasma-blue" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  >
                    <Card className="text-center nuclear-card">
                      <CardHeader>
                        <motion.div
                          animate={pulseVariants.animate}
                          className={`${stat.color} mx-auto`}
                        >
                          <stat.icon size={40} weight="fill" />
                        </motion.div>
                        <CardTitle className="text-3xl nuclear-text">{stat.value}</CardTitle>
                        <CardDescription className="text-electric-cyan font-bold">{stat.label}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.section>
            </TabsContent>
          </AnimatePresence>

          <TabsContent value="menu" className="space-y-8">
            <motion.div 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-black nuclear-text">
                {currentLanguage?.code === 'es' ? '🇨🇴 MENÚ COLOMBIANO 🇨🇴' : '🇨🇴 COLOMBIAN MENU 🇨🇴'}
              </h2>
              <p className="text-xl text-electric-cyan">
                {currentLanguage?.code === 'es' ? 'SABORES AUTÉNTICOS DE COLOMBIA' : 'AUTHENTIC FLAVORS OF COLOMBIA'}
              </p>
            </motion.div>
            
            <Tabs defaultValue="coffee" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 nuclear-border">
                <TabsTrigger value="coffee" className="nuclear-button">
                  ☕ {currentLanguage?.code === 'es' ? 'CAFÉ' : 'COFFEE'}
                </TabsTrigger>
                <TabsTrigger value="food" className="nuclear-button">
                  🍕 {currentLanguage?.code === 'es' ? 'COMIDA' : 'FOOD'}
                </TabsTrigger>
                <TabsTrigger value="pastries" className="nuclear-button">
                  🥐 {currentLanguage?.code === 'es' ? 'PASTELES' : 'PASTRIES'}
                </TabsTrigger>
                <TabsTrigger value="nonalcoholic" className="nuclear-button">
                  🥤 {currentLanguage?.code === 'es' ? 'TODO EL DÍA' : 'ALL DAY'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="coffee" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullMenu.filter(item => item.category === 'coffee').map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="food" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullMenu.filter(item => item.category === 'food').map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="pastries" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullMenu.filter(item => item.category === 'pastry').map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="nonalcoholic" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullMenu.filter(item => ['coffee', 'food', 'pastry'].includes(item.category)).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="drinks" className="space-y-8">
            <motion.div 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-black nuclear-text">
                {currentLanguage?.code === 'es' ? '🍹 CÓCTELES ARTESANALES 🍹' : '🍹 ARTISAN COCKTAILS 🍹'}
              </h2>
              <p className="text-xl text-electric-cyan">
                {currentLanguage?.code === 'es' ? 'BEBIDAS PREMIUM COLOMBIANAS' : 'PREMIUM COLOMBIAN BEVERAGES'}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Badge className="bg-nuclear-blue/20 text-nuclear-blue border-nuclear-blue nuclear-glow">
                  {currentLanguage?.code === 'es' ? '🍹 ESPECIALES HORA FELIZ' : '🍹 HAPPY HOUR SPECIALS'}
                </Badge>
                <Badge className="bg-plasma-blue/20 text-plasma-blue border-plasma-blue nuclear-glow">
                  {currentLanguage?.code === 'es' ? '🌙 SALÓN NOCTURNO' : '🌙 MIDNIGHT LOUNGE'}
                </Badge>
              </div>
            </motion.div>
            
            <Tabs defaultValue="cocktails" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 nuclear-border">
                <TabsTrigger value="cocktails" className="nuclear-button">
                  🍸 {currentLanguage?.code === 'es' ? 'CÓCTELES' : 'COCKTAILS'}
                </TabsTrigger>
                <TabsTrigger value="beer" className="nuclear-button">
                  🍺 {currentLanguage?.code === 'es' ? 'CERVEZA' : 'BEER'}
                </TabsTrigger>
                <TabsTrigger value="spirits" className="nuclear-button">
                  🥃 {currentLanguage?.code === 'es' ? 'LICORES' : 'SPIRITS'}
                </TabsTrigger>
                <TabsTrigger value="wine" className="nuclear-button">
                  🍷 {currentLanguage?.code === 'es' ? 'VINO' : 'WINE'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="cocktails" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullMenu.filter(item => item.category === 'cocktail').map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, rotateZ: -45 }}
                    animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="beer" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullMenu.filter(item => item.category === 'beer').map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, rotateZ: -45 }}
                    animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="spirits" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullMenu.filter(item => item.category === 'liquor').map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, rotateZ: -45 }}
                    animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="wine" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullMenu.filter(item => item.category === 'wine').map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, rotateZ: -45 }}
                    animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="events" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <EventsSection />
            </motion.div>
          </TabsContent>

          <TabsContent value="services" className="space-y-8">
            <motion.div 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-black nuclear-text">
                {currentLanguage?.code === 'es' ? '🇨🇴 SERVICIOS PREMIUM 🇨🇴' : '🇨🇴 PREMIUM SERVICES 🇨🇴'}
              </h2>
              <p className="text-xl text-electric-cyan">
                {currentLanguage?.code === 'es' ? 'EXPERIENCIAS EXCLUSIVAS PARA EXTRANJEROS' : 'EXCLUSIVE EXPERIENCES FOR FOREIGNERS'}
              </p>
              {isGringo && (
                <Badge className="bg-plasma-blue/20 text-plasma-blue border-plasma-blue nuclear-glow text-lg px-6 py-3">
                  <Crown size={20} className="mr-2" />
                  {currentLanguage?.code === 'es' ? '🎯 PRECIOS VIP PREMIUM' : '🎯 VIP PREMIUM PRICING'}
                </Badge>
              )}
            </motion.div>
            
            <Tabs defaultValue="tourism" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 nuclear-border">
                <TabsTrigger value="tourism" className="nuclear-button">
                  🌎 {currentLanguage?.code === 'es' ? 'TURISMO' : 'TOURISM'}
                </TabsTrigger>
                <TabsTrigger value="classes" className="nuclear-button">
                  📚 {currentLanguage?.code === 'es' ? 'CLASES' : 'CLASSES'}
                </TabsTrigger>
                <TabsTrigger value="events" className="nuclear-button">
                  🎉 {currentLanguage?.code === 'es' ? 'EVENTOS' : 'EVENTS'}
                </TabsTrigger>
                <TabsTrigger value="party" className="nuclear-button">
                  🎊 {currentLanguage?.code === 'es' ? 'FIESTA' : 'PARTY'}
                </TabsTrigger>
                <TabsTrigger value="vip" className="nuclear-button">
                  👑 VIP
                </TabsTrigger>
                <TabsTrigger value="nightlife" className="nuclear-button">
                  🌙 {currentLanguage?.code === 'es' ? 'VIDA NOCTURNA' : 'NIGHTLIFE'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tourism" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.filter(service => service.category === 'tourism').map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -100, rotateY: -90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ServiceCard 
                      service={service} 
                      onBook={handleBookService}
                    />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="classes" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.filter(service => service.category === 'classes').map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -100, rotateY: -90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ServiceCard 
                      service={service} 
                      onBook={handleBookService}
                    />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="events" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.filter(service => service.category === 'events').map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -100, rotateY: -90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ServiceCard 
                      service={service} 
                      onBook={handleBookService}
                    />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="party" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.filter(service => service.category === 'party').map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -100, rotateY: -90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ServiceCard 
                      service={service} 
                      onBook={handleBookService}
                    />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="vip" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.filter(service => service.category === 'vip').map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -100, rotateY: -90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ServiceCard 
                      service={service} 
                      onBook={handleBookService}
                    />
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="nightlife" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.filter(service => service.category === 'nightlife').map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -100, rotateY: -90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ServiceCard 
                      service={service} 
                      onBook={handleBookService}
                    />
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="about" className="space-y-8">
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden nuclear-card">
                <div className="h-4 bg-gradient-to-r from-nuclear-blue via-electric-cyan to-plasma-blue"></div>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl sm:text-4xl font-black nuclear-text">
                    {currentLanguage?.code === 'es' ? '☕ REVOLUCIÓN CAFETERA ☕' : '☕ COFFEE REVOLUTION ☕'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {currentLanguage?.code === 'es'
                      ? 'Bienvenido a la experiencia de café colombiano más auténtica en Zona Rosa! 🇨🇴 Nuestro café premium celebra la rica herencia de la cultura cafetera colombiana mientras crea experiencias inolvidables para visitantes de todo el mundo. ¡Combinamos la hospitalidad paisa tradicional con la excelencia del servicio moderno! ☕🎉'
                      : t.about.story
                    }
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    {[
                      { 
                        icon: MapPin, 
                        title: currentLanguage?.code === 'es' ? "UBICACIÓN PRIVILEGIADA" : "PRIME LOCATION", 
                        text: currentLanguage?.code === 'es' ? "Corazón de Zona Rosa, Medellín 🗺️" : "Heart of Zona Rosa, Medellín 🗺️", 
                        color: "text-nuclear-blue" 
                      },
                      { 
                        icon: Clock, 
                        title: currentLanguage?.code === 'es' ? "HORARIOS EXTENDIDOS" : "EXTENDED HOURS", 
                        text: currentLanguage?.code === 'es' ? "Abierto hasta muy tarde ⏰" : "Open until very late ⏰", 
                        color: "text-electric-cyan" 
                      },
                      { 
                        icon: MusicNote, 
                        title: currentLanguage?.code === 'es' ? "VIDA NOCTURNA PAISA" : "PAISA NIGHTLIFE", 
                        text: currentLanguage?.code === 'es' ? "Música en vivo y ambiente auténtico 🎵" : "Live music and authentic atmosphere 🎵", 
                        color: "text-plasma-blue" 
                      },
                      { 
                        icon: CalendarIcon, 
                        title: currentLanguage?.code === 'es' ? "EVENTOS ESPECIALES" : "SPECIAL EVENTS", 
                        text: currentLanguage?.code === 'es' ? "Experiencias culturales diarias 🎉" : "Daily cultural experiences 🎉", 
                        color: "text-nuclear-blue" 
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className={`flex items-center gap-3 ${item.color}`}>
                          <item.icon size={24} weight="fill" />
                          <span className="font-bold">{item.title}</span>
                        </div>
                        <p className="text-muted-foreground font-medium">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Gringo Connection Section - Show to all visitors */}
                  {true && (
                    <motion.div
                      className="mt-8 p-6 bg-gradient-to-r from-plasma-blue/10 to-electric-cyan/10 rounded-lg border border-plasma-blue/20"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-black nuclear-text mb-2">
                          🌍 {currentLanguage?.code === 'es' ? 'LA CONEXIÓN GRINGO' : 'THE GRINGO CONNECTION'} 🌍
                        </h3>
                        <p className="text-lg text-electric-cyan font-medium">
                          {currentLanguage?.code === 'es'
                            ? 'Tu vínculo a la auténtica cultura paisa y comunidad'
                            : 'Your link to authentic Paisa culture and community'
                          }
                        </p>
                      </div>

                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {currentLanguage?.code === 'es'
                            ? 'La Conexión Gringo se asocia con Gato Blanco para ofrecer a expatriados y nómadas digitales espacios de coworking, clases de salsa y español, tours seleccionados y un lugar seguro para conectar. Fundada por Daniel con los dueños Yeri y Dani, fue creada para ayudar a los recién llegados a conocer Medellín como un local.'
                            : 'The Gringo Connection partners with Gato Blanco to provide expats and digital nomads with coworking spaces, salsa and Spanish classes, curated tours, and a safe space to connect. Founded by Daniel with owners Yeri and Dani, it was built to help newcomers experience Medellín like a local.'
                          }
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-nuclear-blue mb-3">
                              ✨ {currentLanguage?.code === 'es' ? 'VENTAJAS EXCLUSIVAS' : 'EXCLUSIVE PERKS'}
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-electric-cyan">💼</span>
                                <span>{currentLanguage?.code === 'es'
                                  ? 'Espacio de coworking con internet de alta velocidad y café incluido'
                                  : 'Coworking space with high-speed internet and coffee included'
                                }</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-electric-cyan">💃</span>
                                <span>{currentLanguage?.code === 'es'
                                  ? 'Clases semanales de salsa y español'
                                  : 'Weekly salsa and Spanish classes'
                                }</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-electric-cyan">🗺️</span>
                                <span>{currentLanguage?.code === 'es'
                                  ? 'Tours seleccionados a Guatapé, fincas cafeteras y lugares locales'
                                  : 'Curated tours to Guatapé, coffee farms and local hotspots'
                                }</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-electric-cyan">🤝</span>
                                <span>{currentLanguage?.code === 'es'
                                  ? 'Eventos de networking para expatriados y emprendedores locales'
                                  : 'Networking events for expats and local entrepreneurs'
                                }</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-plasma-blue mb-3">
                              🎯 {currentLanguage?.code === 'es' ? 'SERVICIOS ESPECIALIZADOS' : 'SPECIALIZED SERVICES'}
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-plasma-blue">🎒</span>
                                <span>{currentLanguage?.code === 'es'
                                  ? 'Tour de Mochileros – Arte callejero, mercados locales y transporte público'
                                  : 'Backpacker Budget Tour – Street art, local markets and public transport'
                                }</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-plasma-blue">💼</span>
                                <span>{currentLanguage?.code === 'es'
                                  ? 'Experiencia Ejecutiva VIP – Chofer privado, cenas exclusivas'
                                  : 'VIP Executive Experience – Private chauffeur, upscale dining'
                                }</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-plasma-blue">💰</span>
                                <span>{currentLanguage?.code === 'es'
                                  ? 'Programa de Afiliados – Gana comisiones refiriendo viajeros'
                                  : 'Affiliate Partner Program – Earn commissions by referring travelers'
                                }</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Owner Dashboard */}
    <TabsContent value="owner" className="space-y-8">
      <OwnerBackendSystem
        isGringo={isGringo}
        currentLanguage={currentLanguage}
      />
    </TabsContent>
        </Tabs>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCartOpen={() => setCartOpen(true)}
      />

      <footer className={`border-t-2 border-nuclear-blue nuclear-glow mt-16 ${isMobile ? 'mb-20' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-electric-cyan font-bold text-lg">
              {currentLanguage?.code === 'es'
                ? '🇨🇴 © 2024 GATO BLANCO - CAFÉ COLOMBIANO AUTÉNTICO 🇨🇴'
                : '🇨🇴 © 2024 GATO BLANCO - AUTHENTIC COLOMBIAN COFFEE 🇨🇴'
              }
            </p>
            <p className="text-nuclear-blue font-medium">
              {currentLanguage?.code === 'es'
                ? '☕ Zona Rosa, Medellín - Café Premium & Servicios para Visitantes ☕'
                : '☕ Zona Rosa, Medellín - Premium Coffee & Visitor Services ☕'
              }
            </p>
            <div className="flex justify-center gap-4 text-plasma-blue">
              <Coffee size={20} />
              <Wine size={20} />
              <MusicNote size={20} />
              <CalendarIcon size={20} />
              <MapPin size={20} />
            </div>
          </motion.div>
        </div>
      </footer>

      <BookingDialog
        service={selectedService}
        open={bookingDialogOpen}
        onClose={closeBookingDialog}
      />
      
      {/* Mobile Cart Drawer */}
      {isMobile && (
        <CartDrawer />
      )}

    {/* Real-time Chat Support */}
    <RealTimeChat
      currentLanguage={currentLanguage}
      isGringo={detectUserType(currentLanguage?.code || 'en')}
    />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;