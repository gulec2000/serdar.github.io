import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import blogPosts from "@/data/blogPosts";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Clock, Calendar } from "lucide-react";

function BlogCard({ post, readMoreLabel, readLessLabel }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-zinc-800 rounded-sm bg-zinc-900/30 hover:border-zinc-700 transition-colors"
      data-testid={`blog-card-${post.id}`}
    >
      {/* Card Header */}
      <div className="p-6">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
            <Calendar size={11} />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-white leading-snug mb-3 group-hover:text-amber-400 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-4">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 border border-zinc-700 text-zinc-400 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          data-testid={`blog-card-toggle-${post.id}`}
          className="flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase text-amber-500 hover:text-amber-400 transition-colors font-bold"
        >
          {expanded ? readLessLabel : readMoreLabel}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Expandable full content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-zinc-800 px-6 py-6 flex flex-col gap-8">
              
              {/* --- NEW: Image Render Block --- */}
              {post.image && (
                <div className="w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto rounded-sm border border-zinc-700/50"
                  />
                </div>
              )}
              {/* ------------------------------- */}

              {post.sections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="font-heading text-sm font-bold text-amber-500 uppercase tracking-wide mb-3">
                    {section.heading}
                  </h4>
                  {section.body.split("\n\n").map((para, pIdx) => (
                    <p
                      key={pIdx}
                      // --- NEW: Added 'whitespace-pre-line' to support bullet points/code formatting ---
                      className="font-mono text-sm text-zinc-300 leading-relaxed mb-3 last:mb-0 whitespace-pre-line"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Blog() {
  const { t } = useLang();
  const blog = t.blog;

  return (
    <section
      id="blog"
      data-testid="blog-section"
      className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2"
      >
        {blog.title}
      </motion.h2>
      <p className="font-mono text-sm text-zinc-500 mb-4">{blog.subtitle}</p>
      <div className="h-px w-16 bg-amber-500 mb-12" />

      <div className="flex flex-col gap-6">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            readMoreLabel={blog.readMore}
            readLessLabel={blog.readLess}
          />
        ))}
      </div>
    </section>
  );
}
