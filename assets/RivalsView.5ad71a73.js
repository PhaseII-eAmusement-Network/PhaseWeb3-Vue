import{s as p,av as A,a as i,c as d,w as r,b as t,g as e,e as m,i as u,k as _,at as L,X as w,aK as B,_ as f,j as b,t as v,f as k,F as x,aL as j,l as E,n as F,p as G,q as P}from"./index.26ff47d4.js";import{_ as T}from"./ProfileCard.5d6ea02b.js";import{_ as z}from"./FormField.3920cd23.js";import{_ as V}from"./FormControl.e7078065.js";import"./userData.bcc92478.js";const N={class:"md:flex md:justify-end pb-6 items-center"},U={key:0,class:"mt-2 md:mt-0 md:w-1/3 md:text-right"},Y=e("h2",{class:"text-md sm:text-lg md:text-xl font-bold p-2"}," Select Version ",-1),H={class:"bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3"},q={class:"w-full"},K={class:"grid gap-3"},M={class:"flex justify-between items-center"},O={class:"flex"},X=e("img",{class:"w-10 mr-3",src:"https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/"},null,-1),Z={class:"grid"},J={class:"text-lg"},Q={class:"text-md font-mono"},W={class:"grid gap-3"},ee={class:"flex justify-between items-center"},se={class:"flex"},te=e("img",{class:"w-10 mr-3",src:"https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/"},null,-1),ae={class:"grid"},ie={class:"text-lg"},oe={class:"text-md font-mono"},ue={__name:"RivalsView",setup(ne){const y="https://cdn.phaseii.network/file/PhaseII/web-assets",$=G(),I=P();var g=null,o=null;const D={id:1,name:"Trmazi",extid:12345678,avatar:"https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/",last:{arcade:"GhettoCade",date:"7/16/2023"}},h=[{id:1,name:"TRMAZI",rivalID:"1234-5678"},{id:2,name:"BLADE",rivalID:"1454-5687"},{id:3,name:"HO!",rivalID:"5364-5568"}],a=p({currentVersion:null}),l=p({filter:null});g=$.params.game,o=A(g),o.versions||(a.currentVersion=1),o||I.push({name:"ErrorPage",params:{catchAll:"404"}});function R(){if(l.filter)return h.filter(n=>n.name.toLowerCase().includes(l.filter.toLowerCase())||n.rivalID.toLowerCase().includes(l.filter.toLowerCase()))}function S(){var n=null;return a.currentVersion?n=`${y}/games/${o.id}/card/${a.currentVersion}.webp`:n=o.cardBG,n}function C(){return`
      background-image: url('${S()}');
      background-size: cover;
      background-repeat: no-repeat;
    `}return(n,c)=>(i(),d(F,null,{default:r(()=>[t(E,null,{default:r(()=>[e("div",N,[m(o).versions?(i(),u("div",U,[Y,t(V,{modelValue:a.currentVersion,"onUpdate:modelValue":c[0]||(c[0]=s=>a.currentVersion=s),options:m(o).versions},null,8,["modelValue","options"])])):_("",!0)]),a.currentVersion?(i(),u("div",{key:0,style:L(C()),class:"rounded-2xl mb-6"},[e("div",H,[e("div",q,[t(T,{"use-small":"",profile:D})])])],4)):_("",!0),t(w,{icon:m(B),title:"Add a Rival",main:""},null,8,["icon"]),a.currentVersion?(i(),d(f,{key:1,class:"mb-6"},{default:r(()=>[t(z,{label:"Search",help:"Search by username or Rival ID to add a rival.",class:"w-full md:w-1/3"},{default:r(()=>[t(V,{modelValue:l.filter,"onUpdate:modelValue":c[1]||(c[1]=s=>l.filter=s),"model-value":l.filter,placeholder:"1234-5678"},null,8,["modelValue","model-value"])]),_:1}),e("div",K,[(i(!0),u(x,null,b(R(),s=>(i(),d(f,{key:s.id},{default:r(()=>[e("div",M,[e("div",O,[X,e("div",Z,[e("h1",J,v(s.name),1),e("h2",Q,v(s.rivalID),1)])]),t(k,{label:"Add Rival",color:"success"})])]),_:2},1024))),128))])]),_:1})):_("",!0),t(w,{icon:m(j),title:"Rivals",main:""},null,8,["icon"]),a.currentVersion?(i(),d(f,{key:2,class:"mb-6"},{default:r(()=>[e("div",W,[(i(),u(x,null,b(h,s=>t(f,{key:s.id},{default:r(()=>[e("div",ee,[e("div",se,[te,e("div",ae,[e("h1",ie,v(s.name),1),e("h2",oe,v(s.rivalID),1)])]),t(k,{label:"Remove Rival",color:"danger"})])]),_:2},1024)),64))])]),_:1})):_("",!0)]),_:1})]),_:1}))}};export{ue as default};