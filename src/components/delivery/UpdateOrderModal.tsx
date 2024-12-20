import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDeliveryStore } from '../../store/deliveryStore';
import type { DeliveryOrder, BasketEntry } from '../../types/delivery';

interface UpdateOrderModalProps {
  order: DeliveryOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateOrderModal: React.FC<UpdateOrderModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const { updateDeliveryOrder } = useDeliveryStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    actualArrivalTime: '',
    arrivalTemperature: undefined as number | undefined,
    actualBaskets: order.baskets.map(basket => ({
      ...basket,
      quantity: basket.quantity
    }))
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.arrivalTemperature) return;
    
    setIsLoading(true);

    try {
      const updatedOrder: DeliveryOrder = {
        ...order,
        status: 'delivered',
        completion: {
          actualArrivalTime: formData.actualArrivalTime,
          arrivalTemperature: formData.arrivalTemperature,
          actualBaskets: formData.actualBaskets,
        },
      };

      updateDeliveryOrder(updatedOrder);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBasketChange = (index: number, field: keyof BasketEntry, value: string) => {
    setFormData(prev => ({
      ...prev,
      actualBaskets: prev.actualBaskets.map((basket, i) => 
        i === index 
          ? { ...basket, [field]: field === 'quantity' ? Math.max(0, parseInt(value) || 0) : value }
          : basket
      )
    }));
  };

  const handleTemperatureChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      arrivalTemperature: value === '' ? undefined : parseFloat(value)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Update Delivery Order</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <Input
              label="Actual Arrival Time"
              type="datetime-local"
              value={formData.actualArrivalTime}
              onChange={(e) => setFormData(prev => ({ ...prev, actualArrivalTime: e.target.value }))}
              required
            />

            <Input
              label="Arrival Temperature (°C)"
              type="number"
              step="0.1"
              value={formData.arrivalTemperature?.toString() || ''}
              onChange={(e) => handleTemperatureChange(e.target.value)}
              required
            />

            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Actual Baskets</h4>
              {formData.actualBaskets.map((basket, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{basket.basketType}kg - {basket.grade}</p>
                  </div>
                  <Input
                    type="number"
                    min="0"
                    value={basket.quantity.toString()}
                    onChange={(e) => handleBasketChange(index, 'quantity', e.target.value)}
                    className="w-24"
                  />
                </div>
              ))}
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
                Complete Delivery
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};