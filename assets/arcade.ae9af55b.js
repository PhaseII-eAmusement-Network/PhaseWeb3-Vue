import{u as s}from"./index.26ff47d4.js";const e=s();async function d(t){try{return(await e.callApi(`/arcade/${t}`)).arcade}catch(a){throw console.log("Error fetching arcade:",a),a}}async function l(t,a,r){try{return(await e.callApi(`/arcade/${t}/settings?game=${a}&version=${r}`)).data}catch(c){throw console.log("Error fetching arcade settings:",c),c}}async function A(t,a,r,c){try{for(;!e.userId;)await new Promise(n=>setTimeout(n,200));return await e.callApi(`/arcade/${t}/settings?game=${a}&version=${r}`,"POST",c)}catch(o){throw console.log("Error updating settings:",o),o}}async function g(t){try{return await e.callApi(`/arcade/${t}/exportVPN`)}catch(a){throw console.log("Error fetching arcade VPN:",a),a}}async function u(t,a){try{return await e.callApi(`/arcade/${t}`,"POST",a)}catch(r){throw console.log("Error updating arcade:",r),r}}async function h(t){try{return(await e.callApi(`/arcade/${t}/paseli`)).data}catch(a){throw console.log("Error fetching arcade PASELI data:",a),a}}export{d as A,g as a,u as b,l as c,A as d,h as e};
