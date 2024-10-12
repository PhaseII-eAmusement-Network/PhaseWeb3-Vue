function u(e,r){return r?`/assets/games/${e.id}/card/${r}.webp`:e==null?void 0:e.cardBG}function n(e,r){var t;return r&&((t=e.videoTable)==null?void 0:t.includes(r))?`https://web3.phaseii.network/gameassets/video/${e.id}/${r}.mp4`:null}function d(e,r){var t;return(t=e.videoTable)!=null&&t.includes(r)?null:`
        background-image: url('${u(e,r)}');
        background-size: cover;
        background-repeat: no-repeat;
      `}export{d as a,n as g};
