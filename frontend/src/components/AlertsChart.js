import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function AlertsChart({ alerts }) {
  const data = {
    labels: alerts.map((_, i) => i + 1),
    datasets: [
      {
        label: "Alerts",
        data: alerts.map((_, i) => i + 1),
        borderColor: "red",
        backgroundColor: "red"
      }
    ]
  };

  return <Line data={data} />;
}

export default AlertsChart;