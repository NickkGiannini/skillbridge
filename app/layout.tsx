import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ICSB Academy — Empowering Futures with AI',
  description:
    'A decentralized AI-powered corporate academy connecting vulnerable workers with MSMEs through direct-to-hire upskilling and AI-generated corporate courses.',
  generator: 'v0.app',
  keywords: [
    'AI academy',
    'upskilling',
    'MSME training',
    'corporate learning',
    'direct hire',
    'AI courses',
    'worker empowerment',
  ],
  authors: [{ name: 'ICSB Academy' }],
  openGraph: {
    title: 'ICSB Academy — Empowering Futures with AI',
    description:
      'A direct-to-hire upskilling platform connecting vulnerable workers with MSMEs through AI-generated corporate academies.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#a7c7e7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
