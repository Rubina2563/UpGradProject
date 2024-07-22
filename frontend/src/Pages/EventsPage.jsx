import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../Components/Events/EventCard";
import Header from "../Components/Layout/Header";
import Loader from "../Components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header heading={4} />
          <EventCard active={true} data={allEvents && allEvents[0]} />
        </div>
      )}
    </>
  );
};

export default EventsPage;