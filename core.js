/* Math Check: общая часть генератора — числа, формулы, проверка ответов, учебный календарь, сборка работы.
   Задания каждого класса — в grades/gN.js; класс подключается через GEN.register(n, {TOPICS, TPL, OLY, PROOFS}).
   Без DOM — тестируется в node. */
(function (root) {
"use strict";
"use strict";

/* ---------- RNG ---------- */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function mkR(seed){
  const f=mulberry32(seed>>>0);
  const R={
    f,
    int:(a,b)=>a+Math.floor(f()*(b-a+1)),
    pick:arr=>arr[Math.floor(f()*arr.length)],
    nz:(a,b)=>{let x;do{x=a+Math.floor(f()*(b-a+1))}while(x===0);return x},
    sign:()=>f()<0.5?-1:1,
    chance:p=>f()<p,
    shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(f()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a},
  };
  return R;
}

/* ---------- Рациональные числа (точные дроби) ---------- */
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const t=a%b;a=b;b=t}return a||1}
function lcm(a,b){return Math.abs(a*b)/gcd(a,b)}
class Q{
  constructor(n,d=1){if(d===0)throw new Error("div0");if(d<0){n=-n;d=-d}const g=gcd(n,d);this.n=n/g;this.d=d/g}
  add(o){o=q(o);return new Q(this.n*o.d+o.n*this.d,this.d*o.d)}
  sub(o){o=q(o);return new Q(this.n*o.d-o.n*this.d,this.d*o.d)}
  mul(o){o=q(o);return new Q(this.n*o.n,this.d*o.d)}
  div(o){o=q(o);return new Q(this.n*o.d,this.d*o.n)}
  neg(){return new Q(-this.n,this.d)}
  abs(){return new Q(Math.abs(this.n),this.d)}
  v(){return this.n/this.d}
  sgn(){return Math.sign(this.n)}
  isInt(){return this.d===1}
  eq(o){o=q(o);return this.n===o.n&&this.d===o.d}
  pow(k){let r=new Q(1);if(k>=0){for(let i=0;i<k;i++)r=r.mul(this)}else{for(let i=0;i<-k;i++)r=r.div(this)}return r}
}
function q(x){if(x instanceof Q)return x;if(Number.isInteger(x))return new Q(x,1);const s=String(x);const p=(s.split(".")[1]||"").length;const m=Math.pow(10,p);return new Q(Math.round(x*m),m)}
function decPlaces(v){v=q(v);let d=v.d,k=0;while(d%2===0){d/=2}while(d%5===0){d/=5}if(d!==1)return -1;let t=v.d;while(true){if(Math.pow(10,k)%t===0)return k;k++;if(k>12)return -1}}

/* ---------- Язык и форматирование ---------- */
let LANG="ru";
const MINUS="−";
function setLang(l){LANG=l}
function tr(o){return o[LANG]!==undefined?o[LANG]:o.ru}
function decSep(){return LANG==="en"?".":","}
function grp(intStr){ // группировка разрядов для больших чисел
  if(intStr.length<=4)return intStr;
  return intStr.replace(/\B(?=(\d{3})+(?!\d))/g," ");
}
function decStr(v){
  v=q(v);const k=decPlaces(v);if(k<0)return null;
  const neg=v.n<0;const n=Math.abs(v.n);const m=Math.pow(10,k)/v.d;const scaled=n*m;
  let ip=Math.floor(scaled/Math.pow(10,k)),fp=scaled%Math.pow(10,k);
  let s=grp(String(ip));
  if(k>0){let f=String(fp).padStart(k,"0").replace(/0+$/,"");if(f)s+=decSep()+f}
  return (neg?MINUS:"")+s;
}
function fracHtml(n,d){return `<span class="fr"><span>${n}</span><span>${d}</span></span>`}
function numHtml(v,mode){
  v=q(v);
  if(v.isInt())return (v.n<0?MINUS:"")+grp(String(Math.abs(v.n)));
  const k=decPlaces(v);
  if(mode==="dec"&&k>=0)return decStr(v);
  if(mode===undefined||mode==="auto"){if(k>=0&&k<=3)return decStr(v)}
  const neg=v.n<0,n=Math.abs(v.n),d=v.d;
  if(mode==="mixed"&&n>d){const w=Math.floor(n/d),r=n%d;return (neg?MINUS:"")+w+fracHtml(r,d)}
  return (neg?MINUS:"")+fracHtml(n,d);
}
function plainOf(v){ // как ввёл бы ученик
  v=q(v);const k=decPlaces(v);
  if(k>=0&&k<=4)return decStr(v).replace(MINUS,"-").replace(/ /g,"");
  return (v.n<0?"-":"")+Math.abs(v.n)+"/"+v.d;
}
function ansHtml(v){ // правильный ответ для показа
  v=q(v);const k=decPlaces(v);
  if(k>=0&&k<=4)return decStr(v);
  const approx=Math.round(v.v()*100)/100;
  return numHtml(v,"frac")+" ≈ "+decStr(q(approx));
}
/* значение с режимом отображения */
function V(qv,m){return {q:q(qv),m:m||"auto"}}
function vh(val,wrap){const s=numHtml(val.q,val.m);return wrap&&val.q.sgn()<0?`(${s})`:s}
function qh(x,wrap){return vh(V(x),wrap)}

