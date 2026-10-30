/* Math Check: задания 6 класса. Программа — максимум из Эстонии (6 кл.), РФ (Виленкин, 6 кл.) и СССР (6 кл. десятилетки, по глубине).
   Общие помощники — из core.js (GEN.H). Темы с префиксом g6, чтобы не пересекаться с другими классами. */
(function () {
"use strict";
const {curLang,gcd,L,MINUS,N,P,Q,T_ANS,ansHtml,decPlaces,decStr,evalE,expAddSub,fracHtml,lcm,numAns,numHtml,opSym,plainOf,q,qh,rDec,rFrac,rInt,renderE,stepList,stepsE,tr}=GEN.H;
const O=(ru,et,en)=>({ru,et,en});
const t3=(ru,et,en)=>tr({ru,et,en});
const fh=v=>numHtml(q(v),"mixed");                     // дробь для показа: 1 2/3
const fp=v=>{v=q(v);const n=Math.abs(v.n),d=v.d,s=v.n<0?"-":"";if(d===1)return s+n;return n>d?`${s}${Math.floor(n/d)} ${n%d}/${d}`:`${s}${n}/${d}`};
const FR=(n,d)=>fracHtml(n,d);
// несократимая дробь в ответе
function fracAns(v,extra,mixed){v=q(v);return Object.assign({ans:{type:"frac",v:v.v(),mixed:!!mixed},show:mixed?fh(v):numHtml(v,"frac"),plain:mixed?fp(v):(v.d===1?String(v.n):`${v.n}/${v.d}`)},extra||{})}
function choiceAns(v,opts,extra){const o=opts.find(x=>x[0]===v);return Object.assign({ans:{type:"choice",v},opts,show:o[1],plain:v},extra||{})}
const YN=()=>[["y",t3("Да","Jah","Yes")],["n",t3("Нет","Ei","No")]];
const CMP=[[">",">"],["<","<"],["=","="]];
const pos=(R,lo,hi)=>R.int(lo,hi);
const PI=new Q(314,100);
const piTxt=()=>curLang()==="en"?"3.14":"3,14";
const cm=()=>t3("см","cm","cm");
function factStr(n){const out=[];let x=n;for(let p=2;p*p<=x;p++){let k=0;while(x%p===0){x/=p;k++}if(k)out.push(k>1?`${p}${["","","²","³","⁴","⁵","⁶"][k]||"^"+k}`:String(p))}if(x>1)out.push(String(x));return out.join(" · ")}
function digitSum(n){return String(n).split("").reduce((s,c)=>s+ +c,0)}

const TPL={};

/* ===== Повторение 5 класса ===== */
TPL.dec5={topic:"g6r5",pts:1,cnt:{n:4,a:4},title:O("Вычисли","Arvuta","Calculate"),
  gen(R,lvl,cnt){const items=[];const ops=R.shuffle(["+","-","*",":"]);
    for(let i=0;i<cnt;i++){const op=ops[i%4];let a,b;
      if(op===":"){const qt=rDec(R,1,lvl==="n"?9:30).abs();b=lvl==="n"?new Q(R.int(2,9)):rDec(R,1,4).abs();a=qt.mul(b)}
      else if(op==="*"){a=rDec(R,lvl==="n"?1:2,lvl==="n"?9:20).abs();b=lvl==="n"?new Q(R.int(2,9)):rDec(R,1,9).abs()}
      else{a=rDec(R,lvl==="n"?1:2,lvl==="n"?30:80).abs();b=rDec(R,lvl==="n"?2:3,lvl==="n"?20:40).abs();if(op==="-"&&a.v()<b.v())[a,b]=[b,a]}
      const e=N(op,L(a,"dec"),L(b,"dec"));const r=evalE(e);
      const tip=op===":"?t3("При делении на десятичную дробь переносим запятую в делимом и делителе на одинаковое число знаков вправо.","Kümnendmurruga jagamisel nihutame jagatavas ja jagajas koma sama arvu kohtade võrra paremale.","When dividing by a decimal, move the point in both numbers the same number of places to the right.")
        :op==="*"?t3("Умножаем как целые числа, затем отделяем столько знаков после запятой, сколько их в обоих множителях вместе.","Korrutame nagu täisarve ja eraldame komaga nii mitu kohta, kui palju on mõlemas teguris kokku.","Multiply as whole numbers, then count the decimal places of both factors together.")
        :t3("Записываем числа запятая под запятой и считаем поразрядно.","Kirjutame arvud koma koma alla ja arvutame järkude kaupa.","Line up the decimal points and work place by place.");
      items.push(numAns(r,{q:renderE(e),exp:P(tip)+P(`${renderE(e)} = ${qh(r)}`)}))}
    return {items}}};

/* ===== Делимость ===== */
const RULES={2:O("последняя цифра чётная","viimane number on paaris","the last digit is even"),3:O("сумма цифр делится на 3","ristsumma jagub 3-ga","the digit sum is divisible by 3"),
  5:O("последняя цифра 0 или 5","viimane number on 0 või 5","the last digit is 0 or 5"),9:O("сумма цифр делится на 9","ristsumma jagub 9-ga","the digit sum is divisible by 9"),
  10:O("последняя цифра 0","viimane number on 0","the last digit is 0"),4:O("число из двух последних цифр делится на 4","kahest viimasest numbrist moodustatud arv jagub 4-ga","the number formed by the last two digits is divisible by 4"),
  25:O("две последние цифры 00, 25, 50 или 75","kaks viimast numbrit on 00, 25, 50 või 75","the last two digits are 00, 25, 50 or 75"),6:O("делится и на 2, и на 3","jagub nii 2-ga kui ka 3-ga","divisible by both 2 and 3"),
  15:O("делится и на 3, и на 5","jagub nii 3-ga kui ka 5-ga","divisible by both 3 and 5"),18:O("делится и на 2, и на 9","jagub nii 2-ga kui ka 9-ga","divisible by both 2 and 9")};
TPL.divRules={topic:"g6div",pts:1,cnt:{n:4,a:4},title:O("Делится ли число?","Kas arv jagub?","Is it divisible?"),
  gen(R,lvl,cnt){const items=[];const ks=R.shuffle(lvl==="n"?[2,3,5,9,10,3,9]:[4,25,6,15,18,9,4]);
    for(let i=0;i<cnt;i++){const k=ks[i%ks.length];const yes=R.chance(0.5);
      let n=k*R.int(lvl==="n"?120:1100,lvl==="n"?999:9999);if(!yes)n+=R.int(1,k-1);
      const ok=n%k===0;const extra=(k===3||k===9||k===6||k===15||k===18)?t3(` Сумма цифр: ${digitSum(n)}.`,` Ristsumma: ${digitSum(n)}.`,` Digit sum: ${digitSum(n)}.`):"";
      items.push(choiceAns(ok?"y":"n",YN(),{q:t3(`Делится ли ${n} на ${k}?`,`Kas ${n} jagub arvuga ${k}?`,`Is ${n} divisible by ${k}?`),
        exp:P(t3(`Признак делимости на ${k}: ${tr(RULES[k])}.`,`Arvuga ${k} jaguvuse tunnus: ${tr(RULES[k])}.`,`Test for ${k}: ${tr(RULES[k])}.`)+extra)+P(`${tr(T_ANS)}: ${ok?t3("да","jah","yes"):t3("нет","ei","no")}.`)}))}
    return {items}}};
TPL.primeFact={topic:"g6div",pts:2,cnt:{n:2,a:3},title:O("Разложение на простые множители","Algtegurideks lahutamine","Prime factorisation"),
  gen(R,lvl,cnt){const items=[];const PR=lvl==="n"?[2,2,3,3,5,7]:[2,3,5,7,11,13];
    for(let i=0;i<cnt;i++){const k=lvl==="n"?R.int(3,4):R.int(4,5);const ps=[];for(let j=0;j<k;j++)ps.push(R.pick(PR));ps.sort((a,b)=>a-b);
      const n=ps.reduce((a,b)=>a*b,1);const hide=lvl==="n"?R.int(0,k-1):k-1;const shown=ps.map((p,j)=>j===hide?"□":p).join(" · ");
      const chain=[];let x=n;ps.forEach(p=>{chain.push(`${x} : ${p} = ${x/p}`);x/=p});
      items.push(numAns(ps[hide],{q:t3(`${n} = ${shown}. Найди □.`,`${n} = ${shown}. Leia □.`,`${n} = ${shown}. Find □.`),pre:"□ =",
        exp:P(t3("Делим на простые числа по очереди:","Jagame järjest algarvudega:","Divide by primes one after another:"))+stepList(chain)+P(`${n} = ${factStr(n)}`)}))}
    return {items}}};
TPL.gcdLcm={topic:"g6div",pts:2,cnt:{n:2,a:4},title:O("НОД и НОК","SÜT ja VÜK","GCD and LCM"),
  gen(R,lvl,cnt){const items=[];let a,b;
    for(let i=0;i<cnt;i++){
      if(i%2===0){const g=R.int(2,lvl==="n"?9:18);let m1,m2;do{m1=R.int(2,lvl==="n"?7:12);m2=R.int(2,lvl==="n"?9:15)}while(gcd(m1,m2)!==1||m1===m2);a=g*m1;b=g*m2}
      const G2=gcd(a,b),Lc=a*b/G2;const fac=P(`${a} = ${factStr(a)}, ${b} = ${factStr(b)}`);
      if(i%2===0)items.push(numAns(G2,{q:t3(`НОД(${a}; ${b})`,`SÜT(${a}; ${b})`,`GCD(${a}, ${b})`),exp:fac+P(t3(`НОД — произведение общих простых множителей: ${G2}.`,`SÜT on ühiste algtegurite korrutis: ${G2}.`,`GCD is the product of the common prime factors: ${G2}.`))}));
      else items.push(numAns(Lc,{q:t3(`НОК(${a}; ${b})`,`VÜK(${a}; ${b})`,`LCM(${a}, ${b})`),exp:fac+P(t3(`НОК = ${a} · ${b} : НОД = ${a*b} : ${G2} = ${Lc}.`,`VÜK = ${a} · ${b} : SÜT = ${a*b} : ${G2} = ${Lc}.`,`LCM = ${a} · ${b} ÷ GCD = ${a*b} ÷ ${G2} = ${Lc}.`))}))}
    return {items}}};
TPL.gcdWord={topic:"g6div",pts:3,cnt:{n:1,a:2},title:O("Реши задачу","Lahenda ülesanne","Solve the problem"),
  gen(R,lvl,cnt){const items=[];const kinds=R.shuffle(["gcd","lcm"]);
    for(let i=0;i<cnt;i++){
      if(kinds[i%2]==="gcd"){const g=R.int(4,lvl==="n"?9:14);let m1,m2;do{m1=R.int(3,9);m2=R.int(2,8)}while(gcd(m1,m2)!==1||m1===m2);const a=g*m1,b=g*m2;
        items.push(numAns(g,{q:t3(`Из ${a} красных и ${b} белых роз составили одинаковые букеты, использовав все цветы. Какое наибольшее число букетов могло получиться?`,`${a} punasest ja ${b} valgest roosist tehti ühesugused kimbud, kasutades kõik lilled. Kui palju kimpe sai kõige rohkem olla?`,`${a} red and ${b} white roses were made into identical bouquets using all the flowers. What is the greatest possible number of bouquets?`),
          exp:P(t3(`Число букетов делит и ${a}, и ${b}; наибольшее такое число — НОД(${a}; ${b}) = ${g}. В каждом букете ${m1} красных и ${m2} белых.`,`Kimpude arv jagab nii arvu ${a} kui ka ${b}; suurim selline arv on SÜT(${a}; ${b}) = ${g}. Igas kimbus on ${m1} punast ja ${m2} valget.`,`The number of bouquets divides both ${a} and ${b}; the greatest is GCD(${a}, ${b}) = ${g}. Each has ${m1} red and ${m2} white.`))}))}
      else{let p1,p2;do{p1=R.pick([6,8,9,10,12,15]);p2=R.pick([8,10,12,14,15,18,20])}while(p1===p2);const Lc=p1*p2/gcd(p1,p2);
        items.push(numAns(Lc,{unit:t3("мин","min","min"),q:t3(`Два автобуса отправляются с остановки в 8:00. Первый ходит каждые ${p1} мин, второй — каждые ${p2} мин. Через сколько минут они снова отправятся одновременно?`,`Kaks bussi väljuvad peatusest kell 8.00. Esimene sõidab iga ${p1} min järel, teine iga ${p2} min järel. Mitme minuti pärast väljuvad nad jälle korraga?`,`Two buses leave a stop at 8:00. One runs every ${p1} min, the other every ${p2} min. After how many minutes do they leave together again?`),
          exp:P(t3(`Нужно наименьшее число, которое делится и на ${p1}, и на ${p2}: НОК(${p1}; ${p2}) = ${Lc}.`,`Vaja on vähimat arvu, mis jagub nii ${p1}-ga kui ka ${p2}-ga: VÜK(${p1}; ${p2}) = ${Lc}.`,`We need the least number divisible by both ${p1} and ${p2}: LCM(${p1}, ${p2}) = ${Lc}.`))}))}}
    return {items}}};

/* ===== Основное свойство дроби ===== */
TPL.fracReduce={topic:"g6frac",pts:1,cnt:{n:4,a:4},title:O("Сократи дробь","Taanda murd","Simplify the fraction"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){let a,b;do{b=R.int(2,lvl==="n"?9:15);a=R.int(1,b-1)}while(gcd(a,b)!==1);const k=R.int(2,lvl==="n"?8:16);
      const n=a*k,d=b*k;
      items.push(fracAns(new Q(a,b),{q:FR(n,d)+" =",exp:P(t3(`НОД(${n}; ${d}) = ${k}. Делим числитель и знаменатель на ${k}.`,`SÜT(${n}; ${d}) = ${k}. Jagame lugeja ja nimetaja ${k}-ga.`,`GCD(${n}, ${d}) = ${k}. Divide top and bottom by ${k}.`))+P(`${FR(n,d)} = ${FR(a,b)}`),hint:t3("ответ — несократимая дробь","vastus — taandumatu murd","answer as a fraction in lowest terms")}))}
    return {items}}};
TPL.fracCompare={topic:"g6frac",pts:1,cnt:{n:3,a:4},title:O("Сравни дроби (>, < или =)","Võrdle murde (>, < või =)","Compare (>, < or =)"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){let a,b,c,d;
      do{b=R.int(3,lvl==="n"?10:16);d=R.int(3,lvl==="n"?10:16);a=R.int(1,b-1);c=R.int(1,d-1)}while(b===d||(lvl==="a"&&Math.abs(a/b-c/d)>0.12));
      if(R.chance(0.12)){const k=R.int(2,4);c=a*k;d=b*k}
      const L2=lcm(b,d),A=a*L2/b,C=c*L2/d;const v=A>C?">":A<C?"<":"=";
      items.push(choiceAns(v,CMP,{q:`${FR(a,b)} ☐ ${FR(c,d)}`,exp:P(t3(`Общий знаменатель ${L2}: ${FR(A,L2)} и ${FR(C,L2)}.`,`Ühine nimetaja ${L2}: ${FR(A,L2)} ja ${FR(C,L2)}.`,`Common denominator ${L2}: ${FR(A,L2)} and ${FR(C,L2)}.`))+P(`${FR(a,b)} ${v} ${FR(c,d)}`)}))}
    return {items}}};

