import { useLang } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { useState, useRef } from "react";

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play interrupted", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-zinc-900/50 border border-zinc-800 rounded-sm overflow-hidden hover:border-amber-500/40 transition-colors relative"
    >
      <div className="aspect-video overflow-hidden relative bg-black">
        {/* Static Image */}
        <img 
          src={project.img} 
          alt={project.title} 
          className={`w-full h-full object-cover transition-all duration-500 ${isHovered && project.video ? 'opacity-0 scale-105' : 'opacity-100'}`}
          referrerPolicy="no-referrer"
        />
        
        {/* Video Preview */}
        {project.video && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black hover:bg-amber-400 transition-all hover:scale-110 shadow-lg shadow-amber-500/20"
          >
            <ExternalLink size={20} />
          </a>
          {!project.video && (
            <div className="absolute top-4 right-4 text-zinc-500/50">
              <Play size={16} />
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors">
            {project.title}
          </h3>
          {project.video && (
            <span className="text-[10px] font-mono text-amber-500/60 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
              Preview
            </span>
          )}
        </div>
        <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-3">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-800 px-2 py-1 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
