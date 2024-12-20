import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LocationSelector } from '../dashboard/LocationSelector';
import { BasketEntryForm } from '../dashboard/BasketEntryForm';
import { useDeliveryStore } from '../../store/deliveryStore';
import { validateDeliveryForm } from '../../utils/validators';
import type { DeliveryOrder, BasketEntry } from '../../types/delivery';

interface EditOrderModalProps {
  order: DeliveryOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const EditOrderModal: React.FC<EditOrderModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const { updateDeliveryOrder } = useDeliveryStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    departureLocation: order.departureLocation,
    destinationLocation: order.destinationLocation,
    departureDateTime: order.departureDateTime,
    expectedDeliveryDateTime: order.expectedDeliveryDateTime,
    baskets: [...order.baskets],
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        departureLocation: order.departureLocation,
        destinationLocation: order.destinationLocation,
        departureDateTime: order.departureDateTime,
        expectedDeliveryDateTime: order.expectedDeliveryDateTime,
        baskets: [...order.baskets],
      });
      setErrors({});
    }
  }, [isOpen, order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateDeliveryForm({
      ...order,
      ...formData,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const updatedOrder: DeliveryOrder = {
        ...order,
        ...formData,
      };
      updateDeliveryOrder(updatedOrder);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBasketChange = (index: number, entry: BasketEntry) => {
    const newBaskets = [...formData.baskets];
    newBaskets[index] = entry;
    setFormData({ ...formData, baskets: newBaskets });

    // Clear related errors
    const errorKeys = Object.keys(errors).filter(key => key.startsWith(`baskets.${index}`));
    if (errorKeys.length > 0) {
      const newErrors = { ...errors };
      errorKeys.forEach(key => delete newErrors[key]);
      setErrors(newErrors);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Edit Order {order.id}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LocationSelector
                value={formData.departureLocation}
                onChange={(location) => setFormData({ ...formData, departureLocation: location.name })}
                type="departure"
                error={errors.departureLocation}
              />

              <LocationSelector
                value={formData.destinationLocation}
                onChange={(location) => setFormData({ ...formData, destinationLocation: location.name })}
                type="destination"
                error={errors.destinationLocation}
              />

              <Input
                label="Departure Date & Time"
                type="datetime-local"
                value={formData.departureDateTime}
                onChange={(e) => setFormData({ ...formData, departureDateTime: e.target.value })}
                error={errors.departureDateTime}
                required
              />

              <Input
                label="Expected Delivery Date & Time"
                type="datetime-local"
                value={formData.expectedDeliveryDateTime}
                onChange={(e) => setFormData({ ...formData, expectedDeliveryDateTime: e.target.value })}
                error={errors.expectedDeliveryDateTime}
                required
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Basket Details</h4>
              {formData.baskets.map((entry, index) => (
                <BasketEntryForm
                  key={index}
                  entry={entry}
                  index={index}
                  onChange={handleBasketChange}
                  onRemove={() => {}} // Disable basket removal in edit mode
                  errors={errors}
                />
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
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};