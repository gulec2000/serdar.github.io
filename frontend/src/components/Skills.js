import { useLang } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" data-testid="skills-section" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800 relative">
      {/* Subtle texture bg */}
      <div className="absolute inset-0 opacity-[0.04] z-0">
        <img
          src="https://static.prod-images.emergentagent.com/jobs/71c74e10-8a8b-4b1b-9260-983562c1e2b0/images/7ecfcaef50b67199d9d8fbe193de8c4f174b6d3e49279cbfeb7333eecc34084e.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2"
        >
          {t.skills.title}
        </motion.h2>
        <p className="font-mono text-sm text-zinc-500 mb-4">{t.skills.subtitle}</p>
        <div className="h-px w-16 bg-amber-500 mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden">
          {t.skills.items.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              data-testid={`skill-item-${skill.name.toLowerCase().replace(/[\s\/]/g, "-")}`}
              className="bg-[#0A0A0A] p-4 flex flex-col gap-2 hover:bg-[#121212] group transition-colors cursor-default"
            >
              <i className={`${skill.icon} text-lg text-zinc-500 group-hover:text-amber-400 transition-colors`} />
              <span className="font-mono text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                {skill.name}
              </span>
              <span className="font-mono text-[10px] text-zinc-600 leading-snug group-hover:text-zinc-400 transition-colors">
                {skill.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        {t.skills.certifications && (
          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-2">
              {t.skills.certTitle}
            </h3>
            <div className="h-px w-12 bg-amber-500 mb-6" />
            <div className="flex flex-wrap gap-2">
              {t.skills.certifications.map((cert) => (
                <span
                  key={cert}
                  data-testid={`cert-${cert.toLowerCase().replace(/[\s:\/&]/g, "-")}`}
                  className="font-mono text-[11px] tracking-wider text-amber-500/80 border border-zinc-800 bg-[#121212]/60 px-3 py-1.5 rounded-sm hover:border-amber-500/40 hover:bg-[#121212] transition-colors cursor-default"
                >
                  <i className="fa-solid fa-certificate text-[9px] mr-1.5 opacity-60" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
