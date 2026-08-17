"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/data";

export default function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14100C]/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="aspect-video bg-gradient-to-br from-gold/10 to-rust/10 flex items-center justify-center">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-heading text-gold/20 text-8xl font-bold">
                  {project.title.charAt(0)}
                </span>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold/80 border border-gold/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-ivory">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/50 transition-all shrink-0 cursor-pointer"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-text-muted text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex items-center gap-3 bg-gold/5 border border-gold/10 rounded-lg px-4 py-3">
                <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                <div>
                  <p className="text-xs text-text-muted">Impact</p>
                  <p className="text-gold text-sm font-semibold">{project.impact}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
