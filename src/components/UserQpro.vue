<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
  version: {
    type: Number,
    default: 14,
  },
  size: {
    type: Number,
    default: 128,
  },
});

const userProfile = ref(props.profile);

const assetPaths = computed(() => {
  const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
  const templatePath = `${ASSET_PATH}/qpro/${props.version}`;
  return {
    head: `${templatePath}/head/${userProfile.value.qpro?.head}`,
    hair: `${templatePath}/hair/${userProfile.value.qpro?.hair}`,
    face: `${templatePath}/face/${userProfile.value.qpro?.face}`,
    body: `${templatePath}/body/${userProfile.value.qpro?.body}`,
    hand: `${templatePath}/hand/${userProfile.value.qpro?.hand}`,
    bg: `${templatePath}/bg/${userProfile.value.qpro?.bg}`,
  };
});
</script>

<template>
  <div
    class="qpro-container relative w-full drop-shadow-xl mt-10 md:mt-0"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
  >
    <div class="qpro-character absolute w-full h-full">
      <!-- BG -->
      <img
        v-if="profile?.qpro?.bg"
        class="qpro-bg absolute"
        :src="assetPaths.bg + '_bg.png'"
        alt="bg"
        style="top: -50px; left: -6px; width: 150px"
      />

      <!-- Head Back -->
      <img
        class="qpro-head-back absolute"
        :src="assetPaths.head + '_b.png'"
        alt="Head Back"
        style="top: -20px; left: 10px; width: 90px"
      />

      <!-- Hair Back -->
      <img
        class="qpro-hair-back absolute"
        :src="assetPaths.hair + '_b.png'"
        alt="Hair Back"
        style="top: -20px; left: 17px; width: 90px"
      />

      <!-- Right Arm -->
      <img
        class="qpro-arm-right-upper absolute"
        :src="assetPaths.body + '_arm_r_upper.png'"
        alt="Right Arm Upper"
        style="top: 33px; left: -9px; width: 70px"
      />
      <img
        class="qpro-arm-right-lower absolute"
        :src="assetPaths.body + '_arm_r_lower.png'"
        alt="Right Arm Lower"
        style="top: 33px; left: -9px; width: 70px"
      />
      <img
        class="qpro-hand-right absolute"
        :src="assetPaths.hand + '_r.png'"
        alt="Right Hand"
        style="top: -25px; left: -18px; width: 90px"
      />

      <!-- Legs -->
      <img
        class="qpro-leg-left-lower absolute"
        :src="assetPaths.body + '_leg_l_lower.png'"
        alt="Left Leg Lower"
        style="top: 70px; left: 48px; width: 55px"
      />
      <img
        class="qpro-leg-left-upper absolute"
        :src="assetPaths.body + '_leg_l_upper.png'"
        alt="Left Leg Upper"
        style="top: 70px; left: 48px; width: 55px"
      />

      <img
        class="qpro-leg-right-lower absolute"
        :src="assetPaths.body + '_leg_r_lower.png'"
        alt="Right Leg Lower"
        style="top: 69.5px; left: 17.5px; width: 55px"
      />
      <img
        class="qpro-leg-right-upper absolute"
        :src="assetPaths.body + '_leg_r_upper.png'"
        alt="Right Leg Upper"
        style="top: 68px; left: 17px; width: 55px"
      />

      <!-- Body -->
      <img
        class="qpro-body-back absolute"
        :src="assetPaths.body + '_b.png'"
        alt="Body Back"
        style="top: -45px; left: 0px; width: auto"
      />
      <img
        class="qpro-body-front absolute"
        :src="assetPaths.body + '_f.png'"
        alt="Body Front"
        style="top: -45px; left: 0px; width: auto"
      />

      <!-- Face -->
      <img
        class="qpro-face absolute"
        :src="assetPaths.face + '.png'"
        alt="Face"
        style="top: -5px; left: 36px; width: 50px"
      />

      <!-- Hair Front -->
      <img
        class="qpro-hair-front absolute"
        :src="assetPaths.hair + '_f.png'"
        alt="Hair Front"
        style="top: -18.5px; left: 16px; width: 92px"
      />

      <!-- Left Arm -->
      <img
        class="qpro-arm-left-upper absolute"
        :src="assetPaths.body + '_arm_l_upper.png'"
        alt="Left Arm Upper"
        style="top: 35px; left: 60px; width: 70px"
      />
      <img
        class="qpro-arm-left-lower absolute"
        :src="assetPaths.body + '_arm_l_lower.png'"
        alt="Left Arm Lower"
        style="top: 35px; left: 60px; width: 70px"
      />
      <img
        class="qpro-hand-left absolute"
        :src="assetPaths.hand + '_l.png'"
        alt="Left Hand"
        style="top: -63px; left: 50px; width: 90px"
      />

      <!-- Head Front -->
      <img
        class="qpro-head-front absolute"
        :src="assetPaths.head + '_f.png'"
        alt="Head Front"
        style="top: -19px; left: 20px; width: 90px"
      />
    </div>
  </div>
</template>

<style scoped>
.qpro-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qpro-character img {
  width: auto;
  height: auto;
}
</style>
