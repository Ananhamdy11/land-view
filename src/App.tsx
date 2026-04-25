import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Building,
  Home,
  Shovel,
  Key,
  Trophy,
  Users,
  CheckCircle,
  Star,
  Phone,
  MessageCircle,
  Facebook,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  Check,
  Award,
  Plus,
  ArrowLeft,
  Briefcase
} from 'lucide-react';

// --- Utility Components ---

const SectionTitle = ({ title, subtitle, light = true }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="text-center mb-16 px-4">
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-sm font-bold tracking-widest uppercase mb-3 block text-brand-primary"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-2xl md:text-4xl font-black mb-4 ${light ? 'text-white' : 'text-brand-dark'}`}
    >
      {title}
    </motion.h2>
    <div className="flex items-center justify-center gap-2">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="h-1 w-16 accent-gradient rounded-full"
      />
      <div className="w-2 h-2 rounded-full bg-brand-primary" />
    </div>
  </div>
);

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = totalMiliseconds / end;

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'الرئيسية', href: '#' },
    { title: 'من نحن', href: '#about' },
    { title: 'خدماتنا', href: '#services' },
    { title: 'لماذا تختارنا', href: '#why' },
    { title: 'أرقامنا', href: '#stats' },
    { title: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-primary/30" dir="rtl">

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="geometric-bg top-[-10%] left-[-10%] opacity-50" />
        <div className="geometric-bg bottom-[-10%] right-[-10%] rotate-180 opacity-30" />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl ${scrolled ? 'glass py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Logo" width={50} height={50} className=" rounded-full" />
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-xl md:text-2xl text-white">
                لاند فيو <span className="text-brand-primary">للتطوير</span>
              </span>
              <div className="line-accent w-full" />
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-sm font-bold text-white/70 hover:text-brand-primary transition-all relative group"
              >
                {link.title}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="https://wa.me/201101146460"
              target="_blank"
              className="accent-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-brand-primary/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <MessageCircle size={18} />
              تواصل الآن
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white glass p-2 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col p-8 pt-24"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-black border-b border-brand-neutral/30 pb-2 hover:text-brand-primary"
                  >
                    {link.title}
                  </a>
                ))}
                <a
                  href="https://wa.me/201101146460"
                  target="_blank"
                  className="bg-brand-primary text-white w-full py-4 rounded-xl text-center font-black text-xl flex items-center justify-center gap-3"
                >
                  <MessageCircle size={24} />
                  تواصل معنا عبر واتساب
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-8 glass p-10 md:p-16 rounded-[40px] relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-primary opacity-10 rounded-full blur-[100px]" />

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl md:text-5xl font-black leading-[1.1] mb-8 text-white">
                  إمتلك شقتك بقلب <br />
                  <span className="text-brand-primary font-arabic">التجمع الخامس</span>
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-brand-neutral font-medium mb-12 max-w-2xl leading-relaxed opacity-80"
              >
                استمتع بالرفاهية والرقي في أرقى المناطق السكنية. وحدات مصممة بمعايير عالمية تناسب تطلعاتك لمستقبل أفضل مع لانـد فيـو.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 mb-12"
              >
                <button className="accent-gradient hover:opacity-90 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-3">
                  اكتشف المشروعات
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={() => {
                    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
                  }}
                  className="glass hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 border border-white/10">
                  تواصل معنا
                </button>
              </motion.div>

              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-2xl font-black text-brand-primary flex items-center">
                    <Plus size={20} className="text-white/50" />
                    <Counter value={200} />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">عميل سعيد</div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-2xl font-black text-brand-primary flex items-center">
                    <Plus size={20} className="text-white/50" />
                    <Counter value={50} />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">مشروع مكتمل</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="glass p-8 rounded-[35px] flex-1 group hover:border-brand-primary/30 transition-all"
              >
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-brand-primary rounded-full" />
                  خدماتنا المتميزة
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "تطوير عقاري", sub: "بناء فائق الجودة", icon: "🏗️" },
                    { title: "تصميم حصرى", sub: "إبداع في المساحات", icon: "📐" },
                    { title: "تشطيب فاخر", sub: "خامات عالمية", icon: "💎" }
                  ].map((s, i) => (
                    <li key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-brand-deep flex items-center justify-center text-xl">{s.icon}</div>
                      <div>
                        <p className="text-sm font-black">{s.title}</p>
                        <p className="text-[10px] opacity-60">{s.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="accent-gradient p-8 rounded-[35px] flex flex-col justify-between"
              >
                <div className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white/80">لماذا لاند فيو؟</div>
                <div className="space-y-3">
                  <p className="text-sm font-bold flex items-center gap-2 text-white"><Check size={16} /> خبرة أكثر من 5 سنوات</p>
                  <p className="text-sm font-bold flex items-center gap-2 text-white"><Check size={16} /> تسليم في الموعد المحدد</p>
                  <p className="text-sm font-bold flex items-center gap-2 text-white"><Check size={16} /> تسهيلات سداد مرنة</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Content Part */}
          <div className="flex flex-col">
            <SectionTitle title="من نحن" subtitle="تعرف علينا" />
            <div className="space-y-6">
              <p className="text-xl font-bold leading-relaxed text-white/90">
                لانـد فيـو للتطويـر العقـاري هي شركة رائدة في مجال الاستثمار العقاري بالتجمع الخامس، نسعى لتقديم حلول سكنية واستثمارية مبتكرة تجمع بين العصرية والرفاهية.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-8 glass rounded-[35px] border border-white/10"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary mb-4 border border-white/10">
                    <Trophy size={28} />
                  </div>
                  <h4 className="text-xl font-black mb-2 text-white">رؤيتنا</h4>
                  <p className="text-sm font-medium leading-relaxed opacity-70">أن نكون الخيار الأول والاسم الموثوق به في عالم العقارات من خلال التزامنا بأعلى معايير النزاهة والجودة.</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-8 glass rounded-[35px] border border-white/10"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-accent mb-4 border border-white/10">
                    <Star size={28} />
                  </div>
                  <h4 className="text-xl font-black mb-2 text-white">رسالتنا</h4>
                  <p className="text-sm font-medium leading-relaxed opacity-70">تقديم وحدات سكنية فاخرة في أرقى مناطق التجمع الخامس بما يحقق طموحات عملائنا في السكن المثالي.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle title="خدماتنا المميزة" subtitle="ماذا نقدم" light />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building size={40} />,
                title: "وحدات سكنية فاخرة",
                desc: "مشروعاتنا تتميز بتصاميم معمارية فريدة وواجهات عصرية تناسب أصحاب الذوق الرفيع بلمسات فنية راقية.",
                color: "accent-gradient"
              },
              {
                icon: <Home size={40} />,
                title: "استشارات عقارية",
                desc: "نقدم لك استشارة احترافية لاختيار أفضل وحدة سكنية تناسب ميزانيتك واحتياجاتك الاستثمارية في القاهرة الجديدة.",
                color: "glass"
              },
              {
                icon: <Shovel size={40} />,
                title: "إدارة وتطوير المشروعات",
                desc: "خبرة واسعة في إدارة وتطوير المشروعات العقارية من مرحلة التخطيط وحتى التسليم بأدق التفاصيل الهندسية.",
                color: "glass"
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className={`group relative h-full p-10 rounded-[40px] border border-white/5 transition-all ${service.color === 'accent-gradient' ? 'accent-gradient shadow-2xl shadow-brand-primary/20' : 'glass hover:border-white/20'}`}
              >
                <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center text-white mb-8 border border-white/10 group-hover:rotate-6 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                <p className={`font-medium leading-relaxed mb-8 ${service.color === 'accent-gradient' ? 'text-white/80' : 'text-brand-neutral'}`}>{service.desc}</p>
                <button className={`flex items-center gap-2 font-black transition-colors ${service.color === 'accent-gradient' ? 'text-brand-dark hover:text-white' : 'text-brand-primary hover:text-brand-accent'}`}>
                  اعرف أكثر
                  <ArrowLeft size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why" className="py-24 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <SectionTitle title="لماذا تختار لاند فيو؟" subtitle="بماذا نتميز" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              {[
                {
                  title: "مواقع استراتيجية",
                  desc: "نختار مواقعنا بعناية لتكون قريبة من المحاور الرئيسية وعلى بعد دقائق من الجامعة الأمريكية والعاصمة الإدارية.",
                  icon: <MapPin />
                },
                {
                  title: "جودة تشطيب عالمية",
                  desc: "نستخدم أفضل مواد البناء والتشطيب لنضمن لك عمرًا مديدًا لوحدتك العقارية وجمالاً لا يبهت بمرور الزمن.",
                  icon: <CheckCircle />
                },
                {
                  title: "أنظمة سداد مرنة",
                  desc: "نوفر أنظمة تقسيط متنوعة تناسب مختلف القدرات المالية مع تسهيلات في السداد تصل لعدة سنوات بدون فوائد.",
                  icon: <Briefcase />
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex gap-6 p-8 rounded-[35px] glass hover:bg-white/10 transition-colors group cursor-default"
                >
                  <div className="shrink-0 w-16 h-16 bg-white/5 border border-white/10 shadow-xl rounded-2xl flex items-center justify-center text-brand-primary transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2 text-white">{item.title}</h4>
                    <p className="text-brand-neutral font-medium leading-relaxed opacity-70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-[60px] p-12 relative overflow-hidden">
                {/* Abstract Visual Representing Quality */}
                <div className="relative aspect-square glass rounded-full shadow-2xl flex items-center justify-center border-dashed border-2 border-brand-primary/30 p-4">
                  <div className="w-full h-full bg-brand-dark rounded-full flex flex-col items-center justify-center text-center p-12 border border-white/5">
                    <Trophy size={80} className="text-brand-primary mb-6 float-anim" />
                    <h3 className="text-white text-3xl font-black leading-tight">نضع معايير جديدة للجودة في التجمع</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-4 border-brand-primary rounded-full opacity-50"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section id="stats" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 accent-gradient opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { label: "عميل سعيد", value: 200, icon: <Users size={32} /> },
              { label: "سنوات خبرة", value: 5, icon: <Trophy size={32} /> },
              { label: "مشروع منجز", value: 50, icon: <CheckCircle size={32} /> },
              { label: "جوائز تقديرية", value: 12, icon: <Award size={32} /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl mb-4 text-brand-primary border border-white/10 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-6xl font-black mb-2 flex items-center justify-center gap-1 text-white">
                  <Counter value={stat.value} />
                </div>
                <p className="text-lg font-bold text-brand-neutral opacity-60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle title="آراء عملائنا" subtitle="ثقتكم وسام لنا" />

          <div className="grid md:grid-cols-3 gap-8 text-white">
            {[
              {
                name: "أحمد علي",
                title: "مستثمر عقاري",
                text: "تجربة رائعة مع لاند فيو، الالتزام بالمواعيد وجودة التشطيب في الوحدات التي استلمتها كانت مذهلة فعلاً وفوق المتوقع.",
                stars: 5
              },
              {
                name: "سارة محمود",
                title: "دكتورة جامعية",
                text: "أفضل استثمار قمت به في التجمع الخامس بفضل ترشيحاتهم الصادقة. فريق العمل محترف جداً ويهتم بمصالح العميل أولاً.",
                stars: 5
              },
              {
                name: "محمد حسن",
                title: "رجل أعمال",
                text: "فريق احترافي جداً وخدمة ما بعد البيع فوق الممتاز. المصداقية هي شعار هذا المكان وأنصح الجميع بالتعامل معهم.",
                stars: 5
              }
            ].map((testi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass p-10 rounded-[40px] shadow-2xl border border-white/5 relative group hover:border-brand-primary/30 transition-all"
              >
                <div className="flex gap-1 mb-6 text-brand-primary">
                  {[...Array(testi.stars)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-white/80 font-medium leading-relaxed italic mb-8 relative z-10">{testi.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 accent-gradient rounded-full flex items-center justify-center text-white font-black border border-white/20">
                    {testi.name[0]}
                  </div>
                  <div>
                    <h5 className="font-black text-white">{testi.name}</h5>
                    <p className="text-xs font-bold text-brand-primary opacity-80">{testi.title}</p>
                  </div>
                </div>
                <div className="absolute top-10 left-10 text-white/5 group-hover:text-brand-primary/10 transition-colors">
                  <MessageCircle size={80} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl font-black mb-8 leading-tight">تواصل معنا اليوم لبدء <span className="text-brand-primary text-gradient">رحلتك العقارية</span></h2>
              <p className="text-brand-neutral text-xl font-bold mb-12 opacity-80">فريقنا متاح دائماً للإجابة على استفساراتكم وتقديم أفضل الحلول المناسبة لكم.</p>

              <div className="space-y-8">
                <div className="flex gap-6 items-center group">
                  <div className="w-14 h-14 accent-gradient rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-primary/20 group-hover:scale-110 transition-transform">
                    <Phone />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">اتصل بنا</p>
                    <p className="text-2xl font-black">01101146460</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center group">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-[#25D366] shadow-xl border border-white/10 group-hover:scale-110 transition-transform">
                    <MessageCircle fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">واتساب</p>
                    <p className="text-2xl font-black">01101146460</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center group">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-[#1877F2] shadow-xl border border-white/10 group-hover:scale-110 transition-transform">
                    <Facebook fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">فيسبوك</p>
                    <a href="https://www.facebook.com/landview.developments" target="_blank" rel="noopener noreferrer" className="text-lg font-black hover:text-brand-primary transition-colors">لاند فيو للتطوير العقاري</a>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex gap-4">
                <a href="https://wa.me/201101146460" className="px-10 py-5 accent-gradient rounded-full font-black text-lg flex items-center gap-3 hover:opacity-90 transition-all shadow-2xl shadow-brand-primary/40">
                  <MessageCircle size={24} />
                  تواصل مباشرة الآن
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-[50px] p-10 md:p-14 border border-white/10 backdrop-blur-2xl"
            >
              <h3 className="text-3xl font-black mb-8 text-white">أرسل لنا رسالة</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 px-2">الاسم بالكامل</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all text-white placeholder:text-white/20" placeholder="أدخل اسمك هنا" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 px-2">رقم الهاتف</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all text-white placeholder:text-white/20" placeholder="01xxxxxxxxx" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 px-2">الرسالة</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-bold outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all text-white placeholder:text-white/20 resize-none" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                </div>
                <button type="button" className="w-full accent-gradient text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-2xl shadow-brand-primary/20 active:scale-95">
                  إرسال الطلب الآن
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-white relative border-t border-white/5 backdrop-blur-2xl">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-16 mb-20">
            <div className="md:col-span-5 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-8 group">
                <div className="w-12 h-12 accent-gradient rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">
                  L
                </div>
                <h4 className="text-3xl font-black">لاند فيو</h4>
              </div>
              <p className="text-brand-neutral font-medium text-lg mb-10 max-w-sm leading-relaxed opacity-70">
                شريكك الموثوق في رحلة البحث عن التميز السكني والاستثمار العقاري الناجح في قلب التجمع الخامس.
              </p>
              <div className="flex gap-4">
                {[Facebook, MessageCircle, Phone].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 glass hover:bg-brand-primary rounded-2xl flex items-center justify-center transition-all border border-white/10 group">
                    <Icon size={24} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <h5 className="text-xl font-black mb-10 flex items-center gap-3">
                <span className="w-1.5 h-6 accent-gradient rounded-full" />
                روابط سريعة
              </h5>
              <ul className="space-y-4 font-bold text-brand-neutral">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center gap-4 group text-sm opacity-70 hover:opacity-100">
                      <div className="w-1 h-1 bg-brand-primary rounded-full" />
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <h5 className="text-xl font-black mb-10 flex items-center gap-3">
                <span className="w-1.5 h-6 accent-gradient rounded-full" />
                آخر مشاريعنا
              </h5>
              <div className="space-y-4">
                {[
                  "مشروعات النرجس الجديدة",
                  "مشروعات بيت الوطن القاهرة",
                  "مشروعات حي الأندلس",
                  "مشروعات شمال الرحاب"
                ].map((p, i) => (
                  <div key={i} className="p-4 glass rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all cursor-pointer flex justify-between items-center group">
                    <span className="text-sm font-bold opacity-70">{p}</span>
                    <ArrowUpRight size={16} className="text-brand-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-brand-neutral font-bold text-xs opacity-40">
            <p>© {new Date().getFullYear()} لاند فيو للتطوير العقاري. جميع الحقوق محفوظة.</p>
            <div className="flex gap-10">
              <span className="hover:text-white transition-colors cursor-pointer">سياسة الخصوصية</span>
              <span className="hover:text-white transition-colors cursor-pointer">الشروط والأحكام</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 left-8 z-100 flex flex-col gap-4">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/201101146460"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30"
        >
          <MessageCircle size={32} />
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-16 h-16 bg-brand-dark text-white border border-white/20 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md"
        >
          <ArrowUpRight size={32} />
        </motion.button>
      </div>

    </div>
  );
}
