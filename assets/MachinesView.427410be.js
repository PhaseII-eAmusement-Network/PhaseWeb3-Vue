import{J as C,z as m,o as s,c as p,b as a,F as f,r as k,t as l,g as n,a as r,w as u,l as P,d as b,p as y,ai as D,ac as x,e as N,k as I,f as L,_ as w,h as $,i as M,aa as V}from"./index.b8f03a0d.js";import{_ as E}from"./ArcadeCard.68c754be.js";import{C as F}from"./CardBoxComponentEmpty.79c377cf.js";import"./area.7873ab93.js";const J=a("thead",null,[a("tr",null,[a("th",null,"Name"),a("th",null,"PCBID"),a("th",null,"Cabinet?"),a("th",null,"Updates?")])],-1),A={"data-label":"Name"},G={"data-label":"PCBID"},O={"data-label":"Cabinet?"},R={"data-label":"Updates?"},T={class:"p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"},U={__name:"TableMachine",props:{machines:{type:Object,required:!0}},setup(g){const d=g,c=C(8),t=C(0),o=m(()=>d.machines.slice(c.value*t.value,c.value*(t.value+1))),i=m(()=>Math.ceil(d.machines.length/c.value)),v=m(()=>t.value+1),B=m(()=>{const h=[];for(let _=0;_<i.value;_++)h.push(_);return h});return(h,_)=>(s(),p(f,null,[a("table",null,[J,a("tbody",null,[(s(!0),p(f,null,k(n(o),e=>(s(),p("tr",{key:e.id,class:"border-b-[12px] lg:border-b-0"},[a("td",A,l(e.name),1),a("td",G,l(e.pcbid),1),a("td",O,l(e.cabinet?"Yes":"No"),1),a("td",R,l(e.ota?"Yes":"No"),1)]))),128))])]),a("div",T,[r(D,null,{default:u(()=>[r(P,null,{default:u(()=>[(s(!0),p(f,null,k(n(B),e=>(s(),b(y,{key:e,active:e===t.value,label:e+1,color:e===t.value?"lightDark":"whiteDark",small:"",onClick:Y=>t.value=e},null,8,["active","label","color","onClick"]))),128))]),_:1}),a("small",null,"Page "+l(n(v))+" of "+l(n(i)),1)]),_:1})])],64))}},S={__name:"MachinesView",setup(g){const d=I(),c=parseInt(d.params.id),t=x.find(i=>i.id===c),o=[{id:0,pcbid:"1A2B3C4D0000",name:"Test PCBID",ota:!1,cabinet:!1},{id:1,pcbid:"1E2R3G3F4JJ0",name:"Other PCBID",ota:!0,cabinet:!0}];return(i,v)=>(s(),b(N,null,{default:u(()=>[r(M,null,{default:u(()=>[r(E,{class:"mb-6","arcade-data":n(t)},null,8,["arcade-data"]),r(L,{icon:n(V),title:"Machines",main:""},null,8,["icon"]),r(w,{class:"mb-6","has-table":""},{default:u(()=>[o.length?(s(),b(U,{key:0,machines:o})):$("",!0),o.length?$("",!0):(s(),b(F,{key:1}))]),_:1})]),_:1})]),_:1}))}};export{S as default};
