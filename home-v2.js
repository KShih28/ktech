"use strict";

const menu = document.querySelector(".v2-menu");
const nav = document.getElementById("v2-nav");
if (menu && nav) {
  const closeMenu = () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); };
  menu.addEventListener("click", () => { const open = menu.getAttribute("aria-expanded") !== "true"; nav.classList.toggle("open", open); menu.setAttribute("aria-expanded", String(open)); });
  nav.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
}

const featureContent = {
  capture: ["01 / 04", "See it. Keep it.", "A 13 MP camera captures the point of view you are already living, without pulling you out of the moment.", "Explore APEX capture"],
  sound: ["02 / 04", "Your soundtrack. Your surroundings.", "Open-ear speakers keep music and Bluetooth calls close while the world stays present.", "Explore APEX audio"],
  assist: ["03 / 04", "A little more help, right here.", "Reach connected assistance, object recognition, translation, and supported services through the companion app.", "Explore connected AI"],
  control: ["04 / 04", "Everything at your fingertips.", "Frame buttons and the touch strip make capture, sound, and connection feel familiar from the first use.", "Explore the controls"],
};
const featureButtons = [...document.querySelectorAll("[data-v2-feature]")];
const selectFeature = (button, focus = false) => {
  const item = featureContent[button.dataset.v2Feature];
  featureButtons.forEach((candidate) => { const active = candidate === button; candidate.setAttribute("aria-selected", String(active)); candidate.tabIndex = active ? 0 : -1; });
  document.getElementById("v2-feature-number").textContent = item[0];
  document.getElementById("v2-feature-title").textContent = item[1];
  document.getElementById("v2-feature-text").textContent = item[2];
  document.getElementById("v2-feature-link").firstChild.textContent = `${item[3]} `;
  if (focus) button.focus();
};
featureButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectFeature(button));
  button.addEventListener("keydown", (event) => {
    const offset = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (offset) { event.preventDefault(); selectFeature(featureButtons[(index + offset + featureButtons.length) % featureButtons.length], true); }
  });
});

const lifeContent = {
  travel: ["TRAVEL / 01", "Bring the moments home.", "Capture the places and details you want to remember, with supported connected translation when you need it.", "assets/lifestyle-travel.webp", "A travel moment with KTECH APEX"],
  outdoors: ["OUTDOORS / 02", "Keep the view.", "Keep your hands free and your attention forward while the scenery keeps moving.", "assets/lifestyle-outdoors.webp", "An outdoor moment with KTECH APEX"],
  everyday: ["EVERYDAY / 03", "Stay connected.", "Open-ear music, Bluetooth calls, and connected help move naturally through the day.", "assets/lifestyle-everyday.webp", "An everyday moment with KTECH APEX"],
  night: ["AFTER DARK / 04", "Keep the night in front of you.", "The details, music, and people stay close without taking your phone out of your pocket.", "assets/lifestyle-night.webp", "A night moment with KTECH APEX"],
};
const lifeButtons = [...document.querySelectorAll("[data-v2-life]")];
const lifeImage = document.getElementById("v2-life-image");
const selectLife = (button, focus = false) => {
  const item = lifeContent[button.dataset.v2Life];
  lifeButtons.forEach((candidate) => { const active = candidate === button; candidate.setAttribute("aria-selected", String(active)); candidate.tabIndex = active ? 0 : -1; });
  document.getElementById("v2-life-label").textContent = item[0];
  document.getElementById("v2-life-heading").textContent = item[1];
  document.getElementById("v2-life-copy").textContent = item[2];
  lifeImage.classList.add("is-changing");
  const nextImage = new Image();
  nextImage.onload = () => { lifeImage.src = item[3]; lifeImage.alt = item[4]; lifeImage.classList.remove("is-changing"); };
  nextImage.onerror = () => lifeImage.classList.remove("is-changing");
  nextImage.src = item[3];
  if (focus) button.focus();
};
lifeButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectLife(button));
  button.addEventListener("keydown", (event) => {
    const offset = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (offset) { event.preventDefault(); selectLife(lifeButtons[(index + offset + lifeButtons.length) % lifeButtons.length], true); }
  });
});

const price = (value, decimals = true) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: decimals ? 2 : 0, maximumFractionDigits: decimals ? 2 : 0 }).format(value);
const orderModel = document.getElementById("v2-model");
const orderQuantity = document.getElementById("v2-quantity");
const prices = { APEX: 5995, NOVA: 5995, NEO: 4995 };
const updateOrder = () => {
  if (!orderModel) return;
  const total = prices[orderModel.value] * Number(orderQuantity.value);
  document.getElementById("v2-total").textContent = price(total, false);
  document.getElementById("v2-deposit").textContent = price(total / 2);
  document.getElementById("v2-copy-status").textContent = "";
};
orderModel?.addEventListener("change", updateOrder); orderQuantity?.addEventListener("change", updateOrder); updateOrder();
document.getElementById("v2-copy")?.addEventListener("click", async () => {
  const quantity = Number(orderQuantity.value); const total = prices[orderModel.value] * quantity; const pair = quantity === 1 ? "pair" : "pairs";
  const message = `Hi KTECH! I’d like to pre-order ${quantity} ${pair} of ${orderModel.value} for ${price(total, false)}. Please confirm availability, payment details, included accessories, warranty terms and delivery fees. I understand the 50% down payment is ${price(total / 2)}, with the balance due before delivery.`;
  const status = document.getElementById("v2-copy-status");
  try { await navigator.clipboard.writeText(message); status.textContent = "Copied. Open Instagram and paste your message."; } catch { status.textContent = message; }
});

const rewardModal = document.getElementById("v2-reward-modal");
const rewardCards = [...document.querySelectorAll("#v2-reward-cards button")];
const voucher = document.getElementById("v2-voucher");
const rewardCopy = document.getElementById("v2-reward-copy");
let rewardTrigger;
const resetReward = () => { voucher.hidden = true; rewardCopy.hidden = false; rewardCards.forEach((card) => { card.disabled = false; card.textContent = "✦"; }); };
const closeReward = () => { rewardModal.classList.remove("is-open"); rewardModal.setAttribute("aria-hidden", "true"); document.body.style.removeProperty("overflow"); rewardTrigger?.focus(); };
document.getElementById("v2-open-reward")?.addEventListener("click", (event) => { rewardTrigger = event.currentTarget; resetReward(); rewardModal.classList.add("is-open"); rewardModal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; rewardCards[0]?.focus(); });
rewardModal?.querySelectorAll("[data-v2-close]").forEach((button) => button.addEventListener("click", closeReward));
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && rewardModal?.classList.contains("is-open")) closeReward(); });
rewardCards.forEach((card) => card.addEventListener("click", () => {
  const value = [100, 200, 300, 500][Math.floor(Math.random() * 4)];
  rewardCards.forEach((candidate) => { candidate.disabled = true; }); card.textContent = `₱${value}`;
  document.getElementById("v2-voucher-value").textContent = `₱${value} OFF`; rewardCopy.hidden = true; voucher.hidden = false;
}));
document.getElementById("v2-replay")?.addEventListener("click", resetReward);
