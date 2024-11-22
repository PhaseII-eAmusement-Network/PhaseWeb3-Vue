import Cookies from "js-cookie";

export function loadCookie(key) {
  try {
    const data = Cookies.get(key);
    return data;
  } catch (error) {
    this.errorCode = error.message;
    throw error;
  }
}

export function saveCookie(key, data, expires = 7) {
  try {
    Cookies.set(key, data, {
      expires: expires,
    });
    return true;
  } catch (error) {
    this.errorCode = error.message;
    throw error;
  }
}

export function deleteCookie(key) {
  try {
    Cookies.remove(key);
    return true;
  } catch (error) {
    this.errorCode = error.message;
    throw error;
  }
}
