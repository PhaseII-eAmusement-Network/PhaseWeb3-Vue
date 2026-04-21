<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { APIGetAuthClient, APIPostAuthClient } from "@/stores/api/account.js";
import { getIntentById } from "@/constants/developer";
import { InternalApps } from "@/constants/developer/apps.js";

const CDN_URL = import.meta.env.VITE_CDN_URL;
const route = useRoute();
const clientId = route.query.client_id;
const stateData = route.query.state;
const clientData = ref(null);

onMounted(async () => {
  if (clientId) {
    await getClient(clientId);
  } else {
    console.error("No client_id provided in query parameters.");
  }
});

async function getClient(id) {
  try {
    const data = await APIGetAuthClient(id);
    if (data.internal && InternalApps[id]) {
      clientData.value = InternalApps[id];
      clientData.value.internal = true;
      clientData.value.callbackUrl = data.callbackUrl;
    } else {
      clientData.value = data;
    }
  } catch (error) {
    console.error("Failed to fetch client data:", error);
  }
}

const submit = async () => {
  const response = await APIPostAuthClient(clientId);
  if (!response.code) {
    console.error("Authorization failed");
  }

  var path = `${clientData.value.callbackUrl}?code=${response.code}`;
  if (stateData) {
    path = path.concat([`&state=${stateData}`]);
  }

  window.location.href = path;
};
</script>

<template>
  <LayoutGuest>
    <div class="flex md:min-h-screen md:items-center md:justify-center">
      <CardBox
        v-if="clientData !== null"
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
            <p class="text-lg relative bottom-0">Authorize App</p>
          </div>
          <div class="md:border-r" />
          <form @submit.prevent="submit()">
            <div class="flex flex-col items-center text-wrap">
              <template v-if="!clientData?.internal">
                <h1 class="text-lg md:text-xl mb-2">
                  Integrate with
                  <span class="font-bold">{{ clientData?.name }}</span>
                </h1>
              </template>
              <template v-else>
                <h1 class="text-lg md:text-xl mb-2">
                  Log in to
                  <span class="font-bold">{{ clientData?.name }}</span>
                </h1>
              </template>
              <img
                :src="clientData.image ?? `${CDN_URL}/${clientData?.data?.img}`"
                width="75"
                class="rounded-full shadow-lg mb-2"
              />
              <p class="text-md max-w-md wrap-break-word text-center">
                {{ clientData?.about }}
              </p>

              <hr class="border-r my-2 w-full" />

              <template
                v-if="!clientData?.internal && clientData?.data?.intents"
              >
                <h2 class="text-md md:text-lg">
                  <span class="font-bold">{{ clientData?.name }}</span> will
                  have access to:
                </h2>
                <ul class="text-sm md:text-md text-center">
                  <template
                    v-for="(value, key) in clientData?.data?.intents"
                    :key="key"
                  >
                    <li v-if="value">
                      - {{ getIntentById(key)?.label ?? "Unknown Intent" }}
                    </li>
                  </template>
                </ul>
              </template>
            </div>

            <div class="flex flex-col gap-2 mt-2">
              <BaseButton label="Authorize" color="success" type="submit" />
            </div>
            <hr class="border-t my-4 w-full" />

            <div class="flex flex-col items-center">
              <template v-if="!clientData?.internal">
                <p class="text-sm max-w-md wrap-break-word text-center mb-2">
                  Please note that
                  <span class="font-bold">{{ clientData?.name }}</span> is not a
                  <samp>PhaseII</samp> provided service, and that any issues
                  should be directed to the appropriate channels.
                </p>
                <p class="text-sm max-w-md wrap-break-word text-center">
                  <span class="font-bold">{{ clientData?.name }}</span> is
                  managed by
                  <span class="font-bold">{{ clientData?.team?.name }}</span>
                </p>
              </template>
              <template v-else>
                <p class="text-sm max-w-md wrap-break-word text-center">
                  This is an internal application provided by
                  <samp>PhaseII</samp>
                </p>
              </template>
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
