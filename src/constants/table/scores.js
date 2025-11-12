import { formatSortableDate } from "@/constants/date";
import { formatDifficulty } from "@/constants/scoreDataFilters";

export function scoreHeaders(thisGame) {
  const headers = [
    { text: "Player", value: "username", width: 120 },
    { text: "New PB", value: "newRecord", width: 100 },
    { text: "Timestamp", value: "timestamp", width: 140 },
    { text: "Song", value: "song.name", width: 180 },
    { text: "Artist", value: "song.artist", width: 150 },
    { text: "Chart", value: "song.chart", width: 100 },
    { text: "Grade", value: "data.rank", width: 80 },
    { text: "Score", value: "points", width: 120 },
  ];

  if (thisGame.scoreHeaders) {
    for (var header of thisGame.scoreHeaders) {
      headers.push(header);
    }
  }

  return headers;
}

export function personalScoreHeaders(thisGame) {
  const headers = [
    { text: "Timestamp", value: "timestamp", width: 140 },
    { text: "New PB", value: "newRecord", width: 100 },
    { text: "Song", value: "song.name", width: 180 },
    { text: "Artist", value: "song.artist", width: 180 },
    { text: "Chart", value: "song.chart", width: 120 },
    { text: "Grade", value: "data.rank", width: 80 },
    { text: "Score", value: "points", width: 120 },
  ];

  if (thisGame.scoreHeaders) {
    for (var header of thisGame.scoreHeaders) {
      headers.push(header);
    }
  }

  return headers;
}

export function formatScoreTable(thisGame, scores) {
  var formattedItems = [];
  for (var item of scores) {
    if (item.newRecord) {
      item.newRecord = "✅";
    } else {
      item.newRecord = "";
    }

    if (item.timestamp) {
      item.timestamp = formatSortableDate(item.timestamp);
    }

    if (item.points != undefined) {
      item.points = item.points
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    if (item.data?.stats?.score != undefined) {
      item.exscore = item.points.toString();
      item.points = item.data?.stats?.score
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    if (item.song?.chart != undefined && thisGame.chartTable) {
      item.song.chart = `${thisGame.chartTable[item.song?.chart]} - ${formatDifficulty(
        item.song.data?.difficulty,
        thisGame.difficultyDenom,
      )}`;
    }

    if (item.data?.halo != undefined && thisGame.haloTable) {
      item.data.halo = thisGame.haloTable[item.data?.halo];
    }

    if (item.data?.medal != undefined && thisGame.medalTable) {
      item.data.medal = thisGame.medalTable[item.data?.medal];
    }

    if (item.data?.clear_status != undefined && thisGame.medalTable) {
      item.data.medal = thisGame.medalTable[item.data?.clear_status];
    }

    if (item.data?.rank != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.rank];
    }

    if (item.data?.result_rank != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.result_rank];
    }

    if (item.data?.grade != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.grade];
    }

    if (item.data?.skill_perc > 0) {
      item.data.skill_perc = `${item.data?.skill_perc / 100}%`;
    } else {
      item.data.skill_perc = "0%";
    }

    if (item.data?.skill_points) {
      item.data.skill_points = item.data?.skill_points / 10;
    }

    if (item.data?.perc > 0) {
      item.data.perc = `${item.data?.perc / 100}%`;
    } else {
      item.data.perc = "0%";
    }

    if (item.data?.new_skill) {
      item.data.new_skill = item.data?.new_skill / 10;
    }

    if (item.data?.music_rate) {
      item.data.music_rate = item.data?.music_rate / 10;
    }

    if (item.data?.excellent) {
      item.medal = "EX FC";
    } else if (item.data?.fullcombo) {
      item.medal = "FC";
    } else if (item.data?.clear) {
      item.medal = "CLEARED";
    } else {
      item.medal = "FAILED";
    }

    if (item.data?.clear_gauge !== undefined) {
      item.data.clear_gauge = `${item.data?.clear_gauge / 10}%`;
    }

    formattedItems.push(item);
  }
  return formattedItems;
}
