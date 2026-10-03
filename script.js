const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
// preloader countdown
const lines=['> initializing the plan...','> bypassing firewall ........ OK','> loading the crew ........ OK','> access granted'];
const log=document.getElementById('bootlog'),pf=document.getElementById('pfill'),pc=document.getElementById('pct'),pre=document.getElementById('pre');
let li=0,p=0;
const iv=setInterval(()=>{p=Math.min(100,p+1+Math.random()*3);pf.style.width=p+'%';pc.textContent=Math.floor(p)+'%';
 const need=Math.min(lines.length,Math.floor(p/25)+1);while(li<need)log.textContent+=lines[li++]+'\n';
 if(p>=100){clearInterval(iv);setTimeout(()=>{pre.classList.add('go');start()},reduce?0:400)}},reduce?5:45);
// scramble text effect (decodes letter by letter)
function scramble(el){const f=el.textContent,sc='01<>/#$%&@';let n=0;
 const t=setInterval(()=>{const s=f.split('').map((ch,i)=>i<n?ch:sc[Math.floor(Math.random()*sc.length)]).join('');
  el.textContent=s;if('t' in el.dataset)el.dataset.t=s;n+=.4;
  if(n>f.length){clearInterval(t);el.textContent=f;if('t' in el.dataset)el.dataset.t=f}},40)}
// log ticker loop
const tk=document.getElementById('tk');tk.innerHTML+=tk.innerHTML;
// hero sequence
function start(){
 document.body.classList.add('ready');
 if(!reduce)setTimeout(()=>document.querySelectorAll('h1 span').forEach(scramble),900);
 const t=document.getElementById('term'),msg='> access granted. welcome, professor_';let i=0;
 (function k(){t.textContent=msg.slice(0,i++);if(i<=msg.length)setTimeout(k,reduce?0:45)})();
}
// red code rain
const cv=document.getElementById('rain'),x=cv.getContext('2d');let cols,drops;
function size(){cv.width=innerWidth;cv.height=innerHeight;cols=Math.floor(cv.width/18);drops=Array(cols).fill(0).map(()=>Math.random()*-50)}
size();addEventListener('resize',size);
const chars='01SOCSIEMLOGALERTBELLACIAO{}<>/#$';
function rain(){x.fillStyle='rgba(10,10,10,.12)';x.fillRect(0,0,cv.width,cv.height);x.fillStyle='#e10600';x.font='16px Share Tech Mono, monospace';
 drops.forEach((d,i)=>{x.fillText(chars[Math.floor(Math.random()*chars.length)],i*18,d*18);
  if(d*18>cv.height&&Math.random()>.975)drops[i]=0;drops[i]+=.6});}
if(!reduce)setInterval(rain,60);
// cursor glow + progress bar
const g=document.getElementById('glow');
addEventListener('mousemove',e=>{g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('bar').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
// scroll reveal, skill bars, counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const n=e.target;n.classList.add('in');
 n.querySelectorAll('.fil').forEach(f=>f.style.width=f.dataset.w+'%');
 n.querySelectorAll('[data-n]').forEach(b=>{const to=+b.dataset.n;let v=0;const s=Math.max(1,Math.ceil(to/60));
  const u=setInterval(()=>{v=Math.min(to,v+s);b.textContent=v;if(v>=to)clearInterval(u)},25)});
 io.unobserve(n)}),{threshold:.2});
document.querySelectorAll('.rv').forEach(n=>io.observe(n));
// 3D tilt on project cards
document.querySelectorAll('.card').forEach(c=>{
 c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
  c.style.transform=`perspective(700px) rotateY(${px*10}deg) rotateX(${-py*10}deg) translateY(-4px)`});
 c.addEventListener('mouseleave',()=>c.style.transform='')});
// mobile menu
const m=document.getElementById('menu');
document.getElementById('burger').onclick=()=>m.classList.toggle('open');
m.querySelectorAll('a').forEach(a=>a.onclick=()=>m.classList.remove('open'));
