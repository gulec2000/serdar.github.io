import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const { t } = useLang();
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2"
      >
        {t.projects.title}
      </motion.h2>
      <p className="font-mono text-sm text-zinc-500 mb-4">{t.projects.subtitle}</p>
      <div className="h-px w-16 bg-amber-500 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.projects.items.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-zinc-900/50 border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/40 transition-colors"
          >
            <div className="aspect-video overflow-hidden relative">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black hover:bg-amber-400 transition-colors">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{project.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-3">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-800 px-2 py-1 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
