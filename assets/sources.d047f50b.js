const n="https://cdn.phaseii.network/file/PhaseII/web-assets";function u(e,t){return t?`${n}/games/${e.id}/card/${t}.webp`:e==null?void 0:e.cardBG}function s(e,t){var r;return t&&((r=e.videoTable)==null?void 0:r.includes(t))?`https://web3.phaseii.network/gameassets/video/${e.id}/${t}.mp4`:null}function i(e,t){var r;return(r=e.videoTable)!=null&&r.includes(t)?null:`
        background-image: url('${u(e,t)}');
        background-size: cover;
        background-repeat: no-repeat;
      `}export{i as a,s as g};
