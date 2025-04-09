import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle, Heart, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample avatar URL to be used consistently across the app
const profileImageUrl = "https://randomuser.me/api/portraits/women/44.jpg";

// Sample data for questions and answers
const questionsData = [
  {
    id: 1,
    avatar: profileImageUrl,
    text: 'Any recommendations for hostels with a social vibe in Bangkok?',
    tags: [{ name: 'hostel' }, { name: 'accommodation' }],
    answers: 10,
    following: 56
  },
  {
    id: 2,
    avatar: profileImageUrl,
    text: "What's the best way to get from the airport to downtown Bangkok at night?",
    tags: [{ name: 'transportation' }],
    answers: 3,
    following: 9
  },
  {
    id: 3,
    avatar: profileImageUrl,
    text: 'Is Uber available in Bangkok, or should I use another ride-sharing service?',
    tags: [{ name: 'transportation' }],
    answers: 6,
    following: 10
  },
  {
    id: 4,
    avatar: profileImageUrl,
    text: 'Are there any local music festivals happening in Bangkok next month?',
    tags: [{ name: 'event' }, { name: 'music festival' }],
    answers: 3,
    following: 32
  },
  {
    id: 5,
    avatar: profileImageUrl,
    text: 'Where can I find authentic, non-touristy street food in Bangkok?',
    tags: [{ name: 'food' }, { name: 'street food' }],
    answers: 0,
    following: 24
  }
];

// Sample local experts
const localExperts = [
  {
    id: 1,
    name: "Urassaya Sperbund",
    avatar: profileImageUrl,
    yearsInLocation: 12
  },
  {
    id: 2,
    name: "Mario Maurer",
    avatar: profileImageUrl,
    yearsInLocation: 9
  },
  {
    id: 3,
    name: "Davika Hoorne",
    avatar: profileImageUrl,
    yearsInLocation: 15
  }
];

// Sample answers data
const answersData = {
  5: [],
  1: [
    {
      id: 3,
      author: "Davika Hoorne",
      avatar: profileImageUrl,
      text: "Lub d Bangkok Silom is amazing for social travelers! They have communal spaces and organize events. Also check out Here Hostel and Yard Hostel - both have great vibes and you'll meet lots of people.",
      likeCount: 5,
      endorseCount: 3,
      yearsInLocation: 15
    }
  ]
};

const QuestionPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionId } = useParams();
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);
  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [likes, setLikes] = useState<{[key: number]: boolean}>({});
  const [endorsements, setEndorsements] = useState<{[key: number]: boolean}>({});
  
  // Fetch question and answers data
  useEffect(() => {
    // First try to get question from location state (when coming from Ask Question page)
    if (location.state?.question) {
      const newQuestion = {
        id: Number(questionId),
        avatar: profileImageUrl,
        text: location.state.question.text,
        tags: location.state.question.tags.map((tag: string) => ({ name: tag })),
        answers: 0,
        following: 0
      };
      setQuestion(newQuestion);
      setAnswers([]);
      return;
    }
    
    // If not from state, try to find in sample data
    const id = Number(questionId);
    const foundQuestion = questionsData.find(q => q.id === id);
    
    if (foundQuestion) {
      setQuestion(foundQuestion);
      setAnswers(answersData[id as keyof typeof answersData] || []);
    } else {
      // If question not found, go to home
      navigate("/");
      toast({
        title: "Question not found",
        description: "The question you're looking for doesn't exist.",
        variant: "destructive",
      });
    }
  }, [questionId, navigate, location.state, toast]);

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
  const handleLike = (answerId: number) => {
    setLikes(prev => {
      const isCurrentlyLiked = prev[answerId] || false;
      return { ...prev, [answerId]: !isCurrentlyLiked };
    });
    
    toast({
      description: likes[answerId] ? "Removed like" : "Liked answer",
    });
  };
  
  // Handle endorsing an answer
  const handleEndorse = (answerId: number) => {
    setEndorsements(prev => {
      const isCurrentlyEndorsed = prev[answerId] || false;
      return { ...prev, [answerId]: !isCurrentlyEndorsed };
    });
    
    toast({
      description: endorsements[answerId] ? "Removed endorsement" : "Endorsed answer",
    });
  };
  
  // Handle write an answer
  const handleWriteAnswer = () => {
    toast({
      description: "Write answer feature coming soon!",
    });
  };

  if (!question) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
        <h1 className="text-xl font-bold mb-4">{question.text}</h1>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {question.tags.map((tag: any, index: number) => (
            <div key={index} className="bg-gray-100 rounded-full px-3 py-1">
              <span className="text-gray-800 text-sm"># {tag.name}</span>
            </div>
          ))}
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
      
      {/* Answers section or invite experts section */}
      {answers.length > 0 ? (
        <div className="mb-20">
          {answers.map((answer) => (
            <div key={answer.id} className="px-4 py-4 border-b border-gray-200">
              {/* Answer author info */}
              <div className="flex items-center mb-2">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={answer.avatar} alt={answer.author} />
                  <AvatarFallback>{answer.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{answer.author}</div>
                  <div className="text-xs text-gray-500">Lived in Bangkok for {answer.yearsInLocation} years</div>
                </div>
              </div>
              
              {/* Answer text */}
              <p className="text-sm mb-4">{answer.text}</p>
              
              {/* Answer actions */}
              <div className="flex items-center gap-4">
                <button 
                  className={`flex items-center gap-1 text-sm ${likes[answer.id] ? 'text-orange-500' : 'text-gray-500'}`}
                  onClick={() => handleLike(answer.id)}
                >
                  <Heart className="h-4 w-4" fill={likes[answer.id] ? "currentColor" : "none"} />
                  <span>{likes[answer.id] ? answer.likeCount + 1 : answer.likeCount}</span>
                </button>
                
                <button 
                  className={`flex items-center gap-1 text-sm ${endorsements[answer.id] ? 'text-orange-500' : 'text-gray-500'}`}
                  onClick={() => handleEndorse(answer.id)}
                >
                  <ThumbsUp className="h-4 w-4" fill={endorsements[answer.id] ? "currentColor" : "none"} />
                  <span>{endorsements[answer.id] ? answer.endorseCount + 1 : answer.endorseCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 py-4">
          <h2 className="font-semibold text-lg mb-4">Invite locals to answer</h2>
          {localExperts.map((expert) => (
            <div key={expert.id} className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={expert.avatar} alt={expert.name} />
                  <AvatarFallback>{expert.name[0]}</AvatarFallback>
                </Avatar>
                <div className="font-medium">{expert.name}</div>
              </div>
              <button className="text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
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
