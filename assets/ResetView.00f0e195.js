import{s as P,a as o,c as u,w as r,g as s,b as a,i as m,e as i,Q as k,f as c,I as w,R as h,k as n,v as _,S,U as v,t as A,y,_ as $,A as K,q as I}from"./index.7738aec6.js";import{_ as f}from"./FormField.54ccbbb5.js";import{_ as p}from"./FormControl.32d4ada5.js";import{_ as R}from"./LayoutGuest.b592f1e8.js";import{A as C,a as U,b as E}from"./account.d7ce595a.js";const N={class:"flex md:min-h-screen md:items-center md:justify-center"},q={class:"p-4 flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4"},B=s("div",{class:"flex flex-col items-center text-wrap h-full md:mt-5"},[s("img",{src:K,class:"rounded-full shadow-lg mb-2"}),s("h1",{class:"text-xl"},[s("samp",null,"PhaseII")]),s("p",{class:"text-sm text-gray-700 dark:text-white/75"}," Spinnin' since 2021 "),s("hr",{class:"border-t border-1 my-1 w-full"}),s("p",{class:"text-lg relative bottom-0"},"Password Reset")],-1),L=s("div",{class:"md:border-r md:border-1"},null,-1),O={class:"grid grid-cols-1 gap-2"},j={class:"mb-4"},D={class:"text-xl"},M={class:"font-bold"},Q=s("p",{class:"text-sm text-gray-400"}," Look who forgot their password ",-1),T={key:3,class:"border-t border-1 mt-3 w-full"},W={key:4,class:"flex flex-col gap-2 my-1"},z=s("h2",null,"Remember it?",-1),Z={__name:"ResetView",setup(F){const x=I(),e=P({email:"",loading:!1,emailSent:!1,authKey:null,authValid:!1,username:null,newPassword:"",confirmPassword:""});async function b(){e.loading=!0,(await C(e.email)).status=="success"&&(e.emailSent=!0,e.loading=!1)}async function g(){e.loading=!0;const d=await U(e.authKey);d.status=="success"&&(e.authValid=!0,e.loading=!1,e.username=d.username)}async function V(){if(e.newPassword!=e.confirmPassword){alert("Passwords don't match!");return}e.loading=!0,(await E(e.authKey,e.newPassword,e.confirmPassword)).status=="success"&&(alert("Password changed!"),x.push("/auth/login"))}return(d,t)=>(o(),u(R,null,{default:r(()=>[s("div",N,[a($,{class:"w-full md:w-auto rounded-none md:rounded-xl md:drop-shadow-xl","has-table":"","is-auth":""},{default:r(()=>[s("div",q,[B,L,s("div",O,[e.emailSent?n("",!0):(o(),m("form",{key:0,onSubmit:t[1]||(t[1]=_(l=>b(),["prevent"]))},[a(f,{label:"Email Address"},{default:r(()=>[a(p,{modelValue:e.email,"onUpdate:modelValue":t[0]||(t[0]=l=>e.email=l),icon:i(k),type:"email",autocomplete:"email",required:""},null,8,["modelValue","icon"])]),_:1}),a(c,{label:"Check",type:"submit",color:"info"}),e.loading?(o(),u(w,{key:0,path:i(h),color:"text-yellow-500",class:"animate animate-spin"},null,8,["path"])):n("",!0)],32)),e.emailSent&&!e.authValid?(o(),m("form",{key:1,onSubmit:t[3]||(t[3]=_(l=>g(),["prevent"]))},[a(f,{label:"Auth Key"},{default:r(()=>[a(p,{modelValue:e.authKey,"onUpdate:modelValue":t[2]||(t[2]=l=>e.authKey=l),icon:i(S),type:"text",name:"token",inputmode:"numeric",pattern:"[0-9]*",autocomplete:"one-time-code",maxlength:6},null,8,["modelValue","icon"])]),_:1}),a(c,{label:"Unlock",type:"submit",color:"info"}),e.loading?(o(),u(w,{key:0,path:i(h),color:"text-yellow-500",class:"animate animate-spin"},null,8,["path"])):n("",!0)],32)):n("",!0),e.emailSent&&e.authValid?(o(),m("form",{key:2,onSubmit:t[6]||(t[6]=_(l=>V(),["prevent"]))},[s("div",j,[s("h1",D,[v(" Welcome, "),s("span",M,A(e.username),1)]),Q]),a(f,{label:"New Password"},{default:r(()=>[a(p,{modelValue:e.newPassword,"onUpdate:modelValue":t[4]||(t[4]=l=>e.newPassword=l),icon:i(y),type:"password",required:"",minlength:"8"},null,8,["modelValue","icon"])]),_:1}),a(f,{label:"Confirm Password"},{default:r(()=>[a(p,{modelValue:e.confirmPassword,"onUpdate:modelValue":t[5]||(t[5]=l=>e.confirmPassword=l),icon:i(y),type:"password",required:"",minlength:"8"},null,8,["modelValue","icon"])]),_:1}),a(c,{label:"Reset Password",type:"submit",color:"success"}),e.loading?(o(),u(w,{key:0,path:i(h),color:"text-yellow-500",class:"animate animate-spin"},null,8,["path"])):n("",!0)],32)):n("",!0),e.authValid?n("",!0):(o(),m("hr",T)),e.authValid?n("",!0):(o(),m("div",W,[z,a(c,{label:"Log In",color:"success",href:"/#/auth/login"})]))])])]),_:1})])]),_:1}))}};export{Z as default};
