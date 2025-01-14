import{r as b,s as w,o as R,aB as T,N as A,a as s,c,w as p,b as m,i as v,X as W,e as r,ax as X,_ as q,g as u,k as d,V as z,t as H,F as B,j as K,f as F,l as Q,n as Y,p as Z,a4 as O}from"./index.31ff9a56.js";import{_ as ee}from"./ArcadeCard.ad112341.js";import{_ as I}from"./FormField.560f17dd.js";import{_ as f}from"./FormControl.700a58a5.js";import{_ as ae}from"./FormCheckRadio.71f8d364.js";import{g as _,s as S}from"./values.1bd6ac4a.js";import{A as oe,c as te,d as le}from"./arcade.092c303c.js";const se={class:"mb-4"},ne={class:"grid md:grid-cols-2 gap-4"},re=u("p",{class:"pb-2 text-lg"},"Game",-1),ie={key:0},me=u("p",{class:"pb-2 text-lg"},"Version",-1),de={key:0},ue={class:"text-xl"},ce=u("hr",{class:"pb-1 my-2"},null,-1),pe={key:0,class:"space-x-2 mt-6"},Se={__name:"EventView",setup(ve){const l=b(null),t=w({game:null,version:null}),g=w([]),V=b(null),k=b(null),x=b(!0),C=Z(),N=parseInt(C.params.id);async function J(){try{k.value=null,l.value={},V.value={};const o=await oe(N);k.value=o,x.value=!1}catch(o){console.error("Failed to fetch arcade data:",o)}}async function $(){try{l.value={},V.value={};const o=await te(N,t.game,t.version);l.value=JSON.parse(JSON.stringify(o)),V.value=o}catch(o){console.error("Failed to fetch arcade setting data:",o)}}R(()=>{J(),L()});function L(){for(const o of T){const a=o.gameOptions;a&&g.push({game:o.id,gameOptions:a})}}function P(){var o=[];for(const a of g)a.gameOptions&&o.push({id:a.game,label:O(a.game).name});return o}function j(){const o=g.find(n=>n.game==t.game),a=O(t.game);var e=[];for(const n of Object.entries(o.gameOptions))if(a.versions==null)e.push({id:n[0],label:a.name}),t.version=1;else{const y=a.versions.find(h=>h.id==n[0]);e.push({id:n[0],label:y.label})}return e}function D(){var e;const o=O(t.game);var a=null;return o.versions&&(a=o.versions.find(n=>n.id==t.version)),`${o.name} ${(e=a==null?void 0:a.label)!=null?e:""}`}function E(){return g.find(a=>a.game==t.game).gameOptions[t.version]}async function M(){(await le(N,t.game,t.version,l.value)).status!="error"&&await $()}return A(()=>t.game,()=>{t.version=null,l.value={}}),A(()=>t.version,()=>{t.version&&$()}),(o,a)=>(s(),c(Y,null,{default:p(()=>[m(Q,null,{default:p(()=>[x.value?d("",!0):(s(),v(B,{key:0},[m(ee,{class:"mb-6",arcade:k.value,"use-small":!0},null,8,["arcade"]),m(W,{icon:r(X),title:"Game Event Settings",main:""},null,8,["icon"]),m(q,{class:"mb-6"},{default:p(()=>[u("div",se,[m(I,{label:"Select Game",help:"Pick a game and version to get started."},{default:p(()=>[u("div",ne,[u("div",null,[re,m(f,{modelValue:t.game,"onUpdate:modelValue":a[0]||(a[0]=e=>t.game=e),name:"game",options:P()},null,8,["modelValue","options"])]),t.game?(s(),v("div",ie,[me,m(f,{modelValue:t.version,"onUpdate:modelValue":a[1]||(a[1]=e=>t.version=e),name:"version",options:j()},null,8,["modelValue","options"])])):d("",!0)])]),_:1})]),t.game&&t.version?(s(),v("div",de,[u("h2",ue,[z(" Settings for "),u("b",null,H(D()),1)]),ce,(s(!0),v(B,null,K(E(),e=>(s(),c(I,{key:e.id,label:e.name,help:e.help},{default:p(()=>{var n,y,h,G,U;return[e.type=="String"?(s(),c(f,{key:0,"model-value":(n=r(_)(l.value,e.id))!=null?n:"",name:e.name,placeholder:"Not Set","onUpdate:modelValue":i=>r(S)(l.value,e.id,i)},null,8,["model-value","name","onUpdate:modelValue"])):d("",!0),e.type=="LargeText"?(s(),c(f,{key:1,"model-value":(y=r(_)(l.value,e.id))!=null?y:"",name:e.name,placeholder:"Not Set",type:"textarea","onUpdate:modelValue":i=>r(S)(l.value,e.id,i)},null,8,["model-value","name","onUpdate:modelValue"])):d("",!0),e.type=="Boolean"?(s(),c(ae,{key:2,name:e.id,"model-value":Boolean((h=r(_)(l.value,e.id))!=null?h:0),"input-value":!0,type:"switch","onUpdate:modelValue":i=>r(S)(l.value,e.id,i!=null?i:0)},null,8,["name","model-value","onUpdate:modelValue"])):d("",!0),e.type=="Array"?(s(),c(f,{key:3,"model-value":(G=r(_)(l.value,e.id))!=null?G:0,options:e.options,name:e.id,selected:(U=r(_)(l.value,e.id))!=null?U:0,placeholder:"Select...","onUpdate:modelValue":i=>r(S)(l.value,e.id,Number(i))},null,8,["model-value","options","name","selected","onUpdate:modelValue"])):d("",!0)]}),_:2},1032,["label","help"]))),128)),JSON.stringify(l.value)!=JSON.stringify(V.value)?(s(),v("div",pe,[m(F,{color:"success",label:"Save",onClick:a[2]||(a[2]=e=>M())}),m(F,{color:"danger",label:"Revert",onClick:a[3]||(a[3]=e=>$())})])):d("",!0)])):d("",!0)]),_:1})],64))]),_:1})]),_:1}))}};export{Se as default};