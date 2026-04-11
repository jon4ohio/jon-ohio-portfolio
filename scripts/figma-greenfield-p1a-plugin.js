const PROJECTS = [{"idx":"01","slug":"seamless-hiring","title":"SeamlessHiring 2.0","subtitle":"Recruitment Management System (RMS)","meta":"Product Systems · SeamlessHR · Mar 2022 – Mar 2025","summary":"Repositioned a broken recruitment add-on into a flagship hiring product by fixing workflow trust, applicant completion, and system value.","metrics":"↓50% Support tickets · 100% Applicant completion · 27→74 NPS"},{"idx":"02","slug":"seamkit","title":"Seamkit","subtitle":"Enterprise Design System","meta":"Organizational Systems · SeamlessHR · Dec 2023 – Present","summary":"Built the operating system that aligned design and engineering across 12 teams, replacing fragmented libraries with one governed source of truth.","metrics":"12 Teams onboarded · 88.9 Adoption · 91.1 Trust"},{"idx":"03","slug":"fetsproza","title":"FetsProza","subtitle":"Infrastructure‑as‑a‑Service (IaaS) Platform","meta":"Operational Systems · Fets · Nigeria · 2021 – 2025","summary":"Designed the in-house transaction infrastructure that replaced an expensive vendor dependency and opened up white-label revenue.","metrics":"$1M+ Saved annually · 2× Transaction capacity · 50% Faster settlement"},{"idx":"04","slug":"ibedc","title":"IBEDC Digital Transformation","subtitle":"Care App + POS System","meta":"Operational Systems · Fets · 2.4M+ customers · 2022 – 2024","summary":"Digitised utility payments and service workflows for millions of customers across consumer app and in-person POS touchpoints.","metrics":"4.6★ Play Store · ↓30% Call-centre · 3 Utilities on POS"},{"idx":"05","slug":"rivva","title":"Rivva","subtitle":"AI Scheduling Platform","meta":"Intelligent Systems · Founding Team · Jul 2025 – Jan 2026","summary":"Shaped the trust layer for an AI scheduling product, translating biometric data into explainable planning people could act on.","metrics":"#4 Product Hunt · 500+ Downloads · 30+ Paying customers"},{"idx":"06","slug":"seamless-ai","title":"SeamlessAI","subtitle":"AI-Native Enterprise Layer","meta":"Intelligent Systems · SeamlessHR · Jan 2025 – Present","summary":"Established reusable AI interaction patterns for enterprise workflows so teams could ship AI features as a system instead of one-offs.","metrics":"Faster shortlisting · Reduced bias · Reusable AI patterns"},{"idx":"07","slug":"clearprice","title":"ClearPrice","subtitle":"Quote-to-Cash RevOps","meta":"0→1 Systems · Founding Team · Oct 2024 – Jul 2025","summary":"Defined a localised quote-to-cash product for African SaaS operators where global billing tools were a poor fit.","metrics":"0→1 MVP · Pilot soft launch · First localised RevOps"},{"idx":"08","slug":"abms","title":"ABMS","subtitle":"Agency Banking Management System","meta":"Operational Systems · Fets · 2022 – 2024","summary":"Designed the operational backbone for an agency banking network — onboarding, transaction monitoring, and reconciliation across thousands of agents.","metrics":"Multi-tier hierarchy · Real-time monitoring · Unified reconciliation"},{"idx":"09","slug":"blualliance","title":"BluAlliance","subtitle":"Blue-Collar HRM Platform","meta":"0→1 Systems · Gates Foundation × SeamlessHR · Jun 2025 – Present","summary":"Co-led product discovery for Africa’s first HRM platform for the blue-collar workforce — field research across Kenya and Nigeria, journey mapping, and MVP scoping.","metrics":"30+ Interviews · 2 Markets · 0→1 MVP scoped"}];

const C = {
  canvas: { r: 0.973, g: 0.973, b: 0.965 },
  primary: { r: 0.071, g: 0.071, b: 0.071 },
  muted: { r: 0.435, g: 0.424, b: 0.4 },
  subtle: { r: 0.435, g: 0.424, b: 0.4 },
  accent: { r: 0.608, g: 0.333, b: 0.239 },
  border: { r: 0.91, g: 0.906, b: 0.89 },
  surfaceSubtle: { r: 0.91, g: 0.906, b: 0.89 },
  onEmphasis: { r: 0.973, g: 0.973, b: 0.965 },
  emphasisBg: { r: 0.071, g: 0.071, b: 0.071 },
};

function fillRgb(node, rgb) {
  node.fills = [{ type: "SOLID", color: rgb }];
}
function textRgb(node, rgb) {
  node.fills = [{ type: "SOLID", color: rgb }];
}

const page = figma.root.children[0];
page.name = "JOP · Portfolio components";
await figma.setCurrentPageAsync(page);

await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

function propKey(defs, baseName) {
  if (!defs) return baseName;
  const hit = Object.keys(defs).find((k) => k === baseName || k.startsWith(baseName + "#"));
  return hit || baseName;
}

const colX = 48;
let yCursor = 40;

function placeBottom(root, pad) {
  let maxY = 0;
  for (const c of root.children) {
    maxY = Math.max(maxY, c.y + c.height);
  }
  return maxY + (pad || 0);
}

const lib = figma.createFrame();
lib.name = "🧩 Components";
lib.layoutMode = "VERTICAL";
lib.itemSpacing = 32;
lib.paddingLeft = 32;
lib.paddingRight = 32;
lib.paddingTop = 32;
lib.paddingBottom = 32;
lib.layoutSizingHorizontal = "HUG";
lib.layoutSizingVertical = "HUG";
lib.fills = [];
lib.strokes = [{ type: "SOLID", color: C.border }];
lib.strokeWeight = 1;
lib.cornerRadius = 8;
lib.x = colX;
lib.y = yCursor;
page.appendChild(lib);

