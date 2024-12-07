import NavBar from "../app/components/NavBar"
import Timeline from "./components/Timeline"
import { Download, FileIcon, Calendar } from 'lucide-react';


export default function Home() {
  const timelineItems = [
    {
      title: "Flowbite Application UI v2.0.0",
      badge: "Latest",
      date: "Released on January 13th, 2022",
      description: "Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.",
      icon: <FileIcon className="w-4 h-4" />,
      actions: [
        {
          label: "Download ZIP",
          icon: <Download className="w-4 h-4" />,
          onClick: () => console.log("Download clicked")
        }
      ]
    },
    {
      title: "Flowbite Figma v1.3.0",
      date: "Released on December 7th, 2021",
      description: "All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      title: "Flowbite Library v1.2.2",
      date: "Released on December 2nd, 2021",
      description: "Get started with dozens of web components and interactive elements built on top of Tailwind CSS.",
      icon: <FileIcon className="w-4 h-4" />
    }
  ];
  return (
    <>
      <NavBar/>
      <Timeline
        items = {timelineItems}
      />
    </>
  );
}
