import { Timestamp } from 'firebase/firestore';

export interface SupplierPerformance {
  totalShipments: number;
  delayedShipments: number;
  averageDeliveryTime: number;
}

export interface RoutePerformance {
  totalShipments: number;
  averageTime: number;
  delays: number;
}

export interface AnalyticsDaily {
  id: string;
  date: Timestamp;
  totalShipments: number;
  activeShipments: number;
  completedShipments: number;
  delayedShipments: number;
  averageDeliveryTime: number;
  onTimeDeliveryRate: number;
  totalWeight: number;
  averageWeight: number;
  averageTemperature: number;
  temperatureViolations: number;
  supplierPerformance: Record<string, SupplierPerformance>;
  routePerformance: Record<string, RoutePerformance>;
}