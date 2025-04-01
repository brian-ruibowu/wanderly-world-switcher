
import React from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
}

interface UpcomingEventsProps {
  selectedCountry: string;
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ selectedCountry, events }) => {
  return (
    <div className="mt-6 px-4 pb-20">
      <h2 className="text-xl font-bold mb-4">Upcoming in {selectedCountry}</h2>
      <div className="grid grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event.id} className="rounded-lg overflow-hidden">
            <div className="relative h-40">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 bg-white">
              <h3 className="font-medium text-sm">{event.title}</h3>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
