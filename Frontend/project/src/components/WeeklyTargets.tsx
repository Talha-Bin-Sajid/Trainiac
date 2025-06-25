import React from "react";
import { TrendingUp } from "lucide-react";

const WeeklyTargets: React.FC = () => {
  const targets = [
    {
      label: "Workouts",
      value: "4/5",
      progress: 80,
      gradient: "from-cyan-400 to-blue-600"
    },
    {
      label: "Calories",
      value: "2,450/3,000",
      progress: 82,
      gradient: "from-emerald-400 to-emerald-600"
    },
    {
      label: "Protein Intake",
      value: "128/150g",
      progress: 85,
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      label: "Goal Completion Rate",
      value: "78%",
      progress: 78,
      gradient: "from-slate-500 to-slate-700"
    },
    {
      label: "Form Accuracy",
      value: "92/95 %",
      progress: 97,
      gradient: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow w-full">
      <div className="flex items-center justify-between mb-7">
        <h3 className="text-xl font-bold text-gray-900">Weekly Targets</h3>
        <TrendingUp className="w-5 h-5 text-blue-500" />
      </div>

      <div className="space-y-6">
        {targets.map((target, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-600 text-sm font-medium">{target.label}</span>
              <span className="text-gray-900 text-sm font-semibold">{target.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${target.gradient} h-2 rounded-full`}
                style={{ width: `${target.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTargets;