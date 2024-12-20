export interface MapLocation {
  id: string;
  name: string;
  type: 'departure' | 'destination' | 'truck';
  coordinates: [number, number];
  status?: 'on-time' | 'delayed';
  deliveryOrder?: {
    id: string;
    supplier: string;
    estimatedDelivery: string;
  };
}

export interface MapRoute {
  id: string;
  from: MapLocation;
  to: MapLocation;
  status: 'on-time' | 'delayed';
  coordinates: [number, number][];
}