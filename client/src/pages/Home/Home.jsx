import React, { useState } from 'react'
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import CarDisplay from '../../components/CarDisplay/CarDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import BackToTop from '../../components/BackToTop/BackToTop';

const Home = () => {
  const [category, setCategory] = useState("All");
  
  return (
    <div>
        <Header />
        <BackToTop />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <CarDisplay category={category}/>
        {/* <AppDownload /> */}
    </div>
  )
}

export default Home