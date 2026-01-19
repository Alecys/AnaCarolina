const key = 'contador_vendidos';
let count = Number(localStorage.getItem(key) || 0);

const el = document.getElementById('count');
const addBtn = document.getElementById('addBtn');
const subBtn = document.getElementById('subBtn');

function render(){
  el.textContent = count;
  localStorage.setItem(key, count);
  subBtn.classList.toggle('hidden', count <= 0);
}

addBtn.addEventListener('click', ()=>{
  count += 1;
  pulse();
  render();
});

// Botão oculto para correção (aparece ao passar o mouse no card)
subBtn.addEventListener('click', ()=>{
  count = Math.max(0, count - 1);
  render();
});

// Atalho secreto: segurar ALT e clicar no número para subtrair
el.addEventListener('click', (e)=>{
  if(e.altKey){
    count = Math.max(0, count - 1);
    render();
  }
});

// Mostrar botão de correção ao passar o mouse
document.querySelector('.card').addEventListener('mouseenter', ()=>{
  if(count>0) subBtn.classList.remove('hidden');
});
document.querySelector('.card').addEventListener('mouseleave', ()=>{
  subBtn.classList.add('hidden');
});

function pulse(){
  el.animate([
    { transform:'scale(1)' },
    { transform:'scale(1.08)' },
    { transform:'scale(1)' }
  ], { duration: 280, easing:'ease-out' });
}

render();
