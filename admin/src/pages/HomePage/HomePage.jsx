import { Link } from "react-router-dom";
import "./HomePage.css";
import DashboardChart from "../../components/BarChart/DashboardChart/DashboardChart";
import { useOrders } from "../../context/OrdersContext";

const HomePage = () => {
  const { orders } = useOrders();

  const pendingOrders = orders.filter((o) => o.status === "Pending to accept");
  const rejectedOrders = orders.filter((o) => o.status === "Rejected");
  const accpetedOrders = orders.filter((o) => o.status === "Accepted");

  const cards = [
    { title: "Add Car", path: "/addcar" },
    { title: "List Cars", path: "/listcar" },
    { title: "Admin Profile", path: "/adminprofile" },
    { title: "Orders Summary", path: "/orders" },
    { title: "Accepted Orders", path: "/acceptedorders" },
    { title: "Completed Orders", path: "/completedorders" },
    { title: "Rejected Orders", path: "/rejectedorders" },
  ];

  const cardStats = [
    { label: "Orders", count: pendingOrders.length },
    { label: "Accepted", count: accpetedOrders.length },
    { label: "Rejected", count: rejectedOrders.length },
  ];

  return (
    <div className="home-container">
      <h1>Admin Dashboard</h1>

      {/* 🔹 NEW LAYOUT WRAPPER */}
      <div className="dashboard-layout">
        {/* LEFT SIDE → CARDS */}
        <div className="card-grid">
          {cards.map((card) => (
            <Link to={card.path} key={card.path} className="card">
              <h3>{card.title}</h3>
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE → CHART */}
        <div className="chart-section">
          <h2>Overview</h2>
          <div className="chart-wrapper">
            <DashboardChart stats={cardStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
