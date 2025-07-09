<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  mdiInformationOutline,
  mdiCogOutline,
  mdiSailBoat,
  mdiCheckOutline,
  mdiCloseOutline,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";

import {
  checkArcadeName,
  checkPCBID,
  APIOnboardArcade,
} from "@/stores/api/admin";
import { onboardArcadeDiscord, exportVPNDiscord } from "@/stores/api/discord";
import { getGameInfo } from "@/constants";
import { generatePCBID } from "@/constants/pcbid.js";
import { useMainStore } from "@/stores/main";

const $route = useRoute();
const $router = useRouter();
const mainStore = useMainStore();

// Autofill a Base64 encoded object.
const inputData = $route.params.data;
const autofillData = ref(null);

function base64ToJson(base64) {
  try {
    const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const jsonString = new TextDecoder().decode(binary);

    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Invalid base64 input or JSON parse error:", e);
    return null;
  }
}

function validateOnboardingData(data) {
  const errors = [];
  if (typeof data !== "object" || data === null) {
    return ["data is not an object"];
  }

  if (typeof data.userId !== "string") errors.push("userId must be a string");
  if (typeof data.type !== "string") errors.push("type must be a string");
  if (typeof data.arcadeName !== "string")
    errors.push("arcadeName must be a string");
  if (typeof data.cabinetCount !== "number")
    errors.push("cabinetCount must be a number");
  if (!Array.isArray(data.games)) {
    errors.push("games must be an array");
  } else if (!data.games.every((g) => typeof g === "string")) {
    errors.push("games must be an array of strings");
  }

  return errors;
}

async function autofillArcade() {
  const data = autofillData.value;
  newArcade.useDiscord = true;
  newArcade.discordId = data.userId;
  newArcade.name = data.arcadeName;
  await checkName();

  for (const game of data.games) {
    if (game === "main") {
      newMachine.name = `${newArcade.name} Main`;
    } else {
      const gameData = getGameInfo(game);
      if (gameData) {
        newMachine.name = `${newArcade.name} ${
          gameData.shortName ? gameData.shortName : gameData.name
        }`;
      }
    }

    await addMachine();
  }
}

const initArcade = {
  name: "",
  useDiscord: true,
  discordId: "",
  description: "",
  paseli: true,
  infinitePaseli: true,
  maintenance: false,
  betas: false,
  incognito: false,
  machineList: [],
};

const initMachine = {
  name: "",
  cabinet: false,
  ota: false,
  generatePCBID: true,
  PCBID: "",
};

const newArcade = reactive({
  ...initArcade,
});

const newMachine = reactive({
  ...initMachine,
});

const arcadeCheck = ref(undefined);

if (inputData) {
  try {
    const decodedData = base64ToJson(inputData);
    const errorState = validateOnboardingData(decodedData);
    if (errorState.length) {
      console.error(errorState);
    } else {
      autofillData.value = JSON.parse(JSON.stringify(decodedData));
      autofillArcade();
    }
  } catch (error) {
    console.error(error);
  }
}

async function addMachine() {
  if (newMachine.generatePCBID) {
    newMachine.PCBID = generatePCBID();
  }

  while (!(await checkPCBID(newMachine.PCBID))) {
    if (newMachine.generatePCBID) {
      newMachine.PCBID = generatePCBID();
    } else {
      window.alert("PCBID already in use!");
      return;
    }
  }

  newArcade.machineList.push({
    name: newMachine.name,
    cabinet: newMachine.cabinet,
    ota: newMachine.ota,
    PCBID: newMachine.PCBID.toUpperCase(),
  });
  Object.assign(newMachine, initMachine);
}

function removeMachine(machinePCBID) {
  newArcade.machineList = newArcade.machineList.filter(
    (machine) => machine.PCBID !== machinePCBID
  );
}

async function checkName() {
  if (newArcade.name) {
    const data = await checkArcadeName(newArcade.name);
    if (data.unused != undefined) {
      arcadeCheck.value = data.unused;
    }
  }
}

