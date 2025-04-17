import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BottomNavigation from '../components/BottomNavigation';
import { useQuestions } from '@/context/QuestionsContext';
import { format } from 'date-fns';

const Inbox: React.FC = () => {
  const navigate = useNavigate();
  const { questions } = useQuestions();
  
  const handleQuestionClick = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };
  
  const handleTabChange = (tab: string) => {
    console.log('Tab changed to:', tab);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Sample notification data
  const notificationsData = [
    {
      id: 1,
      questionId: "1",
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
      questionId: "2",
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
      questionId: "3",
      questionText: 'Are there any good vegan restaurants in Bangkok?',
      type: 'follow',
      isNew: false
    }
  ];

  // Filter to show only the user's questions
  const myQuestions = questions.filter(q => q.userName === "CurrentUser");

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
      {myQuestions.length > 0 && (
        <div className="mt-4 px-4">
          <h2 className="text-lg font-semibold mb-2">My Questions</h2>
          <div className="space-y-4">
            {myQuestions.map((question) => (
              <div 
                key={question.id} 
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer border border-gray-100"
                onClick={() => handleQuestionClick(question.id)}
              >
                <p className="text-sm font-medium mb-3">{question.title}</p>
                <p className="text-xs text-gray-600 mb-3">{question.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {question.location}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>
                    {question.answers?.length || 0} Answers
                  </span>
                  <span>{format(new Date(question.createdAt), 'MMM d, yyyy')}</span>
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
      {myQuestions.length === 0 && notificationsData.length === 0 && (
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
