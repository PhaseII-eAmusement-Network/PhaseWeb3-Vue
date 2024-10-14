import { GameConstants } from "..";
import { DDROptions } from "./ddrOptions";
import { SDVXOptions } from "./sdvxOptions";
import { IIDXOptions } from "./iidxOptions";
import { GITADORAOptions } from "./gitadoraOptions";

export function getGameOptions(game, version) {
  var options = [
    {
      id: "username",
      name: "Username",
      help: "Set your username for this profile",
      type: "String",
      maxLength: 8,
    },
  ];

  const gameOptionsMap = {
    [GameConstants.DDR]: DDROptions,
    [GameConstants.DDROMNI]: DDROptions,
    [GameConstants.IIDX]: IIDXOptions,
    [GameConstants.IIDXCLASS]: IIDXOptions,
    [GameConstants.GITADORA_GF]: GITADORAOptions,
    [GameConstants.GITADORA_DM]: GITADORAOptions,
    [GameConstants.SDVX]: SDVXOptions,
  };

  const gameOptions = gameOptionsMap[game.id]?.[version];
  if (gameOptions) {
    options.push(...gameOptions);
  }

  return options;
}
