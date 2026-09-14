# KTECH Interactive Showroom

## Approved design
Extend the existing HTML, CSS and JavaScript homepage with a synchronized APEX feature explorer and three illustrative lifestyle scenes. Preserve the dark, white and blue identity, product information and preorder flow. No backend or framework changes.

## UI acceptance criteria
- Camera, Audio and Controls buttons select the matching feature tab and inline description. Only verified visible hardware receives markers on the photograph; obscured components use controls below it.
- AI selection shows an explicitly illustrative glasses/phone/services diagram and the existing app requirement.
- Travel, Outdoors and Everyday tabs update the image, heading, description and APEX link together.
- Scene headings: Bring the moments home.; Keep the view.; Stay connected.
- Exact disclosure: Illustrative lifestyle imagery. Not captured with APEX.
- Controls support tap, keyboard and screen readers, have visible focus and minimum 44px targets, and appear only once initialized.
- Initial content is usable without JavaScript. Failed or slow images retain readable content; rapid selection cannot restore an old scene.
- Media dimensions are reserved. Transitions last 180ms and respect reduced motion.
- Existing navigation, FAQs, model selection, price/deposit calculations and copied preorder messages remain usable.

## Image deliverables
Built-in image generation supplies three photorealistic illustrative scenes, without glasses or product claims: a city café, mountain viewpoint and relaxed workspace. Responsive WebP variants are 1440×960 desktop and 640×640 mobile, below 250 KB and 120 KB respectively. Product photography remains unchanged.

## Validation and delivery
Verify 375px, 768px and 1440px layouts, keyboard and touch, reduced motion, JavaScript disabled, image failure and delayed loading, all model prices, clipboard success/failure, local link/asset integrity and console errors. Supply desktop/mobile previews and a pull request from an isolated branch. Do not merge or deploy.

## Deferred
Actual APEX capture demo awaits real footage. No quiz, 3D view, gallery or interactive unboxing in this release.
