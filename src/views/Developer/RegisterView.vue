<script setup>
import { reactive } from "vue";
import {
  PhCloudArrowUp,
  PhFileImage,
  PhKey,
  PhLinkSimple,
  PhStorefront,
  PhTextbox,
  PhWebhooksLogo,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import UserCard from "@/components/UserCard.vue";
import PillTag from "@/components/PillTag.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useMainStore } from "@/stores/main";
import { applicationIntents, applicationWebhooks } from "@/constants/developer";

const mainStore = useMainStore();

const appForm = reactive({
  name: "",
  about: "",
  image: null,
  useOAuth: false,
  callbackUri: null,
  intents: [],
  useWebhooks: false,
  webhookList: [],
});

const initWebhook = {
  type: "network.news",
  name: "",
  endpoint: "",
  authKey: "",
  fields: {},
};

const newWebhook = reactive({
  ...initWebhook,
});

const sortedArcades = mainStore.userArcades.map((arcade) => ({
  label: arcade.name,
  id: arcade.id,
}));

function isValidUrl(value, { requireHttps = true } = {}) {
  if (!value || typeof value !== "string") return false;

  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) return false;
    if (requireHttps && url.protocol !== "https:") return false;

    return true;
  } catch {
    return false;
  }
}

function isValidAuthKey(key) {
  return typeof key === "string" && key.length >= 40;
}

async function addWebhook() {
  const tmpWebhook = JSON.parse(
    JSON.stringify({
      type: newWebhook.type,
      name: newWebhook.name,
      endpoint: newWebhook.endpoint,
      authKey: newWebhook.authKey,
      fields: newWebhook.fields,
    }),
  );

  if (!tmpWebhook.name?.trim()) {
    return alert("Webhook name is required.");
  }
  if (!isValidUrl(tmpWebhook.endpoint)) {
    return alert("Webhook endpoint must be a valid HTTPS URL.");
  }
  if (!isValidAuthKey(tmpWebhook.authKey)) {
    return alert("Auth key must be at least 40 characters.");
  }

  const webhookMeta = applicationWebhooks.find((w) => w.id === tmpWebhook.type);
  if (webhookMeta?.fields?.includes("arcadeId")) {
    if (!tmpWebhook.fields.arcadeId) {
      return alert("Arcade selection is required.");
    }
  } else {
    tmpWebhook.fields = {};
  }

  appForm.webhookList.push(tmpWebhook);
  Object.assign(newWebhook, initWebhook);
}

function removeWebhook(authKey) {
  appForm.webhookList = appForm.webhookList.filter(
    (webhook) => webhook.authKey !== authKey,
  );
}

