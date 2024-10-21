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
