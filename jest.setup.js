import '@testing-library/jest-dom'

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }

  observe() {
    // Immediately trigger the callback with a mocked entry
    this.callback([{
      isIntersecting: true,
      target: document.createElement('div')
    }])
  }

  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockedImage({ src, alt, ...props }) {
    return React.createElement('img', { src, alt, ...props })
  }
})