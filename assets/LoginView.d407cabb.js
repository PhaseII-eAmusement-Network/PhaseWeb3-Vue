import{S as p,c as f,a,o as _,h as e,y as c,L as b,N as V,_ as g,l as r,k as n,ag as w,V as $,a4 as h}from"./index.c0489997.js";import{_ as k,a as y}from"./LayoutGuest.b0e48c8f.js";import{_ as L}from"./FormCheckRadio.01b46833.js";import{_ as m}from"./FormField.f1745842.js";import{_ as t}from"./FormControl.c4964ee6.js";const A={__name:"LoginView",setup(P){const o=p({login:"john.doe",pass:"highly-secure-password-fYjUw-",remember:!0}),i=w(),u=()=>{i.push("/dashboard")};return(U,s)=>(_(),f(k,null,{default:a(()=>[e(y,{bg:"purplePink"},{default:a(({cardClass:d})=>[e(c,{class:b(d),"is-form":"",onSubmit:V(u,["prevent"])},{footer:a(()=>[e(g,null,{default:a(()=>[e(r,{type:"submit",color:"info",label:"Login"}),e(r,{to:"/dashboard",color:"info",outline:"",label:"Back"})]),_:1})]),default:a(()=>[e(m,{label:"Login",help:"Please enter your login"},{default:a(()=>[e(t,{modelValue:o.login,"onUpdate:modelValue":s[0]||(s[0]=l=>o.login=l),icon:n($),name:"login",autocomplete:"username"},null,8,["modelValue","icon"])]),_:1}),e(m,{label:"Password",help:"Please enter your password"},{default:a(()=>[e(t,{modelValue:o.pass,"onUpdate:modelValue":s[1]||(s[1]=l=>o.pass=l),icon:n(h),type:"password",name:"password",autocomplete:"current-password"},null,8,["modelValue","icon"])]),_:1}),e(L,{modelValue:o.remember,"onUpdate:modelValue":s[2]||(s[2]=l=>o.remember=l),name:"remember",label:"Remember","input-value":!0},null,8,["modelValue"])]),_:2},1032,["class","onSubmit"])]),_:1})]),_:1}))}};export{A as default};
