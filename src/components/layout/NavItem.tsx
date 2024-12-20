import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};