/* Design direction: “নীরব নিরাময়” — calm editorial healthcare, warm cream/olive/sand palette, asymmetric layouts, and motion that supports trust. */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  HeartHandshake,
  Home as HomeIcon,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ASSETS = {
  hero: "/manus-storage/physio-hero_d29f3b4c.jpg",
  mobility: "/manus-storage/physio-mobility_ea6f2c82.jpg",
  homecare: "/manus-storage/physio-homecare_3d503246.jpg",
  mark: "/manus-storage/physio-mark_1571c5ed.png",
};

const navItems = [
  ["হোম", "#home"],
  ["সেবাসমূহ", "#services"],
  ["সমস্যার সমাধান", "#concerns"],
  ["ফিজিওথেরাপিস্ট", "#therapist"],
  ["হোম সার্ভিস", "#home-service"],
  ["সাধারণ প্রশ্ন", "#faq"],
  ["যোগাযোগ", "#contact"],
];

const services = [
  { no: "০১", title: "ব্যথা ব্যবস্থাপনা", text: "ঘাড়, কোমর, কাঁধ, হাঁটু ও মেরুদণ্ডের ব্যথায় পরিকল্পিত থেরাপি।", icon: HeartHandshake },
  { no: "০২", title: "প্যারালাইসিস পুনর্বাসন", text: "স্ট্রোক ও প্যারালাইসিসের পর শক্তি, ভারসাম্য ও চলাফেরা ফিরিয়ে আনার সহায়তা।", icon: Sparkles },
  { no: "০৩", title: "চলন ও ভারসাম্য", text: "চলাফেরার সীমাবদ্ধতা, দুর্বলতা বা আঘাতের পর ধীরে ধীরে সক্রিয় জীবনে ফেরা।", icon: Check },
  { no: "০৪", title: "হোম ফিজিওথেরাপি", text: "যাঁদের ক্লিনিকে আসা কঠিন, তাঁদের জন্য প্রাপ্যতা অনুযায়ী বাড়িতে সেবা।", icon: HomeIcon },
];

const concerns = ["কোমর ও ঘাড়ের ব্যথা", "হাঁটু বা কাঁধের সমস্যা", "স্ট্রোকের পর দুর্বলতা", "প্যারালাইসিস", "বয়সজনিত চলন সমস্যা", "আঘাত-পরবর্তী পুনর্বাসন"];

