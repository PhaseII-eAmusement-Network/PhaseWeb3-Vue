<script setup>
import { ref, onMounted } from "vue";
import { PhArchive } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxNews from "@/components/Cards/CardBoxNews.vue";

import { useMainStore } from "@/stores/main";
import { formatSortableDate } from "@/constants/date";
const mainStore = useMainStore();
var newsData = ref([]);

onMounted(async () => {
  try {
    const data = await mainStore.fetchAllNews(null, true);
    newsData.value = data;
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  }
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="PhArchive" title="Network News Archive" main />

      <div v-if="newsData.length" class="grid gap-4 grid-cols-1 w-full pb-4">
        <CardBoxNews
          v-for="news of newsData"
          :id="news.id"
          :key="news.id"
          :title="news.title"
          :content="news.body"
          :date="formatSortableDate(news.timestamp)"
          :cover="news.data.img"
          :read="
            mainStore?.userData?.seen_news
              ? mainStore?.userData?.seen_news[news.id]
              : false
          "
          class="w-full h-full"
        />
      </div>
      <CardBoxComponentEmpty v-if="!newsData || !newsData.length" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
