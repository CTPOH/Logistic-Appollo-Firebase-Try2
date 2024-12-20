// Date formatting utilities
export const formatDate = (dateTime: string) => {
  if (!dateTime) return '';
  return new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Format date with label
export const formatDateLabel = (label: string, dateTime: string) => {
  if (!dateTime) return '';
  return `${label}: ${formatDate(dateTime)}`;
};

// Weight formatting
export const formatWeight = (weight: number) => {
  return `${weight} kg`;
};

// Temperature formatting
export const formatTemperature = (temp: number) => {
  return `${temp}°C`;
};

// Generate order ID with supplier name and supplier-specific sequence
export const generateOrderId = (supplierName: string, count: number) => {
  // Remove spaces and special characters from supplier name
  const cleanSupplierName = supplierName.replace(/[^a-zA-Z0-9]/g, '');
  // Pad the count with leading zeros to make it 4 digits, starting from 1
  const paddedCount = String(count + 1).padStart(4, '0');
  return `${cleanSupplierName}-${paddedCount}`;
};