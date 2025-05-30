
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Edit } from "lucide-react";

// Profile data (would typically come from an API or context)
const profileData = {
  name: "Sarah Kim",
  points: 90,
  avatarUrl: "/lovable-uploads/d12fdfd0-5fa9-48a5-b8db-d182de05f023.png",
  stats: {
    questions: 3,
    answers: 7
  },
  about: "Food enthusiast and adventure seeker. I've lived in Seoul and Bangkok. Happy to help with food recommendations and local transportation tips!",
  from: {
    country: "South Korea",
    city: "Seoul",
    flag: "🇰🇷"
  },
  expertIn: ["Bangkok", "Shanghai", "Tokyo", "Chiang Mai", "Bali"],
  upcomingTrips: [
    { destination: "Taipei", date: "May 2025" },
    { destination: "Hongkong", date: "July 2025" }
  ]
};

const Profile = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-start pt-8 min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden relative">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Profile header */}
        <div className="flex flex-col items-center pt-8 pb-4 border-b">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
            <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <h1 className="text-xl font-bold mb-1">{profileData.name}</h1>
          
          <div className="flex items-center gap-1 mb-4">
            <div className="bg-orange-100 text-orange-dark rounded-full flex items-center px-2 py-1">
              <span className="text-sm font-semibold">{profileData.points}</span>
              <span className="ml-1 bg-orange-400 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs">🏆</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex w-full px-16 justify-between mb-3">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{profileData.stats.questions}</span>
              <span className="text-gray-500 text-sm">Questions</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{profileData.stats.answers}</span>
              <span className="text-gray-500 text-sm">Answers</span>
            </div>
          </div>
          
          {/* Edit Profile Button */}
          <Button 
            variant="outline" 
            className="rounded-full border px-6 py-1 h-auto mb-2"
            size="sm"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit Profile
          </Button>
        </div>
        
        {/* Profile details - more compact layout */}
        <div className="px-6 py-3">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold mb-1">About Me</h2>
              <p className="text-gray-800 text-sm">{profileData.about}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-1">From</h2>
              <div className="flex items-center">
                <span className="mr-2">{profileData.from.flag}</span>
                <span className="text-sm">{profileData.from.city}, {profileData.from.country}</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-1">Expert In</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.expertIn.map((location, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="rounded-full px-3 py-1 border-gray-300 text-gray-800 text-xs font-normal"
                  >
                    {location}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="pb-4">
              <h2 className="text-lg font-bold mb-1">Upcoming Trips</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.upcomingTrips.map((trip, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="rounded-full px-3 py-1 border-gray-300 text-gray-800 flex items-center text-xs"
                  >
                    <span>{trip.destination}</span>
                    <span className="text-gray-500 ml-1 text-xs">{trip.date}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
