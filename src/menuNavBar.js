import {
  PhUser,
  PhSignOut,
  PhPaintBrushBroad,
  PhCloud,
  PhIdentificationCard,
  PhUserSwitch,
} from "@phosphor-icons/vue";

export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: PhUser,
        label: "Settings",
        to: "/profile",
      },
      {
        icon: PhPaintBrushBroad,
        label: "Customize",
        to: "/profile/customize",
      },
      {
        icon: PhCloud,
        label: "Integrations",
        to: "/profile/integrate",
      },
      {
        icon: PhIdentificationCard,
        label: "Login Cards",
        to: "/profile/cards",
      },
      {
        icon: PhUserSwitch,
        label: "Claim Profile",
        to: "/profile/claim",
      },
    ],
  },
  {
    icon: PhSignOut,
    fill: "regular",
    label: "Log out",
    isLogout: true,
  },
];
