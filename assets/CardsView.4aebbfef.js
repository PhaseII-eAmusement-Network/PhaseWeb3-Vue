import{u as h,r as b,s as x,o as X,a as n,c as u,w as o,b as e,V as w,W as _,e as l,a2 as y,_ as v,f as r,k,a3 as D,g as a,a4 as $,i as p,j as I,t as V,F as A,l as F,n as S,U as B,a5 as E}from"./index.7738aec6.js";import{d as N}from"./userData.bcc92478.js";import{_ as O}from"./FormField.54ccbbb5.js";import{_ as L}from"./FormControl.32d4ada5.js";const T="/assets/passes/generic.webp",j={class:"grid md:grid-cols-2 mb-2"},M=a("div",{class:"text-xl md:text-right"},[a("h4",null,"AC = Web Access Code"),a("h4",null,[B("NFC-ID = Internal ID for "),a("samp",null,"card0.txt")])],-1),U={class:"grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"},W={class:"flex justify-between md:grid md:gap-2 mb-4 items-center"},q=a("img",{src:T,class:"w-24 md:w-auto"},null,-1),P={class:"text-xl text-center font-mono"},R={class:"grid grid-cols-3 md:grid-cols-2 gap-2"},Q={__name:"CardsView",setup(z){const C=h();var d=b([]);const i=x({newCard:null});X(async()=>{try{const s=await C.getCards();d.value=s}catch(s){console.error("Failed to fetch card data:",s)}});const c=s=>{navigator.clipboard.writeText(s).then(()=>{alert("Copied to clipboard!")}).catch(()=>{alert("Failed to copy to clipboard!")})};return(s,m)=>{const f=E("BaseIcon");return n(),u(S,null,{default:o(()=>[e(F,null,{default:o(()=>[e(w,{class:"mb-6","use-small":"","even-smaller":""}),e(_,{icon:l(y),title:"Register Card",main:""},null,8,["icon"]),e(v,{"is-form":"",class:"row-span-2 mb-6"},{footer:o(()=>[e(r,{type:"submit",color:"success",label:"Add Card"}),s.passwordLoading?(n(),u(f,{key:0,path:s.mdiLoading,color:"text-yellow-500",class:"animate animate-spin"},null,8,["path"])):k("",!0)]),default:o(()=>[e(O,{label:"Card ID",help:"The 16 character ACCESS CODE. If your card is dated after 2016, you'll need to get the ACCESS CODE from a game."},{default:o(()=>[e(L,{modelValue:i.newCard,"onUpdate:modelValue":m[0]||(m[0]=t=>i.newCard=t),icon:l(D),name:"cardId",type:"card",placeholder:"XXXX-XXXX-XXXX-XXXX",minlength:"16",maxlength:"19",required:""},null,8,["modelValue","icon"])]),_:1})]),_:1}),a("div",j,[e(_,{icon:l($),title:"Login Cards",main:""},null,8,["icon"]),M]),a("div",U,[(n(!0),p(A,null,I(l(d),t=>(n(),p("div",{key:t.id,class:"grid dark:bg-slate-900/70 rounded-2xl p-5"},[a("div",W,[q,a("h1",P,V(l(N)(t.encoded)),1)]),a("div",R,[e(r,{color:"info",label:"Copy AC",onClick:g=>c(t.encoded)},null,8,["onClick"]),e(r,{color:"info",label:"Copy NFC-ID",onClick:g=>c(t.id)},null,8,["onClick"]),e(r,{color:"danger",label:"Delete"})])]))),128))])]),_:1})]),_:1})}}};export{Q as default};
