import{s as f,d as _,w as t,o as b,b as s,a as l,g as m,p as i,_ as x,v as w,u as V,x as n,y as u}from"./index.b8f03a0d.js";import{_ as g}from"./FormCheckRadio.9c468987.js";import{_ as d}from"./FormField.2697e642.js";import{_ as r}from"./FormControl.6e614227.js";import{_ as v}from"./LayoutGuest.3199b088.js";const h={class:"flex md:min-h-screen md:items-center md:justify-center"},y={class:"p-4 flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4"},U=s("div",{class:"flex flex-col items-center text-wrap h-full md:mt-5"},[s("img",{src:w,class:"rounded-full shadow-lg mb-2"}),s("h1",{class:"text-xl"},[s("samp",null,"PhaseII")]),s("p",{class:"text-sm text-gray-700 dark:text-white/75"}," Spinnin' since 2021 "),s("hr",{class:"border-t border-1 my-1 w-full"}),s("p",{class:"text-lg relative bottom-0"},"Account Registration")],-1),$=s("div",{class:"md:border-r md:border-1"},null,-1),A={class:"grid grid-cols-2 gap-x-2"},k={class:"col-span-2"},C={class:"flex flex-col gap-2 mt-4"},I=s("hr",{class:"border-t border-1 my-4 w-full"},null,-1),P={class:"flex flex-col gap-2 my-4"},R=s("h2",null,"Have an Account?",-1),L={__name:"RegisterView",setup(B){const a=f({username:"",email:"",pass:"",remember:!0}),c=V(),p=()=>{c.push("/")};return(N,e)=>(b(),_(v,null,{default:t(()=>[s("div",h,[l(x,{class:"w-full md:w-auto rounded-none md:rounded-xl md:drop-shadow-xl","has-table":"","is-auth":""},{default:t(()=>[s("div",y,[U,$,s("div",A,[l(d,{label:"Desired Username"},{default:t(()=>[l(r,{modelValue:a.username,"onUpdate:modelValue":e[0]||(e[0]=o=>a.username=o),icon:m(n),name:"username",autocomplete:"username"},null,8,["modelValue","icon"])]),_:1}),l(d,{label:"Email Address"},{default:t(()=>[l(r,{modelValue:a.email,"onUpdate:modelValue":e[1]||(e[1]=o=>a.email=o),icon:m(n),name:"email",autocomplete:"email"},null,8,["modelValue","icon"])]),_:1}),l(d,{label:"Password"},{default:t(()=>[l(r,{modelValue:a.pass,"onUpdate:modelValue":e[2]||(e[2]=o=>a.pass=o),icon:m(u),type:"password",name:"password",autocomplete:"current-password"},null,8,["modelValue","icon"])]),_:1}),l(d,{label:"Password Confirmation"},{default:t(()=>[l(r,{modelValue:a.pass,"onUpdate:modelValue":e[3]||(e[3]=o=>a.pass=o),icon:m(u),type:"password",name:"password",autocomplete:"current-password"},null,8,["modelValue","icon"])]),_:1}),l(d,{label:"Card ID"},{default:t(()=>[l(r,{modelValue:a.email,"onUpdate:modelValue":e[4]||(e[4]=o=>a.email=o),icon:m(n),name:"card",autocomplete:"card"},null,8,["modelValue","icon"])]),_:1}),l(d,{label:"Game PIN"},{default:t(()=>[l(r,{modelValue:a.pass,"onUpdate:modelValue":e[5]||(e[5]=o=>a.pass=o),icon:m(u),type:"password",name:"password",autocomplete:"current-password"},null,8,["modelValue","icon"])]),_:1}),l(g,{modelValue:a.remember,"onUpdate:modelValue":e[6]||(e[6]=o=>a.remember=o),class:"col-span-2",name:"remember",label:"Remember Me","input-value":!0},null,8,["modelValue"]),s("div",k,[s("div",C,[l(i,{label:"Create Account",color:"success",onClick:e[7]||(e[7]=o=>p())})]),I,s("div",P,[R,l(i,{label:"Log In",color:"info",href:"/#/auth/login"})])])])])]),_:1})])]),_:1}))}};export{L as default};