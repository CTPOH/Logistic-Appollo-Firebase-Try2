import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { indonesianCities, type City } from '../../data/indonesiaCities';

interface CitySelectorProps {
  value: string;
  onChange: (city: City) => void;
  error?: string;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial selected city if value exists
    const city = indonesianCities.find(c => c.name === value);
    if (city) {
      setSelectedCity(city);
      setSearchTerm(city.name);
    }
  }, [value]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = indonesianCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (city: City) => {
    setSelectedCity(city);
    setSearchTerm(city.name);
    setIsOpen(false);
    onChange(city);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        City
      </label>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Search for a city..."
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={`${city.name}-${city.province}`}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => handleSelect(city)}
                >
                  <div className="font-medium">{city.name}</div>
                  <div className="text-sm text-gray-500">{city.province}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No cities found</div>
            )}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};