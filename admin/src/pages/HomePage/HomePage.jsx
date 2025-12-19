import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const cards = [
    { title: "Add Car", path: "/addcar" },
    { title: "List Cars", path: "/listcar" },
    { title: "Admin Profile", path: "/adminprofile" },
    { title: "Orders Summary", path: "/orders" },
    { title: "Accepted Orders", path: "/acceptedorders" },
    { title: "Completed Orders", path: "/completedorders" },
    { title: "Rejected Orders", path: "/rejectedorders" },
  ];

  return (
    <div className="home-container">
      <h1>Admin Dashboard</h1>

      <div className="card-grid">
        {cards.map((card) => (
          <Link to={card.path} key={card.path} className="card">
            <h3>{card.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
