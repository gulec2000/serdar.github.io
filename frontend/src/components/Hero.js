import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-amber-500 text-sm mb-4 tracking-widest uppercase">{t.hero.greeting}</p>
        <h1 className="font-heading text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter">
          {t.hero.name}
        </h1>
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-zinc-500 mb-8 uppercase tracking-tight">
          {t.hero.role}
        </h2>
        <p className="max-w-2xl text-zinc-400 leading-relaxed mb-10 font-mono text-sm">
          {t.hero.bio}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs tracking-wider uppercase px-8 py-4 rounded-sm transition-colors font-bold">
            {t.hero.cta}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
