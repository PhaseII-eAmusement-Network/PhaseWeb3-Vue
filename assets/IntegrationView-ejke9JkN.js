import{a as S,b as $,r as w,u as A,M as U,Y as L,c as u,d as i,w as m,e as c,_ as R,i as h,O as F,P as x,g as C,Z as N,j as f,F as K,k as V,$ as B,a0 as T,h as M,f as d,Q as O,t as _,I as H,l as p,n as W,a1 as j}from"./index-CHivKhhP.js";const z={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},Q={class:"font-sans text-wrap mb-6"},X={key:0,class:"text-lg"},Y={key:1,class:"text-lg"},q={class:"space-x-2"},J={__name:"IntegrationView",setup(E){const I=S(),k=$(),y="https://discord.com/oauth2/authorize?client_id=947985989421395988&response_type=code&redirect_uri=https%3A%2F%2Fweb3.phaseii.network%2F%23%2Fprofile%2Fintegrate%2Fdiscord&scope=identify",b="https://kamai.tachi.ac/oauth/request-auth?clientID=CIce4260e1939ceed11c8e48ee857a3aef2a87ba56",g=w(I.params.service);if(g.value){const t=new URLSearchParams(window.location.search),l=t.get("code");t.delete("code"),l!==void 0&&P(g.value,l)}const r=A(),e=w(r.userData);U(()=>r.userData,t=>{e.value=t});const v=[{id:"discord",name:"Discord",icon:B,oAuth:y,description:`Linking your Discord account to PhaseII gives you an avatar, enables push notifications, and more via our Discord bot, BadManiac.

PhaseII *does not* use Discord's API aside from the initial linkage. All data PhaseII uses is sent via our bot.

No data aside from your avatar, User ID, and name is saved.

We do not save a token nor a cookie.`},{id:"tachi",name:"Kamaitachi",icon:T,oAuth:b,description:`Kamaitachi is an open source score tracker using standardized schemas.

Linking Kamaitachi to PhaseII will enable the uploading of all supported scores to Kamaitachi directly, with no user intervention.

You must follow all rules of Kamaitachi. Failure to adhere to rules will not only put your Kamaitachi account at risk, but also your PhaseII account.

Currently supported games:
- DDR
- IIDX
- SDVX
- pop'n (some versions)
- jubeat`}];async function D(t){await j(t.id)&&(r.userLoaded=!1,r.loadUser(),k.push({name:"profile_integrations"}))}async function P(t,l){if(await L(t,l)){const n=new URLSearchParams(window.location.search);n.delete("code");const o=n.toString(),s=`${window.location.pathname}${o?"?"+o:""}`;window.history.replaceState(null,"",s),r.userLoaded=!1,r.loadUser(),k.push({name:"profile_integrations"})}}return(t,l)=>(i(),u(W,null,{default:m(()=>[c(R,null,{default:m(()=>[c(F,{class:"mb-6","use-small":"","even-smaller":""}),c(x,{icon:C(N),title:"Server Integrations",main:""},null,8,["icon"]),h("div",z,[(i(),f(K,null,V(v,a=>c(M,{key:a.id},{footer:m(()=>{var n,o,s;return[h("div",q,[!e.value[a.id]||!((n=e.value[a.id])!=null&&n.linked)?(i(),u(p,{key:0,color:"success",label:"Link Now",href:a.oAuth,target:"_blank"},null,8,["href"])):d("",!0),e.value[a.id]&&((o=e.value[a.id])!=null&&o.linked)?(i(),u(p,{key:1,color:"info",label:"Relink",href:a.oAuth,target:"_blank"},null,8,["href"])):d("",!0),e.value[a.id]&&((s=e.value[a.id])!=null&&s.linked)?(i(),u(p,{key:2,color:"danger",label:"Unlink",onClick:Z=>D(a)},null,8,["onClick"])):d("",!0)])]}),default:m(()=>{var n,o,s;return[c(O,{color:"info",icon:a.icon,label:a.name,class:"mb-2"},null,8,["icon","label"]),h("pre",Q,_(a.description??""),1),e.value[a.id]&&((n=e.value[a.id])!=null&&n.linked)?(i(),f("h1",X,[H(_(a.name)+" is linked to ",1),h("b",null,_((o=e.value[a.id])==null?void 0:o.username),1)])):d("",!0),!e.value[a.id]||!((s=e.value[a.id])!=null&&s.linked)?(i(),f("h1",Y,_(a.name)+" isn't linked! ",1)):d("",!0)]}),_:2},1024)),64))])]),_:1})]),_:1}))}};export{J as default};
