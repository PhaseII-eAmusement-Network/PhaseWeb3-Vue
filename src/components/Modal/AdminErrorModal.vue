<script setup>
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";

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
  <OverlayLayer v-if="active" :transparent="true">
    <CardBox
      class="w-11/12 lg:w-5/6 xl:w-3/4 max-h-[90vh] shadow-lg z-50 text-white/90 overflow-scroll"
    >
      <div class="space-y-5">
        <div>
          <h1 class="text-2xl font-bold">Exception Details</h1>
          <p>u should fix this 💯</p>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-semibold">Timestamp</span>
            <p>{{ event?.date }}</p>
          </div>
          <div>
            <span class="font-semibold">Service</span>
            <p>{{ event?.data?.service }}</p>
          </div>
          <div>
            <span class="font-semibold">PCBID</span>
            <p>{{ event?.data?.pcbid }}</p>
          </div>
          <div>
            <span class="font-semibold">Model</span>
            <p>{{ event?.data?.model }}</p>
          </div>
          <div>
            <span class="font-semibold">Request</span>
            <p>{{ event?.data?.requestName }}</p>
          </div>
          <div>
            <span class="font-semibold">Method</span>
            <p>{{ event?.data?.method }}</p>
          </div>
        </div>

        <div>
          <h2 class="font-semibold mb-2">Request</h2>
          <div
            class="bg-slate-950 rounded-lg border border-slate-700 max-h-[260px] overflow-auto"
          >
            <pre
              class="p-4 text-xs text-emerald-300 whitespace-pre font-mono"
            ><code>{{ formatXML(event?.data?.request) }}</code></pre>
          </div>
        </div>
        <div>
          <h2 class="font-semibold mb-2">Traceback</h2>
          <div
            class="bg-black rounded-lg border border-slate-700 max-h-[320px] overflow-auto"
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
