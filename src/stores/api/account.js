import { useMainStore } from "@/stores/main";

export async function APIGetUser(userId) {
  const mainStore = useMainStore();

  try {
    const user = await mainStore.callApi(`/user?userId=${userId}`);
    const userData = user.data;
    const data = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      admin: userData.admin,
      data: userData.data,
      discordRoles: userData.discordRoles,
      cardStyle: "time",
      profiles: userData.profiles,
      arcades: userData.arcades,
      customize: userData.data?.customize,
      userScoreStats: userData.scoreStats,
      public: userData.public,
      banned: userData.banned,
    };
    return data;
  } catch (error) {
    console.log("Error loading user:", error);
    throw error;
  }
}

export async function APIEmailAuth(email) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/auth/emailAuth`, "POST", {
      email: email,
    });
    return data;
  } catch (error) {
    console.log("Error checking email:", error);
    throw error;
  }
}

export async function APICheckKey(key) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/auth/check2FAKey`, "POST", {
      key: key,
    });
    return data;
  } catch (error) {
    console.log("Error checking key:", error);
    throw error;
  }
}

export async function APIResetPassword(key, newPassword, confirmPassword) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/auth/changePassword`, "POST", {
      key: key,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    return data;
  } catch (error) {
    console.log("Error resetting password:", error);
    throw error;
  }
}

export async function APIUpdatePassword(
  currentPassword,
  newPassword,
  confirmPassword,
) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/updatePassword`, "POST", {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    return data;
  } catch (error) {
    console.log("Error updating password:", error);
    throw error;
  }
}

export async function APIRegisterUser(newProfile) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user`, "PUT", newProfile);
    return data;
  } catch (error) {
    console.log("Error registering:", error);
    throw error;
  }
}

export async function APIGetCards() {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/card`);
    return data.cards;
  } catch (error) {
    console.log("Error fetching cards:", error);
    throw error;
  }
}

export async function APIPutCard(cardId) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/card`, "POST", {
      cardId: cardId,
    });
    return data;
  } catch (error) {
    console.log("Error adding card:", error);
    throw error;
  }
}

export async function APIDeleteCard(cardId) {
  const mainStore = useMainStore();

  try {
    const confirmed = window.confirm("Are you really?");
    if (confirmed) {
      const data = await mainStore.callApi(`/user/card`, "DELETE", {
        cardId: cardId,
      });
      return data;
    }
  } catch (error) {
    console.log("Error deleting card:", error);
    throw error;
  }
}

export async function APIStartTakeover(cardId, pin) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(
      `/user/takeover?cardId=${cardId}&pin=${pin}`,
    );
    if (data.status == "warn") {
      window.alert(data.error_code);
    }
    return data.data;
  } catch (error) {
    console.log("Error fetching takeover:", error);
    throw error;
  }
}

export async function APISaveTakeover(cardId, pin, mergeSettings) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/takeover`, "POST", {
      cardId: cardId,
      pin: pin,
      mergeSettings: mergeSettings,
    });
    return data;
  } catch (error) {
    console.log("Error saving takeover:", error);
    throw error;
  }
}

export async function APIGetPlayVideos() {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/playVideos`);
    return data.data;
  } catch (error) {
    console.log("Error fetching videos:", error);
    throw error;
  }
}

export async function APIGetUserContent(type) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/content?type=${type}`);
    return data.data;
  } catch (error) {
    console.log("Error fetching content:", error);
    throw error;
  }
}

export async function APIRemoveIntegration(service) {
  const mainStore = useMainStore();

  try {
    const confirmed = window.confirm("Are you really?");
    if (confirmed) {
      const data = await mainStore.callApi(
        `/user/integrate/${service}`,
        "DELETE",
      );
      return data;
    }
  } catch (error) {
    console.log("Error deleting integration:", error);
    throw error;
  }
}

export async function APIIntegrateWith(service, code) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/integrate/${service}`, "POST", {
      code: code,
    });
    return data;
  } catch (error) {
    console.log(`Error integrating with ${service}:`, error);
    throw error;
  }
}

export async function APIUserCustomize(customize) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/customize`, "POST", {
      customize: customize,
    });
    return data;
  } catch (error) {
    console.log(`Error saving user customize!`, error);
    throw error;
  }
}

export async function APIUserAppUpdate(version = null, disable = false) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/appVersion`, "POST", {
      version: version,
      disable: disable,
    });
    return data;
  } catch (error) {
    console.log(`Error saving user!`, error);
    throw error;
  }
}

export async function APIUserOnboard(version) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/onboard`, "POST", {
      version: version,
    });
    return data;
  } catch (error) {
    console.log(`Error saving user!`, error);
    throw error;
  }
}

export async function APIUserReadNews(newsId) {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/readNews`, "POST", {
      newsId: newsId,
    });

    mainStore.userLoaded = false;
    await mainStore.loadUser();
    return data;
  } catch (error) {
    console.log(`Error saving user!`, error);
    throw error;
  }
}

export async function APIGetUserSessions() {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/sessions`);
    return data.data;
  } catch (error) {
    console.log("Error fetching sessions:", error);
    throw error;
  }
}

export async function APIDeleteUserSessions() {
  const mainStore = useMainStore();

  try {
    const data = await mainStore.callApi(`/user/sessions`, "DELETE");
    return data;
  } catch (error) {
    console.log("Error fetching content:", error);
    throw error;
  }
}
