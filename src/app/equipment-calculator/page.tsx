'use client';

import React, { useState } from 'react';
import { EQUIPMENT_ITEMS, Equipment } from '@/lib/equipmentData';

interface SelectedEquipment {
  equipment: Equipment;
  quantity: number;
}

export default function EquipmentCalculatorPage() {
  const [selectedItems, setSelectedItems] = useState<SelectedEquipment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [useImperial, setUseImperial] = useState(false);

  const categories = ['All', 'Controller', 'Speaker', 'Turntable', 'Mixer', 'Lighting', 'Monitor', 'Accessory'];

  const filteredEquipment = selectedCategory === 'All'
    ? EQUIPMENT_ITEMS
    : EQUIPMENT_ITEMS.filter(item => item.category === selectedCategory);

  const addEquipment = (equipment: Equipment) => {
    const existingIndex = selectedItems.findIndex(item => item.equipment.id === equipment.id);

    if (existingIndex >= 0) {
      const updated = [...selectedItems];
      updated[existingIndex].quantity += 1;
      setSelectedItems(updated);
    } else {
      setSelectedItems([...selectedItems, { equipment, quantity: 1 }]);
    }
  };

  const updateQuantity = (equipmentId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedItems(selectedItems.filter(item => item.equipment.id !== equipmentId));
    } else {
      setSelectedItems(selectedItems.map(item =>
        item.equipment.id === equipmentId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeEquipment = (equipmentId: string) => {
    setSelectedItems(selectedItems.filter(item => item.equipment.id !== equipmentId));
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  // Calculate totals
  const totalWeight = selectedItems.reduce(
    (sum, item) => sum + (item.equipment.weight * item.quantity),
    0
  );

  const totalVolume = selectedItems.reduce(
    (sum, item) => {
      const { width, height, depth } = item.equipment.dimensions;
      const volumeCm3 = width * height * depth;
      return sum + (volumeCm3 * item.quantity);
    },
    0
  );

  // Convert units
  const cmToInches = (cm: number) => cm / 2.54;
  const kgToLbs = (kg: number) => kg * 2.20462;
  const cm3ToFt3 = (cm3: number) => cm3 / 28316.8;

  const displayWeight = useImperial ? kgToLbs(totalWeight) : totalWeight;
  const displayVolume = useImperial ? cm3ToFt3(totalVolume) : totalVolume / 1000000; // Convert cm³ to m³
  const weightUnit = useImperial ? 'lbs' : 'kg';
  const volumeUnit = useImperial ? 'ft³' : 'm³';

  const displayDimension = (cm: number) => useImperial ? cmToInches(cm).toFixed(1) : cm.toFixed(1);
  const dimensionUnit = useImperial ? 'in' : 'cm';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              📦 Equipment Size & Weight Calculator
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Calculate the total size and weight of your DJ setup for transportation planning.
              Perfect for planning tours, gigs, and equipment logistics.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Equipment Library */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Equipment Library</h2>
                <div className="flex items-center gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredEquipment.map((equipment) => (
                  <div
                    key={equipment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => addEquipment(equipment)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{equipment.emoji}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{equipment.name}</h3>
                          <span className="text-xs text-gray-500">{equipment.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>
                        Weight: {displayDimension(equipment.weight)} {useImperial ? 'lbs' : 'kg'}
                      </div>
                      <div>
                        Size: {displayDimension(equipment.dimensions.width)} × {displayDimension(equipment.dimensions.height)} × {displayDimension(equipment.dimensions.depth)} {dimensionUnit}
                      </div>
                    </div>
                    <button
                      className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        addEquipment(equipment);
                      }}
                    >
                      Add to Setup
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Selected Equipment & Totals */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Summary Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Your Setup</h2>
                  <button
                    onClick={() => setUseImperial(!useImperial)}
                    className="text-sm text-blue-600 hover:text-blue-700 underline"
                  >
                    {useImperial ? 'Metric' : 'Imperial'}
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Weight</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {displayWeight.toFixed(2)} {weightUnit}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Volume</div>
                    <div className="text-3xl font-bold text-purple-600">
                      {displayVolume.toFixed(2)} {volumeUnit}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Items</div>
                    <div className="text-3xl font-bold text-green-600">
                      {selectedItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </div>
                  </div>
                </div>

                {/* Selected Items List */}
                {selectedItems.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Equipment List</h3>
                      <button
                        onClick={clearAll}
                        className="text-xs text-red-600 hover:text-red-700 underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {selectedItems.map((item) => (
                        <div
                          key={item.equipment.id}
                          className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-xl">{item.equipment.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-gray-900 truncate">
                                  {item.equipment.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {(item.equipment.weight * item.quantity).toFixed(2)} {useImperial ? 'lbs' : 'kg'}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeEquipment(item.equipment.id)}
                              className="text-red-500 hover:text-red-700 text-lg ml-2"
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.equipment.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-bold transition-colors"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.equipment.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="1"
                            />
                            <button
                              onClick={() => updateQuantity(item.equipment.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No equipment selected</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Click on items to add them to your setup
                    </p>
                  </div>
                )}
              </div>

              {/* Transportation Tips */}
              {selectedItems.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Transportation Tips</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {totalWeight > 100 && (
                      <li>• Consider a van or truck for this load</li>
                    )}
                    {totalWeight > 50 && totalWeight <= 100 && (
                      <li>• A large vehicle recommended</li>
                    )}
                    {totalWeight <= 50 && (
                      <li>• Can fit in most vehicles</li>
                    )}
                    {selectedItems.length > 10 && (
                      <li>• Plan for multiple trips or helpers</li>
                    )}
                    <li>• Always secure equipment properly</li>
                    <li>• Account for cases and padding</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">📊 Plan Your Transportation</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Use this calculator to plan your equipment transportation needs. Knowing the total weight
              and volume helps you choose the right vehicle, estimate costs, and ensure safe transport.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
