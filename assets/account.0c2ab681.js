import{u as e}from"./index.82b38b92.js";const t=e();async function s(a){try{return await t.callApi("/auth/emailAuth","POST",{email:a})}catch(r){throw console.log("Error checking email:",r),r}}async function i(a){try{return await t.callApi("/auth/check2FAKey","POST",{key:a})}catch(r){throw console.log("Error checking key:",r),r}}async function d(a,r,o){try{return await t.callApi("/auth/changePassword","POST",{key:a,newPassword:r,confirmPassword:o})}catch(c){throw console.log("Error resetting password:",c),c}}async function l(a,r,o){try{return await t.callApi("/user/updatePassword","POST",{currentPassword:a,newPassword:r,confirmPassword:o})}catch(c){throw console.log("Error updating password:",c),c}}async function u(a){try{return await t.callApi("/user","PUT",a)}catch(r){throw console.log("Error registering:",r),r}}async function w(){try{return(await t.callApi("/user/card")).cards}catch(a){throw console.log("Error fetching cards:",a),a}}async function h(a){try{return await t.callApi("/user/card","POST",{cardId:a})}catch(r){throw console.log("Error adding card:",r),r}}async function y(a){try{if(window.confirm("Are you really?"))return await t.callApi("/user/card","DELETE",{cardId:a})}catch(r){throw console.log("Error deleting card:",r),r}}async function g(){try{return(await t.callApi("/user/playVideos")).data}catch(a){throw console.log("Error fetching videos:",a),a}}async function P(a){try{if(window.confirm("Are you really?"))return await t.callApi(`/user/integrate/${a}`,"DELETE")}catch(r){throw console.log("Error deleting integration:",r),r}}async function A(a,r){try{return await t.callApi(`/user/integrate/${a}`,"POST",{code:r})}catch(o){throw console.log(`Error integrating with ${a}:`,o),o}}export{u as A,s as a,i as b,d as c,l as d,A as e,P as f,w as g,y as h,h as i,g as j};
