import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import QuestionsList from '../components/QuestionsList';
import ExploreSections from '../components/ExploreSections';
import UpcomingEvents from '../components/UpcomingEvents';
import BottomNavigation from '../components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuestions } from '@/context/QuestionsContext';

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

const HelpTravelers = () => {
  const [selectedCity, setSelectedCity] = useState('Bangkok');
  const [activeTab, setActiveTab] = useState('help');
  const { toast } = useToast();
  const { questions } = useQuestions();

  // Filter questions by city
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => 
      question.location.toLowerCase().includes(selectedCity.toLowerCase())
    );
  }, [questions, selectedCity]);

  // Handle city change
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    toast({
      description: `Changed location to ${city}`,
      duration: 1000,
    });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16 overflow-hidden">
      <Header selectedCountry={selectedCity} onCountryChange={handleCityChange} />
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="pb-16">
          <SearchBar selectedCountry={selectedCity} />
          <QuestionsList questions={filteredQuestions} />
          <ExploreSections selectedCountry={selectedCity} />
          <UpcomingEvents selectedCountry={selectedCity} events={eventsList} />
        </div>
      </ScrollArea>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default HelpTravelers;
