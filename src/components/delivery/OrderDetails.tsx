import React from 'react';
import { MapPin, Calendar, Package } from 'lucide-react';
import { formatDate, formatWeight } from '../../utils/formatters';
import type { DeliveryOrder } from '../../types/delivery';

interface OrderDetailsProps {
  order: DeliveryOrder;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const totalBaskets = order.baskets.reduce((sum, basket) => sum + basket.quantity, 0);
  const totalWeight = order.baskets.reduce(
    (sum, basket) => sum + basket.basketType * basket.quantity,
    0
  );

  return (
    <div className="p-3 space-y-3 text-sm">
      <div className="grid grid-cols-2 gap-3">
        {/* Left Column */}
        <div className="space-y-2">
          <div>
            <span className="text-gray-500">Supplier:</span>
            <p className="font-medium">{order.supplierName}</p>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500">From:</span>
            </div>
            <p className="font-medium ml-5">{order.departureLocation}</p>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500">Departure:</span>
            </div>
            <p className="font-medium ml-5">{formatDate(order.departureDateTime)}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500">To:</span>
            </div>
            <p className="font-medium ml-5">{order.destinationLocation}</p>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500">ETA:</span>
            </div>
            <p className="font-medium ml-5">{formatDate(order.expectedDeliveryDateTime)}</p>
          </div>
          <div className="flex space-x-4">
            <div>
              <span className="text-gray-500">Total Baskets:</span>
              <p className="font-medium">{totalBaskets}</p>
            </div>
            <div>
              <span className="text-gray-500">Total Weight:</span>
              <p className="font-medium">{formatWeight(totalWeight)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Basket Details */}
      <div className="border-t pt-2 mt-2">
        <div className="grid gap-2">
          {order.baskets.map((basket, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-2">
                <Package className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-medium">
                  {formatWeight(basket.basketType)} - {basket.grade}
                </span>
                <span className="text-gray-500">
                  ({basket.quantity} baskets)
                </span>
              </div>
              <span className="font-medium">
                {formatWeight(basket.basketType * basket.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};