'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type DimensionUnit = 'cm' | 'in';
type WeightUnit = 'kg' | 'lb';

type GearItem = {
  id: string;
  name: string;
  quantity: string;
  length: string;
  width: string;
  height: string;
  weight: string;
};

const CM_PER_IN = 2.54;
const KG_PER_LB = 0.45359237;
const FT3_PER_M3 = 35.3146667;
const FT2_PER_M2 = 10.7639104;

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseNonNegativeNumber(value: string) {
  if (value.trim() === '') return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function parsePositiveInteger(value: string) {
  if (value.trim() === '') return 0;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.floor(parsed));
}

function toCm(value: number, unit: DimensionUnit) {
  return unit === 'cm' ? value : value * CM_PER_IN;
}

function toKg(value: number, unit: WeightUnit) {
  return unit === 'kg' ? value : value * KG_PER_LB;
}

function fromKg(valueKg: number, unit: WeightUnit) {
  return unit === 'kg' ? valueKg : valueKg / KG_PER_LB;
}

function formatNumber(value: number, fractionDigits = 2) {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

const DEFAULT_ITEMS: GearItem[] = [
  {
    id: createId(),
    name: 'DJ Controller Case',
    quantity: '1',
    length: '80',
    width: '45',
    height: '15',
    weight: '9.5',
  },
  {
    id: createId(),
    name: 'Speaker (12")',
    quantity: '2',
    length: '40',
    width: '38',
    height: '65',
    weight: '18',
  },
  {
    id: createId(),
    name: 'Laptop Bag',
    quantity: '1',
    length: '40',
    width: '30',
    height: '10',
    weight: '2.5',
  },
];

function createEmptyItem(): GearItem {
  return {
    id: createId(),
    name: '',
    quantity: '1',
    length: '',
    width: '',
    height: '',
    weight: '',
  };
}

export function EquipmentSizeWeightCalculator() {
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>('cm');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [items, setItems] = useState<GearItem[]>(DEFAULT_ITEMS);

  const totals = useMemo(() => {
    let totalWeightKg = 0;
    let totalVolumeCm3 = 0;
    let totalFootprintCm2 = 0;
    let incompleteRows = 0;

    for (const item of items) {
      const quantity = parsePositiveInteger(item.quantity);
      const length = parseNonNegativeNumber(item.length);
      const width = parseNonNegativeNumber(item.width);
      const height = parseNonNegativeNumber(item.height);
      const weight = parseNonNegativeNumber(item.weight);

      if (
        quantity > 0 &&
        (item.name.trim() === '' ||
          item.length.trim() === '' ||
          item.width.trim() === '' ||
          item.height.trim() === '' ||
          item.weight.trim() === '')
      ) {
        incompleteRows += 1;
      }

      const lengthCm = toCm(length, dimensionUnit);
      const widthCm = toCm(width, dimensionUnit);
      const heightCm = toCm(height, dimensionUnit);
      const weightKg = toKg(weight, weightUnit);

      totalWeightKg += quantity * weightKg;

      const volumeCm3 = lengthCm * widthCm * heightCm;
      totalVolumeCm3 += quantity * volumeCm3;

      const footprintCm2 = lengthCm * widthCm;
      totalFootprintCm2 += quantity * footprintCm2;
    }

    const totalVolumeM3 = totalVolumeCm3 / 1_000_000;
    const totalVolumeL = totalVolumeCm3 / 1_000;
    const totalFootprintM2 = totalFootprintCm2 / 10_000;

    return {
      totalWeightKg,
      totalVolumeM3,
      totalVolumeL,
      totalFootprintM2,
      incompleteRows,
    };
  }, [dimensionUnit, items, weightUnit]);

  function updateItem(id: string, patch: Partial<GearItem>) {
    setItems((current) => current.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function addItem() {
    setItems((current) => [...current, createEmptyItem()]);
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((it) => it.id !== id));
  }

  function reset() {
    setDimensionUnit('cm');
    setWeightUnit('kg');
    setItems(DEFAULT_ITEMS);
  }

  const totalWeightInSelectedUnit = fromKg(totals.totalWeightKg, weightUnit);
  const totalWeightInOtherUnit = fromKg(totals.totalWeightKg, weightUnit === 'kg' ? 'lb' : 'kg');
  const otherWeightUnit = weightUnit === 'kg' ? 'lb' : 'kg';

  const totalVolumeFt3 = totals.totalVolumeM3 * FT3_PER_M3;
  const totalFootprintFt2 = totals.totalFootprintM2 * FT2_PER_M2;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="opacity-90">
                  <Link href="/tools" className="underline underline-offset-4 hover:opacity-90">
                    Tools
                  </Link>{' '}
                  / Equipment Size &amp; Weight
                </p>
                <h1 className="text-3xl md:text-5xl font-bold mt-2">🚚 Equipment Size &amp; Weight Calculator</h1>
                <p className="opacity-90 mt-3 max-w-2xl">
                  Estimate total weight, volume, and footprint of your DJ setup for transport planning.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={addItem}
                  className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  + Add item
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="bg-transparent border border-white/60 hover:bg-white/10 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm opacity-90 mb-2">Units</div>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2">
                    <span className="text-sm">Dimensions</span>
                    <select
                      className="text-gray-900 rounded px-2 py-1"
                      value={dimensionUnit}
                      onChange={(e) => setDimensionUnit(e.target.value as DimensionUnit)}
                    >
                      <option value="cm">cm</option>
                      <option value="in">in</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2">
                    <span className="text-sm">Weight</span>
                    <select
                      className="text-gray-900 rounded px-2 py-1"
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                    >
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm opacity-90 mb-2">Notes</div>
                <p className="text-sm opacity-90">
                  Volume and footprint are summed per item. Stacking and irregular shapes can change real-world space
                  needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3 w-[260px]">Item</th>
                    <th className="text-left font-semibold px-4 py-3 w-[90px]">Qty</th>
                    <th className="text-left font-semibold px-4 py-3 w-[120px]">L ({dimensionUnit})</th>
                    <th className="text-left font-semibold px-4 py-3 w-[120px]">W ({dimensionUnit})</th>
                    <th className="text-left font-semibold px-4 py-3 w-[120px]">H ({dimensionUnit})</th>
                    <th className="text-left font-semibold px-4 py-3 w-[140px]">Weight ({weightUnit})</th>
                    <th className="text-left font-semibold px-4 py-3 w-[110px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item.id} className="align-top">
                      <td className="px-4 py-3">
                        <input
                          value={item.name}
                          onChange={(e) => updateItem(item.id, { name: e.target.value })}
                          placeholder="e.g., Mixer case"
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          inputMode="numeric"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, { quantity: e.target.value })}
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          inputMode="decimal"
                          value={item.length}
                          onChange={(e) => updateItem(item.id, { length: e.target.value })}
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          inputMode="decimal"
                          value={item.width}
                          onChange={(e) => updateItem(item.id, { width: e.target.value })}
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          inputMode="decimal"
                          value={item.height}
                          onChange={(e) => updateItem(item.id, { height: e.target.value })}
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          inputMode="decimal"
                          value={item.weight}
                          onChange={(e) => updateItem(item.id, { weight: e.target.value })}
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 font-medium"
                          disabled={items.length <= 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 px-4 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">
                {totals.incompleteRows > 0 ? (
                  <span>
                    {totals.incompleteRows} row{totals.incompleteRows === 1 ? '' : 's'} incomplete (still counted as
                    zero where empty).
                  </span>
                ) : (
                  <span>All rows complete.</span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                Tip: enter case outer dimensions for more accurate vehicle space estimates.
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="text-sm text-gray-500">Total weight</div>
              <div className="text-2xl font-bold mt-1 text-gray-900">
                {formatNumber(totalWeightInSelectedUnit)} {weightUnit}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {formatNumber(totalWeightInOtherUnit)} {otherWeightUnit}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="text-sm text-gray-500">Total volume</div>
              <div className="text-2xl font-bold mt-1 text-gray-900">{formatNumber(totals.totalVolumeM3, 3)} m³</div>
              <div className="text-sm text-gray-500 mt-1">
                {formatNumber(totals.totalVolumeL)} L • {formatNumber(totalVolumeFt3)} ft³
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="text-sm text-gray-500">Total footprint</div>
              <div className="text-2xl font-bold mt-1 text-gray-900">{formatNumber(totals.totalFootprintM2, 3)} m²</div>
              <div className="text-sm text-gray-500 mt-1">{formatNumber(totalFootprintFt2)} ft²</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

