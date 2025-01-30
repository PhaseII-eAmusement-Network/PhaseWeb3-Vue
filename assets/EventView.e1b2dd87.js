import{r as S,s as w,u as W,o as R,aC as T,M as A,c as n,e as c,w as p,f as m,k as v,W as q,g as r,ay as z,_ as H,j as d,n as u,U as K,t as Q,F,l as X,i as I,p as Y,q as Z,a3 as O}from"./index.c2012168.js";import{_ as ee}from"./ArcadeCard.e27c4fa3.js";import{_ as B}from"./FormField.7ec17256.js";import{_ as f}from"./FormControl.aafaeb46.js";import{_ as ae}from"./FormCheckRadio.006e707f.js";import{g,s as k}from"./values.1bd6ac4a.js";import{A as oe,c as le,d as te}from"./arcade.df7204fc.js";const ne={class:"mb-4"},se={class:"grid md:grid-cols-2 gap-4"},re={key:0},ie={key:0},me={class:"text-xl"},de={key:0,class:"space-x-2 mt-6"},Ve={__name:"EventView",setup(ue){const t=S(null),l=w({game:null,version:null}),_=w([]),y=S(null),N=S(null),G=S(!0),C=W(),$=parseInt(C.params.id);async function J(){try{N.value=null,t.value={},y.value={};const o=await oe($);N.value=o,G.value=!1}catch(o){console.error("Failed to fetch arcade data:",o)}}async function h(){try{t.value={},y.value={};const o=await le($,l.game,l.version);t.value=JSON.parse(JSON.stringify(o)),y.value=o}catch(o){console.error("Failed to fetch arcade setting data:",o)}}R(()=>{J(),L()});function L(){for(const o of T){const e=o.gameOptions;e&&_.push({game:o.id,gameOptions:e})}}function P(){var o=[];for(const e of _)e.gameOptions&&o.push({id:e.game,label:O(e.game).name});return o}function j(){const o=_.find(s=>s.game==l.game),e=O(l.game);var a=[];for(const s of Object.entries(o.gameOptions))if(e.versions==null)a.push({id:s[0],label:e.name}),l.version=1;else{const V=e.versions.find(b=>b.id==s[0]);a.push({id:s[0],label:V.label})}return a}function D(){var a;const o=O(l.game);var e=null;return o.versions&&(e=o.versions.find(s=>s.id==l.version)),`${o.name} ${(a=e==null?void 0:e.label)!=null?a:""}`}function E(){return _.find(e=>e.game==l.game).gameOptions[l.version]}async function M(){(await te($,l.game,l.version,t.value)).status!="error"&&await h()}return A(()=>l.game,()=>{l.version=null,t.value={}}),A(()=>l.version,()=>{l.version&&h()}),(o,e)=>(n(),c(Z,null,{default:p(()=>[m(Y,null,{default:p(()=>[G.value?u("",!0):(n(),v(F,{key:0},[m(ee,{class:"mb-6",arcade:N.value,"use-small":!0},null,8,["arcade"]),m(q,{icon:r(z),title:"Game Event Settings",main:""},null,8,["icon"]),m(H,{class:"mb-6"},{default:p(()=>[d("div",ne,[m(B,{label:"Select Game",help:"Pick a game and version to get started."},{default:p(()=>[d("div",se,[d("div",null,[e[4]||(e[4]=d("p",{class:"pb-2 text-lg"},"Game",-1)),m(f,{modelValue:l.game,"onUpdate:modelValue":e[0]||(e[0]=a=>l.game=a),name:"game",options:P()},null,8,["modelValue","options"])]),l.game?(n(),v("div",re,[e[5]||(e[5]=d("p",{class:"pb-2 text-lg"},"Version",-1)),m(f,{modelValue:l.version,"onUpdate:modelValue":e[1]||(e[1]=a=>l.version=a),name:"version",options:j()},null,8,["modelValue","options"])])):u("",!0)])]),_:1})]),l.game&&l.version?(n(),v("div",ie,[d("h2",me,[e[6]||(e[6]=K(" Settings for ")),d("b",null,Q(D()),1)]),e[7]||(e[7]=d("hr",{class:"pb-1 my-2"},null,-1)),(n(!0),v(F,null,X(E(),a=>(n(),c(B,{key:a.id,label:a.name,help:a.help},{default:p(()=>{var s,V,b,U,x;return[a.type=="String"?(n(),c(f,{key:0,"model-value":(s=r(g)(t.value,a.id))!=null?s:"",name:a.name,placeholder:"Not Set","onUpdate:modelValue":i=>r(k)(t.value,a.id,i)},null,8,["model-value","name","onUpdate:modelValue"])):u("",!0),a.type=="LargeText"?(n(),c(f,{key:1,"model-value":(V=r(g)(t.value,a.id))!=null?V:"",name:a.name,placeholder:"Not Set",type:"textarea","onUpdate:modelValue":i=>r(k)(t.value,a.id,i)},null,8,["model-value","name","onUpdate:modelValue"])):u("",!0),a.type=="Boolean"?(n(),c(ae,{key:2,name:a.id,"model-value":Boolean((b=r(g)(t.value,a.id))!=null?b:0),"input-value":!0,type:"switch","onUpdate:modelValue":i=>r(k)(t.value,a.id,i!=null?i:0)},null,8,["name","model-value","onUpdate:modelValue"])):u("",!0),a.type=="Array"?(n(),c(f,{key:3,"model-value":(U=r(g)(t.value,a.id))!=null?U:0,options:a.options,name:a.id,selected:(x=r(g)(t.value,a.id))!=null?x:0,placeholder:"Select...","onUpdate:modelValue":i=>r(k)(t.value,a.id,Number(i))},null,8,["model-value","options","name","selected","onUpdate:modelValue"])):u("",!0)]}),_:2},1032,["label","help"]))),128)),JSON.stringify(t.value)!=JSON.stringify(y.value)?(n(),v("div",de,[m(I,{color:"success",label:"Save",onClick:e[2]||(e[2]=a=>M())}),m(I,{color:"danger",label:"Revert",onClick:e[3]||(e[3]=a=>h())})])):u("",!0)])):u("",!0)]),_:1})],64))]),_:1})]),_:1}))}};export{Ve as default};
