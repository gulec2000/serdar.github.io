import { useLang } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Experience() {
  const { t } = useLang();
  const jobs = t.experience.jobs;

  return (
    <section id="experience" data-testid="experience-section" className="py-24 md:py-32 px-6 md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4"
      >
        {t.experience.title}
      </motion.h2>
      <div className="h-px w-16 bg-amber-500 mb-16" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-800" />
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-amber-500/30 timeline-glow" />

        <div className="flex flex-col gap-12">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`experience-item-${i}`}
              className="relative pl-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-amber-500 bg-[#0A0A0A]" />

              <div className="border border-zinc-800 rounded-sm p-5 hover:border-zinc-700 transition-colors bg-[#121212]/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {job.title} <span className="text-zinc-500">@</span> {job.company}
                  </h3>
                  <span className="font-mono text-xs tracking-wider text-amber-500">{job.period}</span>
                </div>
                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="font-mono text-xs leading-relaxed text-zinc-400 flex gap-2">
                      <span className="text-amber-500/60 mt-0.5 shrink-0">&gt;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
