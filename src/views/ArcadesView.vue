<script setup>
import { reactive } from "vue";
import { PhStorefront } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxArcade from "@/components/Cards/CardBoxArcade.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
</script>

<script>
const filterForm = reactive({
  filter: "",
});

export default {
  data() {
    return {};
  },
  methods: {
    filterArcade() {
      return this.arcadeData.filter(
        (arcade) =>
          arcade.name.toLowerCase().includes(filterForm.filter.toLowerCase()) &&
          arcade.public,
      );
    },
  },
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="PhStorefront" title="Public Arcades" main />

      <FormField label="Search" class="md:w-1/2 lg:w-1/3">
        <FormControl v-model="filterForm.filter" name="search" />
      </FormField>

      <div class="grid gap-4 grid-cols-1 lg:grid-cols-2 w-full">
        <CardBoxArcade
          v-for="arcade of filterArcade()"
          :key="arcade.id"
          :arcade-data="arcade"
          class="w-full h-full"
        />
      </div>
      <CardBoxComponentEmpty v-if="!filterArcade() || !filterArcade().length" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
