import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const ozikBold = localFont({
  src: '../../src/fonts/OZIK-Bold.otf',
  variable: '--font-ozikBold',
});

const neueMachinaBold = localFont({
  src: '../../src/fonts/NeueMachina-Bold.ttf',
  variable: '--font-neueMachinaBold',
});

const neueMachinaLight = localFont({
  src: '../../src/fonts/NeueMachina-Light.otf',
  variable: '--font-neueMachinaLight',
});

export const metadata: Metadata = {
  title: 'Aviva',
  description: 'Movimento Aviva',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          ozikBold.variable,
          neueMachinaBold.variable,
          neueMachinaLight.variable,
        ].join(' ')}
      >
        {children}
      </body>
    </html>
  );
}
