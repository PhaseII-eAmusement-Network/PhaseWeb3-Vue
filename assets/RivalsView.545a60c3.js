import{s as p,au as S,a as i,c as d,w as r,b as t,g as e,e as u,i as m,k as _,at as L,X as b,aK as B,_ as f,j as w,t as g,f as k,F as x,aL as A,l as j,n as F,p as G,q as z}from"./index.c51aed58.js";import{_ as E}from"./ProfileCard.599f6ba6.js";import{_ as N}from"./FormField.317d97da.js";import{_ as V}from"./FormControl.d47e4637.js";import"./userData.bcc92478.js";const U={class:"md:flex md:justify-end pb-6 items-center"},Y={key:0,class:"mt-2 md:mt-0 md:w-1/3 md:text-right"},P=e("h2",{class:"text-md sm:text-lg md:text-xl font-bold p-2"}," Select Version ",-1),T={class:"bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3"},q={class:"w-full"},H={class:"grid gap-3"},K={class:"flex justify-between items-center"},M={class:"flex"},O=e("img",{class:"w-10 mr-3",src:"https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/"},null,-1),X={class:"grid"},Z={class:"text-lg"},J={class:"text-md font-mono"},Q={class:"grid gap-3"},W={class:"flex justify-between items-center"},ee={class:"flex"},se=e("img",{class:"w-10 mr-3",src:"https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/"},null,-1),te={class:"grid"},ae={class:"text-lg"},ie={class:"text-md font-mono"},ue={__name:"RivalsView",setup(oe){const y=G(),$=z();var v=null,o=null;const D={id:1,name:"Trmazi",extid:12345678,avatar:"https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/",last:{arcade:"GhettoCade",date:"7/16/2023"}},h=[{id:1,name:"TRMAZI",rivalID:"1234-5678"},{id:2,name:"BLADE",rivalID:"1454-5687"},{id:3,name:"HO!",rivalID:"5364-5568"}],a=p({currentVersion:null}),l=p({filter:null});v=y.params.game,o=S(v),o.versions||(a.currentVersion=1),o||$.push({name:"ErrorPage",params:{catchAll:"404"}});function I(){if(l.filter)return h.filter(n=>n.name.toLowerCase().includes(l.filter.toLowerCase())||n.rivalID.toLowerCase().includes(l.filter.toLowerCase()))}function R(){var n=null;return a.currentVersion?n=`/assets/games/${o.id}/card/${a.currentVersion}.webp`:n=o.cardBG,n}function C(){return`
      background-image: url('${R()}');
      background-size: cover;
      background-repeat: no-repeat;
    `}return(n,c)=>(i(),d(F,null,{default:r(()=>[t(j,null,{default:r(()=>[e("div",U,[u(o).versions?(i(),m("div",Y,[P,t(V,{modelValue:a.currentVersion,"onUpdate:modelValue":c[0]||(c[0]=s=>a.currentVersion=s),options:u(o).versions},null,8,["modelValue","options"])])):_("",!0)]),a.currentVersion?(i(),m("div",{key:0,style:L(C()),class:"rounded-2xl mb-6"},[e("div",T,[e("div",q,[t(E,{"use-small":"",profile:D})])])],4)):_("",!0),t(b,{icon:u(B),title:"Add a Rival",main:""},null,8,["icon"]),a.currentVersion?(i(),d(f,{key:1,class:"mb-6"},{default:r(()=>[t(N,{label:"Search",help:"Search by username or Rival ID to add a rival.",class:"w-full md:w-1/3"},{default:r(()=>[t(V,{modelValue:l.filter,"onUpdate:modelValue":c[1]||(c[1]=s=>l.filter=s),"model-value":l.filter,placeholder:"1234-5678"},null,8,["modelValue","model-value"])]),_:1}),e("div",H,[(i(!0),m(x,null,w(I(),s=>(i(),d(f,{key:s.id},{default:r(()=>[e("div",K,[e("div",M,[O,e("div",X,[e("h1",Z,g(s.name),1),e("h2",J,g(s.rivalID),1)])]),t(k,{label:"Add Rival",color:"success"})])]),_:2},1024))),128))])]),_:1})):_("",!0),t(b,{icon:u(A),title:"Rivals",main:""},null,8,["icon"]),a.currentVersion?(i(),d(f,{key:2,class:"mb-6"},{default:r(()=>[e("div",Q,[(i(),m(x,null,w(h,s=>t(f,{key:s.id},{default:r(()=>[e("div",W,[e("div",ee,[se,e("div",te,[e("h1",ae,g(s.name),1),e("h2",ie,g(s.rivalID),1)])]),t(k,{label:"Remove Rival",color:"danger"})])]),_:2},1024)),64))])]),_:1})):_("",!0)]),_:1})]),_:1}))}};export{ue as default};
