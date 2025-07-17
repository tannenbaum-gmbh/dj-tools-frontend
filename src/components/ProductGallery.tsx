'use client';

import { useState } from 'react';
import LazyImage from './LazyImage';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  priority?: boolean;
}

export default function ProductGallery({
  images,
  productName,
  priority = false,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative">
        <LazyImage
          src={images[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          width={600}
          height={450}
          className="w-full"
          priority={priority && selectedImageIndex === 0}
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <LazyImage
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={100}
                height={75}
                className="w-24 h-18"
                priority={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          {selectedImageIndex + 1} of {images.length} images
        </div>
      )}
    </div>
  );
}