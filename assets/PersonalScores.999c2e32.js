import{u as Z,a as aa,b as ea,ag as ra,r as Q,o as sa,c as U,e as la,w as c,f as o,k as ta,$ as oa,g as r,bt as na,j as da,i as X,m as ca,aQ as ua,_ as fa,F as ia,n as pa,p as _a,q as ha}from"./index.130e9bc7.js";import{_ as ga}from"./GeneralTable.75c6d318.js";import{A as ka}from"./profile.0f8a8b5b.js";const ba={class:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-3 pb-6"},Ta={__name:"PersonalScores",setup(va){const u=Z(),z=aa(),J=ea();var l=null,e=null,n=null;l=u.params.game,n=u.params.userId,e=ra(l),e||z.push({name:"ErrorPage",params:{catchAll:"404"}});const t=Q(null),f=Q([]),i=[{text:"Timestamp",value:"timestamp",width:140},{text:"New PB",value:"newRecord",width:100},{text:"Song",value:"song.name",width:180},{text:"Artist",value:"song.artist",width:180},{text:"Chart",value:"song.chart",width:100},{text:"Grade",value:"data.rank",width:80},{text:"Score",value:"points",width:120}];if(e.scoreHeaders)for(var K of e.scoreHeaders)i.push(K);sa(async()=>{try{const s=await J.getAttemptData(l,n);f.value=W(s)}catch(s){console.error("Failed to fetch score data:",s)}O()});async function O(){try{t.value=null;const s=await ka(l,null,n);t.value=s}catch(s){console.error("Failed to fetch user profile data:",s)}}function W(s){var p,_,h,g,k,b,v,m,w,$,T,x,S,B,I,N,P,A,C,F,R,y,E,D,G,H,L,V,M,j,q;var d=[];for(var a of s){if(a.newRecord?a.newRecord="\u2705":a.newRecord="",a.timestamp){const Y=new Date(a.timestamp*1e3);a.timestamp=Y.toLocaleString()}a.points!=null&&(a.points=a.points.toString().replace(new RegExp("\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))","g"),",")),((_=(p=a.data)==null?void 0:p.stats)==null?void 0:_.score)!=null&&(a.exscore=a.points.toString(),a.points=(g=(h=a.data)==null?void 0:h.stats)==null?void 0:g.score.toString().replace(new RegExp("\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))","g"),",")),((k=a.song)==null?void 0:k.chart)!=null&&e.chartTable&&(a.song.chart=e.chartTable[(b=a.song)==null?void 0:b.chart]),((v=a.data)==null?void 0:v.halo)!=null&&e.haloTable&&(a.data.halo=e.haloTable[(m=a.data)==null?void 0:m.halo]),((w=a.data)==null?void 0:w.medal)!=null&&e.medalTable&&(a.data.medal=e.medalTable[($=a.data)==null?void 0:$.medal]),((T=a.data)==null?void 0:T.clear_status)!=null&&e.medalTable&&(a.data.medal=e.medalTable[(x=a.data)==null?void 0:x.clear_status]),((S=a.data)==null?void 0:S.rank)!=null&&e.rankTable&&(a.data.rank=e.rankTable[(B=a.data)==null?void 0:B.rank]),((I=a.data)==null?void 0:I.result_rank)!=null&&e.rankTable&&(a.data.rank=e.rankTable[(N=a.data)==null?void 0:N.result_rank]),((P=a.data)==null?void 0:P.grade)!=null&&e.rankTable&&(a.data.rank=e.rankTable[(A=a.data)==null?void 0:A.grade]),((C=a.data)==null?void 0:C.skill_perc)>0?a.data.skill_perc=`${((F=a.data)==null?void 0:F.skill_perc)/100}%`:a.data.skill_perc="0%",(R=a.data)!=null&&R.skill_points&&(a.data.skill_points=((y=a.data)==null?void 0:y.skill_points)/10),((E=a.data)==null?void 0:E.perc)>0?a.data.perc=`${((D=a.data)==null?void 0:D.perc)/100}%`:a.data.perc="0%",(G=a.data)!=null&&G.new_skill&&(a.data.new_skill=((H=a.data)==null?void 0:H.new_skill)/10),(L=a.data)!=null&&L.music_rate&&(a.data.music_rate=((V=a.data)==null?void 0:V.music_rate)/10),(M=a.data)!=null&&M.excellent?a.medal="EX FC":(j=a.data)!=null&&j.fullcombo?a.medal="FC":(q=a.data)!=null&&q.clear?a.medal="CLEARED":a.medal="FAILED",d.push(a)}return d}return(s,d)=>(U(),la(ha,null,{default:c(()=>[o(_a,null,{default:c(()=>[t.value?(U(),ta(ia,{key:0},[o(oa,{icon:r(na),title:`${t.value.username}'s ${r(e).shortName?r(e).shortName:r(e).name} Scores`,main:""},null,8,["icon","title"]),da("div",ba,[o(X,{icon:r(ca),href:`/#/games/${r(l)}/profiles/${t.value.userId}`,color:"info",label:`${t.value.username}'s Profile`},null,8,["icon","href","label"]),o(X,{icon:r(ua),href:`/#/games/${r(l)}`,color:"info",label:`${r(e).shortName?r(e).shortName:r(e).name} Home`},null,8,["icon","href","label"])]),o(fa,{"has-table":""},{default:c(()=>[o(ga,{headers:i,items:f.value},null,8,["items"])]),_:1})],64)):pa("",!0)]),_:1})]),_:1}))}};export{Ta as default};
