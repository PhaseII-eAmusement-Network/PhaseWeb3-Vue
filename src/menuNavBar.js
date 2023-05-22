import {
  mdiCogs,
  mdiAccount,
  mdiEmail,
  mdiLogout,
  mdiServerNetwork,
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
