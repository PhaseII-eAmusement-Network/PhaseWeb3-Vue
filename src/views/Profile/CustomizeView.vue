<script setup>
import { mdiAccountTieHat } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small />
      <SectionTitleLine
        :icon="mdiAccountTieHat"
        title="Profile Customizations"
        main
      />

      <div>
        <CardBox>
          <div class="grid grid-cols-3 gap-6">
            <div>
              <h2 class="text-lg mb-2">Avatar Source</h2>
              <FormControl
                :options="['Discord', 'Gravatar', 'Kamaitachi']"
                model-value="Gravatar"
                name="border"
              />
            </div>
            <div>
              <h2 class="text-lg mb-2">Avatar Border</h2>
              <FormControl
                :options="['Trans Flag', 'Pride Flag']"
                model-value="Trans Flag"
                name="border"
              />
            </div>
            <div>
              <h2 class="text-lg mb-2">Profile Background</h2>
              <FormControl
                :options="['Trans Flag', 'Pride Flag']"
                model-value="Trans Flag"
                name="border"
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
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
