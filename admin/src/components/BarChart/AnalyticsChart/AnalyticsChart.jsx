import { Bar } from "react-chartjs-2";
import "./AnalyticsChart.css";
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
  Legend,
);

const VisitsChart = () => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("all");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // pass filter as query param
        const res = await fetch(
          `${API_URL}/api/tracker/analytics?filter=${filter}`,
        );
        const json = await res.json();
        const labels = json.pageStats.map((p) => p._id);
        const views = json.pageStats.map((p) => p.views);
        setData({
          labels,
          datasets: [
            {
              label: "Sidvisninghistorik",
              data: views,
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        });
      } catch (error) {
        console.error("Failed to load analytics:", error);
        setData({ labels: [], datasets: [] });
      }
    };
    fetchData();
  }, [filter]);

  if (!data) return <p>Loading chart...</p>;

  return (
    <div>
      {/* Dropdown to select filter */}
      <div className="filter-container">
        <label htmlFor="filter" className="filter-label">
          Time Range
        </label>

        <select
          id="filter"
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div style={{ height: "400px" }}>
        <Bar
          data={data}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default VisitsChart;
