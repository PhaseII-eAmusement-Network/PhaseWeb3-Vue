import{B as G,G as A,a as c,i as p,g as l,b as i,aq as C,t as L,e as s,H as N,k as _,u as j,s as F,O as M,al as q,r as b,o as H,c as y,w as x,f as k,ar as T,as as E,ak as O,Q as U,at as z,_ as Q,l as X,n as J,p as K,q as W}from"./index.5ca27ffe.js";import{_ as Y}from"./FormControl.eb3b8d3c.js";import{_ as Z}from"./ProfileCard.c0cc543a.js";import{_ as ee}from"./GeneralTable.414a3771.js";import{g as te,a as se}from"./sources.eb2c8b6c.js";import{d as ae}from"./userData.bcc92478.js";import{g as P}from"./danClass.233b0381.js";const oe={class:"pt-6 mb-6 flex items-center justify-between"},re={class:"flex items-center justify-start space-x-2"},le={class:"text-2xl md:text-3xl leading-tight"},ne={__name:"GameTitleLine",props:{path:{type:String,default:null},title:{type:String,required:!0}},setup(h){const v=G(()=>A().default);return(f,g)=>(c(),p("section",oe,[l("div",re,[i(C,{path:h.path,class:"w-12 h-12 p-1 drop-shadow-md"},null,8,["path"]),l("h1",le,L(h.title),1)]),s(v)?N(f.$slots,"default",{key:0}):_("",!0)]))}},ie=["src"],ce={class:"bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3 card-content"},de={class:"w-full"},ue={class:"md:flex md:px-5 md:space-x-10 md:justify-between md:items-center"},fe={key:0,class:"md:w-1/3 md:text-right"},me=l("h2",{class:"text-md sm:text-lg md:text-xl font-bold p-2"}," Select Version ",-1),pe={key:0,class:"w-full pt-6 pb-10"},_e={key:1,class:"md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-3"},he={class:"bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"},ve={class:"w-full"},Pe={__name:"GameView",setup(h){const v=K(),f=W(),g=j();var n=null,a=null;const r=F({currentVersion:null});M(()=>r.currentVersion,()=>{V()}),n=v.params.id,a=q(n),a==null&&f.push({name:"ErrorPage",params:{catchAll:"404"}});const d=b(null),w=b([]);H(async()=>{try{const t=await g.getGameProfiles(n);w.value=I(t)}catch(t){console.error("Failed to fetch profile data:",t)}V()}),a.versions||(r.currentVersion=1);async function V(){try{d.value=null;const t=await g.getUserProfile(n,r.currentVersion);d.value=t,t&&!r.currentVersion&&(r.currentVersion=t.versions[t.versions.length-1])}catch(t){console.error("Failed to fetch user profile data:",t)}}const u=[];if(u.push({text:"Player",value:"username",sortable:!0,width:120}),a.noRivals||u.push({text:"Rival ID",value:"extid",width:100}),u.push({text:"Last Play",value:"stats.last_play_timestamp",width:150},{text:"Last Arcade",value:"stats.last_play_arcade",width:150},{text:"Plays",value:"stats.total_plays",sortable:!0,width:50}),a.playerHeaders)for(var S of a.playerHeaders)u.push(S);function I(t){var o=[];for(var e of t){if(e.extid&&(e.extid=ae(e.extid)),e.stats){if(e.stats.last_play_timestamp){const m=new Date(e.stats.last_play_timestamp*1e3);e.stats.last_play_timestamp=m.toLocaleString()}e.sgrade&&(e.sgrade=P(e.sgrade).short),e.dgrade&&(e.dgrade=P(e.dgrade).short)}o.push(e)}return o.sort((m,$)=>{const R=m.stats&&m.stats.total_plays||0;return($.stats&&$.stats.total_plays||0)-R}),o}function B(t){var o=[];for(const e of a.versions)t.includes(e.id)&&o.push(e);return o}const D=t=>{const o=t.userId;f.push(`/games/${n}/profiles/${o}`)};return(t,o)=>(c(),y(J,null,{default:x(()=>[i(X,null,{default:x(()=>[l("div",{style:O(s(se)(s(a),r.currentVersion)),class:"rounded-2xl mb-6 card-container"},[l("video",{autoplay:"",muted:"",loop:"",playsinline:"",src:s(te)(s(a),r.currentVersion),class:"background-video"},null,8,ie),l("div",ce,[l("div",de,[l("div",ue,[i(ne,{path:s(a).icon,title:s(a).name},null,8,["path","title"]),s(a).versions&&d.value?(c(),p("div",fe,[me,i(Y,{modelValue:r.currentVersion,"onUpdate:modelValue":o[0]||(o[0]=e=>r.currentVersion=e),options:B(d.value.versions)},null,8,["modelValue","options"])])):_("",!0)])]),d.value?(c(),p("div",pe,[i(Z,{game:s(n),version:r.currentVersion,profile:d.value},null,8,["game","version","profile"])])):(c(),p("div",_e,[s(a).noScores?_("",!0):(c(),y(k,{key:0,href:`/#/games/${s(n)}/scores`,icon:s(T),outline:!1,color:"info",label:"Network Scores"},null,8,["href","icon"])),s(a).noRecords?_("",!0):(c(),y(k,{key:1,href:`/#/games/${s(n)}/records`,icon:s(E),outline:!1,color:"info",label:"Network Records"},null,8,["href","icon"]))]))])],4),i(U,{icon:s(z),title:"All Players",main:""},null,8,["icon"]),i(Q,{"has-table":""},{default:x(()=>[l("div",he,[l("div",ve,[i(ee,{headers:u,items:w.value,path:`/#/${s(n)}/profiles/`,onRowClicked:D},null,8,["items","path"])])])]),_:1})]),_:1})]),_:1}))}};export{Pe as default};
