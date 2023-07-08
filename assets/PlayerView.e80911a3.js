import{s as y,al as V,d as n,w as d,e as x,k as $,u as B,o as a,a as l,b as r,f as h,g as m,p as f,c as _,n as A,h as t,_ as C,F as P,r as N,i as F,as as E,q as G,W as R}from"./index.afb896a8.js";import{_ as z}from"./ProfileCard.101ceabd.js";import{_ as I}from"./FormField.ac36bae5.js";import{_ as D}from"./FormCheckRadio.e412f963.js";import{_ as c}from"./FormControl.b692a821.js";const L={class:"md:flex pb-6 md:px-5 md:space-x-10 md:justify-between md:items-center"},T={class:"mt-2 md:mt-0 md:w-1/3 md:text-right"},U=r("h2",{class:"text-md sm:text-lg md:text-xl font-bold p-2"}," Select Version ",-1),W={class:"bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3"},j={class:"w-full"},q={key:2},H={class:"space-x-2"},Q={__name:"PlayerView",setup(M){const b=$(),k=B();var p=null,i=null;const s=y({currentVersion:null}),w=[{id:"username",name:"Username",help:"Set your username for this profile",type:String},{id:"fastSlow",name:"Fast/Slow Display",help:"Enable or disable displaying of Fast/Slow",type:Boolean},{id:"comboPosition",name:"Combo Position",help:"Change order of the combo and notes",type:Boolean},{id:"weight",name:"Weight (kg)",help:"Set your weight for in-game workout mode",type:Number},{id:"dancer",name:"Character",help:"Set your background dancer",type:Array,options:[{id:0,label:"Afro"},{id:1,label:"Emi"}]},{id:"arrow",name:"Arrow Skin",help:"Set your arrow skin",type:Array,options:[{id:0,label:"Normal"},{id:1,label:"Classic"}]}],o=y({username:"TRMAZI",fastSlow:!0,comboPosition:!1,weight:100,dancer:0,arrow:1,guideLines:0,filter:3});p=b.params.game,i=V(p),i||k.push({name:"ErrorPage",params:{catchAll:"404"}});function g(){var u=null;return s.currentVersion?u=`/assets/games/${i.id}/card/${s.currentVersion}.png`:u=i.cardBG,u}function S(){return`
      background-image: url('${g()}');
      background-size: cover;
      background-repeat: no-repeat;
    `}return(u,v)=>(a(),n(x,null,{default:d(()=>[l(F,null,{default:d(()=>[r("div",L,[r("div",null,[l(h,{icon:m(E),title:"View Profile",main:""},null,8,["icon"]),l(f,{icon:m(G),href:"/#/games/"+m(p),class:"w-full md:w-auto",color:"info",label:"Go Back"},null,8,["icon","href"])]),r("div",T,[U,l(c,{modelValue:s.currentVersion,"onUpdate:modelValue":v[0]||(v[0]=e=>s.currentVersion=e),options:m(i).versions},null,8,["modelValue","options"])])]),s.currentVersion?(a(),_("div",{key:0,style:A(S()),class:"rounded-2xl mb-6"},[r("div",W,[r("div",j,[l(z,{"use-small":"",avatar:"https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/"})])])],4)):t("",!0),s.currentVersion?(a(),n(h,{key:1,icon:m(R),title:"Profile Customizations",main:""},null,8,["icon"])):t("",!0),s.currentVersion?(a(),_("div",q,[l(C,null,{footer:d(()=>[r("div",H,[l(f,{type:"submit",color:"success",label:"Save"}),l(f,{type:"submit",color:"danger",label:"Revert"})])]),default:d(()=>[r("div",null,[(a(),_(P,null,N(w,e=>l(I,{key:e.id,label:e.name,help:e.help},{default:d(()=>[e.type==String?(a(),n(c,{key:0,"v-model":o[e.id],"model-value":o[e.id]},null,8,["v-model","model-value"])):t("",!0),e.type==Number?(a(),n(c,{key:1,"v-model":o[e.id],"model-value":o[e.id],type:"number"},null,8,["v-model","model-value"])):t("",!0),e.type==Array?(a(),n(c,{key:2,options:e.options,"v-model":o[e.id],"model-value":o[e.id],selected:o[e.id]},null,8,["options","v-model","model-value","selected"])):t("",!0),e.type==Boolean?(a(),n(D,{key:3,"v-model":o[e.id],"model-value":o[e.id],type:"switch"},null,8,["v-model","model-value"])):t("",!0)]),_:2},1032,["label","help"])),64))])]),_:1})])):t("",!0)]),_:1})]),_:1}))}};export{Q as default};
