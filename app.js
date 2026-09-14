const features = [
  [
    "Voice-powered assistance",
    "Activate your AI by voice and connect to a large AI model for questions, answers and conversational support.",
  ],
  [
    "See it. Ask about it.",
    "Use photo-based object recognition to learn about what is in front of you.",
  ],
  [
    "Connect across languages",
    "Multilingual simultaneous interpretation helps you understand and communicate across supported languages.",
  ],
  [
    "Directions, within reach",
    "AI travel navigation provides assistance through supported companion-app services.",
  ],
  [
    "Capture your perspective",
    "Six-axis stabilised photos and video, noise-reduction recording and first-person live-streaming support.",
  ],
  [
    "Stay connected",
    "Bluetooth music and voice calls, built-in app functions, notification sounds and remote OTA firmware updates.",
  ],
];
document.getElementById("feature-grid").innerHTML = features
  .map(
    (f, i) =>
      `<article class="feature"><span class="feature-number">0${i + 1} / APEX AI</span><h3>${f[0]}</h3><p>${f[1]}</p></article>`,
  )
  .join("");
const groups = [
  [
    "Camera & audio",
    [
      ["Camera", "Samsung 13 MP front camera"],
      ["Stabilisation", "Six-axis G-sensor; anti-shake photos and video"],
      [
        "Microphones",
        "3 microphones; ANC/ENC dual-microphone noise-reduction support",
      ],
      [
        "Speakers",
        "Dual speakers, two-channel output and dual power amplifiers",
      ],
      [
        "Audio",
        "HiFi4 Bluetooth music processing; Bluetooth voice calls; noise-reduction recording",
      ],
      [
        "Recording indicators",
        "Photo/video recording indicator and two charging indicators",
      ],
    ],
  ],
  [
    "Connectivity & AI",
    [
      ["Wi-Fi", "Wi-Fi 6; dual-band 2.4 GHz / 5 GHz"],
      ["Bluetooth", "Bluetooth 6.0 and BLE"],
      [
        "Phone compatibility",
        "Bluetooth music streaming for iOS, Android and HarmonyOS",
      ],
      ["Antennas", "Bluetooth and Wi-Fi antennas"],
      [
        "AI functions",
        "Large-model connection, conversational AI, photo object recognition, travel navigation, multilingual simultaneous interpretation and voice activation",
      ],
      ["Voice wake phrase", "Hey Fan!"],
      [
        "App & updates",
        "Built-in app functions, notification sounds and remote OTA upgrades",
      ],
      [
        "Live streaming",
        "First-person live-streaming capture; supported app/service required",
      ],
    ],
  ],
  [
    "Battery & charging",
    [
      ["Battery", "300 mAh"],
      ["Charging connection", "Contact-based magnetic 2-pin charging"],
      ["Charging current", "100–200 mA; default 100 mA"],
      ["Reverse-charge protection", "Supported"],
      ["Bluetooth music / calls", "≥40 hours"],
      ["Continuous video", "60 minutes"],
      ["Standby", "6 months"],
      ["Daily endurance", " 40 hours; actual results depend on usage"],
      [
        "Optional protections",
        "OVP overvoltage, OCP overcurrent, NTC temperature control and EOS surge protection are configuration-dependent",
      ],
      ["ESD rating", "4 kV contact / 8 kV air"],
    ],
  ],
  [
    "Design, controls & hardware",
    [
      ["Frame", "TR material"],
      ["Temples & lenses", "PC material"],
      [
        "Controls",
        "Two buttons; tactile switch, single-point touch and sliding touch",
      ],
      ["Reset", "Built-in reset; hold button for 8–10 seconds"],
      ["Memory", "32Gb SD NAND + 4Gb DDR3L"],
      ["Mainboard", "AI386W-AK"],
      ["Main controller", "KM02G + 8961"],
      ["Package", "QFN88; 8 × 6 mm"],
      ["Audio Bluetooth IC", "BT8961"],
    ],
  ],
];
document.getElementById("spec-groups").innerHTML = groups
  .map(
    (g, i) =>
      `<details class="spec-group" ${i === 0 ? "open" : ""}><summary>${g[0]}<span aria-hidden="true">+</span></summary><table class="spec-table"><tbody>${g[1].map((r) => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</tbody></table></details>`,
  )
  .join("");
