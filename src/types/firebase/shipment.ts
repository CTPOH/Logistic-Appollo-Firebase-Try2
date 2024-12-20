import { Timestamp } from 'firebase/firestore';

export interface ShipmentLocation {
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface VesselDetails {
  type: 'sea-container' | 'air-flight';
  vesselNumber: string;
  containerId?: string;
  sealNumber?: string;
}

export interface StatusHistoryEntry {
  status: string;
  timestamp: Timestamp;
  updatedBy: string;
  notes?: string;
}

export interface Shipment {
  id: string;
  orderNumber: string;
  supplierName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  currentStatus: 'pending' | 'in-transit' | 'delayed' | 'delivered' | 'forwarding';
  statusHistory: StatusHistoryEntry[];
  origin: ShipmentLocation;
  destination: ShipmentLocation;
  departureTime: Timestamp;
  estimatedArrival: Timestamp;
  actualArrival?: Timestamp;
  totalWeight: number;
  temperature?: number;
  vesselDetails?: VesselDetails;
  assignedUsers: string[];
  createdBy: string;
}

export interface ShipmentUpdate {
  id: string;
  timestamp: Timestamp;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  temperature?: number;
  notes?: string;
  updatedBy: string;
}

export interface ShipmentBasket {
  id: string;
  type: 'in-pallet' | 'mixed-pallet' | 'non-pallet';
  grade: string;
  quantity: number;
  basketsPerPallet?: number;
  palletCount?: number;
  label: string;
  size: string;
  weight: number;
}