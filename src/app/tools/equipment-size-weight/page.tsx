import type { Metadata } from 'next';
import { EquipmentSizeWeightCalculator } from './EquipmentSizeWeightCalculator';

export const metadata: Metadata = {
  title: 'Equipment Size & Weight Calculator | DJ Tools',
  description: 'Calculate total weight, volume, and footprint of your DJ setup for transportation planning.',
};

export default function EquipmentSizeWeightPage() {
  return <EquipmentSizeWeightCalculator />;
}

