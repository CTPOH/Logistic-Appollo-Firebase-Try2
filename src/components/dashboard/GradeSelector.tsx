import React from 'react';
import { useDataStore } from '../../store/dataStore';
import type { Grade } from '../../types/data-management';

interface GradeSelectorProps {
  value: string;
  onChange: (grade: Grade) => void;
  error?: string;
}

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const { grades } = useDataStore();
  const activeGrades = grades.filter((grade) => grade.active);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Grades
      </label>
      <select
        value={value}
        onChange={(e) => {
          const selectedGrade = grades.find((g) => g.code === e.target.value);
          if (selectedGrade) {
            onChange(selectedGrade);
          }
        }}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        required
      >
        <option value="">Select Grade</option>
        {activeGrades.map((grade) => (
          <option key={grade.id} value={grade.code}>
            {grade.code} - {grade.description}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};