import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();

export async function APIGetMusicData(
  game,
  version,
  songIds = null,
  oneChart = false,
) {
  try {
    const params = new URLSearchParams({
      game,
      version,
    });

    if (oneChart) {
      params.append("oneChart", "true");
    }

    if (songIds?.length) {
      params.append("songIds", songIds.join(","));
    }

    const data = await mainStore.callApi(
      `/music?${params.toString()}`,
      "GET",
      null,
    );

    return data.data;
  } catch (error) {
    console.log("Error fetching music data:", error);
    throw error;
  }
}

export async function getAttemptData(game, userId = null) {
  try {
    const params = new URLSearchParams();

    if (userId) {
      params.append("userId", userId);
    }

    const query = params.toString();

    const data = await mainStore.callApi(
      `/attempts/${game}${query ? `?${query}` : ""}`,
      "GET",
      null,
    );

    return data.data;
  } catch (error) {
    console.log("Error fetching attempt data:", error);
    throw error;
  }
}

export async function APIGetRecordData(game, userId = null, songId = null) {
  try {
    const params = new URLSearchParams();

    if (userId) {
      params.append("userId", userId);
    }

    if (songId) {
      params.append("songId", songId);
    }

    const query = params.toString();

    const data = await mainStore.callApi(
      `/records/${game}${query ? `?${query}` : ""}`,
      "GET",
      null,
    );

    return data.data;
  } catch (error) {
    console.log("Error fetching record data:", error);
    throw error;
  }
}

export async function APIGetTopScore(game, songId = null) {
  try {
    const data = await mainStore.callApi(
      `/topscore/${game}/${songId}`,
      "GET",
      null,
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching score data:", error);
    throw error;
  }
}
