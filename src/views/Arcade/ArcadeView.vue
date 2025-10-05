<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import {
  PhStorefront,
  PhGear,
  PhCheckCircle,
  PhXCircle,
  PhInfo,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { getNestedValue, setNestedValue } from "@/constants/values";
import {
  APIGetArcade,
  APIUpdateArcade,
  APIGetArcadeVPN,
} from "@/stores/api/arcade";
import {
  checkArcadeName,
  APIAdminUpdateArcade,
  APIAdminDeleteArcade,
  APIAdminUsers,
  APIAdminAddArcadeOwner,
  APIAdminRemoveArcadeOwner,
} from "@/stores/api/admin";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const optionForm = ref(null);
const bareForm = ref(null);
const arcadeData = ref(null);
const loading = ref(true);
const arcadeCheck = ref(null);
const newArcade = ref(null);
const newManager = ref(null);
const userData = ref(null);

const $route = useRoute();
const $router = useRouter();
const arcadeId = parseInt($route.params.id);

var arcadeOptions = [
  {
    id: "paseli_enabled",
    name: "PASELI Services",
    help: "Enable PASELI for this arcade.",
    type: "Boolean",
  },
  {
    id: "paseli_infinite",
    name: "Infinite PASELI",
    help: "Enable infinite PASELI for this arcade.",
    type: "Boolean",
  },
  {
    id: "maint",
    name: "Maintenance Mode",
    help: "Place this arcade under maintenance.",
    type: "Boolean",
  },
  {
    id: "hide_network",
    name: "Incognito Mode",
    help: "Hide the network and all ranking data.",
    type: "Boolean",
  },
];

async function loadArcade() {
  try {
    arcadeData.value = {};
    optionForm.value = {};
    bareForm.value = {};
    const data = await APIGetArcade(arcadeId);
    arcadeData.value = data;
    newArcade.value = JSON.parse(JSON.stringify(data));

    for (const setting of arcadeOptions) {
      const value = getNestedValue(arcadeData.value.data, setting.id);
      setNestedValue(optionForm.value, setting.id, value);
      setNestedValue(bareForm.value, setting.id, value);
    }
    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

async function loadUsers() {
  if (mainStore.userAdmin) {
    try {
      const data = await APIAdminUsers(true);
      const filteredData = [];

      for (const user of data) {
        if (user.username != undefined) {
          filteredData.push({
            id: user.id,
            label: user.username,
          });
        }
      }
      filteredData.sort((a, b) => a.label.localeCompare(b.label));

      userData.value = filteredData;
    } catch (error) {
      console.error("Failed to fetch admin user data:", error);
    }
  }
}

watch(
  () => mainStore.userAdmin,
  () => {
    loadUsers();
  },
);

async function updateArcade() {
  const response = await APIUpdateArcade(arcadeId, optionForm.value);

  if (response.status != "error") {
    await loadArcade();
  }
}

onMounted(() => {
  loadArcade();
  loadUsers();
});

function formatName(inputString, replaceWith = "NA_") {
  var asciiFriendly = [...inputString]
    .map((c) => {
      return c.charCodeAt(0) < 128 ? c : replaceWith;
    })
    .join("");

  asciiFriendly = asciiFriendly.replace(
    /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
    "",
  );

  asciiFriendly = asciiFriendly.replace(/\s+/g, "_");
  return asciiFriendly;
}

async function exportVPN() {
  try {
    const data = await APIGetArcadeVPN(arcadeId);
    const blob = new Blob([data], { type: "application/ovpn" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `gradius-${formatName(
      arcadeData.value.name,
    )}-phaseii-config.ovpn`;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  } catch (error) {
    console.log("Failed to fetch arcade data:", error);
  }
}

async function checkName() {
  if (newArcade.value.name) {
    const data = await checkArcadeName(newArcade.value.name);
    if (data.unused != undefined) {
      arcadeCheck.value = data.unused;
    }
  }
}

async function adminUpdateArcade() {
  const response = await APIAdminUpdateArcade(arcadeId, {
    name: newArcade.value.name,
    description: newArcade.value.description,
    beta: newArcade.value.data.is_beta,
  });

  if (response.status != "error") {
    await loadArcade();
  }
}

async function addManager() {
  if (newManager.value == null) {
    return;
  }

  const response = await APIAdminAddArcadeOwner(arcadeId, newManager.value);

  if (response.status != "error") {
    newManager.value = null;
    loadArcade();
  }
}

async function removeManager(ownerId) {
  if (!ownerId) {
    return;
  }

  const response = await APIAdminRemoveArcadeOwner(arcadeId, ownerId);

  if (response.status != "error") {
    loadArcade();
  }
}

async function adminDeleteArcade() {
  const confirmed = window.confirm(
    "Are you really?\nThis will remove all owners, machines, and arcade data.",
  );
  if (confirmed) {
    const response = await APIAdminDeleteArcade(arcadeId);

    if (response.status != "error") {
      await $router.push({
        name: "admin_arcades",
      });
    }
  }
}

const navigateToProfile = (userID) => {
  $router.push(`/profiles/${userID}`);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="!loading">
        <ArcadeCard class="mb-6" :arcade="arcadeData" />

        <template v-if="mainStore.userAdmin">
          <SectionTitleLine :icon="PhGear" title="Arcade Administration" main />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CardBox
              is-form
              class="lg:mb-6"
              @submit.prevent="adminUpdateArcade"
            >
              <PillTag
                color="info"
                label="General Information"
                :icon="PhInfo"
                class="mb-2"
              />
              <FormField label="Arcade Name">
                <FormControl
                  v-model="newArcade.name"
                  :input-value="newArcade.name"
                  name="arcadeName"
                  required
                />
              </FormField>

              <div class="mb-4 flex gap-2 items-stretch">
                <BaseButton
                  color="info"
                  label="Check Name"
                  @click="checkName()"
                />
                <BaseIcon
                  v-if="arcadeCheck == true"
                  :icon="PhCheckCircle"
                  color="text-green-400"
                  size="25"
                />
                <BaseIcon
                  v-else-if="arcadeCheck == false"
                  :icon="PhXCircle"
                  color="text-red-400"
                  size="25"
                />
              </div>

              <FormField label="Description">
                <FormControl
                  v-model="newArcade.description"
                  name="description"
                  required
                />
              </FormField>

              <FormField label="Beta Enabled">
                <FormCheckRadio
                  v-model="newArcade.data.is_beta"
                  name="beta"
                  :model-value="newArcade.data.is_beta"
                  :input-value="newArcade.data.is_beta"
                  type="switch"
                />
              </FormField>
              <div
                v-if="JSON.stringify(arcadeData) !== JSON.stringify(newArcade)"
                class="space-x-2 mt-6 mb-4"
              >
                <BaseButton color="success" label="Save" type="submit" />
                <BaseButton
                  color="warning"
                  label="Revert"
                  @click="loadArcade()"
                />
              </div>
              <div>
                <BaseButton
                  color="danger"
                  label="Delete Arcade"
                  @click="adminDeleteArcade()"
                />
              </div>
            </CardBox>

            <CardBox class="mb-6">
              <div class="mb-4">
                <PillTag
                  color="info"
                  label="Add Manager"
                  :icon="PhInfo"
                  class="mb-2"
                />
                <form class="h-full" @submit.prevent="addManager">
                  <FormField label="Username">
                    <FormControl
                      v-model="newManager"
                      name="username"
                      :options="userData"
                      required
                    />
                  </FormField>

                  <BaseButton
                    color="success"
                    type="submit"
                    label="Add Manager"
                  />
                </form>
              </div>

              <BaseDivider />

              <div class="mb-4">
                <PillTag color="warning" label="Managers" class="mb-4" />
                <div class="grid gap-4">
                  <CardBox
                    v-for="owner of arcadeData.owners"
                    :key="owner"
                    color-prop="bg-slate-800 dark:bg-slate-800"
                  >
                    <div class="flex justify-between items-center">
                      <div class="m-[-5px] md:flex items-center gap-2">
                        <div class="w-8 md:w-12">
                          <UserAvatar
                            :username="owner.username"
                            :avatar="owner.avatar"
                          />
                        </div>
                        <h1 class="text-lg lg:text-xl font-bold">
                          {{ owner.username }}
                        </h1>
                      </div>
                      <BaseButtons>
                        <BaseButton
                          label="Open Profile"
                          color="info"
                          @click="navigateToProfile(owner.id)"
                        />
                        <BaseButton
                          color="danger"
                          label="Remove"
                          @click="removeManager(owner.id)"
                        />
                      </BaseButtons>
                    </div>
                  </CardBox>
                </div>
              </div>
            </CardBox>
          </div>
        </template>

        <SectionTitleLine :icon="PhGear" title="Arcade Management" main />
        <CardBox is-form class="mb-6" @submit.prevent="updateArcade">
          <PillTag color="info" label="Settings" :icon="PhGear" class="mb-2" />
          <div
            class="grid grid-cols-1 w-full gap-2 md:gap-6 md:flex md:place-content-stretch"
          >
            <FormField
              v-for="setting of arcadeOptions"
              :key="setting.id"
              :label="setting.name"
              :help="setting.help"
            >
              <FormCheckRadio
                v-if="setting.type == 'Boolean'"
                :name="setting.id"
                :model-value="
                  Boolean(getNestedValue(optionForm, setting.id) ?? false)
                "
                :input-value="true"
                type="switch"
                @update:model-value="
                  (value) =>
                    setNestedValue(optionForm, setting.id, value ?? false)
                "
              />
            </FormField>
          </div>
          <div
            v-if="JSON.stringify(optionForm) !== JSON.stringify(bareForm)"
            class="space-x-2 mt-6"
          >
            <BaseButton color="success" label="Save" type="submit" />
            <BaseButton color="danger" label="Revert" @click="loadArcade()" />
          </div>
        </CardBox>

        <CardBox class="w-full md:w-1/2 mb-6">
          <h1 class="text-lg md:text-xl">OpenVPN Configuration</h1>
          <p class="pb-1 dark:text-white/50">
            Use this to download your VPN config.
          </p>
          <BaseButton
            :small="false"
            color="success"
            class="my-2"
            label="Export"
            @click="exportVPN()"
          />
        </CardBox>

        <SectionTitleLine :icon="PhStorefront" title="Arcade Overview" main />

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
          <CardBoxWidget
            :number="arcadeData?.machines?.length"
            label="Active Machines"
          />
        </div>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
