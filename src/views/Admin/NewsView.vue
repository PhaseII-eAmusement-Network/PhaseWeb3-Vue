<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mdiNewspaper, mdiNewspaperPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

import { APIAdminNews, APIAdminCreateNews } from "@/stores/api/admin";

const $router = useRouter();
const newsData = ref([]);
const headers = [
  {
    text: "Title",
    value: "title",
    width: 150,
    sortable: true,
  },
  {
    text: "Body",
    value: "body",
    width: 300,
  },
  {
    text: "Image URL",
    value: "data.img",
    width: 300,
  },
];

onMounted(async () => {
  loadData();
});

async function loadData() {
  try {
    const data = await APIAdminNews();
    var formattedItems = [];
    for (var item of data) {
      if (item.timestamp) {
        const date = new Date(item.timestamp * 1000);
        item.timestamp = date.toLocaleString();
      }

      formattedItems.push(item);
    }

    newsData.value = formattedItems;
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  }
}

const openNews = (item) => {
  const arcadeId = item.id;
  $router.push(`/news/${arcadeId}`);
};

const initNews = {
  title: null,
  body: null,
  data: { img: null },
};

const newNews = reactive({
  ...initNews,
});

async function createNews() {
  try {
    const data = await APIAdminCreateNews(newNews);
    newsData.value = data;
  } catch (error) {
    console.error("Failed to post news:", error);
  }

  Object.assign(newNews, initNews);
  loadData();
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox class="mb-6 p-1">
        <h1 class="text-3xl">News Management</h1>
        <p class="text-sm text-gray-400">Enter an post to read it</p>
      </CardBox>

      <SectionTitleLine
        :icon="mdiNewspaperPlus"
        title="Create News"
        color="text-emerald-600"
        main
      />
      <CardBox is-form class="row-span-1 mb-6" @submit.prevent="createNews()">
        <FormField label="Title" help="News headline.">
          <FormControl v-model="newNews.title" required />
        </FormField>
        <FormField label="Body" help="News body.">
          <FormControl v-model="newNews.body" required type="textarea" />
        </FormField>
        <FormField label="Image URL" help="News image URL.">
          <FormControl v-model="newNews.data.img" required />
        </FormField>

        <div>
          <BaseButton
            type="submit"
            color="success"
            label="Create"
            :small="false"
          />
        </div>
      </CardBox>

      <SectionTitleLine
        :icon="mdiNewspaper"
        title="All News"
        color="text-blue-400"
        main
      />
      <CardBox has-table class="mb-6">
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="headers"
              :items="newsData"
              @row-clicked="openNews"
            />
            <h1 class="mx-4 mt-1 mb-2 text-md lg:text-lg">
              Click row to open arcade
            </h1>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
