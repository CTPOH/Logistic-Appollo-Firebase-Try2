import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { useDataStore } from '../../../store/dataStore';
import type { BasketInPallet } from '../../../types/delivery';

interface BasketInPalletSectionProps {
  baskets: BasketInPallet[];
  onChange: (baskets: BasketInPallet[]) => void;
}

export const BasketInPalletSection: React.FC<BasketInPalletSectionProps> = ({
  baskets,
  onChange,
}) => {
  const { grades, sizes } = useDataStore();
  const activeGrades = grades.filter(g => g.active);
  const activeSizes = sizes.filter(s => s.active);

  const addBasket = () => {
    if (baskets.length < 20) {
      onChange([
        ...baskets,
        {
          id: Date.now().toString(),
          grade: '',
          basketsPerPallet: 0,
          label: '',
          size: '',
          palletCount: 0,
        },
      ]);
    }
  };

  const removeBasket = (id: string) => {
    onChange(baskets.filter(b => b.id !== id));
  };

  const updateBasket = (id: string, field: keyof BasketInPallet, value: any) => {
    onChange(
      baskets.map(basket =>
        basket.id === id ? { ...basket, [field]: value } : basket
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">In Pallet</h4>
        {baskets.length < 20 && (
          <Button
            type="button"
            onClick={addBasket}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </Button>
        )}
      </div>

      {baskets.length > 0 && (
        <div className="grid grid-cols-[15%_20%_25%_15%_15%_10%] gap-2 text-sm font-medium text-gray-700 mb-2">
          <div>Grade</div>
          <div>Baskets/Pallet</div>
          <div>Label</div>
          <div>Size</div>
          <div>Pallet Count</div>
          <div></div>
        </div>
      )}

      <div className="space-y-2">
        {baskets.map((basket) => (
          <div key={basket.id} className="grid grid-cols-[15%_20%_25%_15%_15%_10%] gap-2 items-center">
            <select
              value={basket.grade}
              onChange={(e) => updateBasket(basket.id, 'grade', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">Select Grade</option>
              {activeGrades.map((grade) => (
                <option key={grade.id} value={grade.code}>
                  {grade.code}
                </option>
              ))}
            </select>

            <Input
              type="number"
              min="0"
              value={basket.basketsPerPallet}
              onChange={(e) => updateBasket(basket.id, 'basketsPerPallet', parseInt(e.target.value) || 0)}
              className="text-sm"
            />

            <Input
              value={basket.label}
              onChange={(e) => updateBasket(basket.id, 'label', e.target.value)}
              className="text-sm"
            />

            <select
              value={basket.size}
              onChange={(e) => updateBasket(basket.id, 'size', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">Select Size</option>
              {activeSizes.map((size) => (
                <option key={size.id} value={size.name}>
                  {size.name}
                </option>
              ))}
            </select>

            <Input
              type="number"
              min="0"
              value={basket.palletCount}
              onChange={(e) => updateBasket(basket.id, 'palletCount', parseInt(e.target.value) || 0)}
              className="text-sm"
            />

            <button
              type="button"
              onClick={() => removeBasket(basket.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};