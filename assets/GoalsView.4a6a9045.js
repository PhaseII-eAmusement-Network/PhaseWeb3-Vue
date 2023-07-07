import{s as b,d as V,w as i,e as k,o as n,a as l,f as p,g as a,b as t,a1 as _,_ as g,a2 as y,c as d,p as G,h as u,t as C,i as D,a3 as $,a4 as w,a5 as A}from"./index.7d8b1dcc.js";import{_ as c}from"./FormControl.c23bef60.js";const F={class:"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6"},R={class:"mb-6"},B={class:"mb-12"},P=t("h1",{class:"text-xl md:text-2xl font-bold"},"Goal Creator",-1),U=t("p",{class:"pb-4 dark:text-white/50"}," Follow these steps and set some goals! ",-1),T={class:"grid md:grid-cols-3 gap-6"},W=t("h2",{class:"text-lg mb-2"},"Game",-1),N={key:0},S=t("h2",{class:"text-lg mb-2"},"Goal Type",-1),E={key:1},I=t("h2",{class:"text-lg mb-2"},"Goals",-1),L={key:2},O=t("h2",{class:"text-lg mb-2"},"Value",-1),H={key:3},M=t("h2",{class:"text-lg mb-2"},"Deadline",-1),Y={key:0},j=t("h1",{class:"pt-4 text-xl md:text-2xl font-bold"},"Compiled Goal",-1),q={class:"text-lg dark:text-white/75"},z={key:0,class:"space-x-2"},X={__name:"GoalsView",setup(J){const h=[{game:"DanceDance Revolution",types:[{id:"Combo",needValue:!0},{id:"Grade",needValue:!0},{id:"Ranking",needValue:!1},{id:"Score",needValue:!1}],combo:["# of LIFE 4 FCs","# of PFCs","# of MFCs"],grade:["# of AAA","# of AA","# of A","# of B","# of C"],ranking:["1st place","top 10","top 100"],score:["1 million points","2 million points","3 million points"]}],v=["DanceDance Revolution"];var e=b({id:0,game:"...",type:"...",goal:"...",value:null,deadline:"..."});function r(){const m=h.find(o=>o.game==e.game);var s=[];for(const o of m.types)s.push(o.id);return m.listTypes=s,m}function x(){return e.goal=="..."||e.game=="..."||e.deadline=="..."?!1:`I want ${e.goal} on ${e.game} in ${e.deadline}`}const f=[{game:"DanceDance Revolution",type:"Rank",goal:"Top 10 Ranking",status:"#10 of 132",deadline:"3 Weeks"},{game:"pop'n music",type:"Plays",goal:"100 Plays",status:"2 Plays Since Creation",deadline:"1 Week"}];return(m,s)=>(n(),V(k,null,{default:i(()=>[l(D,null,{default:i(()=>[l(p,{icon:a($),title:"Your Goals",main:""},null,8,["icon"]),t("div",F,[l(_,{number:1,label:"Active Goals",color:"text-yellow-500 dark:text-yellow-400"}),l(_,{number:3,label:"Completed Goals",color:"text-green-500 dark:text-green-400"}),l(_,{number:2,label:"Abandoned Goals",color:"text-red-500 dark:text-red-400"})]),l(p,{icon:a(w),title:"Active Goals"},null,8,["icon"]),t("div",R,[l(g,{"has-table":""},{default:i(()=>[l(y,{goals:f})]),_:1})]),l(p,{icon:a(A),title:"Past Goals"},null,8,["icon"]),t("div",B,[l(g,{"has-table":""},{default:i(()=>[l(y,{goals:f,"is-past":""})]),_:1})]),t("div",null,[l(g,null,{footer:i(()=>[a(e).deadline!=="..."?(n(),d("div",z,[l(G,{type:"submit",color:"success",label:"Create",small:!1})])):u("",!0)]),default:i(()=>[P,U,t("div",T,[t("div",null,[W,l(c,{modelValue:a(e).game,"onUpdate:modelValue":s[0]||(s[0]=o=>a(e).game=o),options:v,"input-value":"",name:"game"},null,8,["modelValue"])]),a(e).game!=="..."?(n(),d("div",N,[S,l(c,{modelValue:a(e).type,"onUpdate:modelValue":s[1]||(s[1]=o=>a(e).type=o),options:r().listTypes,"input-value":"",name:"type"},null,8,["modelValue","options"])])):u("",!0),a(e).type!=="..."?(n(),d("div",E,[I,l(c,{modelValue:a(e).goal,"onUpdate:modelValue":s[2]||(s[2]=o=>a(e).goal=o),options:r()[a(e).type.toLowerCase()],"input-value":"",name:"goal"},null,8,["modelValue","options"])])):u("",!0),a(e).goal!=="..."&&r().types.find(o=>o.id==a(e).type).needValue?(n(),d("div",L,[O,l(c,{modelValue:a(e).value,"onUpdate:modelValue":s[3]||(s[3]=o=>a(e).value=o),placeholder:a(e).goal,name:"goal"},null,8,["modelValue","placeholder"])])):u("",!0),a(e).goal!=="..."||a(e).value?(n(),d("div",H,[M,l(c,{modelValue:a(e).deadline,"onUpdate:modelValue":s[4]||(s[4]=o=>a(e).deadline=o),options:["24Hrs","5 Days","15 Days","1 Week","2 Weeks"],"input-value":"",name:"deadline"},null,8,["modelValue"])])):u("",!0)]),a(e).deadline!=="..."?(n(),d("div",Y,[j,t("p",q,C(x()),1)])):u("",!0)]),_:1})])]),_:1})]),_:1}))}};export{X as default};
