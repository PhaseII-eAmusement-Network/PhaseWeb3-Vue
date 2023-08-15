import{s as _,o as a,c as n,b as t,h as o,F as r,r as h,t as l,a as d,w as u,l as g,p as m,ai as y,d as b}from"./index.b8f03a0d.js";import{C as k}from"./CardBoxComponentEmpty.79c377cf.js";const f={key:0},P={key:0},C=t("th",null,"Timestamp",-1),v=t("th",null,"Song",-1),S=t("th",null,"Chart",-1),p=t("th",null,"Score",-1),B=t("th",null,"Arcade",-1),$={class:"space-y"},x={key:0,"data-label":"Player"},D={"data-label":"Timestamp"},w={key:1,"data-label":"Song"},A=["href"],N={class:"italic"},T={key:2,"data-label":"Chart"},V={class:"grid grid-cols-1"},q={"data-label":"Score"},E={class:"grid grid-cols-1"},F={key:3,"data-label":"Arcade"},G={class:"grid grid-cols-1"},H={key:1,class:"p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"},I={__name:"TableScores",props:{game:{type:String,required:!0},isPersonal:{type:Boolean,default:!1},entries:{type:Array,required:!0}},setup(s){const i=_(0);return(c,L)=>(a(),n(r,null,[s.entries&&s.entries.length?(a(),n("table",f,[t("thead",null,[t("tr",null,[s.isPersonal?o("",!0):(a(),n("th",P,"Player")),C,v,S,p,B])]),t("tbody",$,[(a(!0),n(r,null,h(s.entries,e=>(a(),n("tr",{key:e.id,class:"border-b-[12px] lg:border-b-0"},[s.isPersonal?o("",!0):(a(),n("td",x,l(e.player),1)),t("td",D,l(e.timestamp),1),e.song?(a(),n("td",w,[t("a",{class:"grid grid-cols-1 hover:underline decoration-blue-700",href:`/#/songs/${s.game}/${e.song.id}`},[t("h2",N,l(e.song.name),1),t("h2",null,l(e.song.artist),1)],8,A)])):o("",!0),e.song?(a(),n("td",T,[t("div",V,[t("h2",null,l(e.song.chart),1),t("h2",null,"Difficulty: "+l(e.song.difficulty),1)])])):o("",!0),t("td",q,[t("div",E,[t("h2",null,"Grade: "+l(e.grade),1),t("h2",null,"Points: "+l(e.points),1),t("h2",null,"Max Combo: "+l(e.combo),1)])]),e.location?(a(),n("td",F,[t("div",G,[t("h2",null,l(e.location.arcade),1),t("h2",null,"Played on: "+l(e.location.type),1)])])):o("",!0)]))),128))])])):o("",!0),s.entries&&s.entries.length?(a(),n("div",H,[d(y,null,{default:u(()=>[d(g,null,{default:u(()=>[(a(),n(r,null,h(0,e=>d(m,{key:e,active:e===i,label:e+1,color:e===i?"lightDark":"whiteDark",small:"",onClick:M=>i=e},null,8,["active","label","color","onClick"])),64))]),_:1}),t("small",null,"Page "+l(c.currentPageHuman)+" of "+l(c.numPages),1)]),_:1})])):(a(),b(k,{key:2}))],64))}};export{I as _};