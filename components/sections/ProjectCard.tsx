"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group relative glass-card overflow-hidden hover:border-gold/30 transition-all duration-500 cursor-pointer"
    >
      <div className="aspect-video bg-gradient-to-br from-surface to-primary flex items-center justify-center overflow-hidden">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/5 to-rust/5 flex items-center justify-center">
            <span className="font-heading text-gold/30 text-5xl sm:text-6xl font-bold">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gold/10 text-gold/80 border border-gold/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-heading text-sm sm:text-lg font-bold text-ivory mb-2 group-hover:text-gold transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs font-semibold">
            {project.impact}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
