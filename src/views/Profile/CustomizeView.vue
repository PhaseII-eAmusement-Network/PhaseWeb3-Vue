<script setup>
import { useMainStore } from "@/stores/main";
import { ref, watch } from "vue";
import { PhPaintBrushBroad } from "@phosphor-icons/vue";

import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import { ProfileCustomizations } from "@/constants/customizations";
import { APIUserCustomize } from "@/stores/api/account";

const mainStore = useMainStore();
const userCustomize = ref(mainStore.userCustomize);
var originalData = JSON.parse(JSON.stringify(mainStore.userCustomize));

watch(
  () => mainStore.userCustomize,
  (newValue) => {
    userCustomize.value = newValue;
    originalData = JSON.parse(JSON.stringify(newValue));
  },
);

async function updateCustomize() {
  var data = null;

  try {
    data = await APIUserCustomize(userCustomize.value);
  } catch (error) {
    console.error("Failed to update customize:", error);
  }

  if (data?.status === "success") {
    mainStore.userLoaded = false;
    await mainStore.loadUser();
    location.reload();
  }
}

function userChanged() {
  if (JSON.stringify(originalData) !== JSON.stringify(userCustomize.value)) {
    return true;
  } else {
    return false;
  }
}

async function revert() {
  mainStore.userLoaded = false;
  await mainStore.loadUser();
  location.reload();
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" />
      <SectionTitleLine
        :icon="PhPaintBrushBroad"
        title="Profile Customizations"
        main
      />

      <div>
        <CardBox>
          <form @submit.prevent="updateCustomize">
            <FormField label="Profile Background">
              <FormControl
                v-model="userCustomize.card"
                :options="ProfileCustomizations.cardList"
                :model-value="userCustomize.card ?? 'time'"
                name="card"
              />
            </FormField>

            <FormField label="Profile Border">
              <FormControl
                v-model="userCustomize.border"
                :options="ProfileCustomizations.borderList"
                :model-value="userCustomize.border ?? ''"
                name="border"
              />
            </FormField>

            <FormField label="Disable Greeting">
              <FormCheckRadio
                v-model="userCustomize.disableGreeting"
                type="switch"
                :input-value="userCustomize.disableGreeting ?? false"
                name="disableGreeting"
              />
            </FormField>

            <FormField label="Disable WebUI Update Popup">
              <FormCheckRadio
                v-model="userCustomize.disableUpdatePopup"
                type="switch"
                :input-value="userCustomize.disableUpdatePopup ?? false"
                name="disableUpdatePopup"
              />
            </FormField>

            <FormField
              label="Shrimp Links"
              help="Allow my mind to be probed by shrimps"
              class="text-pink-300"
            >
              <FormCheckRadio
                v-model="userCustomize.shrimpLinks"
                type="switch"
                :input-value="userCustomize.shrimpLinks ?? false"
                name="shrimpLinks"
              />
            </FormField>

            <FormField label="Outlined Buttons">
              <FormCheckRadio
                v-model="userCustomize.buttonOutline"
                type="switch"
                :input-value="userCustomize.buttonOutline ?? false"
                name="buttonOutline"
              />
            </FormField>

            <FormField label="Outlined Pill-Tags">
              <FormCheckRadio
                v-model="userCustomize.pillOutline"
                type="switch"
                :input-value="userCustomize.pillOutline ?? false"
                name="pillOutline"
              />
            </FormField>

            <div class="space-x-2">
              <BaseButton type="submit" color="success" label="Save" />
              <BaseButton
                v-if="userChanged()"
                color="danger"
                label="Revert"
                @click="revert"
              />
            </div>
          </form>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
