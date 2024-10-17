import{u as j,ar as z,r as J,o as K,a as O,c as Q,w as l,b as t,W as U,e as s,aI as X,g as Y,f as Z,_ as aa,l as ea,n as sa,p as ra,q as ta}from"./index.143f1dc6.js";import{_ as da}from"./GeneralTable.b6810eea.js";const na={class:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-3 pb-6"},ua={__name:"NetworkScores",setup(la){const V=ra(),q=ta(),E=j();var d=null,e=null;d=V.params.game,e=z(d),e||q.push({name:"ErrorPage",params:{catchAll:"404"}});const o=J([]),c=[{text:"Player",value:"username",width:120},{text:"New PB",value:"newRecord",width:100},{text:"Timestamp",value:"timestamp",width:140},{text:"Song",value:"song.name",width:180},{text:"Artist",value:"song.artist",width:150},{text:"Chart",value:"song.chart",width:100},{text:"Grade",value:"data.rank",width:80},{text:"Score",value:"points",width:120}];if(e.scoreHeaders)for(var F of e.scoreHeaders)c.push(F);K(async()=>{try{const r=await E.getAttemptData(d);o.value=L(r)}catch(r){console.error("Failed to fetch score data:",r)}});function L(r){var u,f,i,_,p,h,g,k,w,b,v,T,x,$,S,m,N,B,R,A,H,I,y,C,D,G,P,M;var n=[];for(var a of r){if(a.newRecord?a.newRecord="\u2705":a.newRecord="",a.timestamp){const W=new Date(a.timestamp*1e3);a.timestamp=W.toLocaleString()}a.points!=null&&(a.points=a.points.toString().replace(new RegExp("\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))","g"),",")),((f=(u=a.data)==null?void 0:u.stats)==null?void 0:f.score)!=null&&(a.exscore=a.points.toString(),a.points=(_=(i=a.data)==null?void 0:i.stats)==null?void 0:_.score.toString().replace(new RegExp("\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))","g"),",")),((p=a.song)==null?void 0:p.chart)!=null&&e.chartTable&&(a.song.chart=e.chartTable[(h=a.song)==null?void 0:h.chart]),((g=a.data)==null?void 0:g.halo)!=null&&e.haloTable&&(a.data.halo=e.haloTable[(k=a.data)==null?void 0:k.halo]),((w=a.data)==null?void 0:w.medal)!=null&&e.medalTable&&(a.data.medal=e.medalTable[(b=a.data)==null?void 0:b.medal]),((v=a.data)==null?void 0:v.clear_status)!=null&&e.medalTable&&(a.data.medal=e.medalTable[(T=a.data)==null?void 0:T.clear_status]),((x=a.data)==null?void 0:x.rank)!=null&&e.rankTable&&(a.data.rank=e.rankTable[($=a.data)==null?void 0:$.rank]),((S=a.data)==null?void 0:S.result_rank)!=null&&e.rankTable&&(a.data.rank=e.rankTable[(m=a.data)==null?void 0:m.result_rank]),((N=a.data)==null?void 0:N.grade)!=null&&e.rankTable&&(a.data.rank=e.rankTable[(B=a.data)==null?void 0:B.grade]),((R=a.data)==null?void 0:R.skill_perc)>0?a.data.skill_perc=`${((A=a.data)==null?void 0:A.skill_perc)/100}%`:a.data.skill_perc="0%",(H=a.data)!=null&&H.skill_points&&(a.data.skill_points=((I=a.data)==null?void 0:I.skill_points)/10),((y=a.data)==null?void 0:y.perc)>0?a.data.perc=`${((C=a.data)==null?void 0:C.perc)/100}%`:a.data.perc="0%",(D=a.data)!=null&&D.new_skill&&(a.data.new_skill=((G=a.data)==null?void 0:G.new_skill)/10),(P=a.data)!=null&&P.music_rate&&(a.data.music_rate=((M=a.data)==null?void 0:M.music_rate)/10),n.push(a)}return n}return(r,n)=>(O(),Q(sa,null,{default:l(()=>[t(ea,null,{default:l(()=>[t(U,{icon:s(X),title:`All ${s(e).shortName?s(e).shortName:s(e).name} Scores`,main:""},null,8,["icon","title"]),Y("div",na,[t(Z,{icon:r.mdiHome,href:`/#/games/${s(d)}`,color:"info",label:`${s(e).shortName?s(e).shortName:s(e).name} Home`},null,8,["icon","href","label"])]),t(aa,{"has-table":""},{default:l(()=>[t(da,{headers:c,items:o.value},null,8,["items"])]),_:1})]),_:1})]),_:1}))}};export{ua as default};