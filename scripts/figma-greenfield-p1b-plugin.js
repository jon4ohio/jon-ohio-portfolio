const PROJECTS = [{"idx":"01","slug":"seamless-hiring","title":"SeamlessHiring 2.0","subtitle":"Recruitment Management System (RMS)","meta":"Product Systems · SeamlessHR · Mar 2022 – Mar 2025","summary":"Repositioned a broken recruitment add-on into a flagship hiring product by fixing workflow trust, applicant completion, and system value.","metrics":"↓50% Support tickets · 100% Applicant completion · 27→74 NPS"},{"idx":"02","slug":"seamkit","title":"Seamkit","subtitle":"Enterprise Design System","meta":"Organizational Systems · SeamlessHR · Dec 2023 – Present","summary":"Built the operating system that aligned design and engineering across 12 teams, replacing fragmented libraries with one governed source of truth.","metrics":"12 Teams onboarded · 88.9 Adoption · 91.1 Trust"},{"idx":"03","slug":"fetsproza","title":"FetsProza","subtitle":"Infrastructure‑as‑a‑Service (IaaS) Platform","meta":"Operational Systems · Fets · Nigeria · 2021 – 2025","summary":"Designed the in-house transaction infrastructure that replaced an expensive vendor dependency and opened up white-label revenue.","metrics":"$1M+ Saved annually · 2× Transaction capacity · 50% Faster settlement"},{"idx":"04","slug":"ibedc","title":"IBEDC Digital Transformation","subtitle":"Care App + POS System","meta":"Operational Systems · Fets · 2.4M+ customers · 2022 – 2024","summary":"Digitised utility payments and service workflows for millions of customers across consumer app and in-person POS touchpoints.","metrics":"4.6★ Play Store · ↓30% Call-centre · 3 Utilities on POS"},{"idx":"05","slug":"rivva","title":"Rivva","subtitle":"AI Scheduling Platform","meta":"Intelligent Systems · Founding Team · Jul 2025 – Jan 2026","summary":"Shaped the trust layer for an AI scheduling product, translating biometric data into explainable planning people could act on.","metrics":"#4 Product Hunt · 500+ Downloads · 30+ Paying customers"},{"idx":"06","slug":"seamless-ai","title":"SeamlessAI","subtitle":"AI-Native Enterprise Layer","meta":"Intelligent Systems · SeamlessHR · Jan 2025 – Present","summary":"Established reusable AI interaction patterns for enterprise workflows so teams could ship AI features as a system instead of one-offs.","metrics":"Faster shortlisting · Reduced bias · Reusable AI patterns"},{"idx":"07","slug":"clearprice","title":"ClearPrice","subtitle":"Quote-to-Cash RevOps","meta":"0→1 Systems · Founding Team · Oct 2024 – Jul 2025","summary":"Defined a localised quote-to-cash product for African SaaS operators where global billing tools were a poor fit.","metrics":"0→1 MVP · Pilot soft launch · First localised RevOps"},{"idx":"08","slug":"abms","title":"ABMS","subtitle":"Agency Banking Management System","meta":"Operational Systems · Fets · 2022 – 2024","summary":"Designed the operational backbone for an agency banking network — onboarding, transaction monitoring, and reconciliation across thousands of agents.","metrics":"Multi-tier hierarchy · Real-time monitoring · Unified reconciliation"},{"idx":"09","slug":"blualliance","title":"BluAlliance","subtitle":"Blue-Collar HRM Platform","meta":"0→1 Systems · Gates Foundation × SeamlessHR · Jun 2025 – Present","summary":"Co-led product discovery for Africa’s first HRM platform for the blue-collar workforce — field research across Kenya and Nigeria, journey mapping, and MVP scoping.","metrics":"30+ Interviews · 2 Markets · 0→1 MVP scoped"}];

const C = {
  canvas: { r: 0.973, g: 0.973, b: 0.965 },
  primary: { r: 0.071, g: 0.071, b: 0.071 },
  muted: { r: 0.435, g: 0.424, b: 0.4 },
  subtle: { r: 0.435, g: 0.424, b: 0.4 },
  accent: { r: 0.608, g: 0.333, b: 0.239 },
  border: { r: 0.91, g: 0.906, b: 0.89 },
  surfaceSubtle: { r: 0.91, g: 0.906, b: 0.89 },
};

function fillRgb(node, rgb) {
  node.fills = [{ type: "SOLID", color: rgb }];
}
function textRgb(node, rgb) {
  node.fills = [{ type: "SOLID", color: rgb }];
}

function propKey(defs, baseName) {
  if (!defs) return baseName;
  const hit = Object.keys(defs).find((k) => k === baseName || k.startsWith(baseName + "#"));
  return hit || baseName;
}

