import React from "react";

interface BarChartProps {
  data: number[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  return (
    <div className="h-64 w-full">
      <svg viewBox="0 0 320 200" className="w-full h-full">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="50"
            y1={30 + i * 30}
            x2="300"
            y2={30 + i * 30}
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => {
          const value = Math.round(maxValue - (i * range / 4));
          return (
            <text
              key={i}
              x="45"
              y={35 + i * 30}
              fill="#4B5563" // Tailwind's gray-700
              fontSize="10"
              textAnchor="end"
              fontWeight="600"
            >
              {value.toLocaleString()}
            </text>
          );
        })}

        {/* Bars */}
        {data.map((value, index) => {
          const normalizedValue = (value - minValue) / range;
          const barHeight = normalizedValue * 120;
          const barWidth = 25;
          const x = 70 + index * 60;
          const y = 150 - barHeight;

          return (
            <g key={index}>
              <defs>
                <linearGradient id={`barGradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.9)" />
                  <stop offset="100%" stopColor="rgba(37, 99, 235, 0.9)" />
                </linearGradient>
              </defs>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={`url(#barGradient${index})`}
                stroke="rgba(0, 0, 0, 0.1)"
                strokeWidth="1"
                rx="3"
              />
              <text
                x={x + barWidth / 2}
                y={y - 5}
                fill="#1F2937" // Tailwind's gray-800
                fontSize="10"
                fontWeight="700"
                textAnchor="middle"
              >
                {value.toLocaleString()}
              </text>
              <text
                x={x + barWidth / 2}
                y="170"
                fill="#374151" // Tailwind's gray-700
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
              >
                {labels[index]}
              </text>
            </g>
          );
        })}

        {/* Unit label */}
        <text
          x="25"
          y="100"
          fill="#6B7280" // Tailwind's gray-500
          fontSize="10"
          textAnchor="middle"
          transform="rotate(-90 12 100)"
        >
          Volume (lbs)
        </text>
      </svg>
    </div>
  );
};

export default BarChart;
