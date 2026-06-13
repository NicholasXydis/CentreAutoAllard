import '../globals.css';
import {Inter} from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="fr-CA" suppressHydrationWarning className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
