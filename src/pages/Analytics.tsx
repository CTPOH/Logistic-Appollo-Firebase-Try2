import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { AnalyticsFilters } from '../components/analytics/AnalyticsFilters';
import { StatCard } from '../components/analytics/StatCard';
import { PerformanceChart } from '../components/analytics/PerformanceChart';
import type { AnalyticsFilters as Filters, DeliveryAnalytics } from '../types/analytics';

// Mock data - replace with API call
const mockAnalytics: DeliveryAnalytics = {
  totalBaskets: 1250,
  successRate: 94.5,
  supplierPerformance: [
    { supplier: 'Supplier A', totalBaskets: 450 },
    { supplier: 'Supplier B', totalBaskets: 380 },
    { supplier: 'Supplier C', totalBaskets: 220 },
    { supplier: 'Supplier D', totalBaskets: 200 },
  ],
  locationAnalysis: [
    { location: 'Jakarta', deliveries: 320 },
    { location: 'Surabaya', deliveries: 280 },
    { location: 'Medan', deliveries: 180 },
    { location: 'Bandung', deliveries: 150 },
  ],
  deliveryTrend: [
    { date: '2024-03-01', deliveries: 42 },
    { date: '2024-03-02', deliveries: 38 },
    { date: '2024-03-03', deliveries: 45 },
  ],
};

export const Analytics: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    dateRange: {
      startDate: '2024-03-01',
      endDate: '2024-03-31',
    },
  });

  const handleApplyFilters = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call with filters
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">
            Track and analyze delivery performance metrics
          </p>
        </div>

        <AnalyticsFilters
          filters={filters}
          onFilterChange={setFilters}
          onApplyFilters={handleApplyFilters}
          isLoading={isLoading}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Baskets"
            value={mockAnalytics.totalBaskets}
            trend="up"
            trendValue="8.2%"
          />
          <StatCard
            title="Success Rate"
            value={`${mockAnalytics.successRate}%`}
            trend="up"
            trendValue="2.1%"
          />
          <StatCard
            title="Average Delivery Time"
            value="2.3 days"
            trend="down"
            trendValue="0.5 days"
          />
          <StatCard
            title="Active Suppliers"
            value={mockAnalytics.supplierPerformance.length}
          />
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PerformanceChart
            title="Supplier Performance"
            data={mockAnalytics.supplierPerformance.map((item) => ({
              label: item.supplier,
              value: item.totalBaskets,
            }))}
          />
          <PerformanceChart
            title="Location Analysis"
            data={mockAnalytics.locationAnalysis.map((item) => ({
              label: item.location,
              value: item.deliveries,
            }))}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};