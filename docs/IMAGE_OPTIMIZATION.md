# Image Optimization with Next.js

## Overview

This project implements modern image optimization using Next.js's built-in Image component, which automatically serves images in WebP and AVIF formats with appropriate fallbacks for older browsers.

## Implementation Details

### 1. Next.js Configuration (`next.config.mjs`)

The Next.js configuration enables:
- **Next-gen formats**: AVIF and WebP formats are automatically served to supporting browsers
- **Remote image patterns**: Configured to allow images from external domains (e.g., `placehold.co`)

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'placehold.co',
    },
  ],
}
```

### 2. Image Component Usage (`src/components/ProductCard.tsx`)

Replaced standard `<img>` tags with Next.js `<Image>` component:

```tsx
import Image from 'next/image';

<Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>
```

**Key features**:
- `fill` prop: Makes the image fill its parent container
- `sizes` prop: Responsive image sizing for different screen widths
- `className="object-cover"`: Maintains aspect ratio and covers the container
- Automatic lazy loading
- Automatic optimization and format conversion

## How It Works

### Automatic Format Selection

When a browser requests an image, Next.js automatically:

1. **Detects browser capabilities** via the `Accept` header
2. **Serves the best format**:
   - AVIF for browsers that support it (best compression)
   - WebP for browsers that support it (good compression)
   - Original format (JPEG/PNG) for older browsers
3. **Optimizes the image** size based on the viewport
4. **Caches** optimized images for faster subsequent loads

### Browser Support

- **AVIF**: Chrome 85+, Firefox 93+, Safari 16.1+
- **WebP**: Chrome 23+, Firefox 65+, Safari 14+, Edge 18+
- **Fallback**: JPEG/PNG for all browsers

## Performance Benefits

1. **Smaller file sizes**: AVIF can be 50% smaller than JPEG, WebP 30% smaller
2. **Responsive images**: Only loads the size needed for the viewport
3. **Lazy loading**: Images load as they enter the viewport
4. **Reduced bandwidth**: Automatic compression and format optimization
5. **Better Core Web Vitals**: Improves LCP (Largest Contentful Paint) scores

## Adding More Images

When adding new images to the application:

### For External Images

Add the domain to `remotePatterns` in `next.config.mjs`:

```javascript
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'your-domain.com',
  },
]
```

### For Local Images

1. Place images in the `public` directory (e.g., `public/images/`)
2. Reference them with relative paths:

```tsx
<Image
  src="/images/your-image.jpg"
  alt="Description"
  width={600}
  height={400}
/>
```

## Testing

### In Development

Run the development server:
```bash
npm run dev
```

Check the Network tab in browser DevTools:
- Look for `/_next/image?url=...` requests
- Check the `Content-Type` header to verify format (should be `image/webp` or `image/avif`)

### In Production

Build and start the production server:
```bash
npm run build
npm start
```

Production builds include optimized images with better caching.

## Troubleshooting

### Images Not Loading

1. **Check remote patterns**: Ensure the image domain is configured in `next.config.mjs`
2. **Check CORS**: External image servers must allow cross-origin requests
3. **Check network**: Verify the image URL is accessible

### Images Not Optimized

1. **Check browser support**: Use DevTools to verify the `Accept` header includes `image/avif` or `image/webp`
2. **Check configuration**: Verify `formats` are properly set in `next.config.mjs`
3. **Clear cache**: Clear Next.js cache with `rm -rf .next`

## References

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Image Component API](https://nextjs.org/docs/app/api-reference/components/image)
- [WebP Format](https://developers.google.com/speed/webp)
- [AVIF Format](https://jakearchibald.com/2020/avif-has-landed/)
