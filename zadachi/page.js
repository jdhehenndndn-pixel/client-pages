let C=null;const H=location.hash.slice(1);
try{C=un(H)}catch(e){}
addEventListener('hashchange',()=>location.reload());
const $=id=>document.getElementById(id);
if(!C)$('app').innerHTML='<section class="hero"><div class="w"><h1>Ссылка открылась не полностью</h1><p class="sub">Попробуйте скопировать её целиком.</p></div></section>';else start();
function start(){
const M=C.course==='a'?A:V,S=skills(C),N=S.length,sp=SPH[C.sph],W=WANT[C.want];
const low=s=>/^[А-ЯA-Z]{2}/.test(s)?s:s[0].toLowerCase()+s.slice(1);
const fill=s=>esc(dates(String(s))).replace(/\{([bsug])(\d)\}/g,(m,k,n)=>esc(sp[k][n-1]||sp[k][0]));
/* Вопросы после выбора задачи: выводы строятся только из этих ответов */
const RISK={time:['Уходит время','уходит время'],err:['Ошибки, потом исправления','ошибки, которые потом приходится исправлять'],money:['Можно потерять деньги','можно потерять деньги'],me:['Всё держится на мне','работа держится на одном человеке'],none:['Ничем серьёзным','серьёзных последствий нет']};
const HRS={a:['До 1 часа в неделю','до 4 часов в месяц'],b:['1–3 часа','4–12 часов в месяц'],c:['3–5 часов','12–20 часов в месяц'],d:['Больше 5 часов','больше 20 часов в месяц'],x:['Не считали','']};
const BAR={how:['Не знаю как'],acc:['Нет доступа к данным или запрещено'],time:['Нет времени разобраться'],data:['Боюсь за данные']};
const OUT={own:['Быстрее делать это в своей работе','быстрее делать это в своей работе'],tool:['Готовый инструмент для себя','готовый инструмент для себя'],svc:['Инструмент для команды или клиентов','инструмент для команды или клиентов']};
const KEY='nav4:'+H;let s0={};try{s0=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
let ans=s0.a||{},focus=s0.f||null,m=s0.m||{},edit=null,run=false,st={},busy=false;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify({a:ans,f:focus,m}))}catch(e){}};
if(C.name)document.title=C.name+': пять задач из вашей работы';
$('app').innerHTML=`<section class="hero"><div class="w">
 <img class="logo" src="logo.svg" alt="Мастер CFO">
 <div id="intro"><h1>${C.name?esc(C.name)+', вы':'Вы'} ${esc(C.said.replace(/\.$/,''))}</h1>
 <p class="sub">Посмотрим, как вы сейчас решаете ${N} ${plur(N,'задачу','задачи','задач')}, и выберем, <b>за какую браться первой</b>.</p></div>
 <div class="bar5" id="bar"></div><div id="stage"></div></div></section><div id="after" hidden>
 <section class="light" id="proto"><div class="w"></div></section><section class="dark" id="mods"><div class="w"></div></section></div>`;