/* ===== Сложение и вычитание дробей ===== */
TPL.fracAddSub={topic:"g6fadd",pts:1,cnt:{n:5,a:5},title:O("Вычисли","Arvuta","Calculate"),
  gen(R,lvl,cnt){const items=[];const D=lvl==="n"?[2,3,4,5,6,8,9,10,12]:[4,6,8,9,10,12,14,15,18];
    for(let i=0;i<cnt;i++){const op=i%2?"-":"+";let a=rFrac(R,D,lvl==="n"?0:5).abs(),b=rFrac(R,D,lvl==="n"?0:3).abs();
      if(a.d===b.d)b=rFrac(R,D.filter(x=>x!==a.d),lvl==="n"?0:3).abs();
      if(op==="-"&&a.v()<b.v())[a,b]=[b,a];
      let e=N(op,L(a,"mixed"),L(b,b.v()>1?"mixed":"frac"));
      if(lvl==="a"&&i===4){const c=rFrac(R,[2,3,4,6],0).abs();e=N("+",e,L(c,"frac"))}
      const r=evalE(e);
      items.push(numAns(r,{q:renderE(e),exp:P(t3(`Приводим к общему знаменателю ${lcm(a.d,b.d)}${lvl==="a"?"; у смешанных чисел отдельно считаем целые части, при нехватке занимаем единицу":""}.`,`Viime ühisele nimetajale ${lcm(a.d,b.d)}${lvl==="a"?"; segaarvude täisosad arvutame eraldi, vajadusel laename ühe":""}.`,`Use the common denominator ${lcm(a.d,b.d)}${lvl==="a"?"; for mixed numbers handle whole parts separately and borrow 1 if needed":""}.`))+P(`${tr(T_ANS)}: ${fh(r)}`)}))}
    return {items}}};
TPL.fracAddWord={topic:"g6fadd",pts:3,cnt:{n:1,a:2},title:O("Реши задачу","Lahenda ülesanne","Solve the problem"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){let p1,p2;do{p1=rFrac(R,[3,4,5,6,8],0).abs();p2=rFrac(R,[3,4,5,6,10,12],0).abs()}while(p1.add(p2).v()>=0.95||p1.d===p2.d);
      const rest=new Q(1).sub(p1).sub(p2);
      if(lvl==="a"&&i===1){const pages=lcm(p1.d,p2.d)*R.int(4,10);const left=rest.mul(pages);
        items.push(numAns(left,{q:t3(`В книге ${pages} страниц. В первый день прочитали ${fh(p1)} книги, во второй — ${fh(p2)}. Сколько страниц осталось?`,`Raamatus on ${pages} lehekülge. Esimesel päeval loeti ${fh(p1)} raamatust, teisel ${fh(p2)}. Mitu lehekülge jäi lugeda?`,`A book has ${pages} pages. On day one ${fh(p1)} of it was read, on day two ${fh(p2)}. How many pages are left?`),
          exp:P(`1 ${MINUS} ${fh(p1)} ${MINUS} ${fh(p2)} = ${fh(rest)}`)+P(`${fh(rest)} · ${pages} = ${qh(left)}`)}))}
      else items.push(fracAns(rest,{q:t3(`В первый день прочитали ${fh(p1)} книги, во второй — ${fh(p2)}. Какую часть книги осталось прочитать?`,`Esimesel päeval loeti ${fh(p1)} raamatust, teisel ${fh(p2)}. Milline osa raamatust jäi lugeda?`,`On day one ${fh(p1)} of a book was read, on day two ${fh(p2)}. What part is left?`),
        exp:P(t3("Вся книга — это 1.","Kogu raamat on 1.","The whole book is 1."))+P(`1 ${MINUS} ${fh(p1)} ${MINUS} ${fh(p2)} = ${fh(rest)}`)}))}
    return {items}}};

/* ===== Умножение и деление дробей ===== */
TPL.fracMulDiv={topic:"g6fmul",pts:1,cnt:{n:5,a:5},title:O("Вычисли","Arvuta","Calculate"),
  gen(R,lvl,cnt){const items=[];const D=lvl==="n"?[2,3,4,5,6,8,9]:[3,4,5,6,7,8,9,12];
    for(let i=0;i<cnt;i++){const op=i%2?":":"*";let a,b;
      if(lvl==="n"&&i===4){a=rFrac(R,D,0).abs();b=new Q(R.int(2,12))}else{a=rFrac(R,D,lvl==="n"?0:3).abs();b=rFrac(R,D,lvl==="n"?0:2).abs()}
      const e=N(op,L(a,"mixed"),L(b,b.isInt()?"auto":"mixed"));const r=evalE(e);
      const ex=op==="*"?t3("Смешанные числа записываем неправильными дробями, перемножаем числители и знаменатели, сокращаем.","Segaarvud kirjutame liigmurdudena, korrutame lugejad ja nimetajad ning taandame.","Write mixed numbers as improper fractions, multiply tops and bottoms, simplify.")
        :t3(`Деление заменяем умножением на обратную дробь: ${fh(b)} → ${numHtml(new Q(b.d,b.n),"frac")}.`,`Jagamise asendame pöördarvuga korrutamisega: ${fh(b)} → ${numHtml(new Q(b.d,b.n),"frac")}.`,`Replace division by multiplying by the reciprocal: ${fh(b)} → ${numHtml(new Q(b.d,b.n),"frac")}.`);
      items.push(numAns(r,{q:renderE(e),exp:P(ex)+P(`${tr(T_ANS)}: ${fh(r)}`)}))}
    return {items}}};
TPL.fracOf={topic:"g6fmul",pts:2,cnt:{n:2,a:3},title:O("Дробь от числа и число по дроби","Murd arvust ja arv murru järgi","Fraction of a number"),
  gen(R,lvl,cnt){const items=[];const kinds=["of","by","rest"];
    for(let i=0;i<cnt;i++){const k=kinds[i%3];let f;do{f=rFrac(R,[3,4,5,6,7,8,9],0).abs()}while(f.n===f.d);
      if(k==="of"){const n=f.d*R.int(3,lvl==="n"?12:25);const r=f.mul(n);items.push(numAns(r,{q:t3(`${fh(f)} от ${n}`,`${fh(f)} arvust ${n}`,`${fh(f)} of ${n}`),exp:P(t3("Чтобы найти дробь от числа, умножаем число на эту дробь.","Murru leidmiseks arvust korrutame arvu selle murruga.","To find a fraction of a number, multiply by the fraction."))+P(`${n} · ${fh(f)} = ${qh(r)}`)}))}
      else if(k==="by"){const n=f.d*R.int(3,lvl==="n"?12:25);const part=f.mul(n);items.push(numAns(n,{q:t3(`${fh(f)} числа равны ${qh(part)}. Найди число.`,`${fh(f)} arvust on ${qh(part)}. Leia arv.`,`${fh(f)} of a number is ${qh(part)}. Find the number.`),exp:P(t3("Чтобы найти число по его дроби, делим на эту дробь.","Arvu leidmiseks tema murru järgi jagame selle murruga.","To find a number from its fraction, divide by the fraction."))+P(`${qh(part)} : ${fh(f)} = ${n}`)}))}
      else{const n=f.d*R.int(3,8);const girls=f.mul(n);items.push(numAns(new Q(n).sub(girls),{q:t3(`В классе ${n} учеников, ${fh(f)} из них — девочки. Сколько в классе мальчиков?`,`Klassis on ${n} õpilast, neist ${fh(f)} on tüdrukud. Mitu poissi on klassis?`,`A class has ${n} students, ${fh(f)} of them are girls. How many boys are there?`),exp:P(`${n} · ${fh(f)} = ${qh(girls)}; ${n} ${MINUS} ${qh(girls)} = ${n-girls.v()}`)}))}}
    return {items}}};
TPL.fracExpr={topic:"g6fmul",pts:3,cnt:{n:2,a:3},title:O("Найди значение выражения","Leia avaldise väärtus","Evaluate"),
  gen(R,lvl,cnt){const items=[];const sh=R.shuffle(["A","B","C"]);
    for(let i=0;i<cnt;i++){const D=[2,3,4,5,6,8];const f=()=>rFrac(R,D,lvl==="n"?0:2).abs();let e;
      if(sh[i%3]==="A")e=N("*",N("+",L(f(),"mixed"),L(f(),"mixed")),L(new Q(R.int(2,12)),"auto"));
      else if(sh[i%3]==="B"){const a=f(),b=f();e=N("-",N(":",L(a,"mixed"),L(b,"mixed")),L(rFrac(R,[2,3,4],0).abs(),"frac"));if(evalE(e).sgn()<0)e=N("+",e.a,e.b)}
      else e=N(":",N("-",L(new Q(R.int(2,5)),"auto"),L(f(),"mixed")),L(f(),"mixed"));
      if(evalE(e).sgn()<0){i--;continue}
      const st=[];const r=stepsE(e,"mixed",st);items.push(numAns(r,{q:renderE(e),exp:P(t3("Сначала скобки, затем умножение и деление, потом сложение и вычитание.","Kõigepealt sulud, siis korrutamine ja jagamine, lõpuks liitmine ja lahutamine.","Brackets first, then × and ÷, then + and −."))+stepList(st)}))}
    return {items}}};

/* ===== Обыкновенные и десятичные дроби ===== */
const PER=[[1,3],[2,3],[1,6],[5,6],[2,9],[7,9],[1,11],[5,11],[7,12],[4,15],[1,12],[8,33]];
function perStr(n,d){ // 5/11 -> "0,(45)"
  const w=Math.floor(n/d);let r=n%d;const seen={},digs=[];while(r&&seen[r]==null){seen[r]=digs.length;r*=10;digs.push(Math.floor(r/d));r%=d}
  const sep=curLang()==="en"?".":",";if(!r)return w+sep+digs.join("");const s=seen[r];return w+sep+digs.slice(0,s).join("")+"("+digs.slice(s).join("")+")"}
TPL.fracToDec={topic:"g6fdec",pts:1,cnt:{n:4,a:4},title:O("Запиши в виде десятичной дроби","Kirjuta kümnendmurruna","Write as a decimal"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){
      if(lvl==="a"&&i%2===1){const [n,d]=R.pick(PER);const v=new Q(n,d);const it=numAns(v,{q:FR(n,d)+" =",exp:P(t3(`Делим ${n} на ${d} уголком; остатки начинают повторяться, значит дробь периодическая.`,`Jagame ${n} arvuga ${d}; jäägid hakkavad korduma, seega on murd perioodiline.`,`Long-divide ${n} by ${d}; the remainders repeat, so the decimal recurs.`))+P(`${FR(n,d)} = ${perStr(n,d)}`),hint:t3("период пиши в скобках: 0,(3)","periood kirjuta sulgudesse: 0,(3)","put the repeating part in brackets: 0.(3)")});it.ans.round=false;it.show=perStr(n,d);it.plain=perStr(n,d);items.push(it);continue}
      const d=R.pick([2,4,5,8,20,25,40,50]);let n;do{n=R.int(1,d*(lvl==="n"?1:3)-1)}while(gcd(n,d)!==1);const v=new Q(n,d);
      const k=Math.max(...[2,5].map(p=>{let c=0,x=d;while(x%p===0){x/=p;c++}return c}));const m=Math.pow(10,k)/d;
      items.push(numAns(v,{q:FR(n,d)+" =",exp:P(t3(`Домножаем знаменатель до ${Math.pow(10,k)}: ${FR(n,d)} = ${FR(n*m,Math.pow(10,k))}.`,`Laiendame nimetaja arvuni ${Math.pow(10,k)}: ${FR(n,d)} = ${FR(n*m,Math.pow(10,k))}.`,`Expand the denominator to ${Math.pow(10,k)}: ${FR(n,d)} = ${FR(n*m,Math.pow(10,k))}.`))+P(`= ${decStr(v)}`)}))}
    return {items}}};
