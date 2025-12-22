import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardDoughnut = ({ stats, orders }) => {
  console.log(orders.length);

  const data = {
    labels: stats.map((item) => item.label),
    datasets: [
      {
        data: stats.map((item) => item.count),
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#9C27B0",
          "#F44336",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "65%", // makes it round & clean
  };

  return <Doughnut data={data} options={options} />;
};

export default DashboardDoughnut;
