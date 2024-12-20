// Update VesselDetails interface
export interface BasketInPallet {
  id: string;
  grade: string;
  basketsPerPallet: number;
  label: string;
  size: string;
  palletCount: number;
}

export interface BasketMixedPallet {
  id: string;
  grade: string;
  basketsPerPallet: number;
  label: string;
  sizes: Array<{
    size: string;
    count: number;
  }>;
}

export interface BasketNonPallet {
  id: string;
  grade: string;
  size: string;
  basketCount: number;
  label: string;
}

export interface VesselDetails {
  containerId?: string;
  vesselName?: string;
  doNumber?: string;
  sealNumber?: string;
  thermeterNumber?: string;
  containerTemperature?: number;
  basketsInPallet: BasketInPallet[];
  basketsMixedPallet: BasketMixedPallet[];
  basketsNonPallet: BasketNonPallet[];
}