TPL.fdMixed={topic:"g6fdec",pts:2,cnt:{n:3,a:3},title:O("Вычисли (ответ — обыкновенной дробью)","Arvuta (vastus harilikus murrus)","Calculate (answer as a fraction)"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const a=R.pick([new Q(1,4),new Q(3,4),new Q(1,2),new Q(2,5),new Q(3,5),new Q(1,5),new Q(5,4),new Q(7,20)]);const b=rFrac(R,[3,6,7,9,12],0).abs();
      let e=N(R.pick(["+","-"]),L(a,"dec"),L(b,"frac"));if(evalE(e).sgn()<0)e=N("+",e.a,e.b);
      if(lvl==="a")e=N("*",e,L(new Q(R.pick([2,3,4,6,12])),"auto"));
      const r=evalE(e);
      items.push(numAns(r,{q:renderE(e),exp:P(t3(`${decStr(a)} = ${FR(a.n,a.d)}: переводим десятичную дробь в обыкновенную, потому что ${fh(b)} в конечную десятичную не переводится.`,`${decStr(a)} = ${FR(a.n,a.d)}: kirjutame kümnendmurru harilikuna, sest ${fh(b)} ei ole lõplik kümnendmurd.`,`${decStr(a)} = ${FR(a.n,a.d)}: turn the decimal into a fraction because ${fh(b)} has no finite decimal.`))+P(`${tr(T_ANS)}: ${fh(r)}`)}))}
    return {items}}};

/* ===== Отношения, пропорции, масштаб ===== */
TPL.ratio={topic:"g6ratio",pts:1,cnt:{n:3,a:3},title:O("Отношения","Suhe","Ratios"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const k=i%3;
      if(k===0){const b=R.int(2,lvl==="n"?20:40),m=lvl==="n"?R.int(2,9):R.pick([new Q(5,2),new Q(3,2),new Q(15,4),new Q(12,5)]);const a=q(m).mul(b);
        items.push(numAns(q(m),{q:t3(`Во сколько раз ${qh(a)} больше ${b}?`,`Mitu korda on ${qh(a)} suurem kui ${b}?`,`How many times greater is ${qh(a)} than ${b}?`),exp:P(`${qh(a)} : ${b} = ${qh(q(m))}`)}))}
      else if(k===1){let a,b;do{b=R.int(4,lvl==="n"?30:90);a=R.int(1,b-1)}while(gcd(a,b)===1);const v=new Q(a,b);
        items.push(fracAns(v,{q:t3(`Какую часть число ${a} составляет от ${b}?`,`Millise osa moodustab ${a} arvust ${b}?`,`What part of ${b} is ${a}?`),exp:P(`${FR(a,b)} = ${numHtml(v,"frac")}`)}))}
      else{const a=R.int(2,9)*R.int(2,6),b=R.int(2,9)*R.int(2,6);const v=new Q(a,b);
        items.push(fracAns(v,{q:t3(`Запиши отношение ${a} : ${b} несократимой дробью.`,`Kirjuta suhe ${a} : ${b} taandumatu murruna.`,`Write the ratio ${a} : ${b} as a fraction in lowest terms.`),exp:P(t3(`Делим оба числа на НОД(${a}; ${b}) = ${gcd(a,b)}.`,`Jagame mõlemad arvud SÜT(${a}; ${b}) = ${gcd(a,b)}-ga.`,`Divide both by GCD(${a}, ${b}) = ${gcd(a,b)}.`))+P(`${a} : ${b} = ${numHtml(v,"frac")}`)}))}}
    return {items}}};
TPL.propEq={topic:"g6ratio",pts:2,cnt:{n:3,a:3},title:O("Найди неизвестный член пропорции","Leia võrde tundmatu liige","Solve the proportion"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){let a,b,c,x;
      if(lvl==="n"){c=R.int(2,9);x=new Q(R.int(2,15));a=new Q(R.int(2,12));b=x.mul(c).div(a);if(!b.isInt()){i--;continue}}
      else{c=rDec(R,1,6).abs();x=rDec(R,1,9).abs();a=rFrac(R,[2,3,4,5],1).abs();b=x.mul(c).div(a);if(decPlaces(b)<0&&b.d>12){i--;continue}}
      const form=i%2;const qq=form?`x : ${fh(a)} = ${fh(b)} : ${qh(q(c))}`:`${fh(a)} : x = ${qh(q(c))} : ${fh(b)}`;
      const xv=form?q(a).mul(b).div(c):q(a).mul(b).div(c);
      items.push(numAns(xv,{q:qq,pre:"x =",exp:P(t3("Произведение крайних членов равно произведению средних.","Välisliikmete korrutis võrdub keskliikmete korrutisega.","The product of the extremes equals the product of the means."))+P(`x = ${fh(a)} · ${fh(b)} : ${qh(q(c))} = ${fh(xv)}`)}))}
    return {items}}};
TPL.scale={topic:"g6ratio",pts:2,cnt:{n:2,a:2},title:O("Масштаб","Mõõtkava","Scale"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const M=lvl==="n"?R.pick([10000,20000,50000,100000]):R.pick([250000,500000,2000000,2500000]);
      if(i%2===0){const d=rDec(R,1,lvl==="n"?9:14).abs();const km=d.mul(M).div(100000);
        items.push(numAns(km,{unit:t3("км","km","km"),q:t3(`Масштаб карты 1 : ${M.toLocaleString("ru-RU")}. Расстояние на карте ${qh(d)} см. Каково расстояние на местности?`,`Kaardi mõõtkava on 1 : ${M.toLocaleString("ru-RU")}. Kaugus kaardil on ${qh(d)} cm. Kui suur on kaugus looduses?`,`Map scale 1 : ${M.toLocaleString("en-GB")}. The distance on the map is ${qh(d)} cm. What is the real distance?`),
          exp:P(`${qh(d)} · ${M} = ${qh(d.mul(M))} ${cm()} = ${qh(km)} ${t3("км","km","km")}`)}))}
      else{const km=new Q(R.int(2,40)*M/100000/ (lvl==="n"?2:1));const d=km.mul(100000).div(M);
        items.push(numAns(d,{unit:cm(),q:t3(`Масштаб карты 1 : ${M.toLocaleString("ru-RU")}. Расстояние на местности ${qh(km)} км. Каким будет расстояние на карте?`,`Kaardi mõõtkava on 1 : ${M.toLocaleString("ru-RU")}. Kaugus looduses on ${qh(km)} km. Kui suur on see kaardil?`,`Map scale 1 : ${M.toLocaleString("en-GB")}. The real distance is ${qh(km)} km. How long is it on the map?`),
          exp:P(`${qh(km)} ${t3("км","km","km")} = ${qh(km.mul(100000))} ${cm()}; ${qh(km.mul(100000))} : ${M} = ${qh(d)} ${cm()}`)}))}}
    return {items}}};
TPL.dirInv={topic:"g6propr",pts:3,cnt:{n:2,a:2},title:O("Прямая и обратная пропорциональность","Võrdeline ja pöördvõrdeline sõltuvus","Direct and inverse proportion"),
  gen(R,lvl,cnt){const items=[];const kinds=R.shuffle(["dir","inv"]);
    for(let i=0;i<cnt;i++){
      if(kinds[i%2]==="dir"){const n1=R.int(3,8),price=rDec(R,1,4).abs(),n2=R.int(2,15);const c1=price.mul(n1),c2=price.mul(n2);
        items.push(numAns(c2,{unit:"€",q:t3(`${n1} тетрадей стоят ${qh(c1)} €. Сколько стоят ${n2} таких тетрадей?`,`${n1} vihikut maksavad ${qh(c1)} €. Kui palju maksavad ${n2} sellist vihikut?`,`${n1} notebooks cost ${qh(c1)} €. How much do ${n2} of them cost?`),
          exp:P(t3("Величины прямо пропорциональны: во сколько раз больше тетрадей, во столько раз больше стоимость.","Suurused on võrdelised: mitu korda rohkem vihikuid, mitu korda suurem hind.","Directly proportional: more notebooks, proportionally higher cost."))+P(`${qh(c1)} : ${n1} · ${n2} = ${qh(c2)} €`)}))}
      else{const w=lvl==="n"?R.pick([[6,12,9],[4,15,6],[8,9,12],[5,12,6]]):R.pick([[60,4,80],[45,6,54],[72,5,90],[50,9,75]]);const ans=new Q(w[0]*w[1],w[2]);
        const qq=lvl==="n"?t3(`${w[0]} рабочих выполняют работу за ${w[1]} дней. За сколько дней выполнят эту работу ${w[2]} рабочих?`,`${w[0]} töölist teevad töö ${w[1]} päevaga. Mitme päevaga teevad selle ${w[2]} töölist?`,`${w[0]} workers do a job in ${w[1]} days. How many days will ${w[2]} workers need?`)
          :t3(`Со скоростью ${w[0]} км/ч путь проехали за ${w[1]} ч. За сколько часов проедут этот путь со скоростью ${w[2]} км/ч?`,`Kiirusega ${w[0]} km/h läbiti tee ${w[1]} tunniga. Mitme tunniga läbitakse see kiirusega ${w[2]} km/h?`,`At ${w[0]} km/h the trip took ${w[1]} h. How long at ${w[2]} km/h?`);
        items.push(numAns(ans,{q:qq,exp:P(t3("Величины обратно пропорциональны: их произведение постоянно.","Suurused on pöördvõrdelised: nende korrutis on jääv.","Inversely proportional: the product stays the same."))+P(`${w[0]} · ${w[1]} : ${w[2]} = ${qh(ans)}`)}))}}
    return {items}}};

/* ===== Проценты, круговая диаграмма ===== */
TPL.pct6={topic:"g6pct",pts:2,cnt:{n:3,a:3},title:O("Проценты","Protsendid","Percentages"),
  gen(R,lvl,cnt){const items=[];const ks=R.shuffle(["of","by","what"]);
    for(let i=0;i<cnt;i++){const k=ks[i%3];const p=lvl==="n"?R.pick([10,20,25,50,5,15,30,75]):R.pick([12.5,35,45,120,8,62.5,150]);const pq=q(p);
      if(k==="of"){const a=new Q(R.int(2,40)*(lvl==="n"?20:40));const r=a.mul(pq).div(100);items.push(numAns(r,{q:t3(`${qh(pq)}% от ${qh(a)}`,`${qh(pq)}% arvust ${qh(a)}`,`${qh(pq)}% of ${qh(a)}`),exp:P(`${qh(a)} · ${qh(pq.div(100))} = ${qh(r)}`)}))}
      else if(k==="by"){const n=new Q(R.int(2,30)*(lvl==="n"?20:40));const part=n.mul(pq).div(100);items.push(numAns(n,{q:t3(`${qh(pq)}% числа равны ${qh(part)}. Найди число.`,`${qh(pq)}% arvust on ${qh(part)}. Leia arv.`,`${qh(pq)}% of a number is ${qh(part)}. Find the number.`),exp:P(`${qh(part)} : ${qh(pq.div(100))} = ${qh(n)}`)}))}
      else{const b=new Q(R.int(2,25)*20);const a=b.mul(pq).div(100);items.push(numAns(pq,{unit:"%",q:t3(`Сколько процентов составляет ${qh(a)} от ${qh(b)}?`,`Mitu protsenti moodustab ${qh(a)} arvust ${qh(b)}?`,`What percentage of ${qh(b)} is ${qh(a)}?`),exp:P(`${qh(a)} : ${qh(b)} · 100% = ${qh(pq)}%`)}))}}
    return {items}}};
const PIE_NAMES=[O("Футбол","Jalgpall","Football"),O("Плавание","Ujumine","Swimming"),O("Шахматы","Male","Chess"),O("Танцы","Tantsimine","Dance"),O("Баскетбол","Korvpall","Basketball")];
const PIE_COL=["#f46b57","#5ec2b7","#f5c84c","#9b97f2","#6fa8f5"];
function svgPie(parts,names){let a0=-Math.PI/2,s=`<svg class="sk pie" viewBox="0 0 320 170" role="img">`;
  parts.forEach((p,i)=>{const a1=a0+p/100*2*Math.PI;const x0=85+75*Math.cos(a0),y0=85+75*Math.sin(a0),x1=85+75*Math.cos(a1),y1=85+75*Math.sin(a1);
    s+=`<path d="M85 85 L${x0.toFixed(1)} ${y0.toFixed(1)} A75 75 0 ${p>50?1:0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${PIE_COL[i]}" stroke="#fff" stroke-width="2"/>`;
    s+=`<rect x="180" y="${22+i*28}" width="14" height="14" rx="4" fill="${PIE_COL[i]}"/><text x="202" y="${34+i*28}" font-size="14" fill="currentColor">${names[i]} — ${p}%</text>`;a0=a1});
  return s+`</svg>`}
