import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { GradeSelector } from './GradeSelector';
import { useDataStore } from '../../store/dataStore';
import type { BasketEntry } from '../../types/delivery';

interface BasketEntryFormProps {
  entry: BasketEntry;
  index: number;
  onChange: (index: number, entry: BasketEntry) => void;
  onRemove: (index: number) => void;
  errors?: Record<string, string>;
}

export const BasketEntryForm: React.FC<BasketEntryFormProps> = ({
  entry,
  index,
  onChange,
  onRemove,
  errors = {},
}) => {
  const { basketTypes } = useDataStore();
  const activeBasketTypes = basketTypes.filter(b => b.active);

  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Basket Set #{index + 1}</h4>
        {index > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Basket Type
          </label>
          <select
            value={entry.basketType || ''}
            onChange={(e) => onChange(index, { ...entry, basketType: Number(e.target.value) })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[`baskets.${index}.basketType`] ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Select Basket Type</option>
            {activeBasketTypes.map((type) => (
              <option key={type.id} value={type.weight}>
                {type.weight}kg - {type.description}
              </option>
            ))}
          </select>
          {errors[`baskets.${index}.basketType`] && (
            <p className="mt-1 text-sm text-red-500">{errors[`baskets.${index}.basketType`]}</p>
          )}
        </div>

        <GradeSelector
          value={entry.grade}
          onChange={(grade) => onChange(index, { ...entry, grade: grade.code })}
          error={errors[`baskets.${index}.grade`]}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={entry.quantity || ''}
            onChange={(e) => onChange(index, { ...entry, quantity: Number(e.target.value) })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[`baskets.${index}.quantity`] ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors[`baskets.${index}.quantity`] && (
            <p className="mt-1 text-sm text-red-500">{errors[`baskets.${index}.quantity`]}</p>
          )}
        </div>
      </div>
    </div>
  );
};