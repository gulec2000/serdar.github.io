import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { contactInfo } from "@/data/translations";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import RecentVisitors from "./RecentVisitors";
import VisitorMap from "./VisitorMap";

export default function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState("idle");
  const f = t.contact.form;
  const info = t.contact.info;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.target);
    try {
      const res = await fetch("https://formspree.io/f/mkgvkyjb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2"
      >
        {t.contact.title}
      </motion.h2>
      <p className="font-mono text-sm text-zinc-500 mb-4">{t.contact.subtitle}</p>
      <div className="h-px w-16 bg-amber-500 mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
          data-testid="contact-form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 mb-1 block">{f.name}</label>
              <input
                type="text"
                name="name"
                required
                data-testid="contact-form-name"
                className="w-full bg-transparent border border-zinc-700 rounded-sm px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 mb-1 block">{f.email}</label>
              <input
                type="email"
                name="email"
                required
                data-testid="contact-form-email"
                className="w-full bg-transparent border border-zinc-700 rounded-sm px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 mb-1 block">{f.message}</label>
            <textarea
              name="message"
              rows={5}
              required
              data-testid="contact-form-message"
              className="w-full bg-transparent border border-zinc-700 rounded-sm px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            data-testid="contact-form-submit"
            className="self-start bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-mono text-xs tracking-wider uppercase px-8 py-3 rounded-sm transition-colors font-bold"
          >
            {status === "sending" ? f.sending : f.send}
          </button>
          {status === "success" && <p data-testid="contact-form-success" className="font-mono text-xs text-green-400">{f.success}</p>}
          {status === "error" && <p data-testid="contact-form-error" className="font-mono text-xs text-red-400">{f.error}</p>}
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <div className="flex gap-4">
            <MapPin size={18} className="text-amber-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 mb-1">{info.address}</h4>
              <p className="font-mono text-sm text-zinc-300">{contactInfo.address.line1}</p>
              <p className="font-mono text-sm text-zinc-300">{contactInfo.address.line2}</p>
              <p className="font-mono text-sm text-zinc-300">{contactInfo.address.line3}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail size={18} className="text-amber-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 mb-1">{info.email}</h4>
              <a href={`mailto:${contactInfo.email}`} className="font-mono text-sm text-zinc-300 hover:text-amber-400 transition-colors">
                {contactInfo.email}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone size={18} className="text-amber-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 mb-1">{info.phone}</h4>
              <span className="font-mono text-sm text-zinc-300">{contactInfo.phone}</span>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 mb-3">{info.social}</h4>
            <div className="flex items-center gap-4">
              {contactInfo.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`contact-social-${s.name.toLowerCase()}`}
                  className="w-10 h-10 flex items-center justify-center border border-zinc-800 rounded-sm text-zinc-500 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <RecentVisitors />
          <VisitorMap />
        </motion.div>
      </div>
    </section>
  );
}
