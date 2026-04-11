const PAGE_NAME = "JOP · Portfolio components";
const page = figma.root.children.find((p) => p.name === PAGE_NAME);
if (!page) throw new Error("Missing page");
await figma.setCurrentPageAsync(page);

const PROJECTS = [{"idx":"01","slug":"seamless-hiring","title":"SeamlessHiring 2.0","subtitle":"Recruitment Management System (RMS)","meta":"Product Systems · SeamlessHR · Mar 2022 – Mar 2025","summary":"Repositioned a broken recruitment add-on into a flagship hiring product by fixing workflow trust, applicant completion, and system value.","metrics":"↓50% Support tickets · 100% Applicant completion · 27→74 NPS"},{"idx":"02","slug":"seamkit","title":"Seamkit","subtitle":"Enterprise Design System","meta":"Organizational Systems · SeamlessHR · Dec 2023 – Present","summary":"Built the operating system that aligned design and engineering across 12 teams, replacing fragmented libraries with one governed source of truth.","metrics":"12 Teams onboarded · 88.9 Adoption · 91.1 Trust"},{"idx":"03","slug":"fetsproza","title":"FetsProza","subtitle":"Infrastructure‑as‑a‑Service (IaaS) Platform","meta":"Operational Systems · Fets · Nigeria · 2021 – 2025","summary":"Designed the in-house transaction infrastructure that replaced an expensive vendor dependency and opened up white-label revenue.","metrics":"$1M+ Saved annually · 2× Transaction capacity · 50% Faster settlement"},{"idx":"04","slug":"ibedc","title":"IBEDC Digital Transformation","subtitle":"Care App + POS System","meta":"Operational Systems · Fets · 2.4M+ customers · 2022 – 2024","summary":"Digitised utility payments and service workflows for millions of customers across consumer app and in-person POS touchpoints.","metrics":"4.6★ Play Store · ↓30% Call-centre · 3 Utilities on POS"},{"idx":"05","slug":"rivva","title":"Rivva","subtitle":"AI Scheduling Platform","meta":"Intelligent Systems · Founding Team · Jul 2025 – Jan 2026","summary":"Shaped the trust layer for an AI scheduling product, translating biometric data into explainable planning people could act on.","metrics":"#4 Product Hunt · 500+ Downloads · 30+ Paying customers"},{"idx":"06","slug":"seamless-ai","title":"SeamlessAI","subtitle":"AI-Native Enterprise Layer","meta":"Intelligent Systems · SeamlessHR · Jan 2025 – Present","summary":"Established reusable AI interaction patterns for enterprise workflows so teams could ship AI features as a system instead of one-offs.","metrics":"Faster shortlisting · Reduced bias · Reusable AI patterns"},{"idx":"07","slug":"clearprice","title":"ClearPrice","subtitle":"Quote-to-Cash RevOps","meta":"0→1 Systems · Founding Team · Oct 2024 – Jul 2025","summary":"Defined a localised quote-to-cash product for African SaaS operators where global billing tools were a poor fit.","metrics":"0→1 MVP · Pilot soft launch · First localised RevOps"},{"idx":"08","slug":"abms","title":"ABMS","subtitle":"Agency Banking Management System","meta":"Operational Systems · Fets · 2022 – 2024","summary":"Designed the operational backbone for an agency banking network — onboarding, transaction monitoring, and reconciliation across thousands of agents.","metrics":"Multi-tier hierarchy · Real-time monitoring · Unified reconciliation"},{"idx":"09","slug":"blualliance","title":"BluAlliance","subtitle":"Blue-Collar HRM Platform","meta":"0→1 Systems · Gates Foundation × SeamlessHR · Jun 2025 – Present","summary":"Co-led product discovery for Africa’s first HRM platform for the blue-collar workforce — field research across Kenya and Nigeria, journey mapping, and MVP scoping.","metrics":"30+ Interviews · 2 Markets · 0→1 MVP scoped"}];

function walkRename(root, oldName, newName) {
  if (root.name === oldName) root.name = newName;
  if ("children" in root) for (const c of root.children) walkRename(c, oldName, newName);
}
for (const p of PROJECTS) {
  walkRename(page, "Page / Case / " + p.slug, "z_LEGACY Page / Case / " + p.slug);
}

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
const gridX = colX + 5200;
let rowY = y0;

const navMatches = page.findAll(
  (n) => n.type === "COMPONENT" && n.name === "Org / Site Nav"
);
const navMain = navMatches[0];
if (!navMain || navMain.type !== "COMPONENT") throw new Error("Org / Site Nav component missing");

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const themeColl = collections.find((c) => c.name === "JOP / Decision / Theme");
const warmMode = themeColl ? themeColl.modes.find((m) => m.name === "warm") : null;

