/* Revised design: “চিকিৎসার নোটবুক” — linen, terracotta, ink navy, paper panels, index rail, care stamps, and plotted treatment pathways. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  HeartPulse,
  Home as HomeIcon,
  MapPin,
  Menu,
  Pause,
  Phone,
  Play,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_CONFIG = {
  heroImage: "/manus-storage/notebook-hero_e2af3fa6.jpg",
  therapistImage: "/manus-storage/notebook-therapist_ff1603f9.jpg",
  rehabilitationImage: "/manus-storage/notebook-rehab_1ac22b55.jpg",
  homeServiceImage: "/manus-storage/physio-homecare_3d503246.jpg",
  clinicImage: "/manus-storage/notebook-gallery_1d070ce7.jpg",
  videoPoster: "/manus-storage/notebook-rehab_1ac22b55.jpg",
  galleryImages: [
    "/manus-storage/notebook-gallery_1d070ce7.jpg",
    "/manus-storage/notebook-rehab_1ac22b55.jpg",
    "/manus-storage/notebook-hero_e2af3fa6.jpg",
    "/manus-storage/physio-mobility_ea6f2c82.jpg",
  ],
};

const phonePrimary = "tel:01913218798";
const phoneSecondary = "tel:01612287776";
const mapQuery = "https://www.google.com/maps/search/?api=1&query=Azad+Mansion+Napitkhola+Mor+Main+Road+Muktagachha+Mymensingh";

const navItems = [
  ["হোম", "#home"], ["সেবাসমূহ", "#services"], ["সমস্যা", "#problems"],
  ["পুনর্বাসন", "#rehab"], ["ফিজিওথেরাপিস্ট", "#therapist"], ["হোম সার্ভিস", "#home-service"],
  ["প্রশ্নোত্তর", "#faq"], ["যোগাযোগ", "#contact"],
];

const problemChips = ["ঘাড় ব্যথা", "কোমর ব্যথা", "হাঁটু ব্যথা", "পিঠ ব্যথা", "কাঁধ ব্যথা", "কনুই ব্যথা", "গোড়ালির ব্যথা", "প্যারালাইসিস", "জয়েন্ট শক্ত হয়ে যাওয়া", "মাংসপেশির দুর্বলতা"];
const conditions = ["বাত", "ব্যথা", "প্যারালাইসিস", "প্রতিবন্ধী রোগীদের ফিজিওথেরাপি", "ঘাড় ব্যথা", "কোমর ব্যথা", "হাঁটু ব্যথা", "পিঠ ব্যথা", "কাঁধ ব্যথা", "কনুই ব্যথা", "হাতের কবজির ব্যথা", "আঘাতজনিত ব্যথা", "পায়ের গোড়ালির ব্যথা", "জয়েন্ট শক্ত হয়ে যাওয়া", "মুখ একদিকে বেঁকে যাওয়া", "পা ঝিনঝিন করা", "হাত-পা অবশ হওয়া", "মাংসপেশির দুর্বলতা", "সেরিব্রাল পালসি / শারীরিক প্রতিবন্ধকতা"];
const trustReasons = [
  ["সনদপ্রাপ্ত ফিজিওথেরাপিস্ট", "বাংলাদেশ রাষ্ট্রীয় চিকিৎসা অনুষদ থেকে সনদপ্রাপ্ত ফিজিওথেরাপিস্টের মাধ্যমে সেবা।", ShieldCheck],
  ["আধুনিক যন্ত্রপাতি", "প্রয়োজন অনুযায়ী আধুনিক ফিজিওথেরাপি সরঞ্জাম ব্যবহারের ব্যবস্থা।", Stethoscope],
  ["রোগীভিত্তিক সেবা", "রোগীর সমস্যা ও শারীরিক অবস্থার ভিত্তিতে প্রয়োজনীয় পদ্ধতি নির্বাচন।", HeartPulse],
  ["হোম সার্ভিস", "যাঁদের ক্লিনিকে আসতে অসুবিধা হয়, তাঁদের জন্য হোম সার্ভিসের সুবিধা।", HomeIcon],
  ["মহিলা রোগীদের জন্য ব্যবস্থা", "প্রাপ্যতা অনুযায়ী মহিলা ফিজিওথেরাপিস্টের মাধ্যমে সেবা নেওয়ার ব্যবস্থা।", Check],
] as const;
const processSteps = [["০১", "মূল্যায়ন", "আপনার সমস্যা ও শারীরিক অবস্থার প্রাথমিক মূল্যায়ন।"], ["০২", "চিকিৎসা পরিকল্পনা", "প্রয়োজন অনুযায়ী ফিজিওথেরাপি পরিকল্পনা নির্ধারণ।"], ["০৩", "ফিজিওথেরাপি", "উপযুক্ত থেরাপি ও ব্যায়ামভিত্তিক সেবা।"], ["০৪", "অগ্রগতি পর্যবেক্ষণ", "অগ্রগতি অনুযায়ী প্রয়োজনীয় পরিবর্তন ও পরামর্শ।"]];
const faqs = [
  ["কোন কোন সমস্যায় ফিজিওথেরাপি নেওয়া যায়?", "বাত, ব্যথা, ঘাড়-কোমর-হাঁটু-কাঁধের সমস্যা, আঘাতজনিত ব্যথা, জয়েন্ট শক্ত হয়ে যাওয়া, দুর্বলতা, প্যারালাইসিস ও চলাফেরার সমস্যায় প্রয়োজন অনুযায়ী ফিজিওথেরাপি সহায়ক হতে পারে।"],
  ["প্যারালাইসিসের রোগীরা কি ফিজিওথেরাপি নিতে পারেন?", "প্যারালাইসিসের ক্ষেত্রে ফিজিওথেরাপি চলন, পেশিশক্তি, ভারসাম্য ও দৈনন্দিন কাজের সক্ষমতা উন্নয়নে পুনর্বাসনে সহায়তা করতে পারে। রোগীর অবস্থা অনুযায়ী পরিকল্পনা নির্ধারণ করা হয়।"],
  ["হোম সার্ভিস পাওয়া যায় কি?", "হ্যাঁ, বয়স্ক, প্যারালাইসিস, চলাফেরায় অসুবিধা অথবা অন্যান্য কারণে যাঁদের ক্লিনিকে আসতে সমস্যা হয়, তাঁদের জন্য প্রাপ্যতা অনুযায়ী হোম সার্ভিসের ব্যবস্থা রয়েছে।"],
  ["মহিলা রোগীদের জন্য মহিলা ফিজিওথেরাপিস্টের ব্যবস্থা আছে কি?", "প্রাপ্যতা অনুযায়ী মহিলা রোগীদের জন্য মহিলা ফিজিওথেরাপিস্টের মাধ্যমে সেবা নেওয়ার ব্যবস্থা আছে। বিস্তারিত জানতে ফোন করুন।"],
  ["ফিজিওথেরাপি নিতে আগে যোগাযোগ করা প্রয়োজন কি?", "হ্যাঁ, আগে ফোন করে আপনার সমস্যা ও সুবিধাজনক সময় জানালে সেবা সম্পর্কে পরিষ্কারভাবে গাইড করা যাবে।"],
  ["মডার্ন ফিজিওথেরাপি সেন্টার কোথায়?", "আজাদ ম্যানশন, নাপিতখোলা মোড়, মেইন রোড, মুক্তাগাছা, ময়মনসিংহ।"],
  ["কীভাবে অ্যাপয়েন্টমেন্ট নেওয়া যাবে?", "০১৯১৩-২১৮৭৯৮ অথবা ০১৬১২-২৮৭৭৭৬ নম্বরে কল করে অ্যাপয়েন্টমেন্ট সম্পর্কে জানতে পারবেন।"],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}>{children}</motion.div>;
}
function Stamp({ text }: { text: string }) { return <span className="stamp">{text}</span>; }
function SectionStamp({ number, label }: { number: string; label: string }) { return <div className="section-stamp"><b className="mini-care-stamp" aria-hidden="true"><i /></b><span className="section-number">{number}</span><span>{label}</span></div>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const processLine = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (processLine.current) {
        const length = processLine.current.getTotalLength();
        gsap.set(processLine.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(processLine.current, { strokeDashoffset: 0, duration: 1.7, ease: "power2.out", scrollTrigger: { trigger: "#process", start: "top 78%" } });
      }
      gsap.fromTo(".rehab-photo", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".rehab-photo", start: "top 80%" } });
    });
    return () => ctx.revert();
  }, []);

  return <div className="notebook-site min-h-screen overflow-x-hidden bg-linen text-ink">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-linen/92 backdrop-blur-md">
      <div className="container flex h-[70px] items-center justify-between gap-4">
        <a href="#home" className="brand-lockup" aria-label="মডার্ন ফিজিওথেরাপি সেন্টার, হোম"><span className="care-stamp"><span className="stamp-joint" /><img src="/manus-storage/notebook-mark_e15bb379.png" alt="" /></span><span><strong>মডার্ন ফিজিওথেরাপি</strong><small>সেন্টার · মুক্তাগাছা</small></span></a>
        <nav className="hidden items-center gap-4 lg:flex" aria-label="প্রধান নেভিগেশন">{navItems.slice(0, 7).map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}</nav>
        <div className="flex items-center gap-2"><a href={phonePrimary} className="hidden rounded-sm bg-terracotta px-4 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink lg:block">অ্যাপয়েন্টমেন্ট নিন</a><button onClick={() => setMenuOpen(!menuOpen)} className="rounded-sm border border-ink/20 p-2.5 text-ink lg:hidden" aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </div>
      <AnimatePresence>{menuOpen && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-ink/10 bg-linen px-5 py-3 lg:hidden"><div className="container flex flex-col">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-ink/10 py-3 text-sm font-semibold">{label}</a>)}<a href={phonePrimary} className="mt-3 bg-terracotta px-4 py-3 text-center text-sm font-semibold text-white">অ্যাপয়েন্টমেন্টের জন্য কল করুন</a></div></motion.nav>}</AnimatePresence>
    </header>

    <aside className="index-rail pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"><b className="index-rail-stamp">চিকিৎসার<br />নোটবুক</b><span className="index-rule"><i /></span><span className="index-codes">০১<br />—<br />১২</span></aside>

    <main id="home" className="pb-20 sm:pb-0">
      <section className="cover-section pt-28 sm:pt-32"><div className="container"><div className="cover-kicker"><span>মডার্ন ফিজিওথেরাপি সেন্টার</span><span>মুক্তাগাছা, ময়মনসিংহ</span></div><div className="cover-grid"><div className="cover-copy"><Stamp text="যত্ন · মূল্যায়ন · পুনর্বাসন" /><h1>মুক্তাগাছায়<br /><em>চলাফেরার</em><br />পথে পাশে আছি<span className="dot">.</span></h1><p>ব্যথা, প্যারালাইসিস, চলাফেরাজনিত সমস্যা ও পুনর্বাসনের প্রয়োজন অনুযায়ী আপনার কাছেই নির্ভরযোগ্য ফিজিওথেরাপি সেবা।</p><div className="flex flex-wrap items-center gap-3"><a href={phonePrimary} className="primary-action">অ্যাপয়েন্টমেন্টের জন্য কল করুন <ArrowUpRight size={16} /></a><a href="#contact" className="text-action">লোকেশন দেখুন <ArrowDownRight size={16} /></a></div><div className="cover-facts"><span><ShieldCheck size={15} /> সনদপ্রাপ্ত ফিজিওথেরাপিস্ট</span><span><HomeIcon size={15} /> হোম সার্ভিস</span><span><HeartPulse size={15} /> রোগীভিত্তিক সেবা</span><span><Check size={15} /> মহিলা রোগীদের জন্য ব্যবস্থা</span></div></div><div className="cover-media"><div className="cover-media-label">চলন · ০১</div><img src={IMAGE_CONFIG.heroImage} alt="ফিজিওথেরাপি অনুশীলনের প্রতীকী ছবি" loading="eager" /><p>প্রতীকী ছবি। বাস্তব ক্লিনিকের ছবি পরে যুক্ত করা হবে।</p></div></div></div></section>

      <section id="problems" className="problem-section"><div className="container"><SectionStamp number="০২" label="প্রথমে সমস্যাটি বুঝুন" /><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><h2 className="section-heading max-w-2xl">আপনার কোন সমস্যার জন্য<br /><em>ফিজিওথেরাপি</em> প্রয়োজন?</h2><p className="max-w-sm text-sm leading-7 text-ink/65">প্রতিটি শরীর, প্রতিটি সমস্যা এবং প্রতিটি পুনর্বাসনের পথ আলাদা। আপনার জন্য প্রাসঙ্গিক বিষয়টি বেছে নিন।</p></div><div className="problem-scroller" tabIndex={0} aria-label="ফিজিওথেরাপির সমস্যা সমূহ">{problemChips.map((problem, index) => <a href="#services" key={problem} className="problem-chip"><span>০{index + 1}</span>{problem}<ArrowUpRight size={15} /></a>)}</div></div></section>

      <section id="services" className="services-section"><div className="container"><SectionStamp number="০৩" label="সম্ভাব্য সেবার দিক" /><div className="services-intro"><h2 className="section-heading">কেন <em>মডার্ন</em><br />ফিজিওথেরাপি সেন্টার?</h2><p>বিশ্বাস তৈরি হয় পরিষ্কার তথ্য, দায়িত্বশীল ভাষা এবং রোগীর প্রয়োজনকে গুরুত্ব দেওয়ার মধ্য দিয়ে।</p></div><div className="trust-strip">{trustReasons.map(([title, text, Icon], index) => <Reveal key={title} delay={index * 0.04}><article className="trust-note"><span className="note-number">০{index + 1}</span><Icon size={21} strokeWidth={1.5} className="text-terracotta" /><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></div></section>

      <section className="conditions-section"><div className="container"><SectionStamp number="০৪" label="সেবার ক্ষেত্র" /><div className="conditions-layout"><div><h2 className="section-heading">যেসব সমস্যায়<br /><em>সেবা দেওয়া হয়</em></h2><p className="mt-5 max-w-sm text-sm leading-7 text-ink/65">নিচের তালিকাটি সম্ভাব্য সেবার ক্ষেত্র বোঝায়। ফিজিওথেরাপি রোগীর অবস্থা অনুযায়ী ব্যবস্থাপনা ও পুনর্বাসনে সহায়তা করে; নিশ্চিত নিরাময়ের প্রতিশ্রুতি নয়।</p><div className="condition-note"><span className="stamp">সহায়ক · প্রয়োজন অনুযায়ী</span><p>ব্যথা নিয়ন্ত্রণ, চলাফেরার সক্ষমতা ও মাংসপেশির কার্যক্ষমতা উন্নয়নে সহায়তা।</p></div></div><div className="condition-list">{conditions.map((condition, index) => <div key={condition}><span>{String(index + 1).padStart(2, "0")}</span><strong>{condition}</strong></div>)}</div></div></div></section>

      <section id="rehab" className="rehab-section"><div className="container"><SectionStamp number="০৫" label="বিশেষ ফোকাস · পুনর্বাসন" /><div className="rehab-grid"><Reveal className="rehab-photo-wrap"><img className="rehab-photo" src={IMAGE_CONFIG.rehabilitationImage} alt="প্যারালাইসিস পুনর্বাসনের প্রতীকী ছবি" loading="lazy" /><span>প্রতীকী ছবি · পুনর্বাসন অনুশীলন</span></Reveal><Reveal delay={0.1} className="rehab-copy"><Stamp text="প্যারালাইসিস ও পুনর্বাসন" /><h2 className="section-heading text-white">ছোট ছোট অনুশীলনে<br /><em>ফিরে আসুক</em> চলনের সাহস</h2><p>প্যারালাইসিস বা শারীরিক দুর্বলতার ক্ষেত্রে ফিজিওথেরাপি রোগীর অবস্থা অনুযায়ী নড়াচড়া, পেশিশক্তি, ভারসাম্য এবং দৈনন্দিন কাজের সক্ষমতা উন্নয়নে পুনর্বাসনে সহায়তা করতে পারে।</p><div className="rehab-points">{["মুভমেন্ট রিহ্যাবিলিটেশন", "মাংসপেশি শক্তিশালীকরণ", "ভারসাম্য অনুশীলন", "কার্যকর নড়াচড়া", "হাঁটার পুনর্বাসন", "দৈনন্দিন কাজের সহায়তা"].map((item, index) => <span key={item}><i>০{index + 1}</i>{item}</span>)}</div><a href={phonePrimary} className="light-action">পুনর্বাসন সেবা সম্পর্কে জানতে কল করুন <ArrowUpRight size={16} /></a></Reveal></div></div></section>

      <section id="therapist" className="therapist-section"><div className="container"><SectionStamp number="০৬" label="যাঁর সঙ্গে কথা বলবেন" /><div className="therapist-grid"><Reveal className="therapist-card"><div className="photo-frame"><img src={IMAGE_CONFIG.therapistImage} alt="ফিজিওথেরাপিস্টের অস্থায়ী প্রতীকী ছবি" loading="lazy" /><span>অস্থায়ী ছবি · প্রকৃত ব্যক্তির ছবি নয়</span></div><div className="therapist-card-caption"><span>ফিজিওথেরাপিস্ট</span><strong>মোঃ রুহুল আমিন</strong></div></Reveal><Reveal delay={0.1}><Stamp text="পরিচয় · যোগ্যতা · অভিজ্ঞতার ক্ষেত্র" /><h2 className="section-heading mt-5">আপনার<br /><em>ফিজিওথেরাপিস্ট</em></h2><p className="mt-5 max-w-lg text-base leading-8 text-ink/70">রোগীর কথা শোনা, সমস্যার ধরন বোঝা এবং বাস্তবসম্মত পুনর্বাসন পরিকল্পনার মাধ্যমে সেবা দেওয়াই এই পরিচয়ের মূল কথা।</p><dl className="credentials"><div><dt>যোগ্যতা</dt><dd>ডি.পি.টি. (আই.এইচ.টি.), ঢাকা</dd></div><div><dt>বিশেষ প্রশিক্ষণ</dt><dd>ম্যানুয়াল থেরাপি — ব্যাংকক, থাইল্যান্ড</dd></div><div><dt>FTC</dt><dd>ঢাকা মেডিকেল কলেজ ও হাসপাতাল, পঙ্গু হাসপাতাল ও ঢাকা শিশু হাসপাতাল</dd></div><div><dt>পেশাগত তথ্য</dt><dd>ফিজিওথেরাপিস্ট — প্রতিবন্ধী হাসপাতাল, ময়মনসিংহ</dd></div></dl></Reveal></div></div></section>

      <section id="process" className="process-section"><div className="container"><SectionStamp number="০৭" label="চিকিৎসার পথ" /><div className="process-heading"><h2 className="section-heading">কীভাবে এগোয়<br /><em>সেবাটি?</em></h2><p>প্রথম কথোপকথন থেকে অগ্রগতি পর্যবেক্ষণ—প্রতিটি ধাপ পরিষ্কারভাবে বোঝার মতো করে সাজানো।</p></div><div className="process-track"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path ref={processLine} d="M20 50 C 220 15, 300 85, 500 50 S 780 15, 980 50" fill="none" stroke="#b85c45" strokeWidth="2" /></svg>{processSteps.map(([number, title, text]) => <article key={number} className="process-step"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section id="home-service" className="home-service-section"><div className="container"><div className="home-service-panel"><div><SectionStamp number="০৮" label="ক্লিনিকের বাইরে যত্ন" /><h2 className="section-heading">ক্লিনিকে আসা কঠিন?<br /><em>বাড়িতেও</em> সেবা পাওয়া যাবে</h2><p>বয়স্ক, প্যারালাইসিস, চলাফেরায় অসুবিধা অথবা অন্যান্য কারণে যেসব রোগীর ক্লিনিকে আসতে সমস্যা হয়, তাঁদের জন্য হোম সার্ভিসের ব্যবস্থা রয়েছে।</p><a href={phonePrimary} className="primary-action">হোম সার্ভিস সম্পর্কে জানতে কল করুন <Phone size={15} /></a></div><div className="home-service-image"><img src={IMAGE_CONFIG.homeServiceImage} alt="বাড়িতে ফিজিওথেরাপি সেবার প্রতীকী ছবি" loading="lazy" /><span>প্রতীকী ছবি · বাস্তব হোম সার্ভিসের ছবি নয়</span></div></div></div></section>

      <section className="media-section"><div className="container"><SectionStamp number="০৯" label="দেখুন · শিগগিরই" /><div className="media-grid"><div><h2 className="section-heading">আমাদের ফিজিওথেরাপি<br /><em>সেবার কিছু মুহূর্ত</em></h2><p className="mt-5 max-w-sm text-sm leading-7 text-ink/65">বাস্তব ক্লিনিক ফুটেজ পাওয়া গেলে এই অংশে ক্লিনিক, থেরাপি সেশন, যন্ত্রপাতি এবং হোম সার্ভিসের ভিডিও যুক্ত করা হবে।</p></div><div className="video-placeholder"><img src={IMAGE_CONFIG.videoPoster} alt="ভবিষ্যৎ ভিডিওর পোস্টার হিসেবে ব্যবহৃত পুনর্বাসনের প্রতীকী ছবি" loading="lazy" /><div className="video-overlay"><span className="play-button"><Play size={20} fill="currentColor" /></span><strong>ক্লিনিকের বাস্তব ভিডিও<br />শিগগিরই এখানে যুক্ত হবে</strong></div><span className="video-caption"><Pause size={13} /> ভিডিও প্লেসহোল্ডার · অটোপ্লে নয়</span></div></div></div></section>

      <section className="gallery-section"><div className="container"><div className="gallery-header"><div><SectionStamp number="১০" label="পরিবেশ · ছবি" /><h2 className="section-heading mt-4">আমাদের সেবার<br /><em>পরিবেশ</em></h2></div><p>বাস্তব ছবি যুক্ত হলে এখানে ক্লিনিক, রিসেপশন, থেরাপি রুম, যন্ত্রপাতি, অপেক্ষার জায়গা ও সেবার মুহূর্ত দেখা যাবে।</p></div><div className="gallery-mosaic">{IMAGE_CONFIG.galleryImages.map((image, index) => <figure key={image} className={`gallery-item gallery-${index + 1}`}><img src={image} alt={`ক্লিনিকের পরিবেশের অস্থায়ী প্রতীকী ছবি ${index + 1}`} loading="lazy" /><figcaption>অস্থায়ী ভিজ্যুয়াল · ছবি {index + 1}</figcaption></figure>)}</div></div></section>

      <section className="testimonials-section"><div className="container"><div className="testimonial-placeholder"><Stamp text="বাস্তব অভিজ্ঞতা" /><h2>রোগীদের বাস্তব অভিজ্ঞতা<br /><em>শিগগিরই এখানে যুক্ত হবে</em></h2><p>বাস্তব রোগীর অনুমোদিত অভিজ্ঞতা ছাড়া কোনো প্রশংসাপত্র, রেটিং বা সাফল্যের গল্প প্রকাশ করা হবে না।</p></div></div></section>

      <section id="faq" className="faq-section"><div className="container"><div className="faq-layout"><div><SectionStamp number="১১" label="জানার মতো কথা" /><h2 className="section-heading mt-4">সাধারণ<br /><em>প্রশ্নোত্তর</em></h2><p className="mt-5 max-w-xs text-sm leading-7 text-ink/65">সেবা নেওয়ার আগে মনে আসা গুরুত্বপূর্ণ প্রশ্নগুলোর সহজ উত্তর।</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div key={question} className="faq-item"><button onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index}><span><i>০{index + 1}</i>{question}</span><ChevronDown size={18} className={faqOpen === index ? "rotate-180" : ""} /></button><AnimatePresence initial={false}>{faqOpen === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></div></div></section>

      <section id="contact" className="contact-section"><div className="container"><div className="contact-panel"><div className="contact-copy"><Stamp text="শেষ ধাপ · যোগাযোগ" /><h2 className="section-heading text-white">ফিজিওথেরাপি সেবা নিতে<br /><em>যোগাযোগ করুন</em></h2><p>আপনার সমস্যা, সুবিধাজনক সময় এবং সেবার ধরন সম্পর্কে জানতে সরাসরি ফোন করুন।</p><div className="contact-numbers"><a href={phonePrimary}><Phone size={16} /> ০১৯১৩-২১৮৭৯৮</a><a href={phoneSecondary}><Phone size={16} /> ০১৬১২-২৮৭৭৭৬</a></div></div><div className="map-card"><div className="map-heading"><MapPin size={16} /><span>ক্লিনিকের ঠিকানা</span></div><p>মডার্ন ফিজিওথেরাপি সেন্টার<br />আজাদ ম্যানশন, নাপিতখোলা মোড়,<br />মেইন রোড, মুক্তাগাছা, ময়মনসিংহ</p><iframe title="মডার্ন ফিজিওথেরাপি সেন্টারের ঠিকানা" src="https://www.google.com/maps?q=Azad%20Mansion%2C%20Napitkhola%20Mor%2C%20Main%20Road%2C%20Muktagachha%2C%20Mymensingh&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="flex flex-wrap gap-3"><a href={phonePrimary} className="light-action">এখনই কল করুন <Phone size={14} /></a><a href={mapQuery} target="_blank" rel="noreferrer" className="outline-action">গুগল ম্যাপে দেখুন <ExternalLink size={14} /></a></div></div></div></div></section>
    </main>

    <footer className="site-footer"><div className="container grid gap-8 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-end"><div><div className="brand-lockup light"><span className="care-stamp"><span className="stamp-joint" /><img src="/manus-storage/notebook-mark_e15bb379.png" alt="" /></span><span><strong>মডার্ন ফিজিওথেরাপি</strong><small>সেন্টার · মুক্তাগাছা</small></span></div><p className="mt-4 max-w-xs text-xs leading-6 text-white/55">আপনার সমস্যাকে বুঝে, চলাফেরার পথে বাস্তব সহায়তা।</p></div><div><p className="footer-label">যোগাযোগ</p><a href={phonePrimary}>০১৯১৩-২১৮৭৯৮</a><a href={phoneSecondary}>০১৬১২-২৮৭৭৭৬</a></div><div><p className="footer-label">ঠিকানা</p><p>আজাদ ম্যানশন, নাপিতখোলা মোড়,<br />মেইন রোড, মুক্তাগাছা, ময়মনসিংহ</p><a className="footer-map" href={mapQuery} target="_blank" rel="noreferrer">লোকেশন দেখুন <ArrowUpRight size={14} /></a></div></div><div className="container mt-10 border-t border-white/15 pt-5 text-[11px] text-white/40">© ২০২৪ মডার্ন ফিজিওথেরাপি সেন্টার · তথ্য পরিবর্তন হলে ওয়েবসাইট আপডেট করা যাবে</div></footer>
    <div className="mobile-cta"><a href={phonePrimary}><Phone size={15} /> কল করুন</a><a href="#contact"><MapPin size={15} /> লোকেশন</a></div>
  </div>;
}
