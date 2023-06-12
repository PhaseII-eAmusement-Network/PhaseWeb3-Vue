import {
  mdiCogs,
  mdiAccount,
  mdiLogout,
  mdiServerNetwork,
  mdiBrushOutline,
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
        icon: mdiBrushOutline,
        label: "Customizations",
        to: "/profile/customize",
      },
      {
        icon: mdiServerNetwork,
        label: "Integrations",
        to: "/profile/integrate",
      },
    ],
  },
  {
    icon: mdiCogs,
    label: "Edit Dashboard",
  },
  {
    icon: mdiLogout,
    label: "Log out",
    isLogout: true,
  },
];
