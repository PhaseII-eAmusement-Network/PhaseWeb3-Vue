import {
  mdiMonitor,
  mdiGamepadCircleOutline,
  mdiNewspaperVariant,
} from "@mdi/js";

export default [
  {
    to: "/",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    to: "/news",
    icon: mdiNewspaperVariant,
    label: "News",
  },
  {
    label: "Arcades",
    icon: mdiGamepadCircleOutline,
    menu: [
      {
        label: "Test Arcade",
        to: "/arcade/0",
      },
    ],
  },
];
