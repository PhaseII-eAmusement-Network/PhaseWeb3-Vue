<script setup>
import { ref, onMounted } from "vue";
import { mdiFlagCheckered, mdiSecurity } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";

import { APIAdminDashboard } from "@/stores/api/admin";
const dashboardData = ref({});
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await APIAdminDashboard();
    dashboardData.value = data;
    loading.value = false;
  } catch (error) {
    console.log("Failed to fetch admin data:", error);
  }
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="!loading">
        <CardBox class="mb-6 p-1">
          <h1 class="text-3xl">PhaseII eAmusement Network</h1>
          <p class="text-sm text-gray-400">Welcome to the backend ;)</p>
        </CardBox>

        <SectionTitleLine
          :icon="mdiSecurity"
          title="Admin Dashboard"
          color="text-red-600"
          main
        />

        <div
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-6"
        >
          <CardBoxWidget
            :number="dashboardData?.statistics?.user"
            label="User Account(s)"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.card"
            label="Registered Cards"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.profile"
            label="Game Profiles"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.link"
            label="Rivals"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.arcade"
            label="Registered Arcades"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.score"
            label="Published Scores"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.score_history"
            label="Score Attempts"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.achievement"
            label="Achievements"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.audit"
            label="Recent Event Logs"
          />
        </div>

        <SectionTitleLine :icon="mdiFlagCheckered" title="Recent Errors" />
        <CardBox> </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
