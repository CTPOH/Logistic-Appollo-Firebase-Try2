import React, { useEffect } from 'react';
import { Input } from '../../ui/Input';
import { FormModal } from './FormModal';
import type { Label } from '../../../types/data-management';

interface LabelFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Label>) => Promise<void>;
  initialData?: Label;
}

export const LabelForm: React.FC<LabelFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<Partial<Label>>({
    label: '',
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
      title={initialData ? 'Edit Label' : 'Add Label'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <Input
        label="Label"
        value={formData.label}
        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
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