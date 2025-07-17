export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  images: string[];
  brand: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
}

export interface LazyLoadState {
  isLoaded: boolean;
  hasError: boolean;
  isIntersecting: boolean;
}