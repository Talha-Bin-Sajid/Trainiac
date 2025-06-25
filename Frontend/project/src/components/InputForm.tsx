import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Calendar, Clock, Target, Dumbbell, Activity, User, Zap } from 'lucide-react';

interface InputFormProps {
  onNavigateToDashboard: () => void;
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

const InputForm: React.FC<InputFormProps> = ({ onNavigateToDashboard }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: 1,
    reps: 1,
    weight: 0
  });
  const [notes, setNotes] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');

  const workoutTypes = [
    { name: 'Strength Training', icon: Dumbbell, color: 'from-indigo-500 to-indigo-600' },
    { name: 'Cardio', icon: Activity, color: 'from-blue-500 to-blue-600' },
    { name: 'HIIT', icon: Zap, color: 'from-purple-500 to-purple-600' },
    { name: 'Yoga', icon: User, color: 'from-cyan-500 to-cyan-600' },
  ];

  const [selectedWorkoutType, setSelectedWorkoutType] = useState('');

  const addExercise = () => {
    if (newExercise.name) {
      const exercise: Exercise = {
        id: Date.now(),
        ...newExercise
      };
      setExercises([...exercises, exercise]);
      setNewExercise({ name: '', sets: 1, reps: 1, weight: 0 });
    }
  };

  const removeExercise = (id: number) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleSave = () => {
    // Here you would typically save to a database
    console.log('Saving workout:', {
      workoutName,
      workoutDate,
      duration,
      selectedWorkoutType,
      exercises,
      notes,
      caloriesBurned
    });
    
    // Show success message and navigate back
    alert('Workout saved successfully!');
    onNavigateToDashboard();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-800 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onNavigateToDashboard}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Create Workout</h1>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
        >
          <Save className="w-5 h-5" />
          <span>Save Workout</span>
        </button>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Basic Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-6">Workout Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Workout Name
              </label>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="e.g., Upper Body Strength"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={workoutDate}
                  onChange={(e) => setWorkoutDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Calendar className="absolute right-3 top-3 w-5 h-5 text-white/50 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Duration (minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="45"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Clock className="absolute right-3 top-3 w-5 h-5 text-white/50 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Calories Burned
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                  placeholder="350"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Zap className="absolute right-3 top-3 w-5 h-5 text-white/50 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Workout Type Selection */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-6">Workout Type</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workoutTypes.map((type, index) => (
              <button
                key={index}
                onClick={() => setSelectedWorkoutType(type.name)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  selectedWorkoutType === type.name
                    ? 'bg-white/20 border-indigo-500'
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                }`}
              >
                <div className={`p-3 rounded-lg ${type.color} mb-3 w-fit mx-auto shadow`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium text-sm">{type.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Exercises */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-6">Exercises</h2>
          
          {/* Add Exercise Form */}
          <div className="bg-white/10 rounded-lg p-4 mb-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Add Exercise</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <input
                  type="text"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                  placeholder="Exercise name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={newExercise.sets}
                  onChange={(e) => setNewExercise({...newExercise, sets: parseInt(e.target.value)})}
                  placeholder="Sets"
                  min="1"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={newExercise.reps}
                  onChange={(e) => setNewExercise({...newExercise, reps: parseInt(e.target.value)})}
                  placeholder="Reps"
                  min="1"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <div className="flex">
                  <input
                    type="number"
                    value={newExercise.weight}
                    onChange={(e) => setNewExercise({...newExercise, weight: parseFloat(e.target.value)})}
                    placeholder="Weight"
                    min="0"
                    step="0.5"
                    className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={addExercise}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-r-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise List */}
          <div className="space-y-3">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="flex items-center justify-between bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{exercise.name}</h4>
                  <p className="text-white/80 text-sm">
                    {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight > 0 && ` @ ${exercise.weight} kg`}
                  </p>
                </div>
                <button
                  onClick={() => removeExercise(exercise.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {exercises.length === 0 && (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">No exercises added yet. Add your first exercise above!</p>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-4">Workout Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did the workout feel? Any observations or goals for next time..."
            rows={4}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm;