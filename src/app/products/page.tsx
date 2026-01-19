import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductCard } from '@/components/ProductCard';

export default function ProductsPage() {
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
            <span className="text-gray-600">Products</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
            <p className="text-lg text-gray-600">
              Browse our collection of professional DJ equipment and gear.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
