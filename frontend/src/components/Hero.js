import { useLang } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
// 1. Add this import at the top of Hero.js and Sidebar.js
// (Make sure the relative path string is correct based on where the component is)
import myCV from '../../assets/docs/Serdar_Gulec_CV.pdf'; 

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="about"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://static.prod-images.emergentagent.com/jobs/71c74e10-8a8b-4b1b-9260-983562c1e2b0/images/b9b5352ec87bb00bd9dfb6f437bb9376d5955df518f941f14f5a7d239d18b48a.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/80 to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 md:px-12 py-32">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-amber-500 mb-4"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95] mb-4"
        >
          {t.hero.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-amber-500" />
          <span className="font-mono text-sm tracking-wider text-amber-400 typewriter">
            {t.hero.role}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-sm leading-relaxed text-zinc-400 max-w-2xl mb-10"
        >
          {t.hero.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-3"
        >
          <a
            href="#experience"
            data-testid="hero-cta-button"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition-colors font-bold"
          >
            {t.hero.cta}
            <ChevronDown size={14} />
          </a>
          <a
            href={myCV}
            download="Serdar_Gulec_CV.pdf"
            data-testid="hero-download-cv-button"
            className="inline-flex items-center gap-2 border border-zinc-600 hover:border-amber-500/60 text-zinc-300 hover:text-amber-400 font-mono text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition-colors font-bold"
          >
            <Download size={14} />
            {t.hero.downloadCV}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
