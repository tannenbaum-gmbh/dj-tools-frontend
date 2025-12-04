import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DJ Tutorials & Learning Center | DJ Tools Frontend',
  description: 'Comprehensive DJ tutorials, guides, and best practices for DJs of all skill levels. Learn mixing, beatmatching, and advanced techniques.',
}

interface Tutorial {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  category: string
  emoji: string
}

const tutorials: Tutorial[] = [
  {
    id: 'basics-of-djing',
    title: 'Basics of DJing',
    description: 'Learn the fundamental concepts of DJing including equipment overview, basic mixing techniques, and understanding BPM.',
    level: 'Beginner',
    duration: '15 min',
    category: 'Fundamentals',
    emoji: '🎵'
  },
  {
    id: 'beatmatching-guide',
    title: 'Beatmatching Mastery',
    description: 'Master the art of beatmatching - synchronizing the tempo of two tracks for seamless transitions.',
    level: 'Beginner',
    duration: '20 min',
    category: 'Mixing Techniques',
    emoji: '🎯'
  },
  {
    id: 'eq-and-filters',
    title: 'EQ and Filters',
    description: 'Understand how to use equalizers and filters to create smooth transitions and dynamic mixes.',
    level: 'Intermediate',
    duration: '25 min',
    category: 'Mixing Techniques',
    emoji: '🎛️'
  },
  {
    id: 'harmonic-mixing',
    title: 'Harmonic Mixing',
    description: 'Learn to mix in key using the Camelot Wheel and harmonic mixing principles for professional-sounding sets.',
    level: 'Intermediate',
    duration: '30 min',
    category: 'Advanced Techniques',
    emoji: '🎼'
  },
  {
    id: 'scratching-basics',
    title: 'Scratching Fundamentals',
    description: 'Introduction to turntablism and basic scratching techniques including baby scratch and scribble.',
    level: 'Intermediate',
    duration: '35 min',
    category: 'Turntablism',
    emoji: '💿'
  },
  {
    id: 'live-performance',
    title: 'Live Performance Tips',
    description: 'Essential tips for performing live, reading the crowd, and handling technical issues during gigs.',
    level: 'Advanced',
    duration: '40 min',
    category: 'Performance',
    emoji: '🎤'
  },
  {
    id: 'digital-dj-software',
    title: 'Digital DJ Software Guide',
    description: 'Comprehensive overview of popular DJ software including Serato, Traktor, and Virtual DJ.',
    level: 'Beginner',
    duration: '25 min',
    category: 'Software',
    emoji: '💻'
  },
  {
    id: 'audio-production',
    title: 'Audio Production for DJs',
    description: 'Learn basic audio production techniques to create your own edits, remixes, and mashups.',
    level: 'Advanced',
    duration: '45 min',
    category: 'Production',
    emoji: '🎚️'
  }
]

const categories = ['All', 'Fundamentals', 'Mixing Techniques', 'Advanced Techniques', 'Turntablism', 'Performance', 'Software', 'Production']
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

function getLevelColor(level: string) {
  switch (level) {
    case 'Beginner':
      return 'bg-red-100 text-red-800'
    case 'Intermediate':
      return 'bg-red-200 text-red-900'
    case 'Advanced':
      return 'bg-red-300 text-red-900'
    default:
      return 'bg-red-100 text-red-800'
  }
}

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-100">
              📚 DJ Learning Center
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-red-200">
              Master the art of DJing with our comprehensive tutorials, guides, and best practices.
              From beginner basics to advanced techniques.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-red-600 mb-2">{tutorials.length}</div>
            <div className="text-red-600">Total Tutorials</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {tutorials.filter(t => t.level === 'Beginner').length}
            </div>
            <div className="text-red-600">Beginner</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {tutorials.filter(t => t.level === 'Intermediate').length}
            </div>
            <div className="text-red-600">Intermediate</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-red-700 mb-2">
              {tutorials.filter(t => t.level === 'Advanced').length}
            </div>
            <div className="text-red-600">Advanced</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-red-700">Filter Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-red-700 mb-2">Category</label>
              <select className="w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700">
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-red-700 mb-2">Skill Level</label>
              <select className="w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700">
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{tutorial.emoji}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(tutorial.level)}`}>
                    {tutorial.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-red-900">
                  {tutorial.title}
                </h3>
                
                <p className="text-red-600 mb-4 text-sm">
                  {tutorial.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-red-500 mb-4">
                  <span className="bg-red-100 px-2 py-1 rounded text-red-700">{tutorial.category}</span>
                  <span>⏱️ {tutorial.duration}</span>
                </div>
                
                <Link
                  href={`/tutorials/${tutorial.id}`}
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 px-4 rounded-md transition-colors font-medium"
                >
                  Start Tutorial
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path Section */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-red-100">🎯 Recommended Learning Path</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto text-red-200">
              New to DJing? Follow our structured learning path designed to take you from beginner to advanced DJ.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">1️⃣</div>
                <h3 className="font-semibold text-red-100">Foundation</h3>
                <p className="text-sm opacity-80 text-red-200">Basic equipment & mixing</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">2️⃣</div>
                <h3 className="font-semibold text-red-100">Technique</h3>
                <p className="text-sm opacity-80 text-red-200">EQ, filters & transitions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">3️⃣</div>
                <h3 className="font-semibold text-red-100">Mastery</h3>
                <p className="text-sm opacity-80 text-red-200">Advanced skills & performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}