import React from 'react';
import { Button } from '../ui/Button';
import { Eye, EyeOff, Truck, Building2 } from 'lucide-react';

interface MapControlsProps {
  showDelayed: boolean;
  onToggleDelayed: () => void;
  showTrucks: boolean;
  onToggleTrucks: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  showDelayed,
  onToggleDelayed,
  showTrucks,
  onToggleTrucks,
}) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] space-y-2">
      <Button
        onClick={onToggleDelayed}
        className="w-full flex items-center space-x-2"
        variant={showDelayed ? 'primary' : 'outline'}
      >
        {showDelayed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        <span>Delayed Routes</span>
      </Button>
      <Button
        onClick={onToggleTrucks}
        className="w-full flex items-center space-x-2"
        variant={showTrucks ? 'primary' : 'outline'}
      >
        <Truck className="w-4 h-4" />
        <span>Show Trucks</span>
      </Button>
    </div>
  );
};