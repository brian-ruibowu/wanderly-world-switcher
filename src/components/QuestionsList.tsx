import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Question } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface QuestionsListProps {
  questions: Question[];
}

const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
  const navigate = useNavigate();
  
  const handleQuestionClick = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };
  
  return (
    <div className="space-y-3 px-4">
      {questions.map((question) => (
        <div 
          key={question.id} 
          className="bg-white rounded-lg p-4 shadow-sm cursor-pointer"
          onClick={() => handleQuestionClick(question.id)}
        >
          <div className="flex items-start">
            <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="text-sm font-medium mb-2">{question.title}</p>
              <p className="text-xs text-gray-600 mb-2">{question.description.length > 100 
                ? `${question.description.substring(0, 100)}...` 
                : question.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  {question.location}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 flex justify-between">
                <span>{question.answers?.length || 0} Answers</span>
                <span>{formatDistanceToNow(new Date(question.createdAt))} ago</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button className="bg-orange-light text-black font-medium rounded-full py-2 px-4 w-auto flex items-center mx-auto mt-4">
        More Questions
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default QuestionsList;