const navVariants = [];
for (const state of ["default", "active"]) {
  const comp = figma.createComponent();
  comp.name = "state=" + state;
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisAlignItems = "CENTER";
  comp.counterAxisAlignItems = "CENTER";
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.paddingTop = 6;
  comp.paddingBottom = 6;
  comp.cornerRadius = 6;
  comp.layoutSizingHorizontal = "HUG";
  comp.layoutSizingVertical = "HUG";
  if (state === "active") fillRgb(comp, C.surfaceSubtle);
  else comp.fills = [];
  const labelKey = comp.addComponentProperty("Label", "TEXT", "Home");
  const t = figma.createText();
  t.fontSize = 14;
  t.textAutoResize = "WIDTH_AND_HEIGHT";
  t.characters = "Home";
  t.fontName = { family: "Inter", style: state === "active" ? "Medium" : "Regular" };
  textRgb(t, state === "active" ? C.primary : C.muted);
  comp.appendChild(t);
  t.componentPropertyReferences = { characters: labelKey };
  navVariants.push(comp);
}
let nv = 0;
for (const comp of navVariants) {
  comp.x = colX + nv * 160;
  comp.y = 120;
  page.appendChild(comp);
  nv++;
}
const navLinkSet = figma.combineAsVariants(navVariants, page);
navLinkSet.name = "Mol / Nav Link";
lib.appendChild(navLinkSet);

const navPropDefs = navLinkSet.componentPropertyDefinitions;
const defComp = navLinkSet.children.find((c) => c.name === "state=default");
const actComp = navLinkSet.children.find((c) => c.name === "state=active");

const navOrg = figma.createComponent();
navOrg.name = "Org / Site Nav";
navOrg.layoutMode = "VERTICAL";
navOrg.itemSpacing = 0;
navOrg.counterAxisAlignItems = "CENTER";
navOrg.primaryAxisAlignItems = "MIN";
navOrg.resize(1440, 56);
navOrg.layoutSizingHorizontal = "FIXED";
navOrg.layoutSizingVertical = "FIXED";
fillRgb(navOrg, C.canvas);

const inner = figma.createFrame();
inner.name = "Nav row";
inner.layoutMode = "HORIZONTAL";
inner.primaryAxisAlignItems = "SPACE_BETWEEN";
inner.counterAxisAlignItems = "CENTER";
inner.paddingLeft = 24;
inner.paddingRight = 24;
inner.resize(1240, 56);
inner.layoutSizingHorizontal = "FIXED";
inner.layoutSizingVertical = "FIXED";
inner.fills = [];

const brand = figma.createFrame();
brand.layoutMode = "HORIZONTAL";
brand.itemSpacing = 10;
brand.counterAxisAlignItems = "CENTER";
brand.fills = [];
const av = figma.createEllipse();
av.resize(36, 36);
fillRgb(av, C.surfaceSubtle);
av.strokes = [{ type: "SOLID", color: C.border }];
av.strokeWeight = 1;
brand.appendChild(av);
const brandT = figma.createText();
brandT.fontName = { family: "Inter", style: "Semi Bold" };
brandT.fontSize = 15;
brandT.characters = "John Ohio";
brandT.textAutoResize = "WIDTH_AND_HEIGHT";
textRgb(brandT, C.primary);
brand.appendChild(brandT);

const links = figma.createFrame();
links.layoutMode = "HORIZONTAL";
links.itemSpacing = 4;
links.fills = [];
const linkSpecs = [
  { label: "Home", active: false },
  { label: "Work", active: true },
  { label: "Leadership", active: false },
  { label: "About", active: false },
];
for (const spec of linkSpecs) {
  const src = spec.active ? actComp : defComp;
  const inst = src.createInstance();
  inst.setProperties({ [propKey(navPropDefs, "Label")]: spec.label });
  links.appendChild(inst);
}

const actions = figma.createFrame();
actions.layoutMode = "HORIZONTAL";
actions.itemSpacing = 18;
actions.counterAxisAlignItems = "CENTER";
actions.fills = [];
const themePh = figma.createRectangle();
themePh.resize(24, 24);
themePh.cornerRadius = 6;
fillRgb(themePh, C.surfaceSubtle);
themePh.strokes = [{ type: "SOLID", color: C.border }];
themePh.strokeWeight = 1;
actions.appendChild(themePh);
const cta = figma.createFrame();
cta.layoutMode = "HORIZONTAL";
cta.paddingLeft = 16;
cta.paddingRight = 16;
cta.paddingTop = 7;
cta.paddingBottom = 7;
cta.cornerRadius = 8;
cta.strokes = [{ type: "SOLID", color: C.primary }];
cta.strokeWeight = 1;
cta.fills = [];
const ctaT = figma.createText();
ctaT.fontSize = 13;
ctaT.fontName = { family: "Inter", style: "Medium" };
ctaT.characters = "Get in touch";
ctaT.textAutoResize = "WIDTH_AND_HEIGHT";
textRgb(ctaT, C.primary);
cta.appendChild(ctaT);
actions.appendChild(cta);

inner.appendChild(brand);
inner.appendChild(links);
inner.appendChild(actions);
navOrg.appendChild(inner);

const rule = figma.createRectangle();
rule.resize(1440, 1);
fillRgb(rule, C.border);
navOrg.appendChild(rule);
lib.appendChild(navOrg);

return { phase: "greenfield_p1a_done" };
