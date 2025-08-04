<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  PhUser,
  PhJoystick,
  PhTrendUp,
  PhPlay,
  PhFire,
  PhMedal,
  PhRanking,
  PhUserGear,
  PhInfo,
  PhAt,
  PhPassword,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import PillTag from "@/components/PillTag.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import BaseButton from "@/components/BaseButton.vue";
import { getGameInfo } from "@/constants";
import { generateChartData } from "@/components/Charts/chart.config";
import { useMainStore } from "@/stores/main";
import { APIGetUser } from "@/stores/api/account";
import { APIAdminPutUser, APIAdminUpdatePassword } from "@/stores/api/admin";

const mainStore = useMainStore();
const $route = useRoute();
const $router = useRouter();
const reqUserId = $route.params.id;
const newUser = ref(null);
const userProfile = ref(null);
const userProfiles = ref(null);
const userScoreStats = ref(null);

async function loadUser() {
  try {
    userProfile.value = null;
    var data = await APIGetUser(reqUserId);
    if (!data.name) {
      data.name = "Unclaimed Account";
    }
    userProfile.value = data;
    newUser.value = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

onMounted(async () => {
  await loadUser();
  userProfiles.value = userProfile.value.profiles;
  userScoreStats.value = userProfile.value.userScoreStats;
});

const cumulativePlays = computed(() => {
  return userProfiles.value?.reduce(
    (total, user) => total + user.data.total_plays,
    0,
  );
});

const uniqueProfiles = computed(() => {
  return userProfiles.value?.length;
});

const longestStreak = computed(() => {
  const groupByDay = (timestamps) => {
    const dayMap = {};
    timestamps.forEach((timestamp) => {
      const day = new Date(timestamp * 1000).toISOString().split("T")[0];
      dayMap[day] = (dayMap[day] || 0) + 1;
    });
    return dayMap;
  };

  var maxStreak = 0;

  userProfiles.value?.forEach((user) => {
    const arcadeHistory = user.data?.arcade_history
      ? user.data?.arcade_history
      : {};
    const allTimestamps = [];

    Object.values(arcadeHistory).forEach((machines) => {
      Object.values(machines).forEach((timestamps) => {
        allTimestamps.push(...timestamps);
      });
    });

    const playsByDay = groupByDay(allTimestamps);

    const longestStreakForUser = Math.max(...Object.values(playsByDay));
    maxStreak = Math.max(maxStreak, longestStreakForUser);
  });

  return maxStreak;
});

function filterUserProfiles(userProfiles) {
  if (!userProfiles) {
    return;
  }

  var filteredProfiles = [];
  for (const profile of userProfiles) {
    const game = getGameInfo(profile.game);
    if (game && !game.skip) {
      filteredProfiles.push(profile);
    }
  }

  filteredProfiles.sort(function (x, y) {
    return y.data.last_play_timestamp - x.data.last_play_timestamp;
  });

  return filteredProfiles;
}

const today = new Date().toISOString().split("T")[0];

const totalAttempts = computed(() => {
  return userScoreStats.value?.attempts?.length || 0;
});

const totalRecords = computed(() => {
  return userScoreStats.value?.records?.length || 0;
});

const todayAttempts = computed(() => {
  return (
    userScoreStats.value?.attempts?.filter((a) => {
      const attemptDate = new Date(a.timestamp * 1000)
        .toISOString()
        .split("T")[0];
      return attemptDate === today;
    }).length || 0
  );
});

const todayRecords = computed(() => {
  return (
    userScoreStats.value?.records?.filter((r) => {
      const recordDate = new Date(r.timestamp * 1000)
        .toISOString()
        .split("T")[0];
      return recordDate === today;
    }).length || 0
  );
});

const todayPlays = computed(() => {
  const todayStr = new Date().toISOString().split("T")[0];
  let total = 0;

  userProfiles.value?.forEach((profile) => {
    const arcadeHistory = profile.data?.arcade_history || {};

    Object.values(arcadeHistory).forEach((machines) => {
      Object.values(machines).forEach((timestamps) => {
        timestamps.forEach((ts) => {
          const dateStr = new Date(ts * 1000).toISOString().split("T")[0];
          if (dateStr === todayStr) {
            total++;
          }
        });
      });
    });
  });

  return total;
});

const cardBoxes = ref([
  {
    label: "Cumulative Plays",
    icon: PhPlay,
    iconColor: "text-emerald-600",
    suffix: "play",
    number: cumulativePlays,
  },
  {
    label: "Games Played",
    icon: PhJoystick,
    iconColor: "text-sky-300",
    suffix: "game",
    number: uniqueProfiles,
  },
  {
    label: "Plays Today",
    icon: PhPlay,
    iconColor: "text-sky-300",
    suffix: "play",
    number: todayPlays,
  },
  {
    label: "Longest Play Streak",
    icon: PhFire,
    iconColor: "text-red-500",
    suffix: "play",
    number: longestStreak,
  },
  {
    label: "Total Records",
    icon: PhRanking,
    iconColor: "text-amber-400",
    suffix: "record",
    number: totalRecords,
  },
  {
    label: "Total Attempts",
    icon: PhMedal,
    iconColor: "text-pink-300",
    suffix: "attempt",
    number: totalAttempts,
  },
  {
    label: "Records Today",
    icon: PhRanking,
    iconColor: "text-amber-400",
    suffix: "record",
    number: todayRecords,
  },
  {
    label: "Attempts Today",
    icon: PhMedal,
    iconColor: "text-sky-300",
    suffix: "attempt",
    number: todayAttempts,
  },
]);

function pinInput(event) {
  event.target.value = event.target.value.replace(/\D/g, "");
}

async function adminUpdateUser() {
  const response = await APIAdminPutUser(reqUserId, newUser.value);
  if (response.status !== "success") {
    window.alert("Failed to update user!");
  } else {
    loadUser();
  }
}

const passwordForm = reactive({
  newPassword: "",
  confirmPassword: "",
});

async function adminSubmitPassword() {
  const response = await APIAdminUpdatePassword(
    reqUserId,
    passwordForm.newPassword,
    passwordForm.confirmPassword,
  );
  if (response.status == "success") {
    alert("Password changed.");
    passwordForm.newPassword = null;
    passwordForm.confirmPassword = null;
    await loadUser();
  } else {
    alert("Failed to update password. Check that both passwords match.");
  }
}

const openArcade = (item) => {
  const arcadeId = item.id;
  $router.push(`/arcade/${arcadeId}`);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="userProfile !== null">
        <SectionTitleLine
          :icon="PhUser"
          :title="`${userProfile.name}'s Profile`"
          main
        />
        <UserCard class="mb-6" :override-profile="userProfile" use-small />

        <template v-if="mainStore.userAdmin">
          <SectionTitleLine
            :icon="PhUserGear"
            title="User Administration"
            main
          />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CardBox is-form class="" @submit.prevent="adminUpdateUser">
              <PillTag
                color="info"
                label="General Information"
                :icon="PhInfo"
                class="mb-2"
              />
              <div class="grid md:grid-cols-2 gap-x-4 mb-6">
                <FormField label="Username">
                  <FormControl
                    v-model="newUser.name"
                    :input-value="newUser.name"
                    name="username"
                    required
                  />
                </FormField>

                <FormField
                  label="E-mail"
                  help="Used for password resetting and 2FA"
                >
                  <FormControl
                    v-model="newUser.email"
                    :icon="PhAt"
                    type="email"
                    name="email"
                    required
                  />
                </FormField>

                <FormField label="PIN" help="Used when logging into a game">
                  <FormControl
                    v-model="newUser.pin"
                    :icon="PhPassword"
                    type="password"
                    name="pin"
                    :minlength="4"
                    :maxlength="4"
                    inputmode="numeric"
                    pattern="\d{4}"
                    @input="pinInput"
                  />
                </FormField>
              </div>

              <FormField
                label="Public Profile"
                help="Show this profile publicly. If disabled, only game profiles and scores will be visible."
              >
                <FormCheckRadio
                  v-model="newUser.public"
                  name="public"
                  :model-value="newUser.public"
                  :input-value="newUser.public"
                  type="switch"
                />
              </FormField>

              <FormField
                label="Ban Profile"
                help="Ban this profile. Locks out all arcades that this user manages."
              >
                <FormCheckRadio
                  v-model="newUser.banned"
                  name="banned"
                  :model-value="newUser.banned"
                  :input-value="newUser.banned"
                  type="switch"
                />
              </FormField>

              <div
                v-if="JSON.stringify(userProfile) !== JSON.stringify(newUser)"
                class="space-x-2 mt-6 mb-4"
              >
                <BaseButton color="success" label="Save" type="submit" />
                <BaseButton
                  color="warning"
                  label="Revert"
                  @click="loadUser()"
                />
              </div>
            </CardBox>
            <CardBox is-form @submit.prevent="adminSubmitPassword()">
              <PillTag color="info" label="Change Password" class="mb-2" />
              <FormField label="New Password">
                <FormControl
                  v-model="passwordForm.newPassword"
                  :icon="PhPassword"
                  name="newPassword"
                  type="password"
                  required
                />
              </FormField>

              <FormField label="Confirm Password">
                <FormControl
                  v-model="passwordForm.confirmPassword"
                  :icon="PhPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </FormField>

              <template #footer>
                <BaseButton type="submit" color="success" label="Update" />
              </template>
            </CardBox>
            <CardBox v-if="userProfile?.arcades?.length" class="mb-6">
              <PillTag color="info" label="Arcades" class="mb-2" />
              <div class="grid gap-4 md:grid-cols-2">
                <div
                  v-for="arcade of userProfile.arcades"
                  :key="arcade.id"
                  class="bg-slate-800 p-4 rounded-xl"
                >
                  <div
                    class="grid grid-cols-1 gap-4 xl:flex w-full place-content-between"
                  >
                    <div>
                      <h1 class="text-md md:text-lg">{{ arcade.name }}</h1>
                    </div>

                    <div class="flex align-middle mt-2 md:mt-0 max-h-12">
                      <BaseButton
                        label="Open Arcade"
                        color="info"
                        @click="openArcade(arcade)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
        </template>

        <SectionTitleLine :icon="PhTrendUp" title="Quick Stats" main />
        <div
          class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 mb-6"
        >
          <template v-for="box of cardBoxes" :key="box.label">
            <CardBoxWidget
              v-if="box.number"
              :icon="box.icon"
              :number="box.number"
              :label="box.label"
              :suffix="`${box.suffix}${box.number == 1 ? '' : 's'}`"
              :icon-color="box.iconColor"
            />
          </template>
        </div>

        <SectionTitleLine :icon="PhJoystick" title="Showcase" main />
        <div
          class="grid grid-flow-row auto-rows-auto grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-6 gap-5 mb-5"
        >
          <CardBoxGameStat
            v-for="profile of filterUserProfiles(userProfiles)"
            :key="profile.game"
            :game="profile.game"
            :value="profile.data.total_plays"
            :user-id="reqUserId"
            :profile-name="profile?.username"
            type="plays"
          />
        </div>

        <SectionTitleLine :icon="PhTrendUp" title="Play Trends" main />
        <CardBox class="mb-6">
          <div v-if="userProfiles">
            <LineChart
              :data="generateChartData(userProfiles, userScoreStats)"
              class="h-96"
            />
          </div>
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
