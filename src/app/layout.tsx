import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'DJ Tools Frontend',
  description: 'A modern e-commerce platform for DJ tools, equipment, and software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="flex">
            <aside className="w-64 bg-white shadow-sm min-h-screen">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
                <nav className="space-y-1">
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700">
                    File issues from screenshots
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700">
                    Product browsing
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700">
                    Mobile navigation
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700">
                    Search functionality
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700">
                    User profile
                  </a>
                </nav>
              </div>
            </aside>
            <div className="flex-1 p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}