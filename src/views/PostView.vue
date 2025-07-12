<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mdiBackburger } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { APIGetNewsPost } from "@/stores/api/news";
import { APIUserReadNews } from "@/stores/api/account";

const $route = useRoute();
const $router = useRouter();
const newsID = parseInt($route.params.id);

var thisNews = ref({ data: {} });
var newsBody = ref("");

onMounted(async () => {
  try {
    const data = await APIGetNewsPost(newsID);
    thisNews.value = data.news;
    newsBody.value = data.news.body.split("\n");
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  }

  try {
    await APIUserReadNews(newsID);
  } catch (error) {
    console.error("Failed to set news as read:", error);
  }
});

function goBack() {
  $router.push("/");
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <transition>
        <CardBox v-if="thisNews != {}" has-table>
          <div class="flex flex-col items-center">
            <img
              :src="thisNews.data.img"
              class="rounded-t-2xl md:rounded-2xl md:w-1/2 md:m-4"
            />
          </div>
          <div
            v-if="thisNews"
            :key="thisNews.id"
            class="flex flex-col items-center p-4"
          >
            <div class="text-left md:text-center">
              <h1 class="text-2xl">{{ thisNews.title }}</h1>
              <hr class="pb-1 my-2" />
              <div v-for="body of newsBody" :key="body">
                <p>{{ body }}</p>
                <br />
              </div>
            </div>
          </div>
          <div v-else>
            <h1 class="text-2xl">News not found...</h1>
          </div>
          <template #footer>
            <BaseButtons>
              <BaseButton
                label="Home"
                color="info"
                :icon="mdiBackburger"
                icon-size="20"
                @click="goBack"
              />
            </BaseButtons>
          </template>
        </CardBox>
      </transition>
    </SectionMain>
  </LayoutAuthenticated>
</template>
