
import React from 'react';

interface SearchBarProps {
  selectedCountry: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedCountry }) => {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center border border-gray-300 rounded-full py-2 px-4">
        <span className="text-sm flex-grow">Questions about {selectedCountry}</span>
        <div className="bg-orange-light rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
