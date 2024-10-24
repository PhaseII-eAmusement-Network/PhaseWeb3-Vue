<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { APIUpdatePassword } from "@/stores/api/account";
import { mdiAccount, mdiMail, mdiAsterisk, mdiLoading } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";

const mainStore = useMainStore();
const $router = useRouter();

const currentProfile = reactive({
  username: JSON.parse(JSON.stringify(mainStore.userName)),
  email: JSON.parse(JSON.stringify(mainStore.userEmail)),
  pin: null,
});

const profileForm = reactive({
  username: JSON.parse(JSON.stringify(mainStore.userName)),
  email: JSON.parse(JSON.stringify(mainStore.userEmail)),
  pin: null,
});

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const profileLoading = ref(false);
const passwordLoading = ref(false);

watch(
  () => mainStore.userName,
  (newValue) => {
    profileForm.username = JSON.parse(JSON.stringify(newValue));
    currentProfile.username = JSON.parse(JSON.stringify(newValue));
  }
);

watch(
  () => mainStore.userEmail,
  (newValue) => {
    profileForm.email = JSON.parse(JSON.stringify(newValue));
    currentProfile.email = JSON.parse(JSON.stringify(newValue));
  }
);

async function submitProfile() {
  profileLoading.value = true;
  const response = await mainStore.putUser(profileForm);
  if (response.status == "success") {
    profileLoading.value = false;
    await mainStore.loadUser();
    $router.go();
  }
}

async function submitPassword() {
  passwordLoading.value = true;
  const response = await APIUpdatePassword(
    passwordForm.currentPassword,
    passwordForm.newPassword,
    passwordForm.confirmPassword
  );
  if (response.status == "success") {
    alert("Password changed.");
    passwordLoading.value = false;
    await mainStore.loadUser();
    $router.go();
  }
}

function pinInput(event) {
  event.target.value = event.target.value.replace(/\D/g, "");
}

function userChanged(oldProfile, newProfile) {
  if (JSON.stringify(oldProfile) !== JSON.stringify(newProfile)) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />
      <SectionTitleLine :icon="mdiAccount" title="Profile Settings" main />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardBox is-form class="row-span-1" @submit.prevent="submitProfile">
          <PillTag color="info" label="General" class="mb-2" />
          <FormField label="Username">
            <FormControl
              v-model="profileForm.username"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="E-mail" help="Used for password resetting and 2FA">
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
              :minlength="4"
              :maxlength="4"
              inputmode="numeric"
              pattern="\d{4}"
              autocomplete="pin"
              @input="pinInput"
            />
          </FormField>

          <template #footer>
            <BaseButton
              v-if="userChanged(currentProfile, profileForm)"
              color="success"
              type="submit"
              label="Update"
            />
            <BaseIcon
              v-if="profileLoading"
              :path="mdiLoading"
              color="text-yellow-500"
              class="animate animate-spin"
            />
          </template>
        </CardBox>

        <CardBox is-form class="row-span-2" @submit.prevent="submitPassword()">
          <PillTag color="info" label="Change Password" class="mb-2" />
          <FormField label="Current Password">
            <FormControl
              v-model="passwordForm.currentPassword"
              :icon="mdiAsterisk"
              name="currentPassword"
              type="password"
              required
            />
          </FormField>
          <BaseDivider />

          <FormField label="New Password">
            <FormControl
              v-model="passwordForm.newPassword"
              :icon="mdiAsterisk"
              name="newPassword"
              type="password"
              required
            />
          </FormField>

          <FormField label="Confirm Password">
            <FormControl
              v-model="passwordForm.confirmPassword"
              :icon="mdiAsterisk"
              name="confirmPassword"
              type="password"
              required
            />
          </FormField>

          <template #footer>
            <BaseButton type="submit" color="success" label="Update" />
            <BaseIcon
              v-if="passwordLoading"
              :path="mdiLoading"
              color="text-yellow-500"
              class="animate animate-spin"
            />
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
