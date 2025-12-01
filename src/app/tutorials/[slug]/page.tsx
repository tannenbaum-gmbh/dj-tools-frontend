import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Tutorial {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  category: string
  emoji: string
  content: {
    introduction: string
    sections: {
      title: string
      content: string
      tips?: string[]
    }[]
    summary: string
    nextSteps: string[]
  }
}

const tutorials: { [key: string]: Tutorial } = {
  'basics-of-djing': {
    id: 'basics-of-djing',
    title: 'Basics of DJing',
    description: 'Learn the fundamental concepts of DJing including equipment overview, basic mixing techniques, and understanding BPM.',
    level: 'Beginner',
    duration: '15 min',
    category: 'Fundamentals',
    emoji: '🎵',
    content: {
      introduction: 'Welcome to the world of DJing! This tutorial will introduce you to the essential concepts and equipment you need to start your DJ journey.',
      sections: [
        {
          title: 'Understanding DJ Equipment',
          content: 'A basic DJ setup consists of turntables or CDJs, a mixer, and headphones. The turntables/CDJs play your music, the mixer allows you to blend between tracks, and headphones let you cue up the next song.',
          tips: [
            'Start with entry-level equipment to learn the basics',
            'Focus on understanding each component\'s function',
            'Practice with what you have - even software can teach fundamentals'
          ]
        },
        {
          title: 'BPM and Tempo',
          content: 'BPM (Beats Per Minute) is crucial in DJing. It determines how fast or slow a song is. Matching BPMs between tracks is essential for smooth mixing.',
          tips: [
            'Use software or apps to analyze BPMs of your tracks',
            'Practice counting beats manually to develop your ear',
            'Start with tracks that have similar BPMs'
          ]
        },
        {
          title: 'Basic Mixing Concepts',
          content: 'Mixing involves blending one song into another. This includes matching tempos, aligning beats, and using the crossfader or channel faders to transition between tracks.',
          tips: [
            'Start with simple cuts between tracks',
            'Practice beat matching before attempting longer blends',
            'Listen to professional DJs to understand different mixing styles'
          ]
        }
      ],
      summary: 'You\'ve learned the foundation of DJing including equipment basics, BPM concepts, and mixing fundamentals. These skills form the basis for all advanced techniques.',
      nextSteps: [
        'Practice beatmatching with our Beatmatching Mastery tutorial',
        'Learn about EQ and filters to improve your transitions',
        'Start building a music collection organized by BPM and genre'
      ]
    }
  },
  'beatmatching-guide': {
    id: 'beatmatching-guide',
    title: 'Beatmatching Mastery',
    description: 'Master the art of beatmatching - synchronizing the tempo of two tracks for seamless transitions.',
    level: 'Beginner',
    duration: '20 min',
    category: 'Mixing Techniques',
    emoji: '🎯',
    content: {
      introduction: 'Beatmatching is the cornerstone skill of DJing. It involves synchronizing the tempo and beats of two tracks so they play in perfect harmony.',
      sections: [
        {
          title: 'Understanding Beat Grids',
          content: 'Every song has a beat grid - a pattern of strong and weak beats. Learning to identify and align these grids is crucial for beatmatching.',
          tips: [
            'Use software\'s beat grid visualization to understand patterns',
            'Practice identifying the "1" beat (strongest beat in a measure)',
            'Start with tracks that have clear, steady beats'
          ]
        },
        {
          title: 'Manual Beatmatching Technique',
          content: 'Manual beatmatching involves using the pitch fader and jog wheel to match the tempo of the incoming track to the currently playing track.',
          tips: [
            'Use small pitch adjustments (±2-3%) to start',
            'Listen carefully to both tracks in your headphones',
            'Practice the nudge technique with the jog wheel'
          ]
        },
        {
          title: 'Sync vs Manual',
          content: 'While modern software offers sync functions, learning manual beatmatching develops your ear and makes you a more skilled DJ.',
          tips: [
            'Learn manual beatmatching first, then use sync as a tool',
            'Practice in situations where sync might fail',
            'Understand that great DJs can beatmatch by ear alone'
          ]
        }
      ],
      summary: 'Beatmatching is a skill that improves with practice. Start with similar BPM tracks and gradually challenge yourself with more complex rhythms.',
      nextSteps: [
        'Practice with different genres and BPM ranges',
        'Learn EQ and filter techniques for smoother transitions',
        'Explore harmonic mixing to complement your beatmatching skills'
      ]
    }
  },
  'eq-and-filters': {
    id: 'eq-and-filters',
    title: 'EQ and Filters',
    description: 'Understand how to use equalizers and filters to create smooth transitions and dynamic mixes.',
    level: 'Intermediate',
    duration: '25 min',
    category: 'Mixing Techniques',
    emoji: '🎛️',
    content: {
      introduction: 'EQ and filters are powerful tools that allow you to shape the sound of your mix and create seamless transitions between tracks.',
      sections: [
        {
          title: 'Understanding EQ Basics',
          content: 'EQ (equalizer) allows you to adjust different frequency ranges: bass (low), mids (middle), and treble (high). Each knob controls a specific frequency band.',
          tips: [
            'Start with subtle adjustments - a little goes a long way',
            'Cut frequencies rather than boost to avoid distortion',
            'Use EQ to make room for elements from both tracks'
          ]
        },
        {
          title: 'EQ Mixing Techniques',
          content: 'Use EQ to blend tracks by removing competing frequencies. For example, cut the bass from the incoming track while the current track\'s bass plays.',
          tips: [
            'Practice the "bass swap" technique for seamless transitions',
            'Use high-pass filters to gradually introduce new tracks',
            'Experiment with creative EQ sweeps for dramatic effects'
          ]
        },
        {
          title: 'Filter Effects',
          content: 'Filters remove or emphasize certain frequencies. High-pass filters remove low frequencies, while low-pass filters remove high frequencies.',
          tips: [
            'Use filters to build tension and energy in your sets',
            'Combine filters with EQ for more complex transitions',
            'Practice filter automation for smooth, hands-free effects'
          ]
        }
      ],
      summary: 'EQ and filters are essential for professional-sounding mixes. They help you blend tracks seamlessly and add creative flair to your sets.',
      nextSteps: [
        'Experiment with different EQ curves and filter settings',
        'Learn about harmonic mixing to complement your EQ skills',
        'Practice advanced filter techniques like resonance and feedback'
      ]
    }
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tutorial = tutorials[params.slug]
  
  if (!tutorial) {
    return {
      title: 'Tutorial Not Found | DJ Tools Frontend'
    }
  }

  return {
    title: `${tutorial.title} | DJ Tutorials`,
    description: tutorial.description,
  }
}

function getLevelColor(level: string) {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800'
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800'
    case 'Advanced':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = tutorials[params.slug]

  if (!tutorial) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-purple-600 hover:text-purple-800">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/tutorials" className="text-purple-600 hover:text-purple-800">Tutorials</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{tutorial.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tutorial Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-6xl">{tutorial.emoji}</span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getLevelColor(tutorial.level)}`}>
                {tutorial.level}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tutorial.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {tutorial.description}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded">{tutorial.category}</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {tutorial.duration}
              </span>
            </div>
          </div>

          {/* Tutorial Content */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-8">{tutorial.content.introduction}</p>

              {tutorial.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {index + 1}. {section.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{section.content}</p>
                  
                  {section.tips && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
                      <ul className="list-disc list-inside text-blue-800 space-y-1">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded mb-8">
                <h3 className="text-xl font-semibold text-green-900 mb-4">🎯 Summary</h3>
                <p className="text-green-800">{tutorial.content.summary}</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">🚀 Next Steps</h3>
                <ul className="list-disc list-inside text-purple-800 space-y-2">
                  {tutorial.content.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link
              href="/tutorials"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
            >
              ← Back to Tutorials
            </Link>
            <Link
              href="/tutorials"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Explore More Tutorials →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}