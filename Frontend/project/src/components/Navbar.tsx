import React from "react";
import { Flame, User, Menu } from "lucide-react";

interface NavbarProps {
  onNavigateToForm: () => void;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigateToForm,
  isChatbotOpen,
  setIsChatbotOpen,
  isSidebarOpen,
  toggleSidebar
}) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white font-sans">Trainiac</h1>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-4">
        <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200 font-medium">
          Dashboard
        </button>
        <button
          onClick={onNavigateToForm}
          className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
        >
          Workouts
        </button>
        <button className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium">
          Posture Correction
        </button>
        <button className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium">
          Progress
        </button>
      </nav>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200 relative flex items-center space-x-2"
        >
          <span className="text-sm font-medium">Coach AI</span>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;