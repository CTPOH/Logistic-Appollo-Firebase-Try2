import React, { useEffect } from 'react';
import { Input } from '../../ui/Input';
import { FormModal } from './FormModal';
import { CitySelector } from '../CitySelector';
import type { Location } from '../../../types/data-management';
import type { City } from '../../../data/indonesiaCities';

interface LocationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Location>) => Promise<void>;
  initialData?: Location;
}

export const LocationForm: React.FC<LocationFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<Partial<Location>>({
    name: '',
    type: 'departure',
    address: '',
    active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleCitySelect = (city: City) => {
    setFormData({
      ...formData,
      name: city.name,
      address: `${city.name}, ${city.province}, Indonesia`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      title={initialData ? 'Edit Location' : 'Add Location'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <CitySelector
        value={formData.name || ''}
        onChange={handleCitySelect}
      />
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as 'departure' | 'destination',
            })
          }
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          required
        >
          <option value="departure">Departure</option>
          <option value="destination">Destination</option>
        </select>
      </div>
      <Input
        label="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        required
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Active</span>
      </label>
    </FormModal>
  );
};