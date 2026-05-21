import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tools | DJ Tools',
  description: 'Utility tools for DJs, including setup planning calculators.',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold">🧰 Tools</h1>
            <p className="opacity-90 mt-3 max-w-2xl">
              Practical utilities for planning gigs, packing, and optimizing your setup.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/tools/equipment-size-weight"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <div className="text-3xl">🚚</div>
              <h2 className="text-xl font-bold mt-3 text-gray-900 group-hover:text-purple-700 transition-colors">
                Equipment Size &amp; Weight
              </h2>
              <p className="text-gray-600 mt-2">
                Calculate total weight, volume, and footprint of your DJ setup for transportation planning.
              </p>
              <div className="mt-4 font-semibold text-purple-700">Open calculator →</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

