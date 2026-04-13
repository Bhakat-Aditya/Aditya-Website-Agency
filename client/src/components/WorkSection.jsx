import projectsData from '../data/portfolio.json';
import ProjectCard from '../components/ProjectCard';

export default function WorkSection() {
  return (
    <section className="py-20 bg-zinc-950 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-10">Our Latest Work</h2>
        
        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} data={project} />
          ))}
        </div>
        
      </div>
    </section>
  );
}