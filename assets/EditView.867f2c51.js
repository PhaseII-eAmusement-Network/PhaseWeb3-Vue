import{r as h,s as U,N as x,at as q,a,c as t,w as p,g as i,b as u,f as g,R as j,i as $,F as N,j as Q,_ as C,u as G,ad as z,o as F,e as b,m as A,k as v,P as T,au as I,ac as K,l as M,n as O,p as D,q as H}from"./index.5a8eb10d.js";import{b as L,U as J,_ as W}from"./ProfileCard.98a175d5.js";import{_ as R}from"./FormField.e8b1a672.js";import{_ as X}from"./FormCheckRadio.6c921b78.js";import{_ as w}from"./FormControl.d00df61e.js";import"./userData.bcc92478.js";const Y={class:"grid md:grid-cols-2 space-y-6 align-center"},Z={class:"place-self-center"},ee={class:"space-x-2"},le={__name:"EmblemCardBox",props:{profile:{type:Object,default:null},version:{type:Number,default:14}},setup(P){var m,S;const c=P,f=h(c.profile),_=h(c.version),d=h(0),s=U(y((S=(m=f.value)==null?void 0:m.last)==null?void 0:S.emblem)),l=h([]);x(()=>c.version,()=>{var e;f.value=c.profile,_.value=c.version,r(),s.value=y((e=f.value.last)==null?void 0:e.emblem)}),x(s,()=>{d.value++},{deep:!0}),r();function r(){q.get(`https://web3.phaseii.network/gameassets/emblems/${_.value}.json`).then(e=>{e.data&&(l.value=e.data)}).catch(e=>{console.log(e.message)})}function y(e){return e?{background:e[0],main:e[1],ornament:e[2],effect:e[3],speech_bubble:e[4]}:{background:0,main:0,ornament:0,effect:0,speech_bubble:0}}function k(e){return e?[e.background,e.main,e.ornament,e.effect,e.speech_bubble]:[0,0,0,0,0]}return(e,B)=>(a(),t(C,{class:"mt-6"},{footer:p(()=>[i("div",ee,[u(g,{type:"submit",color:"success",label:"Save"}),u(g,{type:"submit",color:"danger",label:"Revert"})])]),default:p(()=>[u(j,{color:"info",label:"Emblem",class:"mb-2"}),i("div",Y,[i("div",null,[(a(!0),$(N,null,Q(l.value,o=>(a(),t(R,{key:o.id,label:o.name,help:o.help},{default:p(()=>[u(w,{modelValue:s[o.id],"onUpdate:modelValue":V=>s[o.id]=V,options:o.options},null,8,["modelValue","onUpdate:modelValue","options"])]),_:2},1032,["label","help"]))),128))]),i("div",Z,[(a(),t(L,{key:d.value,version:_.value,profile:{last:{emblem:k(s)}},size:300},null,8,["version","profile"]))])])]),_:1}))}},re={class:"grid md:grid-cols-2 space-y-6 align-center"},se={class:"place-self-center"},oe={class:"space-x-2"},ae={__name:"QproCardBox",props:{profile:{type:Object,default:null},version:{type:Number,default:14}},setup(P){var y,k;const c=P,f=h(c.profile),_=h(c.version),d=h(0),s=U((k=(y=f.value)==null?void 0:y.qpro)!=null?k:{head:0,hair:0,face:0,body:0,hand:0}),l=h([]);x(()=>c.version,()=>{var m;f.value=c.profile,r(),s.value=(m=f.value)==null?void 0:m.qpro}),x(()=>c.version,()=>{_.value=c.version}),x(s,()=>{d.value++},{deep:!0}),r();function r(){q.get(`https://web3.phaseii.network/gameassets/qpro/${_.value}.json`).then(m=>{m.data&&(l.value=m.data)}).catch(m=>{console.log(m.message)})}return(m,S)=>(a(),t(C,{class:"mt-6"},{footer:p(()=>[i("div",oe,[u(g,{type:"submit",color:"success",label:"Save"}),u(g,{type:"submit",color:"danger",label:"Revert"})])]),default:p(()=>[u(j,{color:"info",label:"QPro",class:"mb-2"}),i("div",re,[i("div",null,[(a(!0),$(N,null,Q(l.value,e=>(a(),t(R,{key:e.id,label:e.name,help:e.help},{default:p(()=>[u(w,{modelValue:s[e.id],"onUpdate:modelValue":B=>s[e.id]=B,options:e.options},null,8,["modelValue","onUpdate:modelValue","options"])]),_:2},1032,["label","help"]))),128))]),i("div",se,[(a(),t(J,{key:d.value,version:_.value,profile:{qpro:s},style:{scale:"1.9"},class:"my-16 mb-10"},null,8,["version","profile"]))])])]),_:1}))}},ne={class:"md:flex pb-6 md:justify-between md:items-center"},te={key:0,class:"mt-2 md:mt-0 md:w-1/3 md:text-right"},ue=i("h2",{class:"text-md sm:text-lg md:text-xl font-bold p-2"}," Select Version ",-1),ie=["src"],ce={class:"bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3 card-content"},de={class:"w-full"},me={key:2},ve={class:"space-x-2"},Ve={__name:"EditView",setup(P){const c=D(),f=H(),_=G();var d=null,s=null;const l=U({currentVersion:null});x(()=>l.currentVersion,()=>{B()}),d=c.params.game,s=z(d),s||f.push({name:"ErrorPage",params:{catchAll:"404"}}),s.versions||(l.currentVersion=1);const r=h(null);F(()=>{B()});var y=[{id:"name",name:"Username",help:"Set your username for this profile",type:String}];function k(){return l.currentVersion?`/assets/games/${s.id}/card/${l.currentVersion}.webp`:s.cardBG}function m(){var o;return l.currentVersion&&((o=s.videoTable)==null?void 0:o.includes(l.currentVersion))?`https://web3.phaseii.network/gameassets/video/${s.id}/${l.currentVersion}.mp4`:null}function S(){var o;return(o=s.videoTable)!=null&&o.includes(l.currentVersion)?null:`
      background-image: url('${k()}');
      background-size: cover;
      background-repeat: no-repeat;
    `}function e(o){var V=[];for(const E of s.versions)o.includes(E.id)&&V.push(E);return V}async function B(){try{r.value=null;const o=await _.getUserProfile(d,l.currentVersion);r.value=o,o&&!l.currentVersion&&(l.currentVersion=o.versions[o.versions.length-1])}catch(o){console.error("Failed to fetch user profile data:",o)}}return(o,V)=>(a(),t(O,null,{default:p(()=>[u(M,null,{default:p(()=>{var E;return[i("div",ne,[u(g,{icon:b(A),href:`/#/games/${b(d)}`,class:"w-full md:w-auto",color:"info",label:"Go Back"},null,8,["icon","href"]),b(s).versions&&r.value?(a(),$("div",te,[ue,u(w,{modelValue:l.currentVersion,"onUpdate:modelValue":V[0]||(V[0]=n=>l.currentVersion=n),options:e(r.value.versions)},null,8,["modelValue","options"])])):v("",!0)]),l.currentVersion?(a(),t(T,{key:0,icon:b(I),title:"Profile Customizations",main:""},null,8,["icon"])):v("",!0),l.currentVersion&&r.value?(a(),$("div",{key:1,style:K(S()),class:"rounded-2xl mb-6 card-container"},[i("video",{autoplay:"",muted:"",loop:"",playsinline:"",src:m(),class:"background-video"},null,8,ie),i("div",ce,[i("div",de,[r.value?(a(),t(W,{key:0,"use-small":"",game:b(d),profile:r.value,version:l.currentVersion},null,8,["game","profile","version"])):v("",!0)])])],4)):v("",!0),l.currentVersion&&r.value?(a(),$("div",me,[u(C,null,{footer:p(()=>[i("div",ve,[u(g,{type:"submit",color:"success",label:"Save"}),u(g,{type:"submit",color:"danger",label:"Revert"})])]),default:p(()=>[i("div",null,[u(j,{color:"info",label:"General",class:"mb-2"}),(a(!0),$(N,null,Q(b(y),n=>(a(),t(R,{key:n.id,label:n.name,help:n.help},{default:p(()=>[n.type==String?(a(),t(w,{key:0,"v-model":r.value[n.id],"model-value":r.value[n.id]},null,8,["v-model","model-value"])):v("",!0),n.type==Number?(a(),t(w,{key:1,"v-model":r.value[n.id],"model-value":r.value[n.id],type:"number"},null,8,["v-model","model-value"])):v("",!0),n.type==Array?(a(),t(w,{key:2,options:n.options,"v-model":r.value[n.id],"model-value":r.value[n.id],selected:r.value[n.id]},null,8,["options","v-model","model-value","selected"])):v("",!0),n.type==Boolean?(a(),t(X,{key:3,"v-model":r.value[n.id],"model-value":r.value[n.id],type:"switch"},null,8,["v-model","model-value"])):v("",!0)]),_:2},1032,["label","help"]))),128))])]),_:1}),b(d)=="jubeat"&&l.currentVersion>=10&&((E=r.value.last)==null?void 0:E.emblem)?(a(),t(le,{key:0,profile:r.value,version:l.currentVersion},null,8,["profile","version"])):v("",!0),(b(d)=="iidx"||b(d)=="iidxclass")&&l.currentVersion>=19?(a(),t(ae,{key:1,profile:r.value,version:l.currentVersion},null,8,["profile","version"])):v("",!0)])):v("",!0)]}),_:1})]),_:1}))}};export{Ve as default};
