import "./Header.css";

const Header = () => {
  return (
    <div className="header" id="header">
      <div className="header-contents">
        <h2 className="header-color">
          Välkommen till <br />
          Exo Bilvårdcenter
        </h2>
        <p className="header-color">
          Passion för bilar. Kvalitet i varje detalj.
        </p>
        {/* <button>View Menu</button> */}
      </div>
    </div>
  );
};

export default Header;
