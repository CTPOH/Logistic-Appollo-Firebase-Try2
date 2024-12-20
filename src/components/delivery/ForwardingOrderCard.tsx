import React, { useState } from 'react';
import { MapPin, Calendar, Package, Ship, Thermometer } from 'lucide-react';
import { useDeliveryStore } from '../../store/deliveryStore';
import { formatDate, formatWeight, formatTemperature } from '../../utils/formatters';
import { UpdateForwardingModal } from './UpdateForwardingModal';
import type { DeliveryOrder } from '../../types/delivery';

interface ForwardingOrderCardProps {
  order: DeliveryOrder;
  compact?: boolean;
}

const getComparisonColor = (actual: number, expected: number): string => {
  if (actual === expected) return 'text-green-600';
  if (actual < expected) return 'text-red-600';
  return 'text-yellow-600';
};

export const ForwardingOrderCard: React.FC<ForwardingOrderCardProps> = ({ 
  order,
  compact = false 
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Calculate totals
  const expectedTotalBaskets = order.baskets.reduce((sum, basket) => sum + basket.quantity, 0);
  const expectedTotalWeight = order.baskets.reduce(
    (sum, basket) => sum + basket.basketType * basket.quantity,
    0
  );
  const actualTotalBaskets = order.completion?.actualBaskets.reduce(
    (sum, basket) => sum + basket.quantity,
    0
  ) || 0;
  const actualTotalWeight = order.completion?.actualBaskets.reduce(
    (sum, basket) => sum + basket.basketType * basket.quantity,
    0
  ) || 0;

  // Get color classes for totals
  const totalBasketsColor = getComparisonColor(actualTotalBaskets, expectedTotalBaskets);
  const totalWeightColor = getComparisonColor(actualTotalWeight, expectedTotalWeight);

  return (
    <>
      <div className={`${compact ? 'border-0' : 'border rounded-lg'} bg-white shadow-sm`}>
        {/* Header */}
        <div className="px-4 py-3 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Order {order.id}
              </h3>
              <p className="text-xs text-gray-500">
                {order.supplierName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <p className={`font-medium ${totalWeightColor}`}>
                {formatWeight(actualTotalWeight)}
              </p>
              <p className={`text-xs ${totalBasketsColor}`}>
                {actualTotalBaskets} baskets
              </p>
            </div>
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 text-xs"
            >
              Update Status
            </button>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-4 grid grid-cols-3 gap-4 text-sm">
          {/* Left Column - Basic Info */}
          <div className="space-y-2">
            <div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">From:</span>
              </div>
              <p className="font-medium ml-4">{order.departureLocation}</p>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">To:</span>
              </div>
              <p className="font-medium ml-4">{order.destinationLocation}</p>
            </div>
          </div>

          {/* Middle Column - Schedule */}
          <div className="space-y-2">
            <div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Departure:</span>
              </div>
              <p className="font-medium ml-4">{formatDate(order.departureDateTime)}</p>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Delivered:</span>
              </div>
              <p className="font-medium ml-4">{formatDate(order.completion?.actualArrivalTime || '')}</p>
            </div>
          </div>

          {/* Right Column - Delivery Details */}
          <div className="space-y-2">
            <div>
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Temperature:</span>
              </div>
              <p className="font-medium ml-4">
                {formatTemperature(order.completion?.arrivalTemperature || 0)}
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <Ship className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Vessel:</span>
              </div>
              <p className="font-medium ml-4">
                {order.forwarding?.vesselType === 'sea-container' ? 'Container' : 'Flight'}: {order.forwarding?.vesselNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Basket Details */}
        <div className="px-4 pb-4">
          <div className="border-t pt-2 mt-2">
            <div className="grid gap-2">
              {order.baskets.map((basket, index) => {
                const actualBasket = order.completion?.actualBaskets[index];
                const actualQuantity = actualBasket?.quantity || 0;
                const actualWeight = (actualBasket?.basketType || 0) * actualQuantity;
                const expectedWeight = basket.basketType * basket.quantity;
                
                const quantityColor = getComparisonColor(actualQuantity, basket.quantity);
                const weightColor = getComparisonColor(actualWeight, expectedWeight);

                return (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-2 py-1 px-2 bg-gray-50 rounded"
                  >
                    {/* Expected */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Package className="w-3.5 h-3.5 text-gray-400" />
                        <div>
                          <span className="text-xs text-gray-500">Expected</span>
                          <p className="font-medium">
                            {formatWeight(basket.basketType)} - {basket.grade}
                          </p>
                          <p className="text-sm text-gray-500">
                            {basket.quantity} baskets ({formatWeight(expectedWeight)})
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actual */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Package className="w-3.5 h-3.5 text-gray-400" />
                        <div>
                          <span className="text-xs text-gray-500">Actual</span>
                          <p className="font-medium">
                            {formatWeight(actualBasket?.basketType || 0)} - {actualBasket?.grade}
                          </p>
                          <p className={`text-sm ${quantityColor}`}>
                            {actualQuantity} baskets ({formatWeight(actualWeight)})
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <UpdateForwardingModal
        order={order}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </>
  );
};