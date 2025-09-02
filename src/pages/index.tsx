import Head from 'next/head'
import TableOfContents from '../components/TableOfContents'

export default function Home() {
  return (
    <>
      <Head>
        <title>DJ Tools Frontend - Menu Highlight Demo</title>
        <meta name="description" content="DJ Tools Frontend with corrected menu highlight colors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="flex">
          <TableOfContents />
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              DJ Tools Frontend
            </h1>
            <p className="text-gray-700 mb-4">
              This demonstrates the corrected menu highlight color. The Table of Contents menu on the left now uses light green highlighting instead of pale blue.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Menu Highlight Color Fix</h2>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Selected menu items now show light green background</li>
                <li>✅ Hover states use a slightly darker green for better feedback</li>
                <li>✅ Colors are consistent with the design system</li>
                <li>✅ Improved visibility and user experience</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}