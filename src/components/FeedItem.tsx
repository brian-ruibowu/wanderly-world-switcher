
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface FeedItemProps {
  item: {
    id: number;
    question: string;
    tags: string[];
    answers: number;
    following: number;
    previewResponse: string;
    userAvatar: string;
    responderAvatar: string;
    images?: string[];
  };
}

const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
  const navigate = useNavigate();
  
  const handleQuestionClick = () => {
    navigate(`/question/${item.id}`);
  };
  
  return (
    <div 
      className="px-4 py-3 cursor-pointer"
      onClick={handleQuestionClick}
    >
      {/* Question */}
      <h2 className="font-medium text-base mb-2">{item.question}</h2>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {item.tags.map((tag, idx) => (
          <span 
            key={idx} 
            className={`text-xs px-2 py-1 rounded-full border ${
              tag === 'hostel' || tag === 'accommodation' 
                ? 'bg-green-100 text-green-800 border-green-200'
                : tag === 'transportation' 
                ? 'bg-blue-100 text-blue-800 border-blue-200'
                : tag === 'event' || tag === 'music festival'
                ? 'bg-purple-100 text-purple-800 border-purple-200'
                : tag === 'food' || tag === 'vegan'
                ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                : tag === 'market' || tag === 'shopping'
                ? 'bg-pink-100 text-pink-800 border-pink-200'
                : 'bg-gray-100 text-gray-800 border-gray-200'
            }`}
          >
            #{tag}
          </span>
        ))}
      </div>
      
      {/* Answers and following count */}
      <div className="text-xs text-gray-500 mb-3">
        {item.answers} Answers · {item.following} following
      </div>
      
      {/* Answer preview */}
      <div className="flex items-start mb-2">
        <Avatar className="h-8 w-8 mr-3 flex-shrink-0">
          <AvatarImage src={item.responderAvatar} alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <p className="text-sm text-gray-700">{item.previewResponse}</p>
      </div>
      
      {/* Images */}
      {item.images && item.images.length > 0 && (
        <div className={`grid ${item.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mt-2 ml-11`}>
          {item.images.map((image, idx) => (
            <div key={idx} className="rounded-md overflow-hidden h-24">
              <img 
                src={image} 
                alt={`Preview ${idx}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedItem;