TPL.pie={topic:"g6pct",pts:2,cnt:{n:2,a:3},title:O("Круговая диаграмма","Sektordiagramm","Pie chart"),
  gen(R,lvl,cnt){const k=R.int(3,4);let parts;do{parts=[];let left=100;for(let j=0;j<k-1;j++){const p=R.int(2,Math.min(9,left/5-(k-1-j)*2))*5;parts.push(p);left-=p}parts.push(left)}while(parts.some(p=>p<5)||new Set(parts).size<k);
    const names=R.shuffle(PIE_NAMES).slice(0,k).map(tr);const total=R.int(2,12)*20;
    const intro=t3(`${total} учеников выбрали любимый вид спорта. Результаты — на диаграмме.`,`${total} õpilast valisid oma lemmikspordiala. Tulemused on diagrammil.`,`${total} students chose their favourite sport. The results are in the chart.`)+svgPie(parts,names);
    const items=[];const i1=R.int(0,k-1);const c1=total*parts[i1]/100;
    items.push(numAns(c1,{q:t3(`Сколько учеников выбрали «${names[i1]}»?`,`Mitu õpilast valis «${names[i1]}»?`,`How many chose “${names[i1]}”?`),exp:P(`${total} · ${parts[i1]}% = ${qh(q(c1))}`)}));
    let i2;do{i2=R.int(0,k-1)}while(i2===i1);const diff=Math.abs(parts[i1]-parts[i2])*total/100;
    items.push(numAns(q(diff),{q:t3(`На сколько учеников больше выбрали «${parts[i1]>parts[i2]?names[i1]:names[i2]}», чем «${parts[i1]>parts[i2]?names[i2]:names[i1]}»?`,`Mitu õpilast rohkem valis «${parts[i1]>parts[i2]?names[i1]:names[i2]}» kui «${parts[i1]>parts[i2]?names[i2]:names[i1]}»?`,`How many more chose “${parts[i1]>parts[i2]?names[i1]:names[i2]}” than “${parts[i1]>parts[i2]?names[i2]:names[i1]}”?`),exp:P(`${Math.abs(parts[i1]-parts[i2])}% · ${total} = ${qh(q(diff))}`)}));
    if(lvl==="a"){const i3=R.int(0,k-1);const deg=q(parts[i3]).mul(360).div(100);items.push(numAns(deg,{unit:"°",q:t3(`Сколько градусов составляет сектор «${names[i3]}»?`,`Mitu kraadi on sektor «${names[i3]}»?`,`How many degrees is the “${names[i3]}” sector?`),exp:P(`360° · ${parts[i3]}% = ${qh(deg)}°`)}))}
    return {intro,items:items.slice(0,cnt)}}};

/* ===== Окружность и круг ===== */
TPL.circle={topic:"g6circ",pts:2,cnt:{n:2,a:3},title:O("Окружность и круг (π ≈ 3,14)","Ringjoon ja ring (π ≈ 3,14)","Circles (π ≈ 3.14)"),
  gen(R,lvl,cnt){const r=new Q(R.int(lvl==="n"?2:15,lvl==="n"?12:95),lvl==="n"?1:10);const C=PI.mul(r).mul(2),S=PI.mul(r).mul(r);const Sr=new Q(Math.round(S.v()*100),100);
    const intro=t3(`Радиус круга ${qh(r)} см.`,`Ringi raadius on ${qh(r)} cm.`,`The radius of a circle is ${qh(r)} cm.`);
    const items=[numAns(C,{tol:0.05,unit:cm(),q:t3("Длина окружности","Ringjoone pikkus","Circumference"),pre:"C =",exp:P(`C = 2πr = 2 · ${piTxt()} · ${qh(r)} = ${qh(C)} ${cm()}`)}),
      numAns(Sr,{tol:0.06,unit:cm()+"²",q:t3("Площадь круга (округли до сотых)","Ringi pindala (ümarda sajandikeni)","Area (round to hundredths)"),pre:"S =",exp:P(`S = πr² = ${piTxt()} · ${qh(r)}² ≈ ${qh(Sr)} ${cm()}²`)})];
    if(lvl==="a"){const ang=R.pick([90,60,120,45,30]);const Ss=S.mul(ang).div(360);const Sv=new Q(Math.round(Ss.v()*100),100);
      items.push(numAns(Sv,{tol:0.06,unit:cm()+"²",q:t3(`Площадь сектора с углом ${ang}° (округли до сотых)`,`Sektori pindala, kui kesknurk on ${ang}° (ümarda sajandikeni)`,`Area of a ${ang}° sector (round to hundredths)`),pre:"S =",exp:P(t3(`Сектор ${ang}° — это ${FR(ang,360)} круга.`,`${ang}° sektor on ${FR(ang,360)} ringist.`,`A ${ang}° sector is ${FR(ang,360)} of the circle.`))+P(`S = ${qh(Sr)} · ${ang} : 360 ≈ ${qh(Sv)} ${cm()}²`)}))}
    return {intro,items:items.slice(0,cnt)}}};
TPL.circleBack={topic:"g6circ",pts:2,cnt:{n:1,a:2},title:O("Найди радиус (π ≈ 3,14)","Leia raadius (π ≈ 3,14)","Find the radius (π ≈ 3.14)"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const r=new Q(R.int(2,lvl==="n"?20:40),lvl==="n"?1:2);
      if(i===0){const C=PI.mul(r).mul(2);items.push(numAns(r,{unit:cm(),q:t3(`Длина окружности ${qh(C)} см. Найди радиус.`,`Ringjoone pikkus on ${qh(C)} cm. Leia raadius.`,`The circumference is ${qh(C)} cm. Find the radius.`),pre:"r =",exp:P(`r = C : (2π) = ${qh(C)} : ${curLang()==="en"?"6.28":"6,28"} = ${qh(r)} ${cm()}`)}))}
      else{const ring=r.add(R.int(1,4));const S=PI.mul(ring.mul(ring).sub(r.mul(r)));const Sr=new Q(Math.round(S.v()*100),100);
        items.push(numAns(Sr,{tol:0.06,unit:cm()+"²",q:t3(`Радиусы двух окружностей с общим центром ${qh(ring)} см и ${qh(r)} см. Найди площадь кольца между ними.`,`Kahe samakeskse ringjoone raadiused on ${qh(ring)} cm ja ${qh(r)} cm. Leia nendevahelise rõnga pindala.`,`Two circles with a common centre have radii ${qh(ring)} cm and ${qh(r)} cm. Find the area of the ring between them.`),pre:"S =",exp:P(`S = π(R² ${MINUS} r²) = ${piTxt()} · (${qh(ring.mul(ring))} ${MINUS} ${qh(r.mul(r))}) ≈ ${qh(Sr)} ${cm()}²`)}))}}
    return {items}}};

/* ===== Рациональные числа: ось, модуль, сравнение ===== */
TPL.axis={topic:"g6ratn",pts:1,cnt:{n:4,a:4},title:O("Числовая ось и модуль","Arvtelg ja absoluutväärtus","Number line and absolute value"),
  gen(R,lvl,cnt){const items=[];const ks=["opp","abs","dist","dist"];
    for(let i=0;i<cnt;i++){const k=ks[i%4];const x=lvl==="n"?new Q(R.nz(-30,30)):rDec(R,1,15);
      if(k==="opp")items.push(numAns(x.neg(),{q:t3(`Число, противоположное числу ${qh(x)}`,`Arvu ${qh(x)} vastandarv`,`The opposite of ${qh(x)}`),exp:P(t3("Противоположное число отличается только знаком.","Vastandarv erineb ainult märgi poolest.","The opposite differs only in sign."))}));
      else if(k==="abs")items.push(numAns(x.abs(),{q:`|${qh(x)}| =`,exp:P(t3("Модуль — расстояние от числа до нуля, он не бывает отрицательным.","Absoluutväärtus on kaugus nullist, see ei ole negatiivne.","Absolute value is the distance to zero, never negative."))}));
      else{const a=lvl==="n"?new Q(R.nz(-20,0)):rDec(R,1,9).abs().neg(),b=lvl==="n"?new Q(R.int(1,20)):rDec(R,1,9);const d=b.sub(a).abs();
        items.push(numAns(d,{q:t3(`Расстояние между точками A(${qh(a)}) и B(${qh(b)})`,`Punktide A(${qh(a)}) ja B(${qh(b)}) vaheline kaugus`,`Distance between A(${qh(a)}) and B(${qh(b)})`),exp:P(`|${qh(b)} ${MINUS} ${qh(a,true)}| = ${qh(d)}`)}))}}
    return {items}}};
TPL.absCmp={topic:"g6ratn",pts:1,cnt:{n:3,a:4},title:O("Сравни числа (>, < или =)","Võrdle arve (>, < või =)","Compare (>, < or =)"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){
      if(lvl==="a"&&i===3){const a=rDec(R,1,9).abs();items.push({ans:{type:"set",vals:[a.v(),-a.v()]},show:`${qh(a)}; ${qh(a.neg())}`,plain:`${plainOf(a)}; ${plainOf(a.neg())}`,q:`|x| = ${qh(a)}`,pre:"x =",hint:t3("два ответа через «;»","kaks vastust, eralda «;»","two answers separated by «;»"),exp:P(t3(`На расстоянии ${qh(a)} от нуля две точки.`,`Nullist kaugusel ${qh(a)} on kaks punkti.`,`Two points are ${qh(a)} away from zero.`))});continue}
      let a=lvl==="n"?new Q(R.nz(-40,20)):rDec(R,2,9),b=lvl==="n"?new Q(R.nz(-40,20)):rDec(R,2,9);let A=a,B=b,qa=qh(a),qb=qh(b);
      if(lvl==="a"&&i===2){A=a.abs();qa=`|${qh(a)}|`}
      const v=A.v()>B.v()?">":A.v()<B.v()?"<":"=";
      items.push(choiceAns(v,CMP,{q:`${qa} ☐ ${qb}`,exp:P(t3("Из двух чисел больше то, что правее на числовой оси; из двух отрицательных больше то, у которого модуль меньше.","Kahest arvust on suurem see, mis asub arvteljel paremal; kahest negatiivsest on suurem see, mille absoluutväärtus on väiksem.","The larger number lies further right; of two negatives, the one with the smaller absolute value is larger."))+P(`${qa} ${v} ${qb}`)}))}
    return {items}}};

/* ===== Действия с рациональными числами ===== */
TPL.ratAdd={topic:"g6rops",pts:1,cnt:{n:6,a:6},title:O("Вычисли","Arvuta","Calculate"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const op=i%2?"-":"+";const mode=lvl==="n"?"int":i%3===0?"frac":"dec";
      const a=mode==="int"?new Q(R.nz(-60,60)):mode==="frac"?rFrac(R,[2,3,4,5,6,8],2):rDec(R,1,20),b=mode==="int"?new Q(R.nz(-60,60)):mode==="frac"?rFrac(R,[2,3,4,6],1):rDec(R,1,20);
      const e=N(op,L(a,mode==="frac"?"mixed":"auto"),L(b,mode==="frac"?"mixed":"auto"));const r=evalE(e);
      items.push(numAns(r,{q:renderE(e),exp:expAddSub(a,op,b,mode==="frac"?"mixed":"auto")}))}
    return {items}}};
TPL.ratMul={topic:"g6rops",pts:1,cnt:{n:5,a:5},title:O("Выполни действие","Arvuta","Calculate"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){let e;
      if(lvl==="n"){if(i%2){const d=R.nz(-12,12),qt=R.nz(-15,15);e=N(":",L(new Q(d*qt)),L(new Q(d)))}else e=N("*",L(new Q(R.nz(-15,15))),L(new Q(R.nz(-12,12))))}
      else{if(i%2)e=N(":",L(rFrac(R,[3,4,5,6],1),"mixed"),L(rFrac(R,[2,3,4],0),"frac"));else e=N("*",L(rDec(R,1,9),"dec"),L(rDec(R,1,6),"dec"))}
      const r=evalE(e);const lits=[e.a.v.q,e.b.v.q];const neg=lits.filter(x=>x.sgn()<0).length;
      items.push(numAns(r,{q:renderE(e),exp:P(t3(neg===1?"Знаки разные — результат отрицательный.":"Знаки одинаковые — результат положительный.",neg===1?"Märgid on erinevad — tulemus on negatiivne.":"Märgid on samad — tulemus on positiivne.",neg===1?"Different signs — the result is negative.":"Same signs — the result is positive."))+P(`${tr(T_ANS)}: ${ansHtml(r)}`)}))}
    return {items}}};
TPL.ratExpr={topic:"g6rops",pts:3,cnt:{n:2,a:3},title:O("Найди значение выражения","Leia avaldise väärtus","Evaluate"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const n=()=>lvl==="n"?new Q(R.nz(-12,12)):rDec(R,1,9);const s=R.pick(["A","B","C"]);let e;
      if(s==="A"){const dd=R.nz(-6,6);e=N("-",N("*",L(n()),L(n())),N(":",L(new Q(R.nz(-9,9)*dd)),L(new Q(dd))))}
      else if(s==="B")e=N("*",N("+",L(n()),L(n())),N("-",L(n()),L(new Q(R.nz(-9,9)))));
      else e=N("+",L(n()),N("*",L(new Q(R.nz(-5,5))),N("-",L(n()),L(n()))));
      try{const st=[];const r=stepsE(e,"auto",st);items.push(numAns(r,{q:renderE(e),exp:P(t3("Порядок: скобки, умножение и деление, сложение и вычитание. Следи за знаками.","Järjekord: sulud, korrutamine ja jagamine, liitmine ja lahutamine. Jälgi märke.","Order: brackets, × and ÷, + and −. Watch the signs."))+stepList(st)}))}catch(err){i--}}
    return {items}}};

