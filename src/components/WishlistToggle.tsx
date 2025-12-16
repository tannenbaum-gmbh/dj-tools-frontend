'use client';

import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../lib/mockData';

interface WishlistToggleProps {
  product: Product;
}

export const WishlistToggle = ({ product }: WishlistToggleProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isTracked = isInWishlist(product.id);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isTracked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-full transition-colors ${
        isTracked ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-gray-600 hover:text-red-500 hover:bg-gray-100'
      }`}
      aria-label={isTracked ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill={isTracked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};
