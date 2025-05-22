import{B as r,E as l,c,k as o,j as a,f as i,ah as u,t as d,G as p,n as f}from"./index.e616e197.js";const h={class:"mb-2"},_={class:"text-center lg:text-left items-center justify-center lg:justify-start gap-2"},g={class:"flex items-center justify-start"},S={class:"text-2xl md:text-3xl leading-tight"},m={class:"w-full flex gap-1 mb-4"},x={__name:"GameTitleLine",props:{path:{type:String,default:null},title:{type:String,required:!0}},setup(e){const t=r(()=>l().default);return(s,n)=>(c(),o("section",h,[a("div",_,[a("div",g,[i(u,{path:e.path,class:"w-12 h-12 p-1 drop-shadow-md"},null,8,["path"]),a("h1",S,d(e.title),1)]),a("div",m,[t.value?p(s.$slots,"default",{key:0}):f("",!0)])])]))}},b="https://cdn.phaseii.network/file/PhaseII/web-assets";function k(e,t){return t?`${b}/games/${e.id}/card/${t}.webp`:e==null?void 0:e.cardBG}function y(e,t){var s;return t&&((s=e.videoTable)==null?void 0:s.includes(t))?`https://cdn.phaseii.network/file/PhaseII/game-assets/video/${e.id}/${t}.mp4`:null}function T(e,t){var s;return(s=e.videoTable)!=null&&s.includes(t)?null:`
        background-image: url('${k(e,t)}');
        background-size: cover;
        background-repeat: no-repeat;
      `}function w(e){return e?`
        background-image: url('${e}');
        background-size: cover;
        background-repeat: no-repeat;
      `:null}export{x as _,T as a,w as c,y as g};
