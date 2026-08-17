"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/sections/ProjectCard";
import ProjectDetailModal from "@/components/sections/ProjectDetailModal";
import { projects, type Project } from "@/lib/data";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative min-h-screen pt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-gold to-rust bg-clip-text text-transparent">
              Flagships
            </span>
          </h1>
          <p className="text-text-muted max-w-xl text-sm md:text-base">
            From education to sports, culture to community — explore the
            flagship projects that define our journey of service.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
