import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatusCard } from '../components/dashboard/StatusCard';
import { QuickDeliveryForm } from '../components/dashboard/QuickDeliveryForm';
import { useDeliveryStore } from '../store/deliveryStore';

export const Dashboard: React.FC = () => {
  const { getDeliveryStats } = useDeliveryStore();
  const stats = getDeliveryStats();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Monitor your delivery orders and create new ones.</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard status="on-way" count={stats.onWay} />
          <StatusCard status="delivered" count={stats.delivered} />
          <StatusCard status="delayed" count={stats.delayed} />
          <StatusCard status="forwarding" count={stats.forwarding} />
        </div>

        {/* Quick Delivery Form */}
        <QuickDeliveryForm />
      </div>
    </DashboardLayout>
  );
};