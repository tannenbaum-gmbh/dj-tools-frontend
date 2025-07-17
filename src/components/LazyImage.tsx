'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import ImageSkeleton from './ImageSkeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholderSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholderSrc,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, hasLoaded: shouldLoad } = useLazyLoad({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Show skeleton while not intersecting or loading
  if (!shouldLoad && !priority) {
    return (
      <div ref={ref} className={className}>
        <ImageSkeleton width={width} height={height} />
      </div>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <svg
            className="w-8 h-8 text-gray-400 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <ImageSkeleton width={width} height={height} />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholderSrc ? 'blur' : 'empty'}
        blurDataURL={placeholderSrc}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } rounded-lg object-cover`}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}