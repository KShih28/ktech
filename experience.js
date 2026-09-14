'use strict';

const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.focus();
    }
  });
}

function tabs(selector, onChange) {
  const buttons = [...document.querySelectorAll(selector)];
  function select(button, focus = false) {
    buttons.forEach(item => {
      const active = item === button;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    onChange(button);
    if (focus) button.focus();
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + buttons.length - 1) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        select(buttons[next], true);
      }
    });
  });
  return { buttons, select };
}

const featureContent = [
  ['Capture your perspective.', 'A 13 MP camera lets you save the view in front of you. Take photos and record video while keeping your phone tucked away.', 'Press the right button once for a photo, twice to start a video.'],
  ['Your soundtrack. Your surroundings.', 'Listen to music and take Bluetooth calls through open-ear speakers built into the frame.', 'Tap the right touch strip to play or pause. Slide to adjust the volume.'],
  ['Ask a little more.', 'Get conversational assistance, ask about a photo, and explore supported translation modes through the connected companion app.', 'Press the left button once to activate AI. App, phone connection and supported services are required.'],
  ['A touch of simplicity.', 'Use the frame’s buttons and touch strip to capture, listen and stay connected. Familiar actions, right at your fingertips.', 'Hold the right button for three seconds to power on or off. See the English guide for all controls.']
];

const featureTabs = tabs('[data-feature]', button => {
  const index = Number(button.dataset.feature);
  const content = featureContent[index];
  document.getElementById('feature-title').textContent = content[0];
  document.getElementById('feature-copy').textContent = content[1];
  document.getElementById('feature-detail').textContent = content[2];
  document.querySelector('.feature-index').textContent = `0${index + 1} / 04`;
  document.getElementById('feature-panel').setAttribute('aria-labelledby', button.id);
  document.getElementById('ai-connection').hidden = index !== 2;
  document.querySelectorAll('[data-hardware]').forEach(control => {
    control.setAttribute('aria-pressed', String(Number(control.dataset.hardware) === index));
  });
  const marker = index === 0 ? 'camera' : index === 3 ? 'controls' : '';
  document.querySelectorAll('[data-marker]').forEach(item => {
    item.classList.toggle('active', item.dataset.marker === marker);
  });
});

document.querySelectorAll('[data-hardware]').forEach(control => {
  control.addEventListener('click', () => {
    const button = featureTabs.buttons.find(item => item.dataset.feature === control.dataset.hardware);
    if (button) featureTabs.select(button, true);
  });
});
document.querySelector('.feature-explorer')?.classList.add('initialized');

const lifeContent = {
  travel: ['TRAVEL', 'Bring the moments home.', 'Capture the places and details you want to remember, with supported connected translation when you need it.', 'assets/lifestyle-travel.webp', 'assets/lifestyle-travel-mobile.webp', 'Illustrative travel scene', 'Explore APEX for travel'],
  outdoors: ['OUTDOORS', 'Keep the view.', 'Capture the scenery ahead while keeping your hands free and your attention on the moment.', 'assets/lifestyle-outdoors.webp', 'assets/lifestyle-outdoors-mobile.webp', 'Illustrative outdoor scenery', 'Explore APEX outdoors'],
  everyday: ['EVERYDAY', 'Stay connected.', 'Enjoy open-ear music, take Bluetooth calls and reach connected assistance throughout your day.', 'assets/lifestyle-everyday.webp', 'assets/lifestyle-everyday-mobile.webp', 'Illustrative everyday scene', 'Explore APEX every day']
};
let lifeRequest = 0;
const lifeImage = document.getElementById('life-image');
const lifeMedia = lifeImage?.closest('.life-media');
const lifeError = document.getElementById('life-image-status');
const lifeLoading = document.getElementById('life-loading-status');

function isCurrentLifeResource(item) {
  const current = lifeImage.currentSrc || lifeImage.src;
  return current.endsWith(item[3]) || current.endsWith(item[4]);
}

function showLifeFailure(request, item) {
  if (!lifeMedia || request !== lifeRequest || !isCurrentLifeResource(item)) return;
  lifeImage.alt = '';
  lifeMedia.classList.remove('loading');
  lifeMedia.classList.add('failed');
  lifeLoading.hidden = true;
  lifeError.hidden = false;
}

function showLifeLoaded(request, item) {
  if (request !== lifeRequest || !isCurrentLifeResource(item)) return;
  lifeMedia.classList.remove('loading', 'failed');
  lifeLoading.hidden = true;
  lifeError.hidden = true;
}

if (lifeImage) {
lifeImage.dataset.scene = 'travel';
lifeImage.addEventListener('load', () => {
  showLifeLoaded(lifeRequest, lifeContent[lifeImage.dataset.scene]);
});
lifeImage.addEventListener('error', () => {
  showLifeFailure(lifeRequest, lifeContent[lifeImage.dataset.scene]);
});
queueMicrotask(() => {
  if (!lifeImage.complete) return;
  const item = lifeContent[lifeImage.dataset.scene];
  if (lifeImage.naturalWidth > 0) showLifeLoaded(lifeRequest, item);
  else showLifeFailure(lifeRequest, item);
});

tabs('[data-life]', button => {
  const item = lifeContent[button.dataset.life];
  const request = ++lifeRequest;
  const panel = document.getElementById('life-panel');
  const source = lifeMedia.querySelector('source');
  document.getElementById('life-label').textContent = item[0];
  document.getElementById('life-title').textContent = item[1];
  document.getElementById('life-copy').textContent = item[2];
  panel.setAttribute('aria-labelledby', button.id);
  panel.querySelector('a').textContent = item[6];
  lifeMedia.classList.add('loading');
  lifeMedia.classList.remove('failed');
  lifeLoading.hidden = false;
  lifeError.hidden = true;

  lifeImage.dataset.scene = button.dataset.life;
  source.srcset = item[4];
  lifeImage.src = item[3];
  lifeImage.alt = item[5];
  queueMicrotask(() => {
    if (!lifeImage.complete || request !== lifeRequest) return;
    if (lifeImage.naturalWidth > 0) showLifeLoaded(request, item);
    else showLifeFailure(request, item);
  });
});
document.querySelector('.lifestyle')?.classList.add('initialized');
}

const modelSelect = document.getElementById('order-model');
const peso = value => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(value);
if (modelSelect) {
  const prices = { APEX: 5995, NOVA: 5995, NEO: 4995 };
  const update = () => {
    const price = prices[modelSelect.value];
    document.getElementById('order-total').textContent = peso(price).replace('.00', '');
    document.getElementById('order-deposit').textContent = peso(price / 2);
    document.getElementById('order-balance').textContent = peso(price / 2);
    document.getElementById('copy-status').textContent = '';
  };
  modelSelect.addEventListener('change', update);
  document.getElementById('copy-order').addEventListener('click', async () => {
    const price = prices[modelSelect.value];
    const message = `Hi KTECH! I’d like to preorder ${modelSelect.value} at ${peso(price)}. Please confirm availability, payment details, included accessories, warranty terms and delivery fees. I understand the 50% down payment is ${peso(price / 2)}, with the balance due before delivery.`;
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(message);
      status.textContent = 'Copied. Open Instagram and paste your message.';
    } catch {
      status.textContent = message;
    }
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
