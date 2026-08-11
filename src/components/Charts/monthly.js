import { chartColors } from "@/components/Charts/chart.config";

const createDataset = (color, label, data) => ({
  fill: false,
  borderColor: chartColors.default[color],
  borderWidth: 2,
  pointBackgroundColor: chartColors.default[color],
  pointBorderColor: "rgba(255,255,255,0)",
  pointHoverBackgroundColor: chartColors.default[color],
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
  tension: 0.5,
  cubicInterpolationMode: "default",
  label,
  data,
});

export const generateMonthlyChartData = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return {
    labels,
    datasets: [
      createDataset(
        "info",
        "Plays",
        [145, 168, 192, 210, 185, 230, 244, 267, 289, 301, 315, 338],
      ),
      createDataset(
        "danger",
        "Attempts",
        [85, 92, 108, 115, 101, 128, 132, 140, 156, 170, 181, 194],
      ),
      createDataset(
        "primary",
        "Records",
        [14, 17, 13, 19, 16, 22, 24, 28, 26, 31, 35, 39],
      ),
    ],
  };
};
