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
    const menuItems = [
      "overview",
      "rivals",
      "net_records",
      "net_scores",
      "my_records",
      "my_scores",
    ];
    var menu = [];

    for (const item of menuItems) {
      if (item === "overview") {
        menu.push({ label: "Overview", to: `/games/${game.id}` });
      } else if (item == "rivals" && !game.noRivals) {
        menu.push({ label: "Rivals", to: `/games/${game.id}/rivals` });
      } else if (item == "net_records" && !game.noRecords) {
        menu.push({
          label: "Network Records",
          to: `/games/${game.id}/records`,
        });
      } else if (item == "net_scores" && !game.noScores) {
        menu.push({
          label: "Network Scores",
          to: `/games/${game.id}/scores`,
        });
      } else if (item == "my_records" && !game.noRecords) {
        menu.push({
          label: "Personal Records",
          to: `/games/${game.id}/records/1`,
        });
      } else if (item == "my_scores" && !game.noScores) {
        menu.push({
          label: "Personal Scores",
          to: `/games/${game.id}/scores/1`,
        });
      }
    }

    sortedMenu.push({
      label: game.shortName ? game.shortName : game.name,
      menu: menu,
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
        { label: "PASELI", to: `/arcade/${arcade.id}/paseli` },
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
