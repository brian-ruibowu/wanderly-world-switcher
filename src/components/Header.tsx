
import React from 'react';
import CountrySelector from './CountrySelector';

interface HeaderProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedCountry, onCountryChange }) => {
  return (
    <header className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
      <CountrySelector selectedCountry={selectedCountry} onCountryChange={onCountryChange} />
      
      <div className="flex items-center">
        <div className="bg-orange-100 text-orange-dark rounded-full flex items-center px-2 py-1">
          <span className="text-sm font-semibold">90</span>
          <span className="ml-1 bg-orange-400 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs">🏆</span>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-gray-300 ml-3 overflow-hidden">
          <img 
            src="/placeholder.svg" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
