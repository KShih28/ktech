"use strict";

const menu = document.querySelector(".menu-toggle");
const nav = document.getElementById("main-nav");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.focus();
    }
  });
}

function tabs(selector, onChange) {
  const buttons = [...document.querySelectorAll(selector)];
  function select(button, focus = false) {
    buttons.forEach((item) => {
      const active = item === button;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    onChange(button);
    if (focus) button.focus();
  }
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => select(button));
    button.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight" || event.key === "ArrowDown")
        next = (index + 1) % buttons.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp")
        next = (index + buttons.length - 1) % buttons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        select(buttons[next], true);
      }
    });
  });
  return { buttons, select };
}

const featureContent = [
  [
    "Capture your perspective.",
    "A 13 MP camera lets you save the view in front of you. Take photos and record video while keeping your phone tucked away.",
    "Press the right button once for a photo, twice to start a video.",
  ],
  [
    "Your soundtrack. Your surroundings.",
    "Listen to music and take Bluetooth calls through open-ear speakers built into the frame.",
    "Tap the right touch strip to play or pause. Slide to adjust the volume.",
  ],
  [
    "Ask a little more.",
    "Get conversational assistance, ask about a photo, and explore supported translation modes through the connected companion app.",
    "Press the left button once to activate AI. App, phone connection and supported services are required.",
  ],
  [
    "A touch of simplicity.",
    "Use the frame’s buttons and touch strip to capture, listen and stay connected. Familiar actions, right at your fingertips.",
    "Hold the right button for three seconds to power on or off. See the English guide for all controls.",
  ],
];

const featureTabs = tabs("[data-feature]", (button) => {
  const index = Number(button.dataset.feature);
  const content = featureContent[index];
  document.getElementById("feature-title").textContent = content[0];
  document.getElementById("feature-copy").textContent = content[1];
  document.getElementById("feature-detail").textContent = content[2];
  document.querySelector(".feature-index").textContent = `0${index + 1} / 04`;
  document
    .getElementById("feature-panel")
    .setAttribute("aria-labelledby", button.id);
  document.getElementById("ai-connection").hidden = index !== 2;
  document.querySelectorAll("[data-hardware]").forEach((control) => {
    control.setAttribute(
      "aria-pressed",
      String(Number(control.dataset.hardware) === index),
    );
  });
  const marker = index === 0 ? "camera" : index === 3 ? "controls" : "";
  document.querySelectorAll("[data-marker]").forEach((item) => {
    item.classList.toggle("active", item.dataset.marker === marker);
  });
});

document.querySelectorAll("[data-hardware]").forEach((control) => {
  control.addEventListener("click", () => {
    const button = featureTabs.buttons.find(
      (item) => item.dataset.feature === control.dataset.hardware,
    );
    if (button) featureTabs.select(button, true);
  });
});
if (featureTabs.buttons.length) featureTabs.select(featureTabs.buttons[0]);
document.querySelector(".feature-explorer")?.classList.add("initialized");

const lifeContent = {
  travel: [
    "TRAVEL",
    "Bring the moments home.",
    "Capture the places and details you want to remember, with supported connected translation when you need it.",
    "assets/lifestyle-travel.webp",
    "assets/lifestyle-travel-mobile.webp",
    "Illustrative travel scene",
    "Explore APEX for travel",
    "Best for: saving the details you want to remember.",
  ],
  outdoors: [
    "OUTDOORS",
    "Keep the view.",
    "Capture the scenery ahead while keeping your hands free and your attention on the moment.",
    "assets/lifestyle-outdoors.webp",
    "assets/lifestyle-outdoors-mobile.webp",
    "Illustrative outdoor scenery",
    "Explore APEX outdoors",
    "Best for: keeping your hands free when the view is moving.",
  ],
  everyday: [
    "EVERYDAY",
    "Stay connected.",
    "Enjoy open-ear music, take Bluetooth calls and reach connected assistance throughout your day.",
    "assets/lifestyle-everyday.webp",
    "assets/lifestyle-everyday-mobile.webp",
    "Illustrative everyday scene",
    "Explore APEX every day",
    "Best for: calls, music and connected help without reaching for your phone.",
  ],
  night: [
    "NIGHT OUT",
    "Keep the night in front of you.",
    "Stay present with your friends while music, calls and the little details move with you.",
    "assets/lifestyle-night.webp",
    "assets/lifestyle-night-mobile.webp",
    "Illustrative city night scene",
    "Explore APEX for every moment",
    "Best for: staying in the moment while the night keeps moving.",
  ],
};
let lifeRequest = 0;
const lifeImage = document.getElementById("life-image");
const lifeMedia = lifeImage?.closest(".life-media");
const lifeError = document.getElementById("life-image-status");
const lifeLoading = document.getElementById("life-loading-status");

