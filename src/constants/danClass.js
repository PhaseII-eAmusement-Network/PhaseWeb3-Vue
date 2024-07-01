export class IIDXDanConstants {
  static danList = [
    { id: 0, label: "--", short: "--" },

    { id: 100, label: "7th Kyu (七級)", short: "七級" },
    { id: 200, label: "6th Kyu (六級)", short: "六級" },
    { id: 300, label: "5th Kyu (五級)", short: "五級" },
    { id: 400, label: "4th Kyu (四級)", short: "四級" },
    { id: 500, label: "3rd Kyu (三級)", short: "三級" },
    { id: 600, label: "2nd Kyu (二級)", short: "二級" },
    { id: 700, label: "1st Kyu (一級)", short: "一級" },

    { id: 800, label: "1st Dan (初段)", short: "初段" },
    { id: 900, label: "2nd Dan (二段)", short: "二段" },
    { id: 1000, label: "3rd Dan (三段)", short: "三段" },
    { id: 1100, label: "4th Dan (四段)", short: "四段" },
    { id: 1200, label: "5th Dan (五段)", short: "五段" },
    { id: 1300, label: "6th Dan (六段)", short: "六段" },
    { id: 1400, label: "7th Dan (七段)", short: "七段" },
    { id: 1500, label: "8th Dan (八段)", short: "八段" },
    { id: 1600, label: "9th Dan (九段)", short: "九段" },
    { id: 1700, label: "10th Dan (十段)", short: "十段" },
    { id: 1800, label: "Chuuden (中伝)", short: "中伝" },
    { id: 1900, label: "Kaiden (皆伝)", short: "皆伝" },
  ];
}

export function getIIDXDan(level) {
  if (level == 0) {
    return { id: 0, label: "--", short: "--" };
  }
  return IIDXDanConstants.danList.find((x) => x.id == level);
}
