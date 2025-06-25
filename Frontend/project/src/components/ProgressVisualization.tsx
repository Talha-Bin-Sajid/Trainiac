import React from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const ProgressVisualization: React.FC = () => {
  // Chart Data
  const dailyActivityData = [45, 60, 30, 50, 75, 30, 0];
  const dailyActivityLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const muscleGroupData = [30, 20, 15, 15, 20];
  const muscleGroupLabels = ['Legs', 'Arms', 'Core', 'Back', 'Full Body'];

  const weeklyVolumeData = [12500, 14500, 13800, 16200];
  const weeklyVolumeLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Progress Visualization</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Activity Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow w-full">
          <h4 className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-4">
            Daily Activity (Minutes)
          </h4>
          <LineChart data={dailyActivityData} labels={dailyActivityLabels} />
        </div>

        {/* Muscle Group Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow w-full">
          <h4 className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-4">
            Muscle Group Focus
          </h4>
          <PieChart data={muscleGroupData} labels={muscleGroupLabels} />
        </div>

        {/* Weekly Volume Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow w-full">
          <h4 className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-4">
            Weekly Training Volume
          </h4>
          <BarChart data={weeklyVolumeData} labels={weeklyVolumeLabels} />
        </div>
      </div>
    </div>
  );
};

export default ProgressVisualization;
