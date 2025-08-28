'use client'

import { useState } from 'react'

interface MenuItem {
  id: string
  label: string
  href: string
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'equipment', label: 'Equipment', href: '/equipment' },
  { id: 'software', label: 'Software', href: '/software' },
  { id: 'accessories', label: 'Accessories', href: '/accessories' },
  { id: 'support', label: 'Support', href: '/support' },
]

export default function Navigation() {
  const [activeItem, setActiveItem] = useState('home')

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="flex items-center space-x-1">
              <h1 className="text-white text-xl font-bold">🎛️ DJ Tools</h1>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`py-4 px-2 text-white hover:text-white transition duration-300 ${
                    activeItem === item.id
                      ? 'border-b-4 border-green-400 bg-green-400/20'
                      : 'hover:border-b-4 hover:border-green-300 hover:bg-green-400/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}