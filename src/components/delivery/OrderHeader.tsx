import React from 'react';
import { Truck } from 'lucide-react';
import { formatDateLabel } from '../../utils/formatters';
import type { DeliveryOrder } from '../../types/delivery';

interface OrderHeaderProps {
  order: DeliveryOrder;
  onUpdate: () => void;
  onDelete: () => void;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order, onUpdate, onDelete }) => {
  return (
    <div className="px-3 py-2 bg-gray-50 border-b flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="bg-blue-100 p-1 rounded-full">
          <Truck className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium text-gray-900">{order.id}</h2>
            <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
              Active
            </span>
          </div>
          <div className="text-xs space-y-0.5">
            <p className="text-gray-500">
              {formatDateLabel('Created', order.createdAt)}
            </p>
            <p className="text-gray-500">
              {formatDateLabel('Departure', order.departureDateTime)}
            </p>
            <p className="text-gray-500">
              {formatDateLabel('ETA', order.expectedDeliveryDateTime)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-xs">
        <button
          onClick={onUpdate}
          className="text-blue-600 hover:text-blue-700"
        >
          Mark as Delivered
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};