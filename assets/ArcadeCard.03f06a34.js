import{r as y,a,i as t,b as o,w as k,g as s,t as l,e as c,c as x,R as h,a6 as w,k as u,a7 as v,Y as n,F as d,j as _,f,a8 as S,a2 as $,a9 as p,aa as B,ab as j,ac as C}from"./index.93cb35a3.js";const N={class:"space-y-3 text-center w-full"},V={class:"text-2xl lg:text-3xl font-bold"},A={class:"flex gap-2 justify-center items-center"},E={class:"text-xl md:text-2xl font-bold"},H={class:"flex flex-wrap gap-4 place-content-center"},L=s("hr",{class:"border-t border-1 w-full"},null,-1),M={key:0,class:"text-lg"},T=s("span",{class:"font-normal"}," and",-1),q=s("span",{class:"font-normal"}," and",-1),z={key:1,class:"md:w-full grid grid-cols-1 md:grid-cols-3 gap-3"},D={key:2,class:"w-full flex justify-center"},R={__name:"ArcadeCard",props:{useSmall:{type:Boolean,required:!1,default:!1},arcade:{type:Object,required:!0}},setup(e){var g=y(e.arcade.data);function b(m){if(m!==null)return`
      background-image: url('${m}');
      background-size: cover;
      background-repeat: no-repeat;
    `}return(m,O)=>(a(),t("div",{style:C(b("/assets/card/carpet.webp")),class:"rounded-2xl mb-6 w-full"},[o(j,{type:"justify-center",class:"bg-white dark:bg-slate-900/90 rounded-2xl p-6 w-full"},{default:k(()=>[s("div",N,[s("h1",V,l(e.arcade.name),1),s("div",A,[s("h2",E,l(e.arcade.description),1)]),s("div",H,[c(g).is_beta?(a(),x(h,{key:0,label:"Beta Enabled",color:"warning",icon:c(w)},null,8,["icon"])):u("",!0),o(h,{label:"Private Arcade",color:"info",icon:c(v)},null,8,["icon"])]),L,e.arcade.owners&&e.arcade.owners.length?(a(),t("p",M,[n(" Managed by "),(a(!0),t(d,null,_(e.arcade.owners,(r,i)=>(a(),t("span",{key:r.username,class:"font-bold"},[e.arcade.owners.length===2&&i===0?(a(),t(d,{key:0},[n(l(r.username),1)],64)):e.arcade.owners.length===2&&i===1?(a(),t(d,{key:1},[T,n(" "+l(r.username)+".",1)],64)):i===0?(a(),t(d,{key:2},[n(l(r.username),1)],64)):i===e.arcade.owners.length-1?(a(),t(d,{key:3},[n(", "),q,n(" "+l(r.username)+".",1)],64)):(a(),t(d,{key:4},[n(", "+l(r.username),1)],64))]))),128))])):u("",!0),e.useSmall?u("",!0):(a(),t("div",z,[o(f,{href:`/#/arcade/${e.arcade.id}/events`,icon:c(S),color:"info",label:"Event Settings"},null,8,["href","icon"]),o(f,{href:`/#/arcade/${e.arcade.id}/machines`,icon:c($),color:"info",label:"Machine List"},null,8,["href","icon"]),o(f,{href:`/#/arcade/${e.arcade.id}/paseli`,icon:c(p),color:"info",label:"PASELI"},null,8,["href","icon"])])),e.useSmall?(a(),t("div",D,[o(f,{href:`/#/arcade/${e.arcade.id}`,icon:c(B),color:"info",label:"Arcade Home",class:"w-full md:w-[150px]"},null,8,["href","icon"])])):u("",!0)])]),_:1})],4))}};export{R as _};
