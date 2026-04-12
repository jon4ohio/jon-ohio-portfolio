const PAGE_NAME = "JOP · Portfolio components";
const page = figma.root.children.find((p) => p.name === PAGE_NAME);
if (!page) throw new Error("Missing page");
await figma.setCurrentPageAsync(page);

function walkRename(root, oldName, newName) {
  if (root.name === oldName) root.name = newName;
  if ("children" in root) for (const c of root.children) walkRename(c, oldName, newName);
}
walkRename(page, "Mol / Work Index Body", "z_LEGACY Mol / Work Index Body");
walkRename(page, "Mol / Work Index Row", "z_LEGACY Mol / Work Index Row");
walkRename(page, "Page / Work", "z_LEGACY Page / Work");

const PROJECTS = [{"idx":"01","slug":"seamless-hiring","title":"SeamlessHiring 2.0","subtitle":"Recruitment Management System (RMS)","meta":"Product Systems · SeamlessHR · Mar 2022 – Mar 2025","summary":"Repositioned a broken recruitment add-on into a flagship hiring product by fixing workflow trust, applicant completion, and system value.","metrics":"↓50% Support tickets · 100% Applicant completion · 27→74 NPS"},{"idx":"02","slug":"seamkit","title":"Seamkit","subtitle":"Enterprise Design System","meta":"Organizational Systems · SeamlessHR · Dec 2023 – Present","summary":"Built the operating system that aligned design and engineering across 12 teams, replacing fragmented libraries with one governed source of truth.","metrics":"12 Teams onboarded · 88.9 Adoption · 91.1 Trust"},{"idx":"03","slug":"fetsproza","title":"FetsProza","subtitle":"Infrastructure‑as‑a‑Service (IaaS) Platform","meta":"Operational Systems · Fets · Nigeria · 2021 – 2025","summary":"Designed the in-house transaction infrastructure that replaced an expensive vendor dependency and opened up white-label revenue.","metrics":"$1M+ Saved annually · 2× Transaction capacity · 50% Faster settlement"},{"idx":"04","slug":"ibedc","title":"IBEDC Digital Transformation","subtitle":"Care App + POS System","meta":"Operational Systems · Fets · 2.4M+ customers · 2022 – 2024","summary":"Digitised utility payments and service workflows for millions of customers across consumer app and in-person POS touchpoints.","metrics":"4.6★ Play Store · ↓30% Call-centre · 3 Utilities on POS"},{"idx":"05","slug":"rivva","title":"Rivva","subtitle":"AI Scheduling Platform","meta":"Intelligent Systems · Founding Team · Jul 2025 – Jan 2026","summary":"Shaped the trust layer for an AI scheduling product, translating biometric data into explainable planning people could act on.","metrics":"#4 Product Hunt · 500+ Downloads · 30+ Paying customers"},{"idx":"06","slug":"seamless-ai","title":"SeamlessAI","subtitle":"AI-Native Enterprise Layer","meta":"Intelligent Systems · SeamlessHR · Jan 2025 – Present","summary":"Established reusable AI interaction patterns for enterprise workflows so teams could ship AI features as a system instead of one-offs.","metrics":"Faster shortlisting · Reduced bias · Reusable AI patterns"},{"idx":"07","slug":"clearprice","title":"ClearPrice","subtitle":"Quote-to-Cash RevOps","meta":"0→1 Systems · Founding Team · Oct 2024 – Jul 2025","summary":"Defined a localised quote-to-cash product for African SaaS operators where global billing tools were a poor fit.","metrics":"0→1 MVP · Pilot soft launch · First localised RevOps"},{"idx":"08","slug":"abms","title":"ABMS","subtitle":"Agency Banking Management System","meta":"Operational Systems · Fets · 2022 – 2024","summary":"Designed the operational backbone for an agency banking network — onboarding, transaction monitoring, and reconciliation across thousands of agents.","metrics":"Multi-tier hierarchy · Real-time monitoring · Unified reconciliation"},{"idx":"09","slug":"blualliance","title":"BluAlliance","subtitle":"Blue-Collar HRM Platform","meta":"0→1 Systems · Gates Foundation × SeamlessHR · Jun 2025 – Present","summary":"Co-led product discovery for Africa’s first HRM platform for the blue-collar workforce — field research across Kenya and Nigeria, journey mapping, and MVP scoping.","metrics":"30+ Interviews · 2 Markets · 0→1 MVP scoped"}];

