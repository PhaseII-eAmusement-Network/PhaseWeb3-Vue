import{u as n}from"./index.f4e395da.js";const o=n();async function c(a){try{return(await o.callApi(`/game/${a}/profiles`)).data}catch(t){throw console.log("Error fetching profiles:",t),t}}async function u(a,t,e=null){if(!e){for(;!o.userId;)await new Promise(r=>setTimeout(r,200));e=o.userId}try{return(await o.callApi(`/profile/${a}?version=${t}&userId=${e}`)).data}catch(r){throw console.log("Error fetching profile:",r),r}}async function f(a,t,e){try{for(;!o.userId;)await new Promise(i=>setTimeout(i,200));const r=o.userId;return await o.callApi(`/profile/${a}?version=${t}&userId=${r}`,"POST",e)}catch(r){throw console.log("Error updating profile:",r),r}}export{c as A,u as a,f as b};
