
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const countries = ["Bangkok", "Tokyo", "New York", "Paris", "London", "Rome", "Berlin"];

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, onCountryChange }) => {
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-2">I'm going to</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1 rounded-full border border-gray-300 px-4 py-1 h-9">
            {selectedCountry}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-white">
          {countries.map((country) => (
            <DropdownMenuItem 
              key={country}
              onClick={() => onCountryChange(country)}
              className="cursor-pointer"
            >
              {country}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CountrySelector;
