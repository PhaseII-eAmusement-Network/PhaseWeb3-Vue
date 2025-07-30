import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

export async function APIGetAllProfiles(game, version = null) {
  try {
    const data = await mainStore.callApi(
      `/game/${game}/profiles?version=${version}`,
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching profiles:", error);
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
