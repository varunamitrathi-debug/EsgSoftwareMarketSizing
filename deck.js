const K = require("./deckkit.js");
const THEME = K.makeTheme("ESG Market Case", "1F4D33", "7FA88C");
const { pres, C } = K.start(THEME, "Varun Rathi  |  European ESG reporting software: market sizing case  |  November 2026");
pres.title = "European ESG reporting software after Omnibus I";
const ACC = "1F4D33", ACC2 = "7FA88C", GREY = "BFBFBF";

// 1 Title
pres.addSection({ title: "Answer" });
let s = pres.addSlide({ masterName: "Title Dark", sectionTitle: "Answer" });
s.addText("Europe's ESG reporting software market after Omnibus I", { placeholder: "title" });
s.addText("How big is it now, who still buys, and where can a new entrant win?", { placeholder: "body" });

// 2 Executive summary
s = K.content(pres, "The EU cut the CSRD market by about two thirds, but a €670m market remains and 40% of it sits in the mid market", "Answer",
  "Own analysis in ESG Software Market Model.xlsx; sources listed in the appendix");
K.numbered(s, C, [
  ["Regulation reset", "Omnibus I limits CSRD to companies with more than 1,000 staff and €450m turnover, removing about 85% to 90% of the 50,000 EU companies once in scope."],
  ["Market still worth about €670m in 2028", "A bottom up build (customers x adoption x contract value) lands inside the €476m to €720m range from three published estimates."],
  ["Demand has shifted", "About 60% of spend comes from roughly 7,700 large mandatory reporters, where Workiva, SAP and Sphera are strong. The other 40% is voluntary and supply chain demand from mid sized firms."],
  ["Recommendation", "A new entrant should target the mid market: about 690 customers at €11.6k a year would give €8m of ARR by 2030, with a sale to a consolidator as the likely exit."],
], 0.6, 1.65, 12.1, 1.2);

// 3 Regulation reset
pres.addSection({ title: "Market size" });
s = K.content(pres, "Omnibus I removed about 85% of companies from CSRD scope, leaving only the largest groups", "Market size",
  "Omnibus I Directive (EU) 2026/470, in force 18 March 2026; XBRL International; RSM; EFRAG via ESG Today");
K.stat(s, C, 0.6, 1.7, 3.8, "50,000 → 6,500", "EU companies in scope, original rules against Omnibus I (base estimate)", "EU scope", true, 28);
K.stat(s, C, 4.75, 1.7, 3.8, "10,000 → 1,200", "Non EU groups in scope (EFRAG estimate)", "Non EU scope", false, 28);
K.stat(s, C, 8.9, 1.7, 3.8, "61%", "Fewer mandatory datapoints in the revised ESRS draft (May 2026)", "Datapoints", false);
s.addText("What changed", { x: 0.6, y: 3.9, w: 5.8, h: 0.4, fontSize: 18, bold: true, margin: 0, isTextBox: true });
K.bullets(s, [
  ["New threshold: ", "more than 1,000 employees and more than €450m net turnover, both required"],
  ["Timing: ", "the revised rules apply from financial years starting 1 January 2027"],
  ["Voluntary track: ", "smaller firms can use the VSME standard; large customers can only ask suppliers for VSME level data"],
], { x: 0.6, y: 4.35, w: 5.9, h: 2.1 });
s.addText("So what for software vendors", { x: 6.9, y: 3.9, w: 5.8, h: 0.4, fontSize: 18, bold: true, margin: 0, isTextBox: true });
K.bullets(s, [
  "Mandatory buyers fall from tens of thousands to a few thousand very large groups",
  "Each remaining reporter has fewer datapoints, which caps contract sizes",
  "The question becomes how much voluntary and supply chain demand survives",
], { x: 6.9, y: 4.35, w: 5.8, h: 2.1 });

// 4 Triangulation
s = K.content(pres, "Two independent methods put the 2028 market between €476m and €720m; the bottom up base case is €670m", "Market size",
  "Fortune Business Insights; Verdantix; Market Data Forecast; Europe share 28%; 18% CAGR 2025 to 2028; EUR 0.87 per USD (assumption)");
