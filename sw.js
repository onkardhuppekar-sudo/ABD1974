const SHELL_CACHE = 'corebtr-elite-v2';
const ASSET_CACHE = 'corebtr-elite-assets-v2';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest','./icons/icon-96.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>![SHELL_CACHE,ASSET_CACHE].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  const isQBImage=/corebtr-assets-production\.s3\.ap-south-1\.amazonaws\.com$/.test(url.hostname);
  event.respondWith((async()=>{
    const imageCache=await caches.open(ASSET_CACHE);
    const shellCache=await caches.open(SHELL_CACHE);
    const cached=await imageCache.match(req) || await shellCache.match(req);
    if(cached) return cached;
    try{
      const res=await fetch(req);
      if(res && (res.ok || res.type==='opaque')){
        if(isQBImage) imageCache.put(req,res.clone()).catch(()=>{});
        else if(url.origin===self.location.origin) shellCache.put(req,res.clone()).catch(()=>{});
      }
      return res;
    }catch(e){
      return cached || new Response('Offline',{status:503,statusText:'Offline'});
    }
  })());
});
