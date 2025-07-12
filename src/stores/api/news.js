import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

export async function APIGetAllNews() {
  if (!mainStore.loadedNews) {
    try {
      const data = await mainStore.callApi(`/news`);
      mainStore.loadedNews = data.slice(0, 2);
      return mainStore.loadedNews;
    } catch (error) {
      console.log("Error fetching news:", error);
      throw error;
    }
  } else {
    return mainStore.loadedNews;
  }
}

export async function APIGetNewsPost(newsId) {
  if (!mainStore.loadedArticles[newsId]) {
    try {
      const data = await mainStore.callApi(`/news/${newsId}`);
      mainStore.loadedArticles[newsId] = data;
      return mainStore.loadedArticles[newsId];
    } catch (error) {
      console.log("Error fetching post:", error);
      throw error;
    }
  } else {
    return mainStore.loadedArticles[newsId];
  }
}