s.addChart(pres.charts.BAR, [{ name: "2028 market, EUR m", labels: ["Top down A: Fortune", "Top down B: Verdantix", "Top down C: Market Data Forecast", "Bottom up: this model"], values: [528, 720, 476, 670] }],
  K.chartBase(C, THEME, { x: 0.6, y: 1.6, w: 7.6, h: 4.8, barDir: "col", chartColors: [GREY, GREY, GREY, ACC], valAxisHidden: true, valGridLine: { style: "none" }, dataLabelFormatCode: "€#,##0\"m\"", dataLabelPosition: "outEnd", catAxisLabelFontSize: 11, objectName: "Triangulation chart" }));
s.addText("How the two methods work", { x: 8.6, y: 1.7, w: 4.1, h: 0.4, fontSize: 18, bold: true, margin: 0, isTextBox: true });
K.bullets(s, [
  ["Top down: ", "three published 2025 estimates, converted to Europe and grown at 18% a year"],
  ["Bottom up: ", "companies x share buying software x annual contract value, in four segments"],
  ["Check: ", "bottom up sits 17% above the top down average and inside the range"],
  ["Caveat: ", "most published forecasts predate Omnibus I, so the top down figures may run high"],
], { x: 8.6, y: 2.2, w: 4.1, h: 4.2, fontSize: 14 });

// 5 Bottom up by segment
s = K.content(pres, "Large mandatory reporters still bring 60% of spend, but voluntary and supply chain demand is now 40%", "Market size",
  "ESG Software Market Model.xlsx, Bottom Up sheet; adoption and contract values are assumptions shown on the Inputs sheet");
s.addChart(pres.charts.BAR, [{ name: "EUR m", labels: ["Mandatory EU", "Mandatory non EU", "Voluntary (dropped from scope)", "Value chain (mid sized firms)"], values: [341, 63, 218, 48] }],
  K.chartBase(C, THEME, { x: 0.6, y: 1.6, w: 6.6, h: 4.8, barDir: "bar", chartColors: [ACC, ACC, ACC2, ACC2], valAxisHidden: true, valGridLine: { style: "none" }, dataLabelFormatCode: "€#,##0\"m\"", dataLabelPosition: "outEnd", catAxisLabelFontSize: 12, objectName: "Segment chart" }));
const rowsT = [
  ["Segment", "Companies", "Adoption", "ACV"],
  ["Mandatory EU", "6,500", "75%", "€70k"],
  ["Mandatory non EU", "1,200", "75%", "€70k"],
  ["Voluntary", "43,500", "25%", "€20k"],
  ["Value chain", "240,000", "5%", "€4k"],
  ["Total", "28,650 buyers", "", "€670m"],
];
s.addTable(rowsT.map((r, i) => r.map(c => ({ text: c, options: { bold: i === 0 || i === 5, fontSize: 13, color: "1A1A1A", fill: { color: i === 0 ? "F3F4F2" : "FFFFFF" } } }))),
  { x: 7.6, y: 1.8, w: 5.1, colW: [1.8, 1.3, 1.0, 1.0], rowH: 0.45, border: { type: "solid", pt: 0.5, color: "D9D9D9" }, objectName: "Segment table" });
s.addText("The voluntary segment is the swing factor: if one in four of the 43,500 companies dropped from scope keeps paying for software, it is worth about €218m.",
  { x: 7.6, y: 5.0, w: 5.1, h: 1.3, fontSize: 14, italic: true, margin: 0, isTextBox: true, valign: "top" });

// 6 Before vs after
s = K.content(pres, "Against the original CSRD, Omnibus I removed about 68% of the market, and 80% of the mandatory part", "Market size",
  "ESG Software Market Model.xlsx, Before vs After sheet; original scope uses an assumed blended contract value of €40k");
