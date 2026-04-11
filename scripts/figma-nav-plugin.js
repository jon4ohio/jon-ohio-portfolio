
const PAGE_NAME = "JOP · Portfolio components";
const page = figma.root.children.find((p) => p.name === PAGE_NAME);
if (!page) throw new Error("Missing page JOP · Portfolio components");
await figma.setCurrentPageAsync(page);

function walkRename(root, oldName, newName) {
  if (root.name === oldName) root.name = newName;
  if ("children" in root) for (const c of root.children) walkRename(c, oldName, newName);
}
walkRename(page, "Mol / Nav Link", "z_LEGACY Mol / Nav Link");
walkRename(page, "Org / Site Nav", "z_LEGACY Org / Site Nav");

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

const variants = [];
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
  if (state === "active") {
    await bindSolidFill(comp, "jop/decision/bg/surface-subtle");
  } else {
    comp.fills = [];
  }
  const labelKey = comp.addComponentProperty("Label", "TEXT", "Home");
  const t = figma.createText();
  t.fontSize = 14;
  t.textAutoResize = "WIDTH_AND_HEIGHT";
  t.characters = "Home";
  if (state === "active") {
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  } else {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  }
  await bindTextFill(t, state === "active" ? "jop/decision/text/primary" : "jop/decision/text/muted");
  t.componentPropertyReferences = { characters: labelKey };
  comp.appendChild(t);
  comp.x = colX + variants.length * 140;
  comp.y = y0;
  page.appendChild(comp);
  variants.push(comp);
}

const navLinkSet = figma.combineAsVariants(variants, page);
navLinkSet.name = "Mol / Nav Link";
navLinkSet.x = colX;
navLinkSet.y = y0;

const defComp = navLinkSet.children.find((c) => c.name === "state=default");
const actComp = navLinkSet.children.find((c) => c.name === "state=active");

const navOrg = figma.createComponent();
navOrg.name = "Org / Site Nav";
navOrg.layoutMode = "VERTICAL";
navOrg.primaryAxisAlignItems = "MIN";
navOrg.counterAxisAlignItems = "CENTER";
navOrg.itemSpacing = 0;
navOrg.resize(1440, 56);
navOrg.layoutSizingHorizontal = "FIXED";
navOrg.layoutSizingVertical = "FIXED";
await bindSolidFill(navOrg, "jop/decision/bg/canvas");

const brandMain = await figma.getNodeByIdAsync("29363:24234");
const btnMain = await figma.getNodeByIdAsync("29363:24232");
if (!brandMain || brandMain.type !== "COMPONENT") throw new Error("Brand component missing — id 29363:24234");
if (!btnMain || btnMain.type !== "COMPONENT") throw new Error("Button component missing — id 29363:24232");

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
inner.appendChild(brandMain.createInstance());

const links = figma.createFrame();
links.layoutMode = "HORIZONTAL";
links.itemSpacing = 4;
links.fills = [];
const linkSpecs = [
  { label: "Home", active: true },
  { label: "Work", active: false },
  { label: "Leadership", active: false },
  { label: "About", active: false },
];
for (const spec of linkSpecs) {
  const src = spec.active ? actComp : defComp;
  const inst = src.createInstance();
  inst.setProperties({ Label: spec.label });
  links.appendChild(inst);
}
inner.appendChild(links);

const actions = figma.createFrame();
actions.layoutMode = "HORIZONTAL";
actions.itemSpacing = 18;
actions.fills = [];
const themePh = figma.createRectangle();
themePh.resize(24, 24);
themePh.cornerRadius = 6;
await bindSolidFill(themePh, "jop/decision/bg/surface-subtle");
const bv = await getVar("jop/decision/border/default");
if (bv) themePh.strokes = [figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", bv)];
else themePh.strokes = [{ type: "SOLID", color: { r: 0.91, g: 0.91, b: 0.89 } }];
themePh.strokeWeight = 1;
actions.appendChild(themePh);
actions.appendChild(btnMain.createInstance());
inner.appendChild(actions);
navOrg.appendChild(inner);

const rule = figma.createRectangle();
rule.resize(1440, 1);
await bindSolidFill(rule, "jop/decision/border/default");
navOrg.appendChild(rule);
navOrg.x = colX + 1600;
navOrg.y = y0;
page.appendChild(navOrg);

return { navLinkSetId: navLinkSet.id, navOrgId: navOrg.id };
