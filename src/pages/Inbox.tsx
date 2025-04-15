import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BottomNavigation from '../components/BottomNavigation';
import { useQuestions } from '@/context/QuestionsContext';
import { format } from 'date-fns';

const Inbox: React.FC = () => {
  const navigate = useNavigate();
  const { questions } = useQuestions();
  
  const handleQuestionClick = (questionId: number) => {
    navigate(`/question/${questionId}`);
  };
  
  const handleTabChange = (tab: string) => {
    console.log('Tab changed to:', tab);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Sample notification data (keeping for backwards compatibility)
  const notificationsData = [
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
      
      {/* My Questions Section */}
      {questions.length > 0 && (
        <div className="mt-4 px-4">
          <h2 className="text-lg font-semibold mb-2">My Questions</h2>
          <div className="space-y-4">
            {questions.map((question) => (
              <div 
                key={question.id} 
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer border border-gray-100"
                onClick={() => handleQuestionClick(question.id)}
              >
                {question.isNew && (
                  <div className="text-sm font-medium text-orange-500 mb-2">
                    Awaiting answers
                  </div>
                )}
                
                <p className="text-sm font-medium mb-3">{question.text}</p>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {question.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`text-xs px-2 py-1 rounded-full ${
                        tag.name === 'hotel' || tag.name === 'accommodation' 
                          ? 'bg-green-100 text-green-800'
                          : tag.name === 'traffic' || tag.name === 'transportation' 
                          ? 'bg-blue-100 text-blue-800'
                          : tag.name === 'event' || tag.name === 'music festival'
                          ? 'bg-purple-100 text-purple-800'
                          : tag.name === 'food' || tag.name === 'street food' || tag.name === 'vegan'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>{question.answers} Answers · {question.following} following</span>
                  <span>{format(question.createdAt, 'MMM d, yyyy')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Notifications List - Only show if we have notifications */}
      {notificationsData.length > 0 && (
        <div className="mt-4 px-4">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <div className="space-y-4">
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
        </div>
      )}
      
      {/* Empty state if no questions or notifications */}
      {questions.length === 0 && notificationsData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[50vh] px-4">
          <div className="text-gray-400 mb-4 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-lg font-medium mb-2">No questions yet</h3>
            <p className="text-sm">Ask your first question about your trip to get help from locals!</p>
          </div>
          <button 
            className="mt-4 bg-orange-400 text-white px-6 py-2 rounded-full font-medium"
            onClick={() => navigate('/ask')}
          >
            Ask a Question
          </button>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="my_questions" onTabChange={handleTabChange} />
    </div>
  );
};

export default Inbox;
