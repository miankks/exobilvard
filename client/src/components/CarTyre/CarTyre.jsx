import React from "react";
import "./CarTyre.css";

const CarTyre = () => {
  return (
    <div className="tyre-container">
      {/* RED LINES (behind wheel) */}
      <div className="lines">
        <span className="line line1">
          <div className="card">Säker & trygg hantering</div>
        </span>
        <span className="line line2">
          <div className="card">Professionell montering</div>
        </span>
        <span className="line line3">
          <div className="card">Däckförvaring tillgänglig</div>
        </span>
        <span className="line line4">
          <div className="card">Balansering & Inställning</div>
        </span>
      </div>
      <div className="wheel">
        <div className="rim">
          <div className="spoke"></div>
          <div className="spoke"></div>
          <div className="spoke"></div>
          <div className="spoke"></div>
          <div className="spoke"></div>
          <div className="spoke"></div>
          <div className="spoke"></div>
          <div className="spoke"></div>
          <div className="hub"></div>
        </div>
      </div>
      {/* <div className="text-1">
        <h5>Säker & trygg hantering</h5>
        <p>Professionell hantering av dina däck med försiktighet och omsorg.</p>
      </div> */}
    </div>
  );
};

export default CarTyre;
