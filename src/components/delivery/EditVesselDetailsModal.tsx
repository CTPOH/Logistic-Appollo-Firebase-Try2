import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDeliveryStore } from '../../store/deliveryStore';
import { BasketInPalletSection } from './basket-sections/BasketInPalletSection';
import { BasketMixedPalletSection } from './basket-sections/BasketMixedPalletSection';
import { BasketNonPalletSection } from './basket-sections/BasketNonPalletSection';
import type { DeliveryOrder, VesselDetails } from '../../types/delivery';

interface EditVesselDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vesselType: 'sea-container' | 'air-flight';
  vesselNumber: string;
  orders: DeliveryOrder[];
}

const initialVesselDetails: VesselDetails = {
  basketsInPallet: [],
  basketsMixedPallet: [],
  basketsNonPallet: [],
};

export const EditVesselDetailsModal: React.FC<EditVesselDetailsModalProps> = ({
  isOpen,
  onClose,
  vesselType,
  vesselNumber,
  orders,
}) => {
  const { updateDeliveryOrder } = useDeliveryStore();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get existing vessel details from first order or use initial state
  const [formData, setFormData] = useState<VesselDetails>(() => {
    const existingDetails = orders[0]?.forwarding?.vesselDetails;
    if (!existingDetails) return initialVesselDetails;

    return {
      ...existingDetails,
      basketsInPallet: existingDetails.basketsInPallet || [],
      basketsMixedPallet: existingDetails.basketsMixedPallet || [],
      basketsNonPallet: existingDetails.basketsNonPallet || [],
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update all orders in the group with new vessel details
      orders.forEach(order => {
        const updatedOrder = {
          ...order,
          forwarding: {
            ...order.forwarding!,
            vesselDetails: formData,
          },
        };
        updateDeliveryOrder(updatedOrder);
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">
              Edit {vesselType === 'sea-container' ? 'Container' : 'Flight'} Details
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            {/* Vessel Information */}
            <div className="grid grid-cols-2 gap-4">
              {vesselType === 'sea-container' ? (
                <>
                  <Input
                    label="Container ID"
                    value={formData.containerId || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, containerId: e.target.value }))}
                  />
                  <Input
                    label="Seal Number"
                    value={formData.sealNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, sealNumber: e.target.value }))}
                  />
                </>
              ) : (
                <Input
                  label="Flight Number"
                  value={vesselNumber}
                  disabled
                  className="bg-gray-50"
                />
              )}
              
              <Input
                label="Vessel Name"
                value={formData.vesselName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, vesselName: e.target.value }))}
              />
              <Input
                label="D/O Number"
                value={formData.doNumber || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, doNumber: e.target.value }))}
              />
              <Input
                label="Thermometer Number"
                value={formData.thermeterNumber || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, thermeterNumber: e.target.value }))}
              />
              <Input
                label="Container Temperature (°C)"
                type="number"
                step="0.1"
                value={formData.containerTemperature?.toString() || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  containerTemperature: parseFloat(e.target.value) || undefined 
                }))}
              />
            </div>

            {/* Basket Sections */}
            <div className="space-y-8">
              <BasketInPalletSection
                baskets={formData.basketsInPallet}
                onChange={(baskets) => setFormData(prev => ({ ...prev, basketsInPallet: baskets }))}
              />

              <BasketMixedPalletSection
                baskets={formData.basketsMixedPallet}
                onChange={(baskets) => setFormData(prev => ({ ...prev, basketsMixedPallet: baskets }))}
              />

              <BasketNonPalletSection
                baskets={formData.basketsNonPallet}
                onChange={(baskets) => setFormData(prev => ({ ...prev, basketsNonPallet: baskets }))}
              />
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
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};