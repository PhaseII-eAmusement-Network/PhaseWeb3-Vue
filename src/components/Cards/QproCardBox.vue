<script setup>
import axios from "axios";
import { watch, ref, reactive } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import UserQpro from "@/components/UserQpro.vue";
import PillTag from "@/components/PillTag.vue";

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

const userProfile = ref(props.profile);
const version = ref(props.version);
const QproKey = ref(0);

const newQpro = reactive(
  userProfile.value?.qpro ?? { head: 0, hair: 0, face: 0, body: 0, hand: 0 }
);
const QproSettings = ref([]);

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    loadQproSettings();
    newQpro.value = userProfile.value?.qpro;
  }
);

watch(
  () => props.version,
  () => {
    version.value = props.version;
  }
);

watch(
  newQpro,
  () => {
    QproKey.value++;
  },
  { deep: true }
);

loadQproSettings();
function loadQproSettings() {
  axios
    .get(`https://web3.phaseii.network/gameassets/qpro/${version.value}.json`)
    .then((r) => {
      if (r.data) {
        QproSettings.value = r.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="QPro" class="mb-2" />
    <div class="grid md:grid-cols-2 space-y-6 align-center">
      <div>
        <FormField
          v-for="option of QproSettings"
          :key="option.id"
          :label="option.name"
          :help="option.help"
        >
          <FormControl v-model="newQpro[option.id]" :options="option.options" />
        </FormField>
      </div>
      <div class="place-self-center">
        <UserQpro
          :key="QproKey"
          :version="version"
          :profile="{ qpro: newQpro }"
          style="scale: 1.9"
          class="my-16 mb-10"
        />
      </div>
    </div>

    <template #footer>
      <div class="space-x-2">
        <BaseButton type="submit" color="success" label="Save" />
        <BaseButton type="submit" color="danger" label="Revert" />
      </div>
    </template>
  </CardBox>
</template>
