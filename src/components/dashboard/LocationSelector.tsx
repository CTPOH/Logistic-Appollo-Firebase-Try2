import React from 'react';
import { useDataStore } from '../../store/dataStore';
import type { Location } from '../../types/data-management';

interface LocationSelectorProps {
  value: string;
  onChange: (location: Location) => void;
  type: 'departure' | 'destination';
  error?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  value,
  onChange,
  type,
  error,
}) => {
  const { locations } = useDataStore();
  const filteredLocations = locations.filter(
    (location) => location.active && location.type === type
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {type === 'departure' ? 'Departure Location' : 'Destination Location'}
      </label>
      <select
        value={value}
        onChange={(e) => {
          const selectedLocation = locations.find((loc) => loc.name === e.target.value);
          if (selectedLocation) {
            onChange(selectedLocation);
          }
        }}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        required
      >
        <option value="">Select Location</option>
        {filteredLocations.map((location) => (
          <option key={location.id} value={location.name}>
            {location.name} - {location.address}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};