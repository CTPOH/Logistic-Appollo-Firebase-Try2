import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/Input';
import { FormModal } from './FormModal';
import { validateGradeForm } from '../../../utils/validators';
import type { Grade } from '../../../types/data-management';

interface GradeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Grade>) => Promise<void>;
  initialData?: Grade;
}

export const GradeForm: React.FC<GradeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<Grade>>({
    code: '',
    description: '',
    active: true,
  });
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateGradeForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to submit grade:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof Grade, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <FormModal
      title={initialData ? 'Edit Grade' : 'Add Grade'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <Input
        label="Grade Code"
        value={formData.code}
        onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
        placeholder="Enter grade code (e.g. SP1, A1, etc.)"
        error={errors.code}
        required
      />
      
      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Enter grade description"
        error={errors.description}
        required
      />
      
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.active}
          onChange={(e) => handleChange('active', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Active</span>
      </label>
    </FormModal>
  );
};