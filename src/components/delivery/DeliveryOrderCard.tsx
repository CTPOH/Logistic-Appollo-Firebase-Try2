import React, { useState } from 'react';
import { MapPin, Calendar, Package, Truck, AlertCircle, Edit } from 'lucide-react';
import { UpdateOrderModal } from './UpdateOrderModal';
import { EditOrderModal } from './EditOrderModal';
import { useDeliveryStore } from '../../store/deliveryStore';
import { formatDate, formatWeight } from '../../utils/formatters';
import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetails';
import type { DeliveryOrder } from '../../types/delivery';

interface DeliveryOrderCardProps {
  order: DeliveryOrder;
}

export const DeliveryOrderCard: React.FC<DeliveryOrderCardProps> = ({ order }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateDeliveryOrder } = useDeliveryStore();

  // Get background color based on status
  const getBackgroundColor = () => {
    switch (order.status) {
      case 'delayed':
        return 'bg-red-50';
      default:
        return 'bg-white';
    }
  };

  // Get status icon based on status
  const getStatusIcon = () => {
    switch (order.status) {
      case 'delayed':
        return {
          Icon: AlertCircle,
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          label: 'Delayed'
        };
      default:
        return {
          Icon: Truck,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          label: 'Active'
        };
    }
  };

  const { Icon, iconBg, iconColor, label } = getStatusIcon();

  return (
    <>
      <div className={`${getBackgroundColor()} rounded-lg shadow-sm border`}>
        <div className="px-3 py-2 bg-gray-50/50 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`${iconBg} p-1 rounded-full`}>
              <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-medium text-gray-900">{order.id}</h2>
                <span className={`px-1.5 py-0.5 text-xs ${iconBg} ${iconColor} rounded-full`}>
                  {label}
                </span>
              </div>
              <div className="text-xs space-y-0.5">
                <p className="text-gray-500">Created: {formatDate(order.createdAt)}</p>
                <p className="text-gray-500">Departure: {formatDate(order.departureDateTime)}</p>
                <p className="text-gray-500">ETA: {formatDate(order.expectedDeliveryDateTime)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-gray-600 hover:text-gray-700 text-xs flex items-center space-x-1"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 text-xs"
            >
              Mark as Delivered
            </button>
          </div>
        </div>
        <OrderDetails order={order} />
      </div>

      <UpdateOrderModal
        order={order}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />

      <EditOrderModal
        order={order}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};