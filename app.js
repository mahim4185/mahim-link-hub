(() => {
 const adUrls={
  1:"https://shrinkme.io/ref/118396988380297733112",
  2:"https://bicea.org/22/bd1cecbb35eb4d9305672b39d660669a",
  3:"https://bicea.org/14/79c001e754f7e31f8042e45db4fa9426",
  4:"https://bicea.org/21/6f80554aaa7ab2704ddb25caa41540a6"
 };
 const socialUrls={
  telegram:"https://t.me/Mahim_earning_gurup",
  tiktok:"https://www.tiktok.com/@mahimgaming50k86",
  facebook:"https://www.facebook.com/share/1DryETSeNV/",
  youtube:"https://youtube.com/@mahimgaming50k?si=cHo_xhwhTnxKpf8-"
 };
 let activeTimer=null;
 const completedAds=new Set(), completedSocial=new Set(), openedSocial=new Set();
 const $=id=>document.getElementById(id);
 function unlockAd(n){
   completedAds.add(n);
   $("state-"+n).textContent="DONE ✓";
   $("ad-step-"+n).classList.remove("active");
   $("ad-step-"+n).classList.add("locked");
   const next=n+1;
   if(next<=4){
     $("ad-step-"+next).classList.remove("locked");
     $("ad-step-"+next).classList.add("active");
     $("state-"+next).textContent="READY";
     document.querySelector(`[data-ad="${next}"]`).disabled=false;
     $("timer-label-"+next).textContent="বিজ্ঞাপন খুলে টাইমার শুরু করুন";
     $("ad-step-"+next).scrollIntoView({behavior:"smooth",block:"center"});
   }else{
     $("adsDone").classList.remove("hidden");
     $("socialBox").classList.remove("locked-section");
     $("socialBox").classList.add("unlocked");
     document.querySelector('[data-social="telegram"]').disabled=false;
     $("socialBox").scrollIntoView({behavior:"smooth",block:"start"});
   }
 }
 document.querySelectorAll("[data-ad]").forEach(btn=>btn.addEventListener("click",()=>{
   const n=Number(btn.dataset.ad);
   if(n!==completedAds.size+1 || activeTimer) return;
   window.open(adUrls[n],"_blank","noopener,noreferrer");
   btn.disabled=true;
   let left=15;
   $("timer-label-"+n).textContent="১৫ সেকেন্ড অপেক্ষা করুন—ফিরে এসে টাইমার চলতে থাকে।";
   $("timer-"+n).textContent=left+"s";
   const bar=$("bar-"+n); bar.style.width="0%";
   activeTimer=setInterval(()=>{
     left--; $("timer-"+n).textContent=left+"s";bar.style.width=((15-left)/15*100)+"%";
     if(left<=0){
       clearInterval(activeTimer);activeTimer=null;
       $("timer-label-"+n).textContent="টাইমার শেষ। Continue চাপুন।";
       $("state-"+n).textContent="CONTINUE";
       document.querySelector(`[data-continue-ad="${n}"]`).disabled=false;
     }
   },1000);
 }));
 document.querySelectorAll("[data-continue-ad]").forEach(btn=>btn.addEventListener("click",()=>{
   const n=Number(btn.dataset.continueAd);
   if(Number(btn.disabled)||!$("timer-label-"+n).textContent.includes("Continue")) return;
   btn.disabled=true;unlockAd(n);
 }));
 function refreshSocial(){
   const percent=Math.round(completedSocial.size/4*100);
   $("social-percent").textContent=percent+"%";$("social-bar").style.width=percent+"%";
   if(completedSocial.size===4){
     $("socialDone").classList.remove("hidden");
     $("finalBox").classList.remove("locked-section");$("finalBox").classList.add("unlocked");
     $("final-label").textContent="কাউন্টডাউন শুরু করতে নিচে চাপ দিন";
     $("start-final").disabled=false;
     $("finalBox").scrollIntoView({behavior:"smooth",block:"center"});
   } else {
     const order=["telegram","tiktok","facebook","youtube"];
     const next=order.find(x=>!completedSocial.has(x));
     if(next) document.querySelector(`[data-social="${next}"]`).disabled=false;
   }
 }
 document.querySelectorAll("[data-social]").forEach(btn=>btn.addEventListener("click",()=>{
   const key=btn.dataset.social;
   const order=["telegram","tiktok","facebook","youtube"];
   if(key!==order.find(x=>!completedSocial.has(x)))return;
   window.open(socialUrls[key],"_blank","noopener,noreferrer");
   openedSocial.add(key);
   document.querySelector(`[data-social-done="${key}"]`).disabled=false;
 }));
 document.querySelectorAll("[data-social-done]").forEach(btn=>btn.addEventListener("click",()=>{
   const key=btn.dataset.socialDone;
   if(!openedSocial.has(key))return;
   completedSocial.add(key);btn.disabled=true;btn.textContent="Completed ✓";
   $("check-"+key).textContent="✓";
   const row=document.querySelector(`[data-social-item="${key}"]`);row.classList.add("completed");
   const order=["telegram","tiktok","facebook","youtube"];
   const next=order.find(x=>!completedSocial.has(x));
   if(next) document.querySelector(`[data-social-item="${next}"]`).classList.remove("disabled");
   refreshSocial();
 }));
 $("start-final").addEventListener("click",()=>{
   if(completedSocial.size!==4||$("start-final").disabled)return;
   $("start-final").disabled=true;
   let left=10;$("final-label").textContent="Google Drive লিংক সক্রিয় হওয়ার আগে অপেক্ষা করুন";
   $("final-timer").textContent=left+"s";$("final-bar").style.width="0%";
   const timer=setInterval(()=>{
     left--;$("final-timer").textContent=left+"s";$("final-bar").style.width=((10-left)/10*100)+"%";
     if(left<=0){
       clearInterval(timer);$("final-label").textContent="প্রস্তুত! এখন Google Drive খুলতে পারবেন।";
       $("drive-link").classList.remove("disabled-link");$("drive-link").setAttribute("aria-disabled","false");
       $("drive-link").scrollIntoView({behavior:"smooth",block:"center"});
     }
   },1000);
 });
})();