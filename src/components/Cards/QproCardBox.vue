<script setup>
import { watch, ref } from "vue";
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

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
  }
);

watch(
  () => props.version,
  () => {
    version.value = props.version;
  }
);

const valid_options = ["body", "head", "hair", "face", "hand"];
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="QPro" class="mb-2" />
    <div class="grid md:grid-cols-2 space-y-6 align-center">
      <div>
        <FormField
          v-for="option of valid_options"
          :key="option"
          :label="option"
        >
          <FormControl
            :v-model="profile.qpro[option]"
            :model-value="profile.qpro[option]"
          />
        </FormField>
      </div>
      <div class="place-self-center">
        <UserQpro
          :version="version"
          :profile="profile"
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
