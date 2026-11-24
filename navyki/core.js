const esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const plur=(n,a,b,c)=>n%10==1&&n%100!=11?a:n%10>1&&n%10<5&&(n%100<10||n%100>20)?b:c;
const MN=['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],MG=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],MS=['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
const day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d};
const dates=s=>s.replace(/\{(mg|m|M|d-?\d+|w\d)\}/g,(x,k)=>{const n=new Date().getMonth();
  if(k==='m')return MN[n];if(k==='M')return MN[n][0].toUpperCase()+MN[n].slice(1);if(k==='mg')return MG[n];
  if(k[0]==='d'){const d=day(+k.slice(1));return d.getDate()+' '+MG[d.getMonth()]}
  const a=day(-((new Date().getDay()+6)%7)+7*k.slice(1)),b=new Date(a);b.setDate(b.getDate()+6);
  return a.getDate()+(a.getMonth()!==b.getMonth()?' '+MS[a.getMonth()]:'')+'–'+b.getDate()+' '+MS[b.getMonth()]});
const startText=c=>{const d=new Date(START[c]+'T23:59:59');return d<new Date()?'Дату ближайшего потока уточним.':(c==='v'?'Старт ':'Ближайший поток ')+d.getDate()+' '+MG[d.getMonth()]+'.'};
/* Ссылка: постоянные имена вместо номеров. Незнакомое имя не ломает страницу */
const AL='абвгдежзийклмнопрстуфхцчшщъыьэюяё',LT='abcdefghijklmnopqrstuvwxyz0123456';
const pack=t=>[...t].map(ch=>{const l=ch.toLowerCase(),i=AL.indexOf(l);if(i>=0)return(ch!==l?'.':'')+LT[i];return ch===' '?'_':'!'+ch.codePointAt(0).toString(36)+'!'}).join('');
const unpack=t=>t.replace(/!([0-9a-z]+)!|\.?[a-z0-6]|_/g,(m,x)=>{if(x)return String.fromCodePoint(parseInt(x,36));if(m==='_')return' ';const ch=AL[LT.indexOf(m[m.length-1])];return m[0]==='.'?ch.toUpperCase():ch});
const autoSaid=ts=>{const a=ts.slice(0,2).map(t=>TASKS[t].acc);return a.length?'писали, что больше всего времени уходит на '+a.join(' и '):''};
const mk=o=>{const said=o.said.replace(/\.$/,''),r=[[o.course,o.sph,o.want,o.lvl,o.goal,o.freq,o.who,o.fear].join('.'),o.tasks.join('.'),pack(o.name),said===autoSaid(o.tasks)?'':pack(said),pack(o.res)];
  while(r[r.length-1]==='')r.pop();return r.join('-')};
const un=h=>{const[c,t,n,sa,re]=h.split('-'),p=c.split('.'),tasks=(t||'').split('.').filter(x=>TASKS[x]);if(!tasks.length||!/^[va]$/.test(p[0]))throw 0;
  return{course:p[0],sph:SPH[p[1]]?p[1]:'other',want:WANT[p[2]]?p[2]:'',lvl:+p[3]||0,goal:p[4]||'',freq:p[5]||'',who:p[6]||'',fear:FEAR[p[7]]?p[7]:'',tasks,name:unpack(n||''),said:sa?unpack(sa):autoSaid(tasks),res:unpack(re||'')}};
/* Пять вопросов. Зависят только от курса и задач, больше ни от чего */
function skills(c){
  const k=c.course,n=c.tasks.length,q=n===1?[4]:n===2?[3,2]:[2,2,1],out=[];
  const add=(b,task)=>out.push({...b,task,les:b[k].split(' ')});
  c.tasks.forEach((t,j)=>TASKS[t].bl.filter(b=>b[k]).slice(0,q[j]).forEach(b=>add(b,t)));
  EXT.filter(e=>e[k]&&!(e.id==='safe'&&c.tasks.includes('tax'))&&!(e.id==='role'&&c.tasks.some(t=>['svc','bot','salary'].includes(t)))&&!(e.id==='srv'&&c.tasks.some(t=>['svc','bot'].includes(t)))).slice(0,5-out.length).forEach(e=>add(e,''));
  return out;
}
const modOf=l=>+l.split(/[.-]/)[0];
const topM=s=>Math.max(...s.les.map(modOf));
/* Тариф: какие задачи хочет закрыть + что нужно на выходе. Цвет ответов сам по себе тариф не поднимает */
function tariff(course,freq,need,out){
  const M=course==='a'?A:V,TL=Object.keys(M.tar),at=s=>TL.findIndex(t=>M.tar[t]>=topM(s));
  let i=Math.max(...need.map(at)),why='cover';
  const up=(j,w)=>{if(j>i){i=j;why=w}};
  if(course==='v'){if(out==='tool'&&freq==='auto')up(1,'auto');if(out==='svc')up(2,'svc')}
  else if(out==='tool')up(1,'agent');
  return{t:TL[i],i,why,TL,count:t=>need.filter(s=>M.tar[t]>=topM(s)).length};
}
