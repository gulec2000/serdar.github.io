import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import blogPosts from "../data/blogPosts";
import { ChevronRight, X, Clock, Calendar } from "lucide-react";

export default function Blog() {
  const { t } = useLang();
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="blog" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2"
        >
          {t.blog.title}
        </motion.h2>
        <p className="font-mono text-sm text-zinc-500 mb-4">{t.blog.subtitle}</p>
        <div className="h-px w-16 bg-amber-500 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group p-8 bg-zinc-900/30 border border-zinc-800 rounded-sm hover:border-amber-500/30 transition-all cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[10px] text-amber-500 uppercase tracking-[0.2em] px-2 py-1 bg-amber-500/5 border border-amber-500/10">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-zinc-600 font-mono text-[9px] uppercase">
                  <Clock size={10} /> {post.readTime}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-amber-500 font-mono text-[10px] uppercase tracking-widest">
                {t.blog.readMore} <ChevronRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex flex-col"
            >
              <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-amber-500 uppercase tracking-[0.2em]">
                    {selectedPost.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-y-auto p-6 md:p-12">
                <div className="flex items-center gap-6 mb-8 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} /> {selectedPost.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} /> {selectedPost.readTime}
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  {selectedPost.title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                    {selectedPost.excerpt}
                  </p>
                  <div className="h-px w-full bg-zinc-800 mb-8" />
                  <div className="text-zinc-300 space-y-6 whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
