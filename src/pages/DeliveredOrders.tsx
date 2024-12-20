import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DeliveredOrderCard } from '../components/delivery/DeliveredOrderCard';
import { useDeliveryStore } from '../store/deliveryStore';

export const DeliveredOrders: React.FC = () => {
  const { deliveryOrders } = useDeliveryStore();
  const deliveredOrders = deliveryOrders.filter(order => order.status === 'delivered');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivered Orders</h1>
          <p className="text-gray-600">View completed delivery orders</p>
        </div>

        {deliveredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No delivered orders found
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {deliveredOrders.map((order) => (
              <DeliveredOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};