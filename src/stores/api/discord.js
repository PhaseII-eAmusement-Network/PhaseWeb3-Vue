import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

export async function exportVPNDiscord(arcadeId, discordId) {
  try {
    const data = await mainStore.callApi(
      `/discord/exportVPN/${arcadeId}?discordId=${discordId}`,
    );
    return data;
  } catch (error) {
    console.log("Error exporting vpn:", error);
    throw error;
  }
}

export async function onboardArcadeDiscord(arcadeId, discordId) {
  try {
    const data = await mainStore.callApi(
      `/discord/onboardArcade/${arcadeId}?discordId=${discordId}`,
    );
    return data;
  } catch (error) {
    console.log("Error onboarding arcade:", error);
    throw error;
  }
}
