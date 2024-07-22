import React from 'react';
//import { useSelector } from 'react-redux';

import EventCard from './EventCard';

const Events = () => {
  //const {allEvents, isLoading} = useSelector((state) => state.events);

  return (
    <div className="p-4">
      {/* !isLoading && ( */}
      <div className="section">
        <div className="heading mb-4">
          <h1 className="text-2xl font-bold">Popular Events</h1>
        </div>

        <div className="w-full grid">
          <EventCard />
          {/* 
          allEvents.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )
          <h4>
            {allEvents?.length === 0 && 'No Events have!'}
          </h4>
          */}
          
        </div>
      </div>
    </div>
  );
}

export default Events;