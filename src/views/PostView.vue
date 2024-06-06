<script setup>
import { useRoute, useRouter } from "vue-router";
import { mdiBackburger } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import testNews from "@/constants/news.json";
const $route = useRoute();
const $router = useRouter();
const newsID = parseInt($route.params.id);

const NewsData = testNews;
const thisNews = NewsData.find((x) => x.id === newsID);

const newsBody = thisNews.content.split("\n");

function goBack() {
  $router.push("/");
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <transition>
        <CardBox has-table>
          <div class="flex flex-col items-center">
            <img
              :src="thisNews.cover"
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