const page = figma.root.children[0];
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

const lib = page.findAll((n) => n.type === "FRAME" && n.name === "🧩 Components")[0];
const navOrg = page.findAll((n) => n.type === "COMPONENT" && n.name === "Org / Site Nav")[0];
if (!lib || !navOrg) throw new Error("Run greenfield p1a first");

const colX = 48;


const bodyMain = figma.createComponent();
bodyMain.name = "Mol / Work Index Body";
bodyMain.layoutMode = "VERTICAL";
bodyMain.itemSpacing = 8;
bodyMain.layoutSizingHorizontal = "FIXED";
bodyMain.layoutSizingVertical = "HUG";
bodyMain.resize(744, 80);
bodyMain.fills = [];

const kMeta = bodyMain.addComponentProperty("Meta", "TEXT", "Meta");
const kTitle = bodyMain.addComponentProperty("Title", "TEXT", "Title");
const kSub = bodyMain.addComponentProperty("Subtitle", "TEXT", "Sub");
const kSum = bodyMain.addComponentProperty("Summary", "TEXT", "Sum");
const kMet = bodyMain.addComponentProperty("Metrics", "TEXT", "Met");

const meta = figma.createText();
meta.fontSize = 11;
meta.textAutoResize = "HEIGHT";
meta.resize(900, 40);
meta.characters = "Meta";
textRgb(meta, C.accent);
bodyMain.appendChild(meta);
meta.componentPropertyReferences = { characters: kMeta };

const title = figma.createText();
title.fontSize = 22;
title.fontName = { family: "Inter", style: "Semi Bold" };
title.textAutoResize = "HEIGHT";
title.resize(900, 40);
title.characters = "Title";
textRgb(title, C.primary);
bodyMain.appendChild(title);
title.componentPropertyReferences = { characters: kTitle };

const sub = figma.createText();
sub.fontSize = 14;
sub.textAutoResize = "HEIGHT";
sub.resize(900, 48);
sub.characters = "Sub";
textRgb(sub, C.muted);
bodyMain.appendChild(sub);
sub.componentPropertyReferences = { characters: kSub };

const sum = figma.createText();
sum.fontSize = 14;
sum.textAutoResize = "HEIGHT";
sum.resize(720, 120);
sum.characters = "Sum";
textRgb(sum, C.primary);
bodyMain.appendChild(sum);
sum.componentPropertyReferences = { characters: kSum };

const met = figma.createText();
met.fontSize = 13;
met.textAutoResize = "HEIGHT";
met.resize(720, 60);
met.characters = "Met";
textRgb(met, C.muted);
bodyMain.appendChild(met);
met.componentPropertyReferences = { characters: kMet };

lib.appendChild(bodyMain);

const rowMain = figma.createComponent();
rowMain.name = "Mol / Work Index Row";
rowMain.layoutMode = "HORIZONTAL";
rowMain.primaryAxisAlignItems = "MIN";
rowMain.counterAxisAlignItems = "MIN";
rowMain.itemSpacing = 20;
rowMain.paddingTop = 36;
rowMain.paddingBottom = 36;
rowMain.layoutSizingHorizontal = "FIXED";
rowMain.layoutSizingVertical = "HUG";
rowMain.resize(1192, 120);
rowMain.fills = [];

const kIdx = rowMain.addComponentProperty("Index", "TEXT", "01");
const idx = figma.createText();
idx.fontSize = 12;
idx.textAutoResize = "WIDTH_AND_HEIGHT";
idx.characters = "01";
textRgb(idx, C.subtle);
rowMain.appendChild(idx);
idx.componentPropertyReferences = { characters: kIdx };

const thumb = figma.createFrame();
thumb.resize(200, 150);
thumb.cornerRadius = 8;
thumb.clipsContent = true;
fillRgb(thumb, C.surfaceSubtle);
thumb.strokes = [{ type: "SOLID", color: C.border }];
thumb.strokeWeight = 1;
rowMain.appendChild(thumb);

const bodyInst = bodyMain.createInstance();
bodyInst.layoutGrow = 1;
bodyInst.layoutSizingHorizontal = "FILL";
rowMain.appendChild(bodyInst);

const ar = figma.createText();
ar.characters = "→";
ar.fontSize = 16;
ar.textAutoResize = "WIDTH_AND_HEIGHT";
textRgb(ar, C.subtle);
rowMain.appendChild(ar);
rowMain.resize(1192, rowMain.height);
lib.appendChild(rowMain);

const topRule = figma.createRectangle();
topRule.resize(1240, 1);
fillRgb(topRule, C.border);

