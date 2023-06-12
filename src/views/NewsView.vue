<script setup>
import { mdiNewspaperVariant } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxNews from "@/components/Cards/CardBoxNews.vue";
import testNews from "@/constants/news.json";

const newsData = testNews;
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
          :date="news.timestamp"
          :cover="news.cover"
          class="w-full h-full"
        />
      </div>
      <CardBoxComponentEmpty v-if="!newsData || !newsData.length" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
