import { getGameInfo, GameConstants } from "@/constants";

export function getFlareLevel(score) {
  const flareLevel = getGameInfo(GameConstants.DDR).flareLevel;
  const threshold = Object.keys(flareLevel)
    .map(Number)
    .sort((a, b) => a - b)
    .reduce((current, key) => (score >= key ? key : current), 0);

  const level = flareLevel[threshold];
  return {
    label: level?.label,
    color: level?.gradient ? level.gradient : level?.color,
    textColor: level?.gradient ? level.gradient : `text-[${level?.color}]`,
  };
}
