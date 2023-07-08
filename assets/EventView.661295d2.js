import{ab as x,s as B,ae as C,d as r,w as d,e as G,k as N,o as l,a as s,g as v,f as U,_ as E,b as i,c as p,h as m,X as w,t as O,F as A,r as D,p as F,i as P,al as f,am as T,an as W}from"./index.afb896a8.js";import{_ as j}from"./ArcadeCard.1fd1bc81.js";import{_}from"./FormField.ac36bae5.js";import{_ as u}from"./FormControl.b692a821.js";import{_ as L}from"./FormCheckRadio.e412f963.js";import"./area.7873ab93.js";const M={class:"mb-4"},X={class:"grid md:grid-cols-2 gap-4"},Q=i("p",{class:"pb-2 text-lg"},"Game",-1),R={key:0},q=i("p",{class:"pb-2 text-lg"},"Version",-1),z={key:0},H={class:"text-xl"},J=i("hr",{class:"pb-1 my-2"},null,-1),ne={__name:"EventView",setup(K){const g=N(),h=parseInt(g.params.id),b=x.find(o=>o.id===h),c=[{id:"iidx",versions:[{id:22,settings:[{id:0,keyId:"coke",type:Boolean,name:"Enable Coke-X-BEMANI",tooltip:"Enables the long forgotten Coca-Cola event.",value:!0},{id:1,keyId:"phase",type:Array,name:"Current BOSS Phase",tooltip:"Set the main game event.",options:[{id:0,label:"No Event"},{id:1,label:"Chrono Seeker"},{id:2,label:"QPronicle Chord"}],value:1}]}]},{id:"dm",versions:[{id:18,settings:[{id:0,keyId:"banner",type:String,name:"Title Screen Banner",tooltip:"Set the text for the banner.",value:""}]},{id:17,settings:[{id:0,keyId:"banner",type:String,name:"Title Screen Banner",tooltip:"Set the text for the banner.",value:""}]}]}],t=B({game:null,version:null});function V(){var o=[];for(const a of W)c.find(n=>n.id==a.id)&&o.push(a.id);return o}function y(){var o=[];const a=V();for(const e of a)o.push({id:e,label:f(e).name});return o}function S(){const o=c.find(e=>e.id==t.game);var a=[];for(const e of o.versions){const n=f(t.game).versions.find($=>$.id==e.id);a.push({id:e.id,label:n.label})}return a}function k(){return c.find(a=>a.id==t.game).versions.find(a=>a.id==t.version)}function I(){const o=f(t.game),a=o.versions.find(e=>e.id==t.version);return`${o.name} ${a.label}`}return C(()=>t.game,()=>{t.version=null}),(o,a)=>(l(),r(G,null,{default:d(()=>[s(P,null,{default:d(()=>[s(j,{class:"mb-6","arcade-data":v(b)},null,8,["arcade-data"]),s(U,{icon:v(T),title:"Game Event Settings",main:""},null,8,["icon"]),s(E,{class:"mb-6"},{default:d(()=>[i("div",M,[s(_,{label:"Select Game",help:"Pick a game and version to get started."},{default:d(()=>[i("div",X,[i("div",null,[Q,s(u,{modelValue:t.game,"onUpdate:modelValue":a[0]||(a[0]=e=>t.game=e),name:"game",options:y()},null,8,["modelValue","options"])]),t.game?(l(),p("div",R,[q,s(u,{modelValue:t.version,"onUpdate:modelValue":a[1]||(a[1]=e=>t.version=e),name:"version",options:S()},null,8,["modelValue","options"])])):m("",!0)])]),_:1})]),t.game&&t.version?(l(),p("div",z,[i("h2",H,[w(" Settings for "),i("b",null,O(I()),1)]),J,(l(!0),p(A,null,D(k().settings,e=>(l(),r(_,{key:e.id,label:e.name,help:e.tooltip},{default:d(()=>[e.type==String?(l(),r(u,{key:0,modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,"model-value":e.value,name:e.keyId,placeholder:"Not Set"},null,8,["modelValue","onUpdate:modelValue","model-value","name"])):e.type==Boolean?(l(),r(L,{key:1,modelValue:e.value,"onUpdate:modelValue":n=>e.value=n,"input-value":e.value,type:"switch",name:e.keyId},null,8,["modelValue","onUpdate:modelValue","input-value","name"])):m("",!0),e.type==Array?(l(),r(u,{key:2,modelValue:e.options[e.value],"onUpdate:modelValue":n=>e.options[e.value]=n,name:e.keyId,options:e.options,placeholder:"Select..."},null,8,["modelValue","onUpdate:modelValue","name","options"])):m("",!0)]),_:2},1032,["label","help"]))),128)),s(F,{color:"success",type:"submit",label:"Save",small:!1})])):m("",!0)]),_:1})]),_:1})]),_:1}))}};export{ne as default};
