export interface Product {
  id: string;
  name: string;
  description: string;
  currentPrice: number;
  originalPrice: number;
  image: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'DJ Controller X1000',
    description: 'Professional 4-channel DJ controller with motorized jog wheels.',
    currentPrice: 1299.99,
    originalPrice: 1299.99,
    image: 'https://placehold.co/600x400?text=DJ+Controller',
  },
  {
    id: '2',
    name: 'Studio Monitor Pro 5',
    description: 'Active near-field studio monitor with 5-inch woofer.',
    currentPrice: 149.99,
    originalPrice: 199.99,
    image: 'https://placehold.co/600x400?text=Studio+Monitor',
  },
  {
    id: '3',
    name: 'Headphones Z-Series',
    description: 'Closed-back professional monitoring headphones.',
    currentPrice: 89.99,
    originalPrice: 89.99,
    image: 'https://placehold.co/600x400?text=Headphones',
  },
  {
    id: '4',
    name: 'Synthesizer Analog V',
    description: 'Polyphonic analog synthesizer with 37 keys.',
    currentPrice: 599.99,
    originalPrice: 649.99,
    image: 'https://placehold.co/600x400?text=Synthesizer',
  },
];
