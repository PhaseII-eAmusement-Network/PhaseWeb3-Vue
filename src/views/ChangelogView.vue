<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { PhGitMerge } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";

const changelog = ref(null);

async function loadChangelogs() {
  try {
    const response = await axios.get(`/data-sources/changelog.json`);
    if (response.data) {
      changelog.value = response.data;
    }
  } catch (error) {
    console.error("Error loading changelog:", error.message);
  }
}

const reversedChangelog = computed(() => {
  if (!changelog.value) return [];
  return Object.entries(changelog.value).reverse();
});

onMounted(loadChangelogs);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine
        :icon="PhGitMerge"
        title="WebUI Changelog Archive"
        color="text-emerald-400"
        main
      />

      <div v-if="changelog" class="grid gap-4 grid-cols-1 w-full pb-4">
        <CardBox
          v-for="[version, log] in reversedChangelog"
          :key="version"
          class="w-full h-full"
        >
          <PillTag color="success" :label="`v${version}`" class="mb-4" />
          <div
            class="text-sm md:text-md space-y-2 text-left text-pink-500 bg-slate-950 p-2"
          >
            <h1>Changelog:</h1>
            <h2
              v-for="change of log ?? ['No changes!']"
              :key="change"
              class="font-mono"
            >
              {{ change }}
            </h2>
          </div>
        </CardBox>
      </div>

      <CardBoxComponentEmpty v-else />
    </SectionMain>
  </LayoutAuthenticated>
</template>
