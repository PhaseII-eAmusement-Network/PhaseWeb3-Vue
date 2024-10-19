import{a as r,c as B,I as V,B as c,u as R,r as g,o as w,J as q,i,e as n,C as h,K as C,E as p,z as x,F as D,j as M,t as K,L,D as N,k as U}from"./index.e216672b.js";const z={__name:"FormControlIcon",props:{icon:{type:String,default:null},h:{type:String,default:null}},setup(e){return(d,a)=>(r(),B(V,{path:e.icon,w:"w-10",h:e.h,class:"absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"},null,8,["path","h"]))}},I={class:"relative"},j=["id","name"],A=["value"],H=["id","name","maxlength","minlength","min","max","placeholder","required"],T=["id","name","maxlength","minlength","min","max","inputmode","autocomplete","required","placeholder","type","pattern"],J={__name:"FormControl",props:{name:{type:String,default:null},id:{type:String,default:null},autocomplete:{type:String,default:null},maxlength:{type:Number,default:null},minlength:{type:Number,default:null},max:{type:String,default:null},min:{type:String,default:null},placeholder:{type:String,default:null},inputmode:{type:String,default:null},icon:{type:String,default:null},options:{type:Array,default:null},type:{type:String,default:"text"},pattern:{type:String,default:null},modelValue:{type:[String,Number,Boolean,Array,Object],default:""},required:Boolean,borderless:Boolean,transparent:Boolean,ctrlKFocus:Boolean},emits:["update:modelValue","setRef"],setup(e,{emit:d}){const a=e,u=c({get:()=>a.modelValue,set:o=>{d("update:modelValue",o)}}),f=c(()=>{const o=["px-3 py-2 max-w-full focus:ring focus:outline-none border-blue-700 dark:border-blue-900 rounded w-full","dark:placeholder-gray-400",s.value==="textarea"?"h-24":"h-12",a.borderless?"border-0":"border",a.transparent?"bg-transparent":"bg-white dark:bg-slate-800"];return a.icon&&o.push("pl-10"),o}),s=c(()=>a.options?"select":a.type),E=c(()=>a.type==="textarea"?"h-full":"h-12"),y=R(),v=g(null),k=g(null),m=g(null);if(w(()=>{v.value?d("setRef",v.value):k.value?d("setRef",k.value):d("setRef",m.value)}),a.ctrlKFocus){const o=l=>{l.ctrlKey&&l.key==="k"?(l.preventDefault(),m.value.focus()):l.key==="Escape"&&m.value.blur()};w(()=>{y.isFieldFocusRegistered||(window.addEventListener("keydown",o),y.isFieldFocusRegistered=!0)}),q(()=>{window.removeEventListener("keydown",o),y.isFieldFocusRegistered=!1})}return(o,l)=>(r(),i("div",I,[n(s)==="select"?h((r(),i("select",{key:0,id:e.id,"onUpdate:modelValue":l[0]||(l[0]=t=>p(u)?u.value=t:null),name:e.name,class:x(n(f))},[(r(!0),i(D,null,M(e.options,t=>{var b,S,F;return r(),i("option",{key:(b=t.id)!=null?b:t,value:(S=t.id)!=null?S:t},K((F=t.label)!=null?F:t),9,A)}),128))],10,j)),[[C,n(u)]]):n(s)==="textarea"?h((r(),i("textarea",{key:1,id:e.id,"onUpdate:modelValue":l[1]||(l[1]=t=>p(u)?u.value=t:null),class:x(n(f)),name:e.name,maxlength:e.maxlength,minlength:e.minlength,min:e.min,max:e.max,placeholder:e.placeholder,required:e.required},null,10,H)),[[L,n(u)]]):h((r(),i("input",{key:2,id:e.id,ref_key:"inputEl",ref:m,"onUpdate:modelValue":l[2]||(l[2]=t=>p(u)?u.value=t:null),name:e.name,maxlength:e.maxlength,minlength:e.minlength,min:e.min,max:e.max,inputmode:e.inputmode,autocomplete:e.autocomplete,required:e.required,placeholder:e.placeholder,type:n(s),class:x(n(f)),pattern:e.pattern},null,10,T)),[[N,n(u)]]),e.icon?(r(),B(z,{key:3,icon:e.icon,h:n(E)},null,8,["icon","h"])):U("",!0)]))}};export{J as _};
