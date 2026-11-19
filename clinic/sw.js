const C='clinic-578e792c';const A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('clinic-')&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin&&u.pathname.includes('/clinic/')){e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>{const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r.mode==='navigate'?'./index.html':r,cp))}return res});return u.pathname.includes('/audio/')&&m?m:net.catch(()=>m||caches.match('./index.html'))}))}
 else if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})))}});
