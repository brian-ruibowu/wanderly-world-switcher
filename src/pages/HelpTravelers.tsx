
import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ThumbsUp, Users, MessageSquare } from "lucide-react";
import BottomNavigation from '../components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";

const helpCategories = [
  { 
    id: 'latest',
    name: 'Latest Questions' 
  },
  { 
    id: 'popular',
    name: 'Popular Topics' 
  },
  { 
    id: 'near_me',
    name: 'Near Me' 
  }
];

const travelerQuestions = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Michael Chen',
    location: 'Bangkok, Thailand',
    date: '2 hours ago',
    question: 'Looking for recommendations on affordable street food markets with authentic local cuisine in Bangkok?',
    tags: ['food', 'budget', 'local'],
    likes: 12,
    answers: 4,
    miles: '0.8 miles away'
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Emma Watson',
    location: 'Chiang Mai, Thailand',
    date: '5 hours ago',
    question: 'What\'s the best way to see elephants ethically in Northern Thailand? Any sanctuary recommendations?',
    tags: ['wildlife', 'ethical', 'activities'],
    likes: 35,
    answers: 8,
    miles: '120 miles away'
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'David Park',
    location: 'Tokyo, Japan',
    date: '8 hours ago',
    question: 'Are there any hidden gems in Tokyo that most tourists miss? Looking to explore beyond the typical attractions.',
    tags: ['off-the-beaten-path', 'local-experience'],
    likes: 18,
    answers: 6,
    miles: '1500 miles away'
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    name: 'Sofia Rodriguez',
    location: 'Paris, France',
    date: '1 day ago',
    question: 'Anyone know of good jazz clubs in Paris that aren\'t too touristy? Looking for authentic experiences!',
    tags: ['nightlife', 'music', 'local'],
    likes: 27,
    answers: 11,
    miles: '5600 miles away'
  }
];

const HelpTravelers = () => {
  const [selectedCountry, setSelectedCountry] = useState('Bangkok');
  const [activeTab, setActiveTab] = useState('help');
  const [selectedCategory, setSelectedCategory] = useState('latest');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    toast({
      description: `Changed location to ${country}`,
      duration: 1000,
    });
  };

  const handleAnswerClick = (questionId: number) => {
    navigate(`/question/${questionId}`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16 overflow-hidden">
      <Header selectedCountry={selectedCountry} onCountryChange={handleCountryChange} />
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="pb-16 px-4">
          <div className="my-4">
            <h1 className="text-xl font-bold text-gray-800">Help Fellow Travelers</h1>
            <p className="text-gray-600 text-sm mt-1">
              Answer questions from travelers and earn points while sharing your local knowledge
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full mt-4">
            <TabsList className="w-full bg-white rounded-lg mb-4">
              {helpCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex-1 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 data-[state=active]:shadow-none"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="latest" className="mt-0">
              <div className="space-y-4">
                {travelerQuestions.map((question) => (
                  <Card key={question.id} className="bg-white border-gray-100">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 mt-1">
                          <AvatarImage src={question.avatar} alt={question.name} />
                          <AvatarFallback>{question.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">{question.name}</h3>
                              <div className="flex items-center text-xs text-gray-500 mt-0.5 gap-1">
                                <MapPin className="h-3 w-3" /> 
                                <span>{question.location}</span>
                                <span className="mx-1">•</span>
                                <span>{question.date}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{question.miles}</span>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-gray-800">{question.question}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {question.tags.map((tag, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{question.likes}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <MessageSquare className="h-4 w-4" />
                                <span>{question.answers} answers</span>
                              </div>
                            </div>
                            <button 
                              className="text-orange-500 bg-orange-50 hover:bg-orange-100 px-4 py-1.5 rounded-full text-sm font-medium"
                              onClick={() => handleAnswerClick(question.id)}
                            >
                              Answer
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center h-60">
                <Users className="h-12 w-12 text-orange-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-800">Popular Topics Coming Soon</h3>
                <p className="text-gray-500 text-center mt-2">
                  We're gathering the most discussed topics among travelers.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="near_me" className="mt-0">
              <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center h-60">
                <MapPin className="h-12 w-12 text-orange-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-800">Nearby Questions Coming Soon</h3>
                <p className="text-gray-500 text-center mt-2">
                  Soon you'll be able to see questions from travelers near your location.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default HelpTravelers;
