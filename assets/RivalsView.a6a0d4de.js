import{u as B,a as D,ag as G,r as y,s as k,M as j,o as N,c as r,e as _,w as c,f as n,j as e,g as a,k as v,n as p,aU as U,$,br as E,_ as h,l as P,t as g,i as C,F as R,bs as M,p as q,q as z}from"./index.130e9bc7.js";import{_ as Y}from"./ProfileCard.11e4f932.js";import{_ as H}from"./GameTitleLine.492759fd.js";import{_ as J}from"./FormField.71ec0ccb.js";import{_ as S}from"./FormControl.2ba80829.js";import{A as K,a as O}from"./profile.0f8a8b5b.js";import{g as Q,a as T}from"./sources.0e8cabdf.js";import{d as W}from"./userData.bcc92478.js";const X=["src"],Z={class:"bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3 card-content"},ee={class:"w-full"},se={class:"md:flex md:px-5 md:space-x-10 md:justify-between md:items-center"},te={key:0,class:"md:w-1/3 md:text-right"},le={key:0,class:"w-full"},oe={class:"grid gap-4"},ae={class:"flex w-full place-content-between"},re={class:"text-lg md:text-xl"},ne={class:"text-md md:text-lg font-mono"},ie={class:"flex align-middle"},de={class:"grid gap-3"},ce={class:"flex justify-between items-center"},ue={class:"flex"},me={class:"grid"},fe={class:"text-lg"},_e={class:"text-md font-mono"},ke={__name:"RivalsView",setup(ve){const A=B(),I=D();var m=null,i=null;m=A.params.game,i=G(m);const d=y(null),V=y([]),l=k({currentVersion:null});j(()=>l.currentVersion,()=>{w(),b()}),N(async()=>{b(),w()}),i.versions||(l.currentVersion=1);async function w(){try{d.value=null;const s=await K(m,l.currentVersion);d.value=s,s&&!l.currentVersion&&(l.currentVersion=s.versions[s.versions.length-1])}catch(s){console.error("Failed to fetch user profile data:",s)}}async function b(){try{const s=await O(m,l.currentVersion);V.value=s}catch(s){console.error("Failed to fetch profile data:",s)}}function F(s){var o=[];for(const t of i.versions)s.includes(t.id)&&o.push(t);return o}const u=k({filter:null});i||I.push({name:"ErrorPage",params:{catchAll:"404"}});function L(){if(u.filter)return V.value.filter(s=>s.username.toLowerCase().includes(u.filter.toLowerCase())||s.extid.toString().toLowerCase().includes(u.filter.toLowerCase()))}return(s,o)=>(r(),_(z,null,{default:c(()=>[n(q,null,{default:c(()=>[e("div",{style:U(a(T)(a(i),l.currentVersion)),class:"rounded-2xl mb-6 card-container"},[e("video",{autoplay:"",muted:"",loop:"",playsinline:"",src:a(Q)(a(i),l.currentVersion),class:"background-video"},null,8,X),e("div",Z,[e("div",ee,[e("div",se,[n(H,{path:a(i).icon,title:a(i).name},null,8,["path","title"]),a(i).versions&&d.value?(r(),v("div",te,[o[2]||(o[2]=e("h2",{class:"text-md sm:text-lg md:text-xl font-bold p-2"}," Select Version ",-1)),n(S,{modelValue:l.currentVersion,"onUpdate:modelValue":o[0]||(o[0]=t=>l.currentVersion=t),options:F(d.value.versions)},null,8,["modelValue","options"])])):p("",!0)])]),d.value?(r(),v("div",le,[n(Y,{game:a(m),version:l.currentVersion,profile:d.value,"use-small":""},null,8,["game","version","profile"])])):p("",!0)])],4),n($,{icon:a(E),title:"Add a Rival",main:""},null,8,["icon"]),l.currentVersion?(r(),_(h,{key:0,class:"mb-6"},{default:c(()=>[n(J,{label:"Search",help:"Search by username or Rival ID to add a rival.",class:"w-full md:w-1/3"},{default:c(()=>[n(S,{modelValue:u.filter,"onUpdate:modelValue":o[1]||(o[1]=t=>u.filter=t),"model-value":u.filter,placeholder:"1234-5678"},null,8,["modelValue","model-value"])]),_:1}),e("div",oe,[(r(!0),v(R,null,P(L(),t=>{var f;return r(),v("div",{key:t.id,class:"bg-slate-800 p-4 rounded-xl"},[e("div",ae,[e("div",null,[e("h1",re,g(t.username),1),e("h2",ne,g(a(W)(t.extid)),1)]),e("div",ie,[n(C,{label:"Add Rival",color:"success",disabled:t.userId==((f=d.value)==null?void 0:f.userId),tooltip:"penis"},null,8,["disabled"])])])])}),128))])]),_:1})):p("",!0),n($,{icon:a(M),title:"Rivals",main:""},null,8,["icon"]),l.currentVersion?(r(),_(h,{key:1,class:"mb-6"},{default:c(()=>{var t,f;return[e("div",de,[(r(!0),v(R,null,P((t=d.value)==null?void 0:t.rivals,x=>(r(),_(h,{key:x.id},{default:c(()=>[e("div",ce,[e("div",ue,[e("div",me,[e("h1",fe,g(x.name),1),e("h2",_e,g(x.rivalID),1)])]),n(C,{label:"Remove Rival",color:"danger"})])]),_:2},1024))),128)),(f=d.value)!=null&&f.rivals?p("",!0):(r(),_(h,{key:0},{default:c(()=>o[3]||(o[3]=[e("h1",{class:"text-2xl"},"You have no rivals!",-1)])),_:1}))])]}),_:1})):p("",!0)]),_:1})]),_:1}))}};export{ke as default};
