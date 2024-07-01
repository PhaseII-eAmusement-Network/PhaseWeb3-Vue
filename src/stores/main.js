import { defineStore } from "pinia";
import axios from "axios";
import { loadUserAuthKey, saveUserAuthKey } from "@/stores/auth";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userId: null,
    userName: null,
    userEmail: null,
    userAvatar: null,
    userAdmin: false,
    userCardStyle: null,
    userData: null,
    userProfiles: [],
    userArcades: [],
    profiles: {},

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Authentication keys */
    userAuthKey: null, // Will be loaded and decrypted from cookies

    /* Loading state */
    isLoading: false,
    isSaving: false,
    errorCode: null,

    /* User Loaded state */
    userLoaded: false,
  }),
  actions: {
    setUser(payload) {
      if (payload.id) {
        this.userId = payload.id;
      }
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
      if (payload.admin) {
        this.userAdmin = payload.admin;
      }
      if (payload.data) {
        this.userData = payload.data;
      }
      if (payload.cardStyle) {
        this.userCardStyle = payload.cardStyle;
      }
      if (payload.profiles) {
        this.userProfiles = payload.profiles;
      }
      if (payload.arcades) {
        this.userArcades = payload.arcades;
      }
    },

    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    async callApi(endpoint, method = "GET", data = null) {
      const apiServer = import.meta.env.VITE_API_URL;
      const apiKey = import.meta.env.VITE_API_KEY;
      let loadingTimeout;

      const startLoading = () => {
        loadingTimeout = setTimeout(() => {
          if (method === "GET") {
            this.isLoading = true;
          }
        }, 200); // Wait for .2 seconds before showing loading modal
      };

      // Start loading after the specified delay
      startLoading();

      const headers = {
        "App-Auth-Key": apiKey,
        "User-Auth-Key": loadUserAuthKey(),
      };

      const url = `${apiServer}/v1${endpoint}`;

      const config = {
        method,
        url: url,
        headers,
      };

      if (data) {
        config.data = data;
      }

      try {
        const response = await axios(config);
        if (response.data.status === "error") {
          this.errorCode = response.data.error_code;
          this.isSaving = false;
          this.isLoading = true;
          return null;
        }
        this.isLoading = false; // reset flags
        this.isSaving = false;
        return response.data;
      } catch (error) {
        this.errorCode = error.message;
        this.isSaving = false;
        throw error;
      } finally {
        clearTimeout(loadingTimeout);
      }
    },

    async fetchAllNews() {
      try {
        const data = await this.callApi("/news/getAllNews");
        return data.slice(0, 2);
      } catch (error) {
        console.log("Error fetching news:", error);
        throw error;
      }
    },

    async fetchNews(newsID) {
      try {
        const data = await this.callApi(`/news/getNews/${newsID}`);
        return data;
      } catch (error) {
        console.log("Error fetching news:", error);
        throw error;
      }
    },

    async checkUserSession() {
      const request = {
        sessionId: loadUserAuthKey(),
      };

      try {
        const data = await this.callApi(`/auth/checkSession`, "POST", request);
        return data;
      } catch (error) {
        console.log("Error checking session:", error);
        throw error;
      }
    },

    async deleteUserSession() {
      const request = {
        sessionId: loadUserAuthKey(),
      };

      try {
        const data = await this.callApi(`/auth/deleteSession`, "POST", request);
        console.log(data);
        return data;
      } catch (error) {
        console.log("Error deleting session:", error);
        throw error;
      }
    },

    async createUserSession(username, password, remember) {
      const request = {
        username: username,
        password: password,
      };

      try {
        const data = await this.callApi(`/auth/createSession`, "POST", request);
        if (data && data.status === "success") {
          saveUserAuthKey(data.sessionId, remember ? 30 : 1);
          return true;
        } else {
          alert(this.errorCode);
          return false;
        }
      } catch (error) {
        console.log("Error creating session:", error);
        throw error;
      }
    },

    async loadUser() {
      try {
        const validSession = await this.checkUserSession();
        if (validSession && validSession.activeSession && !this.userLoaded) {
          const userId = validSession.userId;
          if (userId) {
            const response = await this.callApi(`/user/${userId}`);
            var user = response.user;
            this.setUser({
              id: userId,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              admin: user.admin,
              data: user.data,
              cardStyle: "time",
              profiles: user.profiles,
              arcades: user.arcades,
            });
            this.userLoaded = true;
            return true;
          }
        } else if (this.userLoaded) {
          // User cache is up to date. Don't load.
          return true;
        }
        return false;
      } catch (error) {
        console.log("Error loading user:", error);
        throw error;
      }
    },

    async getUser(userId) {
      try {
        const data = await this.callApi(`/user/${userId}`);
        return data.user;
      } catch (error) {
        console.log("Error fetching user:", error);
        throw error;
      }
    },

    async getCards() {
      try {
        const data = await this.callApi(`/user/cards`);
        return data.cards;
      } catch (error) {
        console.log("Error fetching cards:", error);
        throw error;
      }
    },

    async getArcade(arcadeId) {
      try {
        const data = await this.callApi(`/arcade/${arcadeId}`);
        return data.arcade;
      } catch (error) {
        console.log("Error fetching arcade:", error);
        throw error;
      }
    },

    async getPaseliData(arcadeId) {
      try {
        const data = await this.callApi(`/arcade/${arcadeId}/paseli`);
        return data.data;
      } catch (error) {
        console.log("Error fetching PASELI:", error);
        throw error;
      }
    },

    async getGameProfiles(game) {
      try {
        const data = await this.callApi(`/game/${game}/profiles`);
        return data.data;
      } catch (error) {
        console.log("Error fetching profiles:", error);
        throw error;
      }
    },

    async getUserProfile(game, version, userId = null) {
      if (!userId) {
        while (!this.userId) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        userId = this.userId;
      }

      try {
        const data = await this.callApi(
          `/profile/${game}?version=${version}&userId=${userId}`
        );
        return data.data;
      } catch (error) {
        console.log("Error fetching profile:", error);
        throw error;
      }
    },
  },
});