function formatName(inputString, replaceWith = "NA_") {
  var asciiFriendly = [...inputString]
    .map((c) => {
      return c.charCodeAt(0) < 128 ? c : replaceWith;
    })
    .join("");

  asciiFriendly = asciiFriendly.replace(
    /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
    ""
  );

  asciiFriendly = asciiFriendly.replace(/\s+/g, "_");
  return asciiFriendly;
}

async function exportVPN(arcadeId, arcadeData) {
  try {
    const data = await mainStore.getArcadeVPN(arcadeId);
    const blob = new Blob([data], { type: "application/ovpn" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `gradius-${formatName(
      arcadeData.name
    )}-phaseii-config.ovpn`;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  } catch (error) {
    console.log("Failed to fetch arcade data:", error);
  }
}

async function onboardArcade(exportArcade) {
  if (newArcade.name == initArcade.name) {
    window.alert("Please input a name.");
    return;
  }
  if (
    newArcade.discordId == initArcade.discordId &&
    newArcade.useDiscord &&
    exportArcade
  ) {
    window.alert("Please input a Discord ID.");
    return;
  }
  if (
    newArcade.description == initArcade.description &&
    !newArcade.useDiscord
  ) {
    window.alert("Please input a description.");
    return;
  }

  const arcadeResponse = await APIOnboardArcade(newArcade);

  if (exportArcade && arcadeResponse.arcadeId) {
    if (newArcade.useDiscord) {
      await onboardArcadeDiscord(arcadeResponse.arcadeId, newArcade.discordId);
      await exportVPNDiscord(arcadeResponse.arcadeId, newArcade.discordId);
    } else {
      await exportVPN(arcadeResponse.arcadeId, newArcade);
    }
  }

  if (arcadeResponse.arcadeId) {
    window.alert("Onboarding complete!");
    $router.push({
      name: "arcade",
      params: {
        id: arcadeResponse.arcadeId,
      },
    });
  } else {
    window.alert("Failed to onboard!");
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine
        :icon="mdiSailBoat"
        title="Arcade Onboarding"
        color="text-green-400"
        main
      />

      <div class="grid grid-cols-1 gap-6">
        <CardBox is-form class="row-span-1">
          <PillTag
            color="info"
            label="General Information"
            :icon="mdiInformationOutline"
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
            <BaseButton color="info" label="Check Name" @click="checkName()" />
            <BaseIcon
              v-if="arcadeCheck == true"
              :path="mdiCheckOutline"
              color="text-green-400"
              size="25"
            />
            <BaseIcon
              v-else-if="arcadeCheck == false"
              :path="mdiCloseOutline"
              color="text-red-400"
              size="25"
            />
          </div>

          <FormField
            label="Use Discord"
            help="Automated provisioning rather than manual. BadManiac will DM the user via Discord."
          >
            <FormCheckRadio
              v-model="newArcade.useDiscord"
              :input-value="newArcade.useDiscord"
              name="useDiscord"
              type="switch"
            />
          </FormField>
          <FormField
            v-if="newArcade.useDiscord"
            label="Discord ID"
            help="Owner's Discord User ID."
          >
            <FormControl
              v-model="newArcade.discordId"
              :input-value="newArcade.discordId"
              name="discordId"
              required
            />
          </FormField>
          <FormField
            v-if="!newArcade.useDiscord"
            label="Description"
            help="Manual description rather than automated."
          >
            <FormControl
              v-model="newArcade.description"
              name="description"
              required
            />
          </FormField>
        </CardBox>

        <CardBox is-form class="row-span-1">
          <PillTag
            color="info"
            label="Settings"
            :icon="mdiCogOutline"
            class="mb-2"
          />
          <div
            class="grid grid-cols-1 w-full gap-2 md:gap-6 md:flex md:place-content-stretch"
          >
            <FormField
              label="PASELI Enabled"
              help="Enable or disable PASELI services."
            >
              <FormCheckRadio
                v-model="newArcade.paseli"
                :input-value="newArcade.paseli"
                name="paseli"
                type="switch"
              />
            </FormField>
            <FormField
              label="Infinite PASELI"
              help="Enable or disable infinite PASELI."
            >
              <FormCheckRadio
                v-model="newArcade.infinitePaseli"
                :input-value="newArcade.infinitePaseli"
                name="infinitePaseli"
                type="switch"
              />
            </FormField>
            <FormField
              label="Maintenance Mode"
              help="Place this arcade under Maintenance."
            >
              <FormCheckRadio
                v-model="newArcade.maintenance"
                :input-value="newArcade.maintenance"
                name="maintenance"
                type="switch"
              />
            </FormField>
            <FormField
              label="Incognito Mode"
              help="Hide the eAmusement network and ranking data."
            >
              <FormCheckRadio
                v-model="newArcade.incognito"
                :input-value="newArcade.incognito"
                name="incognito"
                type="switch"
              />
            </FormField>
            <FormField
              label="Beta Testing"
              help="Enable or disable beta testing."
            >
              <FormCheckRadio
                v-model="newArcade.betas"
                :input-value="newArcade.betas"
                name="betas"
                type="switch"
              />
            </FormField>
          </div>
        </CardBox>

        <CardBox class="row-span-1">
          <PillTag
            color="info"
            label="Machines"
            :icon="mdiInformationOutline"
            class="mb-2"
          />

          <div class="grid md:grid-cols-2 gap-6">
            <form class="h-full" @submit.prevent="addMachine()">
              <FormField
                label="Generate PCBID"
                help="Generate a PCBID rather than supply one."
              >
                <FormCheckRadio
                  v-model="newMachine.generatePCBID"
                  :input-value="newMachine.generatePCBID"
                  name="generatePCBID"
                  type="switch"
                />
              </FormField>
              <FormField v-if="!newMachine.generatePCBID" label="PCBID">
                <FormControl
                  v-model="newMachine.PCBID"
                  name="pcbid"
                  required
                  minlength="20"
                  maxlength="20"
                />
              </FormField>
              <FormField label="Name">
                <FormControl v-model="newMachine.name" name="name" required />
              </FormField>

              <div
                class="grid grid-cols-1 w-full gap-2 md:gap-6 md:flex md:place-content-stretch pb-4 md:pb-0"
              >
                <FormField
                  label="Arcade Cabinet"
                  help="If this is a real cabinet, enable this."
                >
                  <FormCheckRadio
                    v-model="newMachine.cabinet"
                    :input-value="newMachine.cabinet"
                    name="cabinet"
                    type="switch"
                  />
                </FormField>
                <FormField
                  label="Enable Updates"
                  help="Enables or disables OTA updates."
                >
                  <FormCheckRadio
                    v-model="newMachine.ota"
                    :input-value="newMachine.ota"
                    name="ota"
                    type="switch"
                  />
                </FormField>
              </div>

              <BaseButton color="success" type="submit" label="Add Machine" />
            </form>

            <div>
              <PillTag color="warning" label="Queue" class="mb-4" />
              <div class="grid gap-4">
                <CardBox
                  v-for="machine of newArcade.machineList"
                  :key="machine.name"
                  color-prop="bg-slate-800 dark:bg-slate-800"
                >
                  <div class="flex justify-between items-center">
                    <div class="m-[-5px]">
                      <h1 class="text-md font-bold">{{ machine.name }}</h1>
                      <h2 class="text-sm">
                        {{ machine.cabinet ? "Cabinet" : "Setup"
                        }}{{ machine.ota ? " - OTA Enabled" : null }}
                      </h2>
                      <h2 class="text-sm font-mono">
                        {{
                          machine.PCBID != "" ? machine.PCBID : "not generated"
                        }}
                      </h2>
                    </div>
                    <BaseButton
                      color="danger"
                      label="Remove"
                      @click="removeMachine(machine.PCBID)"
                    />
                  </div>
                </CardBox>
              </div>
            </div>
          </div>
        </CardBox>
        <div class="grid md:flex gap-4">
          <BaseButton
            type="submit"
            color="success"
            :label="
              newArcade.useDiscord
                ? 'Create Arcade with Discord'
                : 'Create Arcade and VPN'
            "
            :small="false"
            @click="onboardArcade(true)"
          />
          <BaseButton
            type="submit"
            color="info"
            label="Create Arcade"
            :small="false"
            @click="onboardArcade(false)"
          />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
