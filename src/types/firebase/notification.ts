import { Timestamp } from 'firebase/firestore';
import { UserRole } from './user';

export type NotificationType = 'shipment_delay' | 'temperature_alert' | 'delivery_complete' | 'system_alert';
export type NotificationSeverity = 'info' | 'warning' | 'error';

export interface NotificationAction {
  type: 'link' | 'button';
  label: string;
  url: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  message: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  targetUsers: string[];
  targetRoles?: UserRole[];
  read: Record<string, Timestamp>;
  acknowledged: Record<string, Timestamp>;
  relatedShipmentId?: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  action?: NotificationAction;
}