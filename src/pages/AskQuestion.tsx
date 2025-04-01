
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X, Search, Image, Hash, Link2 } from "lucide-react";

// Define available tags
const availableTags = [
  "hotel", 
  "event", 
  "traffic", 
  "music festival", 
  "food", 
  "street food", 
  "travel plan", 
  "shopping"
];

const AskQuestion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTag, setSearchTag] = useState('');
  const [location, setLocation] = useState('Bangkok');
  
  // Handle going back to the previous page
  const handleBack = () => {
    navigate(-1);
  };
  
  // Handle posting the question
  const handlePost = () => {
    if (!question.trim()) {
      toast({
        title: "Question required",
        description: "Please enter your question before posting",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to the question preview page with the question data
    navigate('/question', { 
      state: { 
        question: {
          text: question,
          tags: selectedTags,
          location: location
        } 
      } 
    });
    
    toast({
      title: "Question posted",
      description: "Your question has been successfully posted!",
    });
  };
  
  // Handle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button onClick={handleBack} className="p-1">
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 text-orange-dark rounded-full flex items-center px-2 py-1">
            <span className="text-sm font-semibold">95</span>
            <span className="ml-1 bg-orange-400 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs">🏆</span>
          </div>
          
          <Button 
            onClick={handlePost}
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-full px-4"
          >
            Post
          </Button>
        </div>
      </div>
      
      {/* Location selector */}
      <div className="px-4 py-3">
        <div className="inline-block">
          <Button variant="outline" className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1 h-auto">
            {location}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          <span className="inline-flex items-center">
            <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mr-1"></span>
            5 needed
          </span>
        </div>
      </div>
      
      {/* Question input */}
      <div className="px-4 py-2">
        <Textarea
          placeholder="Question"
          className="w-full border-0 text-xl focus-visible:ring-0 p-0 resize-none h-32"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      
      {/* Tags section */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center mb-2">
          <span className="text-gray-700 mr-2">Add tags:</span>
          <div className="relative flex-1">
            <Input
              placeholder="# Search tags"
              className="rounded-full pl-8 pr-4 border-gray-300"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              className={`flex items-center rounded-full border px-3 py-1 text-sm ${
                selectedTags.includes(tag) 
                  ? 'bg-orange-100 border-orange-200' 
                  : 'bg-white border-gray-300'
              }`}
              onClick={() => toggleTag(tag)}
            >
              <span className="text-gray-400 mr-1">#</span> {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom toolbar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-200">
        <div className="flex justify-around items-center py-3 px-4">
          <button className="p-2">
            <Image className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2">
            <Hash className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2">
            <Link2 className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        {/* Keyboard (just for UI representation) */}
        <div className="h-12 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default AskQuestion;
