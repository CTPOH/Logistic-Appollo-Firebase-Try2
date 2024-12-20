import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { DataTable } from './DataTable';

interface DataSectionProps<T> {
  title: string;
  description: string;
  data: T[];
  columns: Array<{
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
  }>;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export function DataSection<T>({
  title,
  description,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
}: DataSectionProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
          <Button onClick={onAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>
      <div className="p-6">
        <DataTable
          data={data}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}