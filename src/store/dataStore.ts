import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Supplier, Location, BasketType, Grade, Size } from '../types/data-management';
import { mockSuppliers, mockLocations, mockBasketTypes, mockGrades, mockSizes } from '../data/mockData';

interface DataState {
  suppliers: Supplier[];
  locations: Location[];
  basketTypes: BasketType[];
  grades: Grade[];
  sizes: Size[];
  
  // Suppliers
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (supplier: Supplier) => void;
  deleteSupplier: (id: string) => void;
  
  // Locations
  addLocation: (location: Location) => void;
  updateLocation: (location: Location) => void;
  deleteLocation: (id: string) => void;
  
  // Basket Types
  addBasketType: (basketType: BasketType) => void;
  updateBasketType: (basketType: BasketType) => void;
  deleteBasketType: (id: string) => void;
  
  // Grades
  addGrade: (grade: Grade) => void;
  updateGrade: (grade: Grade) => void;
  deleteGrade: (id: string) => void;

  // Sizes
  addSize: (size: Size) => void;
  updateSize: (size: Size) => void;
  deleteSize: (id: string) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      suppliers: mockSuppliers,
      locations: mockLocations,
      basketTypes: mockBasketTypes,
      grades: mockGrades,
      sizes: mockSizes,

      // Suppliers
      addSupplier: (supplier) =>
        set((state) => ({
          suppliers: [...state.suppliers, supplier],
        })),
      updateSupplier: (supplier) =>
        set((state) => ({
          suppliers: state.suppliers.map((s) =>
            s.id === supplier.id ? supplier : s
          ),
        })),
      deleteSupplier: (id) =>
        set((state) => ({
          suppliers: state.suppliers.filter((s) => s.id !== id),
        })),

      // Locations
      addLocation: (location) =>
        set((state) => ({
          locations: [...state.locations, location],
        })),
      updateLocation: (location) =>
        set((state) => ({
          locations: state.locations.map((l) =>
            l.id === location.id ? location : l
          ),
        })),
      deleteLocation: (id) =>
        set((state) => ({
          locations: state.locations.filter((l) => l.id !== id),
        })),

      // Basket Types
      addBasketType: (basketType) =>
        set((state) => ({
          basketTypes: [...state.basketTypes, basketType],
        })),
      updateBasketType: (basketType) =>
        set((state) => ({
          basketTypes: state.basketTypes.map((b) =>
            b.id === basketType.id ? basketType : b
          ),
        })),
      deleteBasketType: (id) =>
        set((state) => ({
          basketTypes: state.basketTypes.filter((b) => b.id !== id),
        })),

      // Grades
      addGrade: (grade) =>
        set((state) => ({
          grades: [...state.grades, grade],
        })),
      updateGrade: (grade) =>
        set((state) => ({
          grades: state.grades.map((g) =>
            g.id === grade.id ? grade : g
          ),
        })),
      deleteGrade: (id) =>
        set((state) => ({
          grades: state.grades.filter((g) => g.id !== id),
        })),

      // Sizes
      addSize: (size) =>
        set((state) => ({
          sizes: [...state.sizes, size],
        })),
      updateSize: (size) =>
        set((state) => ({
          sizes: state.sizes.map((s) =>
            s.id === size.id ? size : s
          ),
        })),
      deleteSize: (id) =>
        set((state) => ({
          sizes: state.sizes.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'logistics-data-storage',
      partialize: (state) => ({
        suppliers: state.suppliers,
        locations: state.locations,
        basketTypes: state.basketTypes,
        grades: state.grades,
        sizes: state.sizes,
      }),
    }
  )
);