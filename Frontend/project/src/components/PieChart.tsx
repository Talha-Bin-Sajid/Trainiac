import React from "react";

interface PieChartProps {
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  const colors = [
    "#34D399", "#60A5FA", "#A78BFA", "#FBBF24", "#F87171",
    "#38BDF8", "#F472B6", "#4ADE80", "#FACC15", "#FB7185",
  ];

  let cumulativeAngle = 0;
  const segments = data.map((value, index) => {
    const angle = (value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const midRad = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
    const largeArcFlag = angle > 180 ? 1 : 0;

    const x1 = 100 + 70 * Math.cos(startRad);
    const y1 = 100 + 70 * Math.sin(startRad);
    const x2 = 100 + 70 * Math.cos(endRad);
    const y2 = 100 + 70 * Math.sin(endRad);

    const labelX = 100 + 45 * Math.cos(midRad);
    const labelY = 100 + 45 * Math.sin(midRad);

    const pathData = [
      `M 100 100`,
      `L ${x1} ${y1}`,
      `A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(" ");

    return {
      path: pathData,
      color: colors[index % colors.length],
      label: labels[index],
      percentage: Math.round((value / total) * 100),
      value,
      labelX,
      labelY,
    };
  });

  return (
    <div className="h-64 w-full flex items-center">
      <div className="w-1/2">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
              opacity="0.9"
            />
          ))}
        </svg>
      </div>
      <div className="w-1/2 pl-2">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2 border border-white/30 shadow"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-gray-800 text-sm font-medium">
                {segment.label}
              </span>
            </div>
            <div className="text-right">
              <div className="text-gray-800 text-sm font-bold">
                {segment.percentage}%
              </div>
              <div className="text-gray-600 text-xs">
                {segment.value} sets
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
