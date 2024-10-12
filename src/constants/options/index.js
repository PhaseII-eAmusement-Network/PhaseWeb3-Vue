import { GameConstants } from "..";
import { DDROptions } from "./ddrOptions";

export function getGameOptions(game, version) {
  var options = [
    {
      id: "username",
      name: "Username",
      help: "Set your username for this profile",
      type: String,
    },
  ];

  if ([GameConstants.DDR, GameConstants.DDROMNI].includes(game.id)) {
    const gameOptions = DDROptions[version];
    if (gameOptions != undefined) {
      options = options.concat(gameOptions);
    }
  }

  return options;
}
