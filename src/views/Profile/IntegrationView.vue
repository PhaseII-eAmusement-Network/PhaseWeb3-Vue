<script setup>
import { useMainStore } from "@/stores/main";
import { ref, watch } from "vue";
import { mdiServerNetwork, mdiMessage, mdiScoreboard } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";

const mainStore = useMainStore();

const userData = ref(mainStore.userData);
watch(
  () => mainStore.userData,
  (newValue) => {
    userData.value = newValue;
  }
);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />
      <SectionTitleLine
        :icon="mdiServerNetwork"
        title="Server Integrations"
        main
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardBox>
          <PillTag
            color="info"
            :icon="mdiMessage"
            label="Discord"
            class="mb-2"
          />

          <h1
            v-if="userData.discord && userData.discord.linked"
            class="text-lg"
          >
            Discord is linked to <b>{{ userData.discord.username }}</b>
          </h1>
          <h1
            v-if="!userData.discord || !userData.discord.linked"
            class="text-lg"
          >
            Discord isn't linked!
          </h1>

          <template #footer>
            <div class="space-x-2">
              <BaseButton
                v-if="!userData.discord || !userData.discord.linked"
                type="submit"
                color="success"
                label="Link Now"
              />
              <BaseButton
                v-if="userData.discord && userData.discord.linked"
                type="submit"
                color="info"
                label="Relink"
              />
              <BaseButton
                v-if="userData.discord && userData.discord.linked"
                type="submit"
                color="danger"
                label="Unlink"
              />
            </div>
          </template>
        </CardBox>

        <CardBox>
          <PillTag
            :icon="mdiScoreboard"
            color="info"
            label="Kamaitachi"
            class="mb-2"
          />

          <h1 v-if="userData.tachi && userData.tachi.linked" class="text-lg">
            Kamaitachi is linked to <b>{{ userData.tachi.username }}</b>
          </h1>
          <h1 v-if="!userData.tachi || !userData.tachi.linked" class="text-lg">
            Kamaitachi isn't linked!
          </h1>

          <template #footer>
            <div class="space-x-2">
              <BaseButton
                v-if="!userData.tachi || !userData.tachi.linked"
                type="submit"
                color="success"
                label="Link Now"
              />
              <BaseButton
                v-if="userData.tachi && userData.tachi.linked"
                type="submit"
                color="info"
                label="Relink"
              />
              <BaseButton
                v-if="userData.tachi && userData.tachi.linked"
                type="submit"
                color="danger"
                label="Unlink"
              />
            </div>
          </template>
        </CardBox>

        <!-- <CardBox>
          <PillTag
            :icon="mdiTournament"
            color="info"
            label="Start.GG"
            class="mb-2"
          />

          <h1 class="text-lg">Start.GG is linked to <b>@trmazi</b></h1>
          <h1 class="text-lg">Start.GG isn't linked!</h1>

          <template #footer>
            <div class="space-x-2">
              <BaseButton type="submit" color="success" label="Link Now" />
              <BaseButton type="submit" color="info" label="Relink" />
              <BaseButton type="submit" color="danger" label="Unlink" />
            </div>
          </template>
        </CardBox> -->
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
