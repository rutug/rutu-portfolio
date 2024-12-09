import NavBar from "../app/components/NavBar"
import TechnologiesKnown from "./components/TechIcons";
import vue from "./Logos/vue-js.png"
import docker from "./Logos/docker.png"
import js from "./Logos/js.png"
import linux from "./Logos/linux.png"
import next from "./Logos/nextttt-modified.png"
import react from "./Logos/react.png"


export default function Home() {
  const technologies = [
    {
      name: 'React',
      imagePath: react
    },
    {
      name: 'Next.js',
      imagePath: next
    },
    {
      name: 'JavaScript',
      imagePath: js
    },
    {
      name: 'Vue.js',
      imagePath: vue
    },
    {
      name: 'Linux',
      imagePath: linux
    },
    {
      name:'Docker',
      imagePath: docker
    }
  ];

  return (
    <>
      <NavBar/>
      <TechnologiesKnown
      technologies={technologies}
      iconsPerRow={6}
      />
    </>
  );
}
