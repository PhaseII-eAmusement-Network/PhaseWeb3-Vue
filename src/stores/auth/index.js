import Cookies from "js-cookie";

export function loadUserAuthKey() {
  try {
    const encryptedKey = Cookies.get("userAuthKey");
    return encryptedKey;
  } catch (error) {
    this.errorCode = error.message;
    throw error;
  }
}

export function saveUserAuthKey(sessionId, expires) {
  try {
    Cookies.set("userAuthKey", sessionId, {
      expires: expires,
    });
  } catch (error) {
    this.errorCode = error.message;
    throw error;
  }
}

export function deleteUserAuthKey() {
  try {
    Cookies.remove("userAuthKey");
  } catch (error) {
    this.errorCode = error.message;
    throw error;
  }
}
