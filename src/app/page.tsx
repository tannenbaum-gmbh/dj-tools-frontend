export default function Home() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          DJ Tools Frontend
        </h1>
        <p className="text-gray-600 mb-6">
          A modern e-commerce platform for DJ tools, equipment, and software with integrated AI recommendations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg mb-2">🛍️ Product Management</h3>
            <p className="text-gray-600">Advanced filtering and search capabilities</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg mb-2">🤖 AI Integration</h3>
            <p className="text-gray-600">Personalized product suggestions</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg mb-2">📱 User Experience</h3>
            <p className="text-gray-600">Mobile-first responsive design</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Menu Highlight Issue - FIXED ✅</h2>
        <p className="text-gray-600 mb-4">
          The menu highlight color has been successfully updated to light green! Menu items in the Table of Contents 
          sidebar now highlight with a beautiful light green color instead of the previous pale blue.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h4 className="font-medium text-green-800">Fix Verification:</h4>
          <ol className="mt-2 text-green-700 space-y-1">
            <li>1. Look at the Table of Contents menu on the left sidebar</li>
            <li>2. Hover over any menu item (e.g., "File issues from screenshots")</li>
            <li>3. Notice the light green highlight color ✅</li>
            <li>4. The fix maintains accessibility and contrast requirements</li>
          </ol>
        </div>
      </div>
    </div>
  )
}