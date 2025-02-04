<script setup>
import axios from "axios";
import { watch, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiLoading } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import UserEmblem from "@/components/UserEmblem.vue";
import PillTag from "@/components/PillTag.vue";

import { GameConstants } from "@/constants";
import { APIUpdateProfile } from "@/stores/api/profile";

const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
  version: {
    type: Number,
    default: 14,
  },
});

const router = useRouter();
const userProfile = ref(props.profile);
const version = ref(props.version);
const emblemKey = ref(0);

const newEmblem = reactive(formatEmblem(userProfile.value?.last?.emblem));
const emblemSettings = ref([]);
const isModified = ref(false);
const loading = ref(false);

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    version.value = props.version;
    loadEmblemSettings();
    newEmblem.value = formatEmblem(userProfile.value.last?.emblem);
    isModified.value = false;
  }
);

watch(
  newEmblem,
  () => {
    emblemKey.value++;
    isModified.value = !emblemEquals(newEmblem, userProfile.value.last?.emblem);
  },
  { deep: true }
);

loadEmblemSettings();
function loadEmblemSettings() {
  const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
  axios
    .get(`${ASSET_PATH}/emblems/${version.value}.json`)
    .then((r) => {
      if (r.data) {
        emblemSettings.value = r.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function formatEmblem(emblem) {
  if (emblem) {
    return {
      background: emblem[0],
      main: emblem[1],
      ornament: emblem[2],
      effect: emblem[3],
      speech_bubble: emblem[4],
    };
  } else {
    return {
      background: 0,
      main: 0,
      ornament: 0,
      effect: 0,
      speech_bubble: 0,
    };
  }
}

function encodeEmblem(emblem) {
  if (emblem) {
    return [
      emblem.background,
      emblem.main,
      emblem.ornament,
      emblem.effect,
      emblem.speech_bubble,
    ];
  } else {
    return [0, 0, 0, 0, 0];
  }
}

function emblemEquals(emblem1, emblem2) {
  return JSON.stringify(emblem1) === JSON.stringify(formatEmblem(emblem2));
}

async function updateProfile() {
  loading.value = true;
  var newProfile = JSON.parse(JSON.stringify(props.profile));
  if (!newProfile.last) {
    newProfile.last = {};
  }
  newProfile.last.emblem = encodeEmblem(newEmblem);
  const profileStatus = await APIUpdateProfile(
    GameConstants.JUBEAT,
    props.version,
    newProfile
  );
  if (profileStatus.status != "error") {
    router.go();
  }
}

function revertEmblem() {
  Object.assign(newEmblem, formatEmblem(userProfile.value.last?.emblem));
  isModified.value = false;
}
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="Emblem" class="mb-2" />
    <div class="grid md:grid-cols-2 space-y-6 align-center">
      <form>
        <FormField
          v-for="option of emblemSettings"
          :key="option.id"
          :label="option.name"
          :help="option.help"
        >
          <FormControl
            v-model="newEmblem[option.id]"
            :options="option.options"
          />
        </FormField>
      </form>
      <div class="place-self-center">
        <UserEmblem
          :key="emblemKey"
          :version="version"
          :profile="{ last: { emblem: encodeEmblem(newEmblem) } }"
          :size="300"
        />
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
          @click="revertEmblem()"
        />
        <BaseIcon
          v-if="loading"
          :path="mdiLoading"
          color="text-yellow-500"
          class="animate animate-spin"
        />
      </div>
    </template>
  </CardBox>
</template>
