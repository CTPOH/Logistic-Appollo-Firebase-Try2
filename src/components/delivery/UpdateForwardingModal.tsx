import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDeliveryStore } from '../../store/deliveryStore';
import type { DeliveryOrder } from '../../types/delivery';

interface UpdateForwardingModalProps {
  order: DeliveryOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateForwardingModal: React.FC<UpdateForwardingModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const { updateDeliveryOrder } = useDeliveryStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vesselType: order.forwarding?.vesselType || 'sea-container',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedOrder: DeliveryOrder = {
        ...order,
        forwarding: {
          ...order.forwarding!,
          vesselType: formData.vesselType,
        },
      };

      updateDeliveryOrder(updatedOrder);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Update Status</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Forwarding Vessel Type
              </label>
              <select
                value={formData.vesselType}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  vesselType: e.target.value as 'sea-container' | 'air-flight'
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                required
              >
                <option value="sea-container">Sea Container</option>
                <option value="air-flight">Air Flight</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
              >
                Update Status
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};