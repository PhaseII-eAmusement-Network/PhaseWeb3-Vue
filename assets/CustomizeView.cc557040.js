var S=Object.defineProperty;var $=(o,l,e)=>l in o?S(o,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[l]=e;var m=(o,l,e)=>($(o,typeof l!="symbol"?l+"":l,e),e);import{a3 as L,a as w,b as z,r as P,M as k,c as _,e as v,w as n,f as s,Z as B,$ as F,g as f,a4 as G,j as b,_ as J,x as O,i as g,n as x,p as D,q as U,a5 as h}from"./index.130e9bc7.js";import{_ as p}from"./FormField.71ec0ccb.js";import{_ as C}from"./FormControl.2ba80829.js";import{_ as A}from"./FormCheckRadio.a7a4ec6b.js";class d{static get cardList(){const l=L.filter(e=>!e.skip).map(e=>({id:e.assetId?e.assetId:e.id,label:e.name}));return[...this.baseCardList,...l]}}m(d,"baseCardList",[{id:"time",label:"Default"},{id:"carpet",label:"Arcade Carpet"},{id:"gradient",label:"Pink/Purple Gradient"},{id:"pride",label:"Pride Flag"},{id:"trans",label:"Trans Flag"},{id:"loveplus",label:"LovePlus"}]),m(d,"borderList",[{id:"",label:"None"},{id:"test",label:"Basic"},{id:"swirl",label:"Swirl"},{id:"pride",label:"Pride Flag"},{id:"trans",label:"Trans Flag"},{id:"nonbinary",label:"Non-Binary Flag"},{id:"leaves",label:"Leaves"}]);const I={class:"space-x-2"},H={__name:"CustomizeView",setup(o){const l=w(),e=z(),a=P(e.userCustomize);var c=JSON.parse(JSON.stringify(e.userCustomize));k(()=>e.userCustomize,i=>{a.value=i,c=JSON.parse(JSON.stringify(i))});async function y(){var i=null;try{i=await h(a.value)}catch(t){console.error("Failed to update customize:",t)}(i==null?void 0:i.status)==="success"&&(e.userLoaded=!1,l.go())}function V(){return console.log(c),console.log(a.value),JSON.stringify(c)!==JSON.stringify(a.value)}async function N(){e.userLoaded=!1,l.go()}return(i,t)=>(_(),v(U,null,{default:n(()=>[s(D,null,{default:n(()=>[s(B,{class:"mb-6"}),s(F,{icon:f(G),title:"Profile Customizations",main:""},null,8,["icon"]),b("div",null,[s(J,null,{default:n(()=>[b("form",{onSubmit:O(y,["prevent"])},[s(p,{label:"Profile Background"},{default:n(()=>{var r;return[s(C,{modelValue:a.value.card,"onUpdate:modelValue":t[0]||(t[0]=u=>a.value.card=u),options:f(d).cardList,"model-value":(r=a.value.card)!=null?r:"time",name:"card"},null,8,["modelValue","options","model-value"])]}),_:1}),s(p,{label:"Profile Border"},{default:n(()=>{var r;return[s(C,{modelValue:a.value.border,"onUpdate:modelValue":t[1]||(t[1]=u=>a.value.border=u),options:f(d).borderList,"model-value":(r=a.value.border)!=null?r:"",name:"border"},null,8,["modelValue","options","model-value"])]}),_:1}),s(p,{label:"Disable Greeting"},{default:n(()=>{var r;return[s(A,{modelValue:a.value.disableGreeting,"onUpdate:modelValue":t[2]||(t[2]=u=>a.value.disableGreeting=u),type:"switch","input-value":(r=a.value.disableGreeting)!=null?r:!1,name:"disableGreeting"},null,8,["modelValue","input-value"])]}),_:1}),b("div",I,[s(g,{type:"submit",color:"success",label:"Save"}),V()?(_(),v(g,{key:0,color:"danger",label:"Revert",onClick:N})):x("",!0)])],32)]),_:1})])]),_:1})]),_:1}))}};export{H as default};
