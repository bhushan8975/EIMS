import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ stats }) {
  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [stats.high, stats.medium, stats.low],
        backgroundColor: ["red", "orange", "green"]
      }
    ]
  };

  // ✅ IMPORTANT FIX
  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return <Pie data={data} options={options} />;
}

export default PieChart;