import{u as o}from"./index.26ff47d4.js";const c=o();async function n(){try{return(await c.callApi("/admin")).data}catch(r){throw console.log("Error loading admin dashboard:",r),r}}async function e(r){try{return await c.callApi(`/arcade/checkName?name=${r}`)}catch(a){throw console.log("Error testing arcade:",a),a}}async function d(r){try{return(await c.callApi(`/arcade/checkPCBID?PCBID=${r}`)).unused}catch(a){throw console.log("Error testing machine:",a),a}}async function i(r){try{return await c.callApi("/admin/onboardArcade","POST",r)}catch(a){throw console.log("Error onboarding arcade:",a),a}}export{n as A,i as a,d as b,e as c};