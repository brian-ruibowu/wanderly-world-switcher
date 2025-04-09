
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BottomNavigation from '../components/BottomNavigation';

interface Answer {
  id: number;
  author: string;
  avatar: string;
  text: string;
  yearsInLocation: number;
}

interface Notification {
  id: number;
  questionId: number;
  questionText: string;
  type: 'answer' | 'follow';
  answer?: Answer;
  isNew: boolean;
}

// Sample data for notifications
const notificationsData: Notification[] = [
  {
    id: 1,
    questionId: 6,
    questionText: 'Where can I find authentic, non-touristy street food in Bangkok?',
    type: 'answer',
    answer: {
      id: 1,
      author: 'Davika Hoorne',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'Try Chinatown (Yaowarat) at night, Or Tong Lo Soi 38 for amazing street food without the tourist crowds!',
      yearsInLocation: 8
    },
    isNew: true
  },
  {
    id: 2,
    questionId: 2,
    questionText: "What's the best way to get from the airport to downtown Bangkok at night?",
    type: 'answer',
    answer: {
      id: 2,
      author: 'Mario Maurer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'Airport Rail Link runs until midnight and is the fastest way to avoid traffic. After that, use Grab or the official airport taxis.',
      yearsInLocation: 9
    },
    isNew: false
  },
  {
    id: 3,
    questionId: 5,
    questionText: 'Are there any good vegan restaurants in Bangkok?',
    type: 'follow',
    isNew: false
  }
];

const Inbox: React.FC = () => {
  const navigate = useNavigate();
  
  const handleQuestionClick = (questionId: number) => {
    navigate(`/question/${questionId}`);
  };
  
  const handleTabChange = (tab: string) => {
    console.log('Tab changed to:', tab);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-16">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Inbox</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 text-orange-dark rounded-full flex items-center px-2 py-1">
            <span className="text-sm font-semibold">90</span>
            <span className="ml-1 bg-orange-400 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs">🏆</span>
          </div>
          
          <Avatar 
            className="h-8 w-8 cursor-pointer" 
            onClick={handleProfileClick}
          >
            <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Notifications List */}
      <div className="space-y-4 p-4">
        {notificationsData.map((notification) => (
          <div 
            key={notification.id} 
            className="bg-white rounded-lg p-4 shadow-sm cursor-pointer border border-gray-100"
            onClick={() => handleQuestionClick(notification.questionId)}
          >
            {notification.isNew && (
              <div className="text-sm font-medium text-orange-500 mb-2">
                New answer!
              </div>
            )}
            
            <p className="text-sm font-medium mb-3">{notification.questionText}</p>
            
            {notification.type === 'answer' && notification.answer && (
              <div className="flex items-center mt-2">
                <Avatar className="h-9 w-9 mr-3">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt={notification.answer.author} />
                  <AvatarFallback>{notification.answer.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{notification.answer.author}</div>
                  <div className="text-xs text-gray-500">
                    Lived in Bangkok for {notification.answer.yearsInLocation} years
                  </div>
                </div>
              </div>
            )}
            
            {notification.type === 'follow' && (
              <div className="text-xs text-gray-500">
                Someone is following your question
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="my_questions" onTabChange={handleTabChange} />
    </div>
  );
};

export default Inbox;