/* ===== Уравнения ===== */
TPL.brackets={topic:"g6eq",pts:2,cnt:{n:3,a:3},title:O("Упрости выражение и найди его значение","Lihtsusta avaldis ja leia selle väärtus","Simplify and evaluate"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const a=R.nz(-6,6),b=R.nz(-9,9),c=R.nz(-6,6),d=R.nz(-9,9);if(a+c===0){i--;continue}
      const x=lvl==="n"?new Q(R.nz(-10,10)):rFrac(R,[2,3,4,5],0);const k=a+c,m=a*b+c*d;
      const term=(co,sgnFirst)=>`${co<0?MINUS+" ":sgnFirst?"":"+ "}${Math.abs(co)===1?"":Math.abs(co)}`;
      const brk=(co,bb,first)=>`${co<0?(first?MINUS:MINUS+" "):first?"":"+ "}${Math.abs(co)}(x ${bb<0?MINUS:"+"} ${Math.abs(bb)})`;
      const expr=`${brk(a,b,true)} ${brk(c,d,false)}`;const simp=`${k===1?"":k===-1?MINUS:k}x ${m<0?MINUS:"+"} ${Math.abs(m)}`;
      const val=x.mul(k).add(m);
      items.push(numAns(val,{q:t3(`${expr} при x = ${fh(x)}`,`${expr}, kui x = ${fh(x)}`,`${expr} when x = ${fh(x)}`),exp:P(t3("Раскрываем скобки и приводим подобные слагаемые:","Avame sulud ja koondame sarnased liikmed:","Expand the brackets and collect like terms:"))+P(`${expr} = ${simp}`)+P(`${k<0?MINUS+Math.abs(k):k} · ${x.sgn()<0?"("+fh(x)+")":fh(x)} ${m<0?MINUS:"+"} ${Math.abs(m)} = ${fh(val)}`)}))}
    return {items}}};
TPL.eqLin={topic:"g6eq",pts:3,cnt:{n:3,a:4},title:O("Реши уравнение","Lahenda võrrand","Solve the equation"),
  gen(R,lvl,cnt){const items=[];const forms=R.shuffle(["ax+b=c","a(x+b)=c","ax+b=cx+d","a(x+b)=c(x+d)"]);
    for(let i=0;i<cnt;i++){const f=forms[i%4];const x=lvl==="n"?new Q(R.nz(-12,12)):rFrac(R,[2,3,4,5],2);let qq,steps;
      const co=v=>v===1?"":v===-1?MINUS:v<0?MINUS+Math.abs(v):String(v);const dv=v=>v<0?`(${MINUS}${Math.abs(v)})`:String(v);const sg=v=>v<0?`${MINUS} ${Math.abs(v)}`:`+ ${v}`;
      if(f==="ax+b=c"){const a=R.nz(-9,9),b=R.nz(-20,20);const c=x.mul(a).add(b);qq=`${co(a)}x ${sg(b)} = ${fh(c)}`;steps=[`${co(a)}x = ${fh(c)} ${b<0?"+":MINUS} ${Math.abs(b)} = ${fh(c.sub(b))}`,`x = ${fh(c.sub(b))} : ${dv(a)} = ${fh(x)}`]}
      else if(f==="a(x+b)=c"){const a=R.nz(-7,7),b=R.nz(-9,9);const c=x.add(b).mul(a);qq=`${co(a)}(x ${sg(b)}) = ${fh(c)}`;steps=[`x ${sg(b)} = ${fh(c)} : ${dv(a)} = ${fh(c.div(a))}`,`x = ${fh(x)}`]}
      else if(f==="ax+b=cx+d"){let a,c;do{a=R.nz(-9,9);c=R.nz(-9,9)}while(a===c);const b=R.nz(-15,15);const d=x.mul(a-c).add(b);qq=`${co(a)}x ${sg(b)} = ${co(c)}x ${d.sgn()<0?MINUS:"+"} ${fh(d.abs())}`;steps=[`${co(a)}x ${c<0?"+":MINUS} ${Math.abs(c)}x = ${fh(d)} ${b<0?"+":MINUS} ${Math.abs(b)}`,`${co(a-c)}x = ${fh(d.sub(b))}`,`x = ${fh(x)}`]}
      else{let a,c;do{a=R.nz(-6,6);c=R.nz(-6,6)}while(a===c);const b=R.nz(-8,8);const d0=x.add(b).mul(a).sub(x.mul(c)).div(c);if(!d0.isInt()&&lvl==="n"){i--;continue}qq=`${co(a)}(x ${sg(b)}) = ${co(c)}(x ${d0.sgn()<0?MINUS:"+"} ${fh(d0.abs())})`;steps=[t3("Раскрываем скобки, переносим x влево, числа вправо.","Avame sulud, viime x-id vasakule, arvud paremale.","Expand, move x terms left, numbers right."),`x = ${fh(x)}`]}
      items.push(numAns(x,{q:qq,pre:"x =",exp:stepList(steps)+P(t3("Проверка: подставь корень в уравнение.","Kontroll: aseta lahend võrrandisse.","Check: substitute the root."))}))}
    return {items}}};
TPL.eqWord={topic:"g6eq",pts:4,cnt:{n:1,a:2},title:O("Реши задачу с помощью уравнения","Lahenda ülesanne võrrandi abil","Solve with an equation"),
  gen(R,lvl,cnt){const items=[];const kinds=R.shuffle(lvl==="n"?["sum","times"]:["sum","times","move","age"]);
    for(let i=0;i<cnt;i++){const k=kinds[i%kinds.length];
      if(k==="sum"){const x=R.int(12,60),d=R.int(4,25);items.push(numAns(x,{q:t3(`Сумма двух чисел ${2*x+d}, одно больше другого на ${d}. Найди меньшее число.`,`Kahe arvu summa on ${2*x+d}, üks on teisest ${d} võrra suurem. Leia väiksem arv.`,`Two numbers add up to ${2*x+d}; one is ${d} more than the other. Find the smaller.`),exp:P(`x + (x + ${d}) = ${2*x+d}; 2x = ${2*x}; x = ${x}`)}))}
      else if(k==="times"){const x=R.int(6,30),m=R.int(2,5);items.push(numAns(x,{q:t3(`В двух корзинах ${x*(m+1)} яблок, в первой в ${m} раза больше, чем во второй. Сколько яблок во второй корзине?`,`Kahes korvis on ${x*(m+1)} õuna, esimeses ${m} korda rohkem kui teises. Mitu õuna on teises korvis?`,`Two baskets hold ${x*(m+1)} apples; the first has ${m} times as many as the second. How many are in the second?`),exp:P(`x + ${m}x = ${x*(m+1)}; ${m+1}x = ${x*(m+1)}; x = ${x}`)}))}
      else if(k==="move"){const v1=R.int(10,18),v2=v1+R.int(2,6),t=R.pick([2,3,new Q(3,2),new Q(5,2)]);const s=q(t).mul(v1+v2);
        items.push(numAns(q(t),{unit:t3("ч","h","h"),q:t3(`Из двух сёл, расстояние между которыми ${qh(s)} км, навстречу друг другу выехали два велосипедиста со скоростями ${v1} км/ч и ${v2} км/ч. Через сколько часов они встретятся?`,`Kahest külast, mille vahemaa on ${qh(s)} km, sõitsid teineteisele vastu kaks jalgratturit kiirustega ${v1} km/h ja ${v2} km/h. Mitme tunni pärast nad kohtuvad?`,`Two cyclists ride towards each other from villages ${qh(s)} km apart at ${v1} km/h and ${v2} km/h. After how many hours do they meet?`),exp:P(`(${v1} + ${v2}) · t = ${qh(s)}; t = ${qh(s)} : ${v1+v2} = ${qh(q(t))}`)}))}
      else{const son=R.int(6,14),diff=R.int(22,32);const y=R.int(2,8);/* через y лет отец старше в m раз — подбираем */let m=null;for(const mm of [2,3,4]){if((son+y)*mm===son+diff+y){m=mm}}
        if(!m){const s2=R.int(4,12),mm=3;const dd=2*(s2+4);items.push(numAns(s2,{q:t3(`Отец старше сына на ${dd} лет. Через 4 года он будет старше сына в ${mm} раза. Сколько лет сыну сейчас?`,`Isa on pojast ${dd} aastat vanem. 4 aasta pärast on ta pojast ${mm} korda vanem. Kui vana on poeg praegu?`,`A father is ${dd} years older than his son. In 4 years he will be ${mm} times as old. How old is the son now?`),exp:P(`${mm}(x + 4) = x + ${dd} + 4; ${mm}x + ${mm*4} = x + ${dd+4}; ${mm-1}x = ${dd+4-mm*4}; x = ${s2}`)}))}
        else items.push(numAns(son,{q:t3(`Отец старше сына на ${diff} лет. Через ${y} года он будет старше сына в ${m} раза. Сколько лет сыну сейчас?`,`Isa on pojast ${diff} aastat vanem. ${y} aasta pärast on ta pojast ${m} korda vanem. Kui vana on poeg praegu?`,`A father is ${diff} years older than his son. In ${y} years he will be ${m} times as old. How old is the son now?`),exp:P(`${m}(x + ${y}) = x + ${diff} + ${y}; x = ${son}`)}))}}
    return {items}}};

/* ===== Координатная плоскость и графики ===== */
TPL.coordPts={topic:"g6coord",pts:2,cnt:{n:3,a:3},title:O("Координатная плоскость","Koordinaattasand","Coordinate plane"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const x1=R.nz(-9,5),x2=R.int(x1+2,10),y1=R.nz(-8,4),y2=R.int(y1+2,9);
      if(i%3===0)items.push(numAns(x2-x1,{q:t3(`Длина отрезка AB, если A(${x1}; ${y1}), B(${x2}; ${y1})`,`Lõigu AB pikkus, kui A(${x1}; ${y1}), B(${x2}; ${y1})`,`Length of AB if A(${x1}; ${y1}), B(${x2}; ${y1})`),exp:P(t3(`Ординаты равны, отрезок параллелен оси x: ${x2} ${MINUS} (${x1}) = ${x2-x1}.`,`Ordinaadid on võrdsed, lõik on x-teljega paralleelne: ${x2} ${MINUS} (${x1}) = ${x2-x1}.`,`Same y, so AB is parallel to the x-axis: ${x2} ${MINUS} (${x1}) = ${x2-x1}.`))}));
      else if(i%3===1)items.push(numAns((x2-x1)*(y2-y1),{q:t3(`Площадь прямоугольника с противоположными вершинами A(${x1}; ${y1}) и C(${x2}; ${y2}) (стороны параллельны осям)`,`Ristküliku pindala, mille vastastipud on A(${x1}; ${y1}) ja C(${x2}; ${y2}) (küljed on telgedega paralleelsed)`,`Area of the rectangle with opposite corners A(${x1}; ${y1}) and C(${x2}; ${y2}) (sides parallel to the axes)`),exp:P(`${x2-x1} · ${y2-y1} = ${(x2-x1)*(y2-y1)}`)}));
      else items.push(numAns(2*((x2-x1)+(y2-y1)),{q:t3(`Периметр прямоугольника с противоположными вершинами A(${x1}; ${y1}) и C(${x2}; ${y2})`,`Ristküliku ümbermõõt, mille vastastipud on A(${x1}; ${y1}) ja C(${x2}; ${y2})`,`Perimeter of the rectangle with opposite corners A(${x1}; ${y1}) and C(${x2}; ${y2})`),exp:P(`2 · (${x2-x1} + ${y2-y1}) = ${2*((x2-x1)+(y2-y1))}`)}))}
    return {items}}};
function svgMotion(pts,T,S){ // pts: [[t,s],...] часы, км
  const W=320,H=200,l=40,b=30,r=12,tp=26;const X=t=>l+(W-l-r)*t/T,Y=s=>H-b-(H-b-tp)*s/S;
  let g=`<svg class="sk graph" viewBox="0 0 ${W} ${H}" role="img"><g stroke="currentColor" stroke-opacity=".15">`;
  for(let t=0;t<=T;t++)g+=`<line x1="${X(t)}" y1="${tp}" x2="${X(t)}" y2="${H-b}"/>`;for(let s=0;s<=S;s+=5)g+=`<line x1="${l}" y1="${Y(s)}" x2="${W-r}" y2="${Y(s)}"/>`;
  g+=`</g><g font-size="11" fill="currentColor">`;for(let t=0;t<=T;t++)g+=`<text x="${X(t)}" y="${H-b+16}" text-anchor="middle">${t}</text>`;const st=S>50?10:5;for(let s=0;s<=S;s+=st)g+=`<text x="${l-6}" y="${Y(s)+4}" text-anchor="end">${s}</text>`;
  g+=`<text x="${W-r}" y="${H-4}" text-anchor="end">t, ${t3("ч","h","h")}</text><text x="4" y="12">s, ${t3("км","km","km")}</text></g>`;
  g+=`<polyline points="${pts.map(p=>X(p[0])+","+Y(p[1])).join(" ")}" fill="none" stroke="#3b6fe0" stroke-width="3" stroke-linejoin="round"/></svg>`;return g}
TPL.graphRead={topic:"g6coord",pts:2,cnt:{n:3,a:3},title:O("График движения","Liikumise graafik","Motion graph"),
  gen(R,lvl,cnt){const v1=R.pick([10,15,20]),t1=R.int(1,3),stop=R.int(1,2),v2=R.pick([5,10,15]),t2=R.int(1,2);const s1=v1*t1,s2=s1+v2*t2;const T=t1+stop+t2;
    const S=Math.ceil((s2+1)/10)*10;const pts=[[0,0],[t1,s1],[t1+stop,s1],[T,s2]];
    const intro=t3("Велосипедист выехал из дома. На графике — расстояние от дома в зависимости от времени.","Jalgrattur sõitis kodust välja. Graafikul on kaugus kodust sõltuvalt ajast.","A cyclist left home. The graph shows the distance from home over time.")+svgMotion(pts,T,S);
    const items=[numAns(s1,{unit:t3("км","km","km"),q:t3(`Какое расстояние он проехал за первые ${t1} ч?`,`Kui pika maa läbis ta esimese ${t1} tunniga?`,`How far did he ride in the first ${t1} h?`),exp:P(t3(`По графику: при t = ${t1} ч расстояние ${s1} км.`,`Graafikult: t = ${t1} h korral on kaugus ${s1} km.`,`From the graph: at t = ${t1} h the distance is ${s1} km.`))}),
      numAns(stop,{unit:t3("ч","h","h"),q:t3("Сколько длилась остановка?","Kui kaua kestis peatus?","How long was the stop?"),exp:P(t3("Остановка — горизонтальный участок графика: расстояние не меняется.","Peatus on graafiku horisontaalne lõik: kaugus ei muutu.","The stop is the flat part: distance doesn't change."))}),
      numAns(lvl==="n"?v1:v2,{unit:t3("км/ч","km/h","km/h"),q:lvl==="n"?t3("С какой скоростью он ехал до остановки?","Millise kiirusega sõitis ta enne peatust?","How fast did he ride before the stop?"):t3("С какой скоростью он ехал после остановки?","Millise kiirusega sõitis ta pärast peatust?","How fast did he ride after the stop?"),
        exp:P(lvl==="n"?`v = ${s1} : ${t1} = ${v1}`:`v = (${s2} ${MINUS} ${s1}) : ${t2} = ${v2}`)})];
    return {intro,items:items.slice(0,cnt)}}};

