import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { useDataStore } from '../../../store/dataStore';
import type { BasketNonPallet } from '../../../types/delivery';

interface BasketNonPalletSectionProps {
  baskets: BasketNonPallet[];
  onChange: (baskets: BasketNonPallet[]) => void;
}

export const BasketNonPalletSection: React.FC<BasketNonPalletSectionProps> = ({
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
          size: '',
          basketCount: 0,
          label: '',
        },
      ]);
    }
  };

  const removeBasket = (id: string) => {
    onChange(baskets.filter(b => b.id !== id));
  };

  const updateBasket = (id: string, field: keyof BasketNonPallet, value: any) => {
    onChange(
      baskets.map(basket =>
        basket.id === id ? { ...basket, [field]: value } : basket
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Non-Pallet</h4>
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
        <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-700 mb-2">
          <div className="col-span-3">Grade</div>
          <div className="col-span-3">Size</div>
          <div className="col-span-2">Basket Count</div>
          <div className="col-span-3">Label</div>
          <div className="col-span-1"></div>
        </div>
      )}

      <div className="space-y-2">
        {baskets.map((basket) => (
          <div key={basket.id} className="grid grid-cols-12 gap-2">
            <select
              value={basket.grade}
              onChange={(e) => updateBasket(basket.id, 'grade', e.target.value)}
              className="col-span-3 w-full px-2 py-1 border rounded"
            >
              <option value="">Select Grade</option>
              {activeGrades.map((grade) => (
                <option key={grade.id} value={grade.code}>
                  {grade.code}
                </option>
              ))}
            </select>

            <select
              value={basket.size}
              onChange={(e) => updateBasket(basket.id, 'size', e.target.value)}
              className="col-span-3 w-full px-2 py-1 border rounded"
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
              value={basket.basketCount}
              onChange={(e) => updateBasket(basket.id, 'basketCount', parseInt(e.target.value) || 0)}
              className="col-span-2"
            />

            <Input
              value={basket.label}
              onChange={(e) => updateBasket(basket.id, 'label', e.target.value)}
              className="col-span-3"
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => removeBasket(basket.id)}
              className="col-span-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};