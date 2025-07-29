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
import UserQpro from "@/components/UserQpro.vue";
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
const userProfile = ref(JSON.parse(JSON.stringify(props.profile)));
const version = ref(props.version);
const QproKey = ref(0);

const newQpro = reactive(
  userProfile.value?.qpro ?? {
    head: 0,
    hair: 0,
    face: 0,
    body: 0,
    hand: 0,
    bg: 0,
  },
);
const QproSettings = ref([]);
const isModified = ref(false);
const loading = ref(false);

watch(
  () => props.version,
  () => {
    userProfile.value = JSON.parse(JSON.stringify(props.profile));
    loadQproSettings();
    newQpro.value = userProfile.value?.qpro;
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
  newQpro,
  () => {
    QproKey.value++;
    isModified.value = !qproEquals(newQpro, props.profile.qpro);
  },
  { deep: true },
);

loadQproSettings();
function loadQproSettings() {
  axios
    .get(`/data-sources/qpro/${version.value}.json`)
    .then((r) => {
      if (r.data) {
        QproSettings.value = r.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function qproEquals(qpro1, qpro2) {
  return JSON.stringify(qpro1) === JSON.stringify(qpro2);
}

async function updateProfile() {
  loading.value = true;
  var newProfile = JSON.parse(JSON.stringify(props.profile));

  newProfile.qpro = newQpro;
  const profileStatus = await APIUpdateProfile(
    GameConstants.IIDX,
    props.version,
    { qpro: newQpro },
  );
  if (profileStatus.status != "error") {
    router.go();
  }
}

function revert() {
  Object.assign(
    newQpro,
    JSON.parse(JSON.stringify(props.profile)).qpro ?? {
      head: 0,
      hair: 0,
      face: 0,
      body: 0,
      hand: 0,
      bg: 0,
    },
  );
  isModified.value = false;
}
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="QPro" class="mb-2" />
    <div class="grid md:grid-cols-2 space-y-6 align-center">
      <form>
        <FormField
          v-for="option of QproSettings"
          :key="option.id"
          :label="option.name"
          :help="option.help"
        >
          <FormControl v-model="newQpro[option.id]" :options="option.options" />
        </FormField>
      </form>
      <div class="place-self-center">
        <UserQpro
          :key="QproKey"
          :version="version"
          :profile="{ qpro: newQpro }"
          style="scale: 1.6"
          class="my-16 md:my-0 md:mb-8"
        />
      </div>
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
          :path="mdiLoading"
          color="text-yellow-500"
          class="animate animate-spin"
        />
      </div>
    </template>
  </CardBox>
</template>
