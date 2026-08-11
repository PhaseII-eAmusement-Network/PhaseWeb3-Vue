<script setup>
import { PhCalendar, PhJoystick, PhTrendUp } from "@phosphor-icons/vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import GameTitleLine from "@/components/GameTitleLine.vue";
import { GameConstants, getGameInfo } from "@/constants";

defineProps({
  data: {
    type: Object,
  },
});

const gameInfo = getGameInfo(GameConstants.DDR);
</script>

<template>
  <div>
    <div>
      <SectionTitleLine
        :icon="PhTrendUp"
        color="text-emerald-300"
        title="Overall Stats"
        main
      />

      <div
        class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 mb-6"
      >
        <CardBoxWidget label="Yearly Plays" :number="100" />
        <CardBoxWidget label="Unique Games" :number="3" />
        <CardBoxWidget label="Top Game">DDR</CardBoxWidget>
        <CardBoxWidget label="Top Song">Din Don Dan</CardBoxWidget>
        <CardBoxWidget label="Yearly Records" :number="3" />
        <CardBoxWidget label="Yearly Attempts" :number="3" />
      </div>
    </div>

    <div>
      <SectionTitleLine
        :icon="PhCalendar"
        color="text-orange-300"
        title="Notable Days"
        main
      />

      <div
        class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 mb-6"
      >
        <CardBoxWidget label="Most Played Day">
          1/1/2026, with 30 plays
        </CardBoxWidget>
        <CardBoxWidget label="Most Games Day">
          1/1/2026, with 3 games
        </CardBoxWidget>
      </div>
    </div>

    <div>
      <SectionTitleLine
        :icon="PhCalendar"
        color="text-rose-300"
        title="Monthly Breakdown"
        main
      />

      <div
        class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 mb-6"
      >
        <CardBoxWidget label="Most Played Month">
          January, with 300 plays
        </CardBoxWidget>
      </div>
    </div>

    <div>
      <SectionTitleLine
        :icon="PhJoystick"
        color="text-cyan-300"
        title="Game Breakdown"
        main
      />

      <GameTitleLine :title="gameInfo.name" :path="gameInfo.icon" />

      <div
        class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 mb-6"
      >
        <CardBoxWidget label="Most Played Song"> Din Don Dan </CardBoxWidget>
        <CardBoxWidget label="Yearly Plays" :number="25" />
        <CardBoxWidget label="Yearly Records" :number="3" />
        <CardBoxWidget label="Yearly Attempts" :number="3" />
      </div>
    </div>

    <div>
      <SectionTitleLine
        :icon="PhJoystick"
        color="text-fuchsia-300"
        title="Location Statistics"
        main
      />

      <div
        class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 mb-6"
      >
        <CardBoxWidget label="Most Visited Arcade">
          Boss Battle Games
        </CardBoxWidget>
      </div>
    </div>
  </div>
</template>
