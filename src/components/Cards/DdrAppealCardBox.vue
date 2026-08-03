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

const router = useRouter();
const userProfile = ref(props.profile);
const version = ref(props.version);

const customizations = ref([]);
const isModified = ref(false);
const loading = ref(false);
const optionForm = ref({});

const APPEAL_ID = "customize.1_0";
const appealId = ref(APPEAL_ID);

loadCustomizations();
function loadCustomizations() {
  axios
    .get(`/data-sources/customizations/ddr/${version.value}/appeal.json`)
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

function getUrl(type) {
  const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
  let file = getNestedValue(optionForm.value, APPEAL_ID) ?? 1;
  if (file == 9000) file = 1;
  return `${ASSET_PATH}/customizations/ddr/${version.value}/${type}/${file}.avif`;
}

function updateValue(option, id) {
  setNestedValue(optionForm.value, option.id, id);
  isModified.value = true;
}

function revertCustomizations() {
  optionForm.value = {};
  setNestedValue(
    optionForm.value,
    APPEAL_ID,
    getNestedValue(userProfile.value, APPEAL_ID) ?? 1,
  );

  isModified.value = false;
}

// TODO: switch to spritesheet/actual font?
function getLetterUrl(type, file) {
  const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
  return `${ASSET_PATH}/font/ddr/${version.value}/${type}/${file}.png`;
}
const replacements = new Map([
  [" ", "blank"],
  ["&", "ampersand"],
  ["-", "hyphen"],
  ["?", "question"],
  ["!", "exclamation"],
  [".", "period"],
  ["$", "dollar"],
]);
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="Appeal Board Customization" class="mb-2" />
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

      <div
        class="flex flex-col items-center justify-center w-full max-w-111 justify-self-center"
      >
        <label class="block mb-2 text-center">
          Previewing:
          <strong class="font-bold">Appeal Board</strong>
        </label>

        <div class="relative w-full aspect-444/58">
          <img
            :src="getUrl('appeal_login')"
            class="absolute inset-0 w-full h-full object-contain"
          />

          <!-- area label + shadow -->
          <img
            :src="getLetterUrl('area', profile.area)"
            class="absolute object-right object-contain bottom-[14%] right-[1.75%] scale-80 z-10"
          />
          <img
            :src="getLetterUrl('area', profile.area)"
            class="absolute object-right object-contain bottom-[11%] right-[1.25%] scale-80 brightness-0"
          />

          <!-- dancer name -->
          <div
            class="relative h-full"
            :style="{
              marginLeft:
                (getNestedValue(optionForm, appealId) ?? 0) >= 100000
                  ? '30.25%'
                  : '3.6%',
            }"
          >
            <div
              v-for="layer in [
                'bottom-[18%] left-[0.7%] brightness-0',
                'bottom-[20.75%] left-[0.3%] z-10',
              ]"
              :class="[
                'w-full absolute flex items-center justify-start h-[33.5%]',
                layer,
              ]"
            >
              <img
                v-for="character of profile.username.split('')"
                class="object-contain h-full ml-[-0.175%]"
                :src="
                  getLetterUrl(
                    'entry',
                    replacements.get(character) ?? character.toLowerCase(),
                  )
                "
              />
            </div>
          </div>
        </div>

        <div class="relative w-full aspect-444/200 mt-1">
          <img
            :src="getUrl('appeal')"
            class="absolute inset-0 w-full h-full object-contain"
          />

          <!-- dancer name -->
          <div
            class="w-full h-[28%] absolute flex items-center justify-center bottom-2 left-0"
          >
            <img
              v-for="character of profile.username.split('')"
              class="object-contain h-[65.5%]"
              :src="
                getLetterUrl(
                  'result',
                  replacements.get(character) ?? character.toLowerCase(),
                )
              "
            />
          </div>
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
