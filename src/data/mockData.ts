// Mock data for the data management page
import type { Supplier, Location, BasketType, Grade, Size } from '../types/data-management';

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Supplier A',
    contact: 'John Doe',
    email: 'john@suppliera.com',
    address: 'Jakarta, Indonesia',
    active: true,
  },
  {
    id: '2',
    name: 'Supplier B',
    contact: 'Jane Smith',
    email: 'jane@supplierb.com',
    address: 'Surabaya, Indonesia',
    active: true,
  },
];

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Jakarta Port',
    type: 'departure',
    address: 'Tanjung Priok, Jakarta',
    active: true,
  },
  {
    id: '2',
    name: 'Guangzhou Port',
    type: 'destination',
    address: 'Guangzhou, China',
    active: true,
  },
];

export const mockBasketTypes: BasketType[] = [
  {
    id: '1',
    weight: 5,
    description: '5kg Standard Basket',
    active: true,
  },
  {
    id: '2',
    weight: 10,
    description: '10kg Large Basket',
    active: true,
  },
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    code: 'SP1',
    description: 'Premium Grade Mangosteen',
    active: true,
  },
  {
    id: '2',
    code: 'SP2',
    description: 'Standard Grade Mangosteen',
    active: true,
  },
];

export const mockSizes: Size[] = [
  {
    id: '1',
    name: 'Small',
    description: 'Small size mangosteen (50-60g)',
    active: true,
  },
  {
    id: '2',
    name: 'Medium',
    description: 'Medium size mangosteen (61-70g)',
    active: true,
  },
  {
    id: '3',
    name: 'Large',
    description: 'Large size mangosteen (71-80g)',
    active: true,
  },
];