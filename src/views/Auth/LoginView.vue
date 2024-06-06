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
  login: "john.doe",
  pass: "highly-secure-password-fYjUw-",
  remember: true,
  spinin: false,
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
        class="w-full md:w-auto rounded-none md:rounded-xl md:drop-shadow-xl"
        :class="form.spinin ? 'animate-spin' : 'animate-none'"
        has-table
        is-auth
      >
        <div
          class="p-4 flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4"
        >
          <div class="flex flex-col items-center text-wrap h-full md:mt-5">
            <img src="/favicon.png" class="rounded-full shadow-lg mb-2" />
            <h1 class="text-xl"><samp>PhaseII</samp></h1>
            <button
              class="text-sm text-gray-700 dark:text-white/75"
              @click="form.spinin = !form.spinin"
            >
              Spinnin' since 2021
            </button>
            <hr class="border-r-1 my-1 w-full" />
            <p class="text-lg relative bottom-0">Please log in.</p>
          </div>
          <div class="md:border-r" />
          <div>
            <FormField label="Username">
              <FormControl
                v-model="form.login"
                :icon="mdiAccount"
                name="login"
                autocomplete="username"
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

            <FormCheckRadio
              v-model="form.remember"
              name="remember"
              label="Remember Me"
              :input-value="true"
            />

            <div class="flex flex-col gap-2 mt-4">
              <BaseButton label="Log In" color="success" @click="submit()" />
            </div>

            <hr class="border-t my-4 w-full" />

            <div class="flex flex-col gap-2 my-4">
              <h2>Not Registered?</h2>
              <BaseButton
                label="Register"
                color="info"
                href="/#/auth/register"
              />

              <!-- <h2>Forgot Password?</h2>
              <BaseButton
                label="Password Reset"
                color="warning"
                href="/#/auth/reset"
              /> -->
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  </LayoutGuest>
</template>
