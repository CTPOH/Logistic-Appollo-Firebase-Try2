import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GroupedForwardingOrders } from '../components/delivery/GroupedForwardingOrders';
import { useDeliveryStore } from '../store/deliveryStore';

export const ForwardingOrders: React.FC = () => {
  const { deliveryOrders } = useDeliveryStore();
  const forwardingOrders = deliveryOrders.filter(order => order.status === 'forwarding');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forwarding Vessel Orders</h1>
          <p className="text-gray-600">View orders grouped by forwarding vessel</p>
        </div>

        {forwardingOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No forwarding vessel orders found
          </div>
        ) : (
          <GroupedForwardingOrders orders={forwardingOrders} />
        )}
      </div>
    </DashboardLayout>
  );
};