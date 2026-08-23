import Reveal from "@/components/motion/Reveal";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Reveal className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-goldtext to-rusttext bg-clip-text text-transparent">
              Flagships
            </span>
          </h1>
          <p className="text-text-muted max-w-xl text-sm md:text-base">
            From education to sports, culture to community — explore the
            flagship projects that define our journey of service.
          </p>
        </Reveal>

        <ProjectsGrid />
      </div>
    </div>
  );
}
