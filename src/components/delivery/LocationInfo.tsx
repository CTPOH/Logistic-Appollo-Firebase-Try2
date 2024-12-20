import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationInfoProps {
  label: string;
  location: string;
}

export const LocationInfo: React.FC<LocationInfoProps> = ({ label, location }) => {
  return (
    <div>
      <div className="flex items-center space-x-1 mb-1">
        <MapPin className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <p className="text-gray-900">{location}</p>
    </div>
  );
};