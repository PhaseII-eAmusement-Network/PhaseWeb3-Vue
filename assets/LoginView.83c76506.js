import{u as p,s as _,a as h,c as x,w as a,g as e,b as o,v as b,e as r,x as g,y as w,f as n,z as v,_ as V,A as y,q as $}from"./index.26ff47d4.js";import{_ as k}from"./FormCheckRadio.c2c9f311.js";import{_ as i}from"./FormField.3920cd23.js";import{_ as m}from"./FormControl.e7078065.js";import{_ as P}from"./LayoutGuest.d582e05c.js";const S={class:"flex md:min-h-screen md:items-center md:justify-center"},U={class:"p-4 flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4"},R={class:"flex flex-col items-center text-wrap h-full md:mt-5"},q=e("img",{src:y,class:"rounded-full shadow-lg mb-2"},null,-1),A=e("h1",{class:"text-xl"},[e("samp",null,"PhaseII")],-1),B=e("hr",{class:"border-r-1 my-1 w-full"},null,-1),C=e("p",{class:"text-lg relative bottom-0"},"Please log in.",-1),I=e("div",{class:"md:border-r"},null,-1),M={class:"flex flex-col gap-2 mt-4"},N=e("hr",{class:"border-t my-4 w-full"},null,-1),z={class:"flex flex-col gap-2 my-4"},L=e("h2",null,"Not Registered?",-1),j=e("h2",null,"Forgot Password?",-1),K={__name:"LoginView",setup(F){const d=$(),u=p(),s=_({login:"",pass:"",remember:!0,spinin:!1}),c=async()=>{if(!s.login||!s.pass){alert("Please fill in all fields.");return}await u.createUserSession(s.login,s.pass,s.remember)&&d.push("/")};return(f,l)=>(h(),x(P,null,{default:a(()=>[e("div",S,[o(V,{class:v(["w-full md:w-auto rounded-none md:rounded-xl md:drop-shadow-xl",s.spinin?"animate-spin":"animate-none"]),"has-table":"","is-auth":""},{default:a(()=>[e("div",U,[e("div",R,[q,A,e("button",{class:"text-sm text-gray-700 dark:text-white/75",onClick:l[0]||(l[0]=t=>s.spinin=!s.spinin)}," Spinnin' since 2021 "),B,C]),I,e("form",{onSubmit:l[4]||(l[4]=b(t=>c(),["prevent"]))},[o(i,{label:"Username"},{default:a(()=>[o(m,{modelValue:s.login,"onUpdate:modelValue":l[1]||(l[1]=t=>s.login=t),icon:r(g),name:"login",autocomplete:"username",required:""},null,8,["modelValue","icon"])]),_:1}),o(i,{label:"Password"},{default:a(()=>[o(m,{modelValue:s.pass,"onUpdate:modelValue":l[2]||(l[2]=t=>s.pass=t),icon:r(w),type:"password",name:"password",autocomplete:"current-password",required:""},null,8,["modelValue","icon"])]),_:1}),o(k,{modelValue:s.remember,"onUpdate:modelValue":l[3]||(l[3]=t=>s.remember=t),name:"remember",label:"Remember Me","input-value":!0},null,8,["modelValue"]),e("div",M,[o(n,{label:"Log In",color:"success",type:"submit"})]),N,e("div",z,[L,o(n,{label:"Register",color:"info",href:"/#/auth/register"}),j,o(n,{label:"i forgor",color:"warning",href:"/#/auth/reset"})])],32)])]),_:1},8,["class"])])]),_:1}))}};export{K as default};