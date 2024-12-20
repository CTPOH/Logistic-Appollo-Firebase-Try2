import React, { useEffect } from 'react';
import { Input } from '../../ui/Input';
import { FormModal } from './FormModal';
import type { BasketType } from '../../../types/data-management';

interface BasketTypeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<BasketType>) => Promise<void>;
  initialData?: BasketType;
}

export const BasketTypeForm: React.FC<BasketTypeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<Partial<BasketType>>({
    weight: 0,
    description: '',
    active: true,
  });

  useEffect(() => {
    // Reset form when modal opens/closes
    if (isOpen) {
      setFormData(initialData || {
        weight: 0,
        description: '',
        active: true,
      });
    }
  }, [initialData, isOpen]);

  const [isLoading, setIsLoading] = React.useState(false);

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
      title={initialData ? 'Edit Basket Type' : 'Add Basket Type'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <Input
        label="Weight (kg)"
        type="number"
        min="0"
        step="0.1"
        value={formData.weight?.toString() || '0'}
        onChange={(e) =>
          setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })
        }
        required
      />
      <Input
        label="Description"
        value={formData.description || ''}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
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