<script setup>
import { ref, computed, defineProps } from "vue";

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
  const templatePath = `https://web3.phaseii.network/gameassets/qpro/${props.version}`;
  return {
    head: `${templatePath}/head/${userProfile.value.qpro?.head}`,
    hair: `${templatePath}/hair/${userProfile.value.qpro?.hair}`,
    face: `${templatePath}/face/${userProfile.value.qpro?.face}`,
    body: `${templatePath}/body/${userProfile.value.qpro?.body}`,
    hand: `${templatePath}/hand/${userProfile.value.qpro?.hand}`,
  };
});
</script>

<template>
  <div
    class="justify-center items-center mb-4 md:mb-0 drop-shadow-xl"
    :style="{ width: `${props.size}px`, height: `${props.size}px`, relative }"
  >
    <div class="qpro-character relative w-full h-full">
      <!-- Hair Back -->
      <img
        class="qpro-hair-back absolute"
        :src="assetPaths.hair + '_b.png'"
        alt="Hair Back"
        style="top: -22px; left: 6px; width: 90px"
      />

      <!-- Right Arm -->
      <img
        class="qpro-arm-right-upper absolute"
        :src="assetPaths.body + '_arm_r_upper.png'"
        alt="Right Arm Upper"
        style="top: 33px; left: -15px; width: 70px"
      />
      <img
        class="qpro-arm-right-lower absolute"
        :src="assetPaths.body + '_arm_r_lower.png'"
        alt="Right Arm Lower"
        style="top: 33px; left: -15px; width: 70px"
      />

      <!-- Legs -->
      <img
        class="qpro-leg-left-upper absolute"
        :src="assetPaths.body + '_leg_l_upper.png'"
        alt="Left Leg Upper"
        style="top: 70px; left: 42px; width: 55px"
      />
      <img
        class="qpro-leg-left-lower absolute"
        :src="assetPaths.body + '_leg_l_lower.png'"
        alt="Left Leg Lower"
        style="top: 70px; left: 42px; width: 55px"
      />
      <img
        class="qpro-leg-right-upper absolute"
        :src="assetPaths.body + '_leg_r_upper.png'"
        alt="Right Leg Upper"
        style="top: 67px; left: 12px; width: 55px"
      />
      <img
        class="qpro-leg-right-lower absolute"
        :src="assetPaths.body + '_leg_r_lower.png'"
        alt="Right Leg Lower"
        style="top: 67px; left: 12px; width: 55px"
      />

      <!-- Body -->
      <img
        class="qpro-body-back absolute"
        :src="assetPaths.body + '_b.png'"
        alt="Body Back"
        style="top: -45px; left: -6px; width: 400px"
      />
      <img
        class="qpro-body-front absolute"
        :src="assetPaths.body + '_f.png'"
        alt="Body Front"
        style="top: -45px; left: -6px; width: 400px"
      />

      <!-- Head -->
      <img
        class="qpro-head-back absolute"
        :src="assetPaths.head + '_b.png'"
        alt="Head Back"
        style="top: -5px; left: 30px; width: 50px"
      />
      <img
        class="qpro-head-front absolute"
        :src="assetPaths.head + '_f.png'"
        alt="Head Front"
        style="top: -5px; left: 30px; width: 50px"
      />

      <!-- Face -->
      <img
        class="qpro-face absolute"
        :src="assetPaths.face + '.png'"
        alt="Face"
        style="top: -5px; left: 30px; width: 50px"
      />

      <!-- Hair Front -->
      <img
        class="qpro-hair-front absolute"
        :src="assetPaths.hair + '_f.png'"
        alt="Hair Front"
        style="top: -23px; left: 9px; width: 96px"
      />

      <!-- Left Arm -->
      <img
        class="qpro-arm-left-upper absolute"
        :src="assetPaths.body + '_arm_l_upper.png'"
        alt="Left Arm Upper"
        style="top: 35px; left: 53px; width: 70px"
      />
      <img
        class="qpro-arm-left-lower absolute"
        :src="assetPaths.body + '_arm_l_lower.png'"
        alt="Left Arm Lower"
        style="top: 35px; left: 53px; width: 70px"
      />

      <!-- Hands -->
      <img
        class="qpro-hand-left absolute"
        :src="assetPaths.hand + '_l.png'"
        alt="Left Hand"
        style="top: 35px; left: 53px; width: 70px"
      />
      <img
        class="qpro-hand-right absolute"
        :src="assetPaths.hand + '_r.png'"
        alt="Right Hand"
        style="top: 0px; left: -10px; width: 70px"
      />
    </div>
  </div>
</template>

<style scoped>
.qpro-character img {
  width: auto;
  height: auto;
}
</style>
