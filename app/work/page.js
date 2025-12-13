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
        "description": `bullmq-dashboard is a web application that provides a user interface for managing BullMQ queues. It allows you to monitor and manage your queues easily through a web interface, making it simpler to visualize the state of your jobs and queues.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        visualize the state of your jobs and queues.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem`,
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
    },
    {
      "id": 3,
      "title": "Portfolio Website",
      "image": bullmq,
      "description": "Personal portfolio website built with Next.js and TailwindCSS.",
      "technologies": ["React", "Next.js", "TailwindCSS", "Framer motion"],
      "demoUrl": "https://rutu-portfolio-cyan.vercel.app/"
    },
    {
      "id": 4,
      "title": "Portfolio Website",
      "image": bullmq,
      "description": "Personal portfolio website built with Next.js and TailwindCSS.",
      "technologies": ["React", "Next.js", "TailwindCSS", "Framer motion"],
      "demoUrl": "https://rutu-portfolio-cyan.vercel.app/"
    },
    {
      "id": 5,
      "title": "Portfolio Website",
      "image": bullmq,
      "description": "Personal portfolio website built with Next.js and TailwindCSS.",
      "technologies": ["React", "Next.js", "TailwindCSS", "Framer motion"],
      "demoUrl": "https://rutu-portfolio-cyan.vercel.app/"
    },
    {
      "id": 6,
      "title": "Portfolio Website",
      "image": bullmq,
      "description": "Personal portfolio website built with Next.js and TailwindCSS.",
      "technologies": ["React", "Next.js", "TailwindCSS", "Framer motion"],
      "demoUrl": "https://rutu-portfolio-cyan.vercel.app/"
    },
    {
      "id": 7,
      "title": "Portfolio Website",
      "image": bullmq,
      "description": "Personal portfolio website built with Next.js and TailwindCSS.",
      "technologies": ["React", "Next.js", "TailwindCSS", "Framer motion"],
      "demoUrl": "https://rutu-portfolio-cyan.vercel.app/"
    },
    {
      "id": 8,
      "title": "Portfolio Website",
      "image": bullmq,
      "description": `Personal portfolio website built with Next.js and TailwindCSS.
      bullmq-dashboard is a web application that provides a user interface for managing BullMQ queues. It allows you to monitor and manage your queues easily through a web interface, making it simpler to visualize the state of your jobs and queues.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        visualize the state of your jobs and queues.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem`,
      "technologies": ["React", "Next.js", "TailwindCSS", "Framer motion"],
      "demoUrl": "https://rutu-portfolio-cyan.vercel.app/"
    }
  ];

  return (
    <RevealFx>
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-medium text-gray-200 mb-8">
            My Projects
          </h2>
          
          {/* Desktop: 3 columns grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Mobile: Vertical list */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {projectsData.map((project) => (
              <div key={project.id} className="w-full">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealFx>
  );
}