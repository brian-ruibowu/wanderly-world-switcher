
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FeedItem from '../components/FeedItem';
import BottomNavigation from '../components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Sample data for feed items
const feedItems = [
  {
    id: 1,
    question: 'Any recommendations for hostels with a social vibe in Bangkok?',
    tags: ['hostel', 'accommodation'],
    answers: 10,
    following: 56,
    previewResponse: "I've lived at Mad Monkey Bangkok for two weeks, and met many interesting people there. The staff there is also amazing! It's very popular so you pro...",
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    responderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    question: 'Are there any local music festivals happening in Bangkok next month?',
    tags: ['event', 'music festival'],
    answers: 10,
    following: 56,
    previewResponse: "The S2O is happening next month! I went to the one last year and it was amazing. I'm planning to go this year as well. We can go together if you plan to go!",
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    responderAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    images: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&h=600'
    ],
  },
  {
    id: 3,
    question: 'Are there any good vegan restaurants in Bangkok?',
    tags: ['food', 'vegan'],
    answers: 10,
    following: 56,
    previewResponse: "May Veggie Home is right by Asoke BTS station, this one's fantastic for vegan Thai food. Their vegan \"fish\" with tamarind sauce is so good and Pad Tha...",
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    responderAvatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&h=600'
    ],
  },
  {
    id: 4,
    question: "Please recommend some local farmer's markets!",
    tags: ['market', 'shopping'],
    answers: 10,
    following: 56,
    previewResponse: "Every 2nd week-end at Gateway Ekkamai esplanade, just out of the BTS. This is maybe more a place for expats and locals to buy veggies, fruit and meat. B...",
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    responderAvatar: 'https://randomuser.me/api/portraits/women/36.jpg',
    images: [
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&h=600'
    ],
  },
  {
    id: 5,
    question: "What's the best way to get from the airport to downtown Bangkok at night?",
    tags: ['transportation'],
    answers: 10,
    following: 56,
    previewResponse: "Traveling from Suvarnabhumi Airport to downtown Bangkok at night is straightforward, with taxis being the most practical option due to the 24/7 hours op...",
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    responderAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 6,
    question: "Is Uber available in Bangkok, or should I use another ride-sharing service?",
    tags: ['transportation'],
    answers: 10,
    following: 56,
    previewResponse: "Traveling from Suvarnabhumi Airport to downtown Bangkok at night is straightforward, with taxis being the most practical option due to the 24/7 hours op...",
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    responderAvatar: 'https://randomuser.me/api/portraits/women/24.jpg',
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

  const handleSearchClick = () => {
    // Handle search click
    console.log("Search clicked");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16 overflow-hidden">
      <Header selectedCountry={selectedCountry} onCountryChange={handleCountryChange} />
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="pb-16">
          <SearchBar selectedCountry={selectedCountry} onClick={handleSearchClick} />
          
          {/* Feed items */}
          <div className="space-y-3">
            {feedItems.map((item) => (
              <React.Fragment key={item.id}>
                <FeedItem item={item} />
                {item.id !== feedItems.length && <Separator className="bg-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollArea>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
