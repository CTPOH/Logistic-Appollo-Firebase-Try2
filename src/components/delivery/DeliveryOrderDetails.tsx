import React from 'react';
import { MapPin, Calendar, Package, Truck } from 'lucide-react';
import { useDeliveryStore } from '../../store/deliveryStore';
import { formatDate, formatWeight } from '../../utils/formatters';

interface DeliveryOrderDetailsProps {
  orderId: string;
}

export const DeliveryOrderDetails: React.FC<DeliveryOrderDetailsProps> = ({ orderId }) => {
  const { deliveryOrders } = useDeliveryStore();
  const order = deliveryOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        Order not found
      </div>
    );
  }

  const totalBaskets = order.baskets.reduce((sum, basket) => sum + basket.quantity, 0);
  const totalWeight = order.baskets.reduce(
    (sum, basket) => sum + basket.basketType * basket.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Order {order.id}
            </h2>
            <p className="text-gray-500 mt-1">Created on {formatDate(order.createdAt)}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            On The Way
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Supplier Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Supplier</h3>
          <p className="text-gray-700">{order.supplierName}</p>
        </div>

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">From</h3>
            </div>
            <p className="text-gray-700">{order.departureLocation}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">To</h3>
            </div>
            <p className="text-gray-700">{order.destinationLocation}</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">Departure</h3>
            </div>
            <p className="text-gray-700">{formatDate(order.departureDateTime)}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">Expected Delivery</h3>
            </div>
            <p className="text-gray-700">{formatDate(order.expectedDeliveryDateTime)}</p>
          </div>
        </div>

        {/* Basket Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Basket Details</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Baskets</p>
                <p className="text-xl font-semibold text-gray-900">{totalBaskets}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Weight</p>
                <p className="text-xl font-semibold text-gray-900">{formatWeight(totalWeight)}</p>
              </div>
            </div>
            <div className="space-y-3">
              {order.baskets.map((basket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {formatWeight(basket.basketType)} - {basket.grade}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {basket.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {formatWeight(basket.basketType * basket.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};