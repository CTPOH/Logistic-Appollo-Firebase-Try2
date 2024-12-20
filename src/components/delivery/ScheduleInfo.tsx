import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface ScheduleInfoProps {
  label: string;
  datetime: string;
}

export const ScheduleInfo: React.FC<ScheduleInfoProps> = ({ label, datetime }) => {
  return (
    <div>
      <div className="flex items-center space-x-1 mb-1">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <p className="text-gray-900">{formatDate(datetime)}</p>
    </div>
  );
};