export function shouldRenderChart(difficulty, chartTable, chartKey) {
  const invalidDifficulties = [0, -1, "-1", null];
  const hasValidDifficulty = !invalidDifficulties.includes(difficulty);
  const hasChartInTable = !!chartTable?.[chartKey];
  return hasValidDifficulty && hasChartInTable;
}

export function formatDifficulty(difficulty, difficultyDenom = 1) {
  if (isNaN(difficulty / difficultyDenom)) {
    return difficulty?.difnum ? difficulty.difnum : difficulty;
  }
  return difficulty / difficultyDenom;
}

export function rankFromScore(ratingTable, score) {
  const thresholds = Object.entries(ratingTable)
    .map(([k, v]) => [Number(k), v])
    .sort((a, b) => a[0] - b[0]);

  var result = 100;
  for (const [threshold, rank] of thresholds) {
    if (score >= threshold) {
      result = rank;
    } else {
      break;
    }
  }

  return result;
}
