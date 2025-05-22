import { defineStore } from "pinia";
import axios from "axios";
import { loadUserAuthKey, saveUserAuthKey } from "@/stores/auth";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* App Information */
    appVersion: import.meta.env.VITE_APP_VERSION,

    /* User */
    userId: null,
    userName: null,
    userEmail: null,
    userAvatar: null,
    userAdmin: false,
    userCardStyle: null,
    userData: null,
    discordRoles: null,
    userProfiles: [],
    userArcades: [],
    profiles: {},
    userCustomize: {},

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Authentication keys */
    userAuthKey: null, // Will be loaded and decrypted from cookies

    /* Loading state */
    isLoading: false,
    isSaving: false,
    loadingPool: [],
    savingPool: [],
    errorCode: null,

    /* User Loaded state */
    userLoaded: false,

    /* Save news state */
    loadedNews: null,
    loadedArticles: {},
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
      if (payload.discordRoles) {
        this.discordRoles = payload.discordRoles;
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
      if (payload.customize) {
        this.userCustomize = payload.customize;
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

    async callApi(endpoint, method = "GET", data = null, extraHeaders = {}) {
      const apiServer = import.meta.env.VITE_API_URL;
      const apiKey = import.meta.env.VITE_API_KEY;
      let loadingTimeout;
      this.errorCode = ""; // We want to reset the network error.

      const startLoading = () => {
        loadingTimeout = setTimeout(() => {
          if (method === "GET") {
            this.loadingPool.push(endpoint);
            this.isLoading = true;
            this.isSaving = false;
          } else if (method === "POST") {
            this.loadingPool.push(endpoint);
            this.savingPool.push(endpoint);
            this.isLoading = true;
            this.isSaving = true;
          } else if (method === "PUT") {
            this.loadingPool.push(endpoint);
            this.savingPool.push(endpoint);
            this.isLoading = true;
            this.isSaving = true;
          }
        }, 0); // Wait for .2 seconds before showing loading modal
      };

      // Start loading after the specified delay
      startLoading();

      const baseHeaders = {
        "App-Auth-Key": apiKey,
        "User-Auth-Key": loadUserAuthKey(),
      };

      const headers = { ...baseHeaders, ...extraHeaders };

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
          this.savingPool = this.savingPool.filter((e) => e !== endpoint);
          return null;
        }
        this.isLoading = false; // reset flags
        this.isSaving = false;
        this.loadingPool = this.loadingPool.filter((e) => e !== endpoint);
        this.savingPool = this.savingPool.filter((e) => e !== endpoint);
        return response.data;
      } catch (error) {
        this.errorCode = error.message;
        this.isSaving = false;
        this.savingPool = this.savingPool.filter((e) => e !== endpoint);
        throw error;
      } finally {
        clearTimeout(loadingTimeout);
      }
    },

    async fetchAllNews() {
      if (!this.loadedNews) {
        try {
          const data = await this.callApi("/news");
          this.loadedNews = data.slice(0, 2);
          return this.loadedNews;
        } catch (error) {
          console.log("Error fetching news:", error);
          throw error;
        }
      } else {
        return this.loadedNews;
      }
    },

    async fetchNews(newsID) {
      if (!this.loadedArticles[newsID]) {
        try {
          const data = await this.callApi(`/news/${newsID}`);
          this.loadedArticles[newsID] = data;
          return data;
        } catch (error) {
          console.log("Error fetching news:", error);
          throw error;
        }
      } else {
        return this.loadedArticles[newsID];
      }
    },

    async checkUserSession() {
      const request = {
        sessionId: loadUserAuthKey(),
      };

      try {
        const data = await this.callApi(`/auth/session`, "GET", request);
        return data;
      } catch (error) {
        console.log("Error checking session:", error);
        throw error;
      }
    },

    async deleteUserSession() {
      if (!loadUserAuthKey()) {
        this.userLoaded = false;
        return null;
      }

      const request = {
        sessionId: loadUserAuthKey(),
      };

      try {
        const data = await this.callApi(`/auth/session`, "DELETE", request);
        this.userLoaded = false;
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
        const data = await this.callApi(`/auth/session`, "POST", request);
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
            const response = await this.callApi(`/user?userId=${userId}`);
            var user = response.user;
            this.setUser({
              id: userId,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              admin: user.admin,
              data: user.data,
              discordRoles: user.discordRoles,
              cardStyle: "time",
              profiles: user.profiles,
              arcades: user.arcades,
              customize: user.data?.customize,
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

    async putUser(newUser) {
      try {
        const data = await this.callApi("/user", "POST", newUser);
        return data;
      } catch (error) {
        console.log("Error updating user:", error);
        throw error;
      }
    },

    async getMusicData(game, version, songIds = null, oneChart = false) {
      try {
        const data = await this.callApi(
          `/music?game=${game}&version=${version}` +
            (oneChart ? "&oneChart=true" : ""),
          "GET",
          null,
          { songIds: songIds.toString() }
        );
        return data.data;
      } catch (error) {
        console.log("Error fetching music data:", error);
        throw error;
      }
    },

    async getAttemptData(game, userId = null) {
      try {
        const data = await this.callApi(
          `/attempts/${game}` + (userId ? `?userId=${userId}` : ""),
          "GET",
          null
        );
        return data.data;
      } catch (error) {
        console.log("Error fetching attempt data:", error);
        throw error;
      }
    },
  },
});