/* ---------- Генераторы чисел ---------- */
const DENS_N=[2,3,4,5,6,8,10];
const DENS_A=[3,4,6,7,8,9,12,15];
function rInt(R,lo,hi){return R.sign()*R.int(lo,hi)}
function rDec(R,places,maxInt){ // ненулевая десятичная с ровно places знаками
  const m=Math.pow(10,places);let n;
  do{n=R.int(1,maxInt*m)}while(n%10===0&&places>0);
  return new Q(R.sign()*n,m);
}
function rFrac(R,dens,whole){ // правильная дробь (+целая часть)
  const d=R.pick(dens);let n;do{n=R.int(1,d-1)}while(gcd(n,d)!==1);
  const w=whole?R.int(1,whole):0;
  return new Q(R.sign()*(w*d+n),d);
}

/* ---------- Выражения ---------- */
const OPS={"+":{p:1,s:"+"},"-":{p:1,s:MINUS},"*":{p:2,s:"·"},":":{p:2,s:":"}};
function opSym(op){if(op===":"&&LANG==="en")return "÷";return OPS[op].s}
function L(v,m){return {v:V(v,m)}}
function N(op,a,b){return {op,a,b}}
function evalE(e){if(e.v)return e.v.q;const a=evalE(e.a),b=evalE(e.b);switch(e.op){case"+":return a.add(b);case"-":return a.sub(b);case"*":return a.mul(b);case":":return a.div(b)}}
function renderE(e,lead=true){
  if(e.v)return vh(e.v,!lead);
  const p=OPS[e.op].p;
  const wa=(!e.a.v&&OPS[e.a.op].p<p);
  const wb=(!e.b.v&&(OPS[e.b.op].p<p||(OPS[e.b.op].p===p&&(e.op==="-"||e.op===":"))));
  const A=wa?`(${renderE(e.a,true)})`:renderE(e.a,lead);
  const B=wb?`(${renderE(e.b,true)})`:renderE(e.b,false);
  return `${A} ${opSym(e.op)} ${B}`;
}
function stepsE(e,mode,out){ // пошагово, возвращает значение
  if(e.v)return e.v.q;
  const a=stepsE(e.a,mode,out),b=stepsE(e.b,mode,out);
  const r=evalE({op:e.op,a:{v:V(a)},b:{v:V(b)}});
  out.push(`${numHtml(a,mode)} ${opSym(e.op)} ${a.sgn()>=0||true?"":""}${b.sgn()<0?"("+numHtml(b,mode)+")":numHtml(b,mode)} = ${numHtml(r,mode)}`);
  return r;
}
function stepList(arr){return arr.map((s,i)=>`<p>${i+1}) ${s}</p>`).join("")}

/* ---------- Тексты-помощники ---------- */
const T_ANS={ru:"Ответ",et:"Vastus",en:"Answer"};
function P(s){return `<p>${s}</p>`}

