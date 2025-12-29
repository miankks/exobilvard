import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale, // this fixes the "category" scale error
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VisitsChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/analytics")
      .then((res) => res.json())
      .then((json) => {
        const labels = json.pageStats.map((p) => p._id);
        const views = json.pageStats.map((p) => p.views);
        setData({
          labels,
          datasets: [
            {
              label: "Page Views",
              data: views,
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        });
      });
  }, []);

  if (!data) return <p>Loading chart...</p>;

  return <Bar data={data} />;
};

export default VisitsChart;
