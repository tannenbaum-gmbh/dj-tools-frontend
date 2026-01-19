export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

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

// Generate mock reviews for products
export const MOCK_REVIEWS: Review[] = [
  // Reviews for DJ Controller X1000 (id: '1')
  { id: 'r1', productId: '1', author: 'DJ Mike', rating: 5, title: 'Amazing controller!', comment: 'This is the best DJ controller I\'ve ever used. The motorized jog wheels feel incredibly responsive.', date: '2026-01-15' },
  { id: 'r2', productId: '1', author: 'Sarah M.', rating: 4, title: 'Great quality', comment: 'Very solid build quality and great features. Only wish it had more effects controls.', date: '2026-01-14' },
  { id: 'r3', productId: '1', author: 'Alex T.', rating: 5, title: 'Professional grade', comment: 'Perfect for club use. The 4-channel layout is exactly what I needed.', date: '2026-01-12' },
  { id: 'r4', productId: '1', author: 'Chris P.', rating: 4, title: 'Worth the investment', comment: 'Expensive but worth every penny. Takes your mixing to the next level.', date: '2026-01-10' },
  { id: 'r5', productId: '1', author: 'Emma K.', rating: 5, title: 'Exceeded expectations', comment: 'I was hesitant about the price, but this controller exceeded all my expectations.', date: '2026-01-08' },
  { id: 'r6', productId: '1', author: 'Ryan L.', rating: 5, title: 'Industry standard', comment: 'This is becoming the industry standard for a reason. Absolutely fantastic.', date: '2026-01-05' },
  { id: 'r7', productId: '1', author: 'Nicole B.', rating: 4, title: 'Great for beginners too', comment: 'Even as a beginner, I found this controller intuitive and easy to learn on.', date: '2026-01-03' },
  { id: 'r8', productId: '1', author: 'Tom W.', rating: 5, title: 'Reliable and durable', comment: 'Used this for 6 months now in various venues. Never let me down once.', date: '2026-01-01' },
  { id: 'r9', productId: '1', author: 'Lisa H.', rating: 4, title: 'Good software integration', comment: 'Works seamlessly with all major DJ software. Very impressed.', date: '2025-12-28' },
  { id: 'r10', productId: '1', author: 'Mark D.', rating: 5, title: 'Best purchase of 2025', comment: 'Hands down the best piece of DJ equipment I bought this year.', date: '2025-12-25' },
  { id: 'r11', productId: '1', author: 'Jennifer S.', rating: 5, title: 'Amazing sound quality', comment: 'The audio output is crystal clear. No latency issues whatsoever.', date: '2025-12-20' },
  { id: 'r12', productId: '1', author: 'Kevin R.', rating: 4, title: 'Solid controller', comment: 'Very happy with this purchase. Would recommend to any serious DJ.', date: '2025-12-15' },
  
  // Reviews for Studio Monitor Pro 5 (id: '2')
  { id: 'r13', productId: '2', author: 'Producer Joe', rating: 5, title: 'Crystal clear sound', comment: 'These monitors have incredible clarity. Perfect for mixing and mastering.', date: '2026-01-16' },
  { id: 'r14', productId: '2', author: 'Amy L.', rating: 4, title: 'Great value', comment: 'Excellent sound quality for the price. Very happy with this purchase.', date: '2026-01-13' },
  { id: 'r15', productId: '2', author: 'David K.', rating: 5, title: 'Studio quality', comment: 'Professional studio quality at home. These are amazing!', date: '2026-01-11' },
  { id: 'r16', productId: '2', author: 'Rachel M.', rating: 5, title: 'Highly recommend', comment: 'Best monitors in this price range. Highly recommend to anyone.', date: '2026-01-09' },
  { id: 'r17', productId: '2', author: 'Steve P.', rating: 4, title: 'Good bass response', comment: 'The bass response is surprisingly good for 5-inch monitors.', date: '2026-01-07' },
  { id: 'r18', productId: '2', author: 'Laura B.', rating: 5, title: 'Perfect for home studio', comment: 'Exactly what I needed for my home studio setup.', date: '2026-01-04' },
  
  // Reviews for Headphones Z-Series (id: '3')
  { id: 'r19', productId: '3', author: 'DJ Chris', rating: 5, title: 'Comfortable and clear', comment: 'Super comfortable for long sessions and excellent sound isolation.', date: '2026-01-17' },
  { id: 'r20', productId: '3', author: 'Maria G.', rating: 4, title: 'Good isolation', comment: 'Great noise isolation. Perfect for loud club environments.', date: '2026-01-14' },
  { id: 'r21', productId: '3', author: 'Paul T.', rating: 5, title: 'Professional quality', comment: 'These headphones are professional quality. Worth every penny.', date: '2026-01-11' },
  { id: 'r22', productId: '3', author: 'Jessica W.', rating: 4, title: 'Solid build', comment: 'Very solid construction. Feel like they\'ll last for years.', date: '2026-01-08' },
  
  // Reviews for Synthesizer Analog V (id: '4')
  { id: 'r23', productId: '4', author: 'SynthLover', rating: 5, title: 'Warm analog sound', comment: 'The warm analog sound is exactly what I was looking for. Incredible synth!', date: '2026-01-18' },
  { id: 'r24', productId: '4', author: 'Robert H.', rating: 5, title: 'Amazing versatility', comment: 'So many sound possibilities with this synth. Very versatile.', date: '2026-01-15' },
  { id: 'r25', productId: '4', author: 'Sophie N.', rating: 4, title: 'Great for live performance', comment: 'Perfect for live performances. The build quality is top-notch.', date: '2026-01-12' },
  { id: 'r26', productId: '4', author: 'Michael F.', rating: 5, title: 'Best analog synth', comment: 'Best analog synth I\'ve owned. The sound is pure and beautiful.', date: '2026-01-09' },
  { id: 'r27', productId: '4', author: 'Emily R.', rating: 5, title: 'Inspiring to play', comment: 'Every time I sit down with this synth, I create something new. So inspiring!', date: '2026-01-06' },
];
