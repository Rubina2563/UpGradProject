import React from 'react';
import Header from "../Components/Layout/Header";
import Hero from "../Components/Route/Hero/Hero";
import Categories from "../Components/Route/Categories/Categories";
import BestDeals from "../Components/Route/BestDeals/BestDeals";
import FeatureProduct from "../Components/Route/FeatureProduct/FeatureProduct";
import Events from "../Components/Events/Events.jsx"
const HomePage = () => {
    return (<div>
        <Header heading={1}/>
      <Hero />
      <Categories />
      <BestDeals />
      <Events/>
      <FeatureProduct/>
      </div>
  )
}

export default HomePage