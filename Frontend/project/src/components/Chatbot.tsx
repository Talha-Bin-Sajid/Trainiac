import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Zap, Target, Calendar, BarChart3, User, Bot, Sparkles, Gauge, ChevronUp, ChevronDown } from 'lucide-react';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI fitness coach. How can I help you achieve your fitness goals today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize with more features to demonstrate scrolling
  const chatbotFeatures = [
    { icon: Target, title: 'Goal Setting', description: 'Set and track personalized fitness goals', color: 'blue' },
    { icon: Calendar, title: 'Workout Planning', description: 'Create custom workout schedules', color: 'blue' },
    { icon: BarChart3, title: 'Progress Tracking', description: 'Monitor your fitness journey', color: 'blue' },
    { icon: Zap, title: 'Motivation', description: 'Daily motivation and tips', color: 'blue' },
    { icon: Gauge, title: 'Intensity Control', description: 'Adjust workout difficulty', color: 'blue' },
    { icon: User, title: 'Personalized Plans', description: 'Tailored to your needs', color: 'blue' }
  ];

  const quickResponses = [
    "Create a workout plan",
    "Track my progress",
    "Set fitness goals",
    "Show my weekly stats",
    "Recommend exercises",
    "Nutrition advice"
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = generateBotResponse(inputMessage);
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
      
      setInputMessage('');
    }
  };

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return {
        id: messages.length + 2,
        text: "Great! I can help you create a personalized workout plan. What type of exercises do you prefer (cardio, strength, flexibility)?",
        sender: 'bot',
        timestamp: new Date()
      };
    } else if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      return {
        id: messages.length + 2,
        text: "You're making excellent progress! This week you've completed 4 workouts and burned 2,847 calories. Keep up the great work!",
        sender: 'bot',
        timestamp: new Date()
      };
    } else if (lowerMessage.includes('goal') || lowerMessage.includes('target')) {
      return {
        id: messages.length + 2,
        text: "Let's set some SMART fitness goals (Specific, Measurable, Achievable, Relevant, Time-bound). What would you like to achieve?",
        sender: 'bot',
        timestamp: new Date()
      };
    } else if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
      return {
        id: messages.length + 2,
        text: "Nutrition is key to fitness success! I can provide meal suggestions based on your goals. Are you looking to lose weight, gain muscle, or maintain?",
        sender: 'bot',
        timestamp: new Date()
      };
    } else {
      return {
        id: messages.length + 2,
        text: "I'm here to help with your fitness journey! Ask me about workouts, progress tracking, goal setting, or nutrition advice.",
        sender: 'bot',
        timestamp: new Date()
      };
    }
  };

  const handleQuickResponse = (response: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: response,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(response);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-96 bg-white/10 backdrop-blur-lg border-l border-white/20 transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">AI Coach</h3>
                <p className="text-gray-800 text-sm">Online</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-800 text-sm mb-3">Remember: Consistency is key - every workout counts!</p>
            <div className="flex items-center justify-center space-x-2 text-gray-800 text-xs">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Personal Trainer</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="p-4 border-b border-white/20 overflow-y-auto">
          <h4 className="text-gray-800 font-semibold mb-3">Chat Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {chatbotFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
                onClick={() => handleQuickResponse(feature.title)}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r mb-2 from-blue-500 to-blue-600 w-fit`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <h5 className="text-gray-800 text-sm font-medium mb-1">{feature.title}</h5>
                <p className="text-gray-800 text-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Responses */}
        <div className="p-4 border-t border-white/20">
          <p className="text-gray-800 text-sm mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => handleQuickResponse(response)}
                className="px-3 py-1 bg-white/20 text-gray-800 text-xs rounded-full hover:bg-white/30 transition-colors"
              >
                {response}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-3 border-t border-white/20">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-white rounded px-3 py-2 text-sm shadow-sm focus:outline-none"
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;