import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
export async function APIAdminDashboard() {
  try {
    const data = await mainStore.callApi(`/admin`);
    return data.data;
  } catch (error) {
    console.log("Error loading admin dashboard:", error);
    throw error;
  }
}

export async function checkArcadeName(arcadeName) {
  try {
    const data = await mainStore.callApi(
      `/arcade/checkName?name=${arcadeName}`
    );
    return data;
  } catch (error) {
    console.log("Error testing arcade:", error);
    throw error;
  }
}

export async function checkPCBID(PCBID) {
  try {
    const data = await mainStore.callApi(`/arcade/checkPCBID?PCBID=${PCBID}`);
    return data.unused;
  } catch (error) {
    console.log("Error testing machine:", error);
    throw error;
  }
}

export async function APIOnboardArcade(newArcade) {
  try {
    const data = await mainStore.callApi(
      "/admin/onboardArcade",
      "POST",
      newArcade
    );
    return data;
  } catch (error) {
    console.log("Error onboarding arcade:", error);
    throw error;
  }
}

export async function APIAdminMaintenancePeriods() {
  try {
    const data = await mainStore.callApi(`/admin/maint`);
    return data.data;
  } catch (error) {
    console.log("Error loading maint:", error);
    throw error;
  }
}

export async function APIAdminCreateMaintenancePeriod(newPeriod) {
  try {
    const data = await mainStore.callApi(`/admin/maint`, "POST", newPeriod);
    return data;
  } catch (error) {
    console.log("Error posting maint:", error);
    throw error;
  }
}

export async function APIAdminClients() {
  try {
    const data = await mainStore.callApi(`/admin/client`);
    return data.data;
  } catch (error) {
    console.log("Error loading client:", error);
    throw error;
  }
}

export async function APIAdminCreateClient(newClient) {
  try {
    const data = await mainStore.callApi(`/admin/client`, "POST", newClient);
    return data;
  } catch (error) {
    console.log("Error posting client:", error);
    throw error;
  }
}