const workPage = figma.createFrame();
workPage.name = "Page / Work";
workPage.layoutMode = "VERTICAL";
workPage.itemSpacing = 0;
workPage.primaryAxisAlignItems = "MIN";
workPage.counterAxisAlignItems = "CENTER";
workPage.layoutSizingHorizontal = "FIXED";
workPage.layoutSizingVertical = "HUG";
if ("primaryAxisSizingMode" in workPage) {
  workPage.primaryAxisSizingMode = "AUTO";
  workPage.counterAxisSizingMode = "FIXED";
}
workPage.resize(1440, 80);
fillRgb(workPage, C.canvas);

const navMain = navOrg;
const navInst = navMain.createInstance();
workPage.appendChild(navInst);

const intro = figma.createFrame();
intro.layoutMode = "VERTICAL";
intro.paddingLeft = 24;
intro.paddingRight = 24;
intro.paddingTop = 80;
intro.paddingBottom = 64;
intro.itemSpacing = 20;
intro.layoutSizingHorizontal = "FIXED";
intro.layoutSizingVertical = "HUG";
if ("primaryAxisSizingMode" in intro) {
  intro.primaryAxisSizingMode = "AUTO";
  intro.counterAxisSizingMode = "FIXED";
}
intro.resize(1240, 80);
intro.fills = [];

const lab = figma.createText();
lab.fontSize = 12;
lab.characters = "Selected Work";
lab.textAutoResize = "WIDTH_AND_HEIGHT";
textRgb(lab, C.muted);
intro.appendChild(lab);

const h1w = figma.createText();
h1w.fontSize = 44;
h1w.lineHeight = { unit: "PERCENT", value: 110 };
h1w.fontName = { family: "Inter", style: "Semi Bold" };
h1w.textAutoResize = "HEIGHT";
h1w.resize(640, 220);
h1w.characters = "Case studies in product systems, not isolated screens.";
textRgb(h1w, C.primary);
intro.appendChild(h1w);

const dek = figma.createText();
dek.fontSize = 17;
dek.lineHeight = { unit: "PERCENT", value: 160 };
dek.textAutoResize = "HEIGHT";
dek.resize(520, 200);
dek.characters = "I usually come in when the workflow is broken, the platform is fragmented, or the team needs a system it can actually scale.";
textRgb(dek, C.muted);
intro.appendChild(dek);
workPage.appendChild(intro);

const list = figma.createFrame();
list.name = "Work list";
list.layoutMode = "VERTICAL";
list.itemSpacing = 2;
list.fills = [];
list.layoutSizingHorizontal = "FIXED";
list.layoutSizingVertical = "HUG";
if ("primaryAxisSizingMode" in list) {
  list.primaryAxisSizingMode = "AUTO";
  list.counterAxisSizingMode = "FIXED";
}
list.resize(1240, 80);
list.appendChild(topRule);

const rowDefs = rowMain.componentPropertyDefinitions;
for (const p of PROJECTS) {
  const inst = rowMain.createInstance();
  inst.setProperties({ [propKey(rowDefs, "Index")]: p.idx });
  const bodyI = inst.findAll(
    (n) => n.type === "INSTANCE" && n.mainComponent && n.mainComponent.name === "Mol / Work Index Body"
  )[0];
  if (!bodyI) throw new Error("Body missing");
  const bd = bodyI.mainComponent.componentPropertyDefinitions;
  bodyI.setProperties({
    [propKey(bd, "Meta")]: p.meta,
    [propKey(bd, "Title")]: p.title,
    [propKey(bd, "Subtitle")]: p.subtitle,
    [propKey(bd, "Summary")]: p.summary,
    [propKey(bd, "Metrics")]: p.metrics,
  });
  const r = figma.createRectangle();
  r.resize(1240, 1);
  fillRgb(r, C.border);
  list.appendChild(inst);
  list.appendChild(r);
}
workPage.appendChild(list);

const screenStack = figma.createFrame();
screenStack.name = "Screens — flush (0px gap)";
screenStack.layoutMode = "VERTICAL";
screenStack.itemSpacing = 0;
screenStack.primaryAxisAlignItems = "MIN";
screenStack.counterAxisAlignItems = "CENTER";
screenStack.layoutSizingHorizontal = "FIXED";
screenStack.layoutSizingVertical = "HUG";
if ("primaryAxisSizingMode" in screenStack) {
  screenStack.primaryAxisSizingMode = "AUTO";
  screenStack.counterAxisSizingMode = "FIXED";
}
screenStack.resize(1440, 200);
screenStack.fills = [];
screenStack.clipsContent = false;

screenStack.appendChild(workPage);

const libBottom = lib.y + lib.height;
screenStack.x = colX;
screenStack.y = libBottom;
page.appendChild(screenStack);

return {
  libId: lib.id,
  screenStackId: screenStack.id,
  workPageId: workPage.id,
  phase: "part1_components_and_work_index",
};
