import{$ as e,A as t,D as n,F as r,J as i,Kt as a,O as o,P as s,S as c,St as l,_ as u,g as d,ht as f,k as p,ot as m,s as h,st as g,t as _,u as v}from"./BaseButton-BBBgc_s0.js";import{B as y,Ct as b,F as x,Q as S,Tt as C,Z as w,b as T,pt as E,rt as D,x as O}from"./index-C1pBV_li.js";var k={class:`grid grid-cols-1 md:grid-cols-2 gap-6`},A={class:`font-sans text-wrap mb-6`},j={key:0,class:`text-lg`},M={key:1,class:`text-lg`},N={class:`space-x-2`},P={__name:`IntegrationView`,setup(P){let F=d(),I=u(),L=f(F.params.service);if(L.value){let e=new URLSearchParams(window.location.search),t=e.get(`code`);e.delete(`code`),t!==void 0&&H(L.value,t)}let R=v(),z=f(R.userData);m(()=>R.userData,e=>{z.value=e});let B=[{id:`discord`,name:`Discord`,icon:b,oAuth:`https://discord.com/oauth2/authorize?client_id=947985989421395988&response_type=code&redirect_uri=https%3A%2F%2Fweb3.phaseii.network%2Fprofile%2Fintegrate%2Fdiscord&scope=identify`,description:`Linking your Discord account to PhaseII gives you an avatar, enables push notifications, and more via our Discord bot, BadManiac.

PhaseII *does not* use Discord's API aside from the initial linkage. All data PhaseII uses is sent via our bot.

No data aside from your avatar, User ID, and name is saved.

We do not save a token nor a cookie.`},{id:`tachi`,name:`Kamaitachi`,icon:E,oAuth:`https://kamai.tachi.ac/oauth/request-auth?clientID=CIce4260e1939ceed11c8e48ee857a3aef2a87ba56`,description:`Kamaitachi is an open source score tracker using standardized schemas.

Linking Kamaitachi to PhaseII will enable the uploading of all supported scores to Kamaitachi directly, with no user intervention.

You must follow all rules of Kamaitachi. Failure to adhere to rules will not only put your Kamaitachi account at risk, but also your PhaseII account.

Currently supported games:
- DDR
- IIDX
- SDVX
- pop'n (some versions)
- jubeat`}];async function V(e){await y(e.id)&&(R.userLoaded=!1,R.loadUser(),I.push({name:`profile_integrations`}))}async function H(e,t){if(await x(e,t)){let e=new URLSearchParams(window.location.search);e.delete(`code`);let t=e.toString(),n=`${window.location.pathname}${t?`?`+t:``}`;window.history.replaceState(null,``,n),R.userLoaded=!1,R.loadUser(),I.push({name:`profile_integrations`})}}return(u,d)=>(i(),o(O,null,{default:g(()=>[r(w,null,{default:g(()=>[r(S,{class:`mb-6`,"use-small":``,"even-smaller":``}),r(T,{icon:l(C),title:`Service Integrations`,main:``},null,8,[`icon`]),n(`div`,k,[(i(),t(c,null,e(B,e=>r(h,{key:e.id},{footer:g(()=>[n(`div`,N,[!z.value[e.id]||!z.value[e.id]?.linked?(i(),o(_,{key:0,color:`success`,label:`Link Now`,href:e.oAuth,target:`_blank`},null,8,[`href`])):p(``,!0),z.value[e.id]&&z.value[e.id]?.linked?(i(),o(_,{key:1,color:`info`,label:`Relink`,href:e.oAuth,target:`_blank`},null,8,[`href`])):p(``,!0),z.value[e.id]&&z.value[e.id]?.linked?(i(),o(_,{key:2,color:`danger`,label:`Unlink`,onClick:t=>V(e)},null,8,[`onClick`])):p(``,!0)])]),default:g(()=>[r(D,{color:`info`,icon:e.icon,label:e.name,class:`mb-2`},null,8,[`icon`,`label`]),n(`pre`,A,a(e.description??``),1),z.value[e.id]&&z.value[e.id]?.linked?(i(),t(`h1`,j,[s(a(e.name)+` is linked to `,1),n(`b`,null,a(z.value[e.id]?.username),1)])):p(``,!0),!z.value[e.id]||!z.value[e.id]?.linked?(i(),t(`h1`,M,a(e.name)+` isn't linked! `,1)):p(``,!0)]),_:2},1024)),64))])]),_:1})]),_:1}))}};export{P as default};