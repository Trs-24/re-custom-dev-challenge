import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function BarChart({ downloads, logins }: { downloads: number; logins: number }) {
  const data = {
    labels: ["Total Downloads", "Total Logins"],
    datasets: [
      {
        label: "Count",
        data: [downloads, logins],
        backgroundColor: ["#4CAF50", "#2196F3"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { beginAtZero: true },
      y: { ticks: { font: { size: 14 } } },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
