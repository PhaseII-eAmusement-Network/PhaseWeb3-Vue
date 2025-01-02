import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

export async function APIGetArcade(arcadeId) {
  try {
    const data = await mainStore.callApi(`/arcade/${arcadeId}`);
    return data.arcade;
  } catch (error) {
    console.log("Error fetching arcade:", error);
    throw error;
  }
}

export async function APIGetArcadeSettings(arcadeId, game, version) {
  try {
    const data = await mainStore.callApi(
      `/arcade/${arcadeId}/settings?game=${game}&version=${version}`
    );
    return data.data;
  } catch (error) {
    console.log("Error fetching arcade settings:", error);
    throw error;
  }
}

export async function APIUpdateArcadeSettings(
  arcadeId,
  game,
  version,
  newSettings
) {
  try {
    while (!mainStore.userId) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    const data = await mainStore.callApi(
      `/arcade/${arcadeId}/settings?game=${game}&version=${version}`,
      "POST",
      newSettings
    );
    return data;
  } catch (error) {
    console.log("Error updating settings:", error);
    throw error;
  }
}

export async function APIGetArcadeVPN(arcadeId) {
  try {
    const data = await mainStore.callApi(`/arcade/${arcadeId}/exportVPN`);
    return data;
  } catch (error) {
    console.log("Error fetching arcade VPN:", error);
    throw error;
  }
}

export async function APIUpdateArcade(arcadeId, newArcade) {
  try {
    const data = await mainStore.callApi(
      `/arcade/${arcadeId}`,
      "POST",
      newArcade
    );
    return data;
  } catch (error) {
    console.log("Error updating arcade:", error);
    throw error;
  }
}

export async function APIGetArcadePASELI(arcadeId) {
  try {
    const data = await mainStore.callApi(`/arcade/${arcadeId}/paseli`);
    return data.data;
  } catch (error) {
    console.log("Error fetching arcade PASELI data:", error);
    throw error;
  }
}
