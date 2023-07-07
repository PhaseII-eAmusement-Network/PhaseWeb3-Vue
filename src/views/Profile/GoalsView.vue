<script setup>
import { mdiFlagCheckered, mdiFlagOff, mdiFlagOutline } from "@mdi/js";
import { reactive } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
import TableGoals from "@/components/Tables/TableGoals.vue";

const goalData = [
  {
    game: "DanceDance Revolution",
    types: [
      {
        id: "Combo",
        needValue: true,
      },
      {
        id: "Grade",
        needValue: true,
      },
      {
        id: "Ranking",
        needValue: false,
      },
      {
        id: "Score",
        needValue: false,
      },
    ],
    combo: ["# of LIFE 4 FCs", "# of PFCs", "# of MFCs"],
    grade: ["# of AAA", "# of AA", "# of A", "# of B", "# of C"],
    ranking: ["1st place", "top 10", "top 100"],
    score: ["1 million points", "2 million points", "3 million points"],
  },
];

const games = ["DanceDance Revolution"];

var formData = reactive({
  id: 0,
  game: "...",
  type: "...",
  goal: "...",
  value: null,
  deadline: "...",
});

function getGoal() {
  const goal = goalData.find((x) => x.game == formData.game);
  var types = [];
  for (const type of goal.types) {
    types.push(type.id);
  }
  goal["listTypes"] = types;

  return goal;
}

function createGoal() {
  if (formData.goal == "...") {
    return false;
  } else if (formData.game == "...") {
    return false;
  } else if (formData.deadline == "...") {
    return false;
  }

  const goal = `I want ${formData.goal} on ${formData.game} in ${formData.deadline}`;
  return goal;
}

const setGoals = [
  {
    game: "DanceDance Revolution",
    type: "Rank",
    goal: "Top 10 Ranking",
    status: "#10 of 132",
    deadline: "3 Weeks",
  },
  {
    game: "pop'n music",
    type: "Plays",
    goal: "100 Plays",
    status: "2 Plays Since Creation",
    deadline: "1 Week",
  },
];
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiFlagOutline" title="Your Goals" main />

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
        <CardBoxWidget
          :number="1"
          label="Active Goals"
          color="text-yellow-500 dark:text-yellow-400"
        />
        <CardBoxWidget
          :number="3"
          label="Completed Goals"
          color="text-green-500 dark:text-green-400"
        />
        <CardBoxWidget
          :number="2"
          label="Abandoned Goals"
          color="text-red-500 dark:text-red-400"
        />
      </div>

      <SectionTitleLine :icon="mdiFlagCheckered" title="Active Goals" />
      <div class="mb-6">
        <CardBox has-table>
          <TableGoals :goals="setGoals" />
        </CardBox>
      </div>

      <SectionTitleLine :icon="mdiFlagOff" title="Past Goals" />
      <div class="mb-12">
        <CardBox has-table>
          <TableGoals :goals="setGoals" is-past />
        </CardBox>
      </div>

      <div>
        <CardBox>
          <h1 class="text-xl md:text-2xl font-bold">Goal Creator</h1>
          <p class="pb-4 dark:text-white/50">
            Follow these steps and set some goals!
          </p>

          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <h2 class="text-lg mb-2">Game</h2>
              <FormControl
                v-model="formData.game"
                :options="games"
                input-value=""
                name="game"
              />
            </div>
            <div v-if="formData.game !== '...'">
              <h2 class="text-lg mb-2">Goal Type</h2>
              <FormControl
                v-model="formData.type"
                :options="getGoal().listTypes"
                input-value=""
                name="type"
              />
            </div>
            <div v-if="formData.type !== '...'">
              <h2 class="text-lg mb-2">Goals</h2>
              <FormControl
                v-model="formData.goal"
                :options="getGoal()[formData.type.toLowerCase()]"
                input-value=""
                name="goal"
              />
            </div>
            <div
              v-if="
                formData.goal !== '...' &&
                getGoal().types.find((x) => x.id == formData.type).needValue
              "
            >
              <h2 class="text-lg mb-2">Value</h2>
              <FormControl
                v-model="formData.value"
                :placeholder="formData.goal"
                name="goal"
              />
            </div>
            <div v-if="formData.goal !== '...' || formData.value">
              <h2 class="text-lg mb-2">Deadline</h2>
              <FormControl
                v-model="formData.deadline"
                :options="['24Hrs', '5 Days', '15 Days', '1 Week', '2 Weeks']"
                input-value=""
                name="deadline"
              />
            </div>
          </div>

          <div v-if="formData.deadline !== '...'">
            <h1 class="pt-4 text-xl md:text-2xl font-bold">Compiled Goal</h1>
            <p class="text-lg dark:text-white/75">
              {{ createGoal() }}
            </p>
          </div>

          <template #footer>
            <div v-if="formData.deadline !== '...'" class="space-x-2">
              <BaseButton
                type="submit"
                color="success"
                label="Create"
                :small="false"
              />
            </div>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
