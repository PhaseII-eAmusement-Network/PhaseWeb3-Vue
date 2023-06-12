<script setup>
import { reactive } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";

const mainStore = useMainStore();

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail,
  pin: "****",
});

const passwordForm = reactive({
  password_current: "",
  password: "",
  password_confirmation: "",
});

const submitProfile = () => {
  mainStore.setUser(profileForm);
};

const submitPass = () => {
  //
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small />
      <SectionTitleLine :icon="mdiAccount" title="Profile Settings" main />

      <CardBox is-form class="mb-6" @submit.prevent="">
        <PillTag color="info" label="Discord Notifications" class="mb-4" />
        <div class="grid gap-4 grid-cols-2 md:grid-cols-4">
          <FormCheckRadio
            name="scorecards"
            :model-value="true"
            type="switch"
            label="Goal Alerts"
            class="outline outline-gray-400 rounded-xl outline-1 p-2"
          />
          <FormCheckRadio
            name="scorecards"
            :model-value="true"
            type="switch"
            label="Tournament Status"
            class="outline outline-gray-400 rounded-xl outline-1 p-2"
          />
          <FormCheckRadio
            name="scorecards"
            :model-value="true"
            type="switch"
            label="PASELI Transactions"
            class="outline outline-gray-400 rounded-xl outline-1 p-2"
          />
          <FormCheckRadio
            name="scorecards"
            :model-value="true"
            type="switch"
            label="System Alerts"
            class="outline outline-gray-400 rounded-xl outline-1 p-2"
          />
        </div>
      </CardBox>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardBox is-form class="row-span-1" @submit.prevent="submitProfile">
          <PillTag color="info" label="General" class="mb-2" />
          <FormField label="Username">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField
            label="E-mail"
            help="Used for Gravatar and Password Resetting"
          >
            <FormControl
              v-model="profileForm.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <FormField label="PIN" help="Used when logging into a game">
            <FormControl
              v-model="profileForm.pin"
              :icon="mdiAsterisk"
              type="password"
              name="pin"
              required
              autocomplete="pin"
            />
          </FormField>

          <template #footer>
            <BaseButton color="success" type="submit" label="Update" />
          </template>
        </CardBox>

        <CardBox is-form class="row-span-2" @submit.prevent="submitPass">
          <PillTag color="info" label="Change Password" class="mb-2" />
          <FormField
            label="Current password"
            help="Required. Your current password"
          >
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>
          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField
            label="Confirm password"
            help="Required. New password one more time"
          >
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButton type="submit" color="success" label="Update" />
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
