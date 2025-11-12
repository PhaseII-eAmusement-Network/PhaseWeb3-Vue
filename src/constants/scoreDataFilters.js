export function shouldRenderChart(difficulty, chartTable, chartKey) {
  const invalidDifficulties = [0, -1, "-1", null];
  const hasValidDifficulty = !invalidDifficulties.includes(difficulty);
  const hasChartInTable = !!chartTable?.[chartKey];
  return hasValidDifficulty && hasChartInTable;
}

export function formatDifficulty(difficulty, difficultyDenom = 1) {
  if (isNaN(difficulty / difficultyDenom)) {
    return difficulty;
  }
  return difficulty / difficultyDenom;
}
