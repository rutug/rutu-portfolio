import Link from 'next/link';
import Image from 'next/image';
import RevealFx from "./components/RevealFx";
import avatar from "./Logos/avatar.gif"
import { FileDown, User } from 'lucide-react';
import RainbowText from './components/Rainbow';

export default function Home() { 

  const info = headerIntro();
  const avatar = getAvatar();
  const buttons = getButtons();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <RevealFx>
        <div className="text-center space-y-12">
          
          {/* GIF */}
          {avatar}

          {/* Header */}
          {info}

          {/* Get Buttons */}
          {buttons}

        </div>
      </RevealFx>
    </div>
  );
}

function headerIntro(){
  return(
    <div className="space-y-0">
      <div className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-bold text-gray-900 dark:text-white">
        Rutwek Hirwe 
      </div>
      <div className="text-[4vw] md:text-[20px] lg:text-[20px] text-gray-600 dark:text-gray-400">
        Just another <RainbowText>Software Engineer!</RainbowText>
      </div>
    </div>
  )
}

function getAvatar(){
  return(
    <div className="w-full flex justify-center mb-8">
      <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]">
        <Image
          src={avatar} 
          alt="Rutwek Hirwe Animation"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}

function getButtons(){
  return(
    <div className="flex items-center justify-center gap-6 mt-12">
      <Link 
        href="/about"
        className="flex items-center gap-2 px-8 py-3 rounded-full text-gray-300 border border-gray-700/50 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
      >
        <User className="w-5 h-5" />
        <span>About Me</span>
      </Link>
      <a 
        href="/path-to-your-cv.pdf"
        download
        className="flex items-center gap-2 px-8 py-3 rounded-full text-gray-300 border border-gray-700/50 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
      >
        <FileDown className="w-5 h-5" />
        <span>Download CV</span>
      </a>
    </div>
  )
}