import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { Truck, Building2, Ship } from 'lucide-react';
import type { MapLocation } from '../../types/map';

interface MapMarkerProps {
  location: MapLocation;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ location }) => {
  const getMarkerIcon = () => {
    const iconSize = 24;
    const iconColor = location.status === 'delayed' ? '#ef4444' : '#3b82f6';
    
    // Create SVG string based on location type
    let svgString = '';
    switch (location.type) {
      case 'truck':
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3m15-5h2v3h-2zM7 17l1.5-3m0 0L10 9"/><rect x="2" y="5" width="12" height="12" rx="2"/><path d="M14 9h5l3 3v5h-2"/></svg>`;
        break;
      case 'departure':
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12h12"/><path d="M6 7h12"/><path d="M6 17h12"/></svg>`;
        break;
      case 'destination':
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 17V7l-6-4-6 4v10l6 4z"/></svg>`;
        break;
      default:
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`;
    }

    const html = `
      <div class="relative" style="width: ${iconSize}px; height: ${iconSize}px;">
        ${svgString}
      </div>
    `;

    return divIcon({
      html,
      className: '',
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize / 2, iconSize / 2],
    });
  };

  return (
    <Marker position={location.coordinates} icon={getMarkerIcon()}>
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold">{location.name}</h3>
          {location.deliveryOrder && (
            <div className="mt-2 text-sm">
              <p>DO: #{location.deliveryOrder.id}</p>
              <p>Supplier: {location.deliveryOrder.supplier}</p>
              <p>ETA: {new Date(location.deliveryOrder.estimatedDelivery).toLocaleString()}</p>
              {location.status === 'delayed' && (
                <p className="text-red-600 font-medium mt-1">Delayed</p>
              )}
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
};