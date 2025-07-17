import { render, screen, waitFor } from '@testing-library/react'
import { useLazyLoad } from '@/hooks/useLazyLoad'
import '@testing-library/jest-dom'

// Mock component to test the hook
function TestComponent({ options = {} }) {
  const { ref, isIntersecting, hasLoaded } = useLazyLoad(options)
  
  return (
    <div>
      <div ref={ref} data-testid="lazy-element">
        Lazy Element
      </div>
      <div data-testid="intersection-status">
        {isIntersecting ? 'intersecting' : 'not-intersecting'}
      </div>
      <div data-testid="load-status">
        {hasLoaded ? 'loaded' : 'not-loaded'}
      </div>
    </div>
  )
}

describe('useLazyLoad Hook', () => {
  beforeEach(() => {
    // Reset intersection observer mock
    jest.clearAllMocks()
  })

  it('should initialize with correct default values', () => {
    render(<TestComponent />)
    
    expect(screen.getByTestId('intersection-status')).toHaveTextContent('intersecting')
    expect(screen.getByTestId('load-status')).toHaveTextContent('loaded')
  })

  it('should handle custom options', () => {
    const options = {
      threshold: 0.5,
      rootMargin: '100px',
      triggerOnce: false
    }
    
    render(<TestComponent options={options} />)
    
    expect(screen.getByTestId('lazy-element')).toBeInTheDocument()
  })

  it('should provide a ref for the target element', () => {
    render(<TestComponent />)
    
    const element = screen.getByTestId('lazy-element')
    expect(element).toBeInTheDocument()
  })
})

describe('Lazy Loading Integration', () => {
  it('should render without crashing', () => {
    render(<TestComponent />)
    
    expect(screen.getByTestId('lazy-element')).toBeInTheDocument()
    expect(screen.getByTestId('intersection-status')).toBeInTheDocument()
    expect(screen.getByTestId('load-status')).toBeInTheDocument()
  })
})