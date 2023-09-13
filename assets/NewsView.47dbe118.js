import{u as m,o as a,c as p,a as n,w as l,b as r,t as _,n as f,_ as h,d as o,e as g,f as b,g as s,r as v,F as w,h as x,i as y,m as k}from"./index.e6e740ff.js";import{C as N}from"./CardBoxComponentEmpty.9459a074.js";import{t as C}from"./news.b9c16f1f.js";const $={class:"outline outline-green-900/50 hover:scale-[1.01] hover:shadow-xl hover:outline hover:outline-blue-500/50 hover:bg-slate-500 hover:dark:bg-slate-950/90 bg-white dark:bg-slate-900/90 rounded-xl p-4 h-full w-full transition-all duration-10"},S=r("p",{class:"text-sm font-bold"},"Unread",-1),B={class:"text-sm"},V=r("hr",{class:"pb-1"},null,-1),q={class:"text-xl pb-2"},z={__name:"CardBoxNews",props:{title:{type:String,required:!0},content:{type:String,required:!0},cover:{type:String,default:null},date:{type:String,required:!0},id:{type:Number,required:!0}},setup(i){const e=i,c=m();function u(d){if(d!==null)return`
    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .6)),
    url('${e.cover}');
    background-size: cover;
    background-repeat: no-repeat;
    `}function t(){c.push(`/news/${e.id}`)}return(d,E)=>(a(),p("button",{class:"text-left",onClick:t},[n(h,{class:"mb-2",style:f(u(e.cover)),"has-table":""},{default:l(()=>[r("div",$,[S,r("p",B,_(e.date),1),V,r("h2",q,_(e.title),1)])]),_:1},8,["style"])]))}},D={class:"grid gap-4 grid-cols-1 w-full"},U={__name:"NewsView",setup(i){const e=C;return(c,u)=>(a(),o(g,null,{default:l(()=>[n(y,null,{default:l(()=>[n(b,{icon:s(k),title:"Network News",main:""},null,8,["icon"]),r("div",D,[(a(!0),p(w,null,v(s(e),t=>(a(),o(z,{id:t.id,key:t.id,title:t.title,content:t.content,date:t.timestamp,cover:t.cover,class:"w-full h-full"},null,8,["id","title","content","date","cover"]))),128))]),!s(e)||!s(e).length?(a(),o(N,{key:0})):x("",!0)]),_:1})]),_:1}))}};export{U as default};
