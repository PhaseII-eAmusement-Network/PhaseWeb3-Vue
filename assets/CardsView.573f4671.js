import{r as _,s as $,o as k,c as r,e as g,w as i,f as s,V as A,W as h,g as o,a1 as I,_ as D,x as V,i as c,H as P,n as w,a2 as S,j as t,P as E,U as F,k as p,F as N,l as T,t as O,p as B,q as L}from"./index.c2012168.js";import{d as v}from"./userData.bcc92478.js";import{_ as U}from"./FormField.7ec17256.js";import{_ as j}from"./FormControl.aafaeb46.js";import{g as q,h as H,i as M}from"./account.af16b487.js";const W={class:"grid md:grid-cols-2 mb-2"},z={key:0,class:"grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 gap-6"},G={class:"flex justify-between md:grid md:gap-2 mb-4 items-center"},Z=["src"],J={class:"text-xl text-center font-mono"},K={class:"grid grid-cols-3 md:grid-cols-2 gap-2"},te={__name:"CardsView",setup(Q){const b="https://cdn.phaseii.network/file/PhaseII/web-assets";var d=_([]);const u=_(!1),n=$({newCard:null});async function m(){d.value=null;try{const a=await q();d.value=a}catch(a){console.error("Failed to fetch card data:",a)}}k(async()=>{await m()});function x(a){var e=a.target.value;e=e.replace(/[^A-Za-z0-9]/g,""),e=e.toUpperCase().replace(/(.{4})/g,"$1-").replace(/-$/,""),n.newCard=e}async function y(){u.value=!0,(await M(n.newCard)).status=="success"&&(n.newCard=null,u.value=!1,await m())}async function X(a){(await H(v(a))).status=="success"&&await m()}const C=a=>{navigator.clipboard.writeText(a).then(()=>{alert("Copied to clipboard!")}).catch(()=>{alert("Failed to copy to clipboard!")})};return(a,e)=>(r(),g(L,null,{default:i(()=>[s(B,null,{default:i(()=>[s(A,{class:"mb-6","use-small":"","even-smaller":""}),s(h,{icon:o(I),title:"Add a Card",main:""},null,8,["icon"]),s(D,{"is-form":"",class:"row-span-2 mb-6",onSubmit:e[1]||(e[1]=V(l=>y(),["prevent"]))},{footer:i(()=>[s(c,{type:"submit",color:"success",label:"Add"}),u.value?(r(),g(P,{key:0,path:a.mdiLoading,color:"text-yellow-500",class:"animate animate-spin"},null,8,["path"])):w("",!0)]),default:i(()=>[s(U,{label:"Card ID",help:"The 16 character ACCESS CODE. If your card is dated after 2016, you'll need to get the ACCESS CODE from a game."},{default:i(()=>[s(j,{modelValue:n.newCard,"onUpdate:modelValue":e[0]||(e[0]=l=>n.newCard=l),icon:o(S),name:"cardId",type:"card",placeholder:"XXXX-XXXX-XXXX-XXXX",minlength:19,maxlength:19,required:"",onInput:x},null,8,["modelValue","icon"])]),_:1})]),_:1}),t("div",W,[s(h,{icon:o(E),title:"Login Cards",main:""},null,8,["icon"]),e[2]||(e[2]=t("div",{class:"text-xl md:text-right"},[t("h4",null,"AC = Web Access Code"),t("h4",null,[F("NFC-ID = Internal ID for "),t("samp",null,"card0.txt")])],-1))]),o(d)?(r(),p("div",z,[(r(!0),p(N,null,T(o(d),l=>(r(),p("div",{key:l.id,class:"grid dark:bg-slate-900/70 rounded-2xl p-5"},[t("div",G,[t("img",{src:`${o(b)}/passes/generic.webp`,class:"w-24 md:w-auto"},null,8,Z),t("h1",J,O(o(v)(l.encoded)),1)]),t("div",K,[s(c,{color:"info",label:"Copy AC",onClick:f=>C(l.encoded)},null,8,["onClick"]),s(c,{color:"info",label:"Copy NFC-ID",onClick:f=>C(l.id)},null,8,["onClick"]),s(c,{color:"danger",label:"Delete",onClick:f=>X(l.encoded)},null,8,["onClick"])])]))),128))])):w("",!0)]),_:1})]),_:1}))}};export{te as default};
