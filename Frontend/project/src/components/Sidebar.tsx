import React, { useState, useEffect } from "react";
import { ChevronDown, Home, Dumbbell, Award, User } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onProfileClick: () => void;
  currentView: string; // Changed from currentPath to currentView
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onProfileClick,
  currentView // Changed from currentPath to currentView
}) => {
  const navItems = [
    { name: "Overview", icon: Home, path: "overview" },
    { name: "Posture Correction", icon: Award, path: "posture-correction" },
    { name: "User Profile", icon: User, path: "profile" },
  ];

  // Determine active item based on currentView
  const getActiveNavItem = () => {
    return navItems.find(item => item.name === currentView)?.name || "Overview";
  };

  const [activeNavItem, setActiveNavItem] = useState(getActiveNavItem());

  // Sync active nav item with currentView
  useEffect(() => {
    setActiveNavItem(getActiveNavItem());
  }, [currentView]);

  const handleNavigation = (itemName: string, path: string) => {
    setActiveNavItem(itemName);
    if (itemName === "User Profile") {
      onProfileClick();
    } else {
      onNavigate(path);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white z-20 shadow-lg border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "translate-x-0 w-64" : "-translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="p-4 h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold flex items-center">
            <Dumbbell className="mr-2 w-5 h-5 text-blue-600" aria-hidden="true" />
            <span className="text-gray-800">Trainiac</span>
          </h1>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            aria-label="Close sidebar"
          >
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </button>
        </header>

        <nav className="flex-grow">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.name, item.path)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeNavItem === item.name
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                  aria-current={activeNavItem === item.name ? "page" : undefined}
                >
                  <item.icon 
                    className={`w-5 h-5 mr-3 ${
                      activeNavItem === item.name ? "text-blue-600" : "text-gray-500"
                    }`} 
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;