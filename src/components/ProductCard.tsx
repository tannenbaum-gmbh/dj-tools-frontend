import React from 'react';
import { Product } from '../lib/mockData';
import { WishlistToggle } from './WishlistToggle';

interface ProductCardProps {
  product: Product;
  priceDropped?: boolean;
  dropPercent?: number;
}

export const ProductCard = ({ product, priceDropped, dropPercent }: ProductCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${priceDropped ? 'ring-2 ring-green-500' : ''}`}>
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
        {priceDropped && dropPercent && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Price Drop -{dropPercent}%
          </div>
        )}
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
