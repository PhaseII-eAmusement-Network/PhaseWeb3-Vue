<script setup>
import { ref, reactive } from "vue";
import {
  mdiAccountArrowLeftOutline,
  mdiCreditCardEditOutline,
  mdiAsterisk,
  mdiLoading,
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

const cardLoading = ref(false);
const profileForm = reactive({
  cardId: null,
  pin: null,
});

function cardInput(event) {
  var input = event.target.value;
  input = input.replace(/[^A-Za-z0-9]/g, "");

  // Format the input to XXXX-XXXX-XXXX-XXXX
  input = input
    .toUpperCase()
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");

  profileForm.cardId = input;
}

function pinInput(event) {
  event.target.value = event.target.value.replace(/\D/g, "");
}

async function submitCard() {
  cardLoading.value = true;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <SectionTitleLine
        :icon="mdiAccountArrowLeftOutline"
        title="Claim a Profile"
        main
      />
      <CardBox is-form class="row-span-2 mb-6" @submit.prevent="submitCard()">
        <h2 class="text-xl mb-6 lg:w-1/2">
          If you registered a card in game and need to claim it, you may do so
          here. Please note that the account cannot already be claimed!
        </h2>

        <FormField
          label="Card ID"
          help="The 16 character ACCESS CODE. If your card is dated after 2016, you'll need to get the ACCESS CODE from a game."
        >
          <FormControl
            v-model="profileForm.cardId"
            :icon="mdiCreditCardEditOutline"
            name="cardId"
            type="card"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            :minlength="19"
            :maxlength="19"
            required
            @input="cardInput"
          />
        </FormField>

        <FormField label="PIN" help="Used when logging into a game">
          <FormControl
            v-model="profileForm.pin"
            :icon="mdiAsterisk"
            type="password"
            name="pin"
            :minlength="4"
            :maxlength="4"
            inputmode="numeric"
            pattern="\d{4}"
            autocomplete="pin"
            @input="pinInput"
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
    </SectionMain>
  </LayoutAuthenticated>
</template>