function isCurrentLifeResource(item) {
  const current = lifeImage.currentSrc || lifeImage.src;
  return current.endsWith(item[3]) || current.endsWith(item[4]);
}

function showLifeFailure(request, item) {
  if (!lifeMedia || request !== lifeRequest || !isCurrentLifeResource(item))
    return;
  lifeImage.alt = "";
  lifeMedia.classList.remove("loading");
  lifeMedia.classList.add("failed");
  lifeLoading.hidden = true;
  lifeError.hidden = false;
}

function showLifeLoaded(request, item) {
  if (request !== lifeRequest || !isCurrentLifeResource(item)) return;
  lifeImage.alt = item[5];
  lifeMedia.classList.remove("loading", "failed");
  lifeLoading.hidden = true;
  lifeError.hidden = true;
}

if (lifeImage) {
  lifeImage.dataset.scene = "travel";
  lifeImage.addEventListener("load", () => {
    showLifeLoaded(lifeRequest, lifeContent[lifeImage.dataset.scene]);
  });
  lifeImage.addEventListener("error", () => {
    showLifeFailure(lifeRequest, lifeContent[lifeImage.dataset.scene]);
  });
  queueMicrotask(() => {
    if (!lifeImage.complete) return;
    const item = lifeContent[lifeImage.dataset.scene];
    if (lifeImage.naturalWidth > 0) showLifeLoaded(lifeRequest, item);
    else showLifeFailure(lifeRequest, item);
  });

  tabs("[data-life]", (button) => {
    const item = lifeContent[button.dataset.life];
    const request = ++lifeRequest;
    const panel = document.getElementById("life-panel");
    const source = lifeMedia.querySelector("source");
    document.getElementById("life-label").textContent = item[0];
    document.getElementById("life-title").textContent = item[1];
    document.getElementById("life-copy").textContent = item[2];
    document.getElementById("life-benefit").textContent = item[7];
    panel.setAttribute("aria-labelledby", button.id);
    panel.querySelector("a").textContent = item[6];
    lifeMedia.classList.add("loading");
    lifeMedia.classList.remove("failed");
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
  document.querySelector(".lifestyle")?.classList.add("initialized");
}

const recordingRange = document.getElementById("recording-range");
if (recordingRange) {
  const recordingOutput = document.getElementById("recording-output");
  const recordingFill = document.getElementById("recording-fill");
  const recordingFeedback = document.getElementById("recording-feedback");
  const updateRecordingTimeline = () => {
    const minutes = Number(recordingRange.value);
    recordingOutput.value = `${String(minutes).padStart(2, "0")}:00`;
    recordingOutput.textContent = recordingOutput.value;
    recordingFill.style.width = `${minutes * 10}%`;
    if (minutes === 10) {
      recordingFeedback.textContent =
        "The full up-to-10-minute APEX recording window.";
    } else if (minutes === 3) {
      recordingFeedback.textContent =
        "At the 03:00 reference point. APEX can keep going.";
    } else if (minutes > 3) {
      recordingFeedback.textContent = `${minutes} minutes of your moment, with ${10 - minutes} more minute${10 - minutes === 1 ? "" : "s"} available in this APEX recording.`;
    } else {
      recordingFeedback.textContent = `${minutes} minute${minutes === 1 ? "" : "s"} of your moment, with room to keep going.`;
    }
  };
  recordingRange.addEventListener("input", updateRecordingTimeline);
  updateRecordingTimeline();
}

const hero = document.querySelector(".experience-hero");
if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    hero.style.setProperty("--hero-x", `${x * 10}px`);
    hero.style.setProperty("--hero-y", `${y * 8}px`);
  });
  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-x", "0px");
    hero.style.setProperty("--hero-y", "0px");
  });
}

