'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) {nav.classList.remove('open');menu.setAttribute('aria-expanded', 'false');} });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) {nav.classList.remove('open');menu.setAttribute('aria-expanded', 'false');menu.focus();} });
}
function tabs(selector, onChange) {
  const buttons = [...document.querySelectorAll(selector)];
  function select(button, focus = false) {
    buttons.forEach(item => {const active = item === button;item.setAttribute('aria-selected', String(active));item.tabIndex = active ? 0 : -1;});
    onChange(button);
    if (focus) button.focus();
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) {event.preventDefault();select(buttons[next], true);}
    });
  });
}
const featureContent = [
 ['Capture your perspective.', 'A 13 MP camera lets you save the view in front of you. Take photos and record video while keeping your phone tucked away.', 'Press the right button once for a photo, twice to start a video.'],
 ['Your soundtrack. Your surroundings.', 'Listen to music and take Bluetooth calls through open-ear speakers built into the frame.', 'Tap the right touch strip to play or pause. Slide to adjust the volume.'],
 ['Ask a little more.', 'Get conversational assistance, ask about a photo, and explore supported translation modes through the connected companion app.', 'Press the left button once to activate AI. App, phone connection and supported services are required.'],
 ['A touch of simplicity.', 'Use the frame’s buttons and touch strip to capture, listen and stay connected. Familiar actions, right at your fingertips.', 'Hold the right button for three seconds to power on or off. See the English guide for all controls.']
];
tabs('[data-feature]', button => {
 const index = Number(button.dataset.feature); const content = featureContent[index];
 document.getElementById('feature-title').textContent = content[0];
 document.getElementById('feature-copy').textContent = content[1];
 document.getElementById('feature-detail').textContent = content[2];
 document.querySelector('.feature-index').textContent = `0${index + 1} / 04`;
 document.getElementById('feature-panel').setAttribute('aria-labelledby', button.id);
});
const lifeContent = {
 travel: ['THE NEXT PLACE','Take the memories home.','New streets, unexpected stops, and the little details. Capture what catches your eye and use supported translation when you need a little help.','assets/city.webp','Illustrative sunlit city street and café','Meet your travel companion'],
 hiking: ['THE GREAT OUTDOORS','Be here. Keep this.','The climb, the quiet, that first glimpse of the summit. Save your perspective without stopping to pull out your phone.','assets/highlands.webp','Illustrative mountain ridge trail at sunrise','Explore APEX for the outdoors'],
 cycling: ['THE WEEKEND RIDE','Remember the whole journey.','The café stop, the scenic detour, and the friends who came along. Capture the moments around your ride. Set up your glasses before moving and keep your attention on the road.','assets/city.webp','Illustrative bicycle parked beside a city café','Discover hands-free capture'],
 everyday: ['THE LITTLE MOMENTS','Make ordinary memorable.','A new idea. A favourite song. An unexpected view. Bring capture, calls and connected assistance into your everyday routine.','assets/apex-no-logo-studio.webp','APEX smart glasses on a studio surface','Find your everyday pair']
};
tabs('[data-life]', button => {
 const item = lifeContent[button.dataset.life];
 document.getElementById('life-label').textContent=item[0];document.getElementById('life-title').textContent=item[1];document.getElementById('life-copy').textContent=item[2];
 const image=document.getElementById('life-image');image.src=item[3];image.alt=item[4];
 const panel=document.getElementById('life-panel');panel.setAttribute('aria-labelledby',button.id);panel.querySelector('a').textContent=item[5];
});
const modelSelect=document.getElementById('order-model');
const peso=value=>new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',minimumFractionDigits:2}).format(value);
if(modelSelect){
 const prices={APEX:5995,NOVA:5995,NEO:4995};
 const update=()=>{const price=prices[modelSelect.value];document.getElementById('order-total').textContent=peso(price).replace('.00','');document.getElementById('order-deposit').textContent=peso(price/2);document.getElementById('order-balance').textContent=peso(price/2);document.getElementById('copy-status').textContent='';};
 modelSelect.addEventListener('change',update);
 document.getElementById('copy-order').addEventListener('click',async()=>{
  const price=prices[modelSelect.value];const message=`Hi KTECH! I’d like to preorder ${modelSelect.value} at ${peso(price)}. Please confirm availability, payment details, included accessories, warranty terms and delivery fees. I understand the 50% down payment is ${peso(price/2)}, with the balance due before delivery.`;
  const status=document.getElementById('copy-status');
  try {await navigator.clipboard.writeText(message);status.textContent='Copied. Open Instagram and paste your message.';}
  catch {status.textContent=message;}
 });
 update();
}

document.querySelectorAll('[data-order-model]').forEach(link => {
 link.addEventListener('click', () => {
  if (!modelSelect) return;
  modelSelect.value = link.dataset.orderModel;
  modelSelect.dispatchEvent(new Event('change'));
 });
});
