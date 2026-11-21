// Shared layout kit for the two consulting style decks
const pptxgen = require("pptxgenjs");
// Optional: a helper that writes the palette into the theme XML. Without it the deck
// still builds, using Office's default theme colours for scheme colour references.
let applyTheme = async () => {};
try { ({ applyTheme } = require("./apply theme.js")); } catch (e) { /* optional */ }

function makeTheme(name, accent, accent2) {
  return {
    name,
    headFontFace: "Arial",
    bodyFontFace: "Arial",
    colors: {
      dk1: "1A1A1A", lt1: "FFFFFF", dk2: accent, lt2: "F3F4F2",
      accent1: accent, accent2: accent2, accent3: "8C8C8C", accent4: "BFBFBF",
      accent5: "4D4D4D", accent6: "D9D9D9", hlink: accent, folHlink: "8C8C8C",
    },
  };
}

function start(THEME, footer) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = "Varun Rathi";
  const C = pres.SchemeColor;

  pres.defineSlideMaster({
    title: "Title Dark",
    background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.1, w: 11.7, h: 1.9, fontSize: 40, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.25, w: 11.7, h: 1.2, fontSize: 18, color: C.background1, valign: "top", margin: 0 }, text: "" } },
      { text: { text: footer, options: { x: 0.8, y: 6.7, w: 11.7, h: 0.4, fontSize: 11, color: C.background1, margin: 0 } } },
    ],
  });
  pres.defineSlideMaster({
    title: "Action Title",
    background: { color: C.background1 },
    margin: [0.5, 0.6, 0.7, 0.6],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 1.05, fontSize: 26, bold: true, color: C.text1, valign: "top", align: "left", margin: 0 }, text: "" } },
      { text: { text: footer, options: { x: 0.6, y: 7.05, w: 8, h: 0.3, fontSize: 9, color: C.accent3, margin: 0 } } },
    ],
    slideNumber: { x: 12.3, y: 7.05, w: 0.4, h: 0.3, fontSize: 9, color: C.accent3, align: "right" },
  });
  return { pres, C };
}

function content(pres, title, section, source) {
  const s = pres.addSlide({ masterName: "Action Title", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  if (source) {
    s.addText("Source: " + source, { x: 0.6, y: 6.6, w: 12.1, h: 0.4, fontSize: 9, color: pres.SchemeColor.accent3, margin: 0, isTextBox: true, valign: "bottom", objectName: "Source" });
  }
  return s;
}

function stat(slide, C, x, y, w, big, label, name, dark, size) {
  slide.addShape("rect", { x, y, w, h: 1.85, fill: { color: dark ? C.text2 : C.background2 }, line: { type: "none" }, objectName: name + " card" });
  slide.addText(big, { x: x + 0.25, y: y + 0.15, w: w - 0.5, h: 0.95, fontSize: size || 36, bold: true, color: dark ? C.background1 : C.text2, margin: 0, isTextBox: true, valign: "middle", objectName: name + " number" });
  slide.addText(label, { x: x + 0.25, y: y + 1.1, w: w - 0.5, h: 0.65, fontSize: 13, color: dark ? C.background1 : C.text1, margin: 0, isTextBox: true, valign: "top", objectName: name + " label" });
}

function bullets(slide, items, opts) {
  const runs = items.map((t, i) => {
    const last = i === items.length - 1;
    if (Array.isArray(t)) return [
      { text: t[0], options: { bullet: true, paraSpaceAfter: 8, bold: true } },
      { text: t[1], options: last ? {} : { breakLine: true } },
    ];
    return { text: t, options: last ? { bullet: true, paraSpaceAfter: 8 } : { bullet: true, paraSpaceAfter: 8, breakLine: true } };
  }).flat();
  slide.addText(runs, { fontSize: 15, valign: "top", margin: 0, isTextBox: true, ...opts });
}

function numbered(slide, C, items, x, y, w, rowH) {
  items.forEach((it, i) => {
    const yy = y + i * rowH;
    slide.addShape("ellipse", { x, y: yy + 0.05, w: 0.5, h: 0.5, fill: { color: C.text2 }, line: { type: "none" }, objectName: `Step ${i + 1} marker` });
    slide.addText(String(i + 1), { x, y: yy + 0.05, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: `Step ${i + 1} number` });
    slide.addText([{ text: it[0], options: { bold: true, fontSize: 16, breakLine: true } }, { text: it[1], options: { fontSize: 14 } }],
      { x: x + 0.75, y: yy, w: w - 0.75, h: rowH - 0.1, valign: "top", margin: 0, isTextBox: true, objectName: `Step ${i + 1} text` });
  });
}

function chartBase(C, THEME, extra) {
  return {
    catAxisLabelColor: "4D4D4D", valAxisLabelColor: "4D4D4D",
    catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", dataLabelFontFace: "+mn-lt", titleFontFace: "+mn-lt", legendFontFace: "+mn-lt",
    catAxisLabelFontSize: 12, valAxisLabelFontSize: 11, dataLabelFontSize: 12, dataLabelColor: "1A1A1A",
    valGridLine: { color: "E6E6E6", size: 0.75 }, catGridLine: { style: "none" },
    showValue: true, showLegend: false,
    ...extra,
  };
}

async function finish(pres, file, THEME) {
  await pres.writeFile({ fileName: file });
  await applyTheme(file, THEME);
}

module.exports = { makeTheme, start, content, stat, bullets, numbered, chartBase, finish };
