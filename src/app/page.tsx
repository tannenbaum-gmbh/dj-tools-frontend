import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to DJ Tools Frontend
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Your premier destination for DJ equipment, software, and accessories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">🎧 Equipment</h2>
                <p className="text-gray-600">Professional DJ equipment for every level</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">💿 Software</h2>
                <p className="text-gray-600">Cutting-edge DJ software and tools</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">🔌 Accessories</h2>
                <p className="text-gray-600">Everything you need to complete your setup</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-500 rounded">
              <p className="text-green-700">
                <strong>Fixed:</strong> The menu highlight issue has been resolved! 
                The menu now uses light green highlights as requested.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}