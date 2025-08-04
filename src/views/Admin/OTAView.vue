<script setup>
import { reactive } from "vue";
import { PhCloudArrowDown, PhCloudArrowUp } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";

const initUpdate = {
  name: "",
  game: "",
  mCode: "",
  fromDatecode: "",
  toDatecode: "",
  fileType: "",
  betaOnly: false,
};

const newUpdate = reactive({
  ...initUpdate,
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine
        :icon="PhCloudArrowDown"
        title="OTA Update Administration"
        color="text-sky-500"
        main
      />

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
        <CardBoxWidget :number="1" label="Active Updates" />
      </div>

      <SectionTitleLine
        :icon="PhCloudArrowUp"
        title="Add an Update"
        color="text-emerald-500"
        main
      />
      <CardBox is-form class="row-span-1">
        <FormField
          label="Update Name"
          help="This is only for documentation and does not change the update filepath."
        >
          <FormControl
            v-model="newUpdate.name"
            :input-value="newUpdate.name"
            name="updateName"
            required
          />
        </FormField>

        <FormField
          label="MCODE"
          help="The MCODE of the destination image. Leave blank for any MCODE (not recommended!). ex: JAB"
        >
          <FormControl
            v-model="newUpdate.mCode"
            :input-value="newUpdate.mCode"
            name="updateMCode"
            maxlength="3"
            minlength="3"
          />
        </FormField>

        <FormField
          label="Initial Datecode"
          help="The starting datecode, what will download this update. ex: 2024122600"
        >
          <FormControl
            v-model="newUpdate.fromDatecode"
            :input-value="newUpdate.fromDatecode"
            name="fromDatecode"
            maxlength="10"
            minlength="10"
            required
          />
        </FormField>

        <FormField
          label="Destination Datecode"
          help="The resulting datecode, what this update will contain. ex: 2024122700"
        >
          <FormControl
            v-model="newUpdate.toDatecode"
            :input-value="newUpdate.toDatecode"
            name="toDatecode"
            maxlength="10"
            minlength="10"
            required
          />
        </FormField>

        <FormField
          label="Beta Restriction"
          help="Limit this update to machines registered to a beta testing arcade."
        >
          <FormCheckRadio
            v-model="newUpdate.betaOnly"
            :input-value="newUpdate.betaOnly"
            name="betaOnly"
            type="switch"
          />
        </FormField>

        <div>
          <BaseButton
            type="submit"
            color="success"
            label="Add Update"
            :small="false"
            @click="false"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
