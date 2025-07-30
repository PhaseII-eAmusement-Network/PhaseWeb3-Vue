<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiCardAccountDetailsOutline,
  mdiLoading,
} from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";

import { APIRegisterUser } from "@/stores/api/account";

const $router = useRouter();

const registerLoading = ref(false);
const profileForm = reactive({
  username: "",
  email: "",
  newPassword: "",
  confirmPassword: "",
  pin: "",
  cardId: "",
  remember: true,
});

function pinInput(event) {
  var input = event.target.value;
  input = input.replace(/[^0-9]/g, "");

  profileForm.pin = input;
}

function cardInput(event) {
  var input = event.target.value;
  input = input.replace(/[^A-Za-z0-9]/g, "");

  // Format the input to XXXX-XXXX-XXXX-XXXX
  input = input
    .toUpperCase()
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");

  profileForm.cardId = input;
}

async function registerProfile() {
  registerLoading.value = true;
  const response = await APIRegisterUser(profileForm);
  if (response.status == "success") {
    registerLoading.value = false;
    alert("User account registered. Please log in!");
    $router.push("login");
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
            <hr class="border-t border my-1 w-full" />
            <p class="text-lg relative bottom-0">Account Registration</p>
          </div>
          <div class="md:border-r md:border" />

          <div>
            <form
              class="grid grid-cols-2 gap-x-2"
              @submit.prevent="registerProfile()"
            >
              <FormField label="Desired Username">
                <FormControl
                  v-model="profileForm.username"
                  :icon="mdiAccount"
                  name="username"
                  required
                  autocomplete="username"
                />
              </FormField>

              <FormField label="Email Address">
                <FormControl
                  v-model="profileForm.email"
                  :icon="mdiMail"
                  type="email"
                  name="email"
                  required
                  autocomplete="email"
                />
              </FormField>

              <FormField label="Password">
                <FormControl
                  v-model="profileForm.newPassword"
                  :icon="mdiAsterisk"
                  name="newPassword"
                  type="password"
                  required
                />
              </FormField>

              <FormField label="Password Confirmation">
                <FormControl
                  v-model="profileForm.confirmPassword"
                  :icon="mdiAsterisk"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </FormField>

              <FormField
                label="Card ID"
                help="The ACCESS CODE provided by the game."
              >
                <FormControl
                  v-model="profileForm.cardId"
                  :icon="mdiCardAccountDetailsOutline"
                  name="cardId"
                  type="card"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  :minlength="19"
                  :maxlength="19"
                  required
                  @input="cardInput"
                />
              </FormField>

              <FormField label="Game PIN">
                <FormControl
                  v-model="profileForm.pin"
                  :icon="mdiAsterisk"
                  type="password"
                  name="pin"
                  required
                  :minlength="4"
                  :maxlength="4"
                  inputmode="numeric"
                  pattern="\d{4}"
                  autocomplete="pin"
                  @input="pinInput"
                />
              </FormField>

              <FormCheckRadio
                v-model="profileForm.remember"
                class="col-span-2"
                name="remember"
                label="Remember Me"
                :input-value="true"
              />

              <div class="flex gap-2 mt-4">
                <BaseButton type="submit" label="Register" color="success" />
                <BaseIcon
                  v-if="registerLoading"
                  :path="mdiLoading"
                  color="text-yellow-500"
                  class="animate animate-spin"
                />
              </div>
            </form>
            <div class="col-span-2">
              <hr class="border-t border my-4 w-full" />

              <div class="flex flex-col gap-2 my-4">
                <h2>Have an Account?</h2>
                <BaseButton label="Log In" color="info" href="/#/auth/login" />
              </div>
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  </LayoutGuest>
</template>
