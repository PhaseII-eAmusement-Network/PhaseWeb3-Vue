import {
  mdiCogs,
  mdiAccount,
  mdiEmail,
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
        label: "Profile",
        to: "/profile",
      },
      {
        icon: mdiBrushOutline,
        label: "Customizations",
      },
      {
        icon: mdiServerNetwork,
        label: "Integrations",
      },
      {
        icon: mdiEmail,
        label: "Notifications",
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