async function getVar(name) {
  const vars = await figma.variables.getLocalVariablesAsync();
  return vars.find((v) => v.name === name) || null;
}
async function bindSolidFill(node, varName) {
  const variable = await getVar(varName);
  if (!variable) return;
  const base = { type: "SOLID", color: { r: 0, g: 0, b: 0 } };
  node.fills = [figma.variables.setBoundVariableForPaint(base, "color", variable)];
}
async function bindTextFill(text, varName) {
  const variable = await getVar(varName);
  if (!variable) return;
  const base = { type: "SOLID", color: { r: 0, g: 0, b: 0 } };
  text.fills = [figma.variables.setBoundVariableForPaint(base, "color", variable)];
}

await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

function placeBottom(pageNode, pad) {
  let maxY = 0;
  for (const c of pageNode.children) {
    maxY = Math.max(maxY, c.y + c.height);
  }
  return maxY + (pad || 80);
}
const y0 = placeBottom(page, 80);
const colX = 48;

const bodyMain = figma.createComponent();
bodyMain.name = "Mol / Work Index Body";
bodyMain.layoutMode = "VERTICAL";
bodyMain.primaryAxisAlignItems = "MIN";
bodyMain.counterAxisAlignItems = "MIN";
bodyMain.itemSpacing = 8;
bodyMain.layoutSizingHorizontal = "FIXED";
bodyMain.layoutSizingVertical = "HUG";
bodyMain.resize(744, 200);
bodyMain.fills = [];

const kMeta = bodyMain.addComponentProperty("Meta", "TEXT", "Meta");
const kTitle = bodyMain.addComponentProperty("Title", "TEXT", "Title");
const kSub = bodyMain.addComponentProperty("Subtitle", "TEXT", "Sub");
const kSum = bodyMain.addComponentProperty("Summary", "TEXT", "Sum");
const kMet = bodyMain.addComponentProperty("Metrics", "TEXT", "Met");

const meta = figma.createText();
meta.fontSize = 11;
meta.textAutoResize = "HEIGHT";
meta.resize(900, 32);
meta.characters = "Meta";
bodyMain.appendChild(meta);
meta.componentPropertyReferences = { characters: kMeta };
await bindTextFill(meta, "jop/decision/accent/orange");

const title = figma.createText();
title.fontSize = 22;
title.textAutoResize = "HEIGHT";
title.resize(900, 32);
title.characters = "Title";
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
bodyMain.appendChild(title);
title.componentPropertyReferences = { characters: kTitle };
await bindTextFill(title, "jop/decision/text/primary");

const sub = figma.createText();
sub.fontSize = 14;
sub.textAutoResize = "HEIGHT";
sub.resize(900, 24);
sub.characters = "Sub";
bodyMain.appendChild(sub);
sub.componentPropertyReferences = { characters: kSub };
await bindTextFill(sub, "jop/decision/text/muted");

const sum = figma.createText();
sum.fontSize = 14;
sum.textAutoResize = "HEIGHT";
sum.resize(720, 72);
sum.characters = "Sum";
bodyMain.appendChild(sum);
sum.componentPropertyReferences = { characters: kSum };
await bindTextFill(sum, "jop/decision/text/primary");

const met = figma.createText();
met.fontSize = 13;
met.textAutoResize = "HEIGHT";
met.resize(720, 40);
met.characters = "Met";
bodyMain.appendChild(met);
met.componentPropertyReferences = { characters: kMet };
await bindTextFill(met, "jop/decision/text/muted");

bodyMain.x = colX + 1400;
bodyMain.y = y0;
page.appendChild(bodyMain);

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
rowMain.appendChild(idx);
idx.componentPropertyReferences = { characters: kIdx };
await bindTextFill(idx, "jop/decision/text/subtle");

