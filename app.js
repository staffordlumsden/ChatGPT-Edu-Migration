const providers = [
  {name:'Personal ChatGPT', meta:'OpenAI · personal account', url:'https://chatgpt.com', icon:'https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128', fallback:'O'},
  {name:'Microsoft 365 Copilot', meta:'Microsoft 365', url:'https://office.com', icon:'https://www.google.com/s2/favicons?domain=microsoft365.com&sz=128', fallback:'C'},
  {name:'Gemini', meta:'Google', url:'https://gemini.google.com', icon:'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128', fallback:'G'},
  {name:'Anthropic', meta:'Claude · Opus · Sonnet', url:'https://claude.ai', icon:'https://www.google.com/s2/favicons?domain=claude.ai&sz=128', fallback:'A'},
  {name:'Perplexity', meta:'Perplexity AI', url:'https://www.perplexity.ai', icon:'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128', fallback:'P'},
  {name:'Grok', meta:'xAI', url:'https://grok.com', icon:'https://www.google.com/s2/favicons?domain=grok.com&sz=128', fallback:'X'},
  {name:'Le Chat', meta:'Mistral AI', url:'https://chat.mistral.ai', icon:'https://www.google.com/s2/favicons?domain=mistral.ai&sz=128', fallback:'M'},
  {name:'Qwen', meta:'Alibaba · Qwen Studio', url:'https://chat.qwen.ai', icon:'https://www.google.com/s2/favicons?domain=qwen.ai&sz=128', fallback:'Q'}
];

const promptFiles = {
  promptExtract: 'prompts/extract.md',
  promptReconcile: 'prompts/reconcile.md',
  promptIntegrate: 'prompts/integrate.md',
  promptRecognise: 'prompts/recognise.md'
};
const prompts = {};

async function loadPrompts(){
  await Promise.all(Object.entries(promptFiles).map(async ([id,url])=>{
    const response=await fetch(url);
    if(!response.ok) throw new Error(`Could not load ${url}`);
    prompts[id]=await response.text();
    const el=document.getElementById(id);
    if(el) el.textContent=prompts[id];
  }));
}

const slides = [...document.querySelectorAll('.slide')];
let current = Number(localStorage.getItem('pph-current') || 0);
if (!Number.isInteger(current) || current < 0 || current >= slides.length) current = 0;
const completed = new Set(JSON.parse(localStorage.getItem('pph-completed') || '[]'));

function providerCard(p){
  return `<a class="provider-card" href="${p.url}" target="_blank" rel="noopener"><div class="provider-icon-wrap"><img class="provider-icon" src="${p.icon}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="provider-fallback">${p.fallback}</span></div><div><div class="provider-name">${p.name}</div><div class="provider-meta">${p.meta}</div></div><span class="provider-arrow">↗</span></a>`;
}
document.getElementById('providerGrid').innerHTML = providers.map(providerCard).join('');
Object.keys(promptFiles).forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='Loading prompt…';});

function getSlideIndexForStep(step){
  return slides.findIndex(s=>Number(s.dataset.step)===Number(step));
}
function getCurrentStep(){
  return Number(slides[current].dataset.step || 0);
}
function buildRoadmaps(){
  const items=[['1','Extract','Ask each AI what it knows'],['2','Reconcile','Create one master harness'],['3','Integrate','Move durable context into Edu'],['4','Recognise','Test it in a new chat']];
  document.querySelectorAll('[data-roadmap]').forEach(el=>{
    const step=Number(el.closest('.slide').dataset.step);
    el.innerHTML=items.map((it,i)=>{const n=i+1;const accent=n===1?'var(--red)':n===2?'var(--gold)':n===3?'var(--teal)':'var(--indigo)';const state=completed.has(n)?'done':(n===step?'current':'');const currentAttr=n===step?' aria-current="step"':'';return `<button type="button" class="roadmap-item ${state}" data-go-step="${n}"${currentAttr} style="--accent:${accent}" aria-label="Go to step ${n}: ${it[1]}"><div class="roadmap-num">${completed.has(n)?'✓':it[0]}</div><div><h4>${it[1]}</h4><p>${it[2]}</p></div></button>`}).join('');
  });
}
function buildDots(){
  const wrap=document.getElementById('progressDots');wrap.innerHTML='';
  const currentStep=getCurrentStep();
  for(let i=1;i<=4;i++){const d=document.createElement('div');d.className='progress-dot'+(completed.has(i)?' done':'')+(currentStep===i?' current':'');if(currentStep===i){const color=i===1?'var(--red)':i===2?'var(--gold)':i===3?'var(--teal)':'var(--indigo)';d.style.background=color;d.style.outlineColor='color-mix(in srgb,'+color+' 18%, transparent)';}wrap.appendChild(d)}
}
function showSlide(index){
  current=Math.max(0,Math.min(slides.length-1,index));
  localStorage.setItem('pph-current',current);
  slides.forEach((s,i)=>s.classList.toggle('active',i===current));
  document.getElementById('pageCount').textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
  document.getElementById('progressLabel').textContent=slides[current].dataset.title;
  document.getElementById('prevBtn').disabled=current===0;
  document.getElementById('nextBtn').disabled=current===slides.length-1;
  buildDots();buildRoadmaps();window.scrollTo({top:0,behavior:'smooth'});
}
function markComplete(step){completed.add(Number(step));localStorage.setItem('pph-completed',JSON.stringify([...completed]));buildDots();buildRoadmaps()}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),1800)}


document.addEventListener('click',async e=>{
  const jump=e.target.closest('[data-go-step]'); if(jump){ const target=getSlideIndexForStep(Number(jump.dataset.goStep)); if(target>=0) showSlide(target);}
  const next=e.target.closest('[data-next]'); if(next) showSlide(current+1);
  const prev=e.target.closest('[data-prev]'); if(prev) showSlide(current-1);
  const comp=e.target.closest('[data-complete]'); if(comp) markComplete(comp.dataset.complete);
  const copy=e.target.closest('[data-copy]'); if(copy){try{await navigator.clipboard.writeText(prompts[copy.dataset.copy]);toast('Prompt copied');}catch{toast('Copy failed — select the prompt manually')}}
  const dl=e.target.closest('[data-download]'); if(dl){const blob=new Blob([prompts[dl.dataset.download]],{type:'text/markdown;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=dl.dataset.file||'prompt.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),500);toast('Prompt downloaded')}
});

document.getElementById('prevBtn').addEventListener('click',()=>showSlide(current-1));
document.getElementById('nextBtn').addEventListener('click',()=>showSlide(current+1));
document.getElementById('finishBtn').addEventListener('click',()=>{markComplete(4);toast('Workflow complete — keep your Master Harness safe')});
document.getElementById('resetProgress').addEventListener('click',()=>{if(confirm('Reset all local progress for this guide?')){localStorage.clear();location.reload()}});
document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight')showSlide(current+1);if(e.key==='ArrowLeft')showSlide(current-1)});

loadPrompts().catch(()=>toast('Some prompts could not be loaded')).finally(()=>showSlide(current));