s.addChart(pres.charts.BAR, [
  { name: "Original CSRD", labels: ["Mandatory EU", "Mandatory non EU", "Voluntary", "Value chain"], values: [1500, 525, 0, 48] },
  { name: "After Omnibus I", labels: ["Mandatory EU", "Mandatory non EU", "Voluntary", "Value chain"], values: [341, 63, 218, 48] },
], K.chartBase(C, THEME, { x: 0.6, y: 1.6, w: 7.8, h: 4.8, barDir: "col", barGrouping: "clustered", chartColors: [GREY, ACC], showLegend: true, legendPos: "t", legendFontSize: 12, valAxisHidden: true, valGridLine: { style: "none" }, dataLabelFormatCode: "€#,##0\"m\"", dataLabelPosition: "outEnd", dataLabelFontSize: 11, objectName: "Before after chart" }));
K.stat(s, C, 8.8, 1.7, 3.9, "€2.07bn → €0.67bn", "2028 market, original rules against Omnibus I", "Market change", true, 24);
K.bullets(s, [
  "Vendors that planned for 50,000 compulsory buyers now face a far smaller and more contested pool",
  "Value chain demand barely moves, because large customers still need supplier data",
  "Voluntary reporting is the new segment that did not exist as a choice before",
], { x: 8.8, y: 3.8, w: 3.9, h: 2.6, fontSize: 14 });

// 7 Sensitivity
s = K.content(pres, "Contract size and voluntary uptake move the answer most; scope estimates matter less than expected", "Market size",
  "ESG Software Market Model.xlsx, Sensitivity sheet: each driver set to its low and high input with all else at base");
s.addChart(pres.charts.BAR, [{ name: "Swing EUR m", labels: ["ACV, mandatory EU (€50k to €90k)", "Voluntary uptake (15% to 35%)", "ACV, voluntary (€12k to €28k)", "Adoption, mandatory (65% to 85%)", "EU scope (5,000 to 7,000)", "Value chain uptake (2% to 8%)"], values: [195, 174, 174, 108, 95, 58] }],
  K.chartBase(C, THEME, { x: 0.6, y: 1.6, w: 8.2, h: 4.8, barDir: "bar", chartColors: [ACC], valAxisHidden: true, valGridLine: { style: "none" }, dataLabelFormatCode: "€#,##0\"m\"", dataLabelPosition: "outEnd", catAxisLabelFontSize: 12, catAxisOrientation: "maxMin", objectName: "Sensitivity chart" }));
K.stat(s, C, 9.2, 1.7, 3.5, "€286m to €1.18bn", "Full low to high scenario range for 2028", "Range", false, 24);
s.addText("A wider scope estimate adds mandatory buyers but takes away voluntary ones, so the two partly cancel out. The real uncertainty is how much each sale is worth.",
  { x: 9.2, y: 3.8, w: 3.5, h: 2.4, fontSize: 14, margin: 0, isTextBox: true, valign: "top" });

// 8 Consolidation
pres.addSection({ title: "Where to play" });
s = K.content(pres, "Vendors are consolidating fast: seven deals since September 2025 as point tools lose their reason to exist", "Where to play",
  "Verdantix blogs (Nov 2025, Jan, Apr and Sep 2026); Tech.eu (Feb 2026); Sustainable Tech Partner M&A list");
const deals = [
  ["Date", "Buyer", "Target", "What it signals"],
  ["Sep to Nov 2025", "Position Green", "Morescope, Greenomy, Factlines", "Roll up of Nordic and Benelux reporting tools"],
  ["Jan 2026", "Diginex", "Plan A", "Carbon accounting folds into reporting suites"],
  ["Feb 2026", "Dcycle", "ESG-X", "Spanish platform buys German AI reporting for DACH entry"],
  ["Mar 2026", "Novisto", "Minimum", "Carbon and reporting in one platform"],
  ["Aug 2026", "osapiens", "Nasdaq Metrio", "After a $100m Series C, buys scale in North America"],
];
s.addTable(deals.map((r, i) => r.map(c => ({ text: c, options: { bold: i === 0, fontSize: 13, color: "1A1A1A", fill: { color: i === 0 ? "F3F4F2" : "FFFFFF" } } }))),
  { x: 0.6, y: 1.7, w: 12.1, colW: [1.9, 2.0, 3.3, 4.9], rowH: 0.5, border: { type: "solid", pt: 0.5, color: "D9D9D9" }, objectName: "Deals table" });
s.addText("Read across: buyers pay for customers and data integrations, not features. An entrant should plan to be bought, or to become a buyer, within five years.",
  { x: 0.6, y: 5.3, w: 12.1, h: 0.9, fontSize: 15, italic: true, margin: 0, isTextBox: true, valign: "top" });

