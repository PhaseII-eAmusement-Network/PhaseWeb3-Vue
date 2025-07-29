<script setup>
import axios from "axios";
import { watch, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiLoading, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormSlider from "@/components/FormSlider.vue";
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
  JSON.parse(JSON.stringify(userProfile.value?.trbitem ?? {})),
);
const trbitemSettings = ref([]);
const isModified = ref(false);
const loading = ref(false);
const collapsedStickers = ref(
  Array.isArray(newTrbitem.stickers) ? newTrbitem.stickers.map(() => true) : [],
);

if (!newTrbitem.stickers) {
  newTrbitem.stickers = [];
}

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    version.value = props.version;
    loadTrbitemSettings();
    const newProfileData = JSON.parse(
      JSON.stringify(userProfile.value?.trbitem ?? {}),
    );
    Object.assign(newTrbitem, newProfileData);
    if (!newTrbitem.stickers) {
      newTrbitem.stickers = [];
    }

    // Set all stickers to collapsed when version changes
    collapsedStickers.value = Array.isArray(newTrbitem.stickers)
      ? newTrbitem.stickers.map(() => true)
      : [];
    isModified.value = false;
  },
);

watch(
  newTrbitem,
  () => {
    emblemKey.value++;
    isModified.value = !emblemEquals(
      newTrbitem,
      userProfile.value?.trbitem ?? {},
    );
  },
  { deep: true },
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
    newProfile,
  );
  if (profileStatus.status != "error") {
    router.go();
  }
}

function revert() {
  Object.assign(
    newTrbitem,
    JSON.parse(JSON.stringify(userProfile.value?.trbitem ?? {})),
  );
  isModified.value = false;
}

function addSticker() {
  newTrbitem.stickers.push({
    sticker_id: 24,
    sticker_pos_x: 160,
    sticker_pos_y: 277,
    sticker_scale_x: 1,
    sticker_scale_y: 1,
    sticker_rotate: 0,
  });
  collapsedStickers.value.push(false);
  isModified.value = true;
}

function removeSticker(index) {
  newTrbitem.stickers.splice(index, 1);
  collapsedStickers.value.splice(index, 1);
  isModified.value = true;
}

function toggleStickerCollapse(index) {
  collapsedStickers.value[index] = !collapsedStickers.value[index];
}
</script>

<template>
  <CardBox class="mt-6">
    <PillTag color="info" label="Sticker Board" class="mb-2" />
    <div class="grid md:grid-cols-2 xl:grid-cols-3 space-y-6 align-center">
      <div class="col-span-1 xl:col-span-2">
        <FormField key="base" label="Base">
          <FormControl
            v-model="newTrbitem.base"
            :options="trbitemSettings.base"
          />
        </FormField>

        <div class="space-y-4">
          <CardBox
            v-for="(sticker, index) in newTrbitem.stickers ?? []"
            :key="sticker.sticker_id"
            color-prop="bg-slate-600 dark:bg-slate-800"
          >
            <div class="flex justify-between items-center">
              <span class="text-lg">Sticker {{ index + 1 }}</span>
              <BaseButton
                :icon="collapsedStickers[index] ? mdiChevronDown : mdiChevronUp"
                color="info"
                @click="toggleStickerCollapse(index)"
              />
            </div>
            <div v-if="!collapsedStickers[index]" class="p-2">
              <div class="w-full grid grid-cols-2 lg:grid-cols-5 gap-2 pt-2">
                <FormField label="Sticker" class="col-span-2 lg:col-span-5">
                  <FormControl
                    v-model="sticker.sticker_id"
                    :options="trbitemSettings.sticker"
                  />
                </FormField>

                <FormField label="Position X">
                  <FormSlider
                    v-model="sticker.sticker_pos_x"
                    name="sticker_pos_x"
                    :min="0"
                    :max="320"
                    :step="1"
                  />
                </FormField>

                <FormField label="Position Y">
                  <FormSlider
                    v-model="sticker.sticker_pos_y"
                    name="sticker_pos_y"
                    :min="0"
                    :max="554"
                    :step="1"
                  />
                </FormField>

                <FormField label="Scale">
                  <FormSlider
                    v-model="sticker.sticker_scale_x"
                    name="sticker_scale_x"
                    :min="0.5"
                    :max="2"
                    :step="0.01"
                  />
                </FormField>

                <FormField label="Rotation">
                  <FormSlider
                    v-model="sticker.sticker_rotate"
                    name="sticker_rotate"
                    :min="-180"
                    :max="180"
                    :step="1"
                  />
                </FormField>
              </div>
              <BaseButton
                color="danger"
                label="Remove"
                @click="removeSticker(index)"
              />
            </div>
          </CardBox>
          <BaseButton color="info" label="Add Sticker" @click="addSticker()" />
        </div>
      </div>
      <div class="place-self-center">
        <UserSticker
          :key="emblemKey"
          :version="version"
          :profile="{
            trbitem: {
              ...newTrbitem,
            },
          }"
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
