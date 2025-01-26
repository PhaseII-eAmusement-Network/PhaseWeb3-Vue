export const chartColors = {
  default: {
    primary: "#00D1B2",
    info: "#209CEE",
    danger: "#FF3860",
  },
};

const datasetObject = (color, points) => {
  return {
    fill: false,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: points,
    tension: 0.5,
    cubicInterpolationMode: "default",
    label: "Plays",
  };
};

const parseArcadeHistory = (users) => {
  const groupByDay = (timestamps) => {
    const dayMap = {};
    timestamps.forEach((timestamp) => {
      const day = new Date(timestamp * 1000).toISOString().split("T")[0];
      dayMap[day] = (dayMap[day] || 0) + 1;
    });
    return dayMap;
  };

  const generateLast14Days = () => {
    const today = new Date();
    const dates = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }
    return dates;
  };

  const allTimestamps = [];
  users.forEach((user) => {
    const arcadeHistory = user.data?.arcade_history || {};
    Object.values(arcadeHistory).forEach((machines) => {
      Object.values(machines).forEach((timestamps) => {
        allTimestamps.push(...timestamps);
      });
    });
  });

  const playsByDay = groupByDay(allTimestamps);
  const last14Days = generateLast14Days();

  // Populate data for the last 14 days, filling 0 for days without plays
  const playCounts = last14Days.map((day) => playsByDay[day] || 0);

  return { labels: last14Days, data: playCounts };
};

export const generateChartData = (users) => {
  if (!Array.isArray(users) || users.length === 0) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const { labels, data } = parseArcadeHistory(users);

  return {
    labels,
    datasets: [datasetObject("info", data)],
  };
};
