// In your parent component or page
import ProjectCard from '../components/ProjectCard';
import RevealFx from '../components/RevealFx';
import bullmq from "../Logos/bullmq.png"
import portfolio from "../Logos/portfolio.png"

export default function Projects() {
  const projectsData = [
    {
        "id": 1,
        "title": "Bullmq Dashboard",
        "image": portfolio,
        "description": "bullmq-dashboard is a web application that provides a user interface for managing BullMQ queues. It allows you to monitor and manage your queues easily through a web interface, making it simpler to visualize the state of your jobs and queues.",
        "technologies": ["NodeJs", "Redis", "Docker"],
        "demoUrl": "https://hub.docker.com/repository/docker/ethene7887/bullmq-dashboard/general"
    },
    {
      "id": 2,
      "title": "Portfolio Website",
      "image": bullmq,
      "description": "Personal portfolio website built with Next.js and TailwindCSS.",
      "technologies": ["React", "Next.js", "TailwindCSS", "Framer motion"],
      "demoUrl": "https://rutu-portfolio-cyan.vercel.app/"
    }  
] 

  return (
    <RevealFx>
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-medium text-gray-200 mb-8">
            My Projects
          </h2>
          <ProjectCard projects={projectsData} />
        </div>
      </div>
    </RevealFx>
  );
}