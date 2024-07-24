import React from 'react'
import { useSelector } from 'react-redux';
import EventCard from "./EventCard";

const Events = () => {
  const {allEvents,isLoading} = useSelector((state) => state.events);  
   
  return (
    <div>
     {
      !isLoading && (
        <div className={`w-11/12 mx-auto`}>
      <div className={`text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]`}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid">
         {
          allEvents.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )
         }
         <h4>{
           allEvents?.length === 0 && (
            'No Events have!'
           )
          }

         </h4>
      </div>
     
    </div>
      )
     }
  </div>
  )
}

export default Events