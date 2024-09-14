import{s as I,a as r,c as u,w as s,b as e,Q as y,e as b,a8 as v,g as i,_ as g,R as V,a9 as P,k as D,aa as A,v as U,f as c,i as M,j as x,t as _,F as k,l as E,n as $}from"./index.ed9ac360.js";import{_ as o}from"./FormField.cbdfaec4.js";import{_ as d}from"./FormCheckRadio.7e519df8.js";import{_ as p}from"./FormControl.e1d7a7ed.js";function L(){const h="01201000000000",f="0123456789ABCDEF";let m="";for(let n=0;n<6;n++)m+=f[Math.floor(Math.random()*f.length)];return h+m}const S={class:"grid grid-cols-1 gap-6"},O={class:"grid grid-cols-1 w-full gap-2 md:gap-6 md:flex md:place-content-stretch"},N={class:"grid md:grid-cols-2 gap-6"},q={class:"grid grid-cols-1 w-full gap-2 md:gap-6 md:flex md:place-content-stretch pb-4 md:pb-0"},j={class:"grid gap-4"},F={class:"flex justify-between items-center"},G={class:"m-[-5px]"},T={class:"text-md font-bold"},Q={class:"text-sm"},R={class:"text-sm font-mono"},H={class:"grid md:flex gap-4"},Y={__name:"OnboardingView",setup(h){const f={name:"",useDiscord:!0,discordId:"",description:"",paseli:!0,infinitePaseli:!0,maintenance:!1,betas:!1,incognito:!1,machineList:[]},m={name:"",cabinet:!1,ota:!1,generatePCBID:!0,PCBID:""},t=I({...f}),n=I({...m});function B(){n.generatePCBID&&(n.PCBID=L()),t.machineList.push({name:n.name,cabinet:n.cabinet,ota:n.ota,PCBID:n.PCBID.toUpperCase()}),Object.assign(n,m)}function w(C){t.machineList=t.machineList.filter(l=>l.PCBID!==C)}return(C,l)=>(r(),u($,null,{default:s(()=>[e(E,null,{default:s(()=>[e(y,{icon:b(v),title:"Arcade Onboarding",color:"text-green-400",main:""},null,8,["icon"]),i("div",S,[e(g,{"is-form":"",class:"row-span-1"},{default:s(()=>[e(V,{color:"info",label:"General Information",icon:b(P),class:"mb-2"},null,8,["icon"]),e(o,{label:"Arcade Name"},{default:s(()=>[e(p,{modelValue:t.name,"onUpdate:modelValue":l[0]||(l[0]=a=>t.name=a),name:"arcadeName",required:""},null,8,["modelValue"])]),_:1}),e(o,{label:"Use Discord",help:"Automated provisioning rather than manual. BadManiac will DM the user via Discord."},{default:s(()=>[e(d,{modelValue:t.useDiscord,"onUpdate:modelValue":l[1]||(l[1]=a=>t.useDiscord=a),name:"useDiscord",type:"switch"},null,8,["modelValue"])]),_:1}),t.useDiscord?(r(),u(o,{key:0,label:"Discord ID",help:"Owner's Discord User ID."},{default:s(()=>[e(p,{modelValue:t.discordId,"onUpdate:modelValue":l[2]||(l[2]=a=>t.discordId=a),name:"discordId",required:""},null,8,["modelValue"])]),_:1})):D("",!0),t.useDiscord?D("",!0):(r(),u(o,{key:1,modelValue:t.description,"onUpdate:modelValue":l[3]||(l[3]=a=>t.description=a),label:"Description",help:"Manual description rather than automated."},{default:s(()=>[e(p,{name:"description",required:""})]),_:1},8,["modelValue"]))]),_:1}),e(g,{"is-form":"",class:"row-span-1"},{default:s(()=>[e(V,{color:"info",label:"Settings",icon:b(A),class:"mb-2"},null,8,["icon"]),i("div",O,[e(o,{label:"PASELI Enabled",help:"Enable or disable PASELI services."},{default:s(()=>[e(d,{modelValue:t.paseli,"onUpdate:modelValue":l[4]||(l[4]=a=>t.paseli=a),name:"paseli",type:"switch"},null,8,["modelValue"])]),_:1}),e(o,{label:"Infinite PASELI",help:"Enable or disable infinite PASELI."},{default:s(()=>[e(d,{modelValue:t.infinitePaseli,"onUpdate:modelValue":l[5]||(l[5]=a=>t.infinitePaseli=a),name:"infinitePaseli",type:"switch"},null,8,["modelValue"])]),_:1}),e(o,{label:"Maintenance Mode",help:"Place this arcade under Maintenance."},{default:s(()=>[e(d,{modelValue:t.maintenance,"onUpdate:modelValue":l[6]||(l[6]=a=>t.maintenance=a),name:"maintenance",type:"switch"},null,8,["modelValue"])]),_:1}),e(o,{label:"Incognito Mode",help:"Hide the eAmusement network and ranking data."},{default:s(()=>[e(d,{modelValue:t.incognito,"onUpdate:modelValue":l[7]||(l[7]=a=>t.incognito=a),name:"incognito",type:"switch"},null,8,["modelValue"])]),_:1}),e(o,{label:"Beta Testing",help:"Enable or disable beta testing."},{default:s(()=>[e(d,{modelValue:t.betas,"onUpdate:modelValue":l[8]||(l[8]=a=>t.betas=a),name:"betas",type:"switch"},null,8,["modelValue"])]),_:1})])]),_:1}),e(g,{class:"row-span-1"},{default:s(()=>[e(V,{color:"info",label:"Machines",icon:b(P),class:"mb-2"},null,8,["icon"]),i("div",N,[i("form",{class:"h-full",onSubmit:l[14]||(l[14]=U(a=>B(),["prevent"]))},[e(o,{label:"Generate PCBID",help:"Generate a PCBID rather than supply one."},{default:s(()=>[e(d,{modelValue:n.generatePCBID,"onUpdate:modelValue":l[9]||(l[9]=a=>n.generatePCBID=a),name:"generatePCBID",type:"switch"},null,8,["modelValue"])]),_:1}),n.generatePCBID?D("",!0):(r(),u(o,{key:0,label:"PCBID"},{default:s(()=>[e(p,{modelValue:n.PCBID,"onUpdate:modelValue":l[10]||(l[10]=a=>n.PCBID=a),name:"pcbid",required:"",minlength:"20",maxlength:"20"},null,8,["modelValue"])]),_:1})),e(o,{label:"Name"},{default:s(()=>[e(p,{modelValue:n.name,"onUpdate:modelValue":l[11]||(l[11]=a=>n.name=a),name:"name",required:""},null,8,["modelValue"])]),_:1}),i("div",q,[e(o,{label:"Arcade Cabinet",help:"If this is a real cabinet, enable this."},{default:s(()=>[e(d,{modelValue:n.cabinet,"onUpdate:modelValue":l[12]||(l[12]=a=>n.cabinet=a),name:"cabinet",type:"switch"},null,8,["modelValue"])]),_:1}),e(o,{label:"Enable Updates",help:"Enables or disables OTA updates."},{default:s(()=>[e(d,{modelValue:n.ota,"onUpdate:modelValue":l[13]||(l[13]=a=>n.ota=a),name:"ota",type:"switch"},null,8,["modelValue"])]),_:1})]),e(c,{color:"success",type:"submit",label:"Add Machine"})],32),i("div",null,[e(V,{color:"warning",label:"Queue",class:"mb-4"}),i("div",j,[(r(!0),M(k,null,x(t.machineList,a=>(r(),u(g,{key:a.name,"color-prop":"bg-slate-800 dark:bg-slate-800"},{default:s(()=>[i("div",F,[i("div",G,[i("h1",T,_(a.name),1),i("h2",Q,_(a.cabinet?"Cabinet":"Setup")+_(a.ota?" - OTA Enabled":null),1),i("h2",R,_(a.PCBID!=""?a.PCBID:"not generated"),1)]),e(c,{color:"danger",label:"Remove",onClick:z=>w(a.PCBID)},null,8,["onClick"])])]),_:2},1024))),128))])])])]),_:1}),i("div",H,[e(c,{type:"submit",color:"success",label:"Create Arcade with Discord",small:!1}),e(c,{type:"submit",color:"success",label:"Create Arcade with VPN",small:!1}),e(c,{type:"submit",color:"info",label:"Create Arcade",small:!1})])])]),_:1})]),_:1}))}};export{Y as default};
