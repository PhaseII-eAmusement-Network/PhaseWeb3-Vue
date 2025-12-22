import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

export async function APIGetGame(game, version = null, noUsers = false) {
  try {
    const data = await mainStore.callApi(
      `/game/${game}?version=${version}&noUsers=${noUsers}`,
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching game:", error);
    throw error;
  }
}

export async function APIGetProfile(game, version, userId = null) {
  if (!userId) {
    while (!mainStore.userId) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    userId = mainStore.userId;
  }

  try {
    const data = await mainStore.callApi(
      `/profile/${game}?version=${version}&userId=${userId}`,
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching profile:", error);
    throw error;
  }
}

export async function APIUpdateProfile(game, version, newProfile) {
  try {
    while (!mainStore.userId) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    const userId = mainStore.userId;

    const data = await mainStore.callApi(
      `/profile/${game}?version=${version}&userId=${userId}`,
      "POST",
      newProfile,
    );
    return data;
  } catch (error) {
    console.log("Error updating profile:", error);
    throw error;
  }
}

export async function APIGetAchievements(
  game,
  version,
  userId = null,
  achievements = [],
) {
  if (!userId) {
    while (!mainStore.userId) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    userId = mainStore.userId;
  }

  var formattedAchievements = "";
  for (const achievement of achievements) {
    const achievementType = achievement[0];
    const achievementId = achievement[1];
    formattedAchievements += `${achievementType}:${achievementId},`;
  }

  try {
    const data = await mainStore.callApi(
      `/profile/${game}/achievements?version=${version}&userId=${userId}`,
      "GET",
      null,
      {
        achievements: formattedAchievements.substring(
          0,
          formattedAchievements.length - 1,
        ),
      },
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching achievements:", error);
    throw error;
  }
}

export async function APIGetLinks(game, version) {
  while (!mainStore.userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  const userId = mainStore.userId;

  try {
    const data = await mainStore.callApi(
      `/profile/${game}/links?version=${version}&userId=${userId}`,
    );
    return data?.data;
  } catch (error) {
    console.log("Error fetching profile links:", error);
    throw error;
  }
}

export async function APIPutLink(game, version, otherUserId, type) {
  while (!mainStore.userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  const userId = mainStore.userId;

  try {
    await mainStore.callApi(`/profile/${game}/link`, "PUT", {
      version: version,
      userId: userId,
      otherUserId: otherUserId,
      type: type,
    });
    return true;
  } catch (error) {
    console.log("Error putting profile link:", error);
    throw error;
  }
}

export async function APIDeleteLink(game, version, otherUserId, type) {
  while (!mainStore.userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  const userId = mainStore.userId;

  const confirmed = window.confirm("Are you really?");
  if (confirmed) {
    try {
      await mainStore.callApi(`/profile/${game}/link`, "DELETE", {
        version: version,
        userId: userId,
        otherUserId: otherUserId,
        type: type,
      });
      return true;
    } catch (error) {
      console.log("Error deleting profile link:", error);
      throw error;
    }
  } else {
    return false;
  }
}
