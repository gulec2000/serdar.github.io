import { useLang } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const fallback = "https://images.pexels.com/photos/6466141/pexels-photo-6466141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      data-testid={`project-card-${project.id}`}
      className="group block border border-zinc-800 rounded-sm overflow-hidden bg-[#121212]/50 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden bg-zinc-900">
        <img
          src={imgError ? fallback : project.img}
          alt={project.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={16} className="text-amber-400" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-sm font-semibold text-white mb-2 leading-tight group-hover:text-amber-400 transition-colors">
          {project.title}
        </h3>
        <p className="font-mono text-[11px] leading-relaxed text-zinc-500 mb-3 line-clamp-2">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] tracking-wider text-amber-500/70 border border-zinc-800 px-2 py-0.5 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const { t } = useLang();

  return (
    <section id="projects" data-testid="projects-section" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800">
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {t.projects.items.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
