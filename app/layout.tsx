
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './AuthProvider'
import NavMenu from './navMenu'
import { ZIndexProvider } from '@/components/zIndexContext'
import { BrowserView, MobileView } from 'react-device-detect';

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Alex Pickett',
  description: 'Shit about me I guess',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">

        <body className={inter.className}>

            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
            <NavMenu />
            <ZIndexProvider>
              {children}
            </ZIndexProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
