"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/sections/ProjectCard";
import ProjectDetailModal from "@/components/sections/ProjectDetailModal";
import type { Project } from "@/lib/data";

export default function AvenueProjects({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (projects.length === 0) {
    return (
      <p className="text-text-muted text-sm">
        No projects listed under this avenue yet — check back soon.
      </p>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
