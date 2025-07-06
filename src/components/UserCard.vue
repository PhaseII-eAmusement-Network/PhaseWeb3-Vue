<script setup>
import { ref } from "vue";
import { useMainStore } from "@/stores/main";
import { RoleConstants } from "@/constants/discordRoles";
import {
  mdiSecurity,
  mdiTestTube,
  mdiAccountStar,
  mdiAccountOff,
  mdiFlowerPoppy,
  mdiSharkFinOutline,
  mdiHandCoinOutline,
  mdiAccountTieHat,
  mdiAccountTie,
  mdiHeartMultipleOutline,
  mdiCheckDecagramOutline,
  mdiLinkBoxVariantOutline,
  mdiAccountCheck,
} from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";
const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;

const props = defineProps({
  overrideProfile: {
    type: Object,
    required: false,
    default: null,
  },
  useSmall: {
    type: Boolean,
    required: false,
    default: false,
  },
  evenSmaller: {
    type: Boolean,
    required: false,
    default: false,
  },
});

import { GetRandomMessage } from "@/constants";

const cardData = ref({
  userId: null,
  userName: "",
  userAvatar: "",
  userAdmin: false,
  userPublic: false,
  discordRoles: null,
  userCustomize: null,
});

if (props.overrideProfile) {
  const overrideProfile = props.overrideProfile;
  cardData.value = {
    userId: overrideProfile.id,
    userName: overrideProfile.name,
    userAvatar: overrideProfile.avatar,
    userAdmin: overrideProfile.admin,
    userPublic: overrideProfile.public,
    discordRoles: overrideProfile.discordRoles,
    userCustomize: overrideProfile.customize,
  };
} else {
  const mainStore = useMainStore();
  cardData.value = {
    userId: mainStore.userId,
    userName: mainStore.userName,
    userAvatar: mainStore.userAvatar,
    userAdmin: mainStore.userAdmin,
    userPublic: mainStore.userPublic,
    discordRoles: mainStore.discordRoles,
    userCustomize: mainStore.userCustomize,
  };
}

const greeting = GetRandomMessage();

function getCardStyle() {
  return `
    background-image: url('${ASSET_PATH}/card/${
    cardData.value.userCustomize?.card ?? "time"
  }.webp');
    background-size: cover;
    background-repeat: no-repeat;
  `;
}
</script>

<template>
  <CardBox :style="getCardStyle()">
    <BaseLevel
      type="justify-around lg:justify-center md:space-x-4 lg:space-x-0"
      class="bg-white dark:bg-slate-900/90 rounded-2xl p-3"
    >
      <UserAvatar
        class="w-28 md:w-30 lg:w-[128px] lg:mx-12 lg:m-2"
        :username="cardData.userName"
        :avatar="cardData.userAvatar"
        :border="cardData.userCustomize?.border ?? null"
      />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="space-y-2 md:space-y-0">
          <h1
            v-if="!useSmall && !cardData.userCustomize?.disableGreeting"
            class="text-2xl md:text-xl lg:text-2xl"
          >
            {{ greeting.header[0] }}<b>{{ cardData.userName }} </b
            >{{ greeting.header[1] }}
          </h1>
          <h1
            v-if="useSmall || cardData.userCustomize?.disableGreeting"
            class="text-3xl md:text-4xl"
          >
            <b>{{ cardData.userName }}</b>
          </h1>
        </div>
        <div
          v-if="!evenSmaller"
          class="flex flex-wrap gap-2 md:place-content-start place-content-center px-5 sm:px-0 py-2 sm:py-0 md:max-w-[400px]"
        >
          <PillTag
            v-if="cardData.userAdmin"
            label="System Admin"
            color="danger"
            :icon="mdiSecurity"
            small
          />
          <PillTag
            v-if="cardData.userId < 300"
            label="Veteran"
            color="success"
            :icon="mdiAccountStar"
            small
          />
          <PillTag
            v-if="!cardData.userPublic"
            label="Private Profile"
            color="info"
            :icon="mdiAccountOff"
            small
          />
          <PillTag
            v-if="cardData.userPublic"
            label="Public Profile"
            color="success"
            :icon="mdiAccountCheck"
            small
          />
          <PillTag
            v-if="cardData.discordRoles?.includes(RoleConstants.PLAYER)"
            label="Verified"
            color="success"
            :icon="mdiCheckDecagramOutline"
            small
          />
          <PillTag
            v-if="cardData.discordRoles?.includes(RoleConstants.JACKASS)"
            label="Jackass"
            color="slight_danger"
            :icon="mdiHeartMultipleOutline"
            small
          />
          <PillTag
            v-if="cardData.discordRoles?.includes(RoleConstants.DEVELOPER)"
            label="Developer"
            color="success"
            :icon="mdiAccountTie"
            small
          />
          <PillTag
            v-if="cardData.discordRoles?.includes(RoleConstants.MODERATOR)"
            label="Moderator"
            color="slight_danger"
            :icon="mdiAccountTieHat"
            small
          />
          <PillTag
            v-if="cardData.discordRoles?.includes(RoleConstants.BETA_TESTER)"
            label="Beta Tester"
            color="warning"
            :icon="mdiTestTube"
            small
          />
          <PillTag
            v-if="cardData.discordRoles?.includes(RoleConstants.DONOR)"
            label="Donor"
            color="gold"
            :icon="mdiHandCoinOutline"
            small
          />
          <PillTag
            v-if="cardData.discordRoles?.includes(RoleConstants.BLAHAJ)"
            label="Blåhaj"
            color="info"
            :icon="mdiSharkFinOutline"
            small
          />
          <PillTag
            v-if="cardData.discordRoles?.includes(RoleConstants.RHYTHM_RIOT)"
            label="Rhythm Riot"
            color="sakura"
            :icon="mdiFlowerPoppy"
            small
          />
          <PillTag
            v-if="cardData.userCustomize?.shrimpLinks"
            label="Shrimp Links"
            color="sakura"
            :icon="mdiLinkBoxVariantOutline"
            small
          />
          <!-- <PillTag
            label="Public Profile"
            color="success"
            :icon="mdiAccountCheck"
          /> -->
        </div>
      </div>
      <div
        v-if="!useSmall && !cardData.userCustomize.disableGreeting"
        class="text-center md:text-right"
      >
        <p class="text-xl md:text-lg lg:text-2lg">{{ greeting.comment }}</p>
        <p class="text-xs italic">Greeting by: {{ greeting.author }}</p>
      </div>
    </BaseLevel>
  </CardBox>
</template>
