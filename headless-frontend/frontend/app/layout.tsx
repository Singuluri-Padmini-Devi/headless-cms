import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { graphqlClient, HEADER_QUERY } from '@/lib/graphql'
import { HeaderResponse } from '@/types/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'crosslinkcapital.com',
  description: 'A modern headless CMS site built with WordPress and Next.js',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

async function getHeaderSettings() {
  try {
    const data = await graphqlClient.request<HeaderResponse>(HEADER_QUERY)
    return data.headerSettings
  } catch (error) {
    console.error('Error fetching header settings:', error)
    // Return the default settings if API fails
    return {
      navigation: [],
      buttons: [],
      sticky: true,
      transparent: false,
      style: 'white' as const,
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerSettings = await getHeaderSettings()

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Header settings={headerSettings} />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}