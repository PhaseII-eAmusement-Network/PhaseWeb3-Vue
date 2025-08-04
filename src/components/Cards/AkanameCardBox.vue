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
const AkanameKey = ref(0);

const newAkaname = ref(userProfile.value?.akaname ?? 0);
const AkanameSettings = ref([]);
const isModified = ref(false);
const loading = ref(false);

watch(
  () => props.version,
  () => {
    userProfile.value = JSON.parse(JSON.stringify(props.profile));
    loadAkanameSettings();
    newAkaname.value = userProfile.value?.akaname;
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
  newAkaname,
  () => {
    AkanameKey.value++;
    isModified.value = !akanameEquals(newAkaname.value, props.profile.akaname);
  },
  { deep: true },
);

loadAkanameSettings();
function loadAkanameSettings() {
  axios
    .get(`/data-sources/sdvx/akaname/${version.value}.json`)
    .then((r) => {
      if (r.data) {
        AkanameSettings.value = r.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function akanameEquals(akaname1, akaname2) {
  return JSON.stringify({ akaname1 }) === JSON.stringify({ akaname2 });
}

async function updateProfile() {
  loading.value = true;
  var newProfile = JSON.parse(JSON.stringify(props.profile));

  newProfile.akaname = newAkaname.value;
  const profileStatus = await APIUpdateProfile(
    GameConstants.SDVX,
    props.version,
    { akaname: newAkaname.value },
  );
  if (profileStatus.status != "error") {
    router.go();
  }
}

function revert() {
  newAkaname.value = userProfile.value?.akaname ?? 0;
  isModified.value = false;
}
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="Akaname" class="mb-2" />
    <div class="grid md:grid-cols-2 space-y-6 align-center">
      <form>
        <FormField label="Akaname" help="Sets your profile's subtitle">
          <FormControl v-model="newAkaname" :options="AkanameSettings" />
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
