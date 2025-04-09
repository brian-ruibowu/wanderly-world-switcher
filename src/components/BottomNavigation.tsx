
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleAskClick = () => {
    navigate('/ask');
  };
  
  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    
    switch(tab) {
      case 'home':
        navigate('/home');
        break;
      case 'help':
        navigate('/');
        break;
      case 'my_questions':
        navigate('/inbox');
        break;
      case 'chat':
        navigate('/chat');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 grid grid-cols-5 py-2">
      <button 
        className={`flex flex-col items-center justify-center p-2 ${activeTab === 'home' || location.pathname === '/home' ? 'text-orange-400' : 'text-gray-500'}`}
        onClick={() => handleTabClick('home')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[10px]">Home</span>
      </button>
      
      <button 
        className={`flex flex-col items-center justify-center p-2 ${activeTab === 'help' || location.pathname === '/' ? 'text-orange-400' : 'text-gray-500'}`}
        onClick={() => handleTabClick('help')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[10px]">Help Travelers</span>
      </button>

      <div className="flex flex-col items-center justify-center relative">
        <button 
          className="absolute top-2 transform -translate-y-1/2 bg-orange-400 rounded-full p-3"
          onClick={handleAskClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <span className="text-[10px] mt-8">Ask</span>
      </div>
      
      <button 
        className={`flex flex-col items-center justify-center p-2 ${activeTab === 'chat' || location.pathname === '/chat' ? 'text-orange-400' : 'text-gray-500'}`}
        onClick={() => handleTabClick('chat')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="text-[10px]">Chat</span>
      </button>
      
      <button 
        className={`flex flex-col items-center justify-center p-2 ${activeTab === 'my_questions' || location.pathname === '/inbox' ? 'text-orange-400' : 'text-gray-500'}`}
        onClick={() => handleTabClick('my_questions')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span className="text-[10px]">My Questions</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
