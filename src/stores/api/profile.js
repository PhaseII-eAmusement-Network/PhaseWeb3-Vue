import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

export async function APIGetAllProfiles(game) {
  try {
    const data = await mainStore.callApi(`/game/${game}/profiles`);
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
      `/profile/${game}?version=${version}&userId=${userId}`
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
      newProfile
    );
    return data;
  } catch (error) {
    console.log("Error updating profile:", error);
    throw error;
  }
}
