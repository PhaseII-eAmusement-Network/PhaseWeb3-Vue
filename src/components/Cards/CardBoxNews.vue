<script setup>
import CardBox from "@/components/CardBox.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: null,
  },
  date: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  read: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const router = useRouter();

function getCardStyle(cover) {
  if (cover !== null) {
    return `
    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .6)),
    url('${props.cover}');
    background-size: cover;
    background-repeat: no-repeat;
    `;
  }
}

function openNewsView() {
  router.push(`/news/${props.id}`);
}
</script>

<template>
  <button class="text-left" @click="openNewsView">
    <CardBox class="mb-2" :style="getCardStyle(props.cover)" has-table>
      <div
        class="hover:scale-[1.01] hover:shadow-xl hover:bg-slate-500 hover:dark:bg-slate-950/90 bg-slate-900/90 rounded-xl p-4 h-full w-full transition-all duration-10"
        :class="
          props.read
            ? `hover:outline outline-blue-500/50`
            : `outline outline-green-900/50`
        "
      >
        <div class="flex justify-between">
          <p class="text-sm">{{ props.date }}</p>
          <p
            v-if="!read"
            class="animated-text bg-gradient-to-r from-teal-400 to-yellow-200 bg-clip-text text-transparent"
          >
            Unread
          </p>
        </div>
        <hr class="pb-1" />
        <h2 class="text-xl pb-2">{{ props.title }}</h2>
      </div>
    </CardBox>
  </button>
</template>
