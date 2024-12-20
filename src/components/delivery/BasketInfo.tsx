import React from 'react';
import { Package } from 'lucide-react';
import { formatWeight } from '../../utils/formatters';
import type { BasketEntry } from '../../types/delivery';

interface BasketInfoProps {
  basket: BasketEntry;
}

export const BasketInfo: React.FC<BasketInfoProps> = ({ basket }) => {
  const totalWeight = basket.basketType * basket.quantity;

  return (
    <div className="flex items-center justify-between p-2 bg-white rounded border">
      <div className="flex items-center space-x-2">
        <Package className="w-4 h-4 text-gray-400" />
        <div>
          <p className="text-sm font-medium text-gray-900">
            {formatWeight(basket.basketType)} - {basket.grade}
          </p>
          <p className="text-xs text-gray-500">
            Quantity: {basket.quantity}
          </p>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-700">
        {formatWeight(totalWeight)}
      </p>
    </div>
  );
};