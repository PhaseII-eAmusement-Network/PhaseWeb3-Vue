<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import {
  PhUsersThree,
  PhMagnifyingGlass,
  PhChartPie,
  PhHammer,
  PhCrown,
  PhDiscordLogo,
  PhGlobe,
  PhHandWaving,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";

import { APIAdminUsers, APIAdminUserFromCardId } from "@/stores/api/admin";
import CardBoxWidget from "@/components/CardBoxWidget.vue";

const $router = useRouter();
const userData = ref([]);
const cardIdForm = ref(null);

const headers = [
  {
    text: "User ID",
    value: "id",
    width: 20,
    sortable: true,
  },
  {
    text: "Username",
    value: "username",
    width: 150,
    sortable: true,
  },
  {
    text: "Public",
    value: "public",
    width: 120,
    sortable: true,
  },
  {
    text: "Admin",
    value: "admin",
    width: 120,
    sortable: true,
  },
  {
    text: "Banned",
    value: "banned",
    width: 120,
    sortable: true,
  },
  {
    text: "Discord Linked",
    value: "data.discord.linked",
    width: 120,
    sortable: true,
  },
  {
    text: "Tachi Linked",
    value: "data.tachi.linked",
    width: 120,
    sortable: true,
  },
  {
    text: "Web3 Used",
    value: "data.webVersionsBool",
    width: 120,
    sortable: true,
  },
  {
    text: "Web3 Onboarded",
    value: "data.onboardingComplete",
    width: 120,
    sortable: true,
  },
];

onMounted(async () => {
  loadData();
});

async function loadData() {
  try {
    const data = await APIAdminUsers();
    var formattedItems = [];
    for (var item of data) {
      if (!item.username) {
        item.username = "Unclaimed Account";
      }

      if (item.data.webVersions) {
        item.data.webVersionsBool = item.data.webVersions ? true : false;
      }

      formattedItems.push(item);
    }

    userData.value = formattedItems;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}

const openUser = (item) => {
  const userId = item.id;
  $router.push(`/profiles/${userId}`);
};

const filterForm = reactive({
  filter: null,
});

function filterUsers() {
  if (filterForm.filter) {
    return userData.value
      .filter(
        (user) =>
          user.id
            .toString()
            .toLowerCase()
            .includes(filterForm.filter.toLowerCase()) ||
          user.username.toLowerCase().includes(filterForm.filter.toLowerCase()),
      )
      .slice(0, 25); // Cap results to 25
  }
  return [];
}

async function findUser() {
  const user = await APIAdminUserFromCardId(cardIdForm.value);
  if (!user) {
    window.alert("Couldn't find user.");
    return;
  } else {
    openUser({ id: user?.id });
  }
}

const userStats = computed(() => {
  const total = userData.value.length || 1; // avoid div/0

  const count = (fn) => userData.value.filter(fn).length;
  const percent = (n) => Math.round((n / total) * 100);

  const stats = {
    total,

    public: count((u) => u.public),
    admin: count((u) => u.admin),
    banned: count((u) => u.banned),

    discordLinked: count((u) => u.data?.discord?.linked),
    tachiLinked: count((u) => u.data?.tachi?.linked),

    web3Used: count((u) => u.data?.webVersionsBool),
    web3Onboarded: count((u) => u.data?.onboardingComplete),
  };

  return {
    counts: stats,
    percentages: {
      public: percent(stats.public),
      admin: percent(stats.admin),
      banned: percent(stats.banned),
      discordLinked: percent(stats.discordLinked),
      tachiLinked: percent(stats.tachiLinked),
      web3Used: percent(stats.web3Used),
      web3Onboarded: percent(stats.web3Onboarded),
    },
  };
});

const quickStats = computed(() => [
  {
    label: "Total User",
    number: userStats.value.counts.total,
    suffix: "",
    icon: PhUsersThree,
    iconColor: "text-blue-400",
  },
  {
    label: "Admin",
    number: userStats.value.counts.admin,
    suffix: ` (${userStats.value.percentages.admin}%)`,
    icon: PhCrown,
    iconColor: "text-red-400",
  },
  {
    label: "Banned",
    number: userStats.value.counts.banned,
    suffix: ` (${userStats.value.percentages.banned}%)`,
    icon: PhHammer,
    iconColor: "text-red-500",
  },
  {
    label: "Discord Linked",
    number: userStats.value.counts.discordLinked,
    suffix: ` (${userStats.value.percentages.discordLinked}%)`,
    icon: PhDiscordLogo,
    iconColor: "text-indigo-400",
  },
  {
    label: "Web3 Used",
    number: userStats.value.counts.web3Used,
    suffix: ` (${userStats.value.percentages.web3Used}%)`,
    icon: PhGlobe,
    iconColor: "text-emerald-400",
  },
  {
    label: "Web3 Onboarded",
    number: userStats.value.counts.web3Onboarded,
    suffix: ` (${userStats.value.percentages.web3Onboarded}%)`,
    icon: PhHandWaving,
    iconColor: "text-amber-400",
  },
]);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox class="mb-6 p-1">
        <h1 class="text-3xl">User Management</h1>
        <p class="text-sm text-gray-400">Click a row to open User</p>
      </CardBox>

      <SectionTitleLine
        :icon="PhMagnifyingGlass"
        title="Search"
        color="text-amber-500"
        main
      />
      <div class="grid md:grid-cols-2 gap-6">
        <CardBox class="mb-6">
          <PillTag color="info" label="Search" class="mb-2" />
          <FormField
            label="Search"
            help="Search by ID or username."
            class="w-full"
          >
            <FormControl
              v-model="filterForm.filter"
              :model-value="filterForm.filter"
            />
          </FormField>

          <div class="grid gap-4">
            <div
              v-for="user of filterUsers()"
              :key="user.id"
              class="bg-slate-800 p-4 rounded-xl"
            >
              <div class="md:flex w-full place-content-between">
                <div>
                  <h1 class="text-lg md:text-xl">{{ user.username }}</h1>
                  <h2 class="text-md md:text-lg">
                    User {{ user.banned ? "is" : "isn't" }} banned.
                  </h2>
                  <h2 class="text-md">
                    Discord
                    {{ user.data?.discord?.linked ? "is" : "isn't" }} linked.
                  </h2>
                  <div
                    class="bg-slate-900 p-2 rounded-md mt-2 w-14 max-w-16 text-center"
                  >
                    <h2 class="text-lg font-mono text-pink-700">
                      {{ user.id }}
                    </h2>
                  </div>
                </div>

                <div class="flex align-middle mt-2 md:mt-0 max-h-16">
                  <BaseButton
                    label="Open User"
                    color="info"
                    @click="openUser(user)"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardBox>
        <CardBox class="mb-6" is-form @submit.prevent="findUser">
          <PillTag color="warning" label="From CardID" class="mb-2" />
          <FormField
            label="Card ID"
            help="16 character ID for a user's card."
            class="w-full"
          >
            <FormControl
              v-model="cardIdForm"
              name="Card ID"
              required
              :model-value="cardIdForm"
              :minlength="16"
              :maxlength="16"
            />
          </FormField>

          <BaseButton color="success" type="submit" label="Open User" />
        </CardBox>
      </div>

      <SectionTitleLine
        :icon="PhChartPie"
        title="Quick Stats"
        color="text-amber-300"
        main
      />
      <div
        class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 mb-6"
      >
        <CardBoxWidget
          v-for="box in quickStats"
          :key="box.label"
          :icon="box.icon"
          :number="box.number"
          :label="box.label"
          :suffix="box.suffix"
          :icon-color="box.iconColor"
        />
      </div>

      <SectionTitleLine
        :icon="PhUsersThree"
        title="All Users"
        color="text-blue-400"
        main
      />
      <CardBox has-table class="mb-6">
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="headers"
              :items="userData"
              :has-avatar="true"
              @row-clicked="openUser"
            />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
