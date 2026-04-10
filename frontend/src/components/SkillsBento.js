import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Layout, 
  MessageSquare, 
  Smartphone, 
  Zap,
  Terminal,
  Database,
  Palette
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
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tighter">
          Technical <span className="text-amber-500">Arsenal</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl font-mono text-sm">
          A curated selection of technologies and tools I use to bring digital experiences to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[800px]">
        {/* Main Skill - React/Frontend (Large) */}
        <SkillCard 
          title="Frontend Engineering" 
          icon={Layout} 
          className="md:col-span-2 md:row-span-2"
          delay={0.1}
        >
          <p className="text-zinc-400 text-sm mb-6">
            Building highly interactive, performant, and accessible user interfaces using modern frameworks.
          </p>
          <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 font-mono text-[11px] text-zinc-500 overflow-hidden">
            <div className="flex gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <code className="block">
              <span className="text-purple-400">const</span> <span className="text-blue-400">Portfolio</span> = () =&gt; &#123; <br />
              &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-amber-500">motion.div</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">animate</span>=&#123;&#123; <span className="text-blue-300">scale</span>: <span className="text-orange-400">1</span> &#125;&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">whileHover</span>=&#123;&#123; <span className="text-blue-300">y</span>: -<span className="text-orange-400">5</span> &#125;&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br />
              &nbsp;&nbsp;);<br />
              &#125;;
            </code>
          </div>
        </SkillCard>

        {/* Performance (Medium) */}
        <SkillCard 
          title="Optimization" 
          icon={Zap} 
          className="md:col-span-2 md:row-span-1"
          delay={0.2}
        >
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '98%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-amber-500"
                />
              </div>
              <div className="flex justify-between mt-2 font-mono text-[10px] text-zinc-500 uppercase">
                <span>Lighthouse Score</span>
                <span className="text-amber-500">98/100</span>
              </div>
            </div>
          </div>
        </SkillCard>

        {/* Architecture (Small) */}
        <SkillCard 
          title="Architecture" 
          icon={Layers} 
          delay={0.3}
        />

        {/* Backend (Small) */}
        <SkillCard 
          title="Backend" 
          icon={Database} 
          delay={0.4}
        />

        {/* Mobile (Small) */}
        <SkillCard 
          title="Mobile First" 
          icon={Smartphone} 
          className="md:col-span-1 md:row-span-1"
          delay={0.5}
        />

        {/* Design (Medium) */}
        <SkillCard 
          title="UI/UX Design" 
          icon={Palette} 
          className="md:col-span-2 md:row-span-1"
          delay={0.6}
        >
          <div className="flex gap-2 mt-2">
            {['#F59E0B', '#18181B', '#27272A', '#3F3F46'].map(color => (
              <div 
                key={color} 
                className="w-6 h-6 rounded-lg border border-white/10" 
                style={{ backgroundColor: color }} 
              />
            ))}
          </div>
        </SkillCard>

        {/* Terminal/DevOps (Small) */}
        <SkillCard 
          title="DevOps" 
          icon={Terminal} 
          delay={0.7}
        />
      </div>
    </section>
  );
}
