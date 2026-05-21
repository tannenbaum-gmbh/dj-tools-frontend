'use client'

import { useMemo, useState } from 'react'

interface EquipmentItem {
  id: number
  name: string
  quantity: number
  weightKg: number
  lengthCm: number
  widthCm: number
  heightCm: number
}

const createEquipmentItem = (id: number): EquipmentItem => ({
  id,
  name: '',
  quantity: 1,
  weightKg: 0,
  lengthCm: 0,
  widthCm: 0,
  heightCm: 0,
})

const MAX_SAFE_VALUE = Number.MAX_SAFE_INTEGER

export default function EquipmentCalculatorPage() {
  const [nextId, setNextId] = useState(3)
  const [items, setItems] = useState<EquipmentItem[]>([
    { id: 1, name: 'CDJ', quantity: 2, weightKg: 4.3, lengthCm: 32, widthCm: 41, heightCm: 11 },
    { id: 2, name: 'Mixer', quantity: 1, weightKg: 3.6, lengthCm: 33, widthCm: 41, heightCm: 11 },
  ])

  const totalWeightKg = useMemo(
    () =>
      items.reduce((total, item) => {
        const itemWeight = item.quantity * item.weightKg
        const safeItemWeight = Number.isFinite(itemWeight)
          ? Math.min(itemWeight, MAX_SAFE_VALUE)
          : MAX_SAFE_VALUE
        return Math.min(total + safeItemWeight, MAX_SAFE_VALUE)
      }, 0),
    [items],
  )

  const totalVolumeCm3 = useMemo(
    () =>
      items.reduce((total, item) => {
        const itemVolume = item.quantity * item.lengthCm * item.widthCm * item.heightCm
        const safeItemVolume = Number.isFinite(itemVolume)
          ? Math.min(itemVolume, MAX_SAFE_VALUE)
          : MAX_SAFE_VALUE
        return Math.min(total + safeItemVolume, MAX_SAFE_VALUE)
      }, 0),
    [items],
  )

  const totalVolumeM3 = totalVolumeCm3 / 1_000_000

  const updateItem = (id: number, field: keyof EquipmentItem, value: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item
        }

        if (field === 'name') {
          return { ...item, name: value }
        }

        const numericValue = Number(value)

        if (field === 'quantity') {
          const quantityValue = Math.floor(numericValue)
          return {
            ...item,
            quantity:
              Number.isFinite(quantityValue) && quantityValue >= 1
                ? Math.min(quantityValue, MAX_SAFE_VALUE)
                : 1,
          }
        }

        return {
          ...item,
          [field]:
            Number.isFinite(numericValue) && numericValue >= 0
              ? Math.min(numericValue, MAX_SAFE_VALUE)
              : 0,
        }
      }),
    )
  }

  const addItem = () => {
    setItems((currentItems) => [...currentItems, createEquipmentItem(nextId)])
    setNextId((id) => id + 1)
  }

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            📦 Equipment Size & Weight Calculator
          </h1>
          <p className="text-gray-600 mb-8">
            Estimate transport load by entering equipment quantity, weight, and dimensions.
          </p>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Equipment</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Qty</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Weight (kg)</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Length (cm)</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Width (cm)</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Height (cm)</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(event) => updateItem(item.id, 'name', event.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="e.g. Controller"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={1}
                          step={1}
                          value={item.quantity}
                          onChange={(event) => updateItem(item.id, 'quantity', event.target.value)}
                          className="w-24 rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          step="0.1"
                          value={item.weightKg}
                          onChange={(event) => updateItem(item.id, 'weightKg', event.target.value)}
                          className="w-28 rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          step="0.1"
                          value={item.lengthCm}
                          onChange={(event) => updateItem(item.id, 'lengthCm', event.target.value)}
                          className="w-28 rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          step="0.1"
                          value={item.widthCm}
                          onChange={(event) => updateItem(item.id, 'widthCm', event.target.value)}
                          className="w-28 rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          step="0.1"
                          value={item.heightCm}
                          onChange={(event) => updateItem(item.id, 'heightCm', event.target.value)}
                          className="w-28 rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        {items.length === 1 ? (
                          <span id={`remove-item-help-${item.id}`} className="sr-only">
                            Cannot remove the last equipment item.
                          </span>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          aria-describedby={items.length === 1 ? `remove-item-help-${item.id}` : undefined}
                          aria-label={
                            items.length === 1
                              ? 'Cannot remove the last equipment item'
                              : `Remove ${item.name || 'equipment item'}`
                          }
                          className="text-sm text-red-600 hover:text-red-700 disabled:text-gray-400"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                + Add Equipment
              </button>

              <div className="text-sm sm:text-base text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Total Weight:</span> {totalWeightKg.toFixed(2)} kg
                </p>
                <p>
                  <span className="font-semibold">Total Volume:</span> {totalVolumeCm3.toFixed(0)} cm³ ({totalVolumeM3.toFixed(3)} m³)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
