import React from 'react';
import { Product } from '../lib/mockData';
import { WishlistToggle } from './WishlistToggle';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {/* In a real app, use next/image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <WishlistToggle product={product} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600" aria-label={`Current price: $${product.currentPrice}`}>
            ${product.currentPrice}
          </span>
          {product.originalPrice > product.currentPrice && (
            <span className="text-sm text-gray-500 line-through" aria-label={`Original price: $${product.originalPrice}`}>
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
