
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import QuestionsList from '../components/QuestionsList';
import ExploreSections from '../components/ExploreSections';
import UpcomingEvents from '../components/UpcomingEvents';
import BottomNavigation from '../components/BottomNavigation';
import { useToast } from "@/components/ui/use-toast";

// Sample data for questions
const questionsList = [
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
    tags: [{ name: 'food' }, { name: 'vegan' }],
    answers: 12,
    following: 24
  }
];

// Sample data for events
const eventsList = [
  {
    id: 1,
    title: 'Bangkok Music City',
    date: 'March 1 - 2',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&h=600'
  },
  {
    id: 2,
    title: 'Beer People Festival',
    date: 'March 7 - 9',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&h=600'
  }
];

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState('Bangkok');
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();

  // Handle country change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    toast({
      description: `Changed location to ${country}`,
      duration: 2000,
    });
  };

  // Handle question click
  const handleQuestionClick = (id: number) => {
    const question = questionsList.find(q => q.id === id);
    if (question) {
      toast({
        title: "Question selected",
        description: question.text,
        duration: 2000,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      <Header selectedCountry={selectedCountry} onCountryChange={handleCountryChange} />
      <SearchBar selectedCountry={selectedCountry} />
      <QuestionsList questions={questionsList} onQuestionClick={handleQuestionClick} />
      <ExploreSections selectedCountry={selectedCountry} />
      <UpcomingEvents selectedCountry={selectedCountry} events={eventsList} />
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