function expAddSub(a,op,b,mode){
  const out=[];
  const B=op==="-"?b.neg():b;
  if(op==="-"){
    out.push(tr({ru:`Вычитание заменяем сложением с противоположным числом: ${numHtml(a,mode)} ${MINUS} ${qh(b,true)} = ${numHtml(a,mode)} + ${qh(B,true)}.`,
                 et:`Lahutamise asendame vastandarvu liitmisega: ${numHtml(a,mode)} ${MINUS} ${qh(b,true)} = ${numHtml(a,mode)} + ${qh(B,true)}.`,
                 en:`Replace subtraction with adding the opposite: ${numHtml(a,mode)} ${MINUS} ${qh(b,true)} = ${numHtml(a,mode)} + ${qh(B,true)}.`}));
  }
  if(!a.isInt()&&!B.isInt()&&mode!=="dec"&&(decPlaces(a)<0||decPlaces(B)<0||mode==="frac"||mode==="mixed")){
    const cd=lcm(a.d,B.d);
    out.push(tr({ru:`Общий знаменатель ${cd}.`,et:`Ühine nimetaja on ${cd}.`,en:`Common denominator: ${cd}.`}));
  }
  const s=a.add(B);const A1=a.abs(),B1=B.abs();
  if(a.sgn()*B.sgn()>0){
    out.push(tr({ru:`Знаки одинаковые: складываем модули ${numHtml(A1,mode)} + ${numHtml(B1,mode)} = ${numHtml(s.abs(),mode)} и ставим общий знак «${s.sgn()<0?MINUS:"+"}».`,
                 et:`Märgid on samad: liidame absoluutväärtused ${numHtml(A1,mode)} + ${numHtml(B1,mode)} = ${numHtml(s.abs(),mode)} ja paneme ühise märgi «${s.sgn()<0?MINUS:"+"}».`,
                 en:`Same signs: add the absolute values ${numHtml(A1,mode)} + ${numHtml(B1,mode)} = ${numHtml(s.abs(),mode)} and keep the common sign «${s.sgn()<0?MINUS:"+"}».`}));
  }else{
    const big=A1.v()>=B1.v()?A1:B1,small=A1.v()>=B1.v()?B1:A1;
    out.push(tr({ru:`Знаки разные: из большего модуля вычитаем меньший: ${numHtml(big,mode)} ${MINUS} ${numHtml(small,mode)} = ${numHtml(s.abs(),mode)}. Знак берём у числа с большим модулем.`,
                 et:`Märgid on erinevad: suuremast absoluutväärtusest lahutame väiksema: ${numHtml(big,mode)} ${MINUS} ${numHtml(small,mode)} = ${numHtml(s.abs(),mode)}. Märgi võtame suurema absoluutväärtusega arvult.`,
                 en:`Different signs: subtract the smaller absolute value from the larger: ${numHtml(big,mode)} ${MINUS} ${numHtml(small,mode)} = ${numHtml(s.abs(),mode)}. Take the sign of the number with the larger absolute value.`}));
  }
  out.push(`${tr(T_ANS)}: ${numHtml(s,mode)}.`);
  return out.map(P).join("");
}

function numAns(v,extra){v=q(v);const o=Object.assign({ans:{type:"num",v:v.v(),round:decPlaces(v)<0},show:ansHtml(v),plain:plainOf(v)},extra||{});if(o.tol){o.ans.tol=o.tol;delete o.tol}return o}