const modelSelect = document.getElementById("order-model");
const quantitySelect = document.getElementById("order-quantity");
const peso = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(value);
if (modelSelect) {
  const prices = { APEX: 5995, NOVA: 5995, NEO: 4995 };
  const update = () => {
    const quantity = Number(quantitySelect?.value || 1);
    const total = prices[modelSelect.value] * quantity;
    document.getElementById("order-total").textContent = peso(total).replace(
      ".00",
      "",
    );
    document.getElementById("order-deposit").textContent = peso(total / 2);
    document.getElementById("order-balance").textContent = peso(total / 2);
    document.getElementById("copy-status").textContent = "";
  };
  modelSelect.addEventListener("change", update);
  quantitySelect?.addEventListener("change", update);
  document.getElementById("copy-order").addEventListener("click", async () => {
    const quantity = Number(quantitySelect?.value || 1);
    const total = prices[modelSelect.value] * quantity;
    const pairLabel = quantity === 1 ? "pair" : "pairs";
    const message = `Hi KTECH! I’d like to pre-order ${quantity} ${pairLabel} of ${modelSelect.value} for ${peso(total)}. Please confirm availability, payment details, included accessories, warranty terms and delivery fees. I understand the 50% down payment is ${peso(total / 2)}, with the balance due before delivery. I will send up to ${quantity} Deal Your KTech Reward screenshot${quantity === 1 ? "" : "s"} — one voucher may be used for each unit ordered.`;
    const status = document.getElementById("copy-status");
    try {
      await navigator.clipboard.writeText(message);
      status.textContent = "Copied. Open Instagram and paste your message.";
    } catch {
      status.textContent = message;
    }
  });
  update();
}

const rewardModal = document.getElementById("reward-modal");
const rewardPanel = rewardModal?.querySelector(".reward-panel");
const rewardCards = [...(document.querySelectorAll(".reward-card") || [])];
const rewardVoucher = document.getElementById("reward-voucher");
const rewardInstruction = document.getElementById("reward-instruction");
const rewardReplay = document.getElementById("reward-replay");
const rewardValues = [100, 200, 300, 500];
let lastRewardTrigger;

