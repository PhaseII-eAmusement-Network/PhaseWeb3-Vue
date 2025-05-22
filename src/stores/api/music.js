import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

export async function APIGetMusicData(
  game,
  version,
  songIds = null,
  oneChart = false
) {
  try {
    const data = await mainStore.callApi(
      `/music?game=${game}&version=${version}` +
        (oneChart ? "&oneChart=true" : ""),
      "GET",
      null,
      { songIds: songIds.toString() }
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching music data:", error);
    throw error;
  }
}

export async function getAttemptData(game, userId = null) {
  try {
    const data = await mainStore.callApi(
      `/attempts/${game}` + (userId ? `?userId=${userId}` : ""),
      "GET",
      null
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching attempt data:", error);
    throw error;
  }
}

export async function APIGetTopScore(game, songId = null) {
  try {
    const data = await mainStore.callApi(
      `/topscore/${game}/${songId}`,
      "GET",
      null
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching score data:", error);
    throw error;
  }
}
