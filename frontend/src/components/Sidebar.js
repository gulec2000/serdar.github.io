import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { contactInfo } from "@/data/translations";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VisitorCounter from "./VisitorCounter"; // Import the new component
import myCV from '../Serdar_Gulec_CV.pdf'; 

const navKeys = ["about", "experience", "projects", "skills", "blog", "contact"];

function NavLinks({ onClick }) {
  const { t } = useLang();
  return (
    <nav className="flex flex-col gap-1">
      {navKeys.map((key) => (
        <a
          key={key}
          href={`#${key}`}
          data-testid={`nav-link-${key}`}
          onClick={onClick}
          className="nav-link font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-amber-400 transition-colors py-2 px-3 rounded-sm hover:bg-zinc-900"
        >
          {t.nav[key]}
        </a>
      ))}
    </nav>
  );
}

function LangToggle() {
  const { lang, toggleLang } = useLang();
  return (
    <button
      data-testid="lang-toggle-button"
      onClick={toggleLang}
      className="flex items-center gap-0 border border-zinc-700 rounded-sm overflow-hidden font-mono text-xs tracking-wider"
    >
      <span className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-amber-500 text-black font-bold" : "bg-transparent text-zinc-400 hover:text-zinc-200"}`}>
        EN
      </span>
      <span className={`px-3 py-1.5 transition-colors ${lang === "de" ? "bg-amber-500 text-black font-bold" : "bg-transparent text-zinc-400 hover:text-zinc-200"}`}>
        DE
      </span>
    </button>
  );
}

function SocialLinks({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {contactInfo.socials.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`social-link-${s.name.toLowerCase()}`}
          className="text-zinc-500 hover:text-amber-400 transition-colors text-sm"
        >
          <i className={s.icon} />
        </a>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLang();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        data-testid="desktop-sidebar"
        className="hidden md:flex fixed left-0 top-0 w-64 h-screen border-r border-zinc-800 bg-black/95 backdrop-blur-sm flex-col justify-between py-8 px-5 z-50"
      >
        <div>
          <a href="#about" className="block mb-10">
            <span className="font-heading text-xl font-black tracking-tighter text-white">SERDAR</span>
            <span className="font-heading text-xl font-black tracking-tighter text-amber-500">.</span>
          </a>
          <NavLinks />
        </div>
        <div className="flex flex-col gap-5">
          <VisitorCounter /> {/* Real-time counter added here */}
          <LangToggle />
          <a
            href={myCV}
            download="Serdar_Gulec_CV.pdf"
            data-testid="cv-download-button"
            className="flex items-center gap-2 border border-zinc-700 hover:border-amber-500/60 text-zinc-400 hover:text-amber-400 font-mono text-xs tracking-wider uppercase px-3 py-2 rounded-sm transition-colors"
          >
            <Download size={12} />
            {t.hero.downloadCV}
          </a>
          <SocialLinks />
        </div>
      </aside>

      {/* Mobile Header */}
      <header
        data-testid="mobile-header"
        className="md:hidden fixed top-0 left-0 right-0 h-14 bg-black/95 backdrop-blur-sm border-b border-zinc-800 flex items-center justify-between px-4 z-50"
      >
        <a href="#about" className="font-heading text-lg font-black tracking-tighter text-white">
          SERDAR<span className="text-amber-500">.</span>
        </a>
        <div className="flex items-center gap-3">
          <LangToggle />
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-zinc-300 hover:text-amber-400 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-14 bg-black/98 z-40 flex flex-col items-center justify-center gap-6"
          >
          <NavLinks onClick={() => setMobileOpen(false)} />
            <div className="w-full max-w-[200px]">
              <VisitorCounter /> {/* Also added to mobile menu */}
            </div>
            <a
              href={myCV}
              download="Serdar_Gulec_CV.pdf"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 border border-zinc-700 text-zinc-400 hover:text-amber-400 font-mono text-xs tracking-wider uppercase px-4 py-2.5 rounded-sm transition-colors"
            >
              <Download size={12} />
              {t.hero.downloadCV}
            </a>
            <SocialLinks className="mt-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}