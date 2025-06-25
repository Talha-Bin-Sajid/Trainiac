import React from "react";
import { Flame } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pt-8 pb-6 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-700  rounded-lg flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-800 font-medium">Trainiac</span>
        </div>
        <div className="text-gray-600 text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} Trainiac Fitness Dashboard. All rights reserved.</p>
          <p className="mt-1">Helping you achieve your fitness goals with data-driven insights.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;