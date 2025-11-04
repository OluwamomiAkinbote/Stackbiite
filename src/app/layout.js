import "./globals.css";
import { ThemeProvider } from '@/components/home/ThemeContext';
import ClientLayout from './ClientLayout'; 

export const metadata = {
  title: {
    default: "Stackbiite - Web Design & Development Agency",
    template: "%s | Stackbiite"
  },
  description: "Stackbiite is a premier web design and development agency specializing in modern, responsive websites and digital solutions that drive business growth.",
  keywords: "web design, web development, agency, responsive design, digital solutions, e-commerce, React, Next.js",
  authors: [{ name: "Stackbiite" }],
  creator: "Stackbiite",
  publisher: "Stackbiite",
  metadataBase: new URL('https://stackbiite.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stackbiite.com',
    siteName: 'Stackbiite',
    title: 'Stackbiite - Web Design & Development Agency',
    description: 'Premier web design and development agency creating modern, responsive digital solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stackbiite - Web Design Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stackbiite - Web Design & Development Agency',
    description: 'Premier web design and development agency creating modern, responsive digital solutions.',
    images: ['/og-image.jpg'],
    creator: '@stackbiite',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-poppins">
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}