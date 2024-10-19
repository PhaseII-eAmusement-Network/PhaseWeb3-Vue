import{u as h,s as w,r as N,N as S,a as d,c as p,w as l,b as e,V as E,W as I,e as r,x as y,g as A,_ as b,v as V,f as J,k as g,I as O,R as v,X as U,Y as B,y as c,Z as F,l as L,n as M,q as R}from"./index.e216672b.js";import{_ as u}from"./FormField.e786f607.js";import{_ as m}from"./FormControl.9a1b0b02.js";const D={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},Z={__name:"ProfileView",setup(G){const t=h(),$=R(),f=w({username:JSON.parse(JSON.stringify(t.userName)),email:JSON.parse(JSON.stringify(t.userEmail)),pin:null}),n=w({username:JSON.parse(JSON.stringify(t.userName)),email:JSON.parse(JSON.stringify(t.userEmail)),pin:null}),i=w({password_current:"",password:"",password_confirmation:""}),_=N(!1),k=N(!1);S(()=>t.userName,s=>{n.username=JSON.parse(JSON.stringify(s)),f.username=JSON.parse(JSON.stringify(s))}),S(()=>t.userEmail,s=>{n.email=JSON.parse(JSON.stringify(s)),f.email=JSON.parse(JSON.stringify(s))});async function x(){_.value=!0,(await t.putUser(n)).status=="success"&&(_.value=!1,await t.loadUser(),$.go())}const P=()=>{};function q(s){s.target.value=s.target.value.replace(/\D/g,"")}function C(s,a){return JSON.stringify(s)!==JSON.stringify(a)}return(s,a)=>(d(),p(M,null,{default:l(()=>[e(L,null,{default:l(()=>[e(E,{class:"mb-6","use-small":"","even-smaller":""}),e(I,{icon:r(y),title:"Profile Settings",main:""},null,8,["icon"]),A("div",D,[e(b,{"is-form":"",class:"row-span-1",onSubmit:V(x,["prevent"])},{footer:l(()=>[C(f,n)?(d(),p(J,{key:0,color:"success",type:"submit",label:"Update"})):g("",!0),_.value?(d(),p(O,{key:1,path:r(v),color:"text-yellow-500",class:"animate animate-spin"},null,8,["path"])):g("",!0)]),default:l(()=>[e(U,{color:"info",label:"General",class:"mb-2"}),e(u,{label:"Username"},{default:l(()=>[e(m,{modelValue:n.username,"onUpdate:modelValue":a[0]||(a[0]=o=>n.username=o),icon:r(y),name:"username",required:"",autocomplete:"username"},null,8,["modelValue","icon"])]),_:1}),e(u,{label:"E-mail",help:"Used for password resetting and 2FA"},{default:l(()=>[e(m,{modelValue:n.email,"onUpdate:modelValue":a[1]||(a[1]=o=>n.email=o),icon:r(B),type:"email",name:"email",required:"",autocomplete:"email"},null,8,["modelValue","icon"])]),_:1}),e(u,{label:"PIN",help:"Used when logging into a game"},{default:l(()=>[e(m,{modelValue:n.pin,"onUpdate:modelValue":a[2]||(a[2]=o=>n.pin=o),icon:r(c),type:"password",name:"pin",minlength:4,maxlength:4,inputmode:"numeric",pattern:"\\d{4}",autocomplete:"pin",onInput:q},null,8,["modelValue","icon"])]),_:1})]),_:1},8,["onSubmit"]),e(b,{"is-form":"",class:"row-span-2",onSubmit:V(P,["prevent"])},{footer:l(()=>[e(J,{type:"submit",color:"success",label:"Update"}),k.value?(d(),p(O,{key:0,path:r(v),color:"text-yellow-500",class:"animate animate-spin"},null,8,["path"])):g("",!0)]),default:l(()=>[e(U,{color:"info",label:"Change Password",class:"mb-2"}),e(u,{label:"Current password"},{default:l(()=>[e(m,{modelValue:i.password_current,"onUpdate:modelValue":a[3]||(a[3]=o=>i.password_current=o),icon:r(c),name:"password_current",type:"password",required:""},null,8,["modelValue","icon"])]),_:1}),e(F),e(u,{label:"New password"},{default:l(()=>[e(m,{modelValue:i.password,"onUpdate:modelValue":a[4]||(a[4]=o=>i.password=o),icon:r(c),name:"password",type:"password",required:""},null,8,["modelValue","icon"])]),_:1}),e(u,{label:"Confirm password"},{default:l(()=>[e(m,{modelValue:i.password_confirmation,"onUpdate:modelValue":a[5]||(a[5]=o=>i.password_confirmation=o),icon:r(c),name:"password_confirmation",type:"password",required:""},null,8,["modelValue","icon"])]),_:1})]),_:1},8,["onSubmit"])])]),_:1})]),_:1}))}};export{Z as default};
