import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import CarDisplay from "../../components/CarDisplay/CarDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <div className="marquee">
        <h1>Din bilverkstad i Märsta – Exobilvårdscenter</h1>
      </div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <CarDisplay category={category} />
    </div>
  );
};

export default Home;
