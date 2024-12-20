import React from 'react';
import { Polyline, Tooltip } from 'react-leaflet';
import type { MapRoute } from '../../types/map';

interface MapRouteProps {
  route: MapRoute;
}

export const MapRoute: React.FC<MapRouteProps> = ({ route }) => {
  const color = route.status === 'delayed' ? '#ef4444' : '#3b82f6';
  const weight = 3;

  return (
    <Polyline
      positions={route.coordinates}
      pathOptions={{
        color,
        weight,
      }}
    >
      <Tooltip permanent>
        <div className="text-sm font-medium">
          {route.from.name} → {route.to.name}
          {route.status === 'delayed' && (
            <span className="text-red-600 ml-2">(Delayed)</span>
          )}
        </div>
      </Tooltip>
    </Polyline>
  );
};