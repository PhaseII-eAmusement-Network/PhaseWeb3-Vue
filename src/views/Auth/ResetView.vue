<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";

const form = reactive({
  login: "test@website.com",
});

const router = useRouter();

const submit = () => {
  router.push("/auth/login");
};
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
          <div>
            <FormField label="Email Address">
              <FormControl
                v-model="form.login"
                :icon="mdiAccount"
                name="email"
                autocomplete="email"
              />
            </FormField>

            <div class="flex flex-col gap-2 mt-4">
              <BaseButton label="Submit" color="info" @click="submit()" />
            </div>

            <hr class="border-t border-1 my-4 w-full" />

            <div class="flex flex-col gap-2 my-4">
              <h2>Remember it?</h2>
              <BaseButton label="Log In" color="success" href="/#/auth/login" />
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  </LayoutGuest>
</template>