const bar=i=>$('bar').innerHTML=S.map((x,j)=>`<i class="${ans[x.id]==null?'':'v'+ans[x.id]} ${j===i?'now':''}"></i>`).join('');
const top=()=>{scrollTo(0,0);const h=$('stage').querySelector('h2');if(h)h.focus({preventScroll:true})};
const NOT='Этим занимаюсь не я',said=x=>ans[x.id]===3?NOT:x[['red','grey','green'][ans[x.id]]];
/* Порядок ответов разный, но у каждого вопроса постоянный */
const ORD=[[1,0,2],[0,2,1],[2,0,1],[0,1,2],[1,2,0]];
function next(){const i=S.findIndex(x=>ans[x.id]==null);i<0?result(true):ask(i,true)}
const DEMO=C.who==='me'?S.filter(q=>PATH[q.id]&&APPS[q.task]).sort((a,b)=>(b.id==='mp1')-(a.id==='mp1')):[];
function demo(x){
 bar(-1);$('intro').hidden=true;$('after').hidden=false;$('mods').hidden=true;
 $('stage').innerHTML=`<div class="first"><h2 tabindex="-1">Какой пример <span class="ser">посмотрим?</span></h2><div class="pick dk" role="group" aria-label="Пример">${DEMO.map(q=>`<button type="button" data-d="${q.id}" aria-pressed="${q===x}">${esc(q.work)}</button>`).join('')}</div><button class="back" type="button" id="toq">К вопросам</button></div>`;
 $('stage').querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>demo(DEMO.find(q=>q.id===b.dataset.d)));
 $('toq').onclick=next;
 document.querySelector('#proto .w').innerHTML='<h2>Как это бывает <span class="ser">на самом деле</span></h2><div id="wp"></div><p class="fine">Организации и суммы условные.</p>';
 pathView($('wp'),APPS[x.task],x.id,{n:0,max:0,fin:'Посмотреть свои задачи',end:next});
}
function ask(i,move){
 const x=S[i];bar(i);$('after').hidden=true;$('intro').hidden=i>0||edit!==null;
 $('stage').innerHTML=`<div class="card"><p class="stp">${edit!==null?'Исправить ответ':`Задача ${i+1} из ${N}`}</p><h2 tabindex="-1">${esc(x.ask)}</h2><div class="opt">${ORD[i].map(v=>`<button type="button" data-v="${v}" aria-pressed="${ans[x.id]===v}">${esc(x[['red','grey','green'][v]])}</button>`).join('')}</div>${C.who==='me'?'':`<button type="button" class="nm" data-v="3" aria-pressed="${ans[x.id]===3}">${NOT}</button>`}</div>${DEMO.length&&edit===null?'<button class="back" type="button" id="demo">Сразу к примеру</button>':''}${edit!==null||i?'<button class="back" type="button">Назад</button>':''}`;
 const os=[...$('stage').querySelectorAll('[data-v]')];
 os.forEach(b=>b.onclick=()=>{if(busy)return;busy=true;const was=ans[x.id];ans[x.id]=+b.dataset.v;os.forEach(o=>o.setAttribute('aria-pressed',o===b));bar(i);
  if(x.id===focus&&was!==ans[x.id])pick(ans[x.id]>1?null:focus);save();setTimeout(()=>{busy=false;edit=null;next()},380)});
 const dm=$('demo');if(dm)dm.onclick=()=>{demo(DEMO[0]);top()};
 const bk=$('stage').querySelector('.back:not(#demo)');if(bk)bk.onclick=()=>{if(busy)return;if(edit!==null){edit=null;result(true)}else{delete ans[S[i-1].id];save();ask(i-1,true)}};
 if(move)top();
}
function pick(id){focus=id;m={out:m.out};run=false;st={}}
/* Какой короткий вопрос следующий */
function steps(){const l=['risk'];if(m.risk==='time')l.push('hrs');l.push('bar');if(!OUT[C.goal])l.push('out');return l}
const outOf=()=>OUT[C.goal]?C.goal:m.out;
function result(move){
 bar(-1);$('intro').hidden=true;
 const red=S.filter(x=>ans[x.id]===0),mid=S.filter(x=>ans[x.id]===1),ok=S.filter(x=>ans[x.id]===2),no=S.filter(x=>ans[x.id]===3),miss=[...red,...mid],n=red.length,K=N-no.length;
 if(focus&&!miss.some(x=>x.id===focus))pick(null);
 const head=n?`${plur(n,'задачу','задачи','задач')} из ${K} вы делаете <span class="ser">вручную</span>`:mid.length?`Вручную ничего. ${mid.length} из ${K} <span class="ser">приходится перепроверять</span>`:K?'Эти задачи у вас <span class="ser">уже налажены</span>':'Эти задачи сейчас <span class="ser">не ваши</span>';
 $('stage').innerHTML=`<div class="big">${n?`<div class="num">${n}</div>`:''}<h2 tabindex="-1">${head}</h2></div>
 <ul class="wall">${[...red,...mid,...ok,...no].map(x=>`<li class="v${ans[x.id]}"><button type="button" data-e="${x.id}" title="Исправить ответ">${esc(x.work)}<small>${esc(said(x))}</small></button></li>`).join('')}</ul>
 <p class="leg"><span><i class="v0"></i>вручную: ${n}</span><span><i class="v1"></i>частично: ${mid.length}</span><span><i class="v2"></i>налажено: ${ok.length}</span>${no.length?`<span><i class="v3"></i>не ваши: ${no.length}</span>`:''}</p><p class="fine">Чтобы исправить ответ, нажмите на задачу. <button type="button" class="again" id="again">Начать заново</button></p>
 ${miss.length?`<div class="first"><h2>За какую задачу <span class="ser">взялись бы первой?</span></h2><div class="pick dk" role="group" aria-label="Задача">${miss.map(x=>`<button type="button" data-p="${x.id}" aria-pressed="${x.id===focus}">${esc(x.work)}</button>`).join('')}</div><div id="mini"></div></div>`:`<p class="cost">${K?'Здесь у вас порядок.':'Возьмём другие.'} Расскажите, какая работа сейчас сложнее, и посмотрим её на примере.</p>`}`;
 $('again').onclick=()=>{if(confirm('Стереть ответы и начать заново?')){ans={};focus=null;m={};save();ask(0,true)}};
 $('stage').querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{edit=b.dataset.e;ask(S.findIndex(x=>x.id===edit),true)});
 $('stage').querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{if(b.dataset.p!==focus)pick(b.dataset.p);save();$('stage').querySelectorAll('[data-p]').forEach(o=>o.setAttribute('aria-pressed',o===b));mini(miss)});
 save();if(miss.length)mini(miss);else $('after').hidden=true;
 if(move)top();
}
function mini(miss){
 const x=miss.find(q=>q.id===focus),el=$('mini');if(!x){el.innerHTML='';$('after').hidden=true;return}
 const solo=C.who==='me',L=steps(),q={risk:['Чем это грозит, если ничего не менять?',RISK],hrs:['Сколько времени занимает именно эта задача?',HRS],bar:['Что мешало сделать иначе?',BAR],out:['Что нужно получить в итоге?',OUT]};
 const shown=L.filter((k,i)=>L.slice(0,i).every(p=>m[p]));
 el.innerHTML=shown.map(k=>`<div class="mq"><h3>${q[k][0]}</h3><div class="pick dk" role="group" aria-label="${q[k][0]}">${Object.entries(q[k][1]).filter(([o])=>!(solo&&(k==='out'&&o==='svc'||k==='risk'&&o==='me'))).map(([v,t])=>`<button type="button" data-k="${k}" data-v="${v}" aria-pressed="${m[k]===v}">${t[0]}</button>`).join('')}</div></div>`).join('');
 el.querySelectorAll('button').forEach(b=>b.onclick=()=>{const k=b.dataset.k;m[k]=b.dataset.v;if(k==='risk'&&m.risk!=='time')delete m.hrs;save();mini(miss);
  const e=el.querySelector(`[data-k="${k}"][data-v="${m[k]}"]`);if(e)e.focus({preventScroll:true});
  if(L.length&&steps().every(p=>m[p])){if(k===steps().slice(-1)[0])$('proto').scrollIntoView()}else{const z=el.lastElementChild;if(z)z.scrollIntoView({block:'nearest'})}});
 const ready=L.every(p=>m[p]);$('after').hidden=!ready;if(ready){proto(miss,x);mods(x,miss);$('mods').hidden=!!(PATH[x.id]&&!(miss.length===1&&ans[x.id]===1))&&!m.go}
}
function proto(miss,x){
 const rest=miss.filter(q=>q!==x&&ans[q.id]===0),pr=(W||WANT.time).pr;
 const x2=rest.filter(q=>q.task&&q.task===x.task).sort((a,b)=>pr.indexOf(a.t)-pr.indexOf(b.t))[0],id=C.course==='a'?'ca':'cv',cs=x.task?TASKS[x.task][id]:'',f=FEAR[C.fear];
 const url=(C.course==='a'?'https://cases-ai.fin-academy.pro/#pick=':'https://cases.fin-academy.pro/?pick=')+cs;
 const hd=C.res?'Вы хотели: '+esc(C.res):W?'Цель: '+esc(low(W.n)):'';
const A=APPS[x.task],cases=(f||cs)?`<div class="two">${cs?`<div><h3>Похожая работа выпускника</h3><p>${CASES[cs]}</p><a href="${url}" target="_blank" rel="noopener">Посмотреть</a></div>`:''}${f?`<div><h3>${f[0]}</h3><p>${f[1]}</p></div>`:''}</div>`:'';
 const was=`<p class="was"><b>Сейчас.</b> ${esc(x.work)}: ${esc(low(said(x)))}.${m.risk==='none'?'':' Чем грозит: '+RISK[m.risk][1]+'.'}${m.hrs&&HRS[m.hrs][1]?' Это '+HRS[m.hrs][1]+'.':''}</p>`;
 if(A&&PATH[x.id]){
  document.querySelector('#proto .w').innerHTML=`<h2>Как это бывает <span class="ser">на самом деле</span></h2>${was}<div id="wp"></div><p class="fine">Организации и суммы условные.</p>${cases}`;
  pathView($('wp'),A,x.id,{n:0,max:0,end:()=>{$('mods').hidden=false;$('mods').scrollIntoView()}});return}
 document.querySelector('#proto .w').innerHTML=`<h2>Как это может <span class="ser">выглядеть</span></h2>${was}
 <div class="app"><div class="appbar"><div>${hd?`<small>${hd}</small>`:''}<b>${x.task?TASKS[x.task].h:'Работа с нейросетью'}</b></div></div><div class="rev">${one(x)}${x2?one(x2):''}</div></div>
 <p class="fine">Пример на условных данных.</p>${cases}`;
 wire(miss);
}
function one(x){return `<div class="bl" data-b="${x.id}"><h4>${fill(x.h)}</h4>${block(x)}<p class="sk">Чему для этого учиться: ${esc(low(x.learn))}</p></div>`}
function block(x){const d=x.d;
 if(x.t==='tiles')return `<div class="tl">${d.map(r=>`<div class="${r[2]||''}">${fill(r[0])}<b>${fill(r[1])}</b></div>`).join('')}</div>`;
 if(x.t==='rows')return d.map((r,i)=>{const on=st[x.id+'_'+i],tg=r[4]?'button':'div';return `<${tg} class="rw ${r[4]?'m':''}" ${r[4]?`type="button" data-r="${i}" aria-expanded="${!!on}"`:''}><span>${fill(r[0])}<small>${fill(r[1])}</small></span><em class="${r[3]||''}">${fill(r[2])}</em>${on?`<i>${fill(r[4])}</i>`:''}</${tg}>`}).join('');
 if(x.t==='bars'){const k=Math.max(...d.map(r=>Math.abs(r[1])));return d.map(r=>`<div class="ba ${r[1]<0?'n':''}"><span>${fill(r[0])}</span><u style="width:${Math.abs(r[1])/k*100}%"></u><b>${(r[1]<0?'−':'')+Math.abs(r[1]).toLocaleString('ru-RU')}</b></div>`).join('')}
 if(x.t==='chat'){const a=st[x.id]||0;return `<div class="ch">${d.map((r,i)=>`<button type="button" data-c="${i}" aria-pressed="${a===i}">${fill(r[0])}</button>`).join('')}</div><div class="say">${fill(d[a][1])}</div>`}
 return d.s.map(s=>`<label class="sl">${s[0]} <b>${(s[3]+'').replace('-','−')+s[4]}</b><input type="range" min="${s[1]}" max="${s[2]}" value="${s[3]}" data-u="${s[4]}"></label>`).join('')+`<div class="out">${fill(d.o)}<b>${d.f(d.s[0][3],d.s[1][3])}</b></div>`;
}
function wire(miss){document.querySelectorAll('[data-b]').forEach(e=>{const x=miss.find(q=>q.id===e.dataset.b),re=()=>{e.outerHTML=one(x);wire(miss)};
 e.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{const k=x.id+'_'+b.dataset.r;st[k]=!st[k];re()});
 e.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{st[x.id]=+b.dataset.c;re()});
 const r=[...e.querySelectorAll('input')];r.forEach(i=>i.oninput=()=>{i.parentNode.querySelector('b').textContent=i.value.replace('-','−')+i.dataset.u;e.querySelector('.out b').textContent=x.d.f(...r.map(z=>+z.value))})})}
