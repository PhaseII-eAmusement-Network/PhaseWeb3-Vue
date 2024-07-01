import {
  mdiAccount,
  mdiLogout,
  mdiServerNetwork,
  mdiCardAccountDetailsOutline,
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
        icon: mdiServerNetwork,
        label: "Integrations",
        to: "/profile/integrate",
      },
      {
        icon: mdiCardAccountDetailsOutline,
        label: "Login Cards",
        to: "/profile/cards",
      },
    ],
  },
  // {
  //   to: "/goals",
  //   icon: mdiFlagCheckered,
  //   label: "Goals",
  // },
  // {
  //   icon: mdiCogs,
  //   label: "Edit Dashboard",
  // },
  {
    icon: mdiLogout,
    label: "Log out",
    isLogout: true,
  },
];
