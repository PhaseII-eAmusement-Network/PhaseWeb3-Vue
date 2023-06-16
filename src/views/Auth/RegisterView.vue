<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";

const form = reactive({
  username: "",
  email: "",
  pass: "",
  remember: true,
});

const router = useRouter();

const submit = () => {
  router.push("/");
};
</script>

<template>
  <LayoutGuest>
    <div class="flex md:min-h-screen md:items-center md:justify-center">
      <CardBox
        class="w-full md:w-auto rounded-none md:rounded-xl"
        has-table
        is-auth
      >
        <div
          class="p-4 flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4"
        >
          <div class="flex flex-col items-center text-wrap h-full">
            <img src="/favicon.png" class="rounded-full shadow-lg mb-2" />
            <h1 class="text-xl"><samp>PhaseII</samp></h1>
            <p class="text-sm text-gray-700 dark:text-white/75">
              Spinnin' since 2021
            </p>
            <hr class="border-t border-1 my-1 w-full" />
            <p class="text-lg relative bottom-0">Account Registration</p>
          </div>
          <div class="md:border-r md:border-1"></div>
          <div class="grid grid-cols-2 gap-x-2">
            <FormField label="Desired Username">
              <FormControl
                v-model="form.username"
                :icon="mdiAccount"
                name="username"
                autocomplete="username"
              />
            </FormField>

            <FormField label="Email Address">
              <FormControl
                v-model="form.email"
                :icon="mdiAccount"
                name="email"
                autocomplete="email"
              />
            </FormField>

            <FormField label="Password">
              <FormControl
                v-model="form.pass"
                :icon="mdiAsterisk"
                type="password"
                name="password"
                autocomplete="current-password"
              />
            </FormField>

            <FormField label="Password Confirmation">
              <FormControl
                v-model="form.pass"
                :icon="mdiAsterisk"
                type="password"
                name="password"
                autocomplete="current-password"
              />
            </FormField>

            <FormField label="Card ID">
              <FormControl
                v-model="form.email"
                :icon="mdiAccount"
                name="card"
                autocomplete="card"
              />
            </FormField>

            <FormField label="Game PIN">
              <FormControl
                v-model="form.pass"
                :icon="mdiAsterisk"
                type="password"
                name="password"
                autocomplete="current-password"
              />
            </FormField>

            <FormCheckRadio
              v-model="form.remember"
              class="col-span-2"
              name="remember"
              label="Remember Me"
              :input-value="true"
            />

            <div class="col-span-2">
              <div class="flex flex-col gap-2 mt-4">
                <BaseButton
                  label="Create Account"
                  color="success"
                  @click="submit()"
                />
              </div>

              <hr class="border-t border-1 my-4 w-full" />

              <div class="flex flex-col gap-2 my-4">
                <h2>Have an Account?</h2>
                <BaseButton label="Log In" color="info" href="/#/auth/login" />

                <h2>Forgot Password?</h2>
                <BaseButton
                  label="Password Reset"
                  color="warning"
                  href="/#/auth/reset"
                />
              </div>
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  </LayoutGuest>
</template>