const referenceFor = () =>
  `KT-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

const resetRewardGame = () => {
  rewardPanel?.classList.remove("is-blue-deal");
  rewardVoucher.hidden = true;
  rewardInstruction.hidden = false;
  rewardCards.forEach((card) => {
    card.classList.remove("is-revealed");
    card.disabled = false;
    card.querySelector(".card-front").replaceChildren();
  });
};

const closeRewardGame = () => {
  if (!rewardModal) return;
  rewardModal.classList.remove("is-open");
  rewardModal.setAttribute("aria-hidden", "true");
  document.body.style.removeProperty("overflow");
  lastRewardTrigger?.focus();
};

const openRewardGame = (trigger) => {
  if (!rewardModal) return;
  lastRewardTrigger = trigger;
  resetRewardGame();
  rewardModal.classList.add("is-open");
  rewardModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  rewardCards[0]?.focus();
};

document.getElementById("open-reward")?.addEventListener("click", (event) =>
  openRewardGame(event.currentTarget),
);
rewardModal?.querySelectorAll("[data-close-reward]").forEach((button) =>
  button.addEventListener("click", closeRewardGame),
);
rewardReplay?.addEventListener("click", resetRewardGame);
rewardCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("is-revealed")) return;
    const reward = rewardValues[Math.floor(Math.random() * rewardValues.length)];
    rewardCards.forEach((item) => (item.disabled = true));
    card.classList.add("is-revealed");
    card.querySelector(".card-front").innerHTML = `<strong>₱${reward}</strong><small>OFF</small>`;
    window.setTimeout(() => {
      document.getElementById("voucher-value").textContent = `₱${reward} OFF`;
      document.getElementById("voucher-reference").textContent = referenceFor();
      document.getElementById("voucher-date").textContent = new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", year: "numeric" }).format(new Date());
      document.getElementById("voucher-label").textContent = reward === 500 ? "YOUR BLUE DEAL" : "YOUR PREORDER REWARD";
      rewardPanel?.classList.toggle("is-blue-deal", reward === 500);
      rewardInstruction.hidden = true;
      rewardVoucher.hidden = false;
      rewardReplay?.focus();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 620);
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && rewardModal?.classList.contains("is-open")) closeRewardGame();
});

document.querySelectorAll("[data-order-model]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!modelSelect) return;
    modelSelect.value = link.dataset.orderModel;
    modelSelect.dispatchEvent(new Event("change"));
  });
});

const aboutValues = {
  useful: [
    "01 / 03",
    "Technology with a reason to be in your day.",
    "We look for meaningful capabilities, practical value, and the small details that make a device worth reaching for.",
    "The future is more useful when it fits naturally into the life you already have.",
    "assets/editorial-coast.webp",
    "Illustrative coastline viewed from a quiet vantage point",
    "A clearer perspective starts with the real world.",
  ],
  clear: [
    "02 / 03",
    "Clear information for a confident choice.",
    "We explain what is confirmed, what each product is best for, and where a little more context helps you decide.",
    "The details should make a decision easier, never make it feel further away.",
    "assets/editorial-studio.webp",
    "Illustrative creative workspace in a city studio",
    "Good technology earns a closer look when the details are clear.",
  ],
  present: [
    "03 / 03",
    "Made to support the moment, not distract from it.",
    "We care about technology that helps you create, connect, work, or simply stay present in the moment.",
    "A useful device gives you more room to live the day in front of you.",
    "assets/editorial-rooftop.webp",
    "Illustrative person looking across a city rooftop",
    "The best view of what is next still leaves room for right now.",
  ],
};

const aboutChoices = {
  everyday: [
    "THE EVERYDAY TEST",
    "Where does it make the day better?",
    "We look for a clear moment where a device can make life easier, richer, or more connected.",
    "assets/lifestyle-everyday.webp",
    "Illustrative everyday city scene",
  ],
  value: [
    "THE VALUE TEST",
    "Is the capability worth choosing?",
    "Capability matters—but so does whether it feels worth choosing for the way you actually live.",
    "assets/apex-studio.webp",
    "APEX smart glasses displayed in a studio setting",
  ],
  simple: [
    "THE CLARITY TEST",
    "Can the essential experience be understood?",
    "We make the essentials clear, including when an app or setup is part of the experience.",
    "assets/city.webp",
    "Illustrative city environment",
  ],
};

const aboutCategories = {
  glasses: [
    "AVAILABLE NOW",
    "Smart glasses",
    "Capture, connection, and an easier way to stay present.",
    "assets/about-smart-glasses.png",
    "Person wearing smart glasses at a city café",
    "Explore APEX",
    "apex.html",
  ],
  computing: [
    "EXPLORING",
    "Compact computing",
    "Thoughtful performance for modern work and creativity.",
    "assets/about-compact-computing.png",
    "Creative professional using a compact desktop computer",
    "See what we value",
    "#direction",
  ],
  wearables: [
    "EXPLORING",
    "Wearables",
    "Technology that moves with you.",
    "assets/about-wearables.png",
    "Person wearing a smartwatch and open-ear earbuds on a waterfront walk",
    "See what we value",
    "#direction",
  ],
  hardware: [
    "EXPLORING",
    "Emerging hardware",
    "New hardware with a practical purpose.",
    "assets/about-emerging-hardware.png",
    "Person using a compact countertop assistant in a home kitchen",
    "See how we choose",
    "#choice-title",
  ],
};

function swapAboutImage(image, source, alt) {
  if (!image || image.getAttribute("src") === source) return;
  image.classList.add("is-changing");
  image.src = source;
  image.alt = alt;
  window.setTimeout(
    () => image.classList.remove("is-changing"),
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260,
  );
}

const valueTabs = tabs("[data-value]", (button) => {
  const item = aboutValues[button.dataset.value];
  if (!item) return;
  document.getElementById("value-index").textContent = item[0];
  document.getElementById("value-title").textContent = item[1];
  document.getElementById("value-copy").textContent = item[2];
  document.getElementById("value-detail").textContent = item[3];
  document.getElementById("value-caption").textContent = item[6];
  document.getElementById("value-panel").setAttribute("aria-labelledby", button.id);
  swapAboutImage(document.getElementById("value-image"), item[4], item[5]);
});

const choiceTabs = tabs("[data-choice]", (button) => {
  const item = aboutChoices[button.dataset.choice];
  if (!item) return;
  document.getElementById("choice-label").textContent = item[0];
  document.getElementById("choice-heading").textContent = item[1];
  document.getElementById("choice-copy").textContent = item[2];
  document.getElementById("choice-panel").setAttribute("aria-labelledby", button.id);
  swapAboutImage(document.getElementById("choice-image"), item[3], item[4]);
});

const categoryTabs = tabs("[data-category]", (button) => {
  const item = aboutCategories[button.dataset.category];
  if (!item) return;
  document.getElementById("category-status").textContent = item[0];
  document.getElementById("category-heading").textContent = item[1];
  document.getElementById("category-copy").textContent = item[2];
  const link = document.getElementById("category-link");
  link.textContent = item[5];
  link.href = item[6];
  link.insertAdjacentHTML("beforeend", ' <span aria-hidden="true">↗</span>');
  document.getElementById("category-panel").setAttribute("aria-labelledby", button.id);
  swapAboutImage(document.getElementById("category-image"), item[3], item[4]);
});

if (valueTabs.buttons.length) valueTabs.select(valueTabs.buttons[0]);
if (choiceTabs.buttons.length) choiceTabs.select(choiceTabs.buttons[0]);
if (categoryTabs.buttons.length) categoryTabs.select(categoryTabs.buttons[0]);

const revealItems = document.querySelectorAll(".about-reveal");
if (revealItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("will-reveal"));
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
