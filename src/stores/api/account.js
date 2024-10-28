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
    const data = await mainStore.callApi(`/user/card`, "DELETE", {
      cardId: cardId,
    });
    return data;
  } catch (error) {
    console.log("Error deleting card:", error);
    throw error;
  }
}
