<script setup>
import { reactive } from "vue";
import { mdiInformationOutline, mdiCogOutline, mdiSailBoat } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";
import BaseButton from "@/components/BaseButton.vue";

import { generatePCBID } from "@/constants/pcbid.js";

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

function addMachine() {
  if (newMachine.generatePCBID) {
    newMachine.PCBID = generatePCBID();
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
            <FormControl v-model="newArcade.name" name="arcadeName" required />
          </FormField>
          <FormField
            label="Use Discord"
            help="Automated provisioning rather than manual. BadManiac will DM the user via Discord."
          >
            <FormCheckRadio
              v-model="newArcade.useDiscord"
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
              name="discordId"
              required
            />
          </FormField>
          <FormField
            v-if="!newArcade.useDiscord"
            v-model="newArcade.description"
            label="Description"
            help="Manual description rather than automated."
          >
            <FormControl name="description" required />
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
            label="Create Arcade with Discord"
            :small="false"
          />
          <BaseButton
            type="submit"
            color="success"
            label="Create Arcade with VPN"
            :small="false"
          />
          <BaseButton
            type="submit"
            color="info"
            label="Create Arcade"
            :small="false"
          />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
