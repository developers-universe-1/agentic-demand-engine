import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'LeadFinder — AI-Powered Lead Intelligence',
  description: 'Open-source AI agent that monitors LinkedIn engagement, scores leads against your ICP, and enriches contacts with email and phone.',
  openGraph: {
    title: 'LeadFinder — AI-Powered Lead Intelligence',
    description: 'Open-source AI agent that monitors LinkedIn engagement, scores leads against your ICP, and enriches contacts with email and phone.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadFinder — AI-Powered Lead Intelligence',
    description: 'Open-source AI agent that monitors LinkedIn engagement, scores leads against your ICP, and enriches contacts with email and phone.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#e4e4e7',
              border: '1px solid #27272a',
            },
          }}
        />
      </body>
    </html>
  )
}
