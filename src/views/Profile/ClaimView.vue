<script setup>
import { ref, reactive } from "vue";
import {
  PhUserCircleDashed,
  PhCreditCard,
  PhPassword,
  PhUserSwitch,
  PhSpinnerBall,
  PhUnite,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import UserCard from "@/components/UserCard.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import MergeModal from "@/components/Modal/MergeModal.vue";
import ConfirmMergeModal from "@/components/Modal/ConfirmMergeModal.vue";

import { APIStartTakeover, APISaveTakeover } from "@/stores/api/account";
import { getGameInfo } from "@/constants";

const cardLoading = ref(false);
const takeoverData = ref(null);
const modalActive = ref(false);
const confirmModalActive = ref(false);
const profileForm = reactive({
  cardId: null,
  pin: null,
});
const modalForm = ref({
  game: null,
  scores: false,
  // data: false,
});
const mergeSettings = reactive({ card: true });
const saveState = ref(null);
const recordCount = ref(0);

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

  takeoverData.value = await APIStartTakeover(
    profileForm.cardId,
    profileForm.pin,
  );

  cardLoading.value = false;
}

function openModal(gameId) {
  modalActive.value = false;
  modalForm.value.game = gameId;
  modalActive.value = true;
}

function openConfirmModal() {
  confirmModalActive.value = true;
}

function filterUserProfiles(userProfiles) {
  var filteredProfiles = [];
  for (const profile of userProfiles) {
    const game = getGameInfo(profile.game);
    if (game && !game.skip) {
      filteredProfiles.push(profile);
    }
  }

  filteredProfiles.sort(function (x, y) {
    return y.data.last_play_timestamp - x.data.last_play_timestamp;
  });

  return filteredProfiles;
}

function saveModal({ game, scores }) {
  mergeSettings[game] = { scores: scores };
  modalActive.value = false;
  modalForm.value = {
    game: null,
    scores: false,
    data: false,
  };
}

async function saveSettings() {
  const saveResult = await APISaveTakeover(
    profileForm.cardId,
    profileForm.pin,
    mergeSettings,
  );
  confirmModalActive.value = false;
  if (!saveResult) {
    window.alert("Failed to merge!");
  }

  if (saveResult.status === "success") {
    saveState.value = true;
    recordCount.value = saveResult.count ?? 0;
  } else {
    saveState.value = false;
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <template v-if="!takeoverData">
        <SectionTitleLine :icon="PhUserSwitch" title="Claim a Profile" main />
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

          <FormField label="PIN" help="Used when logging into a game">
            <FormControl
              v-model="profileForm.pin"
              :icon="PhPassword"
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
              :icon="PhSpinnerBall"
              color="text-yellow-500"
              class="animate animate-spin"
            />
          </template>
        </CardBox>
      </template>

      <div v-if="takeoverData && saveState == null">
        <SectionTitleLine
          :icon="PhUserCircleDashed"
          title="Select Profiles to Merge"
          main
        />

        <CardBox>
          <h2 class="text-xl mb-6">
            Click a game to view merge options. <br />
            Please note that this cannot be undone once complete.
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mb-6"
          >
            <CardBoxGameStat
              v-for="profile of filterUserProfiles(takeoverData.profiles)"
              :key="profile.game"
              :game="profile.game"
              :value="profile.data.total_plays"
              profile-name=""
              type="plays"
              :class="
                mergeSettings[profile.game]
                  ? 'border-green-800 border-[3px]'
                  : null
              "
              disable-local-click
              @click="openModal(profile.game)"
            />
          </div>

          <FormField
            label="Transfer Card"
            help="Moves the card to your account."
          >
            <FormCheckRadio
              v-model="mergeSettings.card"
              :input-value="mergeSettings.card"
              :icon="PhCreditCard"
              type="switch"
              name="card"
            />
          </FormField>

          <div class="mt-4">
            <BaseButton
              color="success"
              label="Start Merge"
              :disabled="JSON.stringify(mergeSettings) == JSON.stringify({})"
              @click="openConfirmModal"
            />
          </div>
        </CardBox>
      </div>

      <div v-if="saveState == true">
        <SectionTitleLine :icon="PhUnite" title="Merge Results" main />
        <CardBox>
          <h2 class="text-xl mb-6">
            ✅ Successfully merged {{ recordCount }} records. Yippie!
          </h2>

          <div class="mt-4">
            <BaseButton color="success" label="Return to Dashboard" to="/" />
          </div>
        </CardBox>
      </div>

      <div v-if="saveState == false">
        <SectionTitleLine :icon="PhUnite" title="Merge Results" main />
        <CardBox>
          <h2 class="text-xl mb-6">❌ Failed to merge. Please try again.</h2>

          <div class="mt-4">
            <BaseButton
              color="warning"
              label="Retry"
              @click="openConfirmModal"
            />
          </div>
        </CardBox>
      </div>

      <template v-if="modalActive">
        <MergeModal
          :game="modalForm.game"
          :user-id="takeoverData.userId"
          :settings="mergeSettings[modalForm.game]"
          @save-merge="saveModal"
          @close-modal="modalActive = false"
        />
      </template>

      <template v-if="confirmModalActive">
        <ConfirmMergeModal
          :game="modalForm.game"
          :settings="mergeSettings"
          @save-merge="saveSettings"
          @close-modal="confirmModalActive = false"
        />
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
