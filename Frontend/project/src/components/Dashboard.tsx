import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import Footer from "./Footer";
import TrainingStatistics from "./TrainingStatistics";
import QuickActions from "./QuickActions";
import WeeklyTargets from "./WeeklyTargets";
import ProgressVisualization from "./ProgressVisualization";
import TodaysAgenda from "./TodaysAgenda";
import Sidebar from "./Sidebar";
import { Flame, Menu } from "lucide-react";
import DailyActivityChart from "./DailyActivityChart";

interface UserData {
  name: string;
  age: number;
  weight: number;
  height: number;
  pushups: number;
  pullups: number;
  squats: number;
}

interface DashboardProps {
  userData: UserData;
  onNavigateToForm: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onNavigateToForm }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("Overview");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (path: string) => {
    setCurrentView(
      path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-30 bg-white px-4 py-3 flex items-center justify-between shadow-sm border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-700 rounded-lg flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Trainiac</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsChatbotOpen(!isChatbotOpen)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-700 rounded-lg text-white hover:from-blue-600 hover:to-indigo-800 transition-all duration-200 flex items-center space-x-2"
            aria-label="Open chatbot"
          >
            <span className="text-sm font-medium">Coach AI</span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        onNavigate={handleNavigate}
        onProfileClick={handleProfileClick}
        currentView={currentView}

      />

      {/* Sidebar toggle when closed */}
      {!isSidebarOpen && (
        <div className="fixed top-4 left-4 z-40">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } p-4 md:p-6 lg:p-8 pt-24 min-h-screen`}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 tracking-tight">
          {currentView}
        </h1>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 text-sm">
            Your weekly fitness summary and activities
          </p>
        </div>

        <TrainingStatistics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 mb-10">
          <div className="lg:col-span-2">
            <DailyActivityChart />
          </div>
          <div className="lg:col-span-1">
            <WeeklyTargets />
          </div>
        </div>

        <QuickActions onNavigateToForm={onNavigateToForm} />

        <ProgressVisualization/>
        <TodaysAgenda />
        <Footer />
      </div>

      {/* Chatbot */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default Dashboard;