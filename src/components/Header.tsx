
import React from 'react';
import CountrySelector from './CountrySelector';
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedCountry, onCountryChange }) => {
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  return (
    <header className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
      <CountrySelector selectedCountry={selectedCountry} onCountryChange={onCountryChange} />
      
      <div className="flex items-center">
        <div className="bg-orange-100 text-orange-dark rounded-full flex items-center px-2 py-1">
          <span className="text-sm font-semibold">90</span>
          <span className="ml-1 bg-orange-400 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs">🏆</span>
        </div>
        
        <Avatar 
          className="h-8 w-8 ml-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
