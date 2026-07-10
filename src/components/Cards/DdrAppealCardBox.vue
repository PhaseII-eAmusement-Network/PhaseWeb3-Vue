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

loadCustomizations();
function loadCustomizations() {
  axios
    .get(`/data-sources/ddr/customizations/appeal_${version.value}.json`)
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
  const file = getNestedValue(optionForm.value, APPEAL_ID) ?? 1;
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
      <div class="place-self-center">
        <label class="block mb-2 text-center">
          Previewing:
          <strong class="font-bold">Appeal Board</strong>
        </label>
        <img
          :src="getUrl('appeal_login')"
          class="object-contain"
          :width="444"
          :height="200"
        />
        <img
          :src="getUrl('appeal')"
          class="pt-4 object-contain"
          :width="444"
          :height="58"
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
