export const data = {
  //labels: ["Notes", "Chord", "Peak", "Charge", "Scratch", "Sof-Lan"],
  labels: ["Notes", "Peak", "Scratch", "Sof-Lan", "Charge", "Chord"],
  datasets: [
    {
      label: "SP",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [65, 59, 90, 81, 56, 55],
    },
  ],
};

export const options = {
  responsive: false,
  maintainAspectRatio: true,
};
