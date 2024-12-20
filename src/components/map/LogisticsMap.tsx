import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapMarker } from './MapMarker';
import { MapRoute } from './MapRoute';
import { MapControls } from './MapControls';
import type { MapLocation, MapRoute as MapRouteType } from '../../types/map';
import 'leaflet/dist/leaflet.css';

// Import Leaflet marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up default icon
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface LogisticsMapProps {
  locations: MapLocation[];
  routes: MapRouteType[];
}

export const LogisticsMap: React.FC<LogisticsMapProps> = ({ locations, routes }) => {
  const [showDelayed, setShowDelayed] = React.useState(true);
  const [showTrucks, setShowTrucks] = React.useState(true);

  const filteredLocations = locations.filter((location) => {
    if (location.type === 'truck' && !showTrucks) return false;
    if (location.status === 'delayed' && !showDelayed) return false;
    return true;
  });

  const filteredRoutes = routes.filter((route) => {
    if (route.status === 'delayed' && !showDelayed) return false;
    return true;
  });

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] rounded-lg overflow-hidden">
      <MapContainer
        center={[0, 117]} // Center on Indonesia
        zoom={5}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredRoutes.map((route) => (
          <MapRoute key={route.id} route={route} />
        ))}
        {filteredLocations.map((location) => (
          <MapMarker key={location.id} location={location} />
        ))}
      </MapContainer>
      <MapControls
        showDelayed={showDelayed}
        onToggleDelayed={() => setShowDelayed(!showDelayed)}
        showTrucks={showTrucks}
        onToggleTrucks={() => setShowTrucks(!showTrucks)}
      />
    </div>
  );
};