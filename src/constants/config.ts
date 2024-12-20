// Application configuration constants
export const MAP_CONFIG = {
  defaultCenter: [0, 117], // Center on Indonesia
  defaultZoom: 5,
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

export const STATUS_COLORS = {
  'on-time': {
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  delayed: {
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
  forwarding: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
  },
};

export const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  analytics: '/analytics',
  data: '/data',
  map: '/map',
};