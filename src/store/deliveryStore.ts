import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateOrderId } from '../utils/formatters';
import type { DeliveryOrder } from '../types/delivery';

interface DeliveryState {
  deliveryOrders: DeliveryOrder[];
  supplierOrderCounts: Record<string, number>;
  addDeliveryOrder: (order: Omit<DeliveryOrder, 'id' | 'status' | 'createdAt'>) => void;
  updateDeliveryOrder: (order: DeliveryOrder) => void;
  deleteDeliveryOrder: (id: string) => void;
  getDeliveryStats: () => {
    onWay: number;
    delivered: number;
    delayed: number;
    forwarding: number;
  };
}

export const useDeliveryStore = create<DeliveryState>()(
  persist(
    (set, get) => ({
      deliveryOrders: [],
      supplierOrderCounts: {},
      
      addDeliveryOrder: (order) => {
        const { supplierOrderCounts } = get();
        // Get the current count for this specific supplier (default to 0 if not found)
        const currentCount = supplierOrderCounts[order.supplierName] || 0;
        
        const newOrder: DeliveryOrder = {
          ...order,
          id: generateOrderId(order.supplierName, currentCount),
          status: 'on-way',
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          deliveryOrders: [...state.deliveryOrders, newOrder],
          // Update only this supplier's count
          supplierOrderCounts: {
            ...state.supplierOrderCounts,
            [order.supplierName]: currentCount + 1,
          },
        }));
      },
      
      updateDeliveryOrder: (order) => {
        set((state) => ({
          deliveryOrders: state.deliveryOrders.map((o) =>
            o.id === order.id ? order : o
          ),
        }));
      },

      deleteDeliveryOrder: (id) => {
        set((state) => ({
          deliveryOrders: state.deliveryOrders.filter((o) => o.id !== id),
        }));
      },
      
      getDeliveryStats: () => {
        const orders = get().deliveryOrders;
        return {
          onWay: orders.filter((o) => o.status === 'on-way').length,
          delivered: orders.filter((o) => o.status === 'delivered').length,
          delayed: orders.filter((o) => o.status === 'delayed').length,
          forwarding: orders.filter((o) => o.status === 'forwarding').length,
        };
      },
    }),
    {
      name: 'logistics-delivery-storage',
      partialize: (state) => ({
        deliveryOrders: state.deliveryOrders,
        supplierOrderCounts: state.supplierOrderCounts,
      }),
    }
  )
);