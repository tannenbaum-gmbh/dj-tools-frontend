'use client';

import React, { useEffect, useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { MOCK_PRODUCTS, Product } from '../../lib/mockData';
import { ProductCard } from '../../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, simulatePriceDrop } = useWishlist();
  const [trackedProducts, setTrackedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Filter mock products to find the ones in the wishlist
    const products = MOCK_PRODUCTS.filter((p) =>
      wishlist.some((item) => item.productId === p.id)
    );
    setTrackedProducts(products);
  }, [wishlist]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <button
          onClick={simulatePriceDrop}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          Simulate Price Drop
        </button>
      </div>

      {trackedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Your wishlist is empty.</p>
          <p className="text-gray-500 mt-2">Start tracking products to get price alerts!</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trackedProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
