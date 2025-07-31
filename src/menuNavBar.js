import {
  mdiAccount,
  mdiLogout,
  mdiBrushVariant,
  mdiServerNetwork,
  mdiCardAccountDetailsOutline,
  mdiAccountArrowLeftOutline,
} from "@mdi/js";

export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: "Settings",
        to: "/profile",
      },
      {
        icon: mdiBrushVariant,
        label: "Customize",
        to: "/profile/customize",
      },
      {
        icon: mdiServerNetwork,
        label: "Integrations",
        to: "/profile/integrate",
      },
      {
        icon: mdiCardAccountDetailsOutline,
        label: "Login Cards",
        to: "/profile/cards",
      },
      {
        icon: mdiAccountArrowLeftOutline,
        label: "Claim Profile",
        to: "/profile/claim",
      },
    ],
  },
  {
    icon: mdiLogout,
    label: "Log out",
    isLogout: true,
  },
];
