<script setup>
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
</script>

<template>
  <LayoutGuest>
    <div class="flex md:min-h-screen md:items-center md:justify-center">
      <CardBox
        class="w-full md:w-auto rounded-none md:rounded-xl"
        has-table
        is-auth
      >
        <div class="p-4 flex flex-col w-full space-y-2">
          <div class="flex flex-col items-center text-wrap h-full">
            <img src="/favicon.png" class="rounded-full shadow-lg mb-2" />
            <h1 class="text-xl"><samp>PhaseII</samp></h1>
            <p class="text-sm text-gray-700 dark:text-white/75">
              Broken since 2021
            </p>
            <hr class="border-t border my-1 w-full" />
            <p class="text-lg relative bottom-0">404 - File not found</p>
          </div>
          <div>
            <h2 class="mb-2">
              The server was unable to locate the page you're trying to go to.
            </h2>
            <BaseButton label="Home" color="info" href="/" />
          </div>
        </div>
      </CardBox>
    </div>
  </LayoutGuest>
</template>
