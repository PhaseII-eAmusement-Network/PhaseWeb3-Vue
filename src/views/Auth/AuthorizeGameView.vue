<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { APIGetContactless, APIPostContactless } from "@/stores/api/account.js";

const route = useRoute();
const token = route.query.token;
const tokenData = ref(null);

async function getTokenData() {
  const data = await APIGetContactless(token);
  if (data?.active == true) {
    tokenData.value = data;
  }
}

onMounted(async () => {
  if (token) {
    await getTokenData();
  } else {
    console.error("No token provided in query parameters.");
  }
});

async function submit() {
  const data = await APIPostContactless(token);
  if (data?.approved == true) {
    window.alert("Login approved!");
    window.location.href = "/";
  }
}
</script>

<template>
  <LayoutGuest>
    <div class="flex md:min-h-screen md:items-center md:justify-center">
      <CardBox
        v-if="tokenData !== null"
        class="w-full md:w-auto rounded-none md:rounded-xl md:drop-shadow-xl"
        has-table
        is-auth
      >
        <div
          class="p-4 flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4"
        >
          <div class="flex flex-col items-center text-wrap h-full md:mt-5">
            <div class="flex flex-col items-center text-wrap">
              <img src="/favicon.png" class="rounded-full shadow-lg mb-2" />
              <h1 class="text-xl"><samp>PhaseII</samp></h1>
              <button class="text-sm text-gray-700 dark:text-white/75">
                Spinnin' since 2021
              </button>
            </div>
            <hr class="border-r my-1 w-full mb-4" />
            <p class="text-lg relative bottom-0">Contactless Login</p>
          </div>
          <div class="md:border-r" />
          <form @submit.prevent="submit()">
            <div class="flex flex-col items-center text-wrap">
              <h1 class="text-lg md:text-xl mb-2">
                Approve Login at
                <span class="font-bold">{{ tokenData?.arcade }}</span>
              </h1>
              <p class="text-md max-w-md wrap-break-word text-center">
                You scanned a Contactless Login QR code. Are you really trying
                to log in?
              </p>
            </div>

            <div class="flex flex-col gap-2 mt-2">
              <BaseButton label="Approve" color="success" type="submit" />
            </div>

            <hr class="border-t my-4 w-full" />
            <div class="flex flex-col gap-2 my-4">
              <h2>I changed my mind...</h2>
              <BaseButton label="Go back" color="danger" to="/" />
            </div>
          </form>
        </div>
      </CardBox>
    </div>
  </LayoutGuest>
</template>
