import { Open_Sans } from 'next/font/google';
import "./globals.css";
import Cursor from "./components/Cursor";
import { Providers } from "./providers";
import Footer from "./components/Footer";
import NavigationBar  from "./components/NavBar";

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | RH',
    default: 'RH',
  },  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/logo-black.ico"
          sizes="any"
        />
      </head>
      <body
        className={`${openSans.className} antialiased min-h-screen h-full flex flex-col `}
      > 
        <NavigationBar/>
        <Providers>
          {children}
        </Providers>
        <Cursor/>
        <div className="flex-grow">
          <Footer className="footer"/>
        </div>
      </body>
    </html>
  );
}
