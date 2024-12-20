import React, { useEffect } from 'react';
import { Input } from '../../ui/Input';
import { FormModal } from './FormModal';
import type { Supplier } from '../../../types/data-management';

interface SupplierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Supplier>) => Promise<void>;
  initialData?: Supplier;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<Partial<Supplier>>({
    name: '',
    contact: '',
    email: '',
    address: '',
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
      title={initialData ? 'Edit Supplier' : 'Add Supplier'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        label="Contact Person"
        value={formData.contact}
        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
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