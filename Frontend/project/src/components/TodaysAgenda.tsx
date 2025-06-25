import React from "react";
import { Dumbbell, Heart, Calendar } from "lucide-react";

const TodaysAgenda: React.FC = () => {
  const todaysSchedule = [
    {
      title: "Functional Strength",
      time: "6:00 PM • 45 minutes",
      status: "upcoming",
      icon: Dumbbell,
      type: "strength"
    },
    {
      title: "Recovery Yoga",
      time: "8:30 PM • 30 minutes",
      status: "scheduled",
      icon: Heart,
      type: "flexibility"
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Today's Agenda</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {todaysSchedule.map((session, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${
                session.type === "strength"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-cyan-400 to-blue-400"
              } shadow`}>
                <session.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold">{session.title}</h4>
                <p className="text-gray-600 text-sm">{session.time}</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-white/10 text-gray-800 text-sm rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20">
              Prepare
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysAgenda;
