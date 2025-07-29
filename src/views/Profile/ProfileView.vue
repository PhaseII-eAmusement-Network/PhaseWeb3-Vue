<script setup>
import { reactive, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import {
  APIUpdatePassword,
  APIGetUserSessions,
  APIDeleteUserSessions,
} from "@/stores/api/account";
import { mdiAccount, mdiMail, mdiAsterisk, mdiLoading } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
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
  public: mainStore.userPublic ?? false,
});

const profileForm = reactive({
  username: JSON.parse(JSON.stringify(mainStore.userName)),
  email: JSON.parse(JSON.stringify(mainStore.userEmail)),
  pin: null,
  public: mainStore.userPublic ?? false,
});

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const profileLoading = ref(false);
const passwordLoading = ref(false);

const sessionData = ref(null);

watch(
  () => mainStore.userName,
  (newValue) => {
    profileForm.username = JSON.parse(JSON.stringify(newValue));
    currentProfile.username = JSON.parse(JSON.stringify(newValue));
  },
);

watch(
  () => mainStore.userEmail,
  (newValue) => {
    profileForm.email = JSON.parse(JSON.stringify(newValue));
    currentProfile.email = JSON.parse(JSON.stringify(newValue));
  },
);

watch(
  () => mainStore.userPublic,
  (newValue) => {
    profileForm.public = newValue;
    currentProfile.public = newValue;
  },
);

onMounted(() => {
  loadSessions();
});

async function submitProfile() {
  profileLoading.value = true;
  const response = await mainStore.putUser(profileForm);
  if (response.status == "success") {
    profileLoading.value = false;
    mainStore.userLoaded = false;
    await mainStore.loadUser();
    $router.go();
  }
}

async function submitPassword() {
  passwordLoading.value = true;
  const response = await APIUpdatePassword(
    passwordForm.currentPassword,
    passwordForm.newPassword,
    passwordForm.confirmPassword,
  );
  if (response.status == "success") {
    alert("Password changed.");
    passwordLoading.value = false;
    await mainStore.loadUser();
    $router.go();
  }
}

async function loadSessions() {
  const data = await APIGetUserSessions();
  sessionData.value = data;
}

async function deleteSessions() {
  const confirmed = window.confirm(
    "Are you really?\nThis will log out every session.",
  );
  if (confirmed) {
    const data = await APIDeleteUserSessions();
    sessionData.value = data;
    mainStore.userLoaded = false;
    mainStore.loadUser();
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

          <FormField
            label="Public Profile"
            help="Show my profile publicly. If disabled, only game profiles and scores will be visible."
          >
            <FormCheckRadio
              v-model="profileForm.public"
              name="public"
              :model-value="profileForm.public"
              :input-value="profileForm.public"
              type="switch"
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

        <CardBox is-form class="row-span-1" @submit.prevent="submitPassword()">
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

        <CardBox is-form class="row-span-1" @submit.prevent="submitPassword()">
          <PillTag color="info" label="Sessions" class="mb-2" />
          <div class="my-4">
            <h1 class="text-xl">
              You currently have {{ sessionData?.length }} saved session(s).
            </h1>
            <p>
              Most of them are likely expired.<br />

              Sadly, due to the fact that PhaseII stores no information on your
              Session ID for location or IP, we cannot provide select deletion.
            </p>
          </div>

          <h1 class="text-xl mb-2">Log out of all sessions</h1>
          <div>
            <BaseButton
              color="danger"
              label="Delete Sessions"
              @click="deleteSessions()"
            />
          </div>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
