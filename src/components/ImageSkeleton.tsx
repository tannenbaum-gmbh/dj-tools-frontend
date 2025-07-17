'use client';

interface ImageSkeletonProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageSkeleton({ 
  width = 400, 
  height = 300, 
  className = '' 
}: ImageSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
      style={{ width, height }}
    >
      <div className="flex items-center justify-center h-full">
        <svg
          className="w-12 h-12 text-gray-400 dark:text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}