function a(s,u){return u.split(".").reduce((t,f)=>t&&t[f],s)}function l(s,u,t){const f=u.split("."),o=f.pop(),e=f.reduce((n,r)=>n[r]=n[r]||{},s);e[o]=t}function x(s,u){const t=/^[0-9A-Z!?#$&*-. ]*$/,f=s.toUpperCase().slice(0,u);return(t.test(f)?f:"").toUpperCase()}function F(s,u){let t="";for(let o=0;o<s.length&&t.length<u;o++){let e=s.charCodeAt(o);e>=48&&e<=57?e=65296+(e-48):e>=65&&e<=90?e=65313+(e-65):e>=97&&e<=122?e=65345+(e-97):e===64?e=65312:e===44?e=65292:e===46?e=65294:e===95&&(e=65343),t+=String.fromCharCode(e)}return(/^[\uFF20-\uFF3A\uFF41-\uFF5A\uFF10-\uFF19\uFF0C\uFF0E\uFF3F\u3041-\u308D\u308F\u3092\u3093\u30A1-\u30ED\u30EF\u30F2\u30F3\u30FC]*$/.test(t)?t:"").toUpperCase()}export{x as a,a as g,l as s,F as t};