// In your parent component or page
import ProjectCard from '../components/ProjectCard';
import demo1 from "../Logos/demo1.png"
import portfolio from "../Logos/portfolio.png"

export default function Projects() {
  const projectsData = [
    {
      id: 1,
      title: "Portfolio Website",
      image: portfolio,
      description: "Personal portfolio website built with Next.js and TailwindCSS.",
      technologies: ["React", "Next.js", "TailwindCSS"],
      demoUrl: "https://rutu-portfolio-cyan.vercel.app/"
    },
    {
      id: 2,
      title: "Demo1",
      image: demo1,
      description: "Full-featured e-commerce platform with cart and checkout functionality.",
      technologies: ["Next.js", "MongoDB", "Stripe"],
      demoUrl: "https://learn-nextjs-1-chi.vercel.app/"
    },
    // Add more projects...
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-medium text-gray-200 mb-8">
          My Projects
        </h2>
        <ProjectCard projects={projectsData} />
      </div>
    </div>
  );
}