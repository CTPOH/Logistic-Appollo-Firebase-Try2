import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { AnalyticsFilters } from '../../types/analytics';

interface FiltersProps {
  filters: AnalyticsFilters;
  onFilterChange: (filters: AnalyticsFilters) => void;
  onApplyFilters: () => void;
  isLoading?: boolean;
}

export const AnalyticsFilters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  isLoading = false,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <Input
            label="Start Date"
            type="date"
            value={filters.dateRange.startDate}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: { ...filters.dateRange, startDate: e.target.value },
              })
            }
          />
          <Input
            label="End Date"
            type="date"
            value={filters.dateRange.endDate}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: { ...filters.dateRange, endDate: e.target.value },
              })
            }
          />
        </div>
        <div className="space-y-4">
          <Input
            label="Supplier"
            value={filters.supplier || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, supplier: e.target.value })
            }
          />
          <Input
            label="Location"
            value={filters.location || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, location: e.target.value })
            }
          />
        </div>
        <div className="space-y-4">
          <Input
            label="Basket Type (kg)"
            type="number"
            value={filters.basketType || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                basketType: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              value={filters.grade || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  grade: e.target.value as 'SP1' | 'SP2' | undefined,
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            >
              <option value="">All Grades</option>
              <option value="SP1">SP1</option>
              <option value="SP2">SP2</option>
            </select>
          </div>
        </div>
      </div>
      <Button
        className="mt-6 w-full"
        onClick={onApplyFilters}
        isLoading={isLoading}
      >
        Apply Filters
      </Button>
    </div>
  );
};