/* ---------- Учебный календарь ---------- */
// Учебные периоды Эстонии 2026/27 (смещения в днях от 1 сентября)
const PERIODS=[
 {name:"I",from:"09-01",to:"10-23",w0:0,weeks:8},
 {name:"II",from:"11-02",to:"12-18",w0:8,weeks:7},
 {name:"III",from:"01-04",to:"02-19",w0:15,weeks:7},
 {name:"IV",from:"03-01",to:"04-09",w0:22,weeks:6},
 {name:"V",from:"04-19",to:"06-08",w0:28,weeks:7},
];
function schoolPos(date){ // -> {weeks, period (index), inBreak, before, after}
  const d=new Date(date.getFullYear(),date.getMonth(),date.getDate());
  const y0=d.getMonth()>=8?d.getFullYear():d.getFullYear()-1;
  const mk=(md,afterNY)=>{const [m,dd]=md.split("-").map(Number);return new Date(m>=9?y0:y0+1,m-1,dd)};
  const start=mk(PERIODS[0].from);
  if(d<start)return {weeks:0,period:-1,before:true};
  for(let i=0;i<PERIODS.length;i++){
    const p=PERIODS[i],a=mk(p.from),b=mk(p.to);
    if(d>=a&&d<=b){const w=Math.min(p.weeks,Math.floor((d-a)/864e5/7));return {weeks:p.w0+w,period:i,inBreak:false,weekInPeriod:w}}
    const next=PERIODS[i+1];
    if(d>b&&(!next||d<mk(next.from))){return {weeks:p.w0+p.weeks,period:i,inBreak:true,after:!next}}
  }
  return {weeks:35,period:4,after:true};
}
function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

function olyItem(o){
  const sol=P(tr(o.s));
  if(o.type==="choice")return {olyId:o.id,q:tr(o.q),ans:{type:"choice",v:o.a},opts:o.opts.map(([k,l])=>[k,tr(l)]),show:tr(o.opts.find(x=>x[0]===o.a)[1]),plain:o.a,exp:sol};
  if(o.type==="set")return {olyId:o.id,q:tr(o.q),pre:"x =",ans:{type:"set",vals:o.a},show:o.a.map(v=>qh(new Q(v))).join("; "),plain:o.a.join("; "),exp:sol};
  const v=Array.isArray(o.a)?new Q(o.a[0],o.a[1]):new Q(o.a);
  return Object.assign(numAns(v,{olyId:o.id,q:tr(o.q),exp:sol}),o.unit?{unit:tr(o.unit)}:{});
}
function proofItem(o){return {olyId:o.id,q:tr(o.q),ans:{type:"self"},show:"",plain:"",exp:P(tr(o.s))}}

