import React from 'react';
import SkillsBento from './components/SkillsBento';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function PortfolioPreview() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Navigation Mockup */}
      <nav className="p-6 flex justify-between items-center border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black">S</div>
          <span className="font-bold tracking-tighter text-xl">SERDAR.G</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-mono uppercase tracking-widest text-zinc-500">
          <a href="#" className="hover:text-amber-500 transition-colors">Projects</a>
          <a href="#" className="text-white">Skills</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
        </div>
        <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 transition-colors">
          Resume
        </button>
      </nav>

      {/* Hero Mockup */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-mono uppercase tracking-widest mb-6 border border-amber-500/20">
            Available for new projects
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
            Crafting digital <br />
            <span className="text-zinc-500 italic">experiences</span> that matter.
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            Full-stack engineer specializing in building high-performance web applications with a focus on user experience and clean code.
          </p>
        </motion.div>
      </section>

      {/* The Bento Grid Feature */}
      <SkillsBento />

      {/* Footer Mockup */}
      <footer className="py-20 px-6 border-t border-zinc-900 text-center">
        <div className="flex justify-center gap-6 mb-8">
          <a href="https://gulecserdar.de/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono">
            View Live Site <ExternalLink size={14} />
          </a>
        </div>
        <p className="text-zinc-600 text-xs font-mono">
          &copy; 2026 Serdar Gulec. Built with React & Tailwind.
        </p>
      </footer>
    </div>
  );
}
