import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { Flame, Menu } from "lucide-react";
import Chatbot from "./Chatbot";

interface ProfileData {
  name: string;
  age: number;
  weight: number;
  height: number;
  pushups: number;
  pullups: number;
  squats: number;
}

interface ProfileTabProps {
  profile: ProfileData;
  onProfileUpdate: (updatedProfile: ProfileData) => void;
}

interface InfoRowProps {
  label: string;
  value: string | number;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex justify-between text-sm text-gray-600">
    <span>{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max, color }) => {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value} reps</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, onProfileUpdate }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState(profile);
  const [currentView, setCurrentView] = useState("User Profile"); // Initialize as "User Profile"
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (path: string) => {
    // Convert to lowercase and remove any leading/trailing slashes
    const cleanPath = path.toLowerCase().replace(/^\/|\/$/g, '');

    // Special case for dashboard/overview
    if (cleanPath === 'overview' || cleanPath === 'dashboard') {
      navigate('/');
    } else {
      navigate(`/${cleanPath}`);
    }

    // Update the current view name for display
    setCurrentView(
      cleanPath
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const calculateBMI = (weight: number, height: number): number => {
    return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(1));
  };

  const totalReps = formData.pushups + formData.pullups + formData.squats;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleSave = () => {
    setIsEditing(false);
    onProfileUpdate(formData);
    navigate(-1); // Go back after saving
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
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
        currentView={currentView} // Pass the currentView prop
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
        className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"
          } p-4 md:p-6 lg:p-8 pt-24 min-h-screen`}
      >
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden my-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{formData.name}</h1>
              <p className="text-sm opacity-90">Fitness Profile Overview</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Edit Profile
              </button>
              
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Info</h2>
              <InfoRow label="Age" value={`${formData.age} yrs`} />
              <InfoRow label="Weight" value={`${formData.weight} kg`} />
              <InfoRow label="Height" value={`${formData.height} cm`} />
              <InfoRow label="BMI" value={calculateBMI(formData.weight, formData.height)} />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Training Stats</h2>
              <InfoRow label="Pushups" value={`${formData.pushups} reps`} />
              <InfoRow label="Pullups" value={`${formData.pullups} reps`} />
              <InfoRow label="Squats" value={`${formData.squats} reps`} />
              <InfoRow label="Total Volume" value={`${totalReps} reps`} />
            </div>
          </div>

          <div className="p-8 pt-0">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">Exercise Capacity</h2>
            <div className="space-y-6">
              <ProgressBar label="Pushups" value={formData.pushups} max={50} color="bg-blue-500" />
              <ProgressBar label="Pullups" value={formData.pullups} max={20} color="bg-green-500" />
              <ProgressBar label="Squats" value={formData.squats} max={100} color="bg-purple-500" />
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                {Object.entries(formData).map(([field, value]) => {
                  if (field === 'name') return null;
                  return (
                    <div key={field} className="mb-4">
                      <label className="block text-sm text-gray-600 mb-1 capitalize">{field}</label>
                      <input
                        type="number"
                        name={field}
                        value={value as number}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Chatbot */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default ProfileTab;