const createdNodeIds = [];
let col = 0;
const maxCols = 2;
const gapX = 80;
const gapY = 80;
const frameW = 1440;
let rowMaxH = 0;

for (const p of PROJECTS) {
  const fr = figma.createFrame();
  fr.name = "Page / Case / " + p.slug;
  fr.layoutMode = "VERTICAL";
  fr.itemSpacing = 0;
  fr.primaryAxisAlignItems = "MIN";
  fr.counterAxisAlignItems = "CENTER";
  fr.layoutSizingHorizontal = "FIXED";
  fr.layoutSizingVertical = "HUG";
  if ("primaryAxisSizingMode" in fr) {
    fr.primaryAxisSizingMode = "AUTO";
    fr.counterAxisSizingMode = "FIXED";
  }
  fr.resize(frameW, 120);
  await bindSolidFill(fr, "jop/decision/bg/canvas");

  const navInst = navMain.createInstance();
  fr.appendChild(navInst);

  const crumb = figma.createFrame();
  crumb.layoutMode = "VERTICAL";
  crumb.paddingLeft = 24;
  crumb.paddingRight = 24;
  crumb.paddingTop = 32;
  crumb.paddingBottom = 0;
  crumb.layoutSizingHorizontal = "FIXED";
  crumb.layoutSizingVertical = "HUG";
  if ("primaryAxisSizingMode" in crumb) crumb.primaryAxisSizingMode = "AUTO";
  crumb.resize(1240, 40);
  crumb.fills = [];
  const crumbT = figma.createText();
  crumbT.fontSize = 13;
  crumbT.textAutoResize = "WIDTH_AND_HEIGHT";
  crumbT.characters = "← Work";
  await bindTextFill(crumbT, "jop/decision/text/muted");
  crumb.appendChild(crumbT);
  fr.appendChild(crumb);

  const hero = figma.createFrame();
  hero.layoutMode = "VERTICAL";
  hero.itemSpacing = 16;
  hero.paddingLeft = 24;
  hero.paddingRight = 24;
  hero.paddingTop = 48;
  hero.paddingBottom = 64;
  hero.layoutSizingHorizontal = "FIXED";
  hero.layoutSizingVertical = "HUG";
  if ("primaryAxisSizingMode" in hero) {
    hero.primaryAxisSizingMode = "AUTO";
    hero.counterAxisSizingMode = "FIXED";
  }
  hero.resize(1240, 120);
  hero.fills = [];

  const metaT = figma.createText();
  metaT.fontSize = 11;
  metaT.textAutoResize = "HEIGHT";
  metaT.resize(1150, 120);
  metaT.characters = p.meta;
  await bindTextFill(metaT, "jop/decision/text/subtle");

  const h1 = figma.createText();
  h1.fontName = { family: "Inter", style: "Semi Bold" };
  h1.fontSize = 48;
  h1.lineHeight = { unit: "PERCENT", value: 105 };
  h1.textAutoResize = "HEIGHT";
  h1.resize(800, 280);
  h1.characters = p.title;
  await bindTextFill(h1, "jop/decision/text/primary");

  const sub = figma.createText();
  sub.fontSize = 20;
  sub.lineHeight = { unit: "PERCENT", value: 150 };
  sub.textAutoResize = "HEIGHT";
  sub.resize(800, 80);
  sub.characters = p.subtitle;
  await bindTextFill(sub, "jop/decision/text/muted");

  const sum = figma.createText();
  sum.fontSize = 18;
  sum.lineHeight = { unit: "PERCENT", value: 170 };
  sum.textAutoResize = "HEIGHT";
  sum.resize(760, 400);
  sum.characters = p.summary;
  await bindTextFill(sum, "jop/decision/text/primary");

  const met = figma.createText();
  met.fontSize = 13;
  met.lineHeight = { unit: "PERCENT", value: 145 };
  met.textAutoResize = "HEIGHT";
  met.resize(900, 120);
  met.characters = p.metrics;
  await bindTextFill(met, "jop/decision/text/muted");

  hero.appendChild(metaT);
  hero.appendChild(h1);
  hero.appendChild(sub);
  hero.appendChild(sum);
  hero.appendChild(met);
  fr.appendChild(hero);

  if (themeColl && warmMode) {
    fr.setExplicitVariableModeForCollection(themeColl, warmMode.modeId);
  }

  fr.x = gridX + col * (frameW + gapX);
  fr.y = rowY;
  page.appendChild(fr);
  createdNodeIds.push(fr.id);

  rowMaxH = Math.max(rowMaxH, fr.height);
  col += 1;
  if (col >= maxCols) {
    rowY += rowMaxH + gapY;
    rowMaxH = 0;
    col = 0;
  }
}

return { casePageCount: PROJECTS.length, createdNodeIds };
