import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from "../context/LanguageContext";
import { 
  Globe, 
  Layers, 
  Zap,
  Terminal,
  Database,
  Cloud,
  ShieldCheck,
  Activity,
  Anchor,
  GitBranch,
  Settings
} from 'lucide-react';

const SkillCard = ({ 
  title, 
  icon: Icon, 
  className = "", 
  children,
  delay = 0 
}: { 
  title: string; 
  icon: any; 
  className?: string; 
  children?: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`relative overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 group hover:border-amber-500/30 transition-colors ${className}`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-zinc-800/50 rounded-2xl group-hover:bg-amber-500/10 transition-colors">
        <Icon className="w-6 h-6 text-zinc-400 group-hover:text-amber-500 transition-colors" />
      </div>
      <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-amber-500 animate-pulse" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    {children}
    
    {/* Decorative background element */}
    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
      <Icon size={120} />
    </div>
  </motion.div>
);

export default function SkillsBento() {
  const { t } = useLang();

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[850px]">
          {/* Main Skill - Platform Engineering (Large) */}
          <SkillCard 
            title="Platform Engineering" 
            icon={Cloud} 
            className="md:col-span-2 md:row-span-2"
            delay={0.1}
          >
            <p className="text-zinc-400 text-sm mb-6">
              Orchestrating mission-critical workloads on OpenShift and Kubernetes with a focus on high availability and scalability.
            </p>
            <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 font-mono text-[11px] text-zinc-500 overflow-hidden">
              <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                <span className="text-amber-500/80">cluster-status.sh</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[9px] text-green-500/70 uppercase">Healthy</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Nodes:</span>
                  <span className="text-zinc-300">Ready (12/12)</span>
                </div>
                <div className="flex justify-between">
                  <span>Deployments:</span>
                  <span className="text-zinc-300">Synced (ArgoCD)</span>
                </div>
                <div className="flex justify-between">
                  <span>Operators:</span>
                  <span className="text-zinc-300">Up-to-date</span>
                </div>
              </div>
            </div>
          </SkillCard>

          {/* Infrastructure as Code (Medium) */}
          <SkillCard 
            title="Infrastructure as Code" 
            icon={Layers} 
            className="md:col-span-2 md:row-span-1"
            delay={0.2}
          >
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800 font-mono text-[10px] text-zinc-500">
              <code className="block">
                <span className="text-purple-400">resource</span> <span className="text-amber-500">"aws_instance"</span> <span className="text-blue-400">"web"</span> &#123;<br />
                &nbsp;&nbsp;<span className="text-zinc-400">ami</span> = <span className="text-green-400">data.ami.id</span><br />
                &nbsp;&nbsp;<span className="text-zinc-400">instance_type</span> = <span className="text-green-400">"t3.medium"</span><br />
                &#125;
              </code>
            </div>
          </SkillCard>

          {/* CI/CD & GitOps (Small) */}
          <SkillCard 
            title="GitOps & CI/CD" 
            icon={GitBranch} 
            delay={0.3}
          >
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[8px] text-zinc-400">Git</div>
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[8px] text-zinc-400">Argo</div>
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[8px] text-zinc-400">Helm</div>
              </div>
            </div>
          </SkillCard>

          {/* Monitoring (Small) */}
          <SkillCard 
            title="Observability" 
            icon={Activity} 
            delay={0.4}
          >
            <div className="mt-2 h-8 flex items-end gap-0.5">
              {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + (i * 0.05) }}
                  className="flex-1 bg-amber-500/40 rounded-t-sm"
                />
              ))}
            </div>
          </SkillCard>

          {/* Automation (Small) */}
          <SkillCard 
            title="Automation" 
            icon={Terminal} 
            className="md:col-span-1 md:row-span-1"
            delay={0.5}
          />

          {/* Cloud Providers (Medium) */}
          <SkillCard 
            title="Cloud Ecosystem" 
            icon={Globe} 
            className="md:col-span-2 md:row-span-1"
            delay={0.6}
          >
            <div className="flex flex-wrap gap-2 mt-2">
              {['AWS', 'Azure', 'OpenShift', 'GitLab'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-zinc-800/50 rounded-md text-[10px] font-mono text-zinc-400 border border-zinc-700/50">
                  {tag}
                </span>
              ))}
            </div>
          </SkillCard>

          {/* Security (Small) */}
          <SkillCard 
            title="Cloud Security" 
            icon={ShieldCheck} 
            delay={0.7}
          />
        </div>

        {/* Certifications */}
        {t.skills.certifications && (
          <div className="mt-16">
            <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-2">
              {t.skills.certTitle}
            </h3>
            <div className="h-px w-12 bg-amber-500 mb-6" />
            <div className="flex flex-wrap gap-2">
              {t.skills.certifications.map((cert: string) => (
                <span
                  key={cert}
                  className="font-mono text-[11px] tracking-wider text-amber-500/80 border border-zinc-800 bg-[#121212]/60 px-3 py-1.5 rounded-sm hover:border-amber-500/40 hover:bg-[#121212] transition-colors cursor-default flex items-center"
                >
                  <ShieldCheck size={10} className="mr-1.5 opacity-60" />
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
