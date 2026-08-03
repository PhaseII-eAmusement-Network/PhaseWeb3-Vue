import{A as e,C as t,Ct as n,F as r,I as i,O as a,Y as o,_ as s,c,ct as l,d as u,et as d,gt as f,j as p,k as m,n as h,qt as g,st as _,v}from"./favicon-DOtDvKM0.js";import{J as y,N as b,R as x,St as S,Y as C,b as w,bt as T,et as E,ut as D,y as O}from"./index-B0Rdu3D1.js";var k={class:`grid grid-cols-1 md:grid-cols-2 gap-6`},A={class:`font-sans text-wrap mb-6`},j={key:0,class:`text-lg`},M={key:1,class:`text-lg`},N={class:`space-x-2`},P={__name:`IntegrationView`,setup(P){let F=s(),I=v(),L=f(F.params.service);if(L.value){let e=new URLSearchParams(window.location.search),t=e.get(`code`);e.delete(`code`),t!==void 0&&H(L.value,t)}let R=u(),z=f(R.userData);_(()=>R.userData,e=>{z.value=e});let B=[{id:`discord`,name:`Discord`,icon:T,oAuth:`https://discord.com/oauth2/authorize?client_id=947985989421395988&response_type=code&redirect_uri=https%3A%2F%2Fweb3.phaseii.network%2Fprofile%2Fintegrate%2Fdiscord&scope=identify`,description:`Linking your Discord account to PhaseII gives you an avatar, enables push notifications, and more via our Discord bot, BadManiac.

PhaseII *does not* use Discord's API aside from the initial linkage. All data PhaseII uses is sent via our bot.

No data aside from your avatar, User ID, and name is saved.

We do not save a token nor a cookie.`},{id:`tachi`,name:`Kamaitachi`,icon:D,oAuth:`https://kamai.tachi.ac/oauth/request-auth?clientID=CIce4260e1939ceed11c8e48ee857a3aef2a87ba56`,description:`Kamaitachi is an open source score tracker using standardized schemas.

Linking Kamaitachi to PhaseII will enable the uploading of all supported scores to Kamaitachi directly, with no user intervention.

You must follow all rules of Kamaitachi. Failure to adhere to rules will not only put your Kamaitachi account at risk, but also your PhaseII account.

Currently supported games:
- DDR
- IIDX
- SDVX
- pop'n (some versions)
- jubeat`}];async function V(e){await x(e.id)&&(R.userLoaded=!1,R.loadUser(),I.push({name:`profile_integrations`}))}async function H(e,t){if(await b(e,t)){let e=new URLSearchParams(window.location.search);e.delete(`code`);let t=e.toString(),n=`${window.location.pathname}${t?`?`+t:``}`;window.history.replaceState(null,``,n),R.userLoaded=!1,R.loadUser(),I.push({name:`profile_integrations`})}}return(s,u)=>(o(),m(w,null,{default:l(()=>[i(y,null,{default:l(()=>[i(C,{class:`mb-6`,"use-small":``,"even-smaller":``}),i(O,{icon:n(S),title:`Service Integrations`,main:``},null,8,[`icon`]),a(`div`,k,[(o(),p(t,null,d(B,t=>i(c,{key:t.id},{footer:l(()=>[a(`div`,N,[!z.value[t.id]||!z.value[t.id]?.linked?(o(),m(h,{key:0,color:`success`,label:`Link Now`,href:t.oAuth,target:`_blank`},null,8,[`href`])):e(``,!0),z.value[t.id]&&z.value[t.id]?.linked?(o(),m(h,{key:1,color:`info`,label:`Relink`,href:t.oAuth,target:`_blank`},null,8,[`href`])):e(``,!0),z.value[t.id]&&z.value[t.id]?.linked?(o(),m(h,{key:2,color:`danger`,label:`Unlink`,onClick:e=>V(t)},null,8,[`onClick`])):e(``,!0)])]),default:l(()=>[i(E,{color:`info`,icon:t.icon,label:t.name,class:`mb-2`},null,8,[`icon`,`label`]),a(`pre`,A,g(t.description??``),1),z.value[t.id]&&z.value[t.id]?.linked?(o(),p(`h1`,j,[r(g(t.name)+` is linked to `,1),a(`b`,null,g(z.value[t.id]?.username),1)])):e(``,!0),!z.value[t.id]||!z.value[t.id]?.linked?(o(),p(`h1`,M,g(t.name)+` isn't linked! `,1)):e(``,!0)]),_:2},1024)),64))])]),_:1})]),_:1}))}};export{P as default};