
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle, Heart, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Sample data for questions and answers
const questionsData = [
  {
    id: 1,
    avatar: '/lovable-uploads/90ed1c81-29ee-43b4-b53a-17c8e25238f0.png',
    text: 'Any recommendations for hostels with a social vibe in Bangkok?',
    tags: [{ name: 'hostel' }, { name: 'accommodation' }],
    answers: 10,
    following: 56
  },
  {
    id: 2,
    avatar: '/lovable-uploads/90ed1c81-29ee-43b4-b53a-17c8e25238f0.png',
    text: "What's the best way to get from the airport to downtown Bangkok at night?",
    tags: [{ name: 'transportation' }],
    answers: 3,
    following: 9
  },
  {
    id: 3,
    avatar: '/lovable-uploads/90ed1c81-29ee-43b4-b53a-17c8e25238f0.png',
    text: 'Is Uber available in Bangkok, or should I use another ride-sharing service?',
    tags: [{ name: 'transportation' }],
    answers: 6,
    following: 10
  },
  {
    id: 4,
    avatar: '/lovable-uploads/90ed1c81-29ee-43b4-b53a-17c8e25238f0.png',
    text: 'Are there any local music festivals happening in Bangkok next month?',
    tags: [{ name: 'event' }, { name: 'music festival' }],
    answers: 3,
    following: 32
  },
  {
    id: 5,
    avatar: '/lovable-uploads/90ed1c81-29ee-43b4-b53a-17c8e25238f0.png',
    text: 'Are there any good vegan restaurants in Bangkok?',
    tags: [{ name: 'food' }, { name: 'vegan' }, { name: 'restaurants' }],
    answers: 2,
    following: 24
  }
];

// Sample answers data
const answersData = {
  5: [
    {
      id: 1,
      author: "Urassaya Sperbund",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Absolutely! Bangkok has a fantastic vegan food scene. Check out May Veggie Home (amazing Thai vegan dishes), Broccoli Revolution (trendy spot with global flavors), and Vistro Bangkok (creative plant-based comfort food). For street food vibes, try the vegan stalls at Chatuchak Market!",
      likeCount: 2,
      endorseCount: 2,
      yearsInLocation: 12
    },
    {
      id: 2,
      author: "Mario Maurer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "I really love Khun Churn! It's an authentic Thai restaurant with a fully plant-based menu. The environment is super nice as well, there are many plants in the restaurant. Remember to make reservation at least one week before hand.",
      likeCount: 3,
      endorseCount: 1,
      yearsInLocation: 9
    }
  ],
  1: [
    {
      id: 3,
      author: "Davika Hoorne",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Lub d Bangkok Silom is amazing for social travelers! They have communal spaces and organize events. Also check out Here Hostel and Yard Hostel - both have great vibes and you'll meet lots of people.",
      likeCount: 5,
      endorseCount: 3,
      yearsInLocation: 15
    }
  ]
};

const QuestionPreview = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);
  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [likes, setLikes] = useState<{[key: number]: boolean}>({});
  const [endorsements, setEndorsements] = useState<{[key: number]: boolean}>({});
  
  // Fetch question and answers data
  useEffect(() => {
    const id = Number(questionId);
    const foundQuestion = questionsData.find(q => q.id === id);
    
    if (foundQuestion) {
      setQuestion(foundQuestion);
      setAnswers(answersData[id as keyof typeof answersData] || []);
    } else {
      // If question not found, try to get it from location state
      // This handles the case when coming from AskQuestion page
      navigate("/");
    }
  }, [questionId, navigate]);

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
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" />
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
          <span className="text-gray-500">{answers.length} Answers</span>
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
      
      {/* Answers section */}
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
        
        {answers.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500">
            No answers yet. Be the first to answer!
          </div>
        )}
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
