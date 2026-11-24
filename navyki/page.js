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
const said=x=>x[['red','grey','green'][ans[x.id]]];
/* Порядок ответов разный, но у каждого вопроса постоянный */
const ORD=[[1,0,2],[0,2,1],[2,0,1],[0,1,2],[1,2,0]];
function next(){const i=S.findIndex(x=>ans[x.id]==null);i<0?result(true):ask(i,true)}
function ask(i,move){
 const x=S[i];bar(i);$('after').hidden=true;$('intro').hidden=i>0||edit!==null;
 $('stage').innerHTML=`<div class="card"><p class="stp">${edit!==null?'Исправить ответ':`Задача ${i+1} из ${N}`}</p><h2 tabindex="-1">${esc(x.ask)}</h2><div class="opt">${ORD[i].map(v=>`<button type="button" data-v="${v}" aria-pressed="${ans[x.id]===v}">${esc(x[['red','grey','green'][v]])}</button>`).join('')}</div></div>${edit!==null||i?'<button class="back" type="button">Назад</button>':''}`;
 const os=[...$('stage').querySelectorAll('.opt button')];
 os.forEach(b=>b.onclick=()=>{if(busy)return;busy=true;const was=ans[x.id];ans[x.id]=+b.dataset.v;os.forEach(o=>o.setAttribute('aria-pressed',o===b));bar(i);
  if(x.id===focus&&was!==ans[x.id])pick(ans[x.id]===2?null:focus);save();setTimeout(()=>{busy=false;edit=null;next()},380)});
 const bk=$('stage').querySelector('.back');if(bk)bk.onclick=()=>{if(busy)return;if(edit!==null){edit=null;result(true)}else{delete ans[S[i-1].id];save();ask(i-1,true)}};
 if(move)top();
}
function pick(id){focus=id;m={out:m.out};run=false;st={}}
/* Какой короткий вопрос следующий */
function steps(){const l=['risk'];if(m.risk==='time')l.push('hrs');l.push('bar');if(!OUT[C.goal])l.push('out');return l}
const outOf=()=>OUT[C.goal]?C.goal:m.out;
function result(move){
 bar(-1);$('intro').hidden=true;
 const red=S.filter(x=>ans[x.id]===0),mid=S.filter(x=>ans[x.id]===1),ok=S.filter(x=>ans[x.id]===2),miss=[...red,...mid],n=red.length;
 if(focus&&!miss.some(x=>x.id===focus))pick(null);
 const head=n?`${plur(n,'задачу','задачи','задач')} из ${N} вы делаете <span class="ser">вручную</span>`:mid.length?`Вручную ничего. ${mid.length} из ${N} <span class="ser">приходится перепроверять</span>`:'Эти задачи у вас <span class="ser">уже налажены</span>';
 $('stage').innerHTML=`<div class="big">${n?`<div class="num">${n}</div>`:''}<h2 tabindex="-1">${head}</h2></div>
 <ul class="wall">${[...red,...mid,...ok].map(x=>`<li class="v${ans[x.id]}"><button type="button" data-e="${x.id}" title="Исправить ответ">${esc(x.work)}<small>${esc(said(x))}</small></button></li>`).join('')}</ul>
 <p class="leg"><i class="v0"></i>вручную: ${n}<i class="v1"></i>частично: ${mid.length}<i class="v2"></i>налажено: ${ok.length}</p><p class="fine">Чтобы исправить ответ, нажмите на задачу.</p>
 ${miss.length?`<div class="first"><h2>За какую задачу <span class="ser">взялись бы первой?</span></h2><div class="pick dk" role="group" aria-label="Задача">${miss.map(x=>`<button type="button" data-p="${x.id}" aria-pressed="${x.id===focus}">${esc(x.work)}</button>`).join('')}</div><div id="mini"></div></div>`:'<p class="cost">Учиться ради этих задач незачем. Давайте поговорим о том, что сейчас сложнее.</p>'}`;
 $('stage').querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{edit=b.dataset.e;ask(S.findIndex(x=>x.id===edit),true)});
 $('stage').querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{if(b.dataset.p!==focus)pick(b.dataset.p);save();$('stage').querySelectorAll('[data-p]').forEach(o=>o.setAttribute('aria-pressed',o===b));mini(miss)});
 save();if(miss.length)mini(miss);else $('after').hidden=true;
 if(move)top();
}
function mini(miss){
 const x=miss.find(q=>q.id===focus),el=$('mini');if(!x){el.innerHTML='';$('after').hidden=true;return}
 const L=steps(),q={risk:['Чем это грозит, если ничего не менять?',RISK],hrs:['Сколько времени занимает именно эта задача?',HRS],bar:['Что мешало сделать иначе?',BAR],out:['Что нужно получить в итоге?',OUT]};
 const shown=L.filter((k,i)=>L.slice(0,i).every(p=>m[p]));
 el.innerHTML=shown.map(k=>`<div class="mq"><h3>${q[k][0]}</h3><div class="pick dk" role="group" aria-label="${q[k][0]}">${Object.entries(q[k][1]).map(([v,t])=>`<button type="button" data-k="${k}" data-v="${v}" aria-pressed="${m[k]===v}">${t[0]}</button>`).join('')}</div></div>`).join('');
 el.querySelectorAll('button').forEach(b=>b.onclick=()=>{const k=b.dataset.k;m[k]=b.dataset.v;if(k==='risk'&&m.risk!=='time')delete m.hrs;save();mini(miss);
  const e=el.querySelector(`[data-k="${k}"][data-v="${m[k]}"]`);if(e)e.focus({preventScroll:true});
  if(L.length&&steps().every(p=>m[p])){if(k===steps().slice(-1)[0])$('proto').scrollIntoView()}else{const z=el.lastElementChild;if(z)z.scrollIntoView({block:'nearest'})}});
 const ready=L.every(p=>m[p]);$('after').hidden=!ready;if(ready){proto(miss,x);mods(x)}
}
function proto(miss,x){
 const rest=miss.filter(q=>q!==x&&ans[q.id]===0),pr=(W||WANT.time).pr;
 const x2=rest.filter(q=>q.task&&q.task===x.task).sort((a,b)=>pr.indexOf(a.t)-pr.indexOf(b.t))[0],id=C.course==='a'?'ca':'cv',cs=x.task?TASKS[x.task][id]:'',f=FEAR[C.fear];
 const url=(C.course==='a'?'https://cases-ai.fin-academy.pro/#pick=':'https://cases.fin-academy.pro/?pick=')+cs;
 const hd=C.res?'Вы хотели: '+esc(C.res):W?'Цель: '+esc(low(W.n)):'';
 document.querySelector('#proto .w').innerHTML=`<h2>Как это может <span class="ser">выглядеть</span></h2>
 <div class="duo"><div class="nowc"><small>Сейчас</small><p>${esc(x.ask)}</p><p class="an">${esc(said(x))}.</p><p class="yr">${m.risk==='none'?'Серьёзных последствий вы не видите.':'Чем грозит: '+RISK[m.risk][1]+'.'}${m.hrs&&HRS[m.hrs][1]?' Это '+HRS[m.hrs][1]+'.':''}</p></div>
 <div class="app"><div class="appbar"><div>${hd?`<small>${hd}</small>`:''}<b>${x.task?TASKS[x.task].h:'Работа с нейросетью'}</b></div></div>
 ${run?`<div class="rev">${one(x)}${x2?one(x2):''}</div>`:`<div class="wait"><p>${esc(x.work)}</p><button class="btn" type="button" id="run">${x.task?TASKS[x.task].act:'Показать'}</button></div>`}</div></div>
 <p class="fine">Пример на условных данных.</p>
 ${run&&(f||cs)?`<div class="two">${cs?`<div><h3>Похожая работа выпускника</h3><p>${CASES[cs]}</p><a href="${url}" target="_blank" rel="noopener">Посмотреть</a></div>`:''}${f?`<div><h3>${f[0]}</h3><p>${f[1]}</p></div>`:''}</div>`:''}`;
 if($('run'))$('run').onclick=()=>{run=true;proto(miss,x);const r=document.querySelector('.rev');r.tabIndex=-1;r.focus({preventScroll:true})};
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
function mods(x){
 const v=C.course==='v',out=outOf(),red=S.filter(q=>q!==x&&ans[q.id]===0),need=[x,...red],r=tariff(C.course,C.freq,need,out),r1=tariff(C.course,C.freq,[x],out);
 /* Путь для выбранной задачи, по порядку курса; первый модуль нужен тем, кто ещё не работает в этих инструментах */
 const path={};const put=k=>path[k]=path[k]||[];
 if(C.lvl<(v?3:2))put(1);x.les.forEach(l=>put(modOf(l)).push(M.les[l]));if(v&&out==='svc')put(7);
 const ks=Object.keys(path).map(Number).sort((a,b)=>a-b);
 const more=[...new Set(red.flatMap(q=>q.les.map(modOf)))].filter(k=>!path[k]).sort((a,b)=>a-b);
 const why={cover:red.length?`Его уроков хватает и на выбранную задачу, и на остальные, которые вы делаете вручную.`:'Его уроков хватает на выбранную задачу.',auto:'Данные должны обновляться сами, а для этого нужны сервер и связь с источником. Это модуль 5.',svc:'Инструментом будут пользоваться другие люди: нужны роли, проверка безопасности и запуск. Это модуль 7, он есть только в «Профи».',agent:'Вам нужен готовый помощник, а CFO-агент начинается с «Профи».'}[r.why];
 const less=r1.i<r.i?` Если пока ограничиться выбранной задачей, достаточно тарифа «${r1.t}».`:'';
 const over=r.i<r.TL.length-1&&!(v&&out==='svc')?` Тариф «${r.TL[r.i+1]}» для этого не нужен.`:'';
 const note=!v&&out==='svc'?'<p class="sub"><b>Важно:</b> инструмент для других людей этот курс целиком не собирает. Это стоит обсудить отдельно.</p>':'';
 document.querySelector('#mods .w').innerHTML=`<h2>Где этому <span class="ser">учат</span></h2><p class="sub">Путь к задаче «${esc(low(x.work))}» на курсе «${M.t}».</p>
 <div class="ml">${ks.map(k=>`<div class="mod"><b>Модуль ${k}</b><div><h3>${M.mods[k]}</h3><p>${path[k].length?(path[k].length>1?'Уроки: ':'Урок: ')+path[k].map(l=>'«'+l+'»').join(', '):k===1?(v?'Настроить рабочее место, с этого начинают все.':'Постановка задач и работа с данными, с этого начинают все.'):'Собрать и запустить свой инструмент.'}</p></div></div>`).join('')}</div>
 ${more.length?`<p class="fine">Для остальных задач, которые сейчас вручную, ${more.length===1?'пригодится ещё модуль':'пригодятся ещё модули'} ${more.join(', ')}.</p>`:''}
 <div class="tg">${r.TL.map(t=>`<div class="${t===r.t?'on':''}"><b>${t}</b><p class="cv">${r.count(t)} из ${need.length}</p><small>${need.length>1?'задач, которые вы делаете вручную или выбрали':'выбранная задача'}</small><p>${M.txt[t]}</p></div>`).join('')}</div>
 <p class="sub"><b>Рекомендую тариф «${r.t}».</b> ${why}${less}${over}</p>${note}<p class="fine">${startText(C.course)} Числа показывают, входят ли нужные уроки в тариф.</p>
 <div class="fin">${final(x,red.length,out).map(t=>`<p>${t}</p>`).join('')}</div>`;
}
/* Вывод: мысль о самой задаче + честная оценка по ответам клиента + совет */
function final(x,others,out){
 const more=others?` Другое дело, если заодно снять и остальное, что вы делаете вручную.`:'';
 const stake={
  time:{a:`До часа в неделю. Скажу честно: ради одной этой задачи учиться я бы не стала.${more}`,
   b:'Один-три часа в неделю кажутся мелочью, а за месяц это до полутора рабочих дней. Уже есть за что бороться.',
   c:'Три-пять часов в неделю, то есть около двух рабочих дней каждый месяц. Такое я бы откладывать не стала.',
   d:'Больше пяти часов в неделю, это минимум два с половиной рабочих дня в месяц. Начинать точно стоит отсюда.',
   x:'Сколько уходит времени, вы не считали. Засеките один раз: если выйдет полчаса, спокойно оставьте как есть.'}[m.hrs],
  err:'Раз ошибки потом приходится исправлять, вы делаете эту работу дважды. Вторая половина и есть то, что стоит убрать.',
  money:'Вы сказали, что здесь можно потерять деньги. Для меня это важнее любых сэкономленных часов, поэтому я бы начала отсюда.',
  me:'Вы сказали, что всё держится на вас. Тогда сначала порядок действий нужно записать: пока он только в голове, его не отдать ни человеку, ни нейросети.',
  none:`Но вы сами отметили, что ничем серьёзным это не грозит. Я бы тогда с этой задачи не начинала.${others?' Посмотрите на остальные красные, возможно, там важнее.':''}`}[m.risk];
 const bar={
  how:'Не знать, как иначе, нормально: большинство из нас осваивали эту работу ещё до нейросетей. Только пробуйте сразу на своём файле, на учебных всё всегда сходится.',
  acc:'Доступ к данным учёба вам не откроет, обещать этого не буду. Сначала узнайте, какую выгрузку разрешат. Если откажут, лучше взять другую задачу.',
  time:'Времени учёба сама не добавит, в первые недели его уйдёт даже больше. Если впереди отчётность, честнее выбрать другой срок, чем купить и не открыть.',
  data:'За данные вы опасаетесь правильно. Сначала разберитесь, что вообще можно отдавать нейросети, автоматизация подождёт.'}[m.bar];
 const tip={own:'',tool:['svc','meet','kp','bot','docs','tax','cons',''].includes(x.task)?'':'И ещё совет: первый раз прогоните инструмент на закрытом периоде, где правильный ответ уже известен.',svc:'И не спешите отдавать это людям. Сначала пользуйтесь сами, пока не перестанете перепроверять.'}[out];
 if(m.risk==='none')return[esc(x.say)+' '+stake];
 return [esc(x.say)+' '+stake,bar+(tip&&m.bar!=='acc'&&m.risk!=='none'?' '+tip:'')];
}
next0();
function next0(){const i=S.findIndex(x=>ans[x.id]==null);i<0?result():ask(i)}
}
