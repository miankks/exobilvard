import "./CarTyre.css";

const CarTyre = () => {
  const lineCardText = [
    { class: "line1", text: "Säker & trygg hantering" },
    { class: "line2", text: "Professionell montering" },
    { class: "line3", text: "Däckförvaring tillgänglig" },
    { class: "line4", text: "Balansering & Inställning" },
  ];
  return (
    <div className="tyre-wrapper">
      {/* LEFT DIV */}
      <div className="left-info">
        <h3>Säsongsservice året runt</h3>
        <ul>
          <li>Sommardäck & Vinterdäck</li>
          <li>Balansering & Inställning</li>
          <li>Däckförvaring tillgänglig</li>
          <li>Professionell montering</li>
          <li>Säker & trygg hantering</li>
        </ul>
      </div>

      {/* RIGHT TYRE */}
      <div className="tyre-container small">
        {/* <div className="lines">
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
        </div> */}
        <div className="lines">
          {lineCardText.map((item, index) => (
            <span key={index} className={`line ${item.class}`}>
              <div className="card">{item.text}</div>
            </span>
          ))}
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
      </div>
    </div>
  );
};

export default CarTyre;
