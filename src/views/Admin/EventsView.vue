<script setup>
import { mdiFlagCheckered, mdiSecurity } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine
        :icon="mdiSecurity"
        title="Network Administration"
        color="text-red-600"
        main
      />

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
        <CardBoxWidget :number="1" label="User Account(s)" />
        <CardBoxWidget :number="2" label="Registered Arcades" />
        <CardBoxWidget :number="3" label="Published Scores" />
      </div>

      <SectionTitleLine :icon="mdiFlagCheckered" title="Recent Errors" />
      <CardBox> </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
