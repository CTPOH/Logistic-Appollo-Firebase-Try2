import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DeliveryOrderCard } from '../components/delivery/DeliveryOrderCard';
import { useDeliveryStore } from '../store/deliveryStore';
import { useDelayedOrders } from '../hooks/useDelayedOrders';

export const DelayedOrders: React.FC = () => {
  const { deliveryOrders } = useDeliveryStore();
  const delayedOrders = deliveryOrders.filter(order => order.status === 'delayed');

  // Use the hook to automatically check for delayed orders
  useDelayedOrders();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delayed Orders</h1>
          <p className="text-gray-600">View and manage delayed delivery orders</p>
        </div>

        {delayedOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No delayed orders found
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {delayedOrders.map((order) => (
              <DeliveryOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};