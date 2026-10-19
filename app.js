(() => {
const defaults={
 ads:[{title:"স্পনসর লিংক ১",url:""},{title:"স্পনসর লিংক ২",url:""},{title:"স্পনসর লিংক ৩",url:""}],
 socials:[
 {title:"Telegram",url:"https://t.me/Mahim_earning_gurup"},
 {title:"TikTok",url:"https://www.tiktok.com/@mahimgaming50k86"},
 {title:"Facebook",url:"https://www.facebook.com/share/1DryETSeNV/"},
 {title:"YouTube",url:"https://youtube.com/@mahimgaming50k?si=cHo_xhwhTnxKpf8-"}
 ],appDriveUrl:""
};
const bn=n=>String(n).replace(/\d/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const validUrl=s=>{try{let u=new URL(s);return ["https:","http:"].includes(u.protocol)?u.href:""}catch{return""}};
let cfg=defaults,steps=[],at=0,tick=null;
const area=document.getElementById("step"),bar=document.getElementById("bar"),stepCount=document.getElementById("stepCount"),pct=document.getElementById("pct");
document.getElementById("year").textContent=new Date().getFullYear();
function makeSteps(){steps=[...cfg.ads.map((a,i)=>({type:"ad",...a,title:a.title||`স্পনসর লিংক ${i+1}`})),
{type:"info",title:"Free Fire টিপস ১",body:"স্থিতিশীল ইন্টারনেট ব্যবহার করো এবং গেম খেলার সময় অপ্রয়োজনীয় ব্যাকগ্রাউন্ড অ্যাপ বন্ধ রাখো।"},
{type:"info",title:"Free Fire টিপস ২",body:"তোমার ডিভাইসে যে গ্রাফিক্স সেটিং স্থিতিশীল FPS দেয়, সেটি বেছে নাও। কোনো সেটিং ১০০% হেডশট বা ল্যাগ-ফ্রি খেলার নিশ্চয়তা দেয় না।"},
...cfg.socials.map(s=>({type:"social",...s})),{type:"download",title:"অ্যাপ ডাউনলোড",body:"সব ধাপ শেষ হয়েছে।"}];}
function socialCards(){document.getElementById("socialGrid").innerHTML=cfg.socials.map(s=>`<a href="${esc(validUrl(s.url)||"#")}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`).join("");}
function render(){
clearInterval(tick);const s=steps[at];stepCount.textContent=`ধাপ ${bn(at+1)} / ${bn(steps.length)}`;let p=Math.round(at/Math.max(1,steps.length-1)*100);pct.textContent=bn(p)+"%";bar.style.width=p+"%";
let body=esc(s.body||"পরবর্তী ধাপে যেতে নির্দেশনা অনুসরণ করো।"),extra="";
if(s.type==="ad"){extra=`<div class="notice">এই টাইমার শুধু অপেক্ষার সময় দেখায়; বিজ্ঞাপন দেখা বা ক্লিক যাচাই করে না। বিজ্ঞাপন নেটওয়ার্কের নিয়ম মেনে লিংক ব্যবহার করো।</div><div class="timerrow"><div class="timer" id="timer">১৫</div><span id="timerText">১৫ সেকেন্ড অপেক্ষা করো</span></div>${validUrl(s.url)?`<a class="btn alt" href="${esc(validUrl(s.url))}" target="_blank" rel="noopener noreferrer">স্পনসর লিংক খুলুন ↗</a><br><br>`:"<p class='notice'>এই স্পনসর লিংকটি অ্যাডমিন এখনো যোগ করেননি।</p>"}<button class="btn" id="next" disabled>অপেক্ষা করুন…</button>`}
else if(s.type==="social"){const url=validUrl(s.url);const key="mh_opened_"+at;const opened=sessionStorage.getItem(key)==="yes";extra=`<div class="notice">প্রথমে নিচের লিংকটি খুলে Follow / Subscribe / Join করো, তারপর এই পেজে ফিরে এসো। এই ওয়েবসাইট শুধু লিংক খোলা ও ফিরে আসা শনাক্ত করতে পারে—সত্যিকারের Follow/Subscribe যাচাই করতে পারে না।</div>${url?`<a class="btn alt" id="socialOpen" href="${esc(url)}" target="_blank" rel="noopener noreferrer"> ${esc(s.title)} লিংক খুলুন ↗</a><br><br>`:"<p class='notice'>এই সোশ্যাল লিংকটি অ্যাডমিন যোগ করেননি।</p>"}<button class="btn" id="next" ${opened?"":"disabled"}>${opened?"Continue →":"লিংক খুলে ফিরে আসুন"}</button><p class="small" id="returnHint">${opened?"লিংক খোলা হয়েছে। এখন Continue চাপতে পারো।":"লিংক না খুলে Continue চাপলে পরের ধাপে যেতে পারবে না।"}</p>`;
}else if(s.type==="download"){extra=validUrl(cfg.appDriveUrl)?`<a class="download" href="${esc(validUrl(cfg.appDriveUrl))}" target="_blank" rel="noopener noreferrer">Google Drive থেকে ডাউনলোড করুন ↗</a><p class="small">অন্যের অ্যাপ বিতরণের আগে মালিকের অনুমতি নাও।</p>`:`<div class="notice">Google Drive লিংক এখনো সেট করা হয়নি। অ্যাডমিন ড্যাশবোর্ড চালু করার পরে লিংক যোগ করতে হবে।</div>`;extra+=`<button class="btn" id="restart">আবার শুরু করুন ↻</button>`}
else extra=`<div class="notice">${body}</div><button class="btn" id="next">পরবর্তী ধাপ →</button>`;
area.innerHTML=`<div class="tag">STEP ${String(at+1).padStart(2,"0")}</div><h2>${esc(s.title)}</h2><p>${body}</p>${extra}`;
const next=document.getElementById("next");if(next){next.addEventListener("click",()=>{if(s.type==="social"&&sessionStorage.getItem("mh_opened_"+at)!=="yes")return;at++;render()})}
const open=document.getElementById("socialOpen");if(open){open.addEventListener("click",()=>{sessionStorage.setItem(key,"yes");setTimeout(()=>{const b=document.getElementById("next"),h=document.getElementById("returnHint");if(b){b.disabled=false;b.textContent="Continue →"}if(h)h.textContent="লিংক খোলা হয়েছে। এখন Continue চাপতে পারো।"},350);});}
if(s.type==="ad"){let n=15;tick=setInterval(()=>{n--;const t=document.getElementById("timer");if(t)t.textContent=bn(Math.max(0,n));if(n<=0){clearInterval(tick);const b=document.getElementById("next"),tx=document.getElementById("timerText");if(tx)tx.textContent="এখন পরবর্তী ধাপে যেতে পারো";if(b){b.disabled=false;b.textContent="পরবর্তী ধাপ →";b.addEventListener("click",()=>{at++;render()})}}},1000)}
const restart=document.getElementById("restart");if(restart)restart.onclick=()=>{at=0;render()};
}
async function loadSettings(){
 try{
  const f=window.FIREBASE_CONFIG||{};
  if(f.apiKey&&!f.apiKey.startsWith("PASTE_")&&f.appId&&!f.appId.startsWith("PASTE_")){
   const {initializeApp}=await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js");
   const {getFirestore,doc,getDoc}=await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js");
   const app=initializeApp(f);const db=getFirestore(app);const snap=await getDoc(doc(db,"publicSettings","main"));
   if(snap.exists()){const data=snap.data();cfg={...defaults,...data,ads:data.ads||defaults.ads,socials:data.socials||defaults.socials};}
  }
 }catch(e){console.warn("Using built-in public links; Firebase settings not loaded.",e)}
 makeSteps();socialCards();render();
}
document.getElementById("start").onclick=()=>area.scrollIntoView({behavior:"smooth",block:"start"});
loadSettings();
})();