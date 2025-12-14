export function formatIIDXScore(maxScore, data) {
  var scoreData = JSON.parse(JSON.stringify(data));
  if (maxScore) {
    var rate = (scoreData?.points / maxScore) * 100;
    rate = Math.round(rate * 100) / 100;

    scoreData.data.achievement_rate = rate * 100;
  }

  return scoreData;
}
