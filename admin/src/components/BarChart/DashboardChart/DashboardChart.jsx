import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardDoughnut = ({ stats }) => {
  const navigate = useNavigate();
  const data = {
    labels: stats.map((item) => item.label),
    datasets: [
      {
        data: stats.map((item) => item.count),
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
        ],
        borderWidth: 1,
      },
    ],
  };
  const routeMap = {
    Orders : "/orders",
    Accepted: "/acceptedorders",
    Rejected: "/rejectedorders"
  }

  const options = {
    cutout: "65%", // makes it round & clean
    onclick: (_, elements) => {
      if (!elements.length) return
      const index = elements[0].index;
      navigate(routeMap[stats[index].label])
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default DashboardDoughnut;
