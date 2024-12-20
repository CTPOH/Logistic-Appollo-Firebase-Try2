import React, { useState } from 'react';
import { MapPin, Calendar, Package, CheckCircle, Thermometer } from 'lucide-react';
import { ForwardingModal } from './ForwardingModal';
import { useDeliveryStore } from '../../store/deliveryStore';
import { formatDate, formatWeight, formatTemperature } from '../../utils/formatters';
import type { DeliveryOrder } from '../../types/delivery';

interface DeliveredOrderCardProps {
  order: DeliveryOrder;
}

const getComparisonColor = (actual: number, expected: number): string => {
  if (actual === expected) return 'text-green-600';
  if (actual < expected) return 'text-red-600';
  return 'text-yellow-600';
};

export const DeliveredOrderCard: React.FC<DeliveredOrderCardProps> = ({ order }) => {
  const [isForwardingModalOpen, setIsForwardingModalOpen] = useState(false);

  // Calculate expected totals
  const expectedTotalBaskets = order.baskets.reduce((sum, basket) => sum + basket.quantity, 0);
  const expectedTotalWeight = order.baskets.reduce(
    (sum, basket) => sum + basket.basketType * basket.quantity,
    0
  );

  // Calculate actual totals
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
      <div className="bg-white rounded-lg shadow-sm border text-sm">
        {/* Header */}
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
                <p className="text-gray-500">Created: {formatDate(order.createdAt)}</p>
                <p className="text-gray-500">Delivered: {formatDate(order.completion?.actualArrivalTime || '')}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setIsForwardingModalOpen(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              Forwarding Vessel
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 grid grid-cols-3 gap-4">
          {/* Left Column - Basic Info */}
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
                <span className="text-gray-500">Expected Arrival:</span>
              </div>
              <p className="font-medium ml-4">{formatDate(order.expectedDeliveryDateTime)}</p>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-500">Actual Arrival:</span>
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
            <div className="bg-gray-50 p-2 rounded">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Expected</p>
                  <p className="font-medium">{expectedTotalBaskets} baskets</p>
                  <p className="font-medium">{formatWeight(expectedTotalWeight)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Actual</p>
                  <p className={`font-medium ${totalBasketsColor}`}>
                    {actualTotalBaskets} baskets
                  </p>
                  <p className={`font-medium ${totalWeightColor}`}>
                    {formatWeight(actualTotalWeight)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Basket Details */}
        <div className="px-3 pb-3">
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
                            {actualQuantity} baskets
                          </p>
                          <p className={`text-sm ${weightColor}`}>
                            ({formatWeight(actualWeight)})
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

      <ForwardingModal
        order={order}
        isOpen={isForwardingModalOpen}
        onClose={() => setIsForwardingModalOpen(false)}
      />
    </>
  );
};