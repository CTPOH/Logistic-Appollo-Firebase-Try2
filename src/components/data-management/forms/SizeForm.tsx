import React, { useEffect } from 'react';
import { Input } from '../../ui/Input';
import { FormModal } from './FormModal';
import type { Size } from '../../../types/data-management';

interface SizeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Size>) => Promise<void>;
  initialData?: Size;
}

export const SizeForm: React.FC<SizeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<Partial<Size>>({
    name: '',
    description: '',
    active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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
      title={initialData ? 'Edit Size' : 'Add Size'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <Input
        label="Size Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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