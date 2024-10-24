<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  mdiCardAccountDetailsOutline,
  mdiCreditCardPlusOutline,
  mdiCreditCardEditOutline,
} from "@mdi/js";
import { dashCode } from "@/constants/userData.js";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";

import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
var cardData = ref([]);

const cardForm = reactive({
  newCard: null,
});

onMounted(async () => {
  try {
    const data = await mainStore.getCards();
    cardData.value = data;
  } catch (error) {
    console.error("Failed to fetch card data:", error);
  }
});

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy to clipboard!");
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <SectionTitleLine
        :icon="mdiCreditCardPlusOutline"
        title="Register Card"
        main
      />
      <CardBox is-form class="row-span-2 mb-6">
        <FormField
          label="Card ID"
          help="The 16 character ACCESS CODE. If your card is dated after 2016, you'll need to get the ACCESS CODE from a game."
        >
          <FormControl
            v-model="cardForm.newCard"
            :icon="mdiCreditCardEditOutline"
            name="cardId"
            type="card"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            minlength="16"
            maxlength="19"
            required
          />
        </FormField>

        <template #footer>
          <BaseButton type="submit" color="success" label="Add Card" />
          <BaseIcon
            v-if="passwordLoading"
            :path="mdiLoading"
            color="text-yellow-500"
            class="animate animate-spin"
          />
        </template>
      </CardBox>

      <div class="grid md:grid-cols-2 mb-2">
        <SectionTitleLine
          :icon="mdiCardAccountDetailsOutline"
          title="Login Cards"
          main
        />
        <div class="text-xl md:text-right">
          <h4>AC = Web Access Code</h4>
          <h4>NFC-ID = Internal ID for <samp>card0.txt</samp></h4>
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
      >
        <div
          v-for="card of cardData"
          :key="card.id"
          class="grid dark:bg-slate-900/70 rounded-2xl p-5"
        >
          <div class="flex justify-between md:grid md:gap-2 mb-4 items-center">
            <img src="/assets/passes/generic.webp" class="w-24 md:w-auto" />
            <h1 class="text-xl text-center font-mono">
              {{ dashCode(card.encoded) }}
            </h1>
          </div>

          <div class="grid grid-cols-3 md:grid-cols-2 gap-2">
            <BaseButton
              color="info"
              label="Copy AC"
              @click="copyToClipboard(card.encoded)"
            />
            <BaseButton
              color="info"
              label="Copy NFC-ID"
              @click="copyToClipboard(card.id)"
            />
            <BaseButton color="danger" label="Delete" />
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
