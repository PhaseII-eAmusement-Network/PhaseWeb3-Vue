import{r as x,a,i as t,b as o,w as k,g as s,t as c,e as l,c as _,Y as m,ar as p,k as h,as as v,V as n,F as d,j as $,f as u,at as S,au as A,ac as B,av as V,aw as C,ax as E}from"./index.6cfed067.js";const N={class:"space-y-3 text-center w-full"},T={class:"text-2xl lg:text-3xl font-bold"},j={class:"flex gap-2 justify-center items-center"},H={class:"text-xl md:text-2xl font-bold"},P={class:"flex flex-wrap gap-4 place-content-center"},I=s("hr",{class:"border-t border-1 w-full"},null,-1),L={key:0,class:"text-lg"},M=s("span",{class:"font-normal"}," and",-1),q=s("span",{class:"font-normal"}," and",-1),z={class:"md:w-full grid grid-cols-1 md:grid-cols-4 gap-3"},O={__name:"ArcadeCard",props:{useSmall:{type:Boolean,required:!1,default:!1},arcade:{type:Object,required:!0}},setup(e){const g=e,b="https://cdn.phaseii.network/file/PhaseII/web-assets";var y=x(g.arcade.data);function w(f){if(f!==null)return`
      background-image: url('${f}');
      background-size: cover;
      background-repeat: no-repeat;
    `}return(f,D)=>(a(),t("div",{style:E(w(`${l(b)}/card/carpet.webp`)),class:"rounded-2xl mb-6 w-full"},[o(C,{type:"justify-center",class:"bg-white dark:bg-slate-900/90 rounded-2xl p-6 w-full"},{default:k(()=>[s("div",N,[s("h1",T,c(e.arcade.name),1),s("div",j,[s("h2",H,c(e.arcade.description),1)]),s("div",P,[l(y).is_beta?(a(),_(m,{key:0,label:"Beta Enabled",color:"warning",icon:l(p)},null,8,["icon"])):h("",!0),o(m,{label:"Private Arcade",color:"info",icon:l(v)},null,8,["icon"])]),I,e.arcade.owners&&e.arcade.owners.length?(a(),t("p",L,[n(" Managed by "),(a(!0),t(d,null,$(e.arcade.owners,(r,i)=>(a(),t("span",{key:r.username,class:"font-bold"},[e.arcade.owners.length===2&&i===0?(a(),t(d,{key:0},[n(c(r.username),1)],64)):e.arcade.owners.length===2&&i===1?(a(),t(d,{key:1},[M,n(" "+c(r.username)+".",1)],64)):i===0?(a(),t(d,{key:2},[n(c(r.username),1)],64)):i===e.arcade.owners.length-1?(a(),t(d,{key:3},[n(", "),q,n(" "+c(r.username)+".",1)],64)):(a(),t(d,{key:4},[n(", "+c(r.username),1)],64))]))),128))])):h("",!0),s("div",z,[o(u,{href:`/#/arcade/${e.arcade.id}`,icon:l(S),color:"info",label:"Arcade Home",class:"w-full md:w-[150px]"},null,8,["href","icon"]),o(u,{href:`/#/arcade/${e.arcade.id}/events`,icon:l(A),color:"info",label:"Event Settings"},null,8,["href","icon"]),o(u,{href:`/#/arcade/${e.arcade.id}/machines`,icon:l(B),color:"info",label:"Machine List"},null,8,["href","icon"]),o(u,{href:`/#/arcade/${e.arcade.id}/paseli`,icon:l(V),color:"info",label:"PASELI"},null,8,["href","icon"])])])]),_:1})],4))}};export{O as _};