import { GameConstants } from "..";
import { DDROptions } from "./ddrOptions";
import { SDVXOptions } from "./sdvxOptions";
import { IIDXOptions } from "./iidxOptions";

export function getGameOptions(game, version) {
  var options = [
    {
      id: "username",
      name: "Username",
      help: "Set your username for this profile",
      type: "String",
    },
  ];

  if ([GameConstants.DDR, GameConstants.DDROMNI].includes(game.id)) {
    const gameOptions = DDROptions[version];
    if (gameOptions != undefined) {
      options = options.concat(gameOptions);
    }
  }

  if ([GameConstants.IIDX, GameConstants.IIDXCLASS].includes(game.id)) {
    const gameOptions = IIDXOptions[version];
    if (gameOptions != undefined) {
      options = options.concat(gameOptions);
    }
  }

  if (game.id == GameConstants.SDVX) {
    const gameOptions = SDVXOptions[version];
    if (gameOptions != undefined) {
      options = options.concat(gameOptions);
    }
  }

  return options;
}
