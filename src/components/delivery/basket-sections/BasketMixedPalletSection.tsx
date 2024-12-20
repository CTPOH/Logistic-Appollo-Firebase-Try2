import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { useDataStore } from '../../../store/dataStore';
import type { BasketMixedPallet } from '../../../types/delivery';

interface BasketMixedPalletSectionProps {
  baskets: BasketMixedPallet[];
  onChange: (baskets: BasketMixedPallet[]) => void;
}

export const BasketMixedPalletSection: React.FC<BasketMixedPalletSectionProps> = ({
  baskets,
  onChange,
}) => {
  const { grades, sizes } = useDataStore();
  const activeGrades = grades.filter(g => g.active);
  const activeSizes = sizes.filter(s => s.active);

  const addBasket = () => {
    if (baskets.length < 5) {
      onChange([
        ...baskets,
        {
          id: Date.now().toString(),
          grade: '',
          label: '',
          sizes: [],
        },
      ]);
    }
  };

  const removeBasket = (id: string) => {
    onChange(baskets.filter(b => b.id !== id));
  };

  const updateBasket = (id: string, field: keyof BasketMixedPallet, value: any) => {
    onChange(
      baskets.map(basket =>
        basket.id === id ? { ...basket, [field]: value } : basket
      )
    );
  };

  const updateSize = (basketId: string, size: string, count: number) => {
    onChange(
      baskets.map(basket => {
        if (basket.id !== basketId) return basket;
        
        const existingSize = basket.sizes.find(s => s.size === size);
        const newSizes = existingSize
          ? basket.sizes.map(s => s.size === size ? { ...s, count } : s)
          : [...basket.sizes, { size, count }];
        
        return { ...basket, sizes: newSizes };
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Mixed Pallet</h4>
        {baskets.length < 5 && (
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

      <div className="space-y-4">
        {baskets.map((basket) => (
          <div key={basket.id} className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-[30%_50%_20%] gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <Input
                  value={basket.label}
                  onChange={(e) => updateBasket(basket.id, 'label', e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeBasket(basket.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size Distribution
              </label>
              <div className="grid grid-cols-5 gap-4">
                {activeSizes.slice(0, 5).map((size) => (
                  <div key={size.id}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {size.name}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={basket.sizes.find(s => s.size === size.name)?.count || 0}
                      onChange={(e) => updateSize(basket.id, size.name, parseInt(e.target.value) || 0)}
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};