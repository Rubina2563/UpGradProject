// src/Pages/EventPage.js
import React from "react";
import { useSelector } from "react-redux";
import Events from "../Components/Events/Events";
import Header from "../Components/Layout/Header";
import Loader from "../Components/Layout/Loader";

const EventsPage = () => {
  const { isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header heading={4} />
          <Events />
        </div>
      )}
    </>
  );
};

export default EventsPage;