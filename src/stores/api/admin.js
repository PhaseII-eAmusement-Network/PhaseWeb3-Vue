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

export async function APIAdminArcades() {
  try {
    const data = await mainStore.callApi(`/admin/arcades`);
    return data.data;
  } catch (error) {
    console.log("Error loading arcades:", error);
    throw error;
  }
}

export async function checkArcadeName(arcadeName) {
  try {
    const data = await mainStore.callApi(
      `/arcade/checkName?name=${arcadeName}`,
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

export async function APIAdminMachineFromPCBID(PCBID) {
  try {
    const data = await mainStore.callApi(`/admin/machine/${PCBID}`);
    return data.data;
  } catch (error) {
    console.log("Error testing machine:", error);
    throw error;
  }
}

export async function APIAdminCreateMachine(arcadeId, newMachine) {
  try {
    const data = await mainStore.callApi(
      `/admin/arcade/${arcadeId}/machine`,
      "PUT",
      newMachine,
    );
    return data;
  } catch (error) {
    console.log("Error adding machine:", error);
    throw error;
  }
}

export async function APIAdminUpdateMachine(arcadeId, newMachine) {
  try {
    const data = await mainStore.callApi(
      `/admin/arcade/${arcadeId}/machine`,
      "POST",
      newMachine,
    );
    return data;
  } catch (error) {
    console.log("Error adding machine:", error);
    throw error;
  }
}

export async function APIAdminDeleteMachine(arcadeId, pcbId) {
  try {
    const confirmed = window.confirm("Are you really?");
    if (confirmed) {
      const data = await mainStore.callApi(
        `/admin/arcade/${arcadeId}/machine`,
        "DELETE",
        { PCBID: pcbId },
      );
      return data;
    }
  } catch (error) {
    console.log("Error adding machine:", error);
    throw error;
  }
}

export async function APIOnboardArcade(newArcade) {
  try {
    const data = await mainStore.callApi(
      "/admin/onboardArcade",
      "POST",
      newArcade,
    );
    return data;
  } catch (error) {
    console.log("Error onboarding arcade:", error);
    throw error;
  }
}

export async function APIAdminUpdateArcade(arcadeId, newArcade) {
  try {
    const data = await mainStore.callApi(
      `/admin/arcade/${arcadeId}`,
      "POST",
      newArcade,
    );
    return data;
  } catch (error) {
    console.log("Error updating arcade:", error);
    throw error;
  }
}

export async function APIAdminDeleteArcade(arcadeId) {
  const confirmed = window.confirm("Let me ask again...\nAre you really?");
  if (confirmed) {
    try {
      const data = await mainStore.callApi(
        `/admin/arcade/${arcadeId}`,
        "DELETE",
      );
      return data;
    } catch (error) {
      console.log("Error deleting arcade:", error);
      throw error;
    }
  }
}

export async function APIAdminAddArcadeOwner(arcadeId, ownerId) {
  try {
    const data = await mainStore.callApi(
      `/admin/arcade/${arcadeId}/owner`,
      "PUT",
      { ownerId: ownerId },
    );
    return data;
  } catch (error) {
    console.log("Error updating arcade owner:", error);
    throw error;
  }
}

export async function APIAdminRemoveArcadeOwner(arcadeId, ownerId) {
  try {
    const confirmed = window.confirm("Are you really?");
    if (confirmed) {
      const data = await mainStore.callApi(
        `/admin/arcade/${arcadeId}/owner`,
        "DELETE",
        { ownerId: ownerId },
      );
      return data;
    }
    return {};
  } catch (error) {
    console.log("Error removing arcade owner:", error);
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

export async function APIAdminUsers(noData = false) {
  try {
    const data = await mainStore.callApi(`/admin/users?noData=${noData}`);
    return data.data;
  } catch (error) {
    console.log("Error loading users:", error);
    throw error;
  }
}

export async function APIAdminPutUser(userId, newUser) {
  try {
    const data = await mainStore.callApi(
      `/admin/user/${userId}`,
      "POST",
      newUser,
    );
    return data;
  } catch (error) {
    console.log("Error updating user:", error);
    throw error;
  }
}

export async function APIAdminUpdatePassword(
  userId,
  newPassword,
  confirmPassword,
) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(
      `/admin/user/${userId}/updatePassword`,
      "POST",
      {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      },
    );
    return data;
  } catch (error) {
    console.log("Error updating password:", error);
    throw error;
  }
}

export async function APIAdminUserFromCardId(cardId) {
  try {
    const data = await mainStore.callApi(`/admin/user/card/${cardId}`);
    return data.data;
  } catch (error) {
    console.log("Error getting user:", error);
    throw error;
  }
}

export async function APIAdminNews() {
  try {
    const data = await mainStore.callApi(`/admin/news`);
    return data.data;
  } catch (error) {
    console.log("Error loading news:", error);
    throw error;
  }
}

export async function APIAdminCreateNews(newNews) {
  try {
    const data = await mainStore.callApi(`/admin/news`, "POST", newNews);
    return data;
  } catch (error) {
    console.log("Error posting news:", error);
    throw error;
  }
}

export async function APIAdminUpdateNews(newsId, newNews) {
  try {
    const data = await mainStore.callApi(
      `/admin/news/${newsId}`,
      "POST",
      newNews,
    );
    return data;
  } catch (error) {
    console.log("Error posting news:", error);
    throw error;
  }
}

export async function APIAdminDeleteNews(newsId) {
  try {
    const data = await mainStore.callApi(`/admin/news/${newsId}`, "DELETE");
    return data;
  } catch (error) {
    console.log("Error posting news:", error);
    throw error;
  }
}
