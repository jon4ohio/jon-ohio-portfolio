const PROJECTS = [{"idx":"01","slug":"seamless-hiring","title":"SeamlessHiring 2.0","subtitle":"Recruitment Management System (RMS)","meta":"Product Systems · SeamlessHR · Mar 2022 – Mar 2025","summary":"Repositioned a broken recruitment add-on into a flagship hiring product by fixing workflow trust, applicant completion, and system value.","metrics":"↓50% Support tickets · 100% Applicant completion · 27→74 NPS"},{"idx":"02","slug":"seamkit","title":"Seamkit","subtitle":"Enterprise Design System","meta":"Organizational Systems · SeamlessHR · Dec 2023 – Present","summary":"Built the operating system that aligned design and engineering across 12 teams, replacing fragmented libraries with one governed source of truth.","metrics":"12 Teams onboarded · 88.9 Adoption · 91.1 Trust"},{"idx":"03","slug":"fetsproza","title":"FetsProza","subtitle":"Infrastructure‑as‑a‑Service (IaaS) Platform","meta":"Operational Systems · Fets · Nigeria · 2021 – 2025","summary":"Designed the in-house transaction infrastructure that replaced an expensive vendor dependency and opened up white-label revenue.","metrics":"$1M+ Saved annually · 2× Transaction capacity · 50% Faster settlement"},{"idx":"04","slug":"ibedc","title":"IBEDC Digital Transformation","subtitle":"Care App + POS System","meta":"Operational Systems · Fets · 2.4M+ customers · 2022 – 2024","summary":"Digitised utility payments and service workflows for millions of customers across consumer app and in-person POS touchpoints.","metrics":"4.6★ Play Store · ↓30% Call-centre · 3 Utilities on POS"},{"idx":"05","slug":"rivva","title":"Rivva","subtitle":"AI Scheduling Platform","meta":"Intelligent Systems · Founding Team · Jul 2025 – Jan 2026","summary":"Shaped the trust layer for an AI scheduling product, translating biometric data into explainable planning people could act on.","metrics":"#4 Product Hunt · 500+ Downloads · 30+ Paying customers"},{"idx":"06","slug":"seamless-ai","title":"SeamlessAI","subtitle":"AI-Native Enterprise Layer","meta":"Intelligent Systems · SeamlessHR · Jan 2025 – Present","summary":"Established reusable AI interaction patterns for enterprise workflows so teams could ship AI features as a system instead of one-offs.","metrics":"Faster shortlisting · Reduced bias · Reusable AI patterns"},{"idx":"07","slug":"clearprice","title":"ClearPrice","subtitle":"Quote-to-Cash RevOps","meta":"0→1 Systems · Founding Team · Oct 2024 – Jul 2025","summary":"Defined a localised quote-to-cash product for African SaaS operators where global billing tools were a poor fit.","metrics":"0→1 MVP · Pilot soft launch · First localised RevOps"},{"idx":"08","slug":"abms","title":"ABMS","subtitle":"Agency Banking Management System","meta":"Operational Systems · Fets · 2022 – 2024","summary":"Designed the operational backbone for an agency banking network — onboarding, transaction monitoring, and reconciliation across thousands of agents.","metrics":"Multi-tier hierarchy · Real-time monitoring · Unified reconciliation"},{"idx":"09","slug":"blualliance","title":"BluAlliance","subtitle":"Blue-Collar HRM Platform","meta":"0→1 Systems · Gates Foundation × SeamlessHR · Jun 2025 – Present","summary":"Co-led product discovery for Africa’s first HRM platform for the blue-collar workforce — field research across Kenya and Nigeria, journey mapping, and MVP scoping.","metrics":"30+ Interviews · 2 Markets · 0→1 MVP scoped"}];

const C = {
  canvas: { r: 0.973, g: 0.973, b: 0.965 },
  primary: { r: 0.071, g: 0.071, b: 0.071 },
  muted: { r: 0.435, g: 0.424, b: 0.4 },
  subtle: { r: 0.435, g: 0.424, b: 0.4 },
  border: { r: 0.91, g: 0.906, b: 0.89 },
};

function fillRgb(node, rgb) {
  node.fills = [{ type: "SOLID", color: rgb }];
}
function textRgb(node, rgb) {
  node.fills = [{ type: "SOLID", color: rgb }];
}

const page = figma.currentPage;
await figma.setCurrentPageAsync(page);

await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

const screenStack = page.findAll((n) => n.type === "FRAME" && n.name === "Screens — flush (0px gap)")[0];
const navOrg = page.findAll((n) => n.type === "COMPONENT" && n.name === "Org / Site Nav")[0];
if (!screenStack) throw new Error("Missing screen stack — run greenfield part 1 first");
if (!navOrg) throw new Error("Missing Org / Site Nav");

const created = [];
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
  fr.resize(1440, 120);
  fillRgb(fr, C.canvas);

  fr.appendChild(navOrg.createInstance());

  const crumb = figma.createFrame();
  crumb.layoutMode = "VERTICAL";
  crumb.paddingLeft = 24;
  crumb.paddingRight = 24;
  crumb.paddingTop = 32;
  crumb.paddingBottom = 0;
  crumb.layoutSizingHorizontal = "FIXED";
  crumb.layoutSizingVertical = "HUG";
  if ("primaryAxisSizingMode" in crumb) crumb.primaryAxisSizingMode = "AUTO";
  crumb.resize(1240, 32);
  crumb.fills = [];
  const crumbT = figma.createText();
  crumbT.fontSize = 13;
  crumbT.characters = "← Work";
  crumbT.textAutoResize = "WIDTH_AND_HEIGHT";
  textRgb(crumbT, C.muted);
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
  textRgb(metaT, C.subtle);

  const h1 = figma.createText();
  h1.fontName = { family: "Inter", style: "Semi Bold" };
  h1.fontSize = 48;
  h1.lineHeight = { unit: "PERCENT", value: 105 };
  h1.textAutoResize = "HEIGHT";
  h1.resize(800, 280);
  h1.characters = p.title;
  textRgb(h1, C.primary);

  const sub = figma.createText();
  sub.fontSize = 20;
  sub.lineHeight = { unit: "PERCENT", value: 150 };
  sub.textAutoResize = "HEIGHT";
  sub.resize(800, 100);
  sub.characters = p.subtitle;
  textRgb(sub, C.muted);

  const sum = figma.createText();
  sum.fontSize = 18;
  sum.lineHeight = { unit: "PERCENT", value: 170 };
  sum.textAutoResize = "HEIGHT";
  sum.resize(760, 400);
  sum.characters = p.summary;
  textRgb(sum, C.primary);

  const met = figma.createText();
  met.fontSize = 13;
  met.lineHeight = { unit: "PERCENT", value: 145 };
  met.textAutoResize = "HEIGHT";
  met.resize(900, 120);
  met.characters = p.metrics;
  textRgb(met, C.muted);

  hero.appendChild(metaT);
  hero.appendChild(h1);
  hero.appendChild(sub);
  hero.appendChild(sum);
  hero.appendChild(met);
  fr.appendChild(hero);
  screenStack.appendChild(fr);
  created.push(fr.id);
}

return { casePageCount: PROJECTS.length, createdNodeIds: created, phase: "part2_case_heroes" };
