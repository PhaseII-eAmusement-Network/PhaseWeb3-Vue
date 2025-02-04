const n="https://cdn.phaseii.network/file/PhaseII/web-assets";function s(e,t){return t?`${n}/games/${e.id}/card/${t}.webp`:e==null?void 0:e.cardBG}function i(e,t){var r;return t&&((r=e.videoTable)==null?void 0:r.includes(t))?`https://cdn.phaseii.network/file/PhaseII/game-assets/video/${e.id}/${t}.mp4`:null}function c(e,t){var r;return(r=e.videoTable)!=null&&r.includes(t)?null:`
        background-image: url('${s(e,t)}');
        background-size: cover;
        background-repeat: no-repeat;
      `}export{c as a,i as g};
