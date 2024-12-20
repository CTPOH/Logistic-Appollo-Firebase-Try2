import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, CheckCircle, AlertCircle, Ship } from 'lucide-react';
import type { DeliveryStatus } from '../../types/delivery';

interface StatusCardProps {
  status: DeliveryStatus;
  count: number;
}

const statusConfig = {
  'on-way': {
    label: 'On The Way',
    icon: Truck,
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    route: '/delivery-orders',
  },
  'delivered': {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    route: '/delivered-orders',
  },
  'delayed': {
    label: 'Delayed',
    icon: AlertCircle,
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    route: '/delayed-orders',
  },
  'forwarding': {
    label: 'Forwarding Vessel',
    icon: Ship,
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    route: '/forwarding-orders',
  },
};

export const StatusCard: React.FC<StatusCardProps> = ({ status, count }) => {
  const navigate = useNavigate();
  const config = statusConfig[status];
  const Icon = config.icon;

  const handleClick = () => {
    if (config.route) {
      navigate(config.route);
    }
  };

  return (
    <div 
      className={`${config.bgColor} rounded-lg p-4 flex items-center cursor-pointer transition-transform hover:scale-105`}
      onClick={handleClick}
    >
      <div className={`${config.color} rounded-full p-2 mr-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className={`text-lg font-semibold ${config.textColor}`}>
          {config.label}
        </h3>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
};