// 9 Where to play matrix
s = K.content(pres, "Where to play: the enterprise tier is crowded, the mid market is large enough and open", "Where to play",
  "Own assessment; segment sizes from the bottom up model");
const mx = 0.9, my = 1.75, cw = 3.6, ch = 2.15;
s.addText("Segment size (2028)", { x: mx, y: my + 2 * ch + 0.15, w: 2 * cw, h: 0.35, fontSize: 12, align: "center", color: "4D4D4D", margin: 0, isTextBox: true });
s.addText("Competitive intensity", { x: mx - 0.75, y: my, w: 0.4, h: 2 * ch, fontSize: 12, color: "4D4D4D", margin: 0, isTextBox: true, vert: "vert270", align: "center" });
const cells = [
  [0, 0, "Avoid", "Non EU mandatory (€63m): global suites already own these accounts", "F3F4F2", "1A1A1A"],
  [1, 0, "Partner, do not fight", "EU mandatory (€341m): Workiva, SAP, Sphera, IBM Envizi; long audit led sales", "F3F4F2", "1A1A1A"],
  [0, 1, "Feature, not a business", "Value chain tools (€48m): low price, high volume; best as a free tier", "F3F4F2", "1A1A1A"],
  [1, 1, "Play here", "Voluntary mid market (€218m): many buyers, few strong vendors, lighter ESRS needs", ACC, "FFFFFF"],
];
cells.forEach(([cx, cy, head, body, fill, col], i) => {
  const x = mx + cx * (cw + 0.1), y = my + cy * (ch + 0.1);
  s.addShape("rect", { x, y, w: cw, h: ch, fill: { color: fill }, line: { type: "none" }, objectName: `Matrix cell ${i + 1}` });
  s.addText([{ text: head, options: { bold: true, fontSize: 16, breakLine: true } }, { text: body, options: { fontSize: 13 } }],
    { x: x + 0.2, y: y + 0.15, w: cw - 0.4, h: ch - 0.3, color: col, valign: "top", margin: 0, isTextBox: true, objectName: `Matrix text ${i + 1}` });
});
s.addText("High", { x: mx - 0.4, y: my + 0.1, w: 0.4, h: 0.3, fontSize: 11, color: "8C8C8C", margin: 0, isTextBox: true });
s.addText("Low", { x: mx - 0.4, y: my + 2 * ch - 0.2, w: 0.4, h: 0.3, fontSize: 11, color: "8C8C8C", margin: 0, isTextBox: true });
s.addText("Why the mid market", { x: 8.7, y: 1.75, w: 4.0, h: 0.4, fontSize: 18, bold: true, margin: 0, isTextBox: true });
K.bullets(s, [
  "90% of companies dropped from scope say they will keep or expand reporting (osapiens survey of 400+ executives)",
  "They need banks, investors and large customers to accept their data, not a full ESRS filing",
  "Enterprise suites are priced and built for groups with 1,000+ staff",
], { x: 8.7, y: 2.25, w: 4.0, h: 4.0, fontSize: 14 });

// 10 Entry case
pres.addSection({ title: "Recommendation" });
s = K.content(pres, "A focused entrant can reach about €8m of ARR by 2030 with roughly 690 mid market customers", "Recommendation",
  "ESG Software Market Model.xlsx, Entry Case sheet; 3% share, 75% gross margin and 18 month payback are assumptions");
K.stat(s, C, 0.6, 1.7, 2.85, "€266m", "Target segment, voluntary plus value chain, 2028", "Target", false);
K.stat(s, C, 3.65, 1.7, 2.85, "€8.0m", "ARR at a 3% share by 2030", "ARR", true);
K.stat(s, C, 6.7, 1.7, 2.85, "~690", "Paying customers needed at €11.6k average", "Customers", false);
K.stat(s, C, 9.75, 1.7, 2.95, "€13k", "Most it can spend to win a customer (18 month payback)", "CAC", false);
s.addText("How to win", { x: 0.6, y: 3.85, w: 12, h: 0.4, fontSize: 18, bold: true, margin: 0, isTextBox: true });
K.numbered(s, C, [
  ["VSME first product", "Start from the voluntary standard banks and customers ask for, then grow into ESRS modules."],
  ["AI data collection", "Pull data from invoices, ERP and utilities; this is where mid sized firms lose most hours."],
  ["Sell through auditors and banks", "Partner with mid tier audit firms and lenders instead of building a large direct sales team."],
], 0.6, 4.35, 12.1, 0.75);

