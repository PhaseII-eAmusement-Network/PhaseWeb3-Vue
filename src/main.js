import { createApp } from "vue";
import { createPinia } from "pinia";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/main.js";

import "./css/_base.css";

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.component("EasyDataTable", Vue3EasyDataTable);
app.component("VueDatePicker", VueDatePicker);

app.mount("#app");

useMainStore(pinia);

const defaultDocumentTitle = "PhaseII eAmusement Network";

router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
