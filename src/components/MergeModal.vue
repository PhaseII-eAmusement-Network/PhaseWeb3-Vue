<script setup>
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import GameIcon from "@/components/GameIcon.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import BaseButton from "./BaseButton.vue";
import { getGameInfo } from "@/constants";
import { APIGetProfile } from "@/stores/api/profile";
import { onMounted, ref } from "vue";

const props = defineProps({
  userId: {
    type: Number,
    default: null,
  },
  game: {
    type: String,
    default: null,
  },
  settings: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["saveMerge", "closeModal"]);

const selectedGame = getGameInfo(props.game);
const profileData = ref({});
const scoresSelected = ref(props.settings?.scores ?? false);

onMounted(async () => {
  const data = await APIGetProfile(props.game, null, props.userId);
  profileData.value = data;
});

function saveSettings() {
  emit("saveMerge", {
    game: props.game,
    scores: scoresSelected.value,
  });
}
</script>

<template>
  <OverlayLayer
    v-if="selectedGame && profileData"
    transparent
    @overlay-click="emit('closeModal')"
  >
    <CardBox
      class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 text-white/90"
    >
      <div class="grid grid-cols-1 gap-3">
        <div class="flex gap-4 items-center">
          <GameIcon :path="selectedGame.icon" />
          <h1 class="text-2xl">
            {{ selectedGame.name }}
          </h1>
        </div>
        <div>
          <h2 class="font-light text-xl">
            {{ profileData.name }} -
            {{ profileData.stats?.total_plays ?? 0 }} Plays
          </h2>
        </div>
        <FormField
          label="Scores"
          help="Transfer all scores from this account to yours. This will not erase your current scores."
        >
          <FormCheckRadio
            v-model="scoresSelected"
            name="scores"
            :input-value="scoresSelected"
            type="switch"
          />
        </FormField>
        <!-- <FormField
          label="Profile Data"
          help="Update all data from this account to yours. (INCLUDING USERNAME!)"
        >
          <FormCheckRadio
            v-model="dataSelected"
            name="data"
            :input-value="dataSelected"
            type="switch"
          />
        </FormField> -->

        <div class="space-x-2 mt-6">
          <BaseButton color="success" label="Save" @click="saveSettings" />
        </div>
      </div>
    </CardBox>
  </OverlayLayer>
</template>
