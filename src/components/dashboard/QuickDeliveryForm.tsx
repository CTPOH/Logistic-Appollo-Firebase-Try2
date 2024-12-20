import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LocationSelector } from './LocationSelector';
import { BasketEntryForm } from './BasketEntryForm';
import { useDeliveryStore } from '../../store/deliveryStore';
import { useDataStore } from '../../store/dataStore';
import { validateDeliveryForm } from '../../utils/validators';
import type { DeliveryFormData, BasketEntry } from '../../types/delivery';
import type { Location } from '../../types/data-management';

const initialBasketEntry: BasketEntry = {
  basketType: 0,
  grade: '',
  quantity: 0,
};

const initialFormData: DeliveryFormData = {
  supplierName: '',
  departureLocation: '',
  destinationLocation: '',
  baskets: [{ ...initialBasketEntry }],
  departureDateTime: '',
  expectedDeliveryDateTime: '',
};

export const QuickDeliveryForm: React.FC = () => {
  const [formData, setFormData] = useState<DeliveryFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { addDeliveryOrder } = useDeliveryStore();
  const { suppliers } = useDataStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateDeliveryForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      addDeliveryOrder(formData);
      setSuccessMessage('Delivery order created successfully!');
      setFormData(initialFormData);
      setErrors({});
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Failed to create delivery order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (type: 'departure' | 'destination', location: Location) => {
    const field = `${type}Location` as keyof DeliveryFormData;
    setFormData({ ...formData, [field]: location.name });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
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

  const handleAddBasket = () => {
    if (formData.baskets.length < 6) {
      setFormData({
        ...formData,
        baskets: [...formData.baskets, { ...initialBasketEntry }],
      });
    }
  };

  const handleRemoveBasket = (index: number) => {
    const newBaskets = formData.baskets.filter((_, i) => i !== index);
    setFormData({ ...formData, baskets: newBaskets });

    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(newErrors)
      .filter(key => key.startsWith(`baskets.${index}`))
      .forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  // Get current datetime in local ISO format for min attribute
  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Quick Delivery Order</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supplier
          </label>
          <select
            value={formData.supplierName}
            onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.supplierName ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.filter(s => s.active).map((supplier) => (
              <option key={supplier.id} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplierName && (
            <p className="mt-1 text-sm text-red-500">{errors.supplierName}</p>
          )}
        </div>

        <LocationSelector
          value={formData.departureLocation}
          onChange={(location) => handleLocationSelect('departure', location)}
          type="departure"
          error={errors.departureLocation}
        />

        <LocationSelector
          value={formData.destinationLocation}
          onChange={(location) => handleLocationSelect('destination', location)}
          type="destination"
          error={errors.destinationLocation}
        />

        <Input
          label="Departure Date & Time"
          type="datetime-local"
          value={formData.departureDateTime}
          onChange={(e) => setFormData({ ...formData, departureDateTime: e.target.value })}
          error={errors.departureDateTime}
          min={minDateTime}
          required
        />

        <Input
          label="Expected Delivery Date & Time"
          type="datetime-local"
          value={formData.expectedDeliveryDateTime}
          onChange={(e) => setFormData({ ...formData, expectedDeliveryDateTime: e.target.value })}
          error={errors.expectedDeliveryDateTime}
          min={formData.departureDateTime || minDateTime}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Basket Details</h3>
          {formData.baskets.length < 6 && (
            <Button
              type="button"
              onClick={handleAddBasket}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Basket Set</span>
            </Button>
          )}
        </div>

        {errors.baskets && (
          <p className="text-sm text-red-500">{errors.baskets}</p>
        )}

        {formData.baskets.map((entry, index) => (
          <BasketEntryForm
            key={index}
            entry={entry}
            index={index}
            onChange={handleBasketChange}
            onRemove={handleRemoveBasket}
            errors={errors}
          />
        ))}
      </div>

      <Button
        type="submit"
        className="mt-6 w-full"
        isLoading={isLoading}
      >
        Create Delivery Order
      </Button>
    </form>
  );
};