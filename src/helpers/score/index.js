import { GameConstants } from "@/constants";
import { formatIIDXScore } from "@/helpers/score/iidx";

export function hydrateScoreData(thisGame, data) {
  /*
    Generate and fill in depth score data
  */
  var songData = JSON.parse(JSON.stringify(data));

  if (thisGame?.id == GameConstants.IIDX) {
    for (const chartId in songData.charts) {
      var chart = songData.charts[chartId];
      const maxScore = (chart.data.notecount ?? 5730) * 2;
      chart.records = chart?.records.map((v) => ({ ...v, maxScore: maxScore }));
      for (const recordIndex in chart.records) {
        var record = chart.records[recordIndex];
        record = formatIIDXScore(record.maxScore, record);
        chart.records[recordIndex] = record;
      }
      songData.charts[chartId] = chart;
    }
  }
  console.log(songData);

  return songData;
}
