export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface AnalyticsFilters {
  dateRange: DateRange;
  supplier?: string;
  location?: string;
  basketType?: number;
  grade?: 'SP1' | 'SP2';
}

export interface DeliveryAnalytics {
  totalBaskets: number;
  successRate: number;
  supplierPerformance: {
    supplier: string;
    totalBaskets: number;
  }[];
  locationAnalysis: {
    location: string;
    deliveries: number;
  }[];
  deliveryTrend: {
    date: string;
    deliveries: number;
  }[];
}