<script setup>
import { mdiNewspaperVariant } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxNews from "@/components/Cards/CardBoxNews.vue";

const testNews = [
  {
    id: 0,
    title: "GITADORA HIGH-VOLTAGE Now Supported!",
    content:
      "I finally bit the bullet, sat down for 14 hours straight, and completely rewrote my Gitadora backend. Gitadora High-Voltage is now FULLY supported! For the time being this has broken all Gitadora ORIGINAL profiles, but these will be migrated over soon! Expect Nex+age and older to come soon. Enjoy!",
    cover: "https://i.imgur.com/WPRlNo6.png",
    timestamp: "2022.11.20 5:48:10 PM",
  },
  {
    id: 1,
    title: "FutureTomTom Now Supported!",
    content:
      "This weird drumming game now has support on PhaseII! Ver.1 and Ver.2 are both fully working, though there aren't any events set up currently.",
    cover: "https://i.imgur.com/UWtUAd5.png",
    timestamp: "2022.11.20 5:48:10 PM",
  },
];
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiNewspaperVariant" title="Network News" main />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardBoxNews
          v-for="news of testNews"
          :key="news.id"
          :title="news.title"
          :content="news.content"
          :date="news.timestamp"
          :cover="news.cover"
        />
      </div>
      <CardBoxComponentEmpty v-if="!testNews || !testNews.length" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