/* ---------- Разбор и проверка ответа ---------- */
function parseNum(raw){
  if(raw==null)return NaN;
  let s=String(raw).trim().replace(/[−–—]/g,"-").replace(/ | /g," ");
  s=s.replace(/[a-zA-Zа-яА-ЯõäöüÕÄÖÜ°%€²³‰.]+$/,m=>m.replace(/[^.]/g,"")); // хвост с единицами
  s=s.replace(/[a-zA-Zа-яА-ЯõäöüÕÄÖÜ°%€²³‰]+$/,"").trim();
  s=s.replace(/^\((.*)\)$/,"$1").trim();
  if(/^[+-]?\d{1,3}( \d{3})+([.,]\d+)?$/.test(s))s=s.replace(/ /g,"");
  s=s.replace(/,/g,".");
  if(!s)return NaN;
  let m=s.match(/^([+-]?)\s*(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if(m){if(+m[4]===0)return NaN;const v=+m[2]+(+m[3])/(+m[4]);return m[1]==="-"?-v:v}
  m=s.match(/^([+-]?)\s*(\d*\.?\d+)\s*\/\s*(\d*\.?\d+)$/);
  if(m){if(+m[3]===0)return NaN;const v=(+m[2])/(+m[3]);return m[1]==="-"?-v:v}
  m=s.match(/^([+-]?)\s*(\d+\.?\d*|\.\d+)$/);
  if(m)return m[1]==="-"?-(+m[2]):+m[2];
  return NaN;
}
function closeEnough(x,ans){
  if(isNaN(x))return false;
  const v=ans.v;
  if(ans.tol)return Math.abs(x-v)<=ans.tol+1e-9;
  if(Math.abs(x-v)<1e-9*Math.max(1,Math.abs(v)))return true;
  if(ans.round)return Math.abs(x-v)<=0.0051; // бесконечная дробь: можно округлить до сотых
  return false;
}
function isFilled(item,val){
  if(item.ans.type==="std")return Array.isArray(val)&&String(val[0]||"").trim()!==""&&String(val[1]||"").trim()!=="";
  if(item.ans.type==="self")return val==="0"||val==="1"||val==="2";
  return val!=null&&String(val).trim()!=="";
}
function score(item,val,pts){ // -> полученные баллы
  const a=item.ans;
  if(!isFilled(item,val))return 0;
  if(a.type==="self")return val==="2"?pts:val==="1"?Math.floor(pts/2):0;
  if(a.type==="choice")return val===a.v?pts:0;
  if(a.type==="num")return closeEnough(parseNum(val),a)?pts:0;
  if(a.type==="set"){const got=String(val).split(";").map(s=>s.trim()).filter(Boolean).map(parseNum);if(got.some(isNaN))return 0;
    const need=a.vals.slice().sort((x,y)=>x-y),g=got.slice().sort((x,y)=>x-y);if(need.length!==g.length)return 0;
    return need.every((v,i)=>Math.abs(v-g[i])<=0.0051)?pts:0}
  if(a.type==="std"){const m=parseNum(val[0]),e=parseInt(String(val[1]).replace(/[−–—]/g,"-"),10);return (Math.abs(m-a.m)<1e-9&&e===a.e)?pts:0}
  return 0;
}


/* ---------- Класс: темы по неделям и сборка работы ---------- */
function makeGrade(grade,M){
const {TOPICS,TPL,OLY,PROOFS}=M;
function coveredTopics(weeks){return TOPICS.filter(t=>t.start<weeks)}
function currentTopics(pos){
  const cov=coveredTopics(pos.weeks);
  let pIdx=pos.period;
  if(pIdx<0)return [TOPICS[0]];
  let pStart=PERIODS[pIdx].w0;
  let cur=cov.filter(t=>t.start>=pStart);
  if(cur.length===0&&pIdx>0){pStart=PERIODS[pIdx-1].w0;cur=cov.filter(t=>t.start>=pStart)}
  if(cur.length===0)cur=[TOPICS[0]];
  return cur;
}

/* buildTest(opts): opts={date, level:'n'|'a'|'o', type:'theme'|'period', lang, seed, seenOly:[]} */
function buildTest(opts){
  setLang(opts.lang||"ru");
  const R=mkR(opts.seed);
  const pos=schoolPos(opts.date);
  const cov=coveredTopics(pos.weeks);
  const covIds=new Set(cov.map(t=>t.id));covIds.add(TOPICS[0].id);
  let cur=currentTopics(pos);
  if(Array.isArray(opts.only)&&opts.only.length){const o=TOPICS.filter(t=>opts.only.includes(t.id));if(o.length)cur=o}
  const lvl=opts.level==="o"?"a":opts.level;
  const blocks=[];
  const seen=new Set(opts.seenOly||[]);
  const pushTpl=(id,cnt)=>{const t=TPL[id];const c=cnt||t.cnt[lvl];const b=t.gen(R,lvl,c);blocks.push({tpl:id,topic:t.topic,title:tr(t.title),pts:t.pts,intro:b.intro,items:b.items})};
  const pickOly=(n,kind)=>{
    const pool=(kind==="proof"?PROOFS:OLY).filter(o=>covIds.has(o.topic));
    const fresh=R.shuffle(pool.filter(o=>!seen.has(o.id))),old=R.shuffle(pool.filter(o=>seen.has(o.id)));
    return fresh.concat(old).slice(0,n);
  };
  const olyBlock=(list,pts,title)=>{
    if(!list.length)return;
    blocks.push({tpl:"oly",topic:"oly",star:true,title,pts,items:list.map(o=>olyItem(o))});
  };
  if(opts.level==="o"){
    olyBlock(pickOly(6),3,tr({ru:"Олимпиадные задачи",et:"Olümpiaadiülesanded",en:"Olympiad problems"}));
    const pr=pickOly(1,"proof");if(pr.length)blocks.push({tpl:"proof",topic:"proof",star:true,title:tr({ru:"Докажи",et:"Tõesta",en:"Prove"}),pts:4,items:pr.map(proofItem)});
    // добавим одну продвинутую текстовую по текущей теме
    const curT=cur[cur.length-1];pushTpl(R.pick(curT.tpl),2);
    return finish();
  }
  const isPeriod=opts.type==="period";
  // основная часть: шаблоны текущих тем
  let main=[];cur.forEach(t=>t.tpl.forEach(id=>main.push(id)));
  const review=[];if(!opts.only)cov.filter(t=>!cur.includes(t)).forEach(t=>t.tpl.forEach(id=>review.push(id)));
  if(!opts.only&&(cov.length<=2||pos.period<0))TOPICS[0].tpl.forEach(id=>{if(!main.includes(id))review.push(id)});
  const maxBlocks=isPeriod?9:7;
  const nRev=opts.only?0:(isPeriod?3:(main.length>=6?1:2));
  if(main.length>maxBlocks-nRev){const firsts=cur.map(t=>t.tpl[0]);const rest=R.shuffle(main.filter(id=>!firsts.includes(id)));const keep=new Set(firsts.concat(rest).slice(0,maxBlocks-nRev));main=main.filter(id=>keep.has(id))}
  main.forEach(id=>pushTpl(id));
  R.shuffle(Array.from(new Set(review))).slice(0,Math.max(nRev,maxBlocks-main.length>3?3:nRev)).forEach(id=>pushTpl(id,Math.min(TPL[id].cnt[lvl],isPeriod?3:2)));
  // добираем объём
  const target=isPeriod?28:18;
  let total=()=>blocks.reduce((s,b)=>s+b.items.length,0);
  let guard=0;
  const used=()=>new Set(blocks.map(b=>b.tpl));
  while(total()<target&&guard++<8){
    const fresh=R.shuffle(Array.from(new Set(review))).filter(id=>!used().has(id));
    if(fresh.length&&blocks.length<maxBlocks+1){pushTpl(fresh[0],Math.min(3,TPL[fresh[0]].cnt[lvl]));continue}
    // расширяем блок без общего условия
    const ext=R.shuffle(blocks.filter(b=>!b.intro&&!b.star&&TPL[b.tpl]&&b.items.length<=4));
    if(!ext.length){if(opts.only){pushTpl(R.pick(main));continue}break}
    const b=ext[0];const extra=TPL[b.tpl].gen(R,lvl,2).items;
    b.items=b.items.concat(extra);
  }
  // задания со звёздочкой
  if(lvl==="n")olyBlock(pickOly(1),2,tr({ru:"Задание со звёздочкой",et:"Tärnülesanne",en:"Challenge"}));
  else {olyBlock(pickOly(2),3,tr({ru:"Задания со звёздочкой",et:"Tärnülesanded",en:"Challenges"}));const pr=pickOly(1,"proof");if(pr.length)blocks.push({tpl:"proof",topic:"proof",star:true,title:tr({ru:"Докажи",et:"Tõesta",en:"Prove"}),pts:3,items:pr.map(proofItem)})}
  return finish();
  function finish(){
    const minutes=opts.level==="o"?60:(isPeriod?90:45);
    return {pos,cov:cov.map(t=>t.id),cur:cur.map(t=>t.id),blocks,minutes,
      max:blocks.reduce((s,b)=>s+b.items.length*b.pts,0),
      olyIds:blocks.filter(b=>b.tpl==="oly"||b.tpl==="proof").flatMap(b=>b.items.map(i=>i.olyId))};
  }
}
return {grade,buildTest,score,isFilled,parseNum,TOPICS,PERIODS,schoolPos,coveredTopics,currentTopics,TPL,OLY,PROOFS,setLang,tr,hashStr,Q,mkR};
}

const REG={};
function curLang(){return LANG}
const H={curLang,DENS_A,DENS_N,L,MINUS,N,P,Q,T_ANS,V,ansHtml,decPlaces,decStr,evalE,expAddSub,fracHtml,lcm,numAns,numHtml,opSym,plainOf,q,qh,rDec,rFrac,rInt,renderE,stepList,stepsE,tr};
root.GEN={H,
  register(n,M){REG[n]=makeGrade(n,M);return REG[n]},
  grade(n){return REG[n]||null},
  grades(){return Object.keys(REG).map(Number).sort((a,b)=>a-b)},
  score,isFilled,parseNum,PERIODS,schoolPos,setLang,tr,hashStr,Q,mkR};
})(typeof window!=="undefined"?window:globalThis);
