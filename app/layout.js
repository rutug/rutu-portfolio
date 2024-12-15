import { Open_Sans } from 'next/font/google';
import "./globals.css";
import Cursor from "./components/Cursor";
import { Providers } from "./providers";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavBar";

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | RH',
    default: 'RH',
  },
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link
          rel="icon"
          href="/logo-black.ico"
          sizes="any"
        />
      </head>
      <body className={openSans.className}>
        <div className="relative flex flex-col min-h-screen">
          <NavigationBar />
          <main className="flex-grow pb-24 md:pb-0">
            <Providers>
              {children}
            </Providers>
          </main>
          <Footer />
        </div>
        <Cursor />
      </body>
    </html>
  );
}