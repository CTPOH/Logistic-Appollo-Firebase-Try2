import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PackageSearch,
  LayoutDashboard,
  BarChart3,
  Database,
  Map,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { NavItem } from './NavItem';
import { Button } from '../ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard' },
    { icon: Map, label: 'Map', route: '/map' },
    { icon: BarChart3, label: 'Analytics', route: '/analytics' },
    { icon: Database, label: 'Data Management', route: '/data' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation - Desktop */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <PackageSearch className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl hidden sm:inline">Logistics</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center space-x-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.route}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => navigate(item.route)}
                />
              ))}
            </nav>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                <div className="bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {user?.role}
                  </span>
                </div>
                <span className="text-gray-500">
                  {user?.username}
                </span>
              </div>
              <Button
                onClick={handleLogout}
                className="flex items-center space-x-2"
                variant="outline"
                isLoading={isLoggingOut}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 mb-16 sm:mb-0">
        {children}
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-blue-600"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};