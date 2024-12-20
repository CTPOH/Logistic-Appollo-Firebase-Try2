import { useEffect } from 'react';
import { useDeliveryStore } from '../store/deliveryStore';

export const useDelayedOrders = () => {
  const { deliveryOrders, updateDeliveryOrder } = useDeliveryStore();

  useEffect(() => {
    // Check for delayed orders every minute
    const checkDelayedOrders = () => {
      const now = new Date();
      
      deliveryOrders.forEach(order => {
        if (order.status === 'on-way') {
          const eta = new Date(order.expectedDeliveryDateTime);
          if (now > eta) {
            // Update order status to delayed
            updateDeliveryOrder({
              ...order,
              status: 'delayed'
            });
          }
        }
      });
    };

    // Initial check
    checkDelayedOrders();

    // Set up interval for periodic checks
    const intervalId = setInterval(checkDelayedOrders, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [deliveryOrders, updateDeliveryOrder]);
};