const thumb = figma.createFrame();
thumb.resize(200, 150);
thumb.cornerRadius = 8;
thumb.clipsContent = true;
await bindSolidFill(thumb, "jop/decision/bg/surface-subtle");
const bv = await getVar("jop/decision/border/default");
if (bv) thumb.strokes = [figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", bv)];
thumb.strokeWeight = 1;
rowMain.appendChild(thumb);

const bodyInst = bodyMain.createInstance();
rowMain.appendChild(bodyInst);
bodyInst.layoutGrow = 1;
bodyInst.layoutSizingHorizontal = "FILL";

const ar = figma.createText();
ar.characters = "→";
ar.fontSize = 16;
ar.textAutoResize = "WIDTH_AND_HEIGHT";
rowMain.appendChild(ar);
await bindTextFill(ar, "jop/decision/text/subtle");
rowMain.resize(1192, rowMain.height);

rowMain.x = colX;
rowMain.y = y0;
page.appendChild(rowMain);

const topRule = figma.createRectangle();
topRule.resize(1240, 1);
await bindSolidFill(topRule, "jop/decision/border/default");

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
await bindSolidFill(workPage, "jop/decision/bg/canvas");

const navMatches = page.findAll(
  (n) => n.type === "COMPONENT" && n.name === "Org / Site Nav"
);
const navMain = navMatches[0];
if (!navMain || navMain.type !== "COMPONENT") throw new Error("Run nav script first — Org / Site Nav component");

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
await bindTextFill(lab, "jop/decision/text/muted");
intro.appendChild(lab);
const h1 = figma.createText();
h1.fontSize = 44;
h1.lineHeight = { unit: "PERCENT", value: 110 };
h1.textAutoResize = "HEIGHT";
h1.resize(640, 200);
h1.characters = "Case studies in product systems, not isolated screens.";
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
await bindTextFill(h1, "jop/decision/text/primary");
intro.appendChild(h1);
const dek = figma.createText();
dek.fontSize = 17;
dek.lineHeight = { unit: "PERCENT", value: 160 };
dek.textAutoResize = "HEIGHT";
dek.resize(520, 200);
dek.characters = "I usually come in when the workflow is broken, the platform is fragmented, or the team needs a system it can actually scale.";
await bindTextFill(dek, "jop/decision/text/muted");
intro.appendChild(dek);
workPage.appendChild(intro);

const list = figma.createFrame();
list.name = "Work list";
list.layoutMode = "VERTICAL";
list.itemSpacing = 0;
list.fills = [];
list.layoutSizingHorizontal = "FIXED";
list.layoutSizingVertical = "HUG";
if ("primaryAxisSizingMode" in list) {
  list.primaryAxisSizingMode = "AUTO";
  list.counterAxisSizingMode = "FIXED";
}
list.resize(1240, 80);

list.appendChild(topRule);

function propKey(defs, baseName) {
  if (!defs) return baseName;
  const hit = Object.keys(defs).find((k) => k === baseName || k.startsWith(baseName + "#"));
  return hit || baseName;
}
const rowDefs = rowMain.componentPropertyDefinitions;

const createdNodeIds = [bodyMain.id, rowMain.id, workPage.id, topRule.id, list.id, intro.id, navInst.id];

for (const p of PROJECTS) {
  const inst = rowMain.createInstance();
  inst.setProperties({ [propKey(rowDefs, "Index")]: p.idx });
  const bodyI = inst.findAll(
    (n) => n.type === "INSTANCE" && n.mainComponent && n.mainComponent.name === "Mol / Work Index Body"
  )[0];
  if (!bodyI) throw new Error("Mol / Work Index Body instance missing on row");
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
  await bindSolidFill(r, "jop/decision/border/default");
  list.appendChild(inst);
  list.appendChild(r);
  createdNodeIds.push(inst.id, r.id);
}

workPage.appendChild(list);
workPage.x = colX + 3200;
workPage.y = y0;
page.appendChild(workPage);

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const themeColl = collections.find((c) => c.name === "JOP / Decision / Theme");
if (themeColl) {
  const warm = themeColl.modes.find((m) => m.name === "warm");
  if (warm) workPage.setExplicitVariableModeForCollection(themeColl, warm.modeId);
}

return {
  bodyMainId: bodyMain.id,
  rowMainId: rowMain.id,
  workPageId: workPage.id,
  createdNodeIds,
};
