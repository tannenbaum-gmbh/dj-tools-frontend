import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DJ Tools Frontend',
  description: 'E-commerce platform for DJ tools, equipment, and software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}