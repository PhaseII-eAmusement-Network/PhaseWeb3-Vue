<script setup>
import { ref, onMounted } from "vue";
import { mdiNewspaperVariant } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxNews from "@/components/Cards/CardBoxNews.vue";

import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
var newsData = ref([]);

onMounted(async () => {
  try {
    const data = await mainStore.fetchAllNews();
    newsData.value = data;
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  }
});

function humanReadableTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiNewspaperVariant" title="Network News" main />

      <div class="grid gap-4 grid-cols-1 w-full">
        <CardBoxNews
          v-for="news of newsData"
          :id="news.id"
          :key="news.id"
          :title="news.title"
          :content="news.content"
          :date="humanReadableTime(news.timestamp)"
          :cover="news.cover"
          class="w-full h-full"
        />
      </div>
      <CardBoxComponentEmpty v-if="!newsData || !newsData.length" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
