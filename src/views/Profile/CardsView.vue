<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  PhIdentificationCard,
  PhPlusCircle,
  PhCreditCard,
  PhSpinnerBall,
} from "@phosphor-icons/vue";
import { dashCode } from "@/constants/userData.js";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import UserCard from "@/components/UserCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;

import { APIGetCards, APIPutCard, APIDeleteCard } from "@/stores/api/account";
var cardData = ref([]);

const cardLoading = ref(false);
const cardForm = reactive({
  newCard: null,
});

async function loadCards() {
  cardData.value = null;
  try {
    const data = await APIGetCards();
    cardData.value = data;
  } catch (error) {
    console.error("Failed to fetch card data:", error);
  }
}

onMounted(async () => {
  await loadCards();
});

function cardInput(event) {
  var input = event.target.value;
  input = input.replace(/[^A-Za-z0-9]/g, "");

  // Format the input to XXXX-XXXX-XXXX-XXXX
  input = input
    .toUpperCase()
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");

  cardForm.newCard = input;
}

async function submitCard() {
  cardLoading.value = true;
  const response = await APIPutCard(cardForm.newCard);
  if (response.status == "success") {
    cardForm.newCard = null;
    cardLoading.value = false;
    await loadCards();
  }
}

async function deleteCard(cardId) {
  const response = await APIDeleteCard(dashCode(cardId));
  if (response.status == "success") {
    await loadCards();
  }
}

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

      <SectionTitleLine :icon="PhPlusCircle" title="Add a Card" main />
      <CardBox is-form class="row-span-2 mb-6" @submit.prevent="submitCard()">
        <FormField
          label="Card ID"
          help="The 16 character ACCESS CODE. If your card is dated after 2016, you'll need to get the ACCESS CODE from a game."
        >
          <FormControl
            v-model="cardForm.newCard"
            :icon="PhCreditCard"
            name="cardId"
            type="card"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            :minlength="19"
            :maxlength="19"
            required
            @input="cardInput"
          />
        </FormField>

        <template #footer>
          <BaseButton type="submit" color="success" label="Add" />
          <BaseIcon
            v-if="cardLoading"
            :icon="PhSpinnerBall"
            color="text-yellow-500"
            class="animate animate-spin"
          />
        </template>
      </CardBox>

      <div class="grid md:grid-cols-2 mb-2">
        <SectionTitleLine
          :icon="PhIdentificationCard"
          title="Login Cards"
          main
        />
        <div class="text-xl md:text-right">
          <h4>AC = Web Access Code</h4>
          <h4>NFC-ID = Internal ID for <samp>card0.txt</samp></h4>
        </div>
      </div>

      <div
        v-if="cardData"
        class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 gap-6"
      >
        <div
          v-for="card of cardData"
          :key="card.id"
          class="grid dark:bg-slate-900/70 rounded-2xl p-5"
        >
          <div class="flex justify-between md:grid md:gap-2 mb-4 items-center">
            <img
              :src="`${ASSET_PATH}/passes/generic.webp`"
              class="w-24 md:w-auto"
            />
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
            <BaseButton
              color="danger"
              label="Delete"
              @click="deleteCard(card.encoded)"
            />
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
