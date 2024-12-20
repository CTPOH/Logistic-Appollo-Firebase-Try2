import React, { useState, useMemo } from 'react';
import { Ship, ChevronDown, ChevronUp, Thermometer } from 'lucide-react';
import { formatDate, formatWeight, formatTemperature } from '../../utils/formatters';
import { ForwardingOrderCard } from './ForwardingOrderCard';
import { EditVesselDetailsModal } from './EditVesselDetailsModal';
import { Button } from '../ui/Button';
import type { DeliveryOrder } from '../../types/delivery';

interface GroupedForwardingOrdersProps {
  orders: DeliveryOrder[];
}

interface VesselGroup {
  vesselType: 'sea-container' | 'air-flight';
  vesselNumber: string;
  allocationTime: string;
  orders: DeliveryOrder[];
  totalBaskets: number;
  totalWeight: number;
  vesselDetails?: DeliveryOrder['forwarding']['vesselDetails'];
}

export const GroupedForwardingOrders: React.FC<GroupedForwardingOrdersProps> = ({ orders }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [editingVessel, setEditingVessel] = useState<{
    vesselType: 'sea-container' | 'air-flight';
    vesselNumber: string;
    orders: DeliveryOrder[];
  } | null>(null);

  // Group orders by vessel
  const groupedOrders = useMemo(() => {
    return orders.reduce((groups, order) => {
      if (!order.forwarding?.vesselNumber) return groups;
      
      const key = `${order.forwarding.vesselType}-${order.forwarding.vesselNumber}`;
      if (!groups[key]) {
        groups[key] = {
          vesselType: order.forwarding.vesselType,
          vesselNumber: order.forwarding.vesselNumber,
          allocationTime: order.forwarding.allocationTime,
          vesselDetails: order.forwarding.vesselDetails,
          orders: [],
          totalBaskets: 0,
          totalWeight: 0,
        };
      }

      // Calculate order totals
      const orderTotalBaskets = order.completion?.actualBaskets.reduce(
        (sum, basket) => sum + basket.quantity,
        0
      ) || 0;
      const orderTotalWeight = order.completion?.actualBaskets.reduce(
        (sum, basket) => sum + basket.basketType * basket.quantity,
        0
      ) || 0;

      groups[key].orders.push(order);
      groups[key].totalBaskets += orderTotalBaskets;
      groups[key].totalWeight += orderTotalWeight;

      return groups;
    }, {} as Record<string, VesselGroup>);
  }, [orders]);

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedOrders).map(([key, group]) => (
        <div key={key} className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b bg-purple-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Ship className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-purple-900">
                      {group.vesselType === 'sea-container' ? 'Container' : 'Flight'}: {group.vesselNumber}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingVessel({
                        vesselType: group.vesselType,
                        vesselNumber: group.vesselNumber,
                        orders: group.orders
                      })}
                      className="text-purple-600 hover:text-purple-700 border-purple-600 hover:border-purple-700"
                    >
                      Edit Vessel Details
                    </Button>
                    <button onClick={() => toggleGroup(key)}>
                      {expandedGroups[key] ? (
                        <ChevronUp className="w-4 h-4 text-purple-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-purple-600" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-purple-600">
                    Allocated: {formatDate(group.allocationTime)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-purple-900">
                  {group.orders.length} Orders
                </div>
                <div className="text-sm text-purple-600">
                  Total: {formatWeight(group.totalWeight)} ({group.totalBaskets} baskets)
                </div>
              </div>
            </div>

            {/* Vessel Details Section */}
            {group.vesselDetails && (
              <div className="mt-2 pt-2 border-t border-purple-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {group.vesselType === 'sea-container' && (
                    <>
                      {group.vesselDetails.containerId && (
                        <div>
                          <span className="text-purple-600">Container ID:</span>
                          <p className="font-medium">{group.vesselDetails.containerId}</p>
                        </div>
                      )}
                      {group.vesselDetails.sealNumber && (
                        <div>
                          <span className="text-purple-600">Seal No:</span>
                          <p className="font-medium">{group.vesselDetails.sealNumber}</p>
                        </div>
                      )}
                    </>
                  )}
                  {group.vesselDetails.vesselName && (
                    <div>
                      <span className="text-purple-600">Vessel Name:</span>
                      <p className="font-medium">{group.vesselDetails.vesselName}</p>
                    </div>
                  )}
                  {group.vesselDetails.doNumber && (
                    <div>
                      <span className="text-purple-600">D/O No:</span>
                      <p className="font-medium">{group.vesselDetails.doNumber}</p>
                    </div>
                  )}
                  {group.vesselDetails.thermeterNumber && (
                    <div>
                      <span className="text-purple-600">Thermometer No:</span>
                      <p className="font-medium">{group.vesselDetails.thermeterNumber}</p>
                    </div>
                  )}
                  {group.vesselDetails.containerTemperature !== undefined && (
                    <div className="flex items-center space-x-1">
                      <Thermometer className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-600">Temperature:</span>
                      <p className="font-medium">
                        {formatTemperature(group.vesselDetails.containerTemperature)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {expandedGroups[key] && (
            <div className="divide-y">
              {group.orders.map((order) => (
                <ForwardingOrderCard 
                  key={order.id} 
                  order={order}
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {editingVessel && (
        <EditVesselDetailsModal
          isOpen={true}
          onClose={() => setEditingVessel(null)}
          vesselType={editingVessel.vesselType}
          vesselNumber={editingVessel.vesselNumber}
          orders={editingVessel.orders}
        />
      )}
    </div>
  );
};