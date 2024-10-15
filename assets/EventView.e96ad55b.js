import{u as G,r as g,o as N,s as U,N as w,a as l,c as r,w as d,b as s,i as u,W as E,e as O,ak as A,_ as F,g as i,k as m,U as M,t as W,F as h,j,f as D,l as P,n as T,p as q,ap as v,aq as L}from"./index.01bf54cf.js";import{_ as Q}from"./ArcadeCard.f542ce08.js";import{_ as y}from"./FormField.0ae2eb30.js";import{_ as c}from"./FormControl.975fbbf3.js";import{_ as R}from"./FormCheckRadio.6c156189.js";const X={class:"mb-4"},z={class:"grid md:grid-cols-2 gap-4"},H=i("p",{class:"pb-2 text-lg"},"Game",-1),J={key:0},K=i("p",{class:"pb-2 text-lg"},"Version",-1),Y={key:0},Z={class:"text-xl"},ee=i("hr",{class:"pb-1 my-2"},null,-1),ie={__name:"EventView",setup(ae){const b=G(),f=g({}),_=g(!0),V=q(),S=parseInt(V.params.id);N(async()=>{try{const t=await b.getArcade(S);f.value=t,_.value=!1}catch(t){console.log("Failed to fetch arcade data:",t)}});const p=[{id:"iidx",versions:[{id:22,settings:[{id:0,keyId:"coke",type:Boolean,name:"Enable Coke-X-BEMANI",tooltip:"Enables the long forgotten Coca-Cola event.",value:!0},{id:1,keyId:"phase",type:Array,name:"Current BOSS Phase",tooltip:"Set the main game event.",options:[{id:0,label:"No Event"},{id:1,label:"Chrono Seeker"},{id:2,label:"QPronicle Chord"}],value:1}]}]},{id:"dm",versions:[{id:18,settings:[{id:0,keyId:"banner",type:String,name:"Title Screen Banner",tooltip:"Set the text for the banner.",value:""}]},{id:17,settings:[{id:0,keyId:"banner",type:String,name:"Title Screen Banner",tooltip:"Set the text for the banner.",value:""}]}]}],o=U({game:null,version:null});function k(){var t=[];for(const a of L)p.find(n=>n.id==a.id)&&t.push(a.id);return t}function I(){var t=[];const a=k();for(const e of a)t.push({id:e,label:v(e).name});return t}function $(){const t=p.find(e=>e.id==o.game);var a=[];for(const e of t.versions){const n=v(o.game).versions.find(C=>C.id==e.id);a.push({id:e.id,label:n.label})}return a}function x(){return p.find(a=>a.id==o.game).versions.find(a=>a.id==o.version)}function B(){const t=v(o.game),a=t.versions.find(e=>e.id==o.version);return`${t.name} ${a.label}`}return w(()=>o.game,()=>{o.version=null}),(t,a)=>(l(),r(T,null,{default:d(()=>[s(P,null,{default:d(()=>[_.value?m("",!0):(l(),u(h,{key:0},[s(Q,{class:"mb-6",arcade:f.value,"use-small":!0},null,8,["arcade"]),s(E,{icon:O(A),title:"Game Event Settings",main:""},null,8,["icon"]),s(F,{class:"mb-6"},{default:d(()=>[i("div",X,[s(y,{label:"Select Game",help:"Pick a game and version to get started."},{default:d(()=>[i("div",z,[i("div",null,[H,s(c,{modelValue:o.game,"onUpdate:modelValue":a[0]||(a[0]=e=>o.game=e),name:"game",options:I()},null,8,["modelValue","options"])]),o.game?(l(),u("div",J,[K,s(c,{modelValue:o.version,"onUpdate:modelValue":a[1]||(a[1]=e=>o.version=e),name:"version",options:$()},null,8,["modelValue","options"])])):m("",!0)])]),_:1})]),o.game&&o.version?(l(),u("div",Y,[i("h2",Z,[M(" Settings for "),i("b",null,W(B()),1)]),ee,(l(!0),u(h,null,j(x().settings,e=>(l(),r(y,{key:e.id,label:e.name,help:e.tooltip},{default:d(()=>[e.type==String?(l(),r(c,{key:0,modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,"model-value":e.value,name:e.keyId,placeholder:"Not Set"},null,8,["modelValue","onUpdate:modelValue","model-value","name"])):e.type==Boolean?(l(),r(R,{key:1,modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,"input-value":e.value,type:"switch",name:e.keyId},null,8,["modelValue","onUpdate:modelValue","input-value","name"])):m("",!0),e.type==Array?(l(),r(c,{key:2,modelValue:e.options[e.value],"onUpdate:modelValue":n=>e.options[e.value]=n,name:e.keyId,options:e.options,placeholder:"Select..."},null,8,["modelValue","onUpdate:modelValue","name","options"])):m("",!0)]),_:2},1032,["label","help"]))),128)),s(D,{color:"success",type:"submit",label:"Save",small:!1})])):m("",!0)]),_:1})],64))]),_:1})]),_:1}))}};export{ie as default};
