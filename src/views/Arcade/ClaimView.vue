<script setup>
import { ref, reactive } from "vue";
import {
  mdiStorePlus,
  mdiScriptTextKeyOutline,
  mdiLoading,
  mdiAccountConvertOutline,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import UserCard from "@/components/UserCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

import { APIStartTakeover, APISaveTakeover } from "@/stores/api/arcade";

const cardLoading = ref(false);
const takeoverData = ref(null);
const arcadeForm = reactive({
  PCBID: null,
});
const saveState = ref(null);

async function submitPCBID() {
  cardLoading.value = true;
  takeoverData.value = await APIStartTakeover(arcadeForm.PCBID);
  cardLoading.value = false;
}

async function saveSettings() {
  const saveResult = await APISaveTakeover(arcadeForm.PCBID);
  if (!saveResult) {
    window.alert("Failed to takeover!");
  }

  if (saveResult.status === "success") {
    saveState.value = true;
  } else {
    saveState.value = false;
  }

  mainStore.userLoaded = false;
  mainStore.loadUser();
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <template v-if="!takeoverData">
        <SectionTitleLine :icon="mdiStorePlus" title="Claim an Arcade" main />
        <CardBox
          is-form
          class="row-span-2 mb-6"
          @submit.prevent="submitPCBID()"
        >
          <h2 class="text-xl mb-6 lg:w-1/2">
            Claim an arcade using a PCBID. If the account already has an owner,
            you may not claim the arcade.
          </h2>

          <FormField
            label="PCBID"
            help="A PCBID from the arcade you're wanting to claim."
          >
            <FormControl
              v-model="arcadeForm.PCBID"
              :icon="mdiScriptTextKeyOutline"
              name="cardId"
              type="pcbid"
              placeholder="XXXXXXXXXXXXXXXXX"
              :minlength="20"
              :maxlength="20"
              required
            />
          </FormField>

          <template #footer>
            <BaseButton type="submit" color="success" label="Start Claim" />
            <BaseIcon
              v-if="cardLoading"
              :path="mdiLoading"
              color="text-yellow-500"
              class="animate animate-spin"
            />
          </template>
        </CardBox>
      </template>

      <div v-if="takeoverData && saveState == null">
        <SectionTitleLine :icon="mdiStorePlus" title="Confirm Merge" main />
        <CardBox>
          <h2 class="text-2xl font-bold">
            {{ takeoverData?.arcade?.name }}
          </h2>
          <h3 class="text-xl mb-6">
            {{ takeoverData?.arcade?.description }}
          </h3>

          <h2 class="text-xl mb-6">
            This arcade has {{ takeoverData?.count }} machine(s).
          </h2>

          <div class="mt-4">
            <BaseButton
              color="success"
              label="Start Takeover"
              @click="saveSettings"
            />
          </div>
        </CardBox>
      </div>

      <div v-if="saveState == true">
        <SectionTitleLine
          :icon="mdiAccountConvertOutline"
          title="Takeover Results"
          main
        />

        <CardBox>
          <h2 class="text-xl mb-6">
            ✅ Successfully merged {{ takeoverData?.count }} machines. Yippie!
          </h2>

          <div class="mt-4">
            <BaseButton
              color="success"
              label="Go to Arcade"
              :href="`#/arcade/${takeoverData?.arcade?.id}`"
            />
          </div>
        </CardBox>
      </div>

      <div v-if="saveState == false">
        <SectionTitleLine
          :icon="mdiAccountConvertOutline"
          title="Merge Results"
          main
        />

        <CardBox>
          <h2 class="text-xl mb-6">❌ Failed to merge. Please try again.</h2>

          <div class="mt-4">
            <BaseButton color="warning" label="Retry" @click="saveSettings" />
          </div>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
