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
const outfitregular = localFont({
  src: '../../src/fonts/Outfit-Regular.ttf',
  variable: '--font-outfitregular',
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
        className={`${geistSans.variable} ${geistMono.variable} ${ozikBold.variable} ${outfitregular.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
