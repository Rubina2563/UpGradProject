import React from 'react';
import Header from "../Components/Layout/Header";
import Hero from "../Components/Route/Hero/Hero";
import Categories from "../Components/Route/Categories/Categories";
const HomePage = () => {
    return (<div>
        <Header heading={1}/>
      <Hero />
      <Categories/>
      </div>
  )
}

export default HomePage