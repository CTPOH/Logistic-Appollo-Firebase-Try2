import type { Grade } from '../../types/data-management';

export const validateGradeForm = (data: Partial<Grade>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.code) {
    errors.code = 'Grade code is required';
  } else if (data.code.length < 2) {
    errors.code = 'Grade code must be at least 2 characters';
  }

  if (!data.description) {
    errors.description = 'Description is required';
  }

  return errors;
};