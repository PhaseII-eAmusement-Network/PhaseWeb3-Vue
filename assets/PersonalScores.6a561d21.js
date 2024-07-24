import{u as W,ad as X,r as q,o as Y,a as L,c as Z,w as c,b as n,i as aa,g as ea,f as j,e as r,m as ra,aa as sa,P as ta,ax as la,_ as na,F as oa,k as da,l as ca,n as ua,p as fa,q as ia}from"./index.8873e6d2.js";import{_ as pa}from"./GeneralTable.52fb5487.js";const _a={class:"grid grid-cols-1 md:max-w-[180px] space-y-3 mb-5"},wa={__name:"PersonalScores",setup(ha){const u=fa(),z=ia(),f=W();var t=null,e=null,o=null;t=u.params.game,o=u.params.userId,e=X(t),e||z.push({name:"ErrorPage",params:{catchAll:"404"}});const l=q(null),i=q([]),p=[{text:"Timestamp",value:"timestamp",width:140},{text:"New PB",value:"newRecord",width:100},{text:"Song",value:"song.name",width:180},{text:"Artist",value:"song.artist",width:180},{text:"Chart",value:"song.chart",width:100},{text:"Grade",value:"data.rank",width:80},{text:"Score",value:"points",width:120}];if(e.scoreHeaders)for(var J of e.scoreHeaders)p.push(J);Y(async()=>{try{const s=await f.getAttemptData(t,o);i.value=O(s)}catch(s){console.error("Failed to fetch score data:",s)}K()});async function K(){try{l.value=null;const s=await f.getUserProfile(t,null,o);l.value=s}catch(s){console.error("Failed to fetch user profile data:",s)}}function O(s){var _,h,k,g,w,m,b,v,$,T,x,S,B,N,P,y,I,R,C,F,H,A,D,G,V,E,M,U;var d=[];for(var a of s){if(a.newRecord?a.newRecord="\u2705":a.newRecord="",a.timestamp){const Q=new Date(a.timestamp*1e3);a.timestamp=Q.toLocaleString()}a.points!=null&&(a.points=a.points.toString().replace(new RegExp("\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))","g"),",")),((h=(_=a.data)==null?void 0:_.stats)==null?void 0:h.score)!=null&&(a.exscore=a.points.toString(),a.points=(g=(k=a.data)==null?void 0:k.stats)==null?void 0:g.score.toString().replace(new RegExp("\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))","g"),",")),((w=a.song)==null?void 0:w.chart)!=null&&e.chartTable&&(a.song.chart=e.chartTable[(m=a.song)==null?void 0:m.chart]),((b=a.data)==null?void 0:b.halo)!=null&&e.haloTable&&(a.data.halo=e.haloTable[(v=a.data)==null?void 0:v.halo]),(($=a.data)==null?void 0:$.medal)!=null&&e.medalTable&&(a.data.medal=e.medalTable[(T=a.data)==null?void 0:T.medal]),((x=a.data)==null?void 0:x.clear_status)!=null&&e.medalTable&&(a.data.medal=e.medalTable[(S=a.data)==null?void 0:S.clear_status]),((B=a.data)==null?void 0:B.rank)!=null&&e.rankTable&&(a.data.rank=e.rankTable[(N=a.data)==null?void 0:N.rank]),((P=a.data)==null?void 0:P.result_rank)!=null&&e.rankTable&&(a.data.rank=e.rankTable[(y=a.data)==null?void 0:y.result_rank]),((I=a.data)==null?void 0:I.grade)!=null&&e.rankTable&&(a.data.rank=e.rankTable[(R=a.data)==null?void 0:R.grade]),((C=a.data)==null?void 0:C.skill_perc)>0?a.data.skill_perc=`${((F=a.data)==null?void 0:F.skill_perc)/100}%`:a.data.skill_perc="0%",(H=a.data)!=null&&H.skill_points&&(a.data.skill_points=((A=a.data)==null?void 0:A.skill_points)/10),((D=a.data)==null?void 0:D.perc)>0?a.data.perc=`${((G=a.data)==null?void 0:G.perc)/100}%`:a.data.perc="0%",(V=a.data)!=null&&V.new_skill&&(a.data.new_skill=((E=a.data)==null?void 0:E.new_skill)/10),(M=a.data)!=null&&M.music_rate&&(a.data.music_rate=((U=a.data)==null?void 0:U.music_rate)/10),d.push(a)}return d}return(s,d)=>(L(),Z(ua,null,{default:c(()=>[n(ca,null,{default:c(()=>[l.value?(L(),aa(oa,{key:0},[ea("div",_a,[n(j,{icon:r(ra),href:`/#/games/${r(t)}/profiles/${l.value.userId}`,class:"w-full md:w-auto",color:"info",label:`${l.value.username}'s Profile`},null,8,["icon","href","label"]),n(j,{icon:r(sa),href:`/#/games/${r(t)}`,class:"w-full md:w-auto",color:"info",label:`${r(e).shortName?r(e).shortName:r(e).name} Home`},null,8,["icon","href","label"])]),n(ta,{icon:r(la),title:`${l.value.username}'s ${r(e).shortName?r(e).shortName:r(e).name} Scores`,main:""},null,8,["icon","title"]),n(na,{"has-table":""},{default:c(()=>[n(pa,{headers:p,items:i.value},null,8,["items"])]),_:1})],64)):da("",!0)]),_:1})]),_:1}))}};export{wa as default};