function mods(x,miss){
 if(miss.length===1&&ans[x.id]===1){document.querySelector('#mods .w').innerHTML=`<h2>Что <span class="ser">дальше</span></h2><div class="fin"><p>${esc(x.say)}</p><p>Основа у вас уже есть, эту задачу осталось довести до уверенности. Расскажите, какая работа ждёт вас дальше: посмотрим её так же, на примере.</p></div>`;return}
 const v=C.course==='v',out=outOf(),red=S.filter(q=>q!==x&&ans[q.id]===0),need=[x,...red],rAll=tariff(C.course,C.freq,need,out),r1=tariff(C.course,C.freq,[x],out),above=need.filter(s=>M.tar[r1.t]<topM(s)),r=above.length>1?rAll:r1;
 /* Путь для выбранной задачи, по порядку курса; первый модуль нужен тем, кто ещё не работает в этих инструментах */
 const path={};const put=k=>path[k]=path[k]||[];
 if(C.lvl<(v?4:2))put(1);x.les.forEach(l=>put(modOf(l)).push([M.les[l],NOTE[C.course][l]]));if(v&&out==='svc')put(7);
 const ks=Object.keys(path).map(Number).sort((a,b)=>a-b);
 const more=[...new Set(red.flatMap(q=>q.les.map(modOf)))].filter(k=>!path[k]).sort((a,b)=>a-b);
 const why={cover:!red.length?'Его уроков хватает на выбранную задачу.':above.length===1?`Его уроков хватает на выбранную задачу${need.length>2?' и почти на все остальные, которые вы делаете вручную':''}.`:'Его уроков хватает и на выбранную задачу, и на остальные, которые вы делаете вручную.',auto:'Данные должны обновляться сами, а для этого нужны сервер и связь с источником. Это модуль 5.',svc:'Инструментом будут пользоваться другие люди: нужны роли, проверка безопасности и запуск. Это модуль 7, он есть только в «Профи».',agent:'Вам нужен готовый помощник, а CFO-агент начинается с «Профи».'}[r.why];
 const note=!v&&out==='svc'?'<p class="sub"><b>Важно:</b> начните с версии для себя, а инструмент для других людей обсудим отдельно.</p>':'';
 const d0=new Date(START[C.course]+'T23:59:59'),go1=d0>new Date()?'Начинаю '+d0.getDate()+' '+MG[d0.getMonth()]:'Начинаю в ближайшем потоке';
 const P=PATH[x.id],lm=s=>[...new Set(s.split(' ').map(modOf))],mw=s=>{const k=lm(s);return (k.length>1?'модули ':'модуль ')+k.join(' и ')};
 const need1=P?P.learn.flatMap(l=>l[v?1:2].split(' ')):x.les,t0=r.TL.find(t=>M.tar[t]>=Math.max(...need1.map(modOf)));
 const tk=r.why==='cover'?(P?t0:r1.t):r.t;
 document.querySelector('#mods .w').innerHTML=`<h2>${P?'Чему учиться, чтобы <span class="ser">дойти до рабочей версии</span>':'Где этому <span class="ser">учат</span>'}</h2><p class="sub">Курс «${M.t}».</p>
 <div class="ml">${P?(C.lvl<(v?4:2)?`<div class="mod"><b>Модуль 1</b><div><h3>${v?'Подготовить рабочее место':'Разобраться с основой'}</h3></div></div>`:'')+P.learn.map(l=>`<div class="mod"><b>${mw(l[v?1:2]).replace(/^м/,'М')}</b><div><h3>${l[0]}</h3><p>${l[v?1:2].split(' ').map(k=>'«'+M.les[k]+'»').join(', ')}</p></div></div>`).join('')+(v&&out==='svc'&&!P.learn.some(l=>lm(l[1]).includes(7))?'<div class="mod"><b>Модуль 7</b><div><h3>Разделить роли, проверить безопасность и передать инструмент другим людям</h3><p>«'+M.les['7.6']+'», «'+M.les['7.12']+'», «'+M.les['7.13']+'»</p></div></div>':''):ks.map(k=>`<div class="mod"><b>Модуль ${k}</b><div><h3>${M.mods[k]}</h3><p>${path[k].length?path[k].map(l=>`Урок «${l[0]}»: <span>${l[1]}.</span>`).join('<br>'):k===1?'С этого начинают все.':'Собрать и запустить свой инструмент.'}</p></div></div>`).join('')}</div>
 <p class="sub">Свою задачу вы собираете сами, а кураторы помогают довести её до результата: ${v?'вопросы и домашние задания разбирают в чате, раз в две недели живые встречи.':'вопросы в чате с куратором, домашние задания проверяет нейрокуратор.'}</p>
 <p class="sub"><b>Вам подойдёт тариф «${tk}».</b> ${r.why==='cover'?`В нём есть всё для задачи «${esc(low(x.work))}».`:why}${r.why==='cover'&&above.length?` Когда возьмётесь за «${esc(low([...above].sort((a,b)=>topM(b)-topM(a))[0].work))}», можно доплатить до тарифа «${rAll.t}».`:''}</p>
 ${C.who==='me'&&v?`<p class="sub"><b>Стоимость тарифа «${tk}»:</b> ${{'База':'49 000','Практика':'69 000','Профи':'99 000'}[tk]} ₽, можно в рассрочку.</p><p class="sub"><b>Что понадобится.</b> Основной инструмент курса Codex, подписка оплачивается отдельно, от 20 $ в месяц. Данные клиентов для начала обезличиваете.</p>`:''}
 <div class="fin" id="fin">${final(x,red.length,out).map(t=>`<p>${t}</p>`).join('')}
 <h3>С чего начнёте</h3><ol class="pln"><li>Подготовите ${P?P.take:'пример по задаче «'+esc(low(x.work))+'»'}, ${P&&P.anon||'без реквизитов'}.</li><li>Пройдёте ${P?[...new Set(P.learn.flatMap(l=>lm(l[v?1:2])).concat(C.lvl<(v?4:2)?[1]:[],v&&out==='svc'?[7]:[]))].sort((a,b)=>a-b).reduce((s,k,i,q)=>s+(i?(i===q.length-1?' и ':', '):'')+k,'модули '):ks.reduce((s,k,i,q)=>s+(i?(i===q.length-1?' и ':', '):'')+k,ks.length>1?'модули ':'модуль ')} и соберёте первую версию.</li><li>${P?P.test||'Сверите её с закрытым периодом, где правильный ответ известен.':'Проверите её на примере, где правильный ответ вам известен.'}</li></ol>
 <h3>Что делаем дальше?</h3><div class="pick nxt" role="group" aria-label="Следующий шаг">${[['go',go1],['q','Остался вопрос']].map(k=>`<button type="button" data-g="${k[0]}" aria-pressed="${m.go===k[0]}">${k[1]}</button>`).join('')}</div><div id="nx" aria-live="polite"></div></div>`;
 const show=()=>{$('nx').innerHTML={go:`<ol class="pln"><li>Напишите мне: «Начинаю».</li><li>Выберем, как удобнее оплатить: сразу, в рассрочку или по счёту на компанию.</li><li>После оплаты придёт письмо о курсе, и вас добавят в чат потока.</li></ol><p>Если в первые 14 дней со старта потока поймёте, что курс вам не подходит, вернём всю сумму.</p>`,q:`<p>Задайте его мне, и я отвечу. Чаще всего спрашивают про время на учёбу, данные, оплату и свою конфигурацию 1С.</p>`}[m.go]||'';};
 document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{m.go=b.dataset.g;save();document.querySelectorAll('[data-g]').forEach(o=>o.setAttribute('aria-pressed',o===b));show()});show();
}
/* Вывод: мысль о задаче + почему стоит взяться + как снять то, что мешало */
function final(x,others,out){
 const stake={
  time:{a:'До часа в неделю. С такой задачи удобно начинать: она небольшая, и результат виден быстро.',
   b:'Один-три часа в неделю кажутся мелочью, а за месяц это до полутора рабочих дней.',
   c:'Три-пять часов в неделю, то есть около двух рабочих дней каждый месяц.',
   d:'Больше пяти часов в неделю, это минимум два с половиной рабочих дня в месяц.',
   x:'Засеките один раз, сколько уходит времени: будет с чем сравнить, когда появится свой инструмент.'}[m.hrs],
  err:'Если ошибка вскрывается позже, приходится поднимать прошлый период и исправлять всё, что на неё опиралось. Проверку стоит сдвинуть раньше.',
  money:'Вы отметили, что здесь можно потерять деньги, поэтому начать стоит именно отсюда.',
  me:'Вы отметили, что всё держится на вас. Когда порядок действий записан, его можно передать и нейросети, и коллеге.',
  none:`Сейчас это ничем не грозит, и на такой задаче спокойно учиться: ошибка никого не подведёт.${others?' Потом тем же способом возьмётесь за остальные.':''}`}[m.risk];
 const bar={
  how:'На обучении вы пройдёте это по шагам на своём примере, а где застрянете, спросите куратора.',
  acc:'Пока согласуете доступ, начать можно на обезличенном примере. Когда разрешат выгрузку, приём у вас уже будет.',
  time:'Достаточно взять одну эту задачу, остальные подождут. Уроки остаются в доступе, к ним можно возвращаться.',
  data:'Начать можно на примере без реквизитов. Как подготовить данные, разберёте до того, как подключать настоящие.'}[m.bar];
 return [esc(x.say)+' '+stake,bar];
}
next0();
function next0(){const i=S.findIndex(x=>ans[x.id]==null);i<0?result():ask(i)}
}
