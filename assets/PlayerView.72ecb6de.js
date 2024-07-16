import{u as A,ad as B,s as F,N as T,r as G,o as O,a as t,c as u,w as c,l as R,g as p,b as y,e as s,m as U,f as v,i as b,k as n,aq as z,P as E,ak as M,al as q,ac as X,j as H,F as P,aj as m,y as Y,Y as _,t as f,n as K,p as Q,q as W}from"./index.245a4617.js";import{_ as Z,g as S,a as ee}from"./ProfileCard.b5c0184d.js";import{_ as le}from"./FormControl.e52bf3bc.js";import{g}from"./danClass.233b0381.js";import"./userData.bcc92478.js";const ae={class:"md:flex pb-6 md:justify-between md:items-center"},se={key:0,class:"mt-2 md:mt-0 md:w-1/3 md:text-right"},te=p("h2",{class:"text-md sm:text-lg md:text-xl font-bold p-2"}," Select Version ",-1),re={class:"bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3"},ne={class:"w-full"},ie={class:"md:w-1/3 grid grid-cols-1 md:grid-cols-2 gap-3"},ue={class:"my-6 grid grid-cols-1 md:grid-cols-4 gap-6"},fe={__name:"PlayerView",setup(oe){const k=Q(),w=W(),N=A();var d=null,o=null,h=null;d=k.params.game,h=k.params.userId,o=B(d),o||w.push({name:"ErrorPage",params:{catchAll:"404"}});const i=F({currentVersion:null});T(()=>i.currentVersion,()=>{V()});const l=G(null);O(async()=>{V()}),o.versions||(i.currentVersion=1);async function V(){try{l.value=null;const e=await N.getUserProfile(d,i.currentVersion,h);l.value=L(e),e&&!i.currentVersion&&(i.currentVersion=e.versions[e.versions.length-1])}catch(e){console.error("Failed to fetch user profile data:",e)}}var $=[{label:"Register Date",type:String,span:"md:col-span-2",key:"first_play_timestamp"},{label:"Last Play",type:String,span:"md:col-span-2",key:"last_play_timestamp"},{label:"First Arcade",type:String,span:"md:col-span-2",key:"first_play_arcade"},{label:"Last Arcade",type:String,span:"md:col-span-2",key:"last_play_arcade"},{label:"Total Plays",type:Number,key:"total_plays"},{label:"EXP",type:Number,key:"exp"},{label:"SP Plays",type:Number,key:"single_plays"},{label:"DP Plays",type:Number,key:"double_plays"},{label:"SP DJPOINT",type:Number,key:"single_dj_points"},{label:"DP DJPOINT",type:Number,key:"double_dj_points"}];function x(){var e=null;return i.currentVersion?e=`/assets/games/${o.id}/card/${i.currentVersion}.png`:e=o.cardBG,e}function D(){return`
      background-image: url('${x()}');
      background-size: cover;
      background-repeat: no-repeat;
    `}function j(e,a){if(a){if(e.isSkill&&a.jubility)return S(a.jubility);if(e.isJubility&&a.records.skill)return ee(a.records.skill)}return""}function I(e){var a=[];for(const r of o.versions)e.includes(r.id)&&a.push(r);return a}function J(e,a){return e.isSkill?a.stats[e.key]/100:e.isJubility?a.stats[e.key]/10:a.stats[e.key]}function C(e,a){return a?e/10:e/100}function L(e){if(e.stats){if(e.stats.first_play_timestamp){const a=new Date(e.stats.first_play_timestamp*1e3);e.stats.first_play_timestamp=a.toLocaleString()}if(e.stats.last_play_timestamp){const a=new Date(e.stats.last_play_timestamp*1e3);e.stats.last_play_timestamp=a.toLocaleString()}e.dp&&e.dp.dan!==void 0&&(e.dp.dan=g(e.dp.dan).short)}return e}return(e,a)=>(t(),u(K,null,{default:c(()=>[l.value?(t(),u(R,{key:0},{default:c(()=>[p("div",ae,[y(v,{icon:s(U),href:`/#/games/${s(d)}`,class:"w-full md:w-auto",color:"info",label:`${s(o).shortName?s(o).shortName:s(o).name} Home`},null,8,["icon","href","label"]),s(o).versions&&l.value?(t(),b("div",se,[te,y(le,{modelValue:i.currentVersion,"onUpdate:modelValue":a[0]||(a[0]=r=>i.currentVersion=r),options:I(l.value.versions)},null,8,["modelValue","options"])])):n("",!0)]),y(E,{icon:s(z),title:"View Profile",main:""},null,8,["icon"]),i.currentVersion&&l.value?(t(),b("div",{key:0,style:X(D()),class:"rounded-2xl mb-6"},[p("div",re,[p("div",ne,[y(Z,{"use-small":"",game:s(d),version:i.currentVersion,profile:l.value},{default:c(()=>[p("div",ie,[y(v,{href:`/#/games/${s(d)}/scores/${l.value.userId}`,icon:s(M),class:"w-full md:w-auto",color:"info",label:"View Scores"},null,8,["href","icon"]),y(v,{href:`/#/games/${s(d)}/records/${l.value.userId}`,icon:s(q),class:"w-full md:w-auto",color:"info",label:"View Records"},null,8,["href","icon"])])]),_:1},8,["game","version","profile"])])])],4)):n("",!0),p("div",ue,[(t(!0),b(P,null,H(s($),r=>(t(),b(P,{key:r},[l.value.stats[r.key]?(t(),u(m,{key:0,class:Y(r.span),label:r.label,number:r.type==Number?J(r,l.value):null,"num-color":j(r)},{default:c(()=>[_(f(r.type==String?l.value.stats[r.key]:null)+" ",1)]),_:2},1032,["class","label","number","num-color"])):n("",!0)],64))),128)),l.value.skill?(t(),u(m,{key:0,label:"Skill Points",number:C(l.value.skill,!1),"num-color":s(S)(l.value.skill)},null,8,["number","num-color"])):n("",!0),l.value.profile_skill?(t(),u(m,{key:1,label:"Skill Level",number:l.value.profile_skill},null,8,["number"])):n("",!0),l.value.jubility?(t(),u(m,{key:2,label:"Jubility"},{default:c(()=>[_(f(l.value.jubility/10),1)]),_:1})):n("",!0),l.value.pick_up_jubility?(t(),u(m,{key:3,label:"Pick-Up Jubility"},{default:c(()=>[_(f(l.value.pick_up_jubility/10),1)]),_:1})):n("",!0),l.value.common_jubility?(t(),u(m,{key:4,label:"Common Jubility"},{default:c(()=>[_(f(l.value.common_jubility/10),1)]),_:1})):n("",!0),l.value.deller?(t(),u(m,{key:5,label:"Deller",number:l.value.deller},null,8,["number"])):n("",!0),l.value.sgrade?(t(),u(m,{key:6,label:"SP DAN"},{default:c(()=>[_(f(s(g)(l.value.sgrade).label),1)]),_:1})):n("",!0),l.value.dgrade?(t(),u(m,{key:7,label:"DP DAN"},{default:c(()=>[_(f(s(g)(l.value.dgrade).label),1)]),_:1})):n("",!0)])]),_:1})):n("",!0)]),_:1}))}};export{fe as default};
