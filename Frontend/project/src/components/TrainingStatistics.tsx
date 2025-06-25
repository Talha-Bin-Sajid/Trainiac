import React from "react";
import { Flame, Trophy, Target, Award } from "lucide-react";

const TrainingStatistics: React.FC = () => {
  const stats = [
    {
      icon: Flame,
      label: "Calories Burned",
      value: "2,450",
      subtext: "+320 from last week",
      bgColor: "bg-gradient-to-r from-cyan-400 to-blue-600",
      iconColor: "bg-cyan-100 text-cyan-600"
    },
    {
      icon: Trophy,
      label: "Current Streak",
      value: "12 days",
      subtext: "Personal best!",
      bgColor: "bg-gradient-to-r from-emerald-400 to-emerald-600",
      iconColor: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Target,
      label: "Goal Progress",
      value: "78%",
      subtext: "Weekly target: 85%",
      bgColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: Award,
      label: "Form Accuracy",
      value: "92%",
      subtext: "Posture score",
      bgColor: "bg-gradient-to-r from-slate-500 to-slate-700",
      iconColor: "bg-slate-100 text-slate-600",
    }
  ];

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Training Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 text-white hover:shadow-md transition-all duration-300 ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.iconColor}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xs text-white/80 font-medium mb-1 uppercase tracking-wide">
              {stat.label}
            </h3>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-white/80 font-medium">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingStatistics;