
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import QuestionsList from '../components/QuestionsList';
import ExploreSections from '../components/ExploreSections';
import UpcomingEvents from '../components/UpcomingEvents';
import BottomNavigation from '../components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data for questions
const questionsList = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Any recommendations for hostels with a social vibe in Bangkok?',
    tags: [{ name: 'hostel' }, { name: 'accommodation' }],
    answers: 10,
    following: 56
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: "What's the best way to get from the airport to downtown Bangkok at night?",
    tags: [{ name: 'transportation' }],
    answers: 3,
    following: 9
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Is Uber available in Bangkok, or should I use another ride-sharing service?',
    tags: [{ name: 'transportation' }],
    answers: 6,
    following: 10
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Are there any local music festivals happening in Bangkok next month?',
    tags: [{ name: 'event' }, { name: 'music festival' }],
    answers: 3,
    following: 32
  },
  {
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Are there any good vegan restaurants in Bangkok?',
    tags: [{ name: 'food' }, { name: 'vegan' }, { name: 'restaurants' }],
    answers: 2,
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
      duration: 1000,
    });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16 overflow-hidden">
      <Header selectedCountry={selectedCountry} onCountryChange={handleCountryChange} />
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="pb-16">
          <SearchBar selectedCountry={selectedCountry} />
          <QuestionsList questions={questionsList} />
          <ExploreSections selectedCountry={selectedCountry} />
          <UpcomingEvents selectedCountry={selectedCountry} events={eventsList} />
        </div>
      </ScrollArea>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
