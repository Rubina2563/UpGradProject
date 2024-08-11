import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div className="w-11/12 mx-auto">
      <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
        <h1 >Timely Offers</h1>
      </div>
      <div className="w-full m-10 grid">
        {allEvents && allEvents.length !== 0 ? (
          allEvents.map((event, index) => (
            <EventCard key={index} data={event} active={true} />
          ))
        ) : (
          <h4 className="text-center w-full">Wait for  offers !</h4>
        )}
      </div>
    </div>
  );
};

export default Events;