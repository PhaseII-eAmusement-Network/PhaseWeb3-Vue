import{J as y,z as h,o as s,c as p,b as a,F as g,r as P,t as c,g as e,a as r,w as i,l as L,d as o,p as D,ai as T,ac as w,e as A,k as E,f as $,_ as C,h as f,i as I,ap as M,aq as R}from"./index.b8f03a0d.js";import{_ as S}from"./ArcadeCard.68c754be.js";import{C as x}from"./CardBoxComponentEmpty.79c377cf.js";import"./area.7873ab93.js";const N=a("thead",null,[a("tr",null,[a("th",null,"User"),a("th",null,"Value"),a("th",null,"Machine"),a("th",null,"Reason"),a("th",null,"Timestamp")])],-1),q={"data-label":"User"},z={"data-label":"Value"},F={"data-label":"Machine"},H={"data-label":"Reason"},U={"data-label":"Timestamp"},j={class:"p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"},V={__name:"TablePaseli",props:{transactions:{type:Object,required:!0}},setup(v){const _=v,u=y(8),l=y(0),n=h(()=>_.transactions.slice(u.value*l.value,u.value*(l.value+1))),d=h(()=>Math.ceil(_.transactions.length/u.value)),k=h(()=>l.value+1),B=h(()=>{const b=[];for(let m=0;m<d.value;m++)b.push(m);return b});return(b,m)=>(s(),p(g,null,[a("table",null,[N,a("tbody",null,[(s(!0),p(g,null,P(e(n),t=>(s(),p("tr",{key:t.id,class:"border-b-[12px] lg:border-b-0"},[a("td",q,c(t.user),1),a("td",z,c(t.value),1),a("td",F,c(t.machine),1),a("td",H,c(t.reason),1),a("td",U,c(t.timestamp),1)]))),128))])]),a("div",j,[r(T,null,{default:i(()=>[r(L,null,{default:i(()=>[(s(!0),p(g,null,P(e(B),t=>(s(),o(D,{key:t,active:t===l.value,label:t+1,color:t===l.value?"lightDark":"whiteDark",small:"",onClick:J=>l.value=t},null,8,["active","label","color","onClick"]))),128))]),_:1}),a("small",null,"Page "+c(e(k))+" of "+c(e(d)),1)]),_:1})])],64))}},Q={__name:"PaseliView",setup(v){const _=E(),u=parseInt(_.params.id),l=w.find(d=>d.id===u);var n=[{id:0,value:-300,timestamp:"7/13/2023 1:27 PM",machine:"SDVX",reason:"/eacoin/nstart",user:"Trmazi"}];return(d,k)=>(s(),o(A,null,{default:i(()=>[r(I,null,{default:i(()=>[r(S,{class:"mb-6","arcade-data":e(l)},null,8,["arcade-data"]),r($,{icon:e(M),title:"Player PASELI Balances",main:""},null,8,["icon"]),r(C,{class:"mb-6","has-table":""},{default:i(()=>[e(n).length?(s(),o(V,{key:0,transactions:e(n)},null,8,["transactions"])):f("",!0),e(n).length?f("",!0):(s(),o(x,{key:1}))]),_:1}),r($,{icon:e(R),title:"PASELI Transaction History",main:""},null,8,["icon"]),r(C,{class:"mb-6","has-table":""},{default:i(()=>[e(n).length?(s(),o(V,{key:0,transactions:e(n)},null,8,["transactions"])):f("",!0),e(n).length?f("",!0):(s(),o(x,{key:1}))]),_:1})]),_:1})]),_:1}))}};export{Q as default};