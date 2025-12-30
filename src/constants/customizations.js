import { gameData } from "@/constants";

export class ProfileCustomizations {
  static baseCardList = [
    { id: "time", label: "Default" },
    { id: "carpet", label: "Arcade Carpet" },
    { id: "gradient", label: "Pink/Purple Gradient" },
    { id: "pride", label: "Pride Flag" },
    { id: "trans", label: "Trans Flag" },
    { id: "nonbinary", label: "Non-Binary Flag" },
    { id: "lesbian", label: "Lesbian Flag" },
    { id: "loveplus", label: "LovePlus" },
    { id: "paint", label: "i eat paint" },
    { id: "shrimp", label: "Shrimp" },
  ];

  static get cardList() {
    const gameCards = gameData
      .filter((game) => !game.skip)
      .map((game) => ({
        id: game.assetId ? game.assetId : game.id,
        label: game.name,
      }));

    return [...this.baseCardList, ...gameCards];
  }

  static borderList = [
    { id: "", label: "None" },
    { id: "test", label: "Basic" },
    { id: "swirl", label: "Swirl" },
    { id: "pride", label: "Pride Flag" },
    { id: "trans", label: "Trans Flag" },
    { id: "nonbinary", label: "Non-Binary Flag" },
    { id: "lesbian", label: "Lesbian Flag" },
    { id: "leaves", label: "Leaves" },
  ];

  static iconFillList = [
    { id: 0, label: "Regular" },
    { id: 1, label: "Thin" },
    { id: 2, label: "Light" },
    { id: 3, label: "Bold" },
    { id: 4, label: "Filled" },
    { id: 5, label: "Duotone" },
  ];
}
