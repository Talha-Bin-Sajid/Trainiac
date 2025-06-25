// import React from "react";

const DailyActivityChart = () => {
  const days = [
    { name: 'Mon', value: 96 },
    { name: 'Tue', value: 78 },
    { name: 'Wed', value: 48 },
    { name: 'Thu', value: 36 },
    { name: 'Fri', value: 84 },
    { name: 'Sat', value: 72 },
    { name: 'Sun', value: 24 }
  ];

  const total = days.reduce((sum, d) => sum + d.value, 0);
  const average = Math.round(total / days.length);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-bold text-gray-900">Daily Activity</h4>
        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Last 7 Days
        </span>
      </div>

      {/* Chart Body */}
      <div className="flex h-60 mb-4">
        {/* Y Axis */}
        <div className="flex flex-col justify-between w-12 h-44 mt-2 mr-2 text-right text-xs text-slate-500">
          <span>120 min</span>
          <span>90 min</span>
          <span>60 min</span>
          <span>30 min</span>
          <span>0 min</span>
        </div>

        {/* Bars */}
        <div className="flex flex-col flex-1">
          <div className="flex items-end gap-3 h-44 border-b border-l border-slate-200 px-2">
            {days.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className="relative w-full max-w-[40px] bg-gradient-to-t from-blue-500 to-indigo-700 rounded-t-md flex justify-center"
                  style={{ height: `${(day.value / 120) * 100}%` }}
                >
                  <span className="absolute -top-5 text-xs font-medium text-slate-800">
                    {day.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* X Axis Labels */}
          <div className="flex gap-3 mt-2 px-2">
            {days.map((day, index) => (
              <div key={index} className="flex-1 text-center text-sm text-slate-500">
                {day.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Label below chart */}
      <div className="text-center text-sm text-slate-500 mb-4">
        Workout Minutes
      </div>

      {/* Summary */}
      <div className="pt-4 border-t border-slate-100 flex justify-between flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-1 text-slate-500">
          <span>Total workout time:</span>
          <span className="font-medium text-slate-800">{total} minutes</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <span>Daily average:</span>
          <span className="font-medium text-slate-800">{average} min/day</span>
        </div>
      </div>
    </div>
  );
};

export default DailyActivityChart;