/* ===== Симметрия ===== */
TPL.symPt={topic:"g6sym",pts:1,cnt:{n:4,a:4},title:O("Симметричные точки","Sümmeetrilised punktid","Symmetric points"),
  gen(R,lvl,cnt){const items=[];const ks=R.shuffle(lvl==="n"?["Ox","Oy","O"]:["O","M","x=c"]);
    for(let i=0;i<cnt;i+=2){const k=ks[(i/2)%ks.length];const a=R.nz(-9,9),b=R.nz(-9,9);let X,Y,what,how;
      if(k==="Ox"){X=a;Y=-b;what=t3("относительно оси x","x-telje suhtes","in the x-axis");how=t3("Абсцисса не меняется, ордината меняет знак.","Abstsiss ei muutu, ordinaat muudab märki.","x stays, y changes sign.")}
      else if(k==="Oy"){X=-a;Y=b;what=t3("относительно оси y","y-telje suhtes","in the y-axis");how=t3("Ордината не меняется, абсцисса меняет знак.","Ordinaat ei muutu, abstsiss muudab märki.","y stays, x changes sign.")}
      else if(k==="O"){X=-a;Y=-b;what=t3("относительно начала координат","koordinaatide alguspunkti suhtes","in the origin");how=t3("Обе координаты меняют знак.","Mõlemad koordinaadid muudavad märki.","Both coordinates change sign.")}
      else if(k==="M"){const m=R.nz(-5,5),n=R.nz(-5,5);X=2*m-a;Y=2*n-b;what=t3(`относительно точки M(${m}; ${n})`,`punkti M(${m}; ${n}) suhtes`,`in the point M(${m}; ${n})`);how=t3(`M — середина отрезка между точками: x = 2 · ${m} ${MINUS} (${a}) = ${X}, y = 2 · ${n} ${MINUS} (${b}) = ${Y}.`,`M on punktide vahelise lõigu keskpunkt: x = 2 · ${m} ${MINUS} (${a}) = ${X}, y = 2 · ${n} ${MINUS} (${b}) = ${Y}.`,`M is the midpoint: x = 2 · ${m} ${MINUS} (${a}) = ${X}, y = 2 · ${n} ${MINUS} (${b}) = ${Y}.`)}
      else{const c=R.nz(-4,4);X=2*c-a;Y=b;what=t3(`относительно прямой x = ${c}`,`sirge x = ${c} suhtes`,`in the line x = ${c}`);how=t3(`Расстояние до прямой сохраняется: x = 2 · ${c} ${MINUS} (${a}) = ${X}, y не меняется.`,`Kaugus sirgest säilib: x = 2 · ${c} ${MINUS} (${a}) = ${X}, y ei muutu.`,`Distance to the line is kept: x = 2 · ${c} ${MINUS} (${a}) = ${X}, y stays.`)}
      items.push(numAns(X,{q:t3(`Точку A(${a}; ${b}) отразили ${what}. Абсцисса новой точки`,`Punkt A(${a}; ${b}) peegeldati ${what}. Uue punkti abstsiss`,`A(${a}; ${b}) is reflected ${what}. The x-coordinate of the image`),pre:"x =",exp:P(how)}));
      items.push(numAns(Y,{q:t3("Ордината новой точки","Uue punkti ordinaat","The y-coordinate of the image"),pre:"y =",exp:P(how)}))}
    return {items:items.slice(0,cnt)}}};

/* ===== Треугольники ===== */
TPL.triAngles={topic:"g6tri",pts:2,cnt:{n:3,a:3},title:O("Углы треугольника","Kolmnurga nurgad","Angles of a triangle"),
  gen(R,lvl,cnt){const items=[];const ks=lvl==="n"?["third","iso","right"]:["ratio","ext","iso2"];
    for(let i=0;i<cnt;i++){const k=ks[i%3];
      if(k==="third"){const a=R.int(25,80),b=R.int(20,180-a-15);items.push(numAns(180-a-b,{unit:"°",q:t3(`Два угла треугольника ${a}° и ${b}°. Найди третий угол.`,`Kolmnurga kaks nurka on ${a}° ja ${b}°. Leia kolmas nurk.`,`Two angles of a triangle are ${a}° and ${b}°. Find the third.`),exp:P(`180° ${MINUS} ${a}° ${MINUS} ${b}° = ${180-a-b}°`)}))}
      else if(k==="iso"){const base=R.int(31,84);items.push(numAns(180-2*base,{unit:"°",q:t3(`Угол при основании равнобедренного треугольника ${base}°. Найди угол при вершине.`,`Võrdhaarse kolmnurga alusnurk on ${base}°. Leia tipunurk.`,`A base angle of an isosceles triangle is ${base}°. Find the vertex angle.`),exp:P(t3("Углы при основании равны.","Alusnurgad on võrdsed.","Base angles are equal."))+P(`180° ${MINUS} 2 · ${base}° = ${180-2*base}°`)}))}
      else if(k==="right"){const a=R.int(15,75);items.push(numAns(90-a,{unit:"°",q:t3(`Один острый угол прямоугольного треугольника ${a}°. Найди другой острый угол.`,`Täisnurkse kolmnurga üks teravnurk on ${a}°. Leia teine teravnurk.`,`One acute angle of a right triangle is ${a}°. Find the other.`),exp:P(t3("Сумма острых углов прямоугольного треугольника 90°.","Täisnurkse kolmnurga teravnurkade summa on 90°.","The acute angles of a right triangle add up to 90°."))+P(`90° ${MINUS} ${a}° = ${90-a}°`)}))}
      else if(k==="ratio"){let r;do{r=[R.int(1,5),R.int(1,6),R.int(2,7)]}while(180%(r[0]+r[1]+r[2])!==0||new Set(r).size<3);const u=180/(r[0]+r[1]+r[2]);const mx=Math.max(...r)*u;
        items.push(numAns(mx,{unit:"°",q:t3(`Углы треугольника относятся как ${r.join(" : ")}. Найди наибольший угол.`,`Kolmnurga nurgad suhtuvad nagu ${r.join(" : ")}. Leia suurim nurk.`,`The angles of a triangle are in the ratio ${r.join(" : ")}. Find the largest.`),exp:P(`${r.join("x + ")}x = 180°; ${r[0]+r[1]+r[2]}x = 180°; x = ${u}°`)+P(`${Math.max(...r)} · ${u}° = ${mx}°`)}))}
      else if(k==="ext"){const a=R.int(25,70),b=R.int(30,80);items.push(numAns(a+b,{unit:"°",q:t3(`Два угла треугольника ${a}° и ${b}°. Найди внешний угол при третьей вершине.`,`Kolmnurga kaks nurka on ${a}° ja ${b}°. Leia kolmanda tipu välisnurk.`,`Two angles of a triangle are ${a}° and ${b}°. Find the exterior angle at the third vertex.`),exp:P(t3("Внешний угол равен сумме двух углов треугольника, не смежных с ним.","Välisnurk võrdub kahe temaga mitte kõrvuti asuva sisenurga summaga.","An exterior angle equals the sum of the two non-adjacent interior angles."))+P(`${a}° + ${b}° = ${a+b}°`)}))}
      else{const top=R.int(20,140);const base=(180-top)/2;items.push(numAns(q(base),{unit:"°",q:t3(`Угол при вершине равнобедренного треугольника ${top}°. Найди угол при основании.`,`Võrdhaarse kolmnurga tipunurk on ${top}°. Leia alusnurk.`,`The vertex angle of an isosceles triangle is ${top}°. Find a base angle.`),exp:P(`(180° ${MINUS} ${top}°) : 2 = ${qh(q(base))}°`)}))}}
    return {items}}};
TPL.adjVert={topic:"g6tri",pts:1,cnt:{n:2,a:3},title:O("Смежные и вертикальные углы","Kõrvunurgad ja tippnurgad","Adjacent and vertical angles"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const a=R.int(20,160);
      if(i===0)items.push(numAns(180-a,{unit:"°",q:t3(`Один из смежных углов ${a}°. Найди другой.`,`Üks kõrvunurkadest on ${a}°. Leia teine.`,`One of two adjacent angles is ${a}°. Find the other.`),exp:P(t3("Сумма смежных углов 180°.","Kõrvunurkade summa on 180°.","Adjacent angles add up to 180°."))+P(`180° ${MINUS} ${a}° = ${180-a}°`)}));
      else if(i===1){const s=2*R.int(15,80);items.push(numAns(180-s/2,{unit:"°",q:t3(`Две прямые пересекаются. Сумма двух вертикальных углов ${s}°. Найди тупой (или прямой) угол между прямыми.`,`Kaks sirget lõikuvad. Kahe tippnurga summa on ${s}°. Leia sirgete vaheline nürinurk (või täisnurk).`,`Two lines cross. Two vertical angles add up to ${s}°. Find the larger angle between the lines.`),exp:P(t3(`Вертикальные углы равны: каждый ${s/2}°. Смежный с ним: 180° ${MINUS} ${s/2}° = ${180-s/2}°.`,`Tippnurgad on võrdsed: kumbki ${s/2}°. Kõrvunurk: 180° ${MINUS} ${s/2}° = ${180-s/2}°.`,`Vertical angles are equal: ${s/2}° each. The adjacent one: 180° ${MINUS} ${s/2}° = ${180-s/2}°.`))}))}
      else{const d=2*R.int(5,40);const x=(180-d)/2;items.push(numAns(x+d,{unit:"°",q:t3(`Один из смежных углов на ${d}° больше другого. Найди больший угол.`,`Üks kõrvunurk on teisest ${d}° võrra suurem. Leia suurem nurk.`,`One adjacent angle is ${d}° larger than the other. Find the larger.`),exp:P(`x + (x + ${d}°) = 180°; x = ${x}°; x + ${d}° = ${x+d}°`)}))}}
    return {items}}};
TPL.triKind={topic:"g6tri",pts:1,cnt:{n:2,a:3},title:O("Вид треугольника","Kolmnurga liik","Type of triangle"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){
      if(i===0){const kind=R.pick(["ac","rt","ob"]);let a,b,c;do{a=R.int(20,100);b=R.int(15,100);c=180-a-b}while(c<10||(kind==="rt"?false:(kind==="ac"?Math.max(a,b,c)>=90:Math.max(a,b,c)<=90)));if(kind==="rt"){a=R.int(20,70);b=90-a;c=90}
        const v=Math.max(a,b,c)>90?"ob":Math.max(a,b,c)===90?"rt":"ac";const opts=[["ac",t3("остроугольный","teravnurkne","acute")],["rt",t3("прямоугольный","täisnurkne","right")],["ob",t3("тупоугольный","nürinurkne","obtuse")]];
        items.push(choiceAns(v,opts,{q:t3(`Два угла треугольника ${a}° и ${b}°. Какой это треугольник?`,`Kolmnurga kaks nurka on ${a}° ja ${b}°. Milline kolmnurk see on?`,`Two angles of a triangle are ${a}° and ${b}°. What type is it?`),exp:P(t3(`Третий угол ${c}°.`,`Kolmas nurk on ${c}°.`,`The third angle is ${c}°.`))}))}
      else{const a=R.int(2,12),b=R.int(2,12);const yes=R.chance(0.5);const c=yes?R.int(Math.abs(a-b)+1,a+b-1):a+b+R.int(0,3);
        items.push(choiceAns(yes?"y":"n",YN(),{q:t3(`Существует ли треугольник со сторонами ${a} см, ${b} см и ${c} см?`,`Kas leidub kolmnurk külgedega ${a} cm, ${b} cm ja ${c} cm?`,`Is there a triangle with sides ${a} cm, ${b} cm and ${c} cm?`),exp:P(t3("Каждая сторона должна быть меньше суммы двух других.","Iga külg peab olema väiksem kahe ülejäänud külje summast.","Each side must be shorter than the sum of the other two."))+P(`${Math.max(a,b,c)} ${yes?"<":"≥"} ${a+b+c-Math.max(a,b,c)}`)}))}}
    return {items}}};

