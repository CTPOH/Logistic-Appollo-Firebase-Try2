import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDeliveryStore } from '../../store/deliveryStore';
import type { DeliveryOrder, VesselType } from '../../types/delivery';

interface ForwardingModalProps {
  order: DeliveryOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const ForwardingModal: React.FC<ForwardingModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const { updateDeliveryOrder } = useDeliveryStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vesselType: 'sea-container' as VesselType,
    vesselNumber: '',
    allocationTime: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedOrder: DeliveryOrder = {
        ...order,
        status: 'forwarding',
        forwarding: {
          vesselType: formData.vesselType,
          vesselNumber: formData.vesselNumber,
          allocationTime: formData.allocationTime,
        },
      };

      updateDeliveryOrder(updatedOrder);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const getVesselNumberLabel = () => {
    return formData.vesselType === 'sea-container' ? 'Container Number' : 'Flight Number';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Forwarding Vessel Allocation</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vessel Type
              </label>
              <select
                value={formData.vesselType}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  vesselType: e.target.value as VesselType 
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                required
              >
                <option value="sea-container">Sea Container</option>
                <option value="air-flight">Air Flight</option>
              </select>
            </div>

            <Input
              label={getVesselNumberLabel()}
              value={formData.vesselNumber}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                vesselNumber: e.target.value 
              }))}
              placeholder={`Enter ${getVesselNumberLabel().toLowerCase()}`}
              required
            />

            <Input
              label="Allocation Time"
              type="datetime-local"
              value={formData.allocationTime}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                allocationTime: e.target.value 
              }))}
              required
            />

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
                Allocate Vessel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};