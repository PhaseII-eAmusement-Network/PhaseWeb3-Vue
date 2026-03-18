<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useMainStore } from "@/stores/main.js";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";

const router = useRouter();
const mainStore = useMainStore();

const form = reactive({
  spinin: false,
});

const submit = async () => {
  const response = await mainStore.createUserSession();
  if (response) {
    router.push("/");
  }
};

const appInfo = {
  name: "Edi",
  image: "/edi512x512_2.png",
  manager: "Lumen",
  about:
    "Edi is a DDR score tracking app that offers a direct connection to your PhaseII account.",
  intents: ["user", "account", "webhook_scores"],
  internal: false,
};
</script>

<template>
  <LayoutGuest>
    <div class="flex md:min-h-screen md:items-center md:justify-center">
      <CardBox
        class="w-full md:w-auto rounded-none md:rounded-xl md:drop-shadow-xl"
        :class="form.spinin ? 'animate-spin' : 'animate-none'"
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
              <button
                class="text-sm text-gray-700 dark:text-white/75 hover:cursor-pointer"
                @click="form.spinin = !form.spinin"
              >
                Spinnin' since 2021
              </button>
            </div>
            <hr class="border-r my-1 w-full mb-4" />
            <p class="text-lg relative bottom-0">Authorize App</p>
          </div>
          <div class="md:border-r" />
          <form @submit.prevent="submit()">
            <div class="flex flex-col items-center text-wrap">
              <h1 class="text-lg md:text-xl mb-2">
                Integrate with <span class="font-bold">{{ appInfo.name }}</span>
              </h1>
              <img
                :src="appInfo.image"
                width="75"
                class="rounded-full shadow-lg mb-2"
              />
              <p class="text-md max-w-md wrap-break-word text-center">
                {{ appInfo.about }}
              </p>

              <hr class="border-r my-2 w-full" />

              <h2 class="text-md md:text-lg">
                <span class="font-bold">{{ appInfo.name }}</span> will have
                access to:
              </h2>
              <ul class="text-sm md:text-md text-center">
                <li v-for="intent of appInfo.intents" :v-key="intent">
                  - {{ intent }}
                </li>
              </ul>
            </div>

            <div class="flex flex-col gap-2 mt-4">
              <BaseButton label="Authorize" color="success" type="submit" />
            </div>
            <hr class="border-t my-4 w-full" />

            <div class="flex flex-col items-center">
              <p
                v-if="!appInfo.internal"
                class="text-sm max-w-md wrap-break-word text-center mb-2"
              >
                Please note that
                <span class="font-bold">{{ appInfo.name }}</span> is not a
                <samp>PhaseII</samp> provided service, and that any issues
                should be directed to the appropriate channels.
              </p>
              <p class="text-sm max-w-md wrap-break-word text-center">
                <span class="font-bold">{{ appInfo.name }}</span> is managed by
                <span class="font-bold">{{ appInfo.manager }}</span>
              </p>
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
