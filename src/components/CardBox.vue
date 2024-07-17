<script setup>
import { computed, useSlots, ref } from "vue";
import CardBoxComponentBody from "@/components/CardBoxComponentBody.vue";
import CardBoxComponentFooter from "@/components/CardBoxComponentFooter.vue";

const props = defineProps({
  rounded: {
    type: String,
    default: "rounded-2xl",
  },
  flex: {
    type: String,
    default: "flex-col",
  },
  hasComponentLayout: Boolean,
  hasTable: Boolean,
  isForm: Boolean,
  isHoverable: Boolean,
  isAuth: {
    type: Boolean,
    default: false,
  },
  colorProp: {
    type: String,
    default: "bg-slate-900 dark:bg-slate-900",
  },
});

const emit = defineEmits(["submit"]);

const slots = useSlots();

const hasFooterSlot = computed(() => slots.footer && !!slots.footer());

const color = ref(props.colorProp);

if (props.isAuth) {
  color.value =
    "bg-slate-800 md:bg-slate-900 dark:bg-slate-800 md:dark:bg-slate-900";
}

const componentClass = computed(() => {
  const base = [props.rounded, props.flex, color.value];

  if (props.isHoverable) {
    base.push("hover:shadow-lg transition-shadow duration-500");
  }

  return base;
});

const submit = (event) => {
  emit("submit", event);
};
</script>

<template>
  <component
    :is="isForm ? 'form' : 'div'"
    :class="componentClass"
    class="bg-white flex"
    @submit="submit"
  >
    <slot v-if="hasComponentLayout" />
    <template v-else>
      <CardBoxComponentBody :no-padding="hasTable">
        <slot />
      </CardBoxComponentBody>
      <CardBoxComponentFooter v-if="hasFooterSlot">
        <slot name="footer" />
      </CardBoxComponentFooter>
    </template>
  </component>
</template>
