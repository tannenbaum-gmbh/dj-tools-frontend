import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-red-100 mb-6">
            🎛️ DJ Tools
          </h1>
          <p className="text-xl md:text-2xl text-red-200 mb-8 max-w-3xl mx-auto">
            Your ultimate destination for DJ equipment, software, and educational content.
            Master your craft with our comprehensive learning center.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tutorials"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              📚 Start Learning
            </Link>
            <Link
              href="/products"
              className="bg-transparent border-2 border-red-400 text-red-200 hover:bg-red-400 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              🛒 Browse Products
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="text-xl font-semibold text-red-100 mb-3">Premium Equipment</h3>
            <p className="text-red-200">
              Professional-grade DJ equipment from top brands worldwide.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-red-100 mb-3">Learning Center</h3>
            <p className="text-red-200">
              Comprehensive tutorials and guides for DJs of all skill levels.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-red-100 mb-3">AI Recommendations</h3>
            <p className="text-red-200">
              Smart suggestions tailored to your DJ style and preferences.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-red-100 mb-6">
            Ready to elevate your DJ game?
          </h2>
          <p className="text-lg text-red-200 mb-8 max-w-2xl mx-auto">
            Join thousands of DJs who have transformed their skills with our tutorials and equipment.
          </p>
          <Link
            href="/tutorials"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105 inline-block"
          >
            Explore Tutorials Now →
          </Link>
        </div>
      </main>
    </div>
  );
}
