import {initializeApp} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {getFirestore,doc,getDoc,setDoc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
const conf=window.FIREBASE_CONFIG||{}, form=document.getElementById("loginForm"), notice=document.getElementById("setupNotice");
let auth,db;
const defaultSocials=[
{title:"Telegram",url:"https://t.me/Mahim_earning_gurup"},{title:"TikTok",url:"https://www.tiktok.com/@mahimgaming50k86"},{title:"Facebook",url:"https://www.facebook.com/share/1DryETSeNV/"},{title:"YouTube",url:"https://youtube.com/@mahimgaming50k?si=cHo_xhwhTnxKpf8-"}];
let data={ads:[1,2,3].map((n)=>({title:`স্পনসর লিংক ${n}`,url:""})),socials:defaultSocials,appDriveUrl:""};
function field(label,id,value,type="text"){return `<label>${label}<input class="field" id="${id}" type="${type}" value="${String(value||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")}" placeholder="${label}"></label>`}
function draw(){document.getElementById("adsFields").innerHTML=data.ads.map((a,i)=>field(`স্পনসর ${i+1} নাম`,`at${i}`,a.title)+field(`স্পনসর ${i+1} URL`,`au${i}`,a.url,"url")).join("");document.getElementById("socialFields").innerHTML=data.socials.map((s,i)=>field(`${s.title} URL`,`su${i}`,s.url,"url")).join("");document.getElementById("driveUrl").value=data.appDriveUrl||"";}
function status(t){document.getElementById("status").textContent=t}
try{if(!conf.apiKey||conf.apiKey.startsWith("PASTE_")||!conf.appId||conf.appId.startsWith("PASTE_"))throw new Error("Firebase config missing");const app=initializeApp(conf);auth=getAuth(app);db=getFirestore(app);notice.textContent="Firebase config পাওয়া গেছে। নিজের অ্যাকাউন্ট দিয়ে লগইন করো।"}
catch(e){form.addEventListener("submit",e=>{e.preventDefault();notice.textContent="প্রথমে firebase-config.js-এ সম্পূর্ণ Firebase Web App config বসাও।";});}
if(auth){
onAuthStateChanged(auth,async user=>{if(!user){document.getElementById("editor").hidden=true;form.hidden=false;return}
form.hidden=true;document.getElementById("editor").hidden=false;
try{const snap=await getDoc(doc(db,"publicSettings","main"));if(snap.exists())data={...data,...snap.data()};draw();status("লগইন হয়েছে। সেভ করার সময় Security Rules অনুমতি যাচাই করবে।")}catch(e){status("সেটিংস পড়া যায়নি। Firestore Security Rules যাচাই করো। "+e.message)}
});
form.addEventListener("submit",async e=>{e.preventDefault();try{await signInWithEmailAndPassword(auth,document.getElementById("email").value,document.getElementById("password").value)}catch(err){notice.textContent="লগইন হয়নি: "+err.message}});
document.getElementById("save").addEventListener("click",async()=>{try{data.ads=data.ads.map((a,i)=>({title:document.getElementById("at"+i).value,url:document.getElementById("au"+i).value}));data.socials=data.socials.map((s,i)=>({...s,url:document.getElementById("su"+i).value}));data.appDriveUrl=document.getElementById("driveUrl").value;await setDoc(doc(db,"publicSettings","main"),data);status("সেভ হয়েছে! ওয়েবসাইটে রিফ্রেশ করলে নতুন লিংক দেখা যাবে।")}catch(e){status("সেভ হয়নি। Security Rules-এ তোমার UID admin হিসেবে যোগ করা হয়েছে কি না যাচাই করো। "+e.message)}});
document.getElementById("logout").addEventListener("click",()=>signOut(auth));
}