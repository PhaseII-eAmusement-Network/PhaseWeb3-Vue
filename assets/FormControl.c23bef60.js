import{o as r,d as B,H as V,z as m,I as R,J as p,K as w,L as q,c as s,g as a,A as h,M as C,C as g,D as v,F as M,r as D,t as K,N as L,B as U,h as z}from"./index.7d8b1dcc.js";const A={__name:"FormControlIcon",props:{icon:{type:String,default:null},h:{type:String,default:null}},setup(e){return(d,n)=>(r(),B(V,{path:e.icon,w:"w-10",h:e.h,class:"absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"},null,8,["path","h"]))}},H={class:"relative"},I=["id","name"],N=["value"],T=["id","name","maxlength","placeholder","required"],$=["id","name","maxlength","inputmode","autocomplete","required","placeholder","type"],J={__name:"FormControl",props:{name:{type:String,default:null},id:{type:String,default:null},autocomplete:{type:String,default:null},maxlength:{type:String,default:null},placeholder:{type:String,default:null},inputmode:{type:String,default:null},icon:{type:String,default:null},options:{type:Array,default:null},type:{type:String,default:"text"},modelValue:{type:[String,Number,Boolean,Array,Object],default:""},required:Boolean,borderless:Boolean,transparent:Boolean,ctrlKFocus:Boolean},emits:["update:modelValue","setRef"],setup(e,{emit:d}){const n=e,o=m({get:()=>n.modelValue,set:u=>{d("update:modelValue",u)}}),f=m(()=>{const u=["px-3 py-2 max-w-full focus:ring focus:outline-none border-blue-700 dark:border-blue-500 rounded w-full","dark:placeholder-gray-400",i.value==="textarea"?"h-24":"h-12",n.borderless?"border-0":"border",n.transparent?"bg-transparent":"bg-white dark:bg-slate-800"];return n.icon&&u.push("pl-10"),u}),i=m(()=>n.options?"select":n.type),E=m(()=>n.type==="textarea"?"h-full":"h-12"),y=R(),x=p(null),k=p(null),c=p(null);if(w(()=>{x.value?d("setRef",x.value):k.value?d("setRef",k.value):d("setRef",c.value)}),n.ctrlKFocus){const u=l=>{l.ctrlKey&&l.key==="k"?(l.preventDefault(),c.value.focus()):l.key==="Escape"&&c.value.blur()};w(()=>{y.isFieldFocusRegistered||(window.addEventListener("keydown",u),y.isFieldFocusRegistered=!0)}),q(()=>{window.removeEventListener("keydown",u),y.isFieldFocusRegistered=!1})}return(u,l)=>(r(),s("div",H,[a(i)==="select"?h((r(),s("select",{key:0,id:e.id,"onUpdate:modelValue":l[0]||(l[0]=t=>g(o)?o.value=t:null),name:e.name,class:v(a(f))},[(r(!0),s(M,null,D(e.options,t=>{var b,S,F;return r(),s("option",{key:(b=t.id)!=null?b:t,value:(S=t.id)!=null?S:t},K((F=t.label)!=null?F:t),9,N)}),128))],10,I)),[[C,a(o)]]):a(i)==="textarea"?h((r(),s("textarea",{key:1,id:e.id,"onUpdate:modelValue":l[1]||(l[1]=t=>g(o)?o.value=t:null),class:v(a(f)),name:e.name,maxlength:e.maxlength,placeholder:e.placeholder,required:e.required},null,10,T)),[[L,a(o)]]):h((r(),s("input",{key:2,id:e.id,ref_key:"inputEl",ref:c,"onUpdate:modelValue":l[2]||(l[2]=t=>g(o)?o.value=t:null),name:e.name,maxlength:e.maxlength,inputmode:e.inputmode,autocomplete:e.autocomplete,required:e.required,placeholder:e.placeholder,type:a(i),class:v(a(f))},null,10,$)),[[U,a(o)]]),e.icon?(r(),B(A,{key:3,icon:e.icon,h:a(E)},null,8,["icon","h"])):z("",!0)]))}};export{J as _};
