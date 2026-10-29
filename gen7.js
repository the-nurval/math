/* Генератор задач 7 класса (эстонская программа). Без DOM — тестируется в node. */
(function (root) {
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

/* ============================================================
   ШАБЛОНЫ. gen(R, lvl, cnt) -> {intro?, items:[...]}
   item: {q, pre?, unit?, ans:{type,...}, show, plain, exp, alt?}
   ============================================================ */
const TPL={};
function numAns(v,extra){v=q(v);const o=Object.assign({ans:{type:"num",v:v.v(),round:decPlaces(v)<0},show:ansHtml(v),plain:plainOf(v)},extra||{});if(o.tol){o.ans.tol=o.tol;delete o.tol}return o}

/* --- 1. Сложение и вычитание рациональных чисел --- */
TPL.addsub={topic:"rat",pts:1,cnt:{n:6,a:6},
  title:{ru:"Вычисли",et:"Arvuta",en:"Calculate"},
  gen(R,lvl,cnt){
    const items=[];
    const modesN=["int","dec","dec","frac","dec","frac","int","dec"];
    const modesA=["dec","mixed","frac","dec2","mixed","three","frac","three"];
    for(let i=0;i<cnt;i++){
      const md=(lvl==="n"?modesN:modesA)[i%8];
      let a,b,mode="auto",three=false;
      if(md==="int"){a=new Q(rInt(R,11,99));b=new Q(rInt(R,11,99))}
      else if(md==="dec"){a=rDec(R,1,25);b=rDec(R,R.pick([1,2]),25);mode="dec"}
      else if(md==="dec2"){a=rDec(R,2,30);b=rDec(R,3,10);mode="dec"}
      else if(md==="frac"){a=rFrac(R,lvl==="n"?DENS_N:DENS_A,0);b=rFrac(R,lvl==="n"?DENS_N:DENS_A,0);mode="frac"}
      else if(md==="mixed"){a=rFrac(R,lvl==="n"?DENS_N:DENS_A,5);b=rFrac(R,lvl==="n"?DENS_N:DENS_A,4);mode="mixed"}
      else {three=true}
      if(three){
        const x=rDec(R,1,20),y=rFrac(R,[2,4,5],2),z=rDec(R,2,9);
        const ops=[R.pick(["+","-"]),R.pick(["+","-"])];
        const e=N(ops[1],N(ops[0],L(x,"dec"),L(y,"mixed")),L(z,"dec"));
        const r=evalE(e);const st=[];stepsE(e,"auto",st);
        items.push(numAns(r,{q:renderE(e),exp:P(tr({ru:"Десятичные дроби удобно перевести в обыкновенные (или наоборот) и считать по порядку слева направо.",et:"Kümnendmurrud on mugav teisendada harilikeks murdudeks (või vastupidi) ja arvutada järjest vasakult paremale.",en:"Convert decimals to fractions (or the other way round) and work left to right."}))+stepList(st)}));
        continue;
      }
      if(a.sgn()>0&&b.sgn()>0)a=a.neg();
      const op=R.pick(["+","-"]);
      const r=op==="+"?a.add(b):a.sub(b);
      const e=N(op,L(a,mode==="auto"?undefined:mode),L(b,mode==="auto"?undefined:mode));
      items.push(numAns(r,{q:renderE(e),exp:expAddSub(a,op,b,mode==="dec"?"dec":(mode==="int"?"auto":mode))}));
    }
    return {items};
  }};

/* --- 2. Умножение и деление --- */
TPL.muldiv={topic:"rat",pts:1,cnt:{n:5,a:5},
  title:{ru:"Выполни действие",et:"Arvuta",en:"Calculate"},
  gen(R,lvl,cnt){
    const items=[];
    for(let i=0;i<cnt;i++){
      const kind=lvl==="n"?["mul","div","mul","div","mul3","div"][i%6]:["muldec","divfrac","mul3","divdec","mixed","mul3"][i%6];
      let e,mode="auto";
      if(kind==="mul"){e=N("*",L(rInt(R,3,15)),L(rDec(R,1,9),"dec"))}
      else if(kind==="div"){const d=rInt(R,2,9),qt=rDec(R,1,12);e=N(":",L(qt.mul(d),"dec"),L(d))}
      else if(kind==="mul3"){e=N("*",N("*",L(rInt(R,2,6)),L(lvl==="n"?rInt(R,2,5):rDec(R,1,3),"dec")),L(lvl==="n"?rInt(R,2,9):rFrac(R,[3,4,5],0)))}
      else if(kind==="muldec"){e=N("*",L(rDec(R,2,9),"dec"),L(rDec(R,1,9),"dec"))}
      else if(kind==="divfrac"){e=N(":",L(rFrac(R,DENS_A,3),"mixed"),L(rFrac(R,DENS_A,0),"frac"));mode="frac"}
      else if(kind==="divdec"){const d=rDec(R,1,5),qt=rDec(R,2,9);e=N(":",L(qt.mul(d),"dec"),L(d,"dec"))}
      else {e=N("*",L(rFrac(R,[2,3,4,5,6],2),"mixed"),L(rDec(R,1,4),"dec"))}
      const r=evalE(e);
      // правило знаков
      const lits=[];(function walk(x){if(x.v)lits.push(x.v.q);else{walk(x.a);walk(x.b)}})(e);
      const neg=lits.filter(x=>x.sgn()<0).length;
      const ex=P(tr({ru:`Отрицательных множителей (делителей): ${neg}. ${neg%2===0?"Чётное количество — результат положительный.":"Нечётное количество — результат отрицательный."}`,
                     et:`Negatiivseid arve on ${neg}. ${neg%2===0?"Paarisarv — tulemus on positiivne.":"Paaritu arv — tulemus on negatiivne."}`,
                     en:`Negative factors: ${neg}. ${neg%2===0?"An even number, so the result is positive.":"An odd number, so the result is negative."}`}))
        +P(tr({ru:"Модуль результата:",et:"Tulemuse absoluutväärtus:",en:"Absolute value of the result:"})+` ${numHtml(r.abs())}.`)
        +P(`${tr(T_ANS)}: ${ansHtml(r)}.`);
      items.push(numAns(r,{q:renderE(e),exp:ex}));
    }
    return {items};
  }};

/* --- 3. Порядок действий --- */
TPL.order={topic:"rat",pts:3,cnt:{n:3,a:3},
  title:{ru:"Найди значение выражения",et:"Leia avaldise väärtus",en:"Evaluate the expression"},
  gen(R,lvl,cnt){
    const items=[];
    const shapes=lvl==="n"?["B","A","C","D","E"]:["Bf","C","E","D","Ff"];
    const sh=R.shuffle(shapes);
    for(let i=0;i<cnt;i++){
      const s=sh[i%sh.length];let e;
      const d1=()=>rDec(R,1,9);
      if(s==="A"){e=N("+",L(d1(),"dec"),N("*",L(rInt(R,2,9)),L(d1(),"dec")))}
      else if(s==="B"){const c=rInt(R,2,6),t=rDec(R,1,5),b=d1();e=N(":",N("-",L(t.mul(c).add(b),"dec"),L(b,"dec")),L(c))}
      else if(s==="Bf"){const c=rDec(R,1,3),t=rDec(R,2,4),b=d1();e=N(":",N("-",L(t.mul(c).add(b),"dec"),L(b,"dec")),L(c,"dec"))}
      else if(s==="C"){const d=rInt(R,2,8),t=rDec(R,1,6);e=N("-",N("*",L(d1(),"dec"),L(rInt(R,2,6))),N(":",L(t.mul(d),"dec"),L(d)))}
      else if(s==="D"){e=N("*",N("+",L(d1(),"dec"),L(rInt(R,2,9))),N("-",L(rDec(R,1,4),"dec"),L(rDec(R,1,4),"dec")))}
      else if(s==="E"){e=N("-",L(rDec(R,1,12),"dec"),N("*",L(rInt(R,2,5)),N("+",L(d1(),"dec"),L(d1(),"dec"))))}
      else {e=N("*",N("+",L(rFrac(R,[2,3,4,6],1),"mixed"),L(rFrac(R,[3,4,6],0),"frac")),L(rInt(R,2,12)));}
      const st=[];const r=stepsE(e,"auto",st);
      items.push(numAns(r,{q:renderE(e),exp:P(tr({ru:"Сначала действия в скобках, затем умножение и деление, потом сложение и вычитание.",et:"Kõigepealt sulgudes olevad tehted, siis korrutamine ja jagamine, lõpuks liitmine ja lahutamine.",en:"Brackets first, then multiplication and division, then addition and subtraction."}))+stepList(st)}));
    }
    return {items};
  }};

/* --- 4. Простые уравнения с рациональными числами --- */
TPL.simpleEq={topic:"rat",pts:2,cnt:{n:3,a:3},
  title:{ru:"Реши уравнение",et:"Lahenda võrrand",en:"Solve the equation"},
  gen(R,lvl,cnt){
    const items=[];const forms=R.shuffle(["add","sub","mul","div"]);
    for(let i=0;i<cnt;i++){
      const f=forms[i%4];let x=lvl==="n"?rDec(R,1,15):rDec(R,2,12),qq,ex,m="dec";
      if(f==="add"){const a=rDec(R,2,10),b=x.add(a);qq=`x + ${qh(a,true)} = ${qh(b)}`;
        ex=P(tr({ru:"Неизвестное слагаемое = сумма − известное слагаемое.",et:"Tundmatu liidetav = summa − teadaolev liidetav.",en:"Unknown addend = sum − known addend."}))+P(`x = ${qh(b)} ${MINUS} ${qh(a,true)} = ${qh(x)}`)}
      else if(f==="sub"){const a=rDec(R,1,15),b=a.sub(x);qq=`${qh(a)} ${MINUS} x = ${qh(b)}`;
        ex=P(tr({ru:"Неизвестное вычитаемое = уменьшаемое − разность.",et:"Tundmatu lahutatav = vähendatav − vahe.",en:"Unknown subtrahend = minuend − difference."}))+P(`x = ${qh(a)} ${MINUS} ${qh(b,true)} = ${qh(x)}`)}
      else if(f==="mul"){const k=lvl==="n"?new Q(rInt(R,2,9)):rDec(R,1,4);const b=k.mul(x);qq=`${qh(k)}x = ${qh(b)}`;
        ex=P(tr({ru:"Неизвестный множитель = произведение : известный множитель.",et:"Tundmatu tegur = korrutis : teadaolev tegur.",en:"Unknown factor = product ÷ known factor."}))+P(`x = ${qh(b)} ${opSym(":")} ${qh(k,true)} = ${qh(x)}`)}
      else {const k=new Q(rInt(R,2,8));x=lvl==="n"?rDec(R,1,9).mul(k):rDec(R,2,9).mul(k);const b=x.div(k);qq=`x ${opSym(":")} ${qh(k,true)} = ${qh(b)}`;
        ex=P(tr({ru:"Неизвестное делимое = частное · делитель.",et:"Tundmatu jagatav = jagatis · jagaja.",en:"Unknown dividend = quotient × divisor."}))+P(`x = ${qh(b)} · ${qh(k,true)} = ${qh(x)}`)}
      items.push(numAns(x,{q:qq,pre:"x =",exp:ex}));
    }
    return {items};
  }};

/* --- 5. Текстовая задача со знаками --- */
TPL.signedWord={topic:"rat",pts:3,cnt:{n:1,a:2},
  title:{ru:"Реши задачу",et:"Lahenda ülesanne",en:"Solve the problem"},
  gen(R,lvl,cnt){
    const items=[];const sc=R.shuffle(["temp","sub","acct"]);
    for(let i=0;i<cnt;i++){
      const s=sc[i%3];
      if(s==="temp"){
        const t0=rDec(R,1,9).abs().neg(),u=new Q(R.int(31,95),10),d=new Q(R.int(21,99),10);const r=t0.add(u).sub(d);
        items.push(numAns(r,{unit:"°C",q:tr({ru:`Утром температура была ${qh(t0)} °C. К полудню она поднялась на ${qh(u)} °C, а к ночи опустилась на ${qh(d)} °C. Какой стала температура ночью?`,
          et:`Hommikul oli temperatuur ${qh(t0)} °C. Keskpäevaks tõusis see ${qh(u)} °C ja ööks langes ${qh(d)} °C. Milline oli temperatuur öösel?`,
          en:`In the morning the temperature was ${qh(t0)} °C. By noon it rose by ${qh(u)} °C, and by night it fell by ${qh(d)} °C. What was the temperature at night?`}),
          exp:P(`${qh(t0)} + ${qh(u)} ${MINUS} ${qh(d)} = ${qh(r)} °C`)}));
      }else if(s==="sub"){
        const h0=new Q(-R.int(800,2400),10),up=new Q(R.int(150,700),10),dn=new Q(R.int(205,995),100);const r=h0.add(up).sub(dn);
        items.push(numAns(r,{unit:tr({ru:"м",et:"m",en:"m"}),q:tr({ru:`Батискаф находился на высоте ${qh(h0)} м (ниже уровня моря). Он поднялся на ${qh(up)} м, затем опустился на ${qh(dn)} м. На какой высоте он оказался? (Ответ со знаком.)`,
          et:`Batüskaaf oli kõrgusel ${qh(h0)} m (allpool merepinda). See tõusis ${qh(up)} m ja laskus siis ${qh(dn)} m. Millisel kõrgusel ta lõpuks oli? (Vastus märgiga.)`,
          en:`A submersible was at an altitude of ${qh(h0)} m (below sea level). It rose ${qh(up)} m, then sank ${qh(dn)} m. At what altitude did it end up? (Give the sign.)`}),
          exp:P(`${qh(h0)} + ${qh(up)} ${MINUS} ${qh(dn)} = ${qh(r)} m`)}));
      }else{
        const b0=new Q(-R.int(1500,9000),100),inc=new Q(R.int(50,250)*100,100),p1=new Q(R.int(1205,4999),100),p2=new Q(R.int(505,2999),100);const r=b0.add(inc).sub(p1).sub(p2);
        items.push(numAns(r,{unit:"€",q:tr({ru:`На счёте было ${qh(b0)} €. Пришла зарплата ${qh(inc)} €, затем оплатили покупки на ${qh(p1)} € и ${qh(p2)} €. Сколько денег стало на счёте?`,
          et:`Kontol oli ${qh(b0)} €. Laekus palk ${qh(inc)} €, seejärel maksti ostude eest ${qh(p1)} € ja ${qh(p2)} €. Kui palju raha jäi kontole?`,
          en:`An account had ${qh(b0)} €. A salary of ${qh(inc)} € came in, then purchases of ${qh(p1)} € and ${qh(p2)} € were paid. What is the balance now?`}),
          exp:P(`${qh(b0)} + ${qh(inc)} ${MINUS} ${qh(p1)} ${MINUS} ${qh(p2)} = ${qh(r)} €`)}));
      }
    }
    return {items};
  }};

/* --- 6. Расстояние на числовой оси --- */
TPL.dist={topic:"dist",pts:2,cnt:{n:2,a:3},
  title:{ru:"Точки на числовой оси",et:"Punktid arvteljel",en:"Points on the number line"},
  gen(R,lvl,cnt){
    const items=[];
    const a=rDec(R,1,15).abs().neg(),b=rDec(R,1,12);
    const intro=tr({ru:`Даны точки A(${qh(a)}) и B(${qh(b)}).`,et:`On antud punktid A(${qh(a)}) ja B(${qh(b)}).`,en:`Points A(${qh(a)}) and B(${qh(b)}) are given.`});
    const d=b.sub(a).abs(),mid=a.add(b).div(2);
    items.push(numAns(d,{q:tr({ru:"Расстояние AB",et:"Lõigu AB pikkus",en:"Distance AB"}),pre:"AB =",exp:P(`AB = |${qh(b)} ${MINUS} ${qh(a,true)}| = ${qh(d)}`)}));
    if(cnt>1)items.push(numAns(mid,{q:tr({ru:"Координата середины M отрезка AB",et:"Lõigu AB keskpunkti M koordinaat",en:"Coordinate of the midpoint M of AB"}),pre:"M =",
      exp:P(tr({ru:"Середина — среднее арифметическое координат:",et:"Keskpunkt on koordinaatide aritmeetiline keskmine:",en:"The midpoint is the mean of the coordinates:"}))+P(`(${qh(a)} + ${qh(b)}) : 2 = ${qh(mid)}`)}));
    if(cnt>2){const k=rDec(R,1,6).abs();const c1=a.add(k),c2=a.sub(k);
      items.push({ans:{type:"set",vals:[c1.v(),c2.v()]},show:`${qh(c2)}; ${qh(c1)}`,plain:`${plainOf(c2)}; ${plainOf(c1)}`,
        q:tr({ru:`Точка C удалена от A на ${qh(k)}. Найди все возможные координаты C (через «;»).`,et:`Punkt C asub punktist A kaugusel ${qh(k)}. Leia kõik võimalikud C koordinaadid (eralda «;»).`,en:`Point C is ${qh(k)} away from A. Find all possible coordinates of C (separate with «;»).`}),
        pre:"C =",exp:P(`${qh(a)} ${MINUS} ${qh(k)} = ${qh(c2)}; ${qh(a)} + ${qh(k)} = ${qh(c1)}`)+P(tr({ru:"Точек две: слева и справа от A.",et:"Punkte on kaks: A-st vasakul ja paremal.",en:"There are two points: left and right of A."}))});}
    return {intro,items};
  }};

/* --- 7. Модуль --- */
TPL.abs={topic:"dist",pts:2,cnt:{n:2,a:3},
  title:{ru:"Модуль числа",et:"Arvu absoluutväärtus",en:"Absolute value"},
  gen(R,lvl,cnt){
    const items=[];const kinds=lvl==="n"?["eq","count","eq2"]:["shift","count2","sum"];
    for(let i=0;i<cnt;i++){
      const k=kinds[i%3];
      if(k==="eq"){const a=rDec(R,1,9).abs();items.push({ans:{type:"set",vals:[a.v(),-a.v()]},show:`${qh(a)}; ${qh(a.neg())}`,plain:`${plainOf(a)}; ${plainOf(a.neg())}`,
        q:`|x| = ${qh(a)}`,pre:"x =",exp:P(tr({ru:`Модуль равен ${qh(a)} у двух чисел: ${qh(a)} и ${qh(a.neg())}.`,et:`Absoluutväärtus ${qh(a)} on kahel arvul: ${qh(a)} ja ${qh(a.neg())}.`,en:`Two numbers have absolute value ${qh(a)}: ${qh(a)} and ${qh(a.neg())}.`}))})}
      else if(k==="eq2"){const a=rDec(R,1,6).abs(),c=rDec(R,1,4).abs();const m=a.add(c);items.push({ans:{type:"set",vals:[a.v(),-a.v()]},show:`${qh(a)}; ${qh(a.neg())}`,plain:`${plainOf(a)}; ${plainOf(a.neg())}`,
        q:`|x| + ${qh(c)} = ${qh(m)}`,pre:"x =",exp:P(`|x| = ${qh(m)} ${MINUS} ${qh(c)} = ${qh(a)}`)+P(`x = ${qh(a)}; x = ${qh(a.neg())}`)})}
      else if(k==="count"||k==="count2"){const a=new Q(R.int(21,79),10);const strict=k==="count"?true:R.chance(.5);
        const n=Math.floor(a.v());const cntv=2*n+1;
        items.push(numAns(new Q(cntv),{q:tr({ru:`Сколько целых чисел x удовлетворяют условию |x| ${strict?"<":"≤"} ${qh(a)}?`,et:`Mitu täisarvu x rahuldavad tingimust |x| ${strict?"<":"≤"} ${qh(a)}?`,en:`How many integers x satisfy |x| ${strict?"<":"≤"} ${qh(a)}?`}),
          exp:P(tr({ru:`Подходят целые от ${MINUS}${n} до ${n}, включая 0: 2 · ${n} + 1 = ${cntv}.`,et:`Sobivad täisarvud ${MINUS}${n} kuni ${n}, ka 0: 2 · ${n} + 1 = ${cntv}.`,en:`Integers from ${MINUS}${n} to ${n}, including 0: 2 · ${n} + 1 = ${cntv}.`}))}))}
      else if(k==="shift"){const c=rDec(R,1,8),d=rDec(R,1,5).abs();const x1=c.add(d),x2=c.sub(d);items.push({ans:{type:"set",vals:[x1.v(),x2.v()]},show:`${qh(x2)}; ${qh(x1)}`,plain:`${plainOf(x2)}; ${plainOf(x1)}`,
        q:`|x ${c.sgn()<0?"+":MINUS} ${qh(c.abs())}| = ${qh(d)}`,pre:"x =",exp:P(tr({ru:`Число x удалено от ${qh(c)} на ${qh(d)}:`,et:`Arv x asub arvust ${qh(c)} kaugusel ${qh(d)}:`,en:`x is ${qh(d)} away from ${qh(c)}:`}))+P(`x = ${qh(c)} ± ${qh(d)} → ${qh(x2)}; ${qh(x1)}`)})}
      else {const a=rInt(R,2,9),b=rDec(R,1,9);const v=new Q(Math.abs(a)).sub(b.abs()).add(new Q(Math.abs(a)).mul(b).abs());
        items.push(numAns(v,{q:`|${qh(new Q(a))}| ${MINUS} |${qh(b)}| + |${qh(new Q(a))} · ${qh(b,true)}|`,exp:P(`${Math.abs(a)} ${MINUS} ${qh(b.abs())} + ${qh(new Q(a).mul(b).abs())} = ${qh(v)}`)}))}
    }
    return {items};
  }};

/* --- 8. Степени --- */
TPL.pow={topic:"pow",pts:1,cnt:{n:6,a:6},
  title:{ru:"Вычисли степени",et:"Arvuta astmed",en:"Evaluate the powers"},
  gen(R,lvl,cnt){
    const items=[];
    const poolN=[()=>[new Q(R.pick([-2,-3,2,3])),R.int(3,5)],()=>[new Q(R.pick([-4,-5,4,5,-6])),R.int(2,3)],()=>[new Q(R.pick([-1])),R.int(5,12)],()=>[new Q(R.pick([-3,3,-2,2,-5,5]),10),R.int(2,3)],()=>[new Q(R.pick([-1,1,-2,2]),R.pick([3,5])),R.int(2,3)],()=>[new Q(R.pick([-10,10])),R.int(3,6)]];
    const poolA=[()=>[new Q(R.pick([-12,-15,11,13]),10),2],()=>[new Q(R.pick([-2,-3,2]),R.pick([3,5,7])),R.int(3,4)],()=>[new Q(R.pick([-1,1]),2),R.int(4,6)],()=>[new Q(R.pick([-2,-3])),R.int(4,6)],"trick","combo"];
    const sh=R.shuffle(lvl==="n"?poolN:poolA);
    for(let i=0;i<cnt;i++){
      const g=sh[i%sh.length];
      if(g==="trick"){const b=R.int(2,4),e=R.pick([2,4]);const v=new Q(b).pow(e).neg();
        items.push(numAns(v,{q:`${MINUS}${b}<sup>${e}</sup>`,exp:P(tr({ru:`Степень относится только к ${b}, минус стоит перед ней: ${MINUS}(${b}<sup>${e}</sup>) = ${qh(v)}. Сравни: (${MINUS}${b})<sup>${e}</sup> = ${qh(v.neg())}.`,et:`Aste kehtib ainult arvule ${b}, miinus on selle ees: ${MINUS}(${b}<sup>${e}</sup>) = ${qh(v)}. Võrdle: (${MINUS}${b})<sup>${e}</sup> = ${qh(v.neg())}.`,en:`The power applies only to ${b}; the minus is in front: ${MINUS}(${b}<sup>${e}</sup>) = ${qh(v)}. Compare: (${MINUS}${b})<sup>${e}</sup> = ${qh(v.neg())}.`}))}));continue}
      if(g==="combo"){const a=R.int(2,3),e1=R.int(3,4),e2=R.int(3,7);const v=new Q(a).pow(e1).mul(new Q(-1).pow(e2)).sub(new Q(a+1).pow(2));
        items.push(numAns(v,{q:`${a}<sup>${e1}</sup> · (${MINUS}1)<sup>${e2}</sup> ${MINUS} ${a+1}<sup>2</sup>`,exp:P(`${new Q(a).pow(e1).n} · (${qh(new Q(-1).pow(e2))}) ${MINUS} ${(a+1)*(a+1)} = ${qh(v)}`)}));continue}
      const [b,e]=g();const v=b.pow(e);
      const bh=b.isInt()&&b.sgn()>0?qh(b):`(${numHtml(b,decPlaces(b)>=0&&!b.isInt()&&b.d===10?"dec":"auto")})`;
      items.push(numAns(v,{q:`${bh}<sup>${e}</sup>`,exp:P(b.sgn()<0?tr({ru:`Основание отрицательное, показатель ${e} — ${e%2===0?"чётный, результат положительный":"нечётный, результат отрицательный"}.`,et:`Alus on negatiivne, astendaja ${e} on ${e%2===0?"paaris, tulemus on positiivne":"paaritu, tulemus on negatiivne"}.`,en:`The base is negative and the exponent ${e} is ${e%2===0?"even, so the result is positive":"odd, so the result is negative"}.`}):"")+P(`${bh}<sup>${e}</sup> = ${ansHtml(v)}`)}));
    }
    return {items};
  }};

/* --- 9. Свойства степеней --- */
TPL.powRules={topic:"pow",pts:2,cnt:{n:3,a:3},
  title:{ru:"Найди показатель n",et:"Leia astendaja n",en:"Find the exponent n"},
  gen(R,lvl,cnt){
    const items=[];const kinds=R.shuffle(lvl==="n"?["mul","div","pow","mul"]:["base4","base9","mix","pow"]);
    for(let i=0;i<cnt;i++){
      const k=kinds[i%kinds.length];const a=R.pick([2,3,5,7,"a"]);
      const A=a==="a"?"<i>a</i>":String(a);
      let qq,n,ex;
      if(k==="mul"){const p=R.int(2,9),s=p+R.int(2,9);n=s-p;qq=`${A}<sup>${p}</sup> · ${A}<sup>n</sup> = ${A}<sup>${s}</sup>`;ex=tr({ru:`При умножении показатели складываются: ${p} + n = ${s}, n = ${n}.`,et:`Korrutamisel astendajad liidetakse: ${p} + n = ${s}, n = ${n}.`,en:`When multiplying, add exponents: ${p} + n = ${s}, n = ${n}.`})}
      else if(k==="div"){const s=R.int(2,8),p=s+R.int(2,9);n=p-s;qq=`${A}<sup>${p}</sup> : ${A}<sup>n</sup> = ${A}<sup>${s}</sup>`;ex=tr({ru:`При делении показатели вычитаются: ${p} ${MINUS} n = ${s}, n = ${n}.`,et:`Jagamisel astendajad lahutatakse: ${p} ${MINUS} n = ${s}, n = ${n}.`,en:`When dividing, subtract exponents: ${p} ${MINUS} n = ${s}, n = ${n}.`})}
      else if(k==="pow"){const p=R.int(2,5);n=R.int(2,6);const s=p*n;qq=`(${A}<sup>${p}</sup>)<sup>n</sup> = ${A}<sup>${s}</sup>`;ex=tr({ru:`При возведении степени в степень показатели перемножаются: ${p} · n = ${s}, n = ${n}.`,et:`Astme astendamisel astendajad korrutatakse: ${p} · n = ${s}, n = ${n}.`,en:`Power of a power: multiply exponents: ${p} · n = ${s}, n = ${n}.`})}
      else if(k==="base4"){const x=R.int(2,5),y=R.int(2,4);n=2*x+3*y;qq=`4<sup>${x}</sup> · 8<sup>${y}</sup> = 2<sup>n</sup>`;ex=`4<sup>${x}</sup> · 8<sup>${y}</sup> = 2<sup>${2*x}</sup> · 2<sup>${3*y}</sup> = 2<sup>${n}</sup>`}
      else if(k==="base9"){const x=R.int(2,6),y=R.int(1,4);n=2*x-3*y;qq=`9<sup>${x}</sup> : 27<sup>${y}</sup> = 3<sup>n</sup>`;ex=`9<sup>${x}</sup> : 27<sup>${y}</sup> = 3<sup>${2*x}</sup> : 3<sup>${3*y}</sup> = 3<sup>${n}</sup>`}
      else {const x=R.int(2,5),y=R.int(2,5),z=R.int(1,4);n=x+3*y-2*z;qq=`2<sup>${x}</sup> · 8<sup>${y}</sup> : 4<sup>${z}</sup> = 2<sup>n</sup>`;ex=`2<sup>${x}</sup> · 2<sup>${3*y}</sup> : 2<sup>${2*z}</sup> = 2<sup>${x}+${3*y}${MINUS}${2*z}</sup> = 2<sup>${n}</sup>`}
      items.push(numAns(new Q(n),{q:qq,pre:"n =",exp:P(ex)}));
    }
    return {items};
  }};

/* --- 10. Нулевая и отрицательная степень --- */
TPL.negExp={topic:"std",pts:1,cnt:{n:4,a:5},
  title:{ru:"Вычисли",et:"Arvuta",en:"Calculate"},
  gen(R,lvl,cnt){
    const items=[];
    const g=R.shuffle([
      ()=>[new Q(R.pick([2,3,4,5])),-R.int(1,3)],
      ()=>[new Q(R.pick([2,3,4]),R.pick([3,5,7])),-R.int(1,2)],
      ()=>[new Q(R.pick([-7,13,-2,25]),R.pick([1,10])),0],
      ()=>[new Q(10),-R.int(2,4)],
      ()=>[new Q(R.pick([5,2]),10),-R.int(1,3)],
      ()=>[new Q(R.pick([-2,-3])),-R.int(2,3)],
    ]);
    for(let i=0;i<cnt;i++){
      const [b,e]=g[i%g.length]();const v=b.pow(e);
      const bh=b.isInt()&&b.sgn()>0?qh(b):`(${numHtml(b,b.d===10?"dec":"frac")})`;
      let ex;
      if(e===0)ex=tr({ru:"Любое число (кроме 0) в нулевой степени равно 1.",et:"Iga nullist erinev arv astmes 0 võrdub 1-ga.",en:"Any nonzero number to the power 0 equals 1."});
      else ex=tr({ru:`a<sup>${MINUS}n</sup> = 1 : a<sup>n</sup>. Поэтому ${bh}<sup>${e}</sup> = 1 : ${bh}<sup>${-e}</sup> = ${ansHtml(v)}.`,et:`a<sup>${MINUS}n</sup> = 1 : a<sup>n</sup>. Seega ${bh}<sup>${e}</sup> = 1 : ${bh}<sup>${-e}</sup> = ${ansHtml(v)}.`,en:`a<sup>${MINUS}n</sup> = 1 ÷ a<sup>n</sup>. So ${bh}<sup>${e}</sup> = 1 ÷ ${bh}<sup>${-e}</sup> = ${ansHtml(v)}.`});
      items.push(numAns(v,{q:`${bh}<sup>${e<0?MINUS+(-e):e}</sup>`,exp:P(ex)}));
    }
    return {items};
  }};

/* --- 11. Стандартный вид --- */
function stdOf(v){ // v>0 Q -> [mantissa Q, exp]
  let e=0;let m=v;while(m.v()>=10){m=m.div(10);e++}while(m.v()<1){m=m.mul(10);e--}return [m,e];
}
TPL.std={topic:"std",pts:2,cnt:{n:3,a:3},
  title:{ru:"Запиши число в стандартном виде a · 10ⁿ",et:"Kirjuta arv standardkujul a · 10ⁿ",en:"Write in scientific notation a · 10ⁿ"},
  gen(R,lvl,cnt){
    const items=[];
    for(let i=0;i<cnt;i++){
      let v,qq,ex="";
      const mant=()=>new Q(R.int(101,999)*(R.chance(.4)?1:1),100);
      if(lvl==="n"||i<cnt-1){
        let m=mant();if(R.chance(.3))m=new Q(R.int(11,99),10);
        const e=R.pick([-6,-5,-4,-3,-2,4,5,6,7,8]);v=m.mul(new Q(10).pow(e));
        qq=numHtml(v,"dec");ex=tr({ru:`Ставим запятую после первой ненулевой цифры и считаем, на сколько разрядов она сдвинулась.`,et:`Paneme koma esimese nullist erineva numbri järele ja loeme, mitu kohta see nihkus.`,en:`Put the decimal point after the first nonzero digit and count how many places it moved.`});
      }else{
        const a1=new Q(R.int(2,9)),e1=R.int(3,8),a2=new Q(R.int(2,9)),e2=-R.int(2,9);
        v=a1.mul(new Q(10).pow(e1)).mul(a2.mul(new Q(10).pow(e2)));
        qq=`(${a1.n} · 10<sup>${e1}</sup>) · (${a2.n} · 10<sup>${MINUS}${-e2}</sup>)`;
        ex=`${a1.n} · ${a2.n} = ${a1.n*a2.n}; 10<sup>${e1}</sup> · 10<sup>${e2<0?MINUS+(-e2):e2}</sup> = 10<sup>${e1+e2<0?MINUS+(-(e1+e2)):e1+e2}</sup>.`;
      }
      const [m,e]=stdOf(v);
      items.push({q:qq,ans:{type:"std",m:m.v(),e},show:`${numHtml(m,"dec")} · 10<sup>${e<0?MINUS+(-e):e}</sup>`,plain:[plainOf(m),String(e)],
        exp:P(ex)+P(`${tr(T_ANS)}: ${numHtml(m,"dec")} · 10<sup>${e<0?MINUS+(-e):e}</sup> (1 ≤ a < 10).`)});
    }
    return {items};
  }};

/* --- 12. Проценты: базовые --- */
TPL.pctBasic={topic:"pct",pts:2,cnt:{n:3,a:3},
  title:{ru:"Проценты",et:"Protsendid",en:"Percentages"},
  gen(R,lvl,cnt){
    const items=[];const kinds=R.shuffle(["part","whole","ratio","mille"]);
    for(let i=0;i<cnt;i++){
      const k=kinds[i%4];
      if(k==="part"){const p=lvl==="n"?R.pick([12,15,17,24,35,45,64,85]):new Q(R.int(25,195),10);const Nn=new Q(R.int(120,980));const r=q(p).mul(Nn).div(100);
        items.push(numAns(r,{q:tr({ru:`Найди ${qh(q(p))}% от ${qh(Nn)}.`,et:`Leia ${qh(q(p))}% arvust ${qh(Nn)}.`,en:`Find ${qh(q(p))}% of ${qh(Nn)}.`}),exp:P(`${qh(Nn)} · ${qh(q(p).div(100))} = ${qh(r)}`)+P(tr({ru:"Процент переводим в десятичную дробь и умножаем.",et:"Protsendi teisendame kümnendmurruks ja korrutame.",en:"Convert the percent to a decimal and multiply."}))}))}
      else if(k==="whole"){const p=R.pick([8,12,15,24,35,40,65]);const W=new Q(R.int(150,960),lvl==="n"?1:10);const part=W.mul(p).div(100);
        items.push(numAns(W,{q:tr({ru:`${p}% числа равны ${qh(part)}. Найди это число.`,et:`${p}% arvust on ${qh(part)}. Leia see arv.`,en:`${p}% of a number is ${qh(part)}. Find the number.`}),exp:P(`${qh(part)} : ${qh(new Q(p,100))} = ${qh(W)}`)}))}
      else if(k==="ratio"){const b=new Q(R.pick([40,80,120,160,250,320,400,500]));const p=new Q(R.int(3,97)*(lvl==="n"?1:1),1).add(R.chance(.5)?new Q(1,2):new Q(0));const a=b.mul(p).div(100);
        items.push(numAns(p,{unit:"%",q:tr({ru:`Сколько процентов составляет ${qh(a)} от ${qh(b)}?`,et:`Mitu protsenti moodustab ${qh(a)} arvust ${qh(b)}?`,en:`What percent of ${qh(b)} is ${qh(a)}?`}),exp:P(`${qh(a)} : ${qh(b)} · 100% = ${qh(p)}%`)}))}
      else {const m=R.int(3,48),Nn=new Q(R.int(1200,9800));const r=Nn.mul(m).div(1000);
        items.push(numAns(r,{q:tr({ru:`Найди ${m}‰ (промилле) от ${qh(Nn)}.`,et:`Leia ${m}‰ (promilli) arvust ${qh(Nn)}.`,en:`Find ${m}‰ (per mille) of ${qh(Nn)}.`}),exp:P(tr({ru:"1‰ — это одна тысячная.",et:"1‰ on üks tuhandik.",en:"1‰ is one thousandth."}))+P(`${qh(Nn)} · ${m} : 1000 = ${qh(r)}`)}))}
    }
    return {items};
  }};

/* --- 13. Изменение величины, процентный пункт --- */
TPL.pctChange={topic:"pct",pts:3,cnt:{n:2,a:3},
  title:{ru:"Изменение в процентах",et:"Muutumine protsentides",en:"Percentage change"},
  gen(R,lvl,cnt){
    const items=[];const kinds=R.shuffle(["twostep","pp","find"]);
    for(let i=0;i<cnt;i++){
      const k=kinds[i%3];
      if(k==="twostep"){const P0=new Q(R.int(1990,9990),100),a=R.pick([10,15,20,25,30]),b=R.pick([10,15,20,25]);const r=P0.mul(100+a).div(100).mul(100-b).div(100);
        const rr=new Q(Math.round(r.v()*100),100);
        items.push(numAns(rr,{unit:"€",tol:0.011,q:tr({ru:`Товар стоил ${qh(P0)} €. Цену подняли на ${a}%, а затем снизили на ${b}%. Сколько стоит товар теперь? (Округли до центов.)`,et:`Kaup maksis ${qh(P0)} €. Hinda tõsteti ${a}% ja seejärel langetati ${b}%. Kui palju kaup nüüd maksab? (Ümarda sendini.)`,en:`An item cost ${qh(P0)} €. The price was raised by ${a}%, then lowered by ${b}%. What does it cost now? (Round to cents.)`}),
          exp:P(`${qh(P0)} · ${qh(new Q(100+a,100))} · ${qh(new Q(100-b,100))} ≈ ${qh(rr)} €`),
          alt:P(tr({ru:`Другой способ: общий коэффициент ${qh(new Q(100+a,100))} · ${qh(new Q(100-b,100))} = ${qh(new Q((100+a)*(100-b),10000))}, т.е. итоговое изменение ${qh(new Q((100+a)*(100-b),100).sub(100))}%.`,et:`Teine võimalus: koondkordaja ${qh(new Q(100+a,100))} · ${qh(new Q(100-b,100))} = ${qh(new Q((100+a)*(100-b),10000))}, st kogumuutus ${qh(new Q((100+a)*(100-b),100).sub(100))}%.`,en:`Another way: total multiplier ${qh(new Q(100+a,100))} · ${qh(new Q(100-b,100))} = ${qh(new Q((100+a)*(100-b),10000))}, i.e. a total change of ${qh(new Q((100+a)*(100-b),100).sub(100))}%.`}))}))}
      else if(k==="pp"){const r1=new Q(R.int(15,60),10),r2=r1.add(new Q(R.int(3,25),10));const pp=r2.sub(r1),pc=pp.div(r1).mul(100);const pcr=new Q(Math.round(pc.v()*10),10);
        const intro=tr({ru:`Ставка по кредиту выросла с ${qh(r1)}% до ${qh(r2)}%.`,et:`Laenu intress tõusis ${qh(r1)}%-lt ${qh(r2)}%-le.`,en:`A loan rate went up from ${qh(r1)}% to ${qh(r2)}%.`});
        items.push(numAns(pp,{q:intro+" "+tr({ru:"На сколько процентных пунктов?",et:"Mitu protsendipunkti?",en:"By how many percentage points?"}),unit:tr({ru:"п.п.",et:"pp",en:"pp"}),exp:P(`${qh(r2)} ${MINUS} ${qh(r1)} = ${qh(pp)}`)+P(tr({ru:"Процентный пункт — простая разность процентов.",et:"Protsendipunkt on protsentide lihtne vahe.",en:"A percentage point is the plain difference of percentages."}))}));
        if(lvl!=="n")items.push(numAns(pcr,{tol:0.051,unit:"%",q:intro+" "+tr({ru:"На сколько процентов выросла ставка? (Округли до десятых.)",et:"Mitu protsenti intress tõusis? (Ümarda kümnendikeni.)",en:"By what percent did the rate rise? (Round to tenths.)"}),exp:P(`${qh(pp)} : ${qh(r1)} · 100% ≈ ${qh(pcr)}%`)}))}
      else {const P1=new Q(R.int(2000,9000),100),d=R.pick([15,20,25,30,35,40]);const P0=P1.mul(100).div(100-d);const r=new Q(Math.round(P0.v()*100),100);
        items.push(numAns(r,{unit:"€",tol:0.011,q:tr({ru:`После скидки ${d}% куртка стоит ${qh(P1)} €. Сколько она стоила до скидки? (Округли до центов.)`,et:`Pärast ${d}% allahindlust maksab jope ${qh(P1)} €. Kui palju maksis see enne allahindlust? (Ümarda sendini.)`,en:`After a ${d}% discount a jacket costs ${qh(P1)} €. What did it cost before? (Round to cents.)`}),
          exp:P(tr({ru:`Новая цена — это ${100-d}% старой:`,et:`Uus hind on ${100-d}% vanast:`,en:`The new price is ${100-d}% of the old one:`}))+P(`${qh(P1)} : ${qh(new Q(100-d,100))} ≈ ${qh(r)} €`)}))}
    }
    return {items:items.slice(0,Math.max(cnt,items.length))};
  }};

/* --- 14. Линейные уравнения --- */
TPL.linEq={topic:"eq",pts:3,cnt:{n:4,a:4},
  title:{ru:"Реши уравнение",et:"Lahenda võrrand",en:"Solve the equation"},
  gen(R,lvl,cnt){
    const items=[];const forms=R.shuffle(lvl==="n"?["F1","F2","F3","F2","F1"]:["F2","F3","F4","F5","F4"]);
    for(let i=0;i<cnt;i++){
      const f=forms[i%forms.length];let alt;
      const x=lvl==="n"?(R.chance(.5)?new Q(rInt(R,1,12)):rDec(R,R.pick([1,2]),8)):(R.chance(.5)?rFrac(R,[3,7,6,9],2):rDec(R,2,6));
      let qq,ex;
      const ci=()=>new Q(rInt(R,2,9));
      if(f==="F1"){const a=ci(),b=new Q(rInt(R,3,40));const c=a.mul(x).add(b);qq=`${qh(a)}x ${b.sgn()<0?MINUS:"+"} ${qh(b.abs())} = ${qh(c)}`;
        ex=P(`${qh(a)}x = ${qh(c)} ${b.sgn()<0?"+":MINUS} ${qh(b.abs())} = ${qh(c.sub(b))}`)+P(`x = ${qh(c.sub(b))} : ${qh(a,true)} = ${ansHtml(x)}`)}
      else if(f==="F2"){let a=ci(),c=ci();while(a.eq(c))c=ci();const b=new Q(rInt(R,2,30));const d=a.sub(c).mul(x).add(b);
        qq=`${qh(a)}x ${b.sgn()<0?MINUS:"+"} ${qh(b.abs())} = ${qh(c)}x ${d.sgn()<0?MINUS:"+"} ${qh(d.abs())}`;
        ex=P(tr({ru:"Переносим x влево, числа вправо, меняя знак:",et:"Viime x-iga liikmed vasakule ja arvud paremale, muutes märki:",en:"Move x terms left and numbers right, changing signs:"}))+P(`${qh(a)}x ${MINUS} ${qh(c,true)}x = ${qh(d)} ${MINUS} ${qh(b,true)}`)+P(`${qh(a.sub(c))}x = ${qh(d.sub(b))}`)+P(`x = ${ansHtml(x)}`)}
      else if(f==="F3"){const a=ci(),p=new Q(rInt(R,1,9));const c=a.mul(x.sub(p));qq=`${qh(a)}(x ${p.sgn()<0?"+":MINUS} ${qh(p.abs())}) = ${qh(c)}`;
        ex=P(`x ${p.sgn()<0?"+":MINUS} ${qh(p.abs())} = ${qh(c)} : ${qh(a,true)} = ${qh(c.div(a))}`)+P(`x = ${ansHtml(x)}`);
        alt=P(tr({ru:"Другой способ: раскрыть скобки",et:"Teine võimalus: avada sulud",en:"Another way: expand the brackets"})+` ${qh(a)}x ${MINUS} ${qh(a.mul(p),true)} = ${qh(c)}.`)}
      else if(f==="F4"){const a=new Q(R.int(2,6)),b=new Q(R.int(2,6)),p=new Q(R.int(1,7)),s=new Q(R.int(1,7));let aa=a;if(a.eq(b))aa=a.add(1);
        const c=aa.mul(x.add(p)).sub(b.mul(x.sub(s)));qq=`${qh(aa)}(x + ${qh(p)}) ${MINUS} ${qh(b)}(x ${MINUS} ${qh(s)}) = ${qh(c)}`;
        ex=P(`${qh(aa)}x + ${qh(aa.mul(p))} ${MINUS} ${qh(b)}x + ${qh(b.mul(s))} = ${qh(c)}`)+P(`${qh(aa.sub(b))}x = ${qh(c.sub(aa.mul(p)).sub(b.mul(s)))}`)+P(`x = ${ansHtml(x)}`)}
      else {const a=R.pick([2,3,4]),b=R.pick([5,6,3]);const c=x.div(a).add(x.div(b));qq=`${fracHtml("x",a)} + ${fracHtml("x",b)} = ${numHtml(c,"frac")}`;
        ex=P(tr({ru:`Умножим обе части на ${lcm(a,b)}:`,et:`Korrutame mõlemad pooled arvuga ${lcm(a,b)}:`,en:`Multiply both sides by ${lcm(a,b)}:`}))+P(`${lcm(a,b)/a}x + ${lcm(a,b)/b}x = ${qh(c.mul(lcm(a,b)))}`)+P(`x = ${ansHtml(x)}`)}
      items.push(numAns(x,{q:qq,pre:"x =",exp:ex,alt}));
    }
    return {items};
  }};

/* --- 15. Пропорция --- */
TPL.prop={topic:"eq",pts:2,cnt:{n:2,a:2},
  title:{ru:"Реши пропорцию",et:"Lahenda võrre",en:"Solve the proportion"},
  gen(R,lvl,cnt){
    const items=[];
    for(let i=0;i<cnt;i++){
      const a=new Q(R.int(2,15)),b=new Q(R.int(2,15)),c=new Q(R.pick([3,4,6,7,8,9,12]));
      if(i===0||lvl==="n"){const x=a.mul(b).div(c);items.push(numAns(x,{q:`${fracHtml("x",a.n)} = ${fracHtml(b.n,c.n)}`,pre:"x =",exp:P(tr({ru:"Произведение крайних членов равно произведению средних:",et:"Välisliikmete korrutis võrdub sisemiste liikmete korrutisega:",en:"Cross-multiply:"}))+P(`x · ${c.n} = ${a.n} · ${b.n}, x = ${ansHtml(x)}`)}))}
      else {const p=new Q(R.int(1,6));const x=a.mul(b).div(c).sub(p);items.push(numAns(x,{q:`${fracHtml("x + "+p.n,a.n)} = ${fracHtml(b.n,c.n)}`,pre:"x =",exp:P(`x + ${p.n} = ${a.n} · ${b.n} : ${c.n} = ${qh(a.mul(b).div(c))}`)+P(`x = ${ansHtml(x)}`)}))}
    }
    return {items};
  }};

/* --- 16. Текстовые задачи на уравнение --- */
const NAMES={ru:["Аня","Марк","Лиза","Артём","Кира"],et:["Anna","Mark","Liisa","Kristjan","Kertu"],en:["Anna","Mark","Lisa","Tom","Kate"]};
TPL.wordEq={topic:"word",pts:4,cnt:{n:2,a:2},
  title:{ru:"Реши задачу с помощью уравнения",et:"Lahenda ülesanne võrrandi abil",en:"Solve with an equation"},
  gen(R,lvl,cnt){
    const items=[];const sc=R.shuffle(["sum","shop","rect","meet","age"]);
    for(let i=0;i<cnt;i++){
      const s=sc[i%sc.length];
      if(s==="sum"){const k=new Q(R.int(15,95),10),x=new Q(R.int(50,300),10);const S=x.add(x).add(k);
        items.push(numAns(x,{q:tr({ru:`Сумма двух чисел равна ${qh(S)}, одно из них больше другого на ${qh(k)}. Найди меньшее число.`,et:`Kahe arvu summa on ${qh(S)}, üks neist on teisest ${qh(k)} võrra suurem. Leia väiksem arv.`,en:`Two numbers add up to ${qh(S)}; one is ${qh(k)} more than the other. Find the smaller number.`}),
          exp:P(`x + (x + ${qh(k)}) = ${qh(S)} → 2x = ${qh(S.sub(k))} → x = ${qh(x)}`)}))}
      else if(s==="shop"){const n1=R.int(3,6),n2=R.int(2,5),d=new Q(R.int(15,90),100),x=new Q(R.int(120,450),100);const T=x.mul(n1).add(x.sub(d).mul(n2));
        items.push(numAns(x,{unit:"€",q:tr({ru:`${n1} тетрадей и ${n2} ручки стоят вместе ${qh(T)} €. Ручка дешевле тетради на ${qh(d)} €. Сколько стоит тетрадь?`,et:`${n1} vihikut ja ${n2} pliiatsit maksavad kokku ${qh(T)} €. Pliiats on vihikust ${qh(d)} € odavam. Kui palju maksab vihik?`,en:`${n1} notebooks and ${n2} pens cost ${qh(T)} € in total. A pen is ${qh(d)} € cheaper than a notebook. How much is a notebook?`}),
          exp:P(`${n1}x + ${n2}(x ${MINUS} ${qh(d)}) = ${qh(T)} → ${n1+n2}x = ${qh(T.add(d.mul(n2)))} → x = ${qh(x)} €`)}))}
      else if(s==="rect"){const w=new Q(R.int(25,150),10),k=new Q(R.int(10,80),10);const Pp=w.mul(2).add(w.add(k).mul(2));
        items.push(numAns(w,{unit:tr({ru:"см",et:"cm",en:"cm"}),q:tr({ru:`Периметр прямоугольника ${qh(Pp)} см, длина на ${qh(k)} см больше ширины. Найди ширину.`,et:`Ristküliku ümbermõõt on ${qh(Pp)} cm, pikkus on laiusest ${qh(k)} cm suurem. Leia laius.`,en:`A rectangle's perimeter is ${qh(Pp)} cm and its length is ${qh(k)} cm more than its width. Find the width.`}),
          exp:P(`2(x + x + ${qh(k)}) = ${qh(Pp)} → 2x + ${qh(k)} = ${qh(Pp.div(2))} → x = ${qh(w)}`)}))}
      else if(s==="meet"){const v1=R.int(8,18),v2=R.int(10,22),t=new Q(R.pick([5,6,7,8,9,12,15,18]),4);const D=t.mul(v1+v2);
        const nm=R.shuffle(NAMES[LANG]||NAMES.ru);
        items.push(numAns(t,{unit:tr({ru:"ч",et:"h",en:"h"}),q:tr({ru:`${nm[0]} и ${nm[1]} выехали на велосипедах навстречу друг другу из двух посёлков, расстояние между которыми ${qh(D)} км. Скорость первого ${v1} км/ч, второго ${v2} км/ч. Через сколько часов они встретятся?`,et:`${nm[0]} ja ${nm[1]} sõitsid jalgratastega teineteisele vastu kahest külast, mille vahe on ${qh(D)} km. Esimese kiirus on ${v1} km/h, teise ${v2} km/h. Mitme tunni pärast nad kohtuvad?`,en:`${nm[0]} and ${nm[1]} cycle towards each other from two villages ${qh(D)} km apart. Their speeds are ${v1} km/h and ${v2} km/h. After how many hours do they meet?`}),
          exp:P(`(${v1} + ${v2}) · t = ${qh(D)} → t = ${qh(D)} : ${v1+v2} = ${ansHtml(t)}`)}))}
      else {const son=R.int(6,14),m=R.pick([3,4,5]);const fa=son*m;const y=R.int(2,10);const ratio=new Q(fa+y,son+y);
        // вариант: сумма возрастов через y лет
        const S=fa+son+2*y;
        items.push(numAns(new Q(son),{q:tr({ru:`Отец в ${m} раза старше сына. Через ${y} лет им вместе будет ${S} лет. Сколько лет сыну сейчас?`,et:`Isa on pojast ${m} korda vanem. ${y} aasta pärast on neil kokku ${S} aastat. Kui vana on poeg praegu?`,en:`A father is ${m} times as old as his son. In ${y} years their ages will add up to ${S}. How old is the son now?`}),
          exp:P(`(${m}x + ${y}) + (x + ${y}) = ${S} → ${m+1}x = ${S-2*y} → x = ${son}`)}))}
    }
    return {items};
  }};

/* --- 17. Линейная функция --- */
TPL.linFunc={topic:"func",pts:2,cnt:{n:4,a:4},
  title:{ru:"Линейная функция",et:"Lineaarfunktsioon",en:"Linear function"},
  gen(R,lvl,cnt){
    const items=[];
    const k=lvl==="n"?new Q(rInt(R,1,5)).mul(R.chance(.3)?new Q(1,2):new Q(1)):rDec(R,1,4),b=lvl==="n"?new Q(rInt(R,1,9)):rDec(R,1,6);
    const fy=x=>k.mul(x).add(b);
    const fstr=`y = ${qh(k)}x ${b.sgn()<0?MINUS:"+"} ${qh(b.abs())}`;
    const intro=tr({ru:`Функция задана формулой ${fstr}.`,et:`Funktsioon on antud valemiga ${fstr}.`,en:`The function is given by ${fstr}.`});
    const kinds=lvl==="n"?["y","x","zero","point"]:["y","x","zero","point","twopts"];
    for(let i=0;i<cnt;i++){
      const kk=kinds[i%kinds.length];
      if(kk==="y"){const x=rDec(R,1,6);const y=fy(x);items.push(numAns(y,{q:tr({ru:`Найди y при x = ${qh(x)}.`,et:`Leia y, kui x = ${qh(x)}.`,en:`Find y when x = ${qh(x)}.`}),pre:"y =",exp:P(`y = ${qh(k)} · ${qh(x,true)} ${b.sgn()<0?MINUS:"+"} ${qh(b.abs())} = ${qh(y)}`)}))}
      else if(kk==="x"){const x=lvl==="n"?new Q(rInt(R,1,9)):rDec(R,1,6);const y=fy(x);items.push(numAns(x,{q:tr({ru:`При каком x значение y равно ${qh(y)}?`,et:`Millise x korral on y = ${qh(y)}?`,en:`For which x is y = ${qh(y)}?`}),pre:"x =",exp:P(`${qh(k)}x ${b.sgn()<0?MINUS:"+"} ${qh(b.abs())} = ${qh(y)} → x = (${qh(y)} ${MINUS} ${qh(b,true)}) : ${qh(k,true)} = ${ansHtml(x)}`)}))}
      else if(kk==="zero"){const x=b.neg().div(k);items.push(numAns(x,{q:tr({ru:"Найди точку пересечения графика с осью x (значение x).",et:"Leia graafiku ja x-telje lõikepunkt (x väärtus).",en:"Find where the graph crosses the x-axis (the x value)."}),pre:"x =",exp:P(`y = 0: ${qh(k)}x ${b.sgn()<0?MINUS:"+"} ${qh(b.abs())} = 0 → x = ${ansHtml(x)}`)}))}
      else if(kk==="point"){const x=new Q(rInt(R,1,6));const yes=R.chance(.5);const y=yes?fy(x):fy(x).add(new Q(rInt(R,1,3)));
        const Y=tr({ru:"да",et:"jah",en:"yes"}),Nn=tr({ru:"нет",et:"ei",en:"no"});
        items.push({ans:{type:"choice",v:yes?"y":"n"},opts:[["y",Y],["n",Nn]],show:yes?Y:Nn,plain:yes?"y":"n",
          q:tr({ru:`Лежит ли точка (${qh(x)}; ${qh(y)}) на графике?`,et:`Kas punkt (${qh(x)}; ${qh(y)}) asub graafikul?`,en:`Does the point (${qh(x)}; ${qh(y)}) lie on the graph?`}),
          exp:P(`y(${qh(x)}) = ${qh(fy(x))} ${yes?"=":"≠"} ${qh(y)}`)})}
      else {const x1=new Q(rInt(R,1,4)),x2=x1.add(R.int(2,5));const k2=rDec(R,1,4),b2=new Q(rInt(R,1,8));const y1=k2.mul(x1).add(b2),y2=k2.mul(x2).add(b2);
        items.push(numAns(k2,{q:tr({ru:`Прямая y = kx + b проходит через точки (${qh(x1)}; ${qh(y1)}) и (${qh(x2)}; ${qh(y2)}). Найди k.`,et:`Sirge y = kx + b läbib punkte (${qh(x1)}; ${qh(y1)}) ja (${qh(x2)}; ${qh(y2)}). Leia k.`,en:`The line y = kx + b passes through (${qh(x1)}; ${qh(y1)}) and (${qh(x2)}; ${qh(y2)}). Find k.`}),pre:"k =",exp:P(`k = (${qh(y2)} ${MINUS} ${qh(y1,true)}) : (${qh(x2)} ${MINUS} ${qh(x1,true)}) = ${qh(k2)}`)}))}
    }
    return {intro,items};
  }};

/* --- 18. Прямая и обратная пропорциональность --- */
TPL.proportion={topic:"func",pts:3,cnt:{n:2,a:2},
  title:{ru:"Пропорциональные величины",et:"Võrdelised suurused",en:"Proportional quantities"},
  gen(R,lvl,cnt){
    const items=[];const kinds=R.shuffle(["direct","inverse"]);
    for(let i=0;i<cnt;i++){
      if(kinds[i%2]==="direct"){const m1=new Q(R.int(15,45),10),price=new Q(R.int(129,489),100),m2=new Q(R.int(10,80),10);const c1=m1.mul(price),c2=m2.mul(price);const r=new Q(Math.round(c2.v()*100),100);
        items.push(numAns(r,{unit:"€",tol:0.011,q:tr({ru:`${qh(m1)} кг яблок стоят ${qh(c1)} €. Сколько стоят ${qh(m2)} кг? (Округли до центов.)`,et:`${qh(m1)} kg õunu maksab ${qh(c1)} €. Kui palju maksab ${qh(m2)} kg? (Ümarda sendini.)`,en:`${qh(m1)} kg of apples cost ${qh(c1)} €. How much do ${qh(m2)} kg cost? (Round to cents.)`}),
          exp:P(tr({ru:"Прямая пропорциональность: цена 1 кг одинакова.",et:"Võrdeline seos: 1 kg hind on sama.",en:"Direct proportion: the price per kg is the same."}))+P(`${qh(c1)} : ${qh(m1)} = ${qh(price)} €; ${qh(price)} · ${qh(m2)} ≈ ${qh(r)} €`)}))}
      else {const w1=R.int(3,8),d1=R.int(6,18),w2=R.int(3,12);if(w2===w1){}const d2=new Q(w1*d1,w2===w1?w1+2:w2);const ww2=w2===w1?w1+2:w2;
        items.push(numAns(d2,{unit:tr({ru:"дн.",et:"päeva",en:"days"}),q:tr({ru:`${w1} мастеров выполняют работу за ${d1} дней. За сколько дней выполнят её ${ww2} мастеров при той же производительности?`,et:`${w1} meistrit teevad töö ${d1} päevaga. Mitme päevaga teevad selle ${ww2} meistrit sama tootlikkusega?`,en:`${w1} workers finish a job in ${d1} days. How many days will ${ww2} workers need at the same rate?`}),
          exp:P(tr({ru:"Обратная пропорциональность: произведение «люди × дни» постоянно.",et:"Pöördvõrdeline seos: korrutis «inimesed × päevad» on konstantne.",en:"Inverse proportion: workers × days stays constant."}))+P(`${w1} · ${d1} = ${w1*d1}; ${w1*d1} : ${ww2} = ${ansHtml(d2)}`)}))}
    }
    return {items};
  }};

/* --- 19. Многоугольники: углы --- */
TPL.polyAngles={topic:"poly",pts:2,cnt:{n:3,a:3},
  title:{ru:"Углы многоугольников",et:"Hulknurkade nurgad",en:"Angles of polygons"},
  gen(R,lvl,cnt){
    const items=[];const kinds=R.shuffle(lvl==="n"?["sum","reg","para"]:["reg","nfrom","para","sum"]);
    for(let i=0;i<cnt;i++){
      const k=kinds[i%kinds.length];
      if(k==="sum"){const n=R.int(5,14);const s=180*(n-2);items.push(numAns(new Q(s),{unit:"°",q:tr({ru:`Найди сумму внутренних углов выпуклого ${n}-угольника.`,et:`Leia kumera ${n}-nurga sisenurkade summa.`,en:`Find the sum of the interior angles of a convex ${n}-gon.`}),exp:P(`180° · (${n} ${MINUS} 2) = ${s}°`)}))}
      else if(k==="reg"){const n=R.pick([5,6,8,9,10,12,15,18,20,24]);const a=new Q(180*(n-2),n);items.push(numAns(a,{unit:"°",q:tr({ru:`Найди внутренний угол правильного ${n}-угольника.`,et:`Leia korrapärase ${n}-nurga sisenurk.`,en:`Find an interior angle of a regular ${n}-gon.`}),exp:P(`180° · (${n} ${MINUS} 2) : ${n} = ${qh(a)}°`),alt:P(tr({ru:`Другой способ: внешний угол 360° : ${n} = ${qh(new Q(360,n))}°, внутренний 180° ${MINUS} ${qh(new Q(360,n))}° = ${qh(a)}°.`,et:`Teine võimalus: välisnurk 360° : ${n} = ${qh(new Q(360,n))}°, sisenurk 180° ${MINUS} ${qh(new Q(360,n))}° = ${qh(a)}°.`,en:`Another way: exterior angle 360° ÷ ${n} = ${qh(new Q(360,n))}°, interior 180° ${MINUS} ${qh(new Q(360,n))}° = ${qh(a)}°.`}))}))}
      else if(k==="nfrom"){const n=R.pick([8,9,10,12,15,18,20,30,36]);const a=new Q(180*(n-2),n);items.push(numAns(new Q(n),{q:tr({ru:`Внутренний угол правильного многоугольника равен ${qh(a)}°. Сколько у него сторон?`,et:`Korrapärase hulknurga sisenurk on ${qh(a)}°. Mitu külge sellel on?`,en:`An interior angle of a regular polygon is ${qh(a)}°. How many sides does it have?`}),pre:"n =",exp:P(`${tr({ru:"Внешний угол",et:"Välisnurk",en:"Exterior angle"})} 180° ${MINUS} ${qh(a)}° = ${qh(new Q(180).sub(a))}°; n = 360 : ${qh(new Q(180).sub(a))} = ${n}`)}))}
      else {const a=new Q(R.int(350,890),10);const b=new Q(180).sub(a);items.push(numAns(b,{unit:"°",q:tr({ru:`Один угол параллелограмма равен ${qh(a)}°. Найди соседний с ним угол.`,et:`Rööpküliku üks nurk on ${qh(a)}°. Leia selle naabernurk.`,en:`One angle of a parallelogram is ${qh(a)}°. Find the adjacent angle.`}),exp:P(tr({ru:"Соседние углы параллелограмма в сумме дают 180°:",et:"Rööpküliku naabernurkade summa on 180°:",en:"Adjacent angles of a parallelogram add up to 180°:"})+` 180° ${MINUS} ${qh(a)}° = ${qh(b)}°`)}))}
    }
    return {items};
  }};

/* --- 20. Площади параллелограмма и ромба (с эскизом) --- */
function svgPara(a,h,la,lh){return `<svg class="sk" viewBox="0 0 220 110" role="img"><polygon points="20,90 160,90 200,25 60,25" fill="none" stroke="currentColor" stroke-width="2"/><line x1="60" y1="25" x2="60" y2="90" stroke="currentColor" stroke-dasharray="4 3"/><text x="90" y="106" font-size="12" fill="currentColor">${la}</text><text x="64" y="62" font-size="12" fill="currentColor">${lh}</text></svg>`}
function svgRhomb(l1,l2){return `<svg class="sk" viewBox="0 0 220 120" role="img"><polygon points="110,10 190,60 110,110 30,60" fill="none" stroke="currentColor" stroke-width="2"/><line x1="30" y1="60" x2="190" y2="60" stroke="currentColor" stroke-dasharray="4 3"/><line x1="110" y1="10" x2="110" y2="110" stroke="currentColor" stroke-dasharray="4 3"/><text x="140" y="55" font-size="12" fill="currentColor">${l1}</text><text x="114" y="90" font-size="12" fill="currentColor">${l2}</text></svg>`}
TPL.quadArea={topic:"poly",pts:3,cnt:{n:2,a:2},
  title:{ru:"Площадь",et:"Pindala",en:"Area"},
  gen(R,lvl,cnt){
    const items=[];const kinds=R.shuffle(lvl==="n"?["para","rhomb"]:["height2","rhomb","para"]);
    const cm=tr({ru:"см",et:"cm",en:"cm"});
    for(let i=0;i<cnt;i++){
      const k=kinds[i%kinds.length];
      if(k==="para"){const a=new Q(R.int(35,145),10),h=new Q(R.int(18,95),10);const S=a.mul(h);
        items.push(numAns(S,{unit:cm+"²",q:svgPara(a,h,`a = ${qh(a)} ${cm}`,`h = ${qh(h)}`)+tr({ru:`Найди площадь параллелограмма со стороной ${qh(a)} см и высотой ${qh(h)} см, проведённой к ней.`,et:`Leia rööpküliku pindala, kui külg on ${qh(a)} cm ja sellele tõmmatud kõrgus ${qh(h)} cm.`,en:`Find the area of a parallelogram with side ${qh(a)} cm and height ${qh(h)} cm to that side.`}),exp:P(`S = a · h = ${qh(a)} · ${qh(h)} = ${qh(S)} ${cm}²`)}))}
      else if(k==="rhomb"){const d1=new Q(R.int(30,140),10),d2=new Q(R.int(20,90),10);const S=d1.mul(d2).div(2);
        items.push(numAns(S,{unit:cm+"²",q:svgRhomb(`d₁ = ${qh(d1)}`,`d₂ = ${qh(d2)}`)+tr({ru:`Диагонали ромба ${qh(d1)} см и ${qh(d2)} см. Найди его площадь.`,et:`Rombi diagonaalid on ${qh(d1)} cm ja ${qh(d2)} cm. Leia selle pindala.`,en:`The diagonals of a rhombus are ${qh(d1)} cm and ${qh(d2)} cm. Find its area.`}),exp:P(`S = d₁ · d₂ : 2 = ${qh(d1)} · ${qh(d2)} : 2 = ${qh(S)} ${cm}²`)}))}
      else {const a=new Q(R.int(8,16)),b=new Q(R.int(5,7)),ha=new Q(R.int(30,48),10);const S=a.mul(ha);const hb=S.div(b);
        items.push(numAns(hb,{unit:cm,q:svgPara(a,ha,`a = ${qh(a)}`,`h = ${qh(ha)}`)+tr({ru:`Стороны параллелограмма ${qh(a)} см и ${qh(b)} см, высота к большей стороне ${qh(ha)} см. Найди высоту к меньшей стороне.`,et:`Rööpküliku küljed on ${qh(a)} cm ja ${qh(b)} cm, pikemale küljele tõmmatud kõrgus on ${qh(ha)} cm. Leia lühemale küljele tõmmatud kõrgus.`,en:`A parallelogram has sides ${qh(a)} cm and ${qh(b)} cm; the height to the longer side is ${qh(ha)} cm. Find the height to the shorter side.`}),exp:P(`S = ${qh(a)} · ${qh(ha)} = ${qh(S)}; h = ${qh(S)} : ${qh(b)} = ${ansHtml(hb)} ${cm}`)}))}
    }
    return {items};
  }};

/* --- 21. Прямая призма --- */
function svgBox(la,lb,lc){return `<svg class="sk" viewBox="0 0 220 130" role="img"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="45" width="130" height="70"/><polyline points="20,45 60,15 190,15 150,45"/><polyline points="190,15 190,85 150,115"/></g><line x1="20" y1="115" x2="60" y2="85" stroke="currentColor" stroke-dasharray="4 3"/><line x1="60" y1="85" x2="190" y2="85" stroke="currentColor" stroke-dasharray="4 3"/><line x1="60" y1="15" x2="60" y2="85" stroke="currentColor" stroke-dasharray="4 3"/><text x="70" y="128" font-size="12" fill="currentColor">${la}</text><text x="160" y="110" font-size="12" fill="currentColor">${lb}</text><text x="2" y="85" font-size="12" fill="currentColor">${lc}</text></svg>`}
function svgTriPrism(lh){return `<svg class="sk" viewBox="0 0 220 130" role="img"><g fill="none" stroke="currentColor" stroke-width="2"><polygon points="20,110 120,110 60,80"/><polygon points="20,40 120,40 60,10"/><line x1="20" y1="110" x2="20" y2="40"/><line x1="120" y1="110" x2="120" y2="40"/></g><line x1="60" y1="80" x2="60" y2="10" stroke="currentColor" stroke-dasharray="4 3"/><text x="126" y="80" font-size="12" fill="currentColor">${lh}</text></svg>`}
TPL.prism={topic:"prism",pts:3,cnt:{n:2,a:3},
  title:{ru:"Прямая призма",et:"Püstprisma",en:"Right prism"},
  gen(R,lvl,cnt){
    const items=[];const cm=tr({ru:"см",et:"cm",en:"cm"});
    const a=new Q(R.int(30,120),10),b=new Q(R.int(20,90),10),c=new Q(R.int(25,80),10);
    const intro=svgBox(`a = ${qh(a)}`,`b = ${qh(b)}`,`c = ${qh(c)}`)+tr({ru:`Прямоугольный параллелепипед имеет измерения ${qh(a)} см, ${qh(b)} см и ${qh(c)} см.`,et:`Risttahuka mõõtmed on ${qh(a)} cm, ${qh(b)} cm ja ${qh(c)} cm.`,en:`A cuboid measures ${qh(a)} cm × ${qh(b)} cm × ${qh(c)} cm.`});
    const Vv=a.mul(b).mul(c),S=a.mul(b).add(a.mul(c)).add(b.mul(c)).mul(2);
    items.push(numAns(Vv,{unit:cm+"³",q:tr({ru:"Найди объём.",et:"Leia ruumala.",en:"Find the volume."}),pre:"V =",exp:P(`V = ${qh(a)} · ${qh(b)} · ${qh(c)} = ${qh(Vv)} ${cm}³`)}));
    if(cnt>1)items.push(numAns(S,{unit:cm+"²",q:tr({ru:"Найди площадь полной поверхности.",et:"Leia täispindala.",en:"Find the total surface area."}),pre:"S =",exp:P(`S = 2(ab + ac + bc) = 2(${qh(a.mul(b))} + ${qh(a.mul(c))} + ${qh(b.mul(c))}) = ${qh(S)} ${cm}²`)}));
    if(cnt>2){const tri=R.pick([[5,6,7,new Q(147,10)],[6,8,10,new Q(24)],[5,5,6,new Q(12)],[9,10,17,new Q(36)]]);const H=new Q(R.int(40,120),10);const Vt=tri[3].mul(H);
      items.push(numAns(Vt,{unit:cm+"³",q:svgTriPrism(`H = ${qh(H)}`)+tr({ru:`Основание прямой призмы — треугольник со сторонами ${tri[0]}, ${tri[1]} и ${tri[2]} см и площадью ${qh(tri[3])} см². Высота призмы ${qh(H)} см. Найди объём.`,et:`Püstprisma põhi on kolmnurk külgedega ${tri[0]}, ${tri[1]} ja ${tri[2]} cm ning pindalaga ${qh(tri[3])} cm². Prisma kõrgus on ${qh(H)} cm. Leia ruumala.`,en:`A right prism has a triangular base with sides ${tri[0]}, ${tri[1]}, ${tri[2]} cm and area ${qh(tri[3])} cm². Its height is ${qh(H)} cm. Find the volume.`}),pre:"V =",exp:P(`V = S<sub>${tr({ru:"осн",et:"p",en:"base"})}</sub> · H = ${qh(tri[3])} · ${qh(H)} = ${qh(Vt)} ${cm}³`)}))}
    return {intro,items};
  }};

/* --- 22. Статистика --- */
TPL.stat={topic:"stat",pts:2,cnt:{n:4,a:4},
  title:{ru:"Статистика",et:"Statistika",en:"Statistics"},
  gen(R,lvl,cnt){
    const n=R.pick([7,8,9,10,11]);let data;
    do{data=[];for(let i=0;i<n;i++)data.push(lvl==="n"?R.int(2,20):R.int(110,190)/10);
      const cntMap={};data.forEach(x=>cntMap[x]=(cntMap[x]||0)+1);const mx=Math.max(...Object.values(cntMap));
      var modes=Object.keys(cntMap).filter(k=>cntMap[k]===mx);
      if(mx<2){const j=R.int(0,n-2);data[n-1]=data[j];continue}
      if(modes.length===1)break;
    }while(true);
    const fmt=x=>qh(q(x));
    const intro=tr({ru:`Результаты измерений: ${data.map(fmt).join("; ")}.`,et:`Mõõtmistulemused: ${data.map(fmt).join("; ")}.`,en:`Measurements: ${data.map(fmt).join("; ")}.`});
    const sum=data.reduce((s,x)=>s.add(q(x)),new Q(0));const mean=sum.div(n);
    const sorted=data.slice().sort((a,b)=>a-b);const med=n%2?q(sorted[(n-1)/2]):q(sorted[n/2-1]).add(q(sorted[n/2])).div(2);
    const range=q(sorted[n-1]).sub(q(sorted[0]));
    const cntMap={};data.forEach(x=>cntMap[x]=(cntMap[x]||0)+1);const mx=Math.max(...Object.values(cntMap));const mode=q(Number(Object.keys(cntMap).find(k=>cntMap[k]===mx)));
    const items=[
      numAns(mean,{tol:decPlaces(mean)>=0&&decPlaces(mean)<=2?undefined:0.0051,q:tr({ru:"Среднее арифметическое (если нужно, округли до сотых)",et:"Aritmeetiline keskmine (vajadusel ümarda sajandikeni)",en:"Mean (round to hundredths if needed)"}),exp:P(`(${data.map(fmt).join(" + ")}) : ${n} = ${qh(sum)} : ${n} = ${ansHtml(mean)}`)}),
      numAns(med,{q:tr({ru:"Медиана",et:"Mediaan",en:"Median"}),exp:P(tr({ru:"Упорядочим:",et:"Järjestame:",en:"Sorted:"})+" "+sorted.map(fmt).join("; "))+P(n%2?tr({ru:"Число значений нечётное — медиана в середине:",et:"Väärtusi on paaritu arv — mediaan on keskel:",en:"An odd count — the median is the middle value:"})+" "+qh(med):tr({ru:"Число значений чётное — среднее двух средних:",et:"Väärtusi on paarisarv — kahe keskmise väärtuse keskmine:",en:"An even count — the mean of the two middle values:"})+" "+qh(med))}),
      numAns(mode,{q:tr({ru:"Мода",et:"Mood",en:"Mode"}),exp:P(tr({ru:`Чаще всего (${mx} раза) встречается ${qh(mode)}.`,et:`Kõige sagedamini (${mx} korda) esineb ${qh(mode)}.`,en:`${qh(mode)} occurs most often (${mx} times).`}))}),
      numAns(range,{q:tr({ru:"Размах",et:"Haare",en:"Range"}),exp:P(`${fmt(sorted[n-1])} ${MINUS} ${fmt(sorted[0])} = ${qh(range)}`)}),
    ];
    return {intro,items:items.slice(0,cnt)};
  }};

/* --- 23. Вероятность и круговая диаграмма --- */
TPL.prob={topic:"stat",pts:2,cnt:{n:2,a:3},
  title:{ru:"Вероятность",et:"Tõenäosus",en:"Probability"},
  gen(R,lvl,cnt){
    const items=[];const kinds=R.shuffle(lvl==="n"?["bag","die","pie"]:["bag","twodice","pie"]);
    for(let i=0;i<cnt;i++){
      const k=kinds[i%kinds.length];
      if(k==="bag"){const r=R.int(2,9),b=R.int(2,9),g=R.int(1,7);const p=new Q(r,r+b+g);
        items.push(numAns(p,{q:tr({ru:`В мешке ${r} красных, ${b} синих и ${g} зелёных шаров. Какова вероятность наугад вынуть красный? (Дробью или десятичной.)`,et:`Kotis on ${r} punast, ${b} sinist ja ${g} rohelist palli. Kui suur on tõenäosus võtta huupi punane pall? (Murru või kümnendmurruna.)`,en:`A bag has ${r} red, ${b} blue and ${g} green balls. What is the probability of drawing a red one at random? (Fraction or decimal.)`}),pre:"P =",exp:P(`P = ${r} : ${r+b+g} = ${ansHtml(p)}`)}))}
      else if(k==="die"){const t=R.int(2,5);const p=new Q(6-t,6);items.push(numAns(p,{q:tr({ru:`Бросают игральный кубик. Какова вероятность, что выпадет больше ${t}?`,et:`Visatakse täringut. Kui suur on tõenäosus, et tuleb rohkem kui ${t}?`,en:`A die is rolled. What is the probability of getting more than ${t}?`}),pre:"P =",exp:P(tr({ru:`Подходят ${6-t} исхода из 6:`,et:`Sobib ${6-t} tulemust kuuest:`,en:`${6-t} outcomes out of 6:`})+" "+ansHtml(p))}))}
      else if(k==="twodice"){const s=R.int(4,10);const c=[1,2,3,4,5,6].reduce((acc,x)=>acc+([1,2,3,4,5,6].includes(s-x)?1:0),0);const p=new Q(c,36);
        items.push(numAns(p,{q:tr({ru:`Бросают два кубика. Какова вероятность, что сумма очков равна ${s}?`,et:`Visatakse kahte täringut. Kui suur on tõenäosus, et silmade summa on ${s}?`,en:`Two dice are rolled. What is the probability the total is ${s}?`}),pre:"P =",exp:P(tr({ru:`Всего 36 исходов, подходящих ${c}:`,et:`Kokku on 36 tulemust, sobivaid ${c}:`,en:`36 outcomes in total, ${c} favourable:`})+` ${c}/36 = ${ansHtml(p)}`)}))}
      else {const pp=new Q(R.int(5,45));const ang=pp.mul(new Q(36,10));items.push(numAns(ang,{unit:"°",q:tr({ru:`На круговой диаграмме сектор показывает ${qh(pp)}% учеников. Какой у него центральный угол?`,et:`Sektordiagrammil näitab sektor ${qh(pp)}% õpilastest. Kui suur on selle kesknurk?`,en:`On a pie chart a sector shows ${qh(pp)}% of students. What is its central angle?`}),exp:P(`360° · ${qh(pp.div(100))} = ${qh(ang)}°`)}))}
    }
    return {items};
  }};

/* --- Повторение 6 класса --- */
TPL.frac6={topic:"r6",pts:1,cnt:{n:4,a:4},
  title:{ru:"Действия с обыкновенными дробями",et:"Tehted harilike murdudega",en:"Operations with fractions"},
  gen(R,lvl,cnt){
    const items=[];const ops=R.shuffle(["+","-","*",":"]);
    for(let i=0;i<cnt;i++){
      const op=ops[i%4];const D=lvl==="n"?[2,3,4,5,6,8,9,10,12]:[6,7,8,9,12,14,15];
      let a=rFrac(R,D,op==="*"||op===":"?2:4).abs(),b=rFrac(R,D,op==="*"||op===":"?1:3).abs();
      if(op==="-"&&a.v()<b.v())[a,b]=[b,a];
      const e=N(op,L(a,"mixed"),L(b,b.v()>1?"mixed":"frac"));const r=evalE(e);
      const ex=op==="+"||op==="-"?P(tr({ru:`Приводим к общему знаменателю ${lcm(a.d,b.d)} и ${op==="+"?"складываем":"вычитаем"}.`,et:`Viime ühisele nimetajale ${lcm(a.d,b.d)} ja ${op==="+"?"liidame":"lahutame"}.`,en:`Use the common denominator ${lcm(a.d,b.d)} and ${op==="+"?"add":"subtract"}.`})):op==="*"?P(tr({ru:"Смешанные числа переводим в неправильные дроби и перемножаем числители и знаменатели.",et:"Segaarvud teisendame liigmurdudeks ja korrutame lugejad ja nimetajad.",en:"Turn mixed numbers into improper fractions, multiply numerators and denominators."})):P(tr({ru:"Деление заменяем умножением на обратное число.",et:"Jagamise asendame pöördarvuga korrutamisega.",en:"Replace division with multiplication by the reciprocal."}));
      items.push(numAns(r,{q:renderE(e),exp:ex+P(`${tr(T_ANS)}: ${numHtml(r,"mixed")}${decPlaces(r)>=0&&!r.isInt()?" = "+decStr(r):""}`)}));
    }
    return {items};
  }};
TPL.circle6={topic:"r6",pts:2,cnt:{n:2,a:2},
  title:{ru:"Окружность и круг (π ≈ 3,14)",et:"Ringjoon ja ring (π ≈ 3,14)",en:"Circles (π ≈ 3.14)"},
  gen(R,lvl,cnt){
    const r=new Q(R.int(15,95),10);const pi=new Q(314,100);const cm=tr({ru:"см",et:"cm",en:"cm"});
    const C=pi.mul(r).mul(2),S=pi.mul(r).mul(r);const Sr=new Q(Math.round(S.v()*100),100);
    const intro=tr({ru:`Радиус круга ${qh(r)} см.`,et:`Ringi raadius on ${qh(r)} cm.`,en:`The radius of a circle is ${qh(r)} cm.`});
    const items=[numAns(C,{tol:0.05,unit:cm,q:tr({ru:"Длина окружности",et:"Ringjoone pikkus",en:"Circumference"}),pre:"C =",exp:P(`C = 2πr = 2 · 3,14 · ${qh(r)} = ${qh(C)} ${cm}`.replace("3,14",LANG==="en"?"3.14":"3,14"))}),
      numAns(Sr,{tol:0.06,unit:cm+"²",q:tr({ru:"Площадь круга (округли до сотых)",et:"Ringi pindala (ümarda sajandikeni)",en:"Area (round to hundredths)"}),pre:"S =",exp:P(`S = πr² = 3,14 · ${qh(r)}² ≈ ${qh(Sr)} ${cm}²`.replace("3,14",LANG==="en"?"3.14":"3,14"))})];
    return {intro,items:items.slice(0,cnt)};
  }};
TPL.tri6={topic:"r6",pts:1,cnt:{n:2,a:2},
  title:{ru:"Углы треугольника",et:"Kolmnurga nurgad",en:"Angles of a triangle"},
  gen(R,lvl,cnt){
    const items=[];
    const a=new Q(R.int(250,800),10),b=new Q(R.int(200,700),10);const c=new Q(180).sub(a).sub(b);
    items.push(numAns(c,{unit:"°",q:tr({ru:`Два угла треугольника ${qh(a)}° и ${qh(b)}°. Найди третий угол.`,et:`Kolmnurga kaks nurka on ${qh(a)}° ja ${qh(b)}°. Leia kolmas nurk.`,en:`Two angles of a triangle are ${qh(a)}° and ${qh(b)}°. Find the third.`}),exp:P(`180° ${MINUS} ${qh(a)}° ${MINUS} ${qh(b)}° = ${qh(c)}°`)}));
    if(cnt>1){const base=new Q(R.int(305,845),10);const top=new Q(180).sub(base.mul(2));items.push(numAns(top,{unit:"°",q:tr({ru:`Угол при основании равнобедренного треугольника ${qh(base)}°. Найди угол при вершине.`,et:`Võrdhaarse kolmnurga alusnurk on ${qh(base)}°. Leia tipunurk.`,en:`A base angle of an isosceles triangle is ${qh(base)}°. Find the apex angle.`}),exp:P(`180° ${MINUS} 2 · ${qh(base)}° = ${qh(top)}°`)}))}
    return {items};
  }};

/* ============================================================
   ОЛИМПИАДНЫЙ ПУЛ (ручной) и ДОКАЗАТЕЛЬСТВА
   ============================================================ */
const OLY=[
 {id:"o1",topic:"rat",q:{ru:"Вычисли: 1 − 2 + 3 − 4 + … + 99 − 100.",et:"Arvuta: 1 − 2 + 3 − 4 + … + 99 − 100.",en:"Calculate: 1 − 2 + 3 − 4 + … + 99 − 100."},a:-50,
  s:{ru:"Разобьём на 50 пар: (1 − 2) + (3 − 4) + … + (99 − 100). Каждая пара даёт −1, всего −50.",et:"Jagame 50 paariks: (1 − 2) + (3 − 4) + … + (99 − 100). Iga paar annab −1, kokku −50.",en:"Group into 50 pairs (1 − 2) + (3 − 4) + … + (99 − 100); each pair is −1, so −50."}},
 {id:"o2",topic:"rat",type:"choice",opts:[["y",{ru:"Может",et:"Võib",en:"Yes"}],["n",{ru:"Не может",et:"Ei või",en:"No"}]],a:"n",q:{ru:"Произведение 25 целых чисел равно 1. Может ли их сумма быть равна 0?",et:"25 täisarvu korrutis on 1. Kas nende summa võib olla 0?",en:"The product of 25 integers is 1. Can their sum be 0?"},
  s:{ru:"Все числа равны 1 или −1. Чтобы сумма была 0, единиц и минус единиц должно быть поровну, но 25 — нечётное число. Значит, не может.",et:"Kõik arvud on 1 või −1. Summa 0 jaoks peaks neid olema võrdselt, aga 25 on paaritu arv. Seega ei või.",en:"Every number is 1 or −1. A zero sum needs equally many of each, but 25 is odd. So no."}},
 {id:"o3",topic:"r6",q:{ru:"Сколько натуральных чисел от 1 до 100 не делятся ни на 2, ни на 3?",et:"Mitu naturaalarvu vahemikus 1–100 ei jagu ei 2-ga ega 3-ga?",en:"How many whole numbers from 1 to 100 are divisible by neither 2 nor 3?"},a:33,
  s:{ru:"На 2 делятся 50 чисел, на 3 — 33, на 6 — 16 (их посчитали дважды). 100 − 50 − 33 + 16 = 33.",et:"2-ga jagub 50 arvu, 3-ga 33, 6-ga 16 (need loeti kaks korda). 100 − 50 − 33 + 16 = 33.",en:"50 are divisible by 2, 33 by 3, 16 by 6 (counted twice). 100 − 50 − 33 + 16 = 33."}},
 {id:"o4",topic:"r6",q:{ru:"За круглым столом сидят 10 человек — рыцари (всегда говорят правду) и лжецы (всегда лгут). Каждый сказал: «Оба моих соседа — лжецы». Какое наибольшее число рыцарей может быть за столом?",et:"Ümarlaua taga istub 10 inimest — rüütlid (räägivad alati tõtt) ja valetajad (valetavad alati). Igaüks ütles: «Mõlemad mu naabrid on valetajad». Kui palju võib laua taga kõige rohkem rüütleid olla?",en:"10 people sit at a round table: knights (always tell the truth) and liars (always lie). Each said: «Both my neighbours are liars.» What is the greatest possible number of knights?"},a:5,
  s:{ru:"Два рыцаря не могут сидеть рядом, поэтому рыцарей не больше 5. Пример: рыцари и лжецы чередуются — у лжеца оба соседа рыцари, его слова ложны. Ответ 5.",et:"Kaks rüütlit ei saa kõrvuti istuda, seega on rüütleid kõige rohkem 5. Näide: rüütlid ja valetajad vahelduvad. Vastus on 5.",en:"No two knights can sit together, so at most 5. Alternating knights and liars works. Answer: 5."}},
 {id:"o5",topic:"rat",q:{ru:"Вычисли: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).",et:"Arvuta: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).",en:"Calculate: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10)."},a:[9,10],
  s:{ru:"1/(n(n+1)) = 1/n − 1/(n+1). Сумма «складывается»: 1 − 1/2 + 1/2 − 1/3 + … − 1/10 = 1 − 1/10 = 9/10.",et:"1/(n(n+1)) = 1/n − 1/(n+1). Summa lüheneb: 1 − 1/10 = 9/10.",en:"1/(n(n+1)) = 1/n − 1/(n+1), so the sum telescopes to 1 − 1/10 = 9/10."}},
 {id:"o6",topic:"pow",q:{ru:"Какой последней цифрой оканчивается число 7²⁰²⁶?",et:"Millise numbriga lõpeb arv 7²⁰²⁶?",en:"What is the last digit of 7²⁰²⁶?"},a:9,
  s:{ru:"Последние цифры степеней 7 повторяются: 7, 9, 3, 1. Период 4, 2026 = 4 · 506 + 2, значит как у 7² — цифра 9.",et:"Arvu 7 astmete viimased numbrid korduvad: 7, 9, 3, 1. Periood on 4, 2026 = 4 · 506 + 2, seega nagu 7² — number 9.",en:"Last digits of powers of 7 cycle 7, 9, 3, 1. 2026 = 4 · 506 + 2, so like 7²: the digit 9."}},
 {id:"o7",topic:"pow",type:"choice",opts:[["a",{ru:"2³⁰⁰",et:"2³⁰⁰",en:"2³⁰⁰"}],["b",{ru:"3²⁰⁰",et:"3²⁰⁰",en:"3²⁰⁰"}],["c",{ru:"Они равны",et:"Need on võrdsed",en:"They are equal"}]],a:"b",q:{ru:"Что больше: 2³⁰⁰ или 3²⁰⁰?",et:"Kumb on suurem: 2³⁰⁰ või 3²⁰⁰?",en:"Which is larger: 2³⁰⁰ or 3²⁰⁰?"},
  s:{ru:"2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰, 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰. 9¹⁰⁰ больше.",et:"2³⁰⁰ = 8¹⁰⁰, 3²⁰⁰ = 9¹⁰⁰. 9¹⁰⁰ on suurem.",en:"2³⁰⁰ = 8¹⁰⁰ and 3²⁰⁰ = 9¹⁰⁰, so 3²⁰⁰ is larger."}},
 {id:"o8",topic:"pct",q:{ru:"Цену товара подняли на 20%, а потом снизили на 20%. На сколько процентов новая цена ниже первоначальной?",et:"Kauba hinda tõsteti 20% ja seejärel langetati 20%. Mitme protsendi võrra on uus hind algsest madalam?",en:"A price was raised by 20%, then lowered by 20%. By what percent is the new price lower than the original?"},a:4,unit:{ru:"%",et:"%",en:"%"},
  s:{ru:"1,2 · 0,8 = 0,96, то есть цена стала 96% от первоначальной — ниже на 4%.",et:"1,2 · 0,8 = 0,96 ehk 96% algsest — 4% madalam.",en:"1.2 × 0.8 = 0.96, i.e. 96% of the original — 4% lower."}},
 {id:"o9",topic:"pct",q:{ru:"Есть 200 г 5%-го раствора соли. Сколько граммов воды нужно выпарить, чтобы раствор стал 8%-м?",et:"On 200 g 5% soolalahust. Mitu grammi vett tuleb aurustada, et lahus oleks 8%?",en:"There is 200 g of a 5% salt solution. How many grams of water must evaporate to make it 8%?"},a:75,unit:{ru:"г",et:"g",en:"g"},
  s:{ru:"Соли 200 · 0,05 = 10 г, она не испаряется. Новая масса 10 : 0,08 = 125 г. Выпарить 200 − 125 = 75 г.",et:"Soola on 10 g. Uus mass 10 : 0,08 = 125 g. Aurustada 200 − 125 = 75 g.",en:"Salt: 10 g, which stays. New mass 10 ÷ 0.08 = 125 g, so 200 − 125 = 75 g of water."}},
 {id:"o10",topic:"eq",q:{ru:"Задумали число, умножили его на 3, прибавили 7, результат разделили на 2 и вычли задуманное число. Получилось 9. Какое число задумали?",et:"Mõeldi arv, korrutati see 3-ga, liideti 7, tulemus jagati 2-ga ja lahutati mõeldud arv. Saadi 9. Mis arv mõeldi?",en:"A number was multiplied by 3, 7 was added, the result was halved and the original number subtracted. The result is 9. What was the number?"},a:11,
  s:{ru:"(3x + 7) : 2 − x = 9 → 3x + 7 − 2x = 18 → x = 11.",et:"(3x + 7) : 2 − x = 9 → x = 11.",en:"(3x + 7)/2 − x = 9 → x = 11."}},
 {id:"o11",topic:"r6",q:{ru:"Какое наименьшее число учеников должно быть в школе, чтобы наверняка нашлись трое, родившиеся в одном месяце?",et:"Kui palju õpilasi peab koolis vähemalt olema, et kindlasti leiduks kolm samas kuus sündinut?",en:"What is the smallest number of students that guarantees three born in the same month?"},a:25,
  s:{ru:"24 ученика могут родиться по двое в каждом месяце. 25-й обязательно станет третьим в каком-то месяце (принцип Дирихле).",et:"24 õpilast võivad olla sündinud kaupa kaks igas kuus. 25. on kindlasti kuskil kolmas (Dirichlet' printsiip).",en:"24 students can be two per month. The 25th must make three in some month (pigeonhole principle)."}},
 {id:"o12",topic:"poly",q:{ru:"Сколько диагоналей у выпуклого 12-угольника?",et:"Mitu diagonaali on kumeral 12-nurgal?",en:"How many diagonals does a convex 12-gon have?"},a:54,
  s:{ru:"Из каждой вершины выходит 12 − 3 = 9 диагоналей, каждая посчитана дважды: 12 · 9 : 2 = 54.",et:"Igast tipust läheb 9 diagonaali, igaüht loeti kaks korda: 12 · 9 : 2 = 54.",en:"Each vertex has 9 diagonals, each counted twice: 12 · 9 ÷ 2 = 54."}},
 {id:"o13",topic:"r6",q:{ru:"Какой угол образуют часовая и минутная стрелки в 3:40?",et:"Millise nurga moodustavad tunni- ja minutiosuti kell 3:40?",en:"What angle do the hour and minute hands make at 3:40?"},a:130,unit:{ru:"°",et:"°",en:"°"},
  s:{ru:"Минутная стрелка на 240°. Часовая: 3 · 30° + 40 · 0,5° = 110°. Разность 130°.",et:"Minutiosuti on 240° juures, tunniosuti 3 · 30° + 40 · 0,5° = 110°. Vahe 130°.",en:"Minute hand at 240°, hour hand at 3 · 30° + 40 · 0.5° = 110°. Difference 130°."}},
 {id:"o14",topic:"stat",q:{ru:"Средний возраст 11 игроков команды 22 года. Когда одного игрока удалили, средний возраст остальных стал 21 год. Сколько лет удалённому игроку?",et:"Meeskonna 11 mängija keskmine vanus on 22 aastat. Kui üks mängija eemaldati, sai ülejäänute keskmiseks vanuseks 21 aastat. Kui vana oli eemaldatud mängija?",en:"The mean age of 11 players is 22. After one is sent off, the mean of the rest is 21. How old is that player?"},a:32,
  s:{ru:"11 · 22 = 242, 10 · 21 = 210, 242 − 210 = 32.",et:"11 · 22 = 242, 10 · 21 = 210, 242 − 210 = 32.",en:"11 · 22 = 242, 10 · 21 = 210, 242 − 210 = 32."}},
 {id:"o15",topic:"rat",type:"set",q:{ru:"Найди все целые x, при которых дробь (x + 5)/(x + 1) — целое число. (Через «;».)",et:"Leia kõik täisarvud x, mille korral (x + 5)/(x + 1) on täisarv. (Eralda «;».)",en:"Find all integers x for which (x + 5)/(x + 1) is an integer. (Separate with «;».)"},a:[0,-2,1,-3,3,-5],
  s:{ru:"(x + 5)/(x + 1) = 1 + 4/(x + 1). Значит, x + 1 — делитель 4: ±1, ±2, ±4. x = 0; −2; 1; −3; 3; −5.",et:"(x + 5)/(x + 1) = 1 + 4/(x + 1), seega x + 1 jagab 4: ±1, ±2, ±4. x = 0; −2; 1; −3; 3; −5.",en:"(x + 5)/(x + 1) = 1 + 4/(x + 1), so x + 1 divides 4: ±1, ±2, ±4. x = 0; −2; 1; −3; 3; −5."}},
 {id:"o16",topic:"prism",q:{ru:"Деревянный куб 3 × 3 × 3 покрасили снаружи и распилили на 27 одинаковых кубиков. Сколько кубиков окрашено ровно с двух сторон?",et:"Puidust kuup 3 × 3 × 3 värviti väljast ja saeti 27 ühesuguseks kuubikuks. Mitu kuubikut on värvitud täpselt kahelt küljelt?",en:"A 3 × 3 × 3 wooden cube is painted outside and cut into 27 small cubes. How many have exactly two painted faces?"},a:12,
  s:{ru:"Это кубики в серединах рёбер: у куба 12 рёбер, на каждом один такой кубик.",et:"Need on servade keskmised kuubikud: kuubil on 12 serva, igal üks.",en:"They are the middle cubes of the edges: 12 edges, one each."}},
 {id:"o17",topic:"rat",q:{ru:"Вычисли удобным способом: 2026 · 2024 − 2025².",et:"Arvuta mugavalt: 2026 · 2024 − 2025².",en:"Calculate cleverly: 2026 · 2024 − 2025²."},a:-1,
  s:{ru:"Пусть a = 2025. Тогда (a + 1)(a − 1) − a² = a² − 1 − a² = −1.",et:"Olgu a = 2025. (a + 1)(a − 1) − a² = −1.",en:"Let a = 2025: (a + 1)(a − 1) − a² = −1."}},
 {id:"o18",topic:"pct",q:{ru:"Арбуз весил 10 кг и на 99% состоял из воды. Он подсох, и воды стало 98%. Сколько теперь весит арбуз?",et:"Arbuus kaalus 10 kg ja sisaldas 99% vett. See kuivas ja vett jäi 98%. Kui palju arbuus nüüd kaalub?",en:"A 10 kg watermelon is 99% water. It dries until it is 98% water. How much does it weigh now?"},a:5,unit:{ru:"кг",et:"kg",en:"kg"},
  s:{ru:"Сухого вещества 1% = 0,1 кг, оно не меняется. Теперь это 2% массы: 0,1 : 0,02 = 5 кг.",et:"Kuivainet on 0,1 kg, see ei muutu. Nüüd on see 2%: 0,1 : 0,02 = 5 kg.",en:"Dry matter is 0.1 kg and stays the same; now it is 2%: 0.1 ÷ 0.02 = 5 kg."}},
 {id:"o19",topic:"func",q:{ru:"Улитка ползёт вверх по столбу высотой 10 м: днём поднимается на 5 м, ночью сползает на 4 м. На какой день она впервые окажется на вершине?",et:"Tigu roomab 10 m kõrgusel postil üles: päeval tõuseb 5 m, öösel libiseb 4 m alla. Mitmendal päeval jõuab ta esimest korda tippu?",en:"A snail climbs a 10 m pole: up 5 m by day, down 4 m by night. On which day does it first reach the top?"},a:6,
  s:{ru:"За 5 суток она поднимется на 5 м. На 6-й день прибавит 5 м и окажется на 10 м — на вершине.",et:"5 ööpäevaga tõuseb ta 5 m. 6. päeval lisandub 5 m ja ta on tipus.",en:"After 5 full days it is at 5 m; on day 6 it climbs 5 m and reaches 10 m."}},
 {id:"o20",topic:"eq",q:{ru:"У Пети и Маши вместе 50 конфет. Если Петя отдаст Маше 7 конфет, у них станет поровну. Сколько конфет у Пети?",et:"Petil ja Maarjal on kokku 50 kommi. Kui Peeter annab Maarjale 7 kommi, on neil võrdselt. Mitu kommi on Peetril?",en:"Pete and Mary have 50 sweets together. If Pete gives Mary 7, they have the same. How many does Pete have?"},a:32,
  s:{ru:"После передачи у каждого по 25. Значит, у Пети было 25 + 7 = 32.",et:"Pärast andmist on kummalgi 25, seega Peetril oli 32.",en:"Afterwards each has 25, so Pete had 25 + 7 = 32."}},
];
const PROOFS=[
 {id:"p1",topic:"rat",q:{ru:"Докажи, что сумма трёх последовательных целых чисел делится на 3.",et:"Tõesta, et kolme järjestikuse täisarvu summa jagub 3-ga.",en:"Prove that the sum of three consecutive integers is divisible by 3."},
  s:{ru:"Обозначим числа n − 1, n, n + 1. Их сумма 3n — делится на 3.",et:"Olgu arvud n − 1, n, n + 1. Summa 3n jagub 3-ga.",en:"Call them n − 1, n, n + 1. The sum is 3n, divisible by 3."}},
 {id:"p2",topic:"r6",q:{ru:"Докажи, что вертикальные углы равны.",et:"Tõesta, et tippnurgad on võrdsed.",en:"Prove that vertical angles are equal."},
  s:{ru:"Пусть α и β — вертикальные углы, γ — угол, смежный с каждым из них. α + γ = 180° и β + γ = 180°, значит α = 180° − γ = β.",et:"Olgu α ja β tippnurgad ning γ nende mõlema kõrvunurk. α + γ = 180° ja β + γ = 180°, seega α = β.",en:"Let α, β be vertical angles and γ adjacent to both. α + γ = 180° and β + γ = 180°, so α = β."}},
 {id:"p3",topic:"pow",q:{ru:"Докажи, что 10ⁿ − 1 делится на 9 при любом натуральном n.",et:"Tõesta, et 10ⁿ − 1 jagub 9-ga iga naturaalarvu n korral.",en:"Prove that 10ⁿ − 1 is divisible by 9 for every natural n."},
  s:{ru:"10ⁿ − 1 = 99…9 (n девяток) = 9 · 11…1. Значит, делится на 9.",et:"10ⁿ − 1 = 99…9 (n üheksat) = 9 · 11…1, seega jagub 9-ga.",en:"10ⁿ − 1 = 99…9 (n nines) = 9 · 11…1, so it is divisible by 9."}},
 {id:"p4",topic:"eq",q:{ru:"Докажи, что уравнение 2x + 4y = 7 не имеет решений в целых числах.",et:"Tõesta, et võrrandil 2x + 4y = 7 pole täisarvulisi lahendeid.",en:"Prove that 2x + 4y = 7 has no integer solutions."},
  s:{ru:"При целых x и y левая часть 2(x + 2y) чётная, а 7 — нечётное. Равенство невозможно.",et:"Täisarvude korral on vasak pool 2(x + 2y) paarisarv, 7 aga paaritu. Võrdus on võimatu.",en:"For integers the left side 2(x + 2y) is even while 7 is odd. Impossible."}},
 {id:"p5",topic:"poly",q:{ru:"Докажи, что сумма внешних углов выпуклого многоугольника (по одному при каждой вершине) равна 360°.",et:"Tõesta, et kumera hulknurga välisnurkade summa (üks igas tipus) on 360°.",en:"Prove that the exterior angles of a convex polygon (one at each vertex) add up to 360°."},
  s:{ru:"У n-угольника при каждой вершине внутренний и внешний углы дают 180°, всего 180n. Сумма внутренних 180(n − 2). Внешние: 180n − 180(n − 2) = 360°.",et:"Igas tipus annavad sise- ja välisnurk kokku 180°, kokku 180n. Sisenurkade summa on 180(n − 2). Välisnurgad: 180n − 180(n − 2) = 360°.",en:"At each vertex interior + exterior = 180°, total 180n. Interior sum is 180(n − 2), so exterior sum = 360°."}},
];

/* ============================================================
   ТЕМЫ, КАЛЕНДАРЬ, СБОРКА РАБОТЫ
   ============================================================ */
const TOPICS=[
 {id:"r6",start:-1,name:{ru:"Повторение 6 класса",et:"6. klassi kordamine",en:"Grade 6 review"},tpl:["frac6","circle6","tri6"]},
 {id:"rat",start:0,name:{ru:"Рациональные числа",et:"Ratsionaalarvud",en:"Rational numbers"},tpl:["addsub","muldiv","order","simpleEq","signedWord"]},
 {id:"dist",start:4,name:{ru:"Модуль, расстояние на числовой оси",et:"Absoluutväärtus, kaugus arvteljel",en:"Absolute value, distance on the number line"},tpl:["dist","abs"]},
 {id:"pow",start:8,name:{ru:"Степени",et:"Astmed",en:"Powers"},tpl:["pow","powRules"]},
 {id:"std",start:11,name:{ru:"Нулевая и отрицательная степень, стандартный вид",et:"Null- ja negatiivne astendaja, standardkuju",en:"Zero and negative exponents, scientific notation"},tpl:["negExp","std"]},
 {id:"pct",start:13,name:{ru:"Проценты, промилле, процентный пункт",et:"Protsent, promill, protsendipunkt",en:"Percent, per mille, percentage points"},tpl:["pctBasic","pctChange"]},
 {id:"eq",start:16,name:{ru:"Линейные уравнения, пропорция",et:"Lineaarvõrrand, võrre",en:"Linear equations, proportions"},tpl:["linEq","prop"]},
 {id:"word",start:19,name:{ru:"Текстовые задачи на уравнения",et:"Tekstülesanded võrrandiga",en:"Word problems with equations"},tpl:["wordEq"]},
 {id:"func",start:22,name:{ru:"Пропорциональность, линейная функция",et:"Võrdeline sõltuvus, lineaarfunktsioon",en:"Proportionality, linear functions"},tpl:["linFunc","proportion"]},
 {id:"poly",start:28,name:{ru:"Многоугольники, параллелограмм, ромб",et:"Hulknurgad, rööpkülik, romb",en:"Polygons, parallelograms, rhombi"},tpl:["polyAngles","quadArea"]},
 {id:"prism",start:31,name:{ru:"Прямая призма",et:"Püstprisma",en:"Right prisms"},tpl:["prism"]},
 {id:"stat",start:33,name:{ru:"Статистика и вероятность",et:"Statistika ja tõenäosus",en:"Statistics and probability"},tpl:["stat","prob"]},
];
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

function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

/* buildTest(opts): opts={date, level:'n'|'a'|'o', type:'theme'|'period', lang, seed, seenOly:[]} */
function buildTest(opts){
  setLang(opts.lang||"ru");
  const R=mkR(opts.seed);
  const pos=schoolPos(opts.date);
  const cov=coveredTopics(pos.weeks);
  const covIds=new Set(cov.map(t=>t.id));covIds.add("r6");
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

root.GEN={buildTest,score,isFilled,parseNum,TOPICS,PERIODS,schoolPos,coveredTopics,currentTopics,TPL,OLY,PROOFS,setLang,tr,hashStr,Q,mkR};
})(typeof window!=="undefined"?window:globalThis);
