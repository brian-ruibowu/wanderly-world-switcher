import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle, Heart, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuestions } from "@/context/QuestionsContext";
import { formatDistanceToNow } from 'date-fns';

// Sample avatar URL to be used consistently across the app
const profileImageUrl = "https://randomuser.me/api/portraits/women/44.jpg";

const QuestionPreview = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const { 
    getQuestionById, 
    getAnswersForQuestion, 
    addAnswer, 
    likeAnswer 
  } = useQuestions();
  const [likedAnswers, setLikedAnswers] = useState<Record<string, boolean>>({});
  
  // Get question and answers from context
  const question = questionId ? getQuestionById(questionId) : undefined;
  const answers = questionId ? getAnswersForQuestion(questionId) : [];

  // Handle going back
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Handle following a question
  const handleFollowQuestion = () => {
    setFollowing(!following);
    toast({
      description: following ? "Unfollowed question" : "Following question",
    });
  };
  
  // Handle liking an answer
  const handleLike = (answerId: string) => {
    likeAnswer(answerId);
    setLikedAnswers(prev => ({
      ...prev,
      [answerId]: true
    }));
    
    toast({
      description: "Liked answer",
    });
  };
  
  // Handle write an answer button click
  const handleWriteAnswer = () => {
    setShowAnswerForm(true);
  };
  
  // Handle posting an answer
  const handlePostAnswer = () => {
    if (!answerText.trim()) {
      toast({
        title: "Answer required",
        description: "Please write your answer before posting",
        variant: "destructive",
      });
      return;
    }
    
    if (questionId) {
      addAnswer({
        text: answerText,
        userName: "CurrentUser", // In a real app, this would come from authentication
        questionId: questionId
      });
      
      setAnswerText('');
      setShowAnswerForm(false);
      
      toast({
        title: "Answer posted",
        description: "Your answer has been successfully posted!",
      });
    }
  };
  
  // Handle canceling answer form
  const handleCancelAnswer = () => {
    setAnswerText('');
    setShowAnswerForm(false);
  };

  if (!question) {
    return <div className="flex justify-center items-center h-screen">Question not found</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
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
          
          <Avatar 
            className="h-8 w-8 cursor-pointer"
            onClick={handleProfileClick}
          >
            <AvatarImage src={profileImageUrl} alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Question content */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold mb-2">{question.title}</h1>
        <p className="text-gray-600 mb-4">{question.description}</p>
        
        {/* Location & time */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-2">{question.location}</span>
          <span>• {formatDistanceToNow(new Date(question.createdAt))} ago</span>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500">{answers.length} Answer{answers.length !== 1 ? 's' : ''}</span>
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
      </div>
      
      {/* Answer Form */}
      {showAnswerForm && (
        <div className="px-4 py-4 border-b border-gray-200">
          <h3 className="font-medium mb-2">Your Answer</h3>
          <Textarea
            placeholder="Write your answer..."
            className="w-full border rounded-md mb-3 p-2 min-h-32"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline"
              onClick={handleCancelAnswer}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePostAnswer}
              className="bg-orange-400 hover:bg-orange-500 text-white"
            >
              Post Answer
            </Button>
          </div>
        </div>
      )}
      
      {/* Answers section */}
      {answers.length > 0 ? (
        <div className="mb-20">
          {answers.map((answer) => (
            <div key={answer.id} className="px-4 py-4 border-b border-gray-200">
              {/* Answer author info */}
              <div className="flex items-center mb-2">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={profileImageUrl} alt={answer.userName} />
                  <AvatarFallback>{answer.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{answer.userName}</div>
                  <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(answer.createdAt))} ago</div>
                </div>
              </div>
              
              {/* Answer text */}
              <p className="text-sm mb-4">{answer.text}</p>
              
              {/* Answer actions */}
              <div className="flex items-center gap-4">
                <button 
                  className={`flex items-center gap-1 text-sm ${likedAnswers[answer.id] ? 'text-orange-500' : 'text-gray-500'}`}
                  onClick={() => handleLike(answer.id)}
                >
                  <Heart className="h-4 w-4" fill={likedAnswers[answer.id] ? "currentColor" : "none"} />
                  <span>{answer.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-gray-500">
          <p>No answers yet. Be the first to answer!</p>
        </div>
      )}
      
      {/* Write an answer button */}
      {!showAnswerForm && (
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
      )}
    </div>
  );
};

export default QuestionPreview;
