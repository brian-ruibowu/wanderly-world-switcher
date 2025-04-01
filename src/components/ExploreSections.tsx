
import React from 'react';

const categories = [
  {
    id: 1, 
    name: 'Transportation',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=200&h=200'
  },
  {
    id: 2, 
    name: 'Food',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=200&h=200'
  },
  {
    id: 3, 
    name: 'Culture',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=200&h=200'
  },
  {
    id: 4, 
    name: 'Stays',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=200&h=200'
  }
];

interface ExploreSectionsProps {
  selectedCountry: string;
}

const ExploreSections: React.FC<ExploreSectionsProps> = ({ selectedCountry }) => {
  return (
    <div className="mt-6 px-4">
      <h2 className="text-xl font-bold mb-4">Explore what locals like in {selectedCountry}!</h2>
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSections;
