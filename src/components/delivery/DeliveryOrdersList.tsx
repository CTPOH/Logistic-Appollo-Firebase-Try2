import React from 'react';
import { Truck, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import type { DeliveryOrder } from '../../types/delivery';

interface DeliveryOrdersListProps {
  orders: DeliveryOrder[];
  selectedOrderId: string | null;
  onSelectOrder: (id: string) => void;
}

export const DeliveryOrdersList: React.FC<DeliveryOrdersListProps> = ({
  orders,
  selectedOrderId,
  onSelectOrder,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Active Orders</h2>
      </div>
      <div className="divide-y">
        {orders.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No active orders found
          </div>
        ) : (
          orders.map((order) => (
            <button
              key={order.id}
              onClick={() => onSelectOrder(order.id)}
              className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                selectedOrderId === order.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.supplierName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(order.expectedDeliveryDateTime)}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};