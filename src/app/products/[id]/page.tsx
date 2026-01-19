'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '@/lib/mockData';
import { WishlistToggle } from '@/components/WishlistToggle';

const REVIEWS_PER_PAGE = 5;

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id);
  const productReviews = MOCK_REVIEWS.filter((r) => r.productId === params.id);
  
  const [currentPage, setCurrentPage] = useState(1);

  if (!product) {
    notFound();
  }

  // Calculate pagination
  const totalPages = Math.ceil(productReviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const currentReviews = productReviews.slice(startIndex, endIndex);

  // Calculate average rating (memoized)
  const averageRating = useMemo(() => {
    return productReviews.length > 0
      ? (productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length).toFixed(1)
      : '0';
  }, [productReviews]);

  // Generate page buttons (memoized)
  const pageButtons = useMemo(() => 
    Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-purple-600 hover:text-purple-800">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-purple-600 hover:text-purple-800">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>

                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    {renderStars(Number(averageRating))}
                  </div>
                  <span className="text-gray-600">
                    {averageRating} out of 5 ({productReviews.length} reviews)
                  </span>
                </div>

                <div className="flex items-center mb-6">
                  <span className="text-4xl font-bold text-blue-600 mr-4">
                    ${product.currentPrice}
                  </span>
                  {product.originalPrice > product.currentPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Add to Cart
                  </button>
                  <WishlistToggle product={product} />
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

            {productReviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            ) : (
              <>
                {/* Reviews List */}
                <div className="space-y-6 mb-8">
                  {currentReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{review.title}</h3>
                          <p className="text-sm text-gray-600">
                            by {review.author} on {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Previous
                    </button>

                    {pageButtons.map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Page Info */}
                <div className="text-center mt-4 text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, productReviews.length)} of{' '}
                  {productReviews.length} reviews
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
