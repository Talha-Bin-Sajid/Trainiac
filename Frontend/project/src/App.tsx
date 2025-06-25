import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import InputForm from './components/InputForm';
import ProfileTab from './components/ProfileTab';

// Define the user data interface here to share across components
interface UserData {
  name: string;
  age: number;
  weight: number;
  height: number;
  pushups: number;
  pullups: number;
  squats: number;
}

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'form'>('dashboard');
  const [userData, setUserData] = useState<UserData>({
    name: "Talha Bin Sajid",
    age: 21,
    weight: 52,
    height: 175,
    pushups: 20,
    pullups: 10,
    squats: 40,
  });

  const handleProfileUpdate = (updatedProfile: UserData) => {
    setUserData(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-800">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              currentView === 'dashboard' ? (
                <Dashboard 
                  userData={userData}
                  onNavigateToForm={() => setCurrentView('form')}
                />
              ) : (
                <InputForm 
                  onNavigateToDashboard={() => setCurrentView('dashboard')}
                />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProfileTab 
                profile={userData}
                onProfileUpdate={handleProfileUpdate}
              />
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;