import { Product } from '@/types/product';

export function generateSampleProducts(): Product[] {
  const categories = ['Turntables', 'Mixers', 'Controllers', 'Speakers', 'Headphones', 'Software'];
  const brands = ['Pioneer DJ', 'Technics', 'Native Instruments', 'Serato', 'Allen & Heath', 'JBL'];
  
  const products: Product[] = [];

  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10; // Rating between 3.0 and 5.0
    const reviewCount = Math.floor(Math.random() * 500) + 10;
    const price = Math.round((Math.random() * 2000 + 100) * 100) / 100; // Price between $100 and $2100
    
    // Use placeholder images with different dimensions to test lazy loading
    const baseImageUrl = 'https://picsum.photos';
    const imageId = 1000 + i;
    const mainImage = `${baseImageUrl}/400/300?random=${imageId}`;
    
    // Generate multiple images for gallery
    const imageCount = Math.floor(Math.random() * 4) + 2; // 2-5 images
    const images = [];
    for (let j = 0; j < imageCount; j++) {
      images.push(`${baseImageUrl}/400/300?random=${imageId + j}`);
    }

    products.push({
      id: `product-${i}`,
      name: `${brand} ${category} Model ${i}`,
      description: `Professional ${category.toLowerCase()} designed for modern DJs. Features advanced technology, high-quality construction, and intuitive controls for seamless mixing and performance.`,
      price,
      category,
      imageUrl: mainImage,
      images,
      brand,
      inStock: Math.random() > 0.1, // 90% chance of being in stock
      rating,
      reviewCount,
    });
  }

  return products;
}

export function getProductById(id: string): Product | undefined {
  const products = generateSampleProducts();
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  const products = generateSampleProducts();
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const products = generateSampleProducts();
  const lowercaseQuery = query.toLowerCase();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}