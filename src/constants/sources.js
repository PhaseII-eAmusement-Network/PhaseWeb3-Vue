const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;
export function getSources(game, version) {
  if (!version) {
    return game?.cardBG;
  } else {
    return `${ASSET_PATH}/games/${game.id}/card/${version}.webp`;
  }
}

export function getVideoSource(game, version) {
  if (version && game.videoTable?.includes(version)) {
    const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
    return `${ASSET_PATH}/video/${game.id}/${version}.mp4`;
  } else {
    return null;
  }
}

export function getCardStyle(game, version) {
  if (game.videoTable?.includes(version)) {
    return null;
  } else {
    return `
        background-image: url('${getSources(game, version)}');
        background-size: cover;
        background-repeat: no-repeat;
      `;
  }
}

export function customStyle(src) {
  if (!src) {
    return null;
  } else {
    return `
        background-image: url('${src}');
        background-size: cover;
        background-repeat: no-repeat;
      `;
  }
}
