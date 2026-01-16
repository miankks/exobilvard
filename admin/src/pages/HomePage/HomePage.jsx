import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomePage.css";
import DashboardChart from "../../components/BarChart/DashboardChart/DashboardChart";
import { useOrders } from "../../context/OrdersContext";
import VisitsChart from "../../components/BarChart/AnalyticsChart/AnalyticsChart";

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
  // Container variant controls stagger timing
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // delay between cards
      },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

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
        <motion.div
          className="card-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          animate="show"
        >
          <VisitsChart className="user-visits" />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
