import './globals.css';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import CartProvider from '@/components/CartProvider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://24bcs10090-hwa-hackathon.vercel.app'),
  title: {
    default: 'Stay — A departure enrichment station for dogs',
    template: '%s · Stay',
  },
  description:
    'Stay turns the hours alone into a day that still feels like home: measured meals, your scent, six small moments of curiosity, and your voice before you walk back in.',
  openGraph: {
    title: 'Stay — A departure enrichment station for dogs',
    description:
      'Stay turns the hours alone into a day that still feels like home: measured meals, your scent, six small moments of curiosity, and your voice before you walk back in.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#EAF2F8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <ScrollReveal />
        </CartProvider>
      </body>
    </html>
  );
}