// 11 Risks
s = K.content(pres, "Three things would change this answer, and each can be tracked", "Recommendation",
  "Review clause in Omnibus I; revised ESRS consultation (May 2026); Workiva Q2 2025 earnings call");
const risks = [
  ["Scope comes back", "Omnibus I includes a review clause on widening scope. A reversal would grow the mandatory tier and favour enterprise suites.", "Watch: Commission review reports"],
  ["Voluntary demand fades", "Survey intent may not turn into budgets; Workiva saw softer demand in some sustainability segments in 2025.", "Watch: renewal and churn rates in the mid market"],
  ["Price pressure from AI", "AI drafting tools cut the work per report, pushing contract values toward the low case (€12k).", "Watch: list prices of mid market tiers"],
];
risks.forEach(([h, b, w], i) => {
  const x = 0.6 + i * 4.1;
  s.addShape("rect", { x, y: 1.7, w: 3.9, h: 3.3, fill: { color: "F3F4F2" }, line: { type: "none" }, objectName: `Risk card ${i + 1}` });
  s.addText([{ text: h, options: { bold: true, fontSize: 18, breakLine: true } }, { text: " ", options: { fontSize: 8, breakLine: true } }, { text: b, options: { fontSize: 14, breakLine: true } }, { text: " ", options: { fontSize: 8, breakLine: true } }, { text: w, options: { fontSize: 13, italic: true, color: ACC } }],
    { x: x + 0.25, y: 1.95, w: 3.4, h: 2.9, valign: "top", margin: 0, isTextBox: true, objectName: `Risk text ${i + 1}` });
});

s.addText("First test: if voluntary uptake drops from 25% to 15%, the 2028 market falls from €670m to about €583m. The mid market case still holds, but the entrant would need a larger share.",
  { x: 0.6, y: 5.35, w: 12.1, h: 0.9, fontSize: 15, italic: true, margin: 0, isTextBox: true, valign: "top", objectName: "Risk takeaway" });

// 12 Appendix
pres.addSection({ title: "Appendix" });
s = K.content(pres, "Appendix: key inputs and where they come from", "Appendix", null);
const ap = [
  ["Input", "Base", "Source"],
  ["EU companies in scope after Omnibus I", "6,500", "XBRL International (about 6,500); RSM (about 7,000)"],
  ["Non EU groups in scope", "1,200", "EFRAG estimate reported by ESG Today"],
  ["Original EU scope", "50,000", "Widely cited original CSRD estimate"],
  ["EU medium sized enterprises", "240,000", "Eurostat structural business statistics"],
  ["Enterprise CSRD platform price", "€70k a year", "knowesg.com comparison (€20k to €150k); assumption within range"],
  ["Global ESG reporting software 2025", "$1.32bn / $1.8bn", "Fortune Business Insights / Verdantix"],
  ["Europe ESG reporting software 2025", "$333m", "Market Data Forecast"],
  ["Adoption rates and voluntary contract value", "see model", "Assumptions, tested in the Sensitivity sheet"],
];
s.addTable(ap.map((r, i) => r.map(c => ({ text: c, options: { bold: i === 0, fontSize: 12, color: "1A1A1A", fill: { color: i === 0 ? "F3F4F2" : "FFFFFF" } } }))),
  { x: 0.6, y: 1.6, w: 12.1, colW: [4.2, 1.9, 6.0], rowH: 0.45, border: { type: "solid", pt: 0.5, color: "D9D9D9" }, objectName: "Inputs table" });
s.addText("Full source list with links is in the repository README.", { x: 0.6, y: 6.3, w: 12.1, h: 0.4, fontSize: 12, color: "4D4D4D", margin: 0, isTextBox: true });

K.finish(pres, "ESG Market Entry Deck.pptx", THEME).then(() => console.log("done"));
