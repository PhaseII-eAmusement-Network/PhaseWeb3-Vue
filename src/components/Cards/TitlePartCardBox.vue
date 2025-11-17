<script setup>
import axios from "axios";
import { watch, ref } from "vue";
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

const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
  version: {
    type: Number,
    default: 6,
  },
});

const router = useRouter();
const userProfile = ref(JSON.parse(JSON.stringify(props.profile)));
const version = ref(props.version);
const TitleKey = ref(0);

const newTitle = ref(userProfile.value?.title ?? 0);
const TitleSettings = ref([]);
const isModified = ref(false);
const loading = ref(false);

watch(
  () => props.version,
  () => {
    userProfile.value = JSON.parse(JSON.stringify(props.profile));
    loadTitleSettings();
    newTitle.value = userProfile.value?.title;
    isModified.value = false;
  },
);

watch(
  () => props.version,
  () => {
    version.value = props.version;
  },
);

watch(
  newTitle,
  () => {
    TitleKey.value++;
    isModified.value = !dataEquals(newTitle.value, props.profile.akaname);
  },
  { deep: true },
);

loadTitleSettings();
function loadTitleSettings() {
  axios
    .get(`/data-sources/jubeat-title/${version.value}.json`)
    .then((r) => {
      if (r.data) {
        TitleSettings.value = r.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function dataEquals(data1, data2) {
  return JSON.stringify({ data1 }) === JSON.stringify({ data2 });
}

async function updateProfile() {
  loading.value = true;
  var newProfile = JSON.parse(JSON.stringify(props.profile));

  newProfile.title = newTitle.value;
  const partId = TitleSettings.value.find(
    (item) => item.id === newTitle.value,
  )?.part;
  newProfile.parts = partId;
  const profileStatus = await APIUpdateProfile(
    GameConstants.JUBEAT,
    props.version,
    { title: newTitle.value, parts: partId },
  );
  if (profileStatus.status != "error") {
    router.go();
  }
}

function revert() {
  newTitle.value = userProfile.value?.title ?? 0;
  isModified.value = false;
}
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="Title / Title Part" class="mb-2" />
    <div class="grid md:grid-cols-2 space-y-6 align-center">
      <form>
        <FormField label="Title" help="Sets your profile's title">
          <FormControl v-model="newTitle" :options="TitleSettings" />
        </FormField>
      </form>
    </div>

    <template #footer>
      <div class="space-x-2 pb-4">
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
          @click="revert()"
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
