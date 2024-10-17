<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {
  mdiEmailOutline,
  mdiShieldKeyOutline,
  mdiAsterisk,
  mdiLoading,
} from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";

import {
  APIEmailAuth,
  APICheckKey,
  APIResetPassword,
} from "@/stores/api/account";

const router = useRouter();

const form = reactive({
  email: "",
  loading: false,
  emailSent: false,
  authKey: null,
  authValid: false,
  username: null,
  newPassword: "",
  confirmPassword: "",
});

async function submitEmail() {
  form.loading = true;
  const emailStatus = await APIEmailAuth(form.email);
  if (emailStatus.status == "success") {
    form.emailSent = true;
    form.loading = false;
  }
}

async function submitCode() {
  form.loading = true;
  const keyStatus = await APICheckKey(form.authKey);
  if (keyStatus.status == "success") {
    form.authValid = true;
    form.loading = false;
    form.username = keyStatus.username;
  }
}

async function resetPassword() {
  if (form.newPassword != form.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  form.loading = true;
  const resetStatus = await APIResetPassword(
    form.authKey,
    form.newPassword,
    form.confirmPassword
  );
  if (resetStatus.status == "success") {
    alert("Password changed!");
    router.push("/auth/login");
  }
}
</script>

<template>
  <LayoutGuest>
    <div class="flex md:min-h-screen md:items-center md:justify-center">
      <CardBox
        class="w-full md:w-auto rounded-none md:rounded-xl md:drop-shadow-xl"
        has-table
        is-auth
      >
        <div
          class="p-4 flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4"
        >
          <div class="flex flex-col items-center text-wrap h-full md:mt-5">
            <img src="/favicon.png" class="rounded-full shadow-lg mb-2" />
            <h1 class="text-xl"><samp>PhaseII</samp></h1>
            <p class="text-sm text-gray-700 dark:text-white/75">
              Spinnin' since 2021
            </p>
            <hr class="border-t border-1 my-1 w-full" />
            <p class="text-lg relative bottom-0">Password Reset</p>
          </div>
          <div class="md:border-r md:border-1"></div>

          <div class="grid grid-cols-1 gap-2">
            <form v-if="!form.emailSent" @submit.prevent="submitEmail()">
              <FormField label="Email Address">
                <FormControl
                  v-model="form.email"
                  :icon="mdiEmailOutline"
                  type="email"
                  autocomplete="email"
                  required
                />
              </FormField>
              <BaseButton label="Check" type="submit" color="info" />
              <BaseIcon
                v-if="form.loading"
                :path="mdiLoading"
                color="text-yellow-500"
                class="animate animate-spin"
              />
            </form>
            <form
              v-if="form.emailSent && !form.authValid"
              @submit.prevent="submitCode()"
            >
              <FormField label="Auth Key">
                <FormControl
                  v-model="form.authKey"
                  :icon="mdiShieldKeyOutline"
                  type="text"
                  name="token"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  autocomplete="one-time-code"
                  :maxlength="6"
                />
              </FormField>
              <BaseButton label="Unlock" type="submit" color="info" />
              <BaseIcon
                v-if="form.loading"
                :path="mdiLoading"
                color="text-yellow-500"
                class="animate animate-spin"
              />
            </form>
            <form
              v-if="form.emailSent && form.authValid"
              @submit.prevent="resetPassword()"
            >
              <div class="mb-4">
                <h1 class="text-xl">
                  Welcome, <span class="font-bold">{{ form.username }}</span>
                </h1>
                <p class="text-sm text-gray-400">
                  Look who forgot their password
                </p>
              </div>
              <FormField label="New Password">
                <FormControl
                  v-model="form.newPassword"
                  :icon="mdiAsterisk"
                  type="password"
                  required
                  minlength="8"
                />
              </FormField>
              <FormField label="Confirm Password">
                <FormControl
                  v-model="form.confirmPassword"
                  :icon="mdiAsterisk"
                  type="password"
                  required
                  minlength="8"
                />
              </FormField>
              <BaseButton
                label="Reset Password"
                type="submit"
                color="success"
              />
              <BaseIcon
                v-if="form.loading"
                :path="mdiLoading"
                color="text-yellow-500"
                class="animate animate-spin"
              />
            </form>

            <hr v-if="!form.authValid" class="border-t border-1 mt-3 w-full" />
            <div v-if="!form.authValid" class="flex flex-col gap-2 my-1">
              <h2>Remember it?</h2>
              <BaseButton label="Log In" color="success" href="/#/auth/login" />
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  </LayoutGuest>
</template>