/* ===== Площадь треугольника, куб и параллелепипед ===== */
TPL.triArea={topic:"g6area",pts:2,cnt:{n:2,a:3},title:O("Площадь треугольника","Kolmnurga pindala","Area of a triangle"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){const a=lvl==="n"?new Q(R.int(3,20)):rDec(R,1,15).abs(),h=lvl==="n"?new Q(R.int(2,16)):rDec(R,1,12).abs();const S=a.mul(h).div(2);
      if(i===0)items.push(numAns(S,{unit:cm()+"²",q:t3(`Основание треугольника ${qh(a)} см, высота к нему ${qh(h)} см. Найди площадь.`,`Kolmnurga alus on ${qh(a)} cm ja sellele tõmmatud kõrgus ${qh(h)} cm. Leia pindala.`,`A triangle has base ${qh(a)} cm and height ${qh(h)} cm. Find its area.`),exp:P(`S = a · h : 2 = ${qh(a)} · ${qh(h)} : 2 = ${qh(S)}`)}));
      else if(i===1)items.push(numAns(h,{unit:cm(),q:t3(`Площадь треугольника ${qh(S)} см², основание ${qh(a)} см. Найди высоту к этому основанию.`,`Kolmnurga pindala on ${qh(S)} cm² ja alus ${qh(a)} cm. Leia sellele alusele tõmmatud kõrgus.`,`A triangle has area ${qh(S)} cm² and base ${qh(a)} cm. Find the height to it.`),exp:P(`h = 2S : a = 2 · ${qh(S)} : ${qh(a)} = ${qh(h)}`)}));
      else items.push(numAns(S,{unit:cm()+"²",q:t3(`Катеты прямоугольного треугольника ${qh(a)} см и ${qh(h)} см. Найди площадь.`,`Täisnurkse kolmnurga kaatetid on ${qh(a)} cm ja ${qh(h)} cm. Leia pindala.`,`A right triangle has legs ${qh(a)} cm and ${qh(h)} cm. Find its area.`),exp:P(t3("Один катет — высота к другому.","Üks kaatet on teisele tõmmatud kõrgus.","One leg is the height to the other."))+P(`S = ${qh(a)} · ${qh(h)} : 2 = ${qh(S)}`)}))}
    return {items}}};
TPL.boxVol={topic:"g6area",pts:2,cnt:{n:2,a:3},title:O("Куб и прямоугольный параллелепипед","Kuup ja risttahukas","Cube and cuboid"),
  gen(R,lvl,cnt){const items=[];
    for(let i=0;i<cnt;i++){
      if(i===0){const a=lvl==="n"?R.int(2,12):R.int(3,15);const kind=R.chance(0.5);items.push(numAns(kind?a*a*a:6*a*a,{unit:kind?cm()+"³":cm()+"²",q:kind?t3(`Ребро куба ${a} см. Найди объём.`,`Kuubi serv on ${a} cm. Leia ruumala.`,`A cube has edge ${a} cm. Find its volume.`):t3(`Ребро куба ${a} см. Найди площадь поверхности.`,`Kuubi serv on ${a} cm. Leia täispindala.`,`A cube has edge ${a} cm. Find its surface area.`),exp:P(kind?`V = a³ = ${a}³ = ${a*a*a}`:`S = 6a² = 6 · ${a*a} = ${6*a*a}`)}))}
      else if(i===1){const a=R.int(2,12),b=R.int(2,10),c=R.int(2,9);const kind=R.chance(0.5);items.push(numAns(kind?a*b*c:2*(a*b+a*c+b*c),{unit:kind?cm()+"³":cm()+"²",q:kind?t3(`Измерения прямоугольного параллелепипеда ${a} см, ${b} см и ${c} см. Найди объём.`,`Risttahuka mõõtmed on ${a} cm, ${b} cm ja ${c} cm. Leia ruumala.`,`A cuboid is ${a} cm × ${b} cm × ${c} cm. Find its volume.`):t3(`Измерения прямоугольного параллелепипеда ${a} см, ${b} см и ${c} см. Найди площадь поверхности.`,`Risttahuka mõõtmed on ${a} cm, ${b} cm ja ${c} cm. Leia täispindala.`,`A cuboid is ${a} cm × ${b} cm × ${c} cm. Find its surface area.`),exp:P(kind?`V = ${a} · ${b} · ${c} = ${a*b*c}`:`S = 2(${a*b} + ${a*c} + ${b*c}) = ${2*(a*b+a*c+b*c)}`)}))}
      else{const e=R.pick([2,3,4]);const a=e*R.int(2,5),b=e*R.int(2,5),c=e*R.int(2,4);const n=(a/e)*(b/e)*(c/e);items.push(numAns(n,{q:t3(`Сколько кубиков с ребром ${e} см поместится в коробку ${a} × ${b} × ${c} см?`,`Mitu kuubikut servaga ${e} cm mahub karpi mõõtmetega ${a} × ${b} × ${c} cm?`,`How many ${e} cm cubes fit into a ${a} × ${b} × ${c} cm box?`),exp:P(`(${a} : ${e}) · (${b} : ${e}) · (${c} : ${e}) = ${a/e} · ${b/e} · ${c/e} = ${n}`)}))}}
    return {items}}};

