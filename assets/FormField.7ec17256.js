import{E as d,B as i,c as s,k as a,t as o,n as r,j as u,G as m,A as b}from"./index.c2012168.js";const f={class:"mb-6 last:mb-0"},g=["for"],h={key:1,class:"text-xs text-gray-500 dark:text-slate-400 mt-1"},k={__name:"FormField",props:{label:{type:String,default:null},labelFor:{type:String,default:null},help:{type:String,default:null}},setup(e){const n=d(),c=i(()=>{const t=[],l=n.default().length;return l>1&&t.push("grid grid-cols-1 gap-3"),l===2&&t.push("md:grid-cols-2"),t});return(t,l)=>(s(),a("div",f,[e.label?(s(),a("label",{key:0,for:e.labelFor,class:"block font-bold mb-2"},o(e.label),9,g)):r("",!0),u("div",{class:b(c.value)},[m(t.$slots,"default")],2),e.help?(s(),a("div",h,o(e.help),1)):r("",!0)]))}};export{k as _};
