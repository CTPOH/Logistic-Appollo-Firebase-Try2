import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LogisticsMap } from '../components/map/LogisticsMap';
import type { MapLocation, MapRoute } from '../types/map';

// Mock data - replace with API calls
const mockLocations: MapLocation[] = [
  {
    id: '1',
    name: 'Jakarta Port',
    type: 'departure',
    coordinates: [-6.131, 106.813],
  },
  {
    id: '2',
    name: 'Guangzhou Port',
    type: 'destination',
    coordinates: [23.129, 113.253],
  },
  {
    id: '3',
    name: 'Truck #1',
    type: 'truck',
    coordinates: [-3.654, 108.123],
    status: 'on-time',
    deliveryOrder: {
      id: 'DO001',
      supplier: 'Supplier A',
      estimatedDelivery: '2024-03-20T14:00:00Z',
    },
  },
  {
    id: '4',
    name: 'Truck #2',
    type: 'truck',
    coordinates: [-2.987, 107.456],
    status: 'delayed',
    deliveryOrder: {
      id: 'DO002',
      supplier: 'Supplier B',
      estimatedDelivery: '2024-03-19T16:00:00Z',
    },
  },
];

const mockRoutes: MapRoute[] = [
  {
    id: '1',
    from: mockLocations[0],
    to: mockLocations[1],
    status: 'on-time',
    coordinates: [
      [-6.131, 106.813],
      [23.129, 113.253],
    ],
  },
  {
    id: '2',
    from: mockLocations[2],
    to: mockLocations[1],
    status: 'delayed',
    coordinates: [
      [-3.654, 108.123],
      [23.129, 113.253],
    ],
  },
];

export const Map: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logistics Map</h1>
          <p className="text-gray-600">Track shipment routes and locations in real-time</p>
        </div>

        <LogisticsMap locations={mockLocations} routes={mockRoutes} />
      </div>
    </DashboardLayout>
  );
};