const faqs = [
  ["ফিজিওথেরাপি নিতে আগে যোগাযোগ করা প্রয়োজন কি?", "হ্যাঁ। আপনার সমস্যা ও সুবিধাজনক সময় সম্পর্কে আগে ফোনে জানালে সঠিক সেবা ও সময় নির্ধারণে আমরা আপনাকে গাইড করতে পারব।"],
  ["মহিলা রোগীদের জন্য মহিলা ফিজিওথেরাপিস্টের ব্যবস্থা আছে কি?", "প্রাপ্যতা অনুযায়ী মহিলা রোগীদের জন্য মহিলা ফিজিওথেরাপিস্টের মাধ্যমে সেবা নেওয়ার ব্যবস্থা আছে। বিস্তারিত জানতে ফোন করুন।"],
  ["ক্লিনিকের বাইরে হোম সার্ভিস পাওয়া যায় কি?", "হ্যাঁ, প্রয়োজন ও প্রাপ্যতা অনুযায়ী হোম ফিজিওথেরাপি সেবা দেওয়া হয়। আপনার ঠিকানা জানিয়ে আগে যোগাযোগ করুন।"],
  ["ক্লিনিকটি কোথায় অবস্থিত?", "আজাদ ম্যানশন, নাপিতখোলা মোড়, মেইন রোড, মুক্তাগাছা, ময়মনসিংহ। নিচের লোকেশন অংশে যাওয়ার নির্দেশনাও দেওয়া আছে।"],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const routeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-line", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: "#services", start: "top 75%" } });
      if (routeRef.current) {
        const length = routeRef.current.getTotalLength();
        gsap.set(routeRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(routeRef.current, { strokeDashoffset: 0, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: routeRef.current, start: "top 82%" } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-cream text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-cream/85 backdrop-blur-lg transition-colors duration-300">
        <div className="container flex h-[76px] items-center justify-between gap-5">
          <a href="#home" className="flex items-center gap-3" aria-label="মডার্ন ফিজিওথেরাপি সেন্টার, হোম">
            <span className="brand-mark flex h-10 w-10 items-center justify-center rounded-full bg-olive p-2"><span className="brand-arc brand-arc-one" /><span className="brand-arc brand-arc-two" /><img src={ASSETS.mark} alt="" className="relative z-10 h-full w-full object-contain" /></span>
            <span className="max-w-[145px] text-[13px] font-semibold leading-[1.25] text-forest sm:max-w-none sm:text-[15px]">মডার্ন<br className="sm:hidden" /> ফিজিওথেরাপি সেন্টার</span>
          </a>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="প্রধান নেভিগেশন">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-[12px] font-medium text-muted transition-colors hover:text-olive">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:01913218798" className="hidden items-center gap-2 rounded-full bg-olive px-4 py-3 text-[12px] font-semibold text-cream transition-transform hover:-translate-y-0.5 sm:flex"><Phone size={14} /> অ্যাপয়েন্টমেন্ট নিন</a>
            <button className="rounded-full border border-stone p-2.5 text-forest xl:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-stone bg-cream px-5 py-4 xl:hidden" aria-label="মোবাইল নেভিগেশন">
            <div className="container flex flex-col gap-1">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-stone/70 py-3 text-sm font-medium text-forest">{label}</a>)}<a href="tel:01913218798" className="mt-3 flex items-center justify-center gap-2 rounded-full bg-olive px-4 py-3 text-sm font-semibold text-cream"><Phone size={15} /> অ্যাপয়েন্টমেন্টের জন্য কল করুন</a></div>
          </motion.nav>}
        </AnimatePresence>
      </header>

      <main id="home">
        <section className="relative bg-cream pb-20 pt-32 sm:pb-28 sm:pt-40"><div className="route-rail pointer-events-none absolute left-5 top-44 hidden h-56 flex-col items-center gap-3 lg:flex"><span className="text-[10px] font-semibold text-olive">০১</span><span className="h-36 w-px bg-stone"><span className="route-dot" /></span><span className="text-[10px] font-semibold text-muted">পথ</span></div>
          <div className="container grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } } }} className="relative z-10">
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mb-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] text-olive"><span className="h-px w-8 bg-olive" /> মুক্তাগাছা, ময়মনসিংহ</motion.div>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }} className="max-w-xl text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-forest">চলাফেরার স্বাচ্ছন্দ্য ফিরে পাওয়ার পথে পাশে আছি<span className="text-olive">।</span></motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className="mt-7 max-w-md text-base leading-8 text-muted sm:text-lg">ব্যথা, প্যারালাইসিস, চলাফেরাজনিত সমস্যা ও পুনর্বাসনের প্রয়োজন অনুযায়ী আপনার কাছেই নির্ভরযোগ্য ফিজিওথেরাপি সেবা।</motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mt-9 flex flex-wrap items-center gap-3"><a href="tel:01913218798" className="inline-flex items-center gap-2 rounded-full bg-olive px-5 py-3.5 text-sm font-semibold text-cream transition hover:bg-forest">অ্যাপয়েন্টমেন্টের জন্য কল করুন <ArrowUpRight size={16} /></a><a href="#contact" className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-forest underline decoration-stone underline-offset-8 hover:decoration-olive">লোকেশন দেখুন <ArrowDownRight size={16} /></a></motion.div>
              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-stone pt-5 text-xs font-medium text-muted"><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-olive" /> সনদপ্রাপ্ত ফিজিওথেরাপিস্ট</span><span className="flex items-center gap-2"><HomeIcon size={15} className="text-olive" /> হোম সার্ভিস</span></motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.1, delay: 0.25, ease: [0.77, 0, 0.175, 1] }} className="relative lg:mt-8">
              <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full border border-olive/30 sm:-left-8 sm:-top-8 sm:h-32 sm:w-32" /><div className="relative overflow-hidden rounded-[1.75rem] rounded-bl-[5rem] bg-sand"><img src={ASSETS.hero} alt="ফিজিওথেরাপি সেবার শান্ত ও মানবিক মুহূর্ত" className="aspect-[4/3] h-full w-full object-cover" loading="eager" /><div className="absolute bottom-5 left-5 max-w-[195px] rounded-2xl bg-cream/95 p-4 backdrop-blur-sm"><p className="text-xs leading-5 text-forest">আপনার প্রয়োজন বুঝে, যত্নের সঙ্গে সঠিক সেবা।</p></div></div><div className="absolute -bottom-7 -right-4 hidden h-24 w-24 items-center justify-center rounded-full bg-olive text-center text-[10px] font-semibold leading-4 text-cream sm:flex">যত্ন<br />ও<br />আস্থা</div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-stone bg-sand/55 py-5"><div className="container flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-muted"><span className="flex items-center gap-2"><Check size={14} className="text-olive" /> বাংলাদেশ রাষ্ট্রীয় চিকিৎসা অনুষদ থেকে সনদপ্রাপ্ত</span><span className="flex items-center gap-2"><Check size={14} className="text-olive" /> আধুনিক যন্ত্রপাতি ও ব্যক্তিকেন্দ্রিক পরিকল্পনা</span><span className="flex items-center gap-2"><Check size={14} className="text-olive" /> মহিলা রোগীদের জন্য ব্যবস্থা</span></div></section>

        <section id="services" className="bg-cream py-24 sm:py-32"><div className="container"><div className="mb-10 flex items-center gap-3 text-[10px] font-semibold tracking-[0.13em] text-muted"><span className="h-px w-14 bg-olive" /><span>যত্নের পথ · ০২</span></div><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr]"><Reveal><p className="eyebrow">আমাদের সেবাসমূহ</p><h2 className="section-title mt-4">সুস্থতার পথে<br /><em>পরিকল্পিত</em> সহায়তা</h2><p className="mt-6 max-w-xs text-sm leading-7 text-muted">শরীরের সমস্যা একেক জনের একেক রকম। তাই প্রতিটি সেবায় প্রয়োজন অনুযায়ী মূল্যায়ন, থেরাপি ও পরবর্তী গাইডলাইনকে গুরুত্ব দেওয়া হয়।</p></Reveal><div className="divide-y divide-stone border-t border-stone">{services.map(({ no, title, text, icon: Icon }, i) => <Reveal key={no} delay={i * 0.06}><div className="service-line group grid gap-4 py-6 sm:grid-cols-[60px_0.85fr_1fr_auto] sm:items-center"><span className="text-xs font-semibold text-olive">{no}</span><h3 className="text-xl font-semibold text-forest transition group-hover:translate-x-1">{title}</h3><p className="max-w-sm text-sm leading-6 text-muted">{text}</p><Icon size={20} strokeWidth={1.4} className="text-olive" /></div></Reveal>)}</div></div></div></section>

        <section id="concerns" className="bg-forest py-24 text-cream sm:py-32"><div className="container grid gap-14 lg:grid-cols-[0.75fr_1fr] lg:items-end"><Reveal><p className="eyebrow text-sage">যেসব সমস্যায় সেবা</p><h2 className="section-title mt-4 max-w-xl text-cream">সমস্যা বুঝে<br /><em className="text-sage">সঠিক পথে</em> এগোনো</h2><p className="mt-6 max-w-md text-sm leading-7 text-cream/65">আপনার বর্তমান সমস্যা, দৈনন্দিন চলাফেরা এবং প্রয়োজন অনুযায়ী থেরাপির দিকনির্দেশনা পেতে আমাদের সঙ্গে কথা বলুন।</p></Reveal><Reveal delay={0.12} className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">{concerns.map((item, i) => <div key={item} className="flex items-center gap-4 border-b border-cream/15 py-4 text-sm"><span className="text-xs text-sage">০{i + 1}</span><span>{item}</span></div>)}</Reveal></div></section>

        <section id="therapist" className="bg-sand/50 py-24 sm:py-32"><div className="container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"><Reveal className="relative"><div className="absolute -left-4 -top-4 h-20 w-20 border-l border-t border-olive/50" /><img src={ASSETS.mobility} alt="পুনর্বাসন অনুশীলনের প্রতীকী ছবি" className="aspect-[4/5] w-full max-w-md rounded-[1.5rem] object-cover" loading="lazy" /><p className="mt-4 text-[11px] leading-5 text-muted">প্রতীকী ছবি। এটি ক্লিনিক বা প্রকৃত রোগীর ছবি নয়।</p></Reveal><Reveal delay={0.1}><p className="eyebrow">আপনার ফিজিওথেরাপিস্ট</p><h2 className="section-title mt-4">অভিজ্ঞতা দিয়ে<br /><em>আস্থা</em> তৈরি করা</h2><p className="mt-6 max-w-lg text-base leading-8 text-muted">বাংলাদেশ রাষ্ট্রীয় চিকিৎসা অনুষদ থেকে সনদপ্রাপ্ত ফিজিওথেরাপিস্টের মাধ্যমে সেবা। রোগীর কথা শোনা, সমস্যার মূল কারণ বোঝা এবং বাস্তবসম্মত পুনর্বাসন পরিকল্পনা—এই তিনটি বিষয়কে আমরা গুরুত্ব দিই।</p><div className="mt-8 border-l-2 border-olive pl-5 text-sm leading-7 text-forest">ফিজিওথেরাপিস্ট<br /><span className="text-muted">ফিজিওথেরাপিস্ট — প্রতিবন্ধী হাসপাতাল, ময়মনসিংহ</span></div><a href="#contact" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-olive underline decoration-stone underline-offset-8">সাক্ষাৎ ও সেবা সম্পর্কে জানুন <ArrowUpRight size={16} /></a></Reveal></div></section>

        <section id="home-service" className="bg-cream py-24 sm:py-32"><div className="container grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center"><Reveal><p className="eyebrow">বাড়িতে ফিজিওথেরাপি</p><h2 className="section-title mt-4">ক্লিনিকে আসা কঠিন হলে,<br /><em>সেবাটি যাবে</em> আপনার কাছে</h2><p className="mt-6 max-w-md text-base leading-8 text-muted">বয়স, অসুস্থতা বা চলাফেরার সীমাবদ্ধতার কারণে ক্লিনিকে আসা কঠিন হলে প্রাপ্যতা অনুযায়ী হোম ফিজিওথেরাপি সেবার ব্যবস্থা করা হয়।</p><div className="mt-8 flex items-center gap-3 text-sm font-medium text-forest"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand"><HomeIcon size={17} className="text-olive" /></span> আগে ফোন করে আপনার প্রয়োজনটি জানান</div></Reveal><Reveal delay={0.12} className="relative"><img src={ASSETS.homecare} alt="বাড়িতে ফিজিওথেরাপি সেবার প্রতীকী ছবি" className="aspect-[3/2] w-full rounded-[1.5rem] object-cover" loading="lazy" /><span className="absolute -bottom-5 -left-5 rounded-full bg-olive px-5 py-4 text-xs font-semibold text-cream shadow-xl">যত্ন যেখানে প্রয়োজন</span><p className="mt-7 text-[11px] leading-5 text-muted">প্রতীকী ছবি। এটি প্রকৃত হোম সার্ভিসের ছবি নয়।</p></Reveal></div></section>

        <section id="faq" className="bg-sand/55 py-24 sm:py-32"><div className="container"><div className="mb-10 flex items-center gap-3 text-[10px] font-semibold tracking-[0.13em] text-muted"><span className="h-px w-14 bg-olive" /><span>জানুন · ০৬</span></div><div className="grid gap-12 lg:grid-cols-[0.55fr_1fr]"><Reveal><p className="eyebrow">সাধারণ প্রশ্ন</p><h2 className="section-title mt-4">জানার মতো<br /><em>কিছু কথা</em></h2><p className="mt-6 max-w-xs text-sm leading-7 text-muted">সেবার আগে মনে আসা সাধারণ প্রশ্নগুলোর সহজ উত্তর এখানে দেওয়া হলো। আরও কিছু জানতে সরাসরি ফোন করুন।</p></Reveal><div>{faqs.map(([question, answer], i) => <Reveal key={question} delay={i * 0.04}><div className="border-t border-stone"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold text-forest" aria-expanded={openFaq === i}><span>{question}</span><ChevronDown size={18} className={`shrink-0 text-olive transition-transform ${openFaq === i ? "rotate-180" : ""}`} /></button><AnimatePresence initial={false}>{openFaq === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-muted">{answer}</p></motion.div>}</AnimatePresence></div></Reveal>)}</div></div></div></section>

        <section id="contact" className="relative bg-cream py-24 sm:py-32"><div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><Reveal><p className="eyebrow">যোগাযোগ ও লোকেশন</p><h2 className="section-title mt-4">আপনার পরবর্তী<br /><em>পদক্ষেপটি</em> সহজ হোক</h2><p className="mt-6 max-w-md text-base leading-8 text-muted">আপনার সমস্যা ও সুবিধাজনক সময় সম্পর্কে জানতে আমাদের সঙ্গে কথা বলুন।</p><div className="mt-9 flex flex-col gap-4"><a href="tel:01913218798" className="flex items-center gap-4 text-lg font-semibold text-forest"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive text-cream"><Phone size={18} /></span> ০১৯১৩-২১৮৭৯৮</a><a href="tel:01612287776" className="flex items-center gap-4 text-lg font-semibold text-forest"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-olive"><Phone size={18} /></span> ০১৬১২-২৮৭৭৭৬</a></div></Reveal><Reveal delay={0.12} className="relative overflow-hidden rounded-[1.5rem] bg-forest p-7 text-cream sm:p-10"><div className="absolute inset-0 opacity-20"><svg viewBox="0 0 600 330" className="h-full w-full"><path ref={routeRef} d="M-20 235 C 100 50, 165 305, 278 125 S 430 46, 640 120" fill="none" stroke="#B6C3AF" strokeWidth="1.5" /></svg></div><div className="relative"><div className="flex items-center gap-3 text-sage"><MapPin size={18} /><span className="eyebrow text-sage">ক্লিনিকের ঠিকানা</span></div><p className="mt-8 max-w-md text-2xl font-semibold leading-relaxed sm:text-3xl">আজাদ ম্যানশন,<br />নাপিতখোলা মোড়,<br />মেইন রোড, মুক্তাগাছা,<br />ময়মনসিংহ</p><div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-cream/65"><span className="flex items-center gap-2"><Clock3 size={15} /> আগে যোগাযোগ করে সময় নিন</span><span className="flex items-center gap-2"><MapPin size={15} /> সহজে খুঁজে পাওয়া যায়</span></div><a href="https://www.google.com/maps/search/?api=1&query=Azad+Mansion+Napitkhola+Mor+Muktagachha+Mymensingh" target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-forest">গুগল ম্যাপে লোকেশন দেখুন <ArrowUpRight size={16} /></a></div></Reveal></div></section>
      </main>

      <footer className="bg-forest py-12 text-cream"><div className="container flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream p-2"><img src={ASSETS.mark} alt="" className="h-full w-full object-contain" /></span><span className="text-sm font-semibold">মডার্ন ফিজিওথেরাপি সেন্টার</span></div><p className="mt-4 max-w-xs text-xs leading-6 text-cream/55">আপনার কাছেই নির্ভরযোগ্য ফিজিওথেরাপি ও পুনর্বাসন সেবা।</p></div><div className="text-left sm:text-right"><p className="text-xs text-cream/45">আজাদ ম্যানশন, নাপিতখোলা মোড়, মুক্তাগাছা</p><p className="mt-2 text-xs text-cream/45">© ২০২৪ মডার্ন ফিজিওথেরাপি সেন্টার</p></div></div></footer>
      <a href="tel:01913218798" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-cream shadow-xl sm:hidden" aria-label="ফোন করুন"><Phone size={21} /></a>
    </div>
  );
}
