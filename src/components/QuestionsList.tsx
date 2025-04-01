
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Tag {
  name: string;
  color?: string;
}

interface Question {
  id: number;
  avatar: string;
  text: string;
  tags: Tag[];
  answers: number;
  following: number;
}

interface QuestionsListProps {
  questions: Question[];
}

const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
  const navigate = useNavigate();
  
  const handleQuestionClick = (questionId: number) => {
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
              <p className="text-sm font-medium mb-2">{question.text}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {question.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`text-xs px-2 py-1 rounded-full ${
                      tag.name === 'hostel' || tag.name === 'accommodation' 
                        ? 'bg-green-100 text-green-800'
                        : tag.name === 'transportation' 
                        ? 'bg-blue-100 text-blue-800'
                        : tag.name === 'event' || tag.name === 'music festival'
                        ? 'bg-purple-100 text-purple-800'
                        : tag.name === 'food' || tag.name === 'vegan'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                {question.answers} Answers · {question.following} following
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
