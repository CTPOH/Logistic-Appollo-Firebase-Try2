import type { DeliveryFormData, BasketEntry } from '../../types/delivery';

export const validateDeliveryDateTime = (departureDateTime: string, expectedDeliveryDateTime: string): Record<string, string> => {
  const errors: Record<string, string> = {};
  const now = new Date();
  const departure = new Date(departureDateTime);
  const delivery = new Date(expectedDeliveryDateTime);

  // Reset time components for date comparison
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const departureDate = new Date(departure.getFullYear(), departure.getMonth(), departure.getDate());

  if (!departureDateTime) {
    errors.departureDateTime = 'Departure date and time is required';
  } else if (departureDate < todayStart) {
    errors.departureDateTime = 'Departure date cannot be in the past';
  }

  if (!expectedDeliveryDateTime) {
    errors.expectedDeliveryDateTime = 'Expected delivery date and time is required';
  } else if (delivery <= departure) {
    errors.expectedDeliveryDateTime = 'Expected delivery time must be after departure time';
  }

  return errors;
};

export const validateBasketEntry = (entry: BasketEntry, index: number): Record<string, string> => {
  const errors: Record<string, string> = {};
  const prefix = `baskets.${index}`;

  if (!entry.basketType) {
    errors[`${prefix}.basketType`] = 'Basket type is required';
  }
  if (!entry.grade) {
    errors[`${prefix}.grade`] = 'Grade is required';
  }
  if (!entry.quantity || entry.quantity <= 0) {
    errors[`${prefix}.quantity`] = 'Valid quantity is required';
  }

  return errors;
};

export const validateDeliveryForm = (formData: Partial<DeliveryFormData>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.supplierName) {
    errors.supplierName = 'Supplier is required';
  }
  if (!formData.departureLocation) {
    errors.departureLocation = 'Departure location is required';
  }
  if (!formData.destinationLocation) {
    errors.destinationLocation = 'Destination location is required';
  }

  // Validate each basket entry
  if (formData.baskets?.length === 0) {
    errors.baskets = 'At least one basket entry is required';
  } else if (formData.baskets) {
    formData.baskets.forEach((entry, index) => {
      const basketErrors = validateBasketEntry(entry, index);
      Object.assign(errors, basketErrors);
    });
  }

  if (formData.departureDateTime && formData.expectedDeliveryDateTime) {
    const dateTimeErrors = validateDeliveryDateTime(
      formData.departureDateTime,
      formData.expectedDeliveryDateTime
    );
    Object.assign(errors, dateTimeErrors);
  }

  return errors;
};