async function requestApp() {
  
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <SectionTitleLine
        :icon="PhCloudArrowUp"
        title="Create an Application"
        main
      />
      <CardBox class="row-span-2 mb-6">
        <PillTag color="info" label="General" class="mb-2" />
        <FormField label="Name">
          <FormControl
            v-model="appForm.name"
            :icon="PhTextbox"
            name="name"
            required
          />
        </FormField>
        <FormField label="About">
          <FormControl
            v-model="appForm.about"
            name="about"
            type="textarea"
            required
          />
        </FormField>
        <FormField label="App Logo">
          <FormFilePicker
            v-model="appForm.image"
            label="Image Upload"
            accept="image/*"
            :icon="PhFileImage"
          />
        </FormField>
      </CardBox>
      <CardBox class="row-span-2 mb-6">
        <PillTag color="warning" label="OAuth2.0" class="mb-2" />
        <FormField label="Enable OAuth">
          <FormCheckRadio
            v-model="appForm.useOAuth"
            name="useOAuth"
            :model-value="appForm.useOAuth"
            :input-value="appForm.useOAuth"
            type="switch"
          />
        </FormField>
        <template v-if="appForm.useOAuth">
          <FormField
            label="Callback URI"
            help="The URL that the user will be redirected to from the authorization page (ex: input of https://mycoolapp.my.domain/callback/url will redirect user to https://address/callback/url?code= )"
          >
            <FormControl
              v-model="appForm.callbackUri"
              :icon="PhLinkSimple"
              name="callbackUri"
              placeholder="https://my.domain/callback/url"
              required
            />
          </FormField>
          <FormField
            label="Intents"
            help="Select what you'd like your app to do"
          >
            <template v-for="intent in applicationIntents" :key="intent.id">
              <div class="grid md:flex justify-between">
                <FormCheckRadio
                  v-model="appForm.intents"
                  :name="'intents'"
                  :label="intent.label"
                  :input-value="intent.id"
                  type="checkbox"
                />
                <span
                  class="text-slate-400 hover:text-slate-200 font-thin transition-all delay-0"
                >
                  {{ intent.tip ?? "" }}
                </span>
              </div>
              <hr class="border-r my-3 w-full" />
            </template>
          </FormField>
        </template>
      </CardBox>
      <CardBox class="row-span-2 mb-6">
        <PillTag color="success" label="Webhooks" class="mb-2" />
        <FormField
          label="Enable Application Webhooks"
          help="These are different from user webhooks!"
        >
          <FormCheckRadio
            v-model="appForm.useWebhooks"
            name="useWebhooks"
            :model-value="appForm.useWebhooks"
            :input-value="appForm.useWebhooks"
            type="switch"
          />
        </FormField>
        <template v-if="appForm.useWebhooks">
          <div class="grid md:grid-cols-2 gap-6">
            <form class="h-full" @submit.prevent="addWebhook()">
              <PillTag color="info" label="New Webhook" class="mb-4" />
              <FormField
                label="Webhook Type"
                :help="
                  applicationWebhooks.find(
                    (webhook) => webhook.id === newWebhook.type,
                  )?.tip
                "
              >
                <FormControl
                  v-model="newWebhook.type"
                  name="type"
                  :icon="PhWebhooksLogo"
                  :options="applicationWebhooks"
                  required
                />
              </FormField>
              <FormField label="Name">
                <FormControl
                  v-model="newWebhook.name"
                  name="name"
                  :icon="PhTextbox"
                  required
                />
              </FormField>
              <FormField
                label="API Endpoint"
                help="The URL that the Webhook server will contact"
              >
                <FormControl
                  v-model="newWebhook.endpoint"
                  name="name"
                  placeholder="https://my.domain/endpoint/url"
                  :icon="PhLinkSimple"
                  required
                />
              </FormField>
              <FormField
                label="API Auth Key"
                help="Sent as headers x-api-key, x-webhook-key, authorization"
              >
                <FormControl
                  v-model="newWebhook.authKey"
                  name="authKey"
                  :icon="PhKey"
                  required
                  :minlength="40"
                />
              </FormField>
              <template
                v-for="field of applicationWebhooks.find(
                  (webhookData) => webhookData.id === newWebhook.type,
                )?.fields"
              >
                <template v-if="field === 'arcadeId'">
                  <FormField
                    label="Arcade"
                    help="The arcade that this Webhook will track"
                  >
                    <FormControl
                      v-model="newWebhook.fields.arcadeId"
                      name="arcadeId"
                      :icon="PhStorefront"
                      :options="sortedArcades"
                      required
                    />
                  </FormField>
                </template>
              </template>

              <BaseButton color="success" type="submit" label="Add Webhook" />
            </form>

            <div>
              <PillTag color="warning" label="Queue" class="mb-4" />
              <div class="grid gap-4">
                <CardBox
                  v-for="webhook of appForm.webhookList"
                  :key="webhook.type"
                  color-prop="bg-slate-800 dark:bg-slate-800"
                >
                  <div class="flex justify-between items-center">
                    <div class="m-[-5px]">
                      <PillTag
                        color="info"
                        :label="webhook.type"
                        class="mb-4"
                        small
                      />
                      <h1 class="text-md font-bold">{{ webhook.name }}</h1>
                      <samp
                        class="text-sm font-mono p-1 bg-slate-900 rounded-lg"
                      >
                        {{ webhook.endpoint }}
                      </samp>
                      <h2
                        v-for="(value, field) of webhook.fields"
                        class="text-sm font-mono mt-2"
                      >
                        {{ field }}: {{ value }}
                      </h2>
                    </div>
                    <BaseButton
                      color="danger"
                      label="Remove"
                      @click="removeWebhook(webhook.authKey)"
                    />
                  </div>
                </CardBox>
              </div>
            </div>
          </div>
        </template>
      </CardBox>
      <BaseButton
        :small="false"
        label="Submit"
        color="success"
        @click="console.log(appForm)"
      />
    </SectionMain>
  </LayoutAuthenticated>
</template>