/* ===== Олимпиадные задачи и доказательства ===== */
const OLY=[
 {id:"6o1",topic:"g6div",a:61,q:O("Найди наименьшее натуральное число больше 1, которое при делении на 2, 3, 4, 5 и 6 даёт остаток 1.","Leia vähim ühest suurem naturaalarv, mis annab jagamisel arvudega 2, 3, 4, 5 ja 6 jäägi 1.","Find the least natural number greater than 1 that leaves remainder 1 when divided by 2, 3, 4, 5 and 6."),s:O("Число на 1 больше общего кратного: НОК(2, 3, 4, 5, 6) = 60, значит 61.","Arv on ühe võrra suurem ühiskordsest: VÜK(2, 3, 4, 5, 6) = 60, seega 61.","It is 1 more than a common multiple: LCM(2, 3, 4, 5, 6) = 60, so 61.")},
 {id:"6o2",topic:"g6div",a:128,q:O("Сколько трёхзначных чисел делятся на 7?","Mitu kolmekohalist arvu jagub 7-ga?","How many three-digit numbers are divisible by 7?"),s:O("До 999 кратных 7: 142, до 99: 14. 142 − 14 = 128.","Kuni 999-ni on 7 kordseid 142, kuni 99-ni 14. 142 − 14 = 128.","Multiples of 7 up to 999: 142; up to 99: 14. 142 − 14 = 128.")},
 {id:"6o3",topic:"g6div",a:4,q:O("Какой цифрой оканчивается произведение 2 · 2 · 2 · … · 2 из 2026 двоек?","Millise numbriga lõpeb korrutis 2 · 2 · 2 · … · 2, milles on 2026 kahte?","What is the last digit of 2 · 2 · … · 2 with 2026 twos?"),s:O("Последние цифры повторяются: 2, 4, 8, 6, 2, … с периодом 4. 2026 = 4 · 506 + 2, значит вторая цифра цикла — 4.","Viimased numbrid korduvad: 2, 4, 8, 6, 2, … perioodiga 4. 2026 = 4 · 506 + 2, seega tsükli teine number — 4.","Last digits cycle 2, 4, 8, 6 with period 4. 2026 = 4 · 506 + 2, so it is the second: 4.")},
 {id:"6o4",topic:"g6fadd",a:[9,10],q:O("Вычисли: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).","Arvuta: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).","Calculate 1/(1·2) + 1/(2·3) + … + 1/(9·10)."),s:O("1/(n(n+1)) = 1/n − 1/(n+1). Почти всё сокращается: 1 − 1/10 = 9/10.","1/(n(n+1)) = 1/n − 1/(n+1). Peaaegu kõik taandub: 1 − 1/10 = 9/10.","1/(n(n+1)) = 1/n − 1/(n+1); everything cancels except 1 − 1/10 = 9/10.")},
 {id:"6o5",topic:"g6fmul",a:18,unit:O("км","km","km"),q:O("Турист прошёл 1/3 пути, затем половину оставшегося. Ему осталось пройти 6 км. Какова длина всего пути?","Turist läbis 1/3 teest, siis poole ülejäänust. Jäi läbida 6 km. Kui pikk on kogu tee?","A hiker walked 1/3 of the way, then half of the rest, and has 6 km left. How long is the whole way?"),s:O("После первой части осталось 2/3, половина из них — 1/3 пути. Значит 1/3 пути = 6 км, весь путь 18 км.","Pärast esimest osa jäi 2/3, sellest pool on 1/3 teest. Seega 1/3 teest = 6 km, kogu tee 18 km.","After the first part 2/3 remained; half of that is 1/3 of the way = 6 km, so 18 km.")},
 {id:"6o6",topic:"g6fmul",a:36,q:O("Если к числу прибавить его треть, получится 48. Найди число.","Kui arvule liita tema kolmandik, saadakse 48. Leia arv.","A number plus a third of it equals 48. Find the number."),s:O("Число вместе с третью — это 4/3 числа. 48 : 4/3 = 36.","Arv koos kolmandikuga on 4/3 arvust. 48 : 4/3 = 36.","The number plus a third is 4/3 of it: 48 ÷ 4/3 = 36.")},
 {id:"6o7",topic:"g6div",a:2,q:O("Из 9 одинаковых на вид монет одна фальшивая — она легче. За какое наименьшее число взвешиваний на чашечных весах без гирь её можно точно найти?","9 ühesugusest mündist üks on võlts — see on kergem. Mitme kaalumisega kangkaaludel ilma vihtideta saab selle kindlasti leida (vähim arv)?","Of 9 identical-looking coins one fake is lighter. What is the least number of weighings on a balance (no weights) that always finds it?"),s:O("Делим на три кучки по 3. Первое взвешивание показывает, в какой кучке фальшивка; второе — какая из трёх монет. Одного взвешивания мало: у него 3 исхода, а монет 9.","Jagame kolmeks hunnikuks 3 kaupa. Esimene kaalumine näitab hunnikut, teine — mündi kolmest. Ühest kaalumisest ei piisa: sellel on 3 tulemust, münte on 9.","Split into three groups of 3: one weighing finds the group, a second finds the coin. One weighing has only 3 outcomes for 9 coins.")},
 {id:"6o8",topic:"g6ratio",a:1,unit:O("л","l","l"),q:O("В лимонаде сок и вода в отношении 2 : 5. Сколько литров сока в 3,5 л лимонада?","Limonaadis on mahl ja vesi suhtes 2 : 5. Mitu liitrit mahla on 3,5 liitris limonaadis?","Lemonade has juice and water in the ratio 2 : 5. How many litres of juice are in 3.5 l?"),s:O("Всего 7 частей, одна часть 0,5 л, сок — 2 части = 1 л.","Kokku 7 osa, üks osa on 0,5 l, mahl on 2 osa = 1 l.","7 parts in total, one part is 0.5 l, juice is 2 parts = 1 l.")},
 {id:"6o9",topic:"g6pct",a:4,unit:O("%","%","%"),q:O("Цену повысили на 20%, затем снизили на 20%. На сколько процентов новая цена меньше первоначальной?","Hinda tõsteti 20% ja seejärel langetati 20%. Mitme protsendi võrra on uus hind algsest väiksem?","A price rose by 20% and then fell by 20%. By how many percent is it now below the original?"),s:O("100 · 1,2 · 0,8 = 96, то есть на 4% меньше.","100 · 1,2 · 0,8 = 96 ehk 4% vähem.","100 · 1.2 · 0.8 = 96, i.e. 4% less.")},
 {id:"6o10",topic:"g6pct",a:5,unit:O("кг","kg","kg"),q:O("Арбуз весом 10 кг на 99% состоял из воды. Он подсох, и вода стала составлять 98%. Сколько теперь весит арбуз?","10 kg kaaluv arbuus koosnes 99% ulatuses veest. See kuivas ja vett jäi 98%. Kui palju arbuus nüüd kaalub?","A 10 kg watermelon was 99% water. After drying it is 98% water. How much does it weigh now?"),s:O("Сухого вещества 1% = 0,1 кг, и оно не меняется. Теперь это 2% массы: 0,1 : 0,02 = 5 кг.","Kuivainet on 1% = 0,1 kg ja see ei muutu. Nüüd on see 2% massist: 0,1 : 0,02 = 5 kg.","Dry matter is 1% = 0.1 kg and stays the same; now it is 2%: 0.1 ÷ 0.02 = 5 kg.")},
 {id:"6o11",topic:"g6circ",a:9,q:O("Длину окружности увеличили в 3 раза. Во сколько раз увеличилась площадь круга?","Ringjoone pikkust suurendati 3 korda. Mitu korda suurenes ringi pindala?","A circumference is tripled. How many times larger is the area?"),s:O("Радиус тоже увеличился в 3 раза, а площадь зависит от квадрата радиуса: 3 · 3 = 9.","Raadius suurenes samuti 3 korda, pindala sõltub raadiuse ruudust: 3 · 3 = 9.","The radius triples too; area depends on the radius squared: 3 · 3 = 9.")},
 {id:"6o12",topic:"g6ratn",a:9,q:O("Сколько целых чисел x удовлетворяют условию |x| < 5?","Mitu täisarvu x rahuldab tingimust |x| < 5?","How many integers x satisfy |x| < 5?"),s:O("Это −4, −3, …, 3, 4 — всего 9 чисел.","Need on −4, −3, …, 3, 4 — kokku 9 arvu.","They are −4 … 4: 9 numbers.")},
 {id:"6o13",topic:"g6rops",a:10,q:O("Вычисли: (−1) + 2 + (−3) + 4 + … + (−19) + 20.","Arvuta: (−1) + 2 + (−3) + 4 + … + (−19) + 20.","Calculate (−1) + 2 + (−3) + 4 + … + (−19) + 20."),s:O("10 пар, каждая даёт 1: всего 10.","10 paari, iga annab 1: kokku 10.","10 pairs, each equal to 1: total 10.")},
 {id:"6o14",topic:"g6eq",a:5,q:O("Задумали число, умножили на 3, прибавили 7, результат разделили на 2 и получили 11. Какое число задумали?","Mõeldi arv, korrutati 3-ga, liideti 7, tulemus jagati 2-ga ja saadi 11. Mis arv mõeldi?","A number was multiplied by 3, 7 added, the result halved, giving 11. What was the number?"),s:O("Идём с конца: 11 · 2 = 22, 22 − 7 = 15, 15 : 3 = 5.","Liigume lõpust: 11 · 2 = 22, 22 − 7 = 15, 15 : 3 = 5.","Work backwards: 11 · 2 = 22, 22 − 7 = 15, 15 ÷ 3 = 5.")},
 {id:"6o15",topic:"g6eq",a:10,q:O("Вася старше Пети на 4 года. Через 3 года сумма их возрастов будет 30 лет. Сколько лет Пете сейчас?","Vasja on Petjast 4 aastat vanem. 3 aasta pärast on nende vanuste summa 30. Kui vana on Petja praegu?","Vasya is 4 years older than Petya. In 3 years their ages will add up to 30. How old is Petya now?"),s:O("(x + 3) + (x + 7) = 30, 2x = 20, x = 10.","(x + 3) + (x + 7) = 30, 2x = 20, x = 10.","(x + 3) + (x + 7) = 30, 2x = 20, x = 10.")},
 {id:"6o16",topic:"g6coord",a:12,q:O("Найди площадь треугольника с вершинами A(−2; 1), B(4; 1), C(4; 5).","Leia kolmnurga pindala, mille tipud on A(−2; 1), B(4; 1), C(4; 5).","Find the area of the triangle A(−2; 1), B(4; 1), C(4; 5)."),s:O("AB = 6 и параллельна оси x, BC = 4 и параллельна оси y — треугольник прямоугольный: 6 · 4 : 2 = 12.","AB = 6 on x-teljega paralleelne, BC = 4 y-teljega paralleelne — kolmnurk on täisnurkne: 6 · 4 : 2 = 12.","AB = 6 is horizontal, BC = 4 vertical, so it is a right triangle: 6 · 4 ÷ 2 = 12.")},
 {id:"6o17",topic:"g6sym",a:6,q:O("Сколько осей симметрии у правильного шестиугольника?","Mitu sümmeetriatelge on korrapärasel kuusnurgal?","How many lines of symmetry does a regular hexagon have?"),s:O("3 оси через противоположные вершины и 3 через середины противоположных сторон: 6.","3 telge läbi vastastippude ja 3 läbi vastaskülgede keskpunktide: 6.","3 through opposite vertices and 3 through midpoints of opposite sides: 6.")},
 {id:"6o18",topic:"g6tri",a:32,unit:O("°","°","°"),q:O("Один угол треугольника в 2 раза больше другого и на 20° меньше третьего. Найди наименьший угол.","Kolmnurga üks nurk on teisest 2 korda suurem ja kolmandast 20° võrra väiksem. Leia vähim nurk.","One angle is twice another and 20° less than the third. Find the smallest angle."),s:O("x + 2x + (2x + 20) = 180, 5x = 160, x = 32°.","x + 2x + (2x + 20) = 180, 5x = 160, x = 32°.","x + 2x + (2x + 20) = 180, 5x = 160, x = 32°.")},
 {id:"6o19",topic:"g6tri",type:"choice",opts:[["y",O("Может","Võib","Yes")],["n",O("Не может","Ei või","No")]],a:"n",q:O("Может ли у треугольника быть два тупых угла?","Kas kolmnurgal võib olla kaks nürinurka?","Can a triangle have two obtuse angles?"),s:O("Два тупых угла вместе больше 180°, а сумма всех углов треугольника ровно 180°.","Kaks nürinurka on kokku üle 180°, kuid kolmnurga nurkade summa on täpselt 180°.","Two obtuse angles already exceed 180°, but all three add up to exactly 180°.")},
 {id:"6o20",topic:"g6area",a:12,q:O("Куб с ребром 3 см покрасили снаружи и распилили на кубики с ребром 1 см. Сколько кубиков имеют ровно две окрашенные грани?","3 cm servaga kuup värviti väljast ja saeti 1 cm servaga kuubikuteks. Mitmel kuubikul on täpselt kaks värvitud tahku?","A 3 cm cube is painted outside and cut into 1 cm cubes. How many have exactly two painted faces?"),s:O("Это кубики в середине каждого ребра: у куба 12 рёбер, на каждом по одному — 12.","Need on iga serva keskmised kuubikud: kuubil on 12 serva, igal üks — 12.","They are the middle cubes of the edges: 12 edges, one each — 12.")},
 {id:"6o21",topic:"g6area",a:27,unit:O("см³","cm³","cm³"),q:O("Площадь поверхности куба 54 см². Найди его объём.","Kuubi täispindala on 54 cm². Leia selle ruumala.","A cube has surface area 54 cm². Find its volume."),s:O("Одна грань 54 : 6 = 9 см², ребро 3 см, объём 27 см³.","Üks tahk on 54 : 6 = 9 cm², serv 3 cm, ruumala 27 cm³.","One face is 54 ÷ 6 = 9 cm², edge 3 cm, volume 27 cm³.")},
 {id:"6o22",topic:"g6fdec",a:8,q:O("Какая цифра стоит на 2026-м месте после запятой в десятичной записи дроби 1/7?","Milline number on murru 1/7 kümnendkujul 2026. kohal pärast koma?","Which digit is in the 2026th place after the decimal point of 1/7?"),s:O("1/7 = 0,(142857), период 6. 2026 = 6 · 337 + 4, четвёртая цифра периода — 8.","1/7 = 0,(142857), periood 6. 2026 = 6 · 337 + 4, perioodi neljas number on 8.","1/7 = 0.(142857), period 6. 2026 = 6 · 337 + 4; the 4th digit is 8.")},
];
const PROOFS=[
 {id:"6p1",topic:"g6div",q:O("Докажи, что сумма двух нечётных чисел — чётное число.","Tõesta, et kahe paaritu arvu summa on paarisarv.","Prove that the sum of two odd numbers is even."),s:O("Нечётные числа: 2k + 1 и 2m + 1. Сумма 2k + 2m + 2 = 2(k + m + 1) делится на 2.","Paaritud arvud: 2k + 1 ja 2m + 1. Summa 2k + 2m + 2 = 2(k + m + 1) jagub 2-ga.","Odd numbers are 2k + 1 and 2m + 1; the sum 2(k + m + 1) is divisible by 2.")},
 {id:"6p2",topic:"g6div",q:O("Докажи признак делимости на 3 для трёхзначного числа.","Tõesta kolmekohalise arvu 3-ga jaguvuse tunnus.","Prove the divisibility test for 3 for a three-digit number."),s:O("Число с цифрами a, b, c равно 100a + 10b + c = 99a + 9b + (a + b + c). 99a + 9b делится на 3, значит всё число делится на 3 тогда и только тогда, когда делится сумма цифр a + b + c.","Arv numbritega a, b, c on 100a + 10b + c = 99a + 9b + (a + b + c). 99a + 9b jagub 3-ga, seega jagub arv 3-ga parajasti siis, kui jagub ristsumma.","100a + 10b + c = 99a + 9b + (a + b + c); 99a + 9b is divisible by 3, so the number is divisible by 3 exactly when a + b + c is.")},
 {id:"6p3",topic:"g6tri",q:O("Докажи, что вертикальные углы равны.","Tõesta, et tippnurgad on võrdsed.","Prove that vertical angles are equal."),s:O("Каждый из двух вертикальных углов смежен с одним и тем же углом β, поэтому каждый равен 180° − β.","Kumbki tippnurk on kõrvunurk ühe ja sama nurgaga β, seega kumbki on 180° − β.","Each vertical angle is adjacent to the same angle β, so each equals 180° − β.")},
 {id:"6p4",topic:"g6tri",q:O("Докажи, что сумма углов выпуклого четырёхугольника равна 360°.","Tõesta, et kumera nelinurga nurkade summa on 360°.","Prove that the angles of a convex quadrilateral add up to 360°."),s:O("Диагональ делит четырёхугольник на два треугольника, их углы вместе составляют углы четырёхугольника: 2 · 180° = 360°.","Diagonaal jaotab nelinurga kaheks kolmnurgaks, mille nurgad moodustavad kokku nelinurga nurgad: 2 · 180° = 360°.","A diagonal splits it into two triangles whose angles make up the quadrilateral's: 2 · 180° = 360°.")},
 {id:"6p5",topic:"g6fadd",q:O("Докажи, что 1/2 + 1/4 + 1/8 + 1/16 + 1/32 < 1.","Tõesta, et 1/2 + 1/4 + 1/8 + 1/16 + 1/32 < 1.","Prove that 1/2 + 1/4 + 1/8 + 1/16 + 1/32 < 1."),s:O("После каждого слагаемого до 1 остаётся ровно последнее слагаемое: 1 − 1/2 = 1/2, 1/2 − 1/4 = 1/4, … В конце не хватает 1/32 > 0.","Pärast iga liidetavat jääb 1-ni puudu täpselt viimane liidetav: 1 − 1/2 = 1/2, 1/2 − 1/4 = 1/4, … Lõpuks jääb puudu 1/32 > 0.","After each term the gap to 1 equals the last term; in the end 1/32 > 0 is still missing.")},
 {id:"6p6",topic:"g6area",q:O("Докажи, что площадь прямоугольного треугольника равна половине произведения катетов.","Tõesta, et täisnurkse kolmnurga pindala on pool kaatetite korrutisest.","Prove that a right triangle's area is half the product of its legs."),s:O("Два таких треугольника складываются в прямоугольник со сторонами a и b. Его площадь ab, значит площадь треугольника ab : 2.","Kaks sellist kolmnurka moodustavad ristküliku külgedega a ja b. Selle pindala on ab, seega kolmnurga pindala on ab : 2.","Two copies form an a × b rectangle of area ab, so one triangle is ab ÷ 2.")},
];

const TOPICS=[
 {id:"g6r5",start:-1,col:"green",name:O("Повторение 5 класса","5. klassi kordamine","Grade 5 review"),tpl:["dec5"]},
 {id:"g6div",start:0,col:"coral",name:O("Делимость, НОД и НОК","Jaguvus, SÜT ja VÜK","Divisibility, GCD and LCM"),tpl:["divRules","primeFact","gcdLcm","gcdWord"]},
 {id:"g6frac",start:3,col:"yellow",name:O("Основное свойство дроби, сравнение дробей","Murru põhiomadus, murdude võrdlemine","Equivalent fractions, comparing fractions"),tpl:["fracReduce","fracCompare"]},
 {id:"g6fadd",start:5,col:"teal",name:O("Сложение и вычитание дробей","Murdude liitmine ja lahutamine","Adding and subtracting fractions"),tpl:["fracAddSub","fracAddWord"]},
 {id:"g6fmul",start:8,col:"lilac",name:O("Умножение и деление дробей","Murdude korrutamine ja jagamine","Multiplying and dividing fractions"),tpl:["fracMulDiv","fracOf","fracExpr"]},
 {id:"g6fdec",start:12,col:"sky",name:O("Обыкновенные и десятичные дроби","Harilikud ja kümnendmurrud","Fractions and decimals"),tpl:["fracToDec","fdMixed"]},
 {id:"g6ratio",start:14,col:"green",name:O("Отношения, пропорции, масштаб","Suhe, võrre, mõõtkava","Ratios, proportions, scale"),tpl:["ratio","propEq","scale"]},
 {id:"g6propr",start:15,col:"coral",name:O("Прямая и обратная пропорциональность","Võrdeline ja pöördvõrdeline sõltuvus","Direct and inverse proportion"),tpl:["dirInv"]},
 {id:"g6pct",start:16,col:"sky",name:O("Проценты, круговая диаграмма","Protsent, sektordiagramm","Percentages, pie charts"),tpl:["pct6","pie"]},
 {id:"g6circ",start:18,col:"teal",name:O("Окружность и круг","Ringjoon ja ring","Circles"),tpl:["circle","circleBack"]},
 {id:"g6ratn",start:20,col:"coral",name:O("Рациональные числа: ось, модуль, сравнение","Ratsionaalarvud: arvtelg, absoluutväärtus, võrdlemine","Rational numbers: number line, absolute value, comparing"),tpl:["axis","absCmp"]},
 {id:"g6rops",start:22,col:"yellow",name:O("Действия с рациональными числами","Tehted ratsionaalarvudega","Operations with rational numbers"),tpl:["ratAdd","ratMul","ratExpr"]},
 {id:"g6eq",start:25,col:"green",name:O("Уравнения: скобки, подобные слагаемые, задачи","Võrrandid: sulud, sarnased liikmed, ülesanded","Equations: brackets, like terms, word problems"),tpl:["brackets","eqLin","eqWord"]},
 {id:"g6coord",start:28,col:"lilac",name:O("Координатная плоскость и графики","Koordinaattasand ja graafikud","Coordinate plane and graphs"),tpl:["coordPts","graphRead"]},
 {id:"g6sym",start:30,col:"sky",name:O("Осевая и центральная симметрия","Telg- ja tsentraalsümmeetria","Line and point symmetry"),tpl:["symPt"]},
 {id:"g6tri",start:31,col:"yellow",name:O("Треугольники: углы, виды, равенство","Kolmnurgad: nurgad, liigid, võrdsus","Triangles: angles, types, congruence"),tpl:["triAngles","adjVert","triKind"]},
 {id:"g6area",start:33,col:"lilac",name:O("Площадь треугольника, куб и параллелепипед","Kolmnurga pindala, kuup ja risttahukas","Triangle area, cubes and cuboids"),tpl:["triArea","boxVol"]},
];

GEN.register(6,{TOPICS,TPL,OLY,PROOFS});
})();
