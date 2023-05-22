<script setup>
import { computed } from "vue";
import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTag from "@/components/PillTag.vue";
import UserAvatar from "@/components/UserAvatar.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
});

const pillType = computed(() => {
  if (props.type) {
    return props.type;
  }

  if (props.progress) {
    if (props.progress >= 60) {
      return "success";
    }
    if (props.progress >= 40) {
      return "warning";
    }

    return "danger";
  }

  return "info";
});

const pillIcon = computed(() => {
  return {
    success: mdiTrendingUp,
    warning: mdiTrendingNeutral,
    danger: mdiTrendingDown,
    info: null,
  }[pillType.value];
});

const pillText = computed(() => props.text ?? `${props.progress}%`);
</script>

<template>
  <CardBox class="mb-2" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start md:space-x-4">
        <UserAvatar class="w-12" :username="name" />
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-500 dark:text-slate-400">
            {{ date }} @ {{ login }}
          </p>
        </div>
      </BaseLevel>
      <PillTag :color="pillType" :label="pillText" :icon="pillIcon" />
    </BaseLevel>
  </CardBox>
</template>
