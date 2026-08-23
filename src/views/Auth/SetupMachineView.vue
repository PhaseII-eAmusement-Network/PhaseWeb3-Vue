<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
// import {  } from "@/stores/api/account.js";
import { APIGetArcade } from "@/stores/api/arcade";

const route = useRoute();
const token = route.query.token;
const tokenData = ref(null);
const selectedArcade = ref(null);
const selectedMachine = ref(null);
const arcadeData = ref(null);
const mainStore = useMainStore();

async function loadArcade(arcadeId) {
  try {
    const data = await APIGetArcade(arcadeId);
    arcadeData.value = data;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

const sortedArcades = mainStore.userArcades.map((arcade) => ({
  label: arcade.name,
  id: arcade.id,
}));
if (!sortedArcades.length) {
  window.alert("You must have at least one arcade!");
  window.location.href = "/";
}

function formatMachines(machines) {
  var formattedMachines = [];
  for (const machine of machines) {
    formattedMachines.push({
      id: machine.pcbId,
      label: machine.description,
    });
  }
  return formattedMachines;
}

watch(selectedArcade, (val) => {
  if (val !== null) {
    loadArcade(val);
  }
});

// async function getTokenData() {
//   const data = await APIGetContactless(token);
//   if (data?.active == true) {
//     tokenData.value = data;
//   }
// }

onMounted(async () => {
  if (token) {
    await console.log("hello"); // getTokenData();
  } else {
    console.error("No token provided in query parameters.");
  }
});

async function submit() {
  // const data = await APIPostContactless(token);
  // if (data?.approved == true) {
  //   window.alert("Login approved!");
  //   window.location.href = "/";
  // }
}
</script>

<template>
  <LayoutGuest>
    <div class="flex md:min-h-screen md:items-center md:justify-center">
      <CardBox
        v-if="tokenData == null"
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
            <p class="text-lg relative bottom-0">Machine Setup</p>
          </div>
          <div class="md:border-r" />
          <form @submit.prevent="submit()">
            <div class="flex flex-col items-center text-wrap">
              <h1 class="text-lg md:text-xl mb-2">
                Set up your
                <span class="font-bold">DanceDanceRevolution</span>
                machine
              </h1>
              <p class="text-md max-w-md wrap-break-word text-center">
                You scanned a Machine Setup QR code. <br />
                Let's assign your install a PCBID!
              </p>
            </div>
            <hr class="border-t my-4 w-full" />
            <div class="flex flex-col items-center text-wrap mb-4">
              <h1 class="text-lg md:text-xl mb-2 font-semibold">
                Select an arcade and machine
              </h1>
              <p class="text-md max-w-md wrap-break-word text-center">
                Your install will automatically have the PCBID configured.
              </p>
            </div>
            <FormField label="Arcade">
              <FormControl
                v-model="selectedArcade"
                name="arcade"
                :options="sortedArcades"
                required
              />
            </FormField>

            <template v-if="arcadeData !== null">
              <FormField label="Machine">
                <FormControl
                  v-model="selectedMachine"
                  name="machine"
                  :options="formatMachines(arcadeData.machines)"
                  required
                />
              </FormField>
            </template>

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
