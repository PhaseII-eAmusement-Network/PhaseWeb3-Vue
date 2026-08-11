<script setup>
import { ref, computed } from "vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import StoryCard from "@/components/Rerun/StoryCard.vue";
import IntroStory from "@/components/Rerun/IntroStory.vue";
import GeneralStory from "@/components/Rerun/GeneralStory.vue";
import DatesStory from "@/components/Rerun/DatesStory.vue";
import GameIntroStory from "@/components/Rerun/GameIntroStory.vue";
import GameStory from "@/components/Rerun/GameStory.vue";
import FinalStory from "@/components/Rerun/FinalStory.vue";
import { GameConstants } from "@/constants";

const ReRunYear = 2049;
const current = ref(0);
const profiles = [
  {
    game: GameConstants.DDR,
    personalRank: 1,
    username: "TRMAZI",
    data: {
      new: true,
      total_plays: 100,
      attempts: 100,
      records: 100,
    },
  },
  {
    game: GameConstants.DDROMNI,
    personalRank: 2,
    username: "TRMAZI",
    data: {
      total_plays: 100,
      attempts: 100,
      records: 100,
    },
  },
  {
    game: GameConstants.IIDX,
    personalRank: 3,
    username: "TRMAZI",
    data: {
      total_plays: 100,
      attempts: 100,
      records: 100,
    },
  },
  {
    game: GameConstants.SDVX,
    personalRank: 4,
    username: "TRMAZI",
    data: {
      total_plays: 100,
      attempts: 100,
      records: 100,
    },
  },
  {
    game: GameConstants.TSUMTSUM,
    personalRank: 5,
    username: "TRMAZI",
    data: {
      total_plays: 100,
      attempts: 100,
      records: 100,
    },
  },
  {
    game: GameConstants.REFLEC_BEAT,
    personalRank: 6,
    username: "TRMAZI",
    data: {
      total_plays: 100,
      attempts: 100,
      records: 100,
    },
  },
];

const baseData = {
  year: ReRunYear,
};

var cards = [
  { card: IntroStory },
  { card: GeneralStory },
  { card: DatesStory },
  {
    card: GameIntroStory,
    data: {
      ...baseData,
      profiles: profiles,
    },
  },
];
for (const profile of profiles) {
  cards.push({
    card: GameStory,
    data: {
      ...baseData,
      profile,
    },
  });
}
cards.push({ card: FinalStory });

const CurrentStory = computed(() => cards[current.value].card);
const CurrentData = computed(() => cards[current.value].data ?? baseData);
function next() {
  if (current.value < cards.length - 1) current.value++;
}
function previous() {
  if (current.value > 0) current.value--;
}
</script>

<template>
  <LayoutGuest>
    <div class="flex md:min-h-screen md:items-center md:justify-center md:p-6">
      <StoryCard
        :current="current"
        :total="cards.length"
        @next="next"
        @previous="previous"
      >
        <component :is="CurrentStory" :key="current" :data="CurrentData" />
      </StoryCard>
    </div>
  </LayoutGuest>
</template>
