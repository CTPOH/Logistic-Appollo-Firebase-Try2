import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { DataManagement } from './pages/DataManagement';
import { Map } from './pages/Map';
import { DeliveryOrders } from './pages/DeliveryOrders';
import { DelayedOrders } from './pages/DelayedOrders';
import { DeliveredOrders } from './pages/DeliveredOrders';
import { ForwardingOrders } from './pages/ForwardingOrders';
import { useAuthStore } from './store/authStore';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data"
          element={
            <ProtectedRoute>
              <DataManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery-orders"
          element={
            <ProtectedRoute>
              <DeliveryOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delayed-orders"
          element={
            <ProtectedRoute>
              <DelayedOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivered-orders"
          element={
            <ProtectedRoute>
              <DeliveredOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forwarding-orders"
          element={
            <ProtectedRoute>
              <ForwardingOrders />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}