import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X, Search, Image, Hash, Link2, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useQuestions } from '@/context/QuestionsContext';

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

const countries = ["Bangkok", "Tokyo", "New York", "Paris", "London", "Rome", "Berlin"];

const AskQuestion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addQuestion } = useQuestions();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTag, setSearchTag] = useState('');
  const [location, setLocation] = useState('Bangkok');
  
  // Handle going back to the previous page
  const handleBack = () => {
    navigate(-1);
  };
  
  // Handle location change
  const handleLocationChange = (location: string) => {
    setLocation(location);
  };
  
  // Handle posting the question
  const handlePost = () => {
    if (!title.trim()) {
      toast({
        title: "Question required",
        description: "Please enter your question title before posting",
        variant: "destructive",
      });
      return;
    }
    
    // Add question to our context
    const questionId = addQuestion({
      title: title,
      description: description,
      location: location,
      userName: "CurrentUser" // In a real app, this would come from authentication
    });
    
    // Navigate to question detail page after posting
    navigate(`/question/${questionId}`);
    
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
        
        <div className="flex flex-col items-end">
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
          <div className="text-xs text-gray-500 mt-1">5 needed</div>
        </div>
      </div>
      
      {/* Location selector */}
      <div className="px-4 py-3">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">I'm going to</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1 rounded-full border border-gray-300 px-4 py-1 h-9">
                {location}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              {countries.map((country) => (
                <DropdownMenuItem 
                  key={country}
                  onClick={() => handleLocationChange(country)}
                  className="cursor-pointer"
                >
                  {country}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Question input */}
      <div className="px-4 py-2">
        <Textarea
          placeholder="Question title"
          className="w-full border-0 text-xl focus-visible:ring-0 p-0 resize-none h-12 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Add more details about your question (optional)"
          className="w-full border-0 text-base focus-visible:ring-0 p-0 resize-none h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      {/* Tags section */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center mb-2">
          <span className="text-gray-700 mr-2">Add tags:</span>
          <div className="relative flex-1">
            <div className="relative">
              <Input
                placeholder="# Search tags"
                className="rounded-full pl-8 pr-8 border-gray-300"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="rounded-full h-5 w-5 flex items-center justify-center bg-orange-50 text-orange-400">
                  <Search className="h-3 w-3" />
                </div>
              </div>
            </div>
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
      
      {/* Fixed bottom toolbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-3">
          <button className="p-2 flex items-center justify-center">
            <Image className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 flex items-center justify-center">
            <Hash className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 flex items-center justify-center">
            <Link2 className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
