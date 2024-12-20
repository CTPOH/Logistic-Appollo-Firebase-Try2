import { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'manager' | 'staff';

export interface UserPermissions {
  canCreateShipments: boolean;
  canUpdateShipments: boolean;
  canDeleteShipments: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface UserPreferences {
  notificationSettings: NotificationSettings;
  timezone: string;
  language: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  active: boolean;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  permissions: UserPermissions;
  preferences: UserPreferences;
  department?: string;
  assignedShipments: string[];
}