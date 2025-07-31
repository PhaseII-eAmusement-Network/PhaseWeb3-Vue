import{a as S,b as $,r as g,u as A,M as U,Y as L,c as l,d as n,w as c,e as i,_ as R,i as d,O as F,P as x,g as C,Z as N,j as h,F as K,k as V,$ as B,a0 as T,h as M,f as r,Q as O,t as u,I as H,l as _,n as W,a1 as j}from"./index-BfIWj8y-.js";const z={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},Q={class:"font-sans text-wrap mb-6"},X={key:0,class:"text-lg"},Y={key:1,class:"text-lg"},q={class:"space-x-2"},G={__name:"IntegrationView",setup(E){const w=S(),f=$(),I="https://discord.com/oauth2/authorize?client_id=947985989421395988&response_type=code&redirect_uri=https%3A%2F%2Fweb3.phaseii.network%2F%23%2Fprofile%2Fintegrate%2Fdiscord&scope=identify",y="https://kamai.tachi.ac/oauth/request-auth?clientID=CIce4260e1939ceed11c8e48ee857a3aef2a87ba56",p=g(w.params.service);if(p.value){const t=new URLSearchParams(window.location.search),s=t.get("code");t.delete("code"),s!==void 0&&D(p.value,s)}const o=A(),e=g(o.userData);U(()=>o.userData,t=>{e.value=t});const b=[{id:"discord",name:"Discord",icon:B,oAuth:I,description:`Linking your Discord account to PhaseII gives you an avatar, enables push notifications, and more via our Discord bot, BadManiac.

PhaseII *does not* use Discord's API aside from the initial linkage. All data PhaseII uses is sent via our bot.

No data aside from your avatar, User ID, and name is saved.

We do not save a token nor a cookie.`},{id:"tachi",name:"Kamaitachi",icon:T,oAuth:y,description:`Kamaitachi is an open source score tracker using standardized schemas.

Linking Kamaitachi to PhaseII will enable the uploading of all supported scores to Kamaitachi directly, with no user intervention.

You must follow all rules of Kamaitachi. Failure to adhere to rules will not only put your Kamaitachi account at risk, but also your PhaseII account.

Currently supported games:
- DDR
- IIDX
- SDVX
- pop'n (some versions)
- jubeat`}];async function v(t){await j(t.id)&&(o.userLoaded=!1,o.loadUser(),f.push({name:"profile_integrations"}))}async function D(t,s){if(await L(t,s)){const m=new URLSearchParams(window.location.search);m.delete("code");const k=m.toString(),P=`${window.location.pathname}${k?"?"+k:""}`;window.history.replaceState(null,"",P),o.userLoaded=!1,o.loadUser(),f.push({name:"profile_integrations"})}}return(t,s)=>(n(),l(W,null,{default:c(()=>[i(R,null,{default:c(()=>[i(F,{class:"mb-6","use-small":"","even-smaller":""}),i(x,{icon:C(N),title:"Server Integrations",main:""},null,8,["icon"]),d("div",z,[(n(),h(K,null,V(b,a=>i(M,{key:a.id},{footer:c(()=>[d("div",q,[!e.value[a.id]||!e.value[a.id]?.linked?(n(),l(_,{key:0,color:"success",label:"Link Now",href:a.oAuth,target:"_blank"},null,8,["href"])):r("",!0),e.value[a.id]&&e.value[a.id]?.linked?(n(),l(_,{key:1,color:"info",label:"Relink",href:a.oAuth,target:"_blank"},null,8,["href"])):r("",!0),e.value[a.id]&&e.value[a.id]?.linked?(n(),l(_,{key:2,color:"danger",label:"Unlink",onClick:m=>v(a)},null,8,["onClick"])):r("",!0)])]),default:c(()=>[i(O,{color:"info",icon:a.icon,label:a.name,class:"mb-2"},null,8,["icon","label"]),d("pre",Q,u(a.description??""),1),e.value[a.id]&&e.value[a.id]?.linked?(n(),h("h1",X,[H(u(a.name)+" is linked to ",1),d("b",null,u(e.value[a.id]?.username),1)])):r("",!0),!e.value[a.id]||!e.value[a.id]?.linked?(n(),h("h1",Y,u(a.name)+" isn't linked! ",1)):r("",!0)]),_:2},1024)),64))])]),_:1})]),_:1}))}};export{G as default};
