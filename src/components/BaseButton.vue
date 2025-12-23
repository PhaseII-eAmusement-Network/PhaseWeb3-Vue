<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { getButtonColor } from "@/colors.js";
import BaseIcon from "@/components/BaseIcon.vue";
import { useMainStore } from "@/stores/main";
import { PhShrimp } from "@phosphor-icons/vue";

const mainStore = useMainStore();

const props = defineProps({
  label: {
    type: [String, Number],
    default: null,
  },
  icon: {
    type: Object,
    default: null,
  },
  iconSize: {
    type: [String, Number],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: null,
  },
  to: {
    type: [String, Object],
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: "white",
  },
  as: {
    type: String,
    default: null,
  },
  small: {
    type: Boolean,
    default: true,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  active: Boolean,
  disabled: Boolean,
  roundedFull: {
    type: Boolean,
    default: true,
  },
  tooltip: {
    type: String,
    default: null,
  },
});

const is = computed(() => {
  if (props.as) {
    return props.as;
  }

  if (props.to) {
    return RouterLink;
  }

  if (props.href) {
    return "a";
  }

  return "button";
});

const computedType = computed(() => {
  if (is.value === "button") {
    return props.type ?? "button";
  }

  return null;
});

const labelClass = computed(() =>
  props.small && props.icon ? "px-1" : "px-2",
);

function buttonOutline(outlineProp, customize) {
  if (customize === undefined) {
    return outlineProp;
  } else {
    return customize;
  }
}

const componentClass = computed(() => {
  const base = [
    "inline-flex",
    "justify-center",
    "items-center",
    "whitespace-nowrap",
    "focus:outline-hidden",
    "transition-colors",
    "focus:ring",
    "duration-50",
    "border",
    "hover:scale-[1.02] hover:shadow-xl",
    props.disabled ? "cursor-not-allowed" : "cursor-pointer",
    props.roundedFull ? "rounded-lg" : "rounded-sm",
    getButtonColor(
      mainStore.userCustomize.shrimpLinks ? "sakura" : props.color,
      buttonOutline(props.outline, mainStore.userCustomize.buttonOutline),
      !props.disabled,
      props.active,
    ),
  ];

  if (!props.label && props.icon) {
    base.push("p-0");
  } else if (props.small) {
    base.push("text-sm", props.roundedFull ? "px-3 py-1" : "p-1");
  } else {
    base.push("py-2", props.roundedFull ? "px-6" : "px-3");
  }

  if (props.disabled) {
    base.push(props.outline ? "opacity-50" : "opacity-70");
  }

  return base;
});
</script>

<template>
  <component
    :is="is"
    :class="componentClass"
    :href="href"
    :type="computedType"
    :to="to"
    :target="target"
    :disabled="disabled"
  >
    <div
      v-if="tooltip"
      class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-sm bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
    >
      {{ tooltip }}
    </div>

    <template v-if="mainStore?.userCustomize?.shrimpLinks">
      <BaseIcon :icon="PhShrimp" :size="iconSize" />
    </template>
    <template v-else>
      <BaseIcon v-if="icon" :icon="icon" :size="iconSize" />
    </template>
    <span v-if="label" :class="labelClass">{{
      mainStore.userCustomize.shrimpLinks ? "Shrimp" : label
    }}</span>
  </component>
</template>
