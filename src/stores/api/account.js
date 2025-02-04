import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

export async function APIEmailAuth(email) {
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
  confirmPassword
) {
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
  try {
    const data = await mainStore.callApi(`/user`, "PUT", newProfile);
    return data;
  } catch (error) {
    console.log("Error registering:", error);
    throw error;
  }
}

export async function APIGetCards() {
  try {
    const data = await mainStore.callApi(`/user/card`);
    return data.cards;
  } catch (error) {
    console.log("Error fetching cards:", error);
    throw error;
  }
}

export async function APIPutCard(cardId) {
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
  try {
    const data = await mainStore.callApi(
      `/user/takeover?cardId=${cardId}&pin=${pin}`
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
  try {
    const data = await mainStore.callApi(`/user/playVideos`);
    return data.data;
  } catch (error) {
    console.log("Error fetching videos:", error);
    throw error;
  }
}

export async function APIGetUserContent(type) {
  try {
    const data = await mainStore.callApi(`/user/content?type=${type}`);
    return data.data;
  } catch (error) {
    console.log("Error fetching content:", error);
    throw error;
  }
}

export async function APIRemoveIntegration(service) {
  try {
    const confirmed = window.confirm("Are you really?");
    if (confirmed) {
      const data = await mainStore.callApi(
        `/user/integrate/${service}`,
        "DELETE"
      );
      return data;
    }
  } catch (error) {
    console.log("Error deleting integration:", error);
    throw error;
  }
}

export async function APIIntegrateWith(service, code) {
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
