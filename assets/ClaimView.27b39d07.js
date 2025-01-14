import{a4 as T,r as g,o as U,e as d,a as u,c as y,w as r,b as a,_ as S,g as o,a5 as F,t as x,f as X,a6 as z,k as h,s as P,W as B,i as I,X as A,a7 as N,v as L,I as j,R as G,a3 as R,y as J,F as O,j as q,a8 as W,z as Z,l as H,n as K,V as D}from"./index.31ff9a56.js";import{_ as V}from"./FormField.560f17dd.js";import{_ as E}from"./FormControl.700a58a5.js";import{_ as Q}from"./FormCheckRadio.71f8d364.js";import{A as Y}from"./profile.d5681817.js";import{j as ee,k as ae}from"./account.deb2732f.js";const te={class:"grid grid-cols-1 gap-3"},le={class:"flex gap-4 items-center"},se={class:"text-2xl"},ne={class:"font-light text-xl"},oe={class:"space-x-2 mt-6"},re={__name:"MergeModal",props:{userId:{type:Number,default:null},game:{type:String,default:null},settings:{type:Object,default:null}},emits:["saveMerge","closeModal"],setup(M,{emit:f}){var b,$;const n=M,i=T(n.game),l=g({}),c=g(($=(b=n.settings)==null?void 0:b.scores)!=null?$:!1);U(async()=>{const w=await Y(n.game,null,n.userId);l.value=w});function m(){f("saveMerge",{game:n.game,scores:c.value})}return(w,p)=>d(i)&&l.value?(u(),y(z,{key:0,transparent:"",onOverlayClick:p[1]||(p[1]=_=>f("closeModal"))},{default:r(()=>[a(S,{class:"shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 text-white/90"},{default:r(()=>{var _,C;return[o("div",te,[o("div",le,[a(F,{path:d(i).icon},null,8,["path"]),o("h1",se,x(d(i).name),1)]),o("div",null,[o("h2",ne,x(l.value.name)+" - "+x((C=(_=l.value.stats)==null?void 0:_.total_plays)!=null?C:0)+" Plays ",1)]),a(V,{label:"Scores",help:"Transfer all scores from this account to yours. This will not erase your current scores."},{default:r(()=>[a(Q,{modelValue:c.value,"onUpdate:modelValue":p[0]||(p[0]=k=>c.value=k),name:"scores","input-value":c.value,type:"switch"},null,8,["modelValue","input-value"])]),_:1}),o("div",oe,[a(X,{color:"success",label:"Save",onClick:m})])])]}),_:1})]),_:1})):h("",!0)}},ie=o("h2",{class:"text-xl mb-6 lg:w-1/2"}," If you registered a card in game and need to claim it, you may do so here. Please note that the account cannot already be claimed! ",-1),ce={key:1},ue=o("h2",{class:"text-xl mb-6"},[D(" Click a game to view merge options. "),o("br"),D(" Please note that this cannot be undone once complete. ")],-1),de={class:"grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4"},me={class:"mt-4"},he={__name:"ClaimView",setup(M){const f=g(!1),n=g(null),i=g(!1),l=P({cardId:null,pin:null}),c=g({game:null,scores:!1}),m=P({});function b(s){var e=s.target.value;e=e.replace(/[^A-Za-z0-9]/g,""),e=e.toUpperCase().replace(/(.{4})/g,"$1-").replace(/-$/,""),l.cardId=e}function $(s){s.target.value=s.target.value.replace(/\D/g,"")}async function w(){f.value=!0,n.value=await ae(l.cardId,l.pin),f.value=!1}function p(s){i.value=!1,c.value.game=s,i.value=!0}function _(s){var e=[];for(const t of s){const v=T(t.game);v&&!v.skip&&e.push(t)}return e.sort(function(t,v){return v.data.last_play_timestamp-t.data.last_play_timestamp}),e}function C({game:s,scores:e}){m[s]={scores:e},i.value=!1,c.value={game:null,scores:!1,data:!1}}async function k(){await ee(l.cardId,l.pin,m)||window.alert("Failed to merge!")}return(s,e)=>(u(),y(K,null,{default:r(()=>[a(H,null,{default:r(()=>[a(B,{class:"mb-6","use-small":"","even-smaller":""}),n.value?h("",!0):(u(),I(O,{key:0},[a(A,{icon:d(N),title:"Claim a Profile",main:""},null,8,["icon"]),a(S,{"is-form":"",class:"row-span-2 mb-6",onSubmit:e[2]||(e[2]=L(t=>w(),["prevent"]))},{footer:r(()=>[a(X,{type:"submit",color:"success",label:"Start Claim"}),f.value?(u(),y(j,{key:0,path:d(G),color:"text-yellow-500",class:"animate animate-spin"},null,8,["path"])):h("",!0)]),default:r(()=>[ie,a(V,{label:"Card ID",help:"The 16 character ACCESS CODE. If your card is dated after 2016, you'll need to get the ACCESS CODE from a game."},{default:r(()=>[a(E,{modelValue:l.cardId,"onUpdate:modelValue":e[0]||(e[0]=t=>l.cardId=t),icon:d(R),name:"cardId",type:"card",placeholder:"XXXX-XXXX-XXXX-XXXX",minlength:19,maxlength:19,required:"",onInput:b},null,8,["modelValue","icon"])]),_:1}),a(V,{label:"PIN",help:"Used when logging into a game"},{default:r(()=>[a(E,{modelValue:l.pin,"onUpdate:modelValue":e[1]||(e[1]=t=>l.pin=t),icon:d(J),type:"password",name:"pin",minlength:4,maxlength:4,inputmode:"numeric",pattern:"\\d{4}",autocomplete:"pin",onInput:$},null,8,["modelValue","icon"])]),_:1})]),_:1})],64)),n.value?(u(),I("div",ce,[a(A,{icon:d(N),title:"Select Profiles to Merge",main:""},null,8,["icon"]),a(S,null,{default:r(()=>[ue,o("div",de,[(u(!0),I(O,null,q(_(n.value.profiles),t=>(u(),y(W,{key:t.game,game:t.game,value:t.data.total_plays,"profile-name":"",type:"plays",class:Z(m[t.game]?"border-green-800 border-[3px]":null),"disable-local-click":"",onClick:v=>p(t.game)},null,8,["game","value","class","onClick"]))),128))]),o("div",me,[a(X,{color:"success",label:"Start Merge",disabled:JSON.stringify(m)==JSON.stringify({}),onClick:k},null,8,["disabled"])])]),_:1})])):h("",!0),i.value?(u(),y(re,{key:2,game:c.value.game,"user-id":n.value.userId,settings:m[c.value.game],onSaveMerge:C,onCloseModal:e[3]||(e[3]=t=>i.value=!1)},null,8,["game","user-id","settings"])):h("",!0)]),_:1})]),_:1}))}};export{he as default};