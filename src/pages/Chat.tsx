
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BottomNavigation from '../components/BottomNavigation';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatMessage {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread?: number;
}

const chatData: ChatMessage[] = [
  {
    id: 1,
    name: "Sophia Chen",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    message: "Are you still in Taipei next week?",
    time: "10:31 AM",
    unread: 2
  },
  {
    id: 2,
    name: "David Wilson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "Thanks for the recommendations!",
    time: "10:02 AM"
  },
  {
    id: 3,
    name: "Lisa Nguyen",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    message: "I sent you the map of the night market",
    time: "09:21 AM"
  },
  {
    id: 4,
    name: "Marco Rodriguez",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    message: "Have you tried the street food on Soi 38? I ...",
    time: "09:21 AM"
  }
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-16 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex-1"></div>
        
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 text-orange-dark rounded-full flex items-center px-2 py-1">
            <span className="text-sm font-semibold">90</span>
            <span className="ml-1 bg-orange-400 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs">🏆</span>
          </div>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="px-4 pt-4">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-between bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="all" 
              className={`flex-1 pb-2 text-gray-500 ${activeTab === 'all' ? 'border-b-2 border-orange-400 text-gray-800 font-medium' : ''}`}
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="locals" 
              className={`flex-1 pb-2 text-gray-500 ${activeTab === 'locals' ? 'border-b-2 border-orange-400 text-gray-800 font-medium' : ''}`}
            >
              Locals
            </TabsTrigger>
            <TabsTrigger 
              value="travelers" 
              className={`flex-1 pb-2 text-gray-500 ${activeTab === 'travelers' ? 'border-b-2 border-orange-400 text-gray-800 font-medium' : ''}`}
            >
              Travelers
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Chat List */}
      <ScrollArea className="flex-1 h-[calc(100vh-130px)]">
        <div className="divide-y divide-gray-100">
          {chatData.map((chat) => (
            <div key={chat.id} className="p-4 flex items-center">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-base">{chat.name}</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">{chat.time}</span>
                    {chat.unread && (
                      <Badge variant="default" className="ml-2 bg-orange-400 text-white h-6 w-6 flex items-center justify-center rounded-full p-0">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm truncate">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="chat" onTabChange={(tab) => console.log(tab)} />
    </div>
  );
};

export default Chat;
