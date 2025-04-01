
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample locals who can answer
const locals = [
  { id: 1, name: "Urassaya Sperbund", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Mario Maurer", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Davika Hoorne", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
];

const QuestionPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);
  
  // Get question data from location state or use default values
  const question = location.state?.question || {
    text: "Where can I find authentic, non-touristy street food in Bangkok?",
    tags: ["food", "street food"],
    location: "Bangkok"
  };

  // Handle going back
  const handleBack = () => {
    navigate(-1);
  };
  
  // Handle following a question
  const handleFollowQuestion = () => {
    setFollowing(!following);
    toast({
      description: following ? "Unfollowed question" : "Following question",
    });
  };
  
  // Handle inviting a local
  const handleInviteLocal = (localId: number) => {
    const local = locals.find(l => l.id === localId);
    if (local) {
      toast({
        description: `Invited ${local.name} to answer`,
      });
    }
  };
  
  // Handle write an answer
  const handleWriteAnswer = () => {
    toast({
      description: "Write answer feature coming soon!",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button onClick={handleBack} className="p-1">
          <ArrowLeft className="h-6 w-6" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 text-orange-dark rounded-full flex items-center px-2 py-1">
            <span className="text-sm font-semibold">90</span>
            <span className="ml-1 bg-orange-400 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs">🏆</span>
          </div>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Question content */}
      <div className="px-4 py-4">
        <h1 className="text-xl font-bold mb-4">{question.text}</h1>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {question.tags.map((tag: string, index: number) => (
            <div key={index} className="bg-gray-100 rounded-full px-3 py-1">
              <span className="text-gray-500 text-sm"># {tag}</span>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-500">0 Answers</span>
          <Button 
            variant="outline"
            className={`rounded-full border px-4 py-1 h-auto flex items-center gap-2 ${
              following ? 'bg-orange-50 border-orange-200 text-orange-600' : ''
            }`}
            onClick={handleFollowQuestion}
          >
            <MessageCircle className="h-4 w-4" />
            {following ? "Following question" : "Follow question"}
          </Button>
        </div>
        
        {/* Invite locals section */}
        <div className="mt-6">
          <h2 className="font-medium text-lg mb-4">Invite locals to answer</h2>
          <div className="space-y-4">
            {locals.map(local => (
              <div key={local.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={local.avatar} alt={local.name} />
                    <AvatarFallback>{local.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{local.name}</span>
                </div>
                <button 
                  className="text-orange-400"
                  onClick={() => handleInviteLocal(local.id)}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Write an answer button */}
      <div className="fixed bottom-8 left-0 w-full flex justify-center">
        <Button 
          onClick={handleWriteAnswer}
          className="bg-orange-400 hover:bg-orange-500 text-white rounded-full px-6 py-2 font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Write an answer
        </Button>
      </div>
    </div>
  );
};

export default QuestionPreview;
