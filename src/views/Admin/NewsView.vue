<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  mdiNewspaper,
  mdiNewspaperVariantMultipleOutline,
  mdiNewspaperMinus,
  mdiNewspaperPlus,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import PillTag from "@/components/PillTag.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

import {
  APIAdminNews,
  APIAdminCreateNews,
  APIAdminUpdateNews,
  APIAdminDeleteNews,
} from "@/stores/api/admin";
import BaseButtons from "@/components/BaseButtons.vue";

const $router = useRouter();
const newsData = ref([]);
const selectedNewsId = ref(null);
const selectedNews = ref(null);
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

async function updateNews() {
  if (!selectedNews.value) {
    return;
  }

  await APIAdminUpdateNews(selectedNewsId.value, selectedNews.value);
  selectedNews.value = null;
  selectedNewsId.value = null;
  loadData();
}

async function deleteNews() {
  if (!selectedNews.value) {
    return;
  }

  await APIAdminDeleteNews(selectedNews.value.id);
  selectedNews.value = null;
  selectedNewsId.value = null;
  loadData();
}

function formatNewsSelect(newsData) {
  var formattedNews = [];
  for (const news of newsData) {
    formattedNews.push({ id: news.id, label: news.title });
  }
  return formattedNews;
}

function getSelectedNews(newsId) {
  if (!newsId || !newsData.value) return null;
  selectedNews.value = newsData.value?.find((news) => news.id === newsId);
  return true;
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
        :icon="mdiNewspaper"
        title="Post Management"
        color="text-emerald-600"
        main
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form class="row-span-1 mb-6" @submit.prevent="createNews()">
          <PillTag
            color="success"
            label="Create Post"
            :icon="mdiNewspaperPlus"
            class="mb-2"
          />

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

        <CardBox is-form class="row-span-1 mb-6">
          <PillTag
            color="warning"
            label="Edit Post"
            :icon="mdiNewspaperMinus"
            class="mb-2"
          />
          <FormField label="Post">
            <FormControl
              v-model="selectedNewsId"
              name="news"
              :options="formatNewsSelect(newsData)"
              required
            />
          </FormField>
          <BaseDivider />
          <template v-if="getSelectedNews(selectedNewsId)">
            <FormField label="Title" help="News headline.">
              <FormControl v-model="selectedNews.title" required />
            </FormField>
            <FormField label="Body" help="News body.">
              <FormControl
                v-model="selectedNews.body"
                required
                type="textarea"
              />
            </FormField>
            <FormField label="Image URL" help="News image URL.">
              <FormControl v-model="selectedNews.data.img" required />
            </FormField>

            <BaseButtons>
              <BaseButton
                color="info"
                label="Update"
                :small="false"
                :icon="mdiNewspaper"
                @click="updateNews()"
              />

              <BaseButton
                color="danger"
                label="Delete Post"
                :small="false"
                :icon="mdiNewspaperMinus"
                @click="deleteNews()"
              />
            </BaseButtons>
          </template>
        </CardBox>
      </div>

      <SectionTitleLine
        :icon="mdiNewspaperVariantMultipleOutline"
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
