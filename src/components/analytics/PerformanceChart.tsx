import React from 'react';

interface ChartProps {
  title: string;
  data: {
    label: string;
    value: number;
  }[];
}

export const PerformanceChart: React.FC<ChartProps> = ({ title, data }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{item.label}</span>
              <span className="text-gray-500">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};