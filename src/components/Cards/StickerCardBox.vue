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
import UserSticker from "@/components/UserSticker.vue";
import PillTag from "@/components/PillTag.vue";

import { APIUpdateProfile } from "@/stores/api/profile";

const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
  game: {
    type: String,
    default: null,
  },
  version: {
    type: Number,
    default: 9,
  },
});

const router = useRouter();
const userProfile = ref(props.profile);
const version = ref(props.version);
const emblemKey = ref(0);

const newTrbitem = reactive(
  JSON.parse(JSON.stringify(userProfile.value?.trbitem ?? {}))
);
const trbitemSettings = ref([]);
const isModified = ref(false);
const loading = ref(false);

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    version.value = props.version;
    loadTrbitemSettings();
    newTrbitem.value = JSON.parse(
      JSON.stringify(userProfile.value?.trbitem ?? {})
    );
    isModified.value = false;
  }
);

watch(
  newTrbitem,
  () => {
    emblemKey.value++;
    isModified.value = !emblemEquals(
      newTrbitem,
      userProfile.value?.trbitem ?? {}
    );
  },
  { deep: true }
);

loadTrbitemSettings();
function loadTrbitemSettings() {
  axios
    .get(`/data-sources/trbitem/${version.value}.json`)
    .then((r) => {
      if (r.data) {
        trbitemSettings.value = r.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function emblemEquals(emblem1, emblem2) {
  return JSON.stringify(emblem1) === JSON.stringify(emblem2);
}

async function updateProfile() {
  loading.value = true;
  var newProfile = JSON.parse(JSON.stringify(props.profile));
  if (!newProfile.last) {
    newProfile.last = {};
  }
  newProfile.trbitem = newTrbitem;
  const profileStatus = await APIUpdateProfile(
    props.game,
    props.version,
    newProfile
  );
  if (profileStatus.status != "error") {
    router.go();
  }
}

function revert() {
  Object.assign(
    newTrbitem,
    JSON.parse(JSON.stringify(userProfile.value?.trbitem ?? {}))
  );
  isModified.value = false;
}
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="Sticker Board" class="mb-2" />
    <div class="grid md:grid-cols-2 space-y-6 align-center">
      <form>
        <FormField key="base" label="Base">
          <FormControl
            v-model="newTrbitem.base"
            :options="trbitemSettings.base"
          />
        </FormField>
      </form>
      <div class="place-self-center">
        <UserSticker
          :key="emblemKey"
          :version="version"
          :profile="{ trbitem: newTrbitem }"
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
          @click="revert()"
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
