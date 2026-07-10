<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { PhSpinnerBall } from "@phosphor-icons/vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";

import { GameConstants } from "@/constants";
import { APIUpdateProfile } from "@/stores/api/profile";
import { getNestedValue, setNestedValue } from "@/constants/values";

const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
  version: {
    type: Number,
    default: 20,
  },
});

const IDS = {
  character_left: "customize.2_1",
  character_right: "customize.2_2",
  background: "customize.3_1",
  background_music: "customize.3_2",
  lane_single: "customize.4_1",
  lane_double: "customize.5_1",
  lane_cover_single: "customize.6_1",
  lane_cover_double: "customize.7_1",
};
const INVERSE_IDS = Object.fromEntries(
  Object.entries(IDS).map(([key, value]) => [value, key]),
);
const PREVIEW_SWITCH = {
  character_left: () => setPreviewType("Song Select"),
  character_right: () => setPreviewType("Song Select"),
  background: () => setPreviewType("Song Select"),
  background_music: () => setPreviewType("Ingame"),
  lane_single: () => setPreviewType("Ingame", "Singles"),
  lane_double: () => setPreviewType("Ingame", "Doubles"),
  lane_cover_single: () => setPreviewType("Ingame", "Singles"),
  lane_cover_double: () => setPreviewType("Ingame", "Doubles Cover"),
};

const router = useRouter();
const userProfile = ref(props.profile);
const version = ref(props.version);

const customizations = ref([]);
const isModified = ref(false);
const loading = ref(false);
const optionForm = ref({});

const previewType = ref("");
const ingameType = ref("");

loadCustomizations();
function loadCustomizations() {
  axios
    .get(`/data-sources/customizations/ddr/${version.value}/gameplay.json`)
    .then((r) => {
      if (r.data) {
        customizations.value = r.data;
        revertCustomizations();
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function updateProfile() {
  loading.value = true;
  const profileStatus = await APIUpdateProfile(
    GameConstants.DDR,
    props.version,
    optionForm.value,
  );
  if (profileStatus.status != "error") {
    router.go();
  }
}

function getUrl(type, defaultFile = 1) {
  const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
  const extension = type.includes("background") ? "mp4" : "avif";

  let typePath = type;
  if (type == "background_music") typePath = "background";

  const file = getNestedValue(optionForm.value, IDS[type]) ?? defaultFile;
  return `${ASSET_PATH}/customizations/ddr/${version.value}/${typePath}/${file}.${extension}`;
}

function setPreviewType(type, laneType) {
  previewType.value = type;

  if (type === "Song Select") {
    ingameType.value = "";
  } else if (type === "Ingame") {
    ingameType.value = laneType || ingameType.value || "Singles";
  }
}

function updateValue(option, id) {
  setNestedValue(optionForm.value, option.id, id);
  PREVIEW_SWITCH[INVERSE_IDS[option.id]]();
  isModified.value = true;
}

function revertCustomizations() {
  optionForm.value = {};
  for (const item of customizations.value) {
    let defaultValue = 1;
    if (item.id == IDS.character_right) defaultValue = 2; // character right default (RAGE)

    setNestedValue(
      optionForm.value,
      item.id,
      getNestedValue(userProfile.value, item.id) ?? defaultValue,
    );
  }

  PREVIEW_SWITCH.background();
  isModified.value = false;
}

function getBaseFile(file) {
  const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;
  return `${ASSET_PATH}/games/ddr/${file}`;
}
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="Gameplay Customization" class="mb-2" />
    <div class="grid md:grid-cols-2 space-y-6 space-x-4 align-center">
      <form>
        <FormField
          v-for="option of customizations"
          :key="option.id"
          :label="option.name"
          :help="option.help"
        >
          <FormControl
            :model-value="getNestedValue(optionForm, option.id) ?? 1"
            :options="option.options"
            :selected="getNestedValue(userProfile, option.id) ?? 1"
            @update:model-value="
              (value) => updateValue(option, Number(value) ?? 1)
            "
          />
        </FormField>
      </form>
      <div class="place-self-center">
        <label class="block mb-2 text-center">
          Previewing:
          <strong class="font-bold">{{ previewType }} {{ ingameType }}</strong>
        </label>
        <div class="relative overflow-hidden aspect-video">
          <!-- background -->
          <video
            :src="
              previewType == 'Ingame'
                ? getUrl('background_music')
                : getUrl('background')
            "
            :width="1280"
            :height="720"
            loop
            autoplay
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            muted
          />

          <!-- characters -->
          <img
            v-if="previewType === 'Song Select'"
            :src="getUrl('character_left')"
            class="absolute w-[50%] left-0 bottom-0"
          />
          <img
            v-if="previewType === 'Song Select'"
            :src="getUrl('character_right', 2)"
            class="absolute w-[50%] right-0 bottom-0"
          />

          <!-- singles -->
          <img
            v-if="previewType === 'Ingame' && ingameType === 'Singles'"
            :src="getUrl('lane_single')"
            class="absolute h-full left-[5%] bottom-0"
          />
          <img
            v-if="previewType === 'Ingame' && ingameType === 'Singles'"
            :src="getUrl('lane_cover_single')"
            class="absolute h-full scale-x-98 right-[4.5%] bottom-0"
          />

          <!-- doubles -->
          <img
            v-if="previewType === 'Ingame' && ingameType === 'Doubles'"
            :src="getUrl('lane_double')"
            class="absolute h-full bottom-0 w-full object-contain"
          />
          <img
            v-if="previewType === 'Ingame' && ingameType === 'Doubles Cover'"
            :src="getUrl('lane_cover_double')"
            class="absolute h-full w-full scale-x-96 object-contain bottom-0"
          />

          <!-- preview overlays -->
          <img
            v-if="previewType === 'Ingame' && ingameType === 'Singles'"
            :src="getBaseFile('preview_overlay/ingame_singles.png')"
            class="absolute h-full left-0 bottom-0"
          />
          <img
            v-if="previewType === 'Ingame' && ingameType === 'Doubles'"
            :src="getBaseFile('preview_overlay/ingame_doubles.png')"
            class="absolute h-full left-0 bottom-0"
          />
          <img
            v-if="previewType === 'Song Select'"
            :src="getBaseFile('preview_overlay/song_select.png')"
            class="absolute h-full left-0 bottom-0"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="space-x-2">
        <BaseButton
          v-if="isModified"
          color="success"
          label="Save"
          @click="updateProfile()"
        />
        <BaseButton
          v-if="isModified"
          color="danger"
          label="Revert"
          @click="revertCustomizations()"
        />
        <BaseIcon
          v-if="loading"
          :icon="PhSpinnerBall"
          color="text-yellow-500"
          class="animate animate-spin"
        />
      </div>
    </template>
  </CardBox>
</template>
