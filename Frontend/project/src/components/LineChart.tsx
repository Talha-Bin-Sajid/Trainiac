import React from "react";

interface LineChartProps {
  data: number[];
  labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ data, labels }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const points = data.map((value, index) => ({
    x: 40 + (index / (data.length - 1)) * 240,
    y: 160 - ((value - minValue) / (maxValue - minValue)) * 120
  }));

  const pathData = points.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="h-64 w-full">
      <svg viewBox="0 0 320 200" className="w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.6)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="40"
            y1={40 + i * 30}
            x2="280"
            y2={40 + i * 30}
            stroke="rgba(75, 85, 99, 0.2)"  // text-gray-600 with opacity
            strokeWidth="1"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => {
          const value = Math.round(maxValue - (i * (maxValue - minValue) / 4));
          return (
            <text
              key={i}
              x="35"
              y={45 + i * 30}
              fill="rgba(31, 41, 55, 0.8)" // text-gray-800
              fontSize="11"
              textAnchor="end"
              fontWeight="600"
            >
              {value}
            </text>
          );
        })}

        {/* Area fill */}
        <path
          d={`${pathData} L 280 160 L 40 160 Z`}
          fill="url(#lineGradient)"
        />

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(34, 197, 94, 1)"
          strokeWidth="3"
        />

        {/* Points with values */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="rgba(34, 197, 94, 1)"
              stroke="#1F2937"  // gray-800
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={point.y - 12}
              fill="#1F2937"  // text-gray-800
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              {data[index]}
            </text>
          </g>
        ))}

        {/* Labels */}
        {labels.map((label, index) => (
          <text
            key={index}
            x={40 + (index / (labels.length - 1)) * 240}
            y="185"
            fill="#374151"  // text-gray-700
            fontSize="12"
            fontWeight="600"
            textAnchor="middle"
          >
            {label}
          </text>
        ))}

        {/* Unit label */}
        <text
          x="20"
          y="100"
          fill="#6B7280"  // text-gray-500
          fontSize="10"
          textAnchor="middle"
          transform="rotate(-90 20 100)"
        >
          Minutes
        </text>
      </svg>
    </div>
  );
};

export default LineChart;
