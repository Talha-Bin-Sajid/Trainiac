import React from "react";
import { Play, Plus, Calendar, BarChart3 } from "lucide-react";

interface QuickActionsProps {
  onNavigateToForm: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNavigateToForm }) => {
  const quickActions = [
    {
      icon: Play,
      title: "Quick Start",
      subtitle: "Begin a preset routine",
      color: "from-cyan-400 to-blue-600",
      onClick: () => console.log("Quick start")
    },
    {
      icon: Plus,
      title: "Custom Workout",
      subtitle: "Build your own routine",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: Calendar,
      title: "Plan Session",
      subtitle: "Schedule future workouts",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: BarChart3,
      title: "Performance",
      subtitle: "View detailed analytics",
      color: "from-slate-500 to-slate-700",
    },
  ];

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow w-full mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
        <div className="text-xs text-gray-400 font-medium">Frequently used</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow w-full hover:bg-white/10 transition-all duration-300 group text-left hover:shadow-md"
          >
            <div className="flex items-center space-x-4 ">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} shadow`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold">{action.title}</h4>
                <p className="text-gray-600 text-sm">{action.subtitle}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
