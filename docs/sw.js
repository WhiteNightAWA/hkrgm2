if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>s(e,t),l={module:{uri:t},exports:o,require:d};i[t]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-B-kibN7_.js",revision:null},{url:"assets/index-BeD_v2kd.css",revision:null},{url:"googleea3a445c6cbfa938.html",revision:"e545ff2fdddea008a8a2d2f7406280b7"},{url:"index.html",revision:"127e42d18b6d828aa217e0b7825ab5ab"},{url:"registerSW.js",revision:"d669b184fb4446356cd7ab879c4a7b5e"},{url:"manifest.webmanifest",revision:"f1e061a6d0f9356b2bda34a38d23bd69"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
