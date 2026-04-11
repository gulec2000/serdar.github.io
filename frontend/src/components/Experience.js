import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function Experience() {
  const { t } = useLang();
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2"
      >
        {t.experience.title}
      </motion.h2>
      <div className="h-px w-16 bg-amber-500 mb-12" />

      <div className="space-y-16">
        {t.experience.jobs.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8"
          >
            <div className="md:col-span-1">
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">{job.period}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
              <p className="font-mono text-sm text-amber-500 mb-2">{job.company}</p>
              <p className="text-zinc-400 text-sm mb-4 font-semibold italic">{job.subtitle}</p>
              <ul className="space-y-3">
                {job.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-sm text-zinc-500 leading-relaxed">
                    <span className="text-amber-500 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
