import {
  mdiMonitor,
  mdiNewspaperVariant,
  mdiStorefront,
  mdiStoreCog,
  mdiGamepad,
} from "@mdi/js";

import { gameData, arcadeList } from "./constants";

var sortedMenu = [];
for (const game of gameData) {
  if (!game.skip) {
    sortedMenu.push({
      label: game.name,
      menu: [
        { label: "Overview", to: `/${game.id}` },
        { label: "Network Records", to: `/${game.id}/records/all` },
        { label: "Network Scores", to: `/${game.id}/scores/all` },
        { label: "Personal Records", to: `/${game.id}/records/personal` },
        { label: "Personal Scores", to: `/${game.id}/scores/personal` },
      ],
    });
  }
}

var sortedArcades = [];
for (const arcade of arcadeList) {
  if (!arcade.skip) {
    sortedArcades.push({
      label: arcade.name,
      menu: [
        { label: "Overview", to: `/arcade/${arcade.id}` },
        { label: "Event Settings", to: `/arcade/${arcade.id}/events` },
        { label: "Machine List", to: `/arcade/${arcade.id}/machines` },
        { label: "PASELI Transactions", to: `/arcade/${arcade.id}/paseli` },
      ],
    });
  }
}

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
    to: "/arcades",
    icon: mdiStorefront,
    label: "Public Arcades",
  },
  {
    label: "My Arcades",
    icon: mdiStoreCog,
    menu: sortedArcades,
  },
  {
    label: "Games",
    icon: mdiGamepad,
    menu: sortedMenu,
  },
];
