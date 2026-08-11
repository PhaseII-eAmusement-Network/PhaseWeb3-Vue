<script setup>
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import { getNestedValue } from "@/constants/values";

const errorTypes = [
  {
    label: "Timestamp",
    id: "date",
  },
  {
    label: "Service",
    id: "data.service",
  },
  {
    label: "PCBID",
    id: "data.pcbid",
  },
  {
    label: "Model",
    id: "data.model",
  },
  {
    label: "Request",
    id: "data.requestName",
  },
  {
    label: "Method",
    id: "data.method",
  },
];

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  event: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}

function formatXML(xml) {
  if (!xml) return "";

  const PADDING = "  ";
  const reg = /(>)(<)(\/*)/g;
  let formatted = "";
  let pad = 0;

  xml = xml.replace(reg, "$1\n$2$3");

  xml.split("\n").forEach((node) => {
    let indent = 0;

    if (node.match(/^<\/.+/)) {
      pad -= 1;
    } else if (node.match(/^<[^!?]+[^/]>.*/)) {
      indent = 1;
    }

    formatted += PADDING.repeat(Math.max(pad, 0)) + node + "\n";
    pad += indent;
  });

  return formatted.trim();
}
</script>

<template>
  <OverlayLayer v-if="active" :transparent="true" @overlay-click="close">
    <CardBox
      class="w-11/12 lg:w-5/6 xl:w-3/4 max-h-screen shadow-lg z-50 text-white/90 overflow-scroll"
    >
      <div class="space-y-5">
        <div>
          <h1 class="text-2xl font-bold">Exception Details</h1>
          <p>u should fix this 💯</p>
        </div>
        <div
          class="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 text-sm"
        >
          <template v-for="type of errorTypes">
            <div v-if="getNestedValue(event, type.id)">
              <span class="font-semibold">{{ type.label }}</span>
              <p>{{ getNestedValue(event, type.id) }}</p>
            </div>
          </template>
        </div>

        <div>
          <h2 class="font-semibold mb-2">Request</h2>
          <div
            class="bg-slate-950 rounded-lg border border-slate-700 max-h-65 overflow-scroll"
          >
            <pre
              class="p-4 text-xs text-emerald-300 whitespace-pre font-mono"
            ><code>{{ formatXML(event?.data?.request) }}</code></pre>
          </div>
        </div>
        <div>
          <h2 class="font-semibold mb-2">Traceback</h2>
          <div
            class="bg-black rounded-lg border border-slate-700 max-h-80 overflow-scroll"
          >
            <pre
              class="p-4 text-xs text-red-300 whitespace-pre-wrap break-all font-mono"
            ><code>{{ event?.data?.traceback }}</code></pre>
          </div>
        </div>

        <BaseButtons>
          <BaseButton color="success" label="Close" @click="close" />
        </BaseButtons>
      </div>
    </CardBox>
  </OverlayLayer>
</template>
