import React from 'react';
import { CheckCircle } from 'lucide-react';
import { formatDateLabel } from '../../utils/formatters';
import type { DeliveryOrder } from '../../types/delivery';

interface DeliveredOrderHeaderProps {
  order: DeliveryOrder;
}

export const DeliveredOrderHeader: React.FC<DeliveredOrderHeaderProps> = ({ order }) => {
  return (
    <div className="px-3 py-2 bg-gray-50 border-b flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="bg-green-100 p-1 rounded-full">
          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium text-gray-900">{order.id}</h2>
            <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
              Delivered
            </span>
          </div>
          <div className="text-xs space-y-0.5">
            <p className="text-gray-500">
              {formatDateLabel('Created', order.createdAt)}
            </p>
            <p className="text-gray-500">
              {formatDateLabel('Delivered', order.completion?.actualArrivalTime || '')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};