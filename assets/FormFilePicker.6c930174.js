import{O as b,r as i,n as u,P as h,o as r,t as d,i as t,a as g,B as v,u as f,d as V,H as k,x}from"./index.743e26b8.js";const I={class:"flex items-stretch justify-start relative"},R={class:"inline-flex"},B=["accept"],S={key:0,class:"px-4 py-2 bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r"},w={class:"text-ellipsis line-clamp-1"},F={__name:"FormFilePicker",props:{modelValue:{type:[Object,File,Array],default:null},label:{type:String,default:null},icon:{type:String,default:b},accept:{type:String,default:null},color:{type:String,default:"info"},isRoundIcon:Boolean},emits:["update:modelValue"],setup(e,{emit:m}){const o=e,n=i(null),a=i(o.modelValue),s=u(()=>!o.isRoundIcon&&a.value),p=u(()=>o.modelValue);h(p,l=>{a.value=l,l||(n.value.input.value=null)});const y=l=>{const c=l.target.files||l.dataTransfer.files;a.value=c[0],m("update:modelValue",a.value)};return(l,c)=>(r(),d("div",I,[t("label",R,[g(V,{as:"a",class:v({"w-12 h-12":e.isRoundIcon,"rounded-r-none":f(s)}),"icon-size":e.isRoundIcon?24:void 0,label:e.isRoundIcon?null:e.label,icon:e.icon,color:e.color,"rounded-full":e.isRoundIcon},null,8,["class","icon-size","label","icon","color","rounded-full"]),t("input",{ref_key:"root",ref:n,type:"file",class:"absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1",accept:e.accept,onInput:y},null,40,B)]),f(s)?(r(),d("div",S,[t("span",w,k(a.value.name),1)])):x("",!0)]))}};export{F as _};
