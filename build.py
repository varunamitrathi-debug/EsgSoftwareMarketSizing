"""Builds the European ESG reporting software market model. Outputs are formulas."""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill
from openpyxl.utils import get_column_letter as L

OUT = "ESG Software Market Model.xlsx"
wb = Workbook()
F = "Arial"
H1 = Font(name=F, bold=True, size=14)
GREY = PatternFill("solid", fgColor="F2F2F2")
PCT = '0.0%;(0.0%);"-"'
EUR = '#,##0;(#,##0);"-"'
EURM = '#,##0.0;(#,##0.0);"-"'
MULT = '0.00x'


def ws_setup(ws, widths):
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[L(i)].width = w
    ws.sheet_view.showGridLines = False


def put(ws, ref, val, kind="n", fmt=None, bold=False, fill=None):
    color = {"n": "000000", "in": "0000FF", "link": "008000"}[kind]
    c = ws[ref]
    c.value = val
    c.font = Font(name=F, color=color, bold=bold)
    if fmt:
        c.number_format = fmt
    if fill:
        c.fill = fill


# ------------------------------------------------------------------ Inputs
inp = wb.active
inp.title = "Inputs"
ws_setup(inp, [52, 13, 13, 13, 80])
put(inp, "A1", "European ESG reporting software market: inputs", bold=True); inp["A1"].font = H1
put(inp, "A2", "Blue = input. Low / Base / High columns feed the scenario sheet. Money in EUR.")
put(inp, "B3", "Low", bold=True); put(inp, "C3", "Base", bold=True); put(inp, "D3", "High", bold=True); put(inp, "E3", "Source or reasoning", bold=True)
I = {}
rows = [
    ("Regulated population", None),
    ("EU companies in CSRD scope after Omnibus I", (5000, 6500, 7000), EUR, "About 85% to 90% fewer than the original ~50,000; XBRL International puts it near 6,500, RSM near 7,000"),
    ("Non EU groups in CSRD scope after Omnibus I", (1000, 1200, 1400), EUR, "EFRAG estimate: about 1,200, down from about 10,000"),
    ("EU companies in original CSRD scope", (50000, 50000, 50000), EUR, "Commonly cited original scope of roughly 50,000 companies"),
    ("Non EU groups in original CSRD scope", (10000, 10000, 10000), EUR, "EFRAG: about 10,000 before Omnibus"),
    ("EU medium sized enterprises (50 to 249 staff)", (240000, 240000, 240000), EUR, "Eurostat structural business statistics: about 240,000"),
    ("Adoption (share buying dedicated software by 2028)", None),
    ("Mandatory reporters", (0.65, 0.75, 0.85), PCT, "Assumption: most reporters use a platform; some stay on spreadsheets plus consultants"),
    ("Companies dropped from scope that keep reporting with software", (0.15, 0.25, 0.35), PCT, "Assumption. osapiens survey: 90% of dropped companies plan to keep or expand reporting; far fewer will pay for software"),
    ("Medium enterprises answering value chain requests with a tool", (0.02, 0.05, 0.08), PCT, "Assumption: VSME standard and customer questionnaires drive light tools"),
    ("Annual contract value (EUR)", None),
    ("Mandatory reporter (EU)", (50000, 70000, 90000), EUR, "Enterprise CSRD platforms list about EUR 20k to 150k a year (knowesg.com comparison); Workiva USD 50k to 150k plus services"),
    ("Mandatory reporter (non EU group)", (50000, 70000, 90000), EUR, "Assumption: same band as EU reporters"),
    ("Voluntary reporter", (12000, 20000, 28000), EUR, "Assumption: mid market tiers; entry CSRD tools start near EUR 11k (Capterra listing)"),
    ("Medium enterprise value chain tool", (2000, 4000, 6000), EUR, "Assumption: SME tools list EUR 2k to 6k a year (Capterra, CFOUR pricing pages)"),
    ("Original scope blended ACV (counterfactual)", (35000, 40000, 50000), EUR, "Assumption: original scope was mostly mid sized firms, so lower average than today's large reporters"),
    ("Top down data (USD)", None),
    ("Global ESG reporting software 2025, source A (USD m)", (1320, 1320, 1320), EUR, "Fortune Business Insights: USD 1.32bn in 2025"),
    ("Global sustainability reporting software 2025, source B (USD m)", (1800, 1800, 1800), EUR, "Verdantix: over USD 1.8bn in 2025"),
    ("Europe share of global market", (0.28, 0.28, 0.28), PCT, "Fortune Business Insights regional split: Europe 28%"),
    ("Europe ESG reporting software 2025, source C (USD m)", (333, 333, 333), EUR, "Market Data Forecast: USD 333m in 2025"),
    ("Market growth 2025 to 2028 (CAGR)", (0.15, 0.18, 0.21), PCT, "Published forecasts range from about 15% to 21% a year"),
    ("EUR per USD", (0.87, 0.87, 0.87), '0.00', "Assumption: about 1.15 USD per EUR"),
]
r = 4
for row in rows:
    lab = row[0]
    if row[1] is None:
        put(inp, f"A{r}", lab, bold=True); r += 1; continue
    vals, fmt, src = row[1], row[2], row[3]
    put(inp, f"A{r}", lab)
    for j, v in enumerate(vals):
        put(inp, f"{L(j+2)}{r}", v, "in", fmt)
    put(inp, f"E{r}", src)
    I[lab] = r
    r += 1

put(inp, f"A{r+1}", "Live scenario (Low, Base or High)", bold=True)
put(inp, f"B{r+1}", "Base", "in", fill=GREY)
put(inp, f"A{r+2}", "Scenario column")
put(inp, f"B{r+2}", f'=MATCH(B{r+1},{{"Low","Base","High"}},0)')
SC = f"Inputs!$B${r+2}"


def v(lab, col=None):
    rr = I[lab]
    if col:
        return f"Inputs!${col}${rr}"
    return f"INDEX(Inputs!$B${rr}:$D${rr},{SC})"


# ------------------------------------------------------------------ Bottom up
bu = wb.create_sheet("Bottom Up")
ws_setup(bu, [44, 14, 12, 14, 16, 12])
put(bu, "A1", "Bottom up: 2028 serviceable market after Omnibus I (live scenario)", bold=True); bu["A1"].font = H1
hdr = ["Segment", "Companies", "Adoption", "ACV (EUR)", "Market (EUR m)", "Share"]
for j, x in enumerate(hdr):
    put(bu, f"{L(j+1)}3", x, bold=True)
segs = [
    ("Mandatory: EU CSRD reporters", v("EU companies in CSRD scope after Omnibus I"), v("Mandatory reporters"), v("Mandatory reporter (EU)")),
    ("Mandatory: non EU groups", v("Non EU groups in CSRD scope after Omnibus I"), v("Mandatory reporters"), v("Mandatory reporter (non EU group)")),
    ("Voluntary: companies dropped from scope",
     f"{v('EU companies in original CSRD scope')}-{v('EU companies in CSRD scope after Omnibus I')}",
     v("Companies dropped from scope that keep reporting with software"), v("Voluntary reporter")),
    ("Value chain: medium enterprises", v("EU medium sized enterprises (50 to 249 staff)"),
     v("Medium enterprises answering value chain requests with a tool"), v("Medium enterprise value chain tool")),
]
for i, (n, c, a, acv) in enumerate(segs):
    rr = 4 + i
    put(bu, f"A{rr}", n)
    put(bu, f"B{rr}", "=" + c, "link", EUR)
    put(bu, f"C{rr}", "=" + a, "link", PCT)
    put(bu, f"D{rr}", "=" + acv, "link", EUR)
    put(bu, f"E{rr}", f"=B{rr}*C{rr}*D{rr}/1000000", fmt=EURM)
    put(bu, f"F{rr}", f"=E{rr}/$E$8", fmt=PCT)
put(bu, "A8", "Total serviceable market 2028", bold=True)
put(bu, "B8", "=SUMPRODUCT(B4:B7,C4:C7)", fmt=EUR, bold=True)
put(bu, "E8", "=SUM(E4:E7)", fmt=EURM, bold=True)
put(bu, "F8", "=SUM(F4:F7)", fmt=PCT, bold=True)
put(bu, "A9", "Paying customers (count)"); put(bu, "B9", "=B8", fmt=EUR)
put(bu, "A10", "Mandatory share of market"); put(bu, "E10", "=(E4+E5)/E8", fmt=PCT, bold=True)
put(bu, "A11", "Voluntary and value chain share"); put(bu, "E11", "=(E6+E7)/E8", fmt=PCT, bold=True)

# ------------------------------------------------------------------ Counterfactual
cf = wb.create_sheet("Before vs After")
ws_setup(cf, [44, 16, 16, 16, 60])
put(cf, "A1", "What Omnibus I did to the market (live scenario, EUR m)", bold=True); cf["A1"].font = H1
for j, x in enumerate(["", "Original CSRD", "After Omnibus I", "Change"]):
    put(cf, f"{L(j+1)}3", x, bold=True)
put(cf, "A4", "Mandatory EU reporters")
put(cf, "B4", f"={v('EU companies in original CSRD scope')}*{v('Mandatory reporters')}*{v('Original scope blended ACV (counterfactual)')}/1000000", fmt=EURM)
put(cf, "C4", "='Bottom Up'!E4", "link", EURM)
put(cf, "A5", "Mandatory non EU groups")
put(cf, "B5", f"={v('Non EU groups in original CSRD scope')}*{v('Mandatory reporters')}*{v('Mandatory reporter (non EU group)')}/1000000", fmt=EURM)
put(cf, "C5", "='Bottom Up'!E5", "link", EURM)
put(cf, "A6", "Voluntary reporters")
put(cf, "B6", 0, "in", EURM)
put(cf, "E6", "Under the original rules these firms were mandatory, so they sit in row 4")
put(cf, "C6", "='Bottom Up'!E6", "link", EURM)
put(cf, "A7", "Value chain: medium enterprises")
put(cf, "B7", "='Bottom Up'!E7", "link", EURM)
put(cf, "E7", "Assumed unchanged: customers still ask suppliers for data")
put(cf, "C7", "='Bottom Up'!E7", "link", EURM)
put(cf, "A8", "Total", bold=True)
put(cf, "B8", "=SUM(B4:B7)", fmt=EURM, bold=True); put(cf, "C8", "=SUM(C4:C7)", fmt=EURM, bold=True)
for rr in range(4, 9):
    put(cf, f"D{rr}", f"=IF(B{rr}=0,\"new\",C{rr}/B{rr}-1)", fmt=PCT)
put(cf, "A10", "Mandatory market lost", bold=True)
put(cf, "D10", "=(C4+C5)/(B4+B5)-1", fmt=PCT, bold=True)
put(cf, "A11", "Total market lost", bold=True)
put(cf, "D11", "=C8/B8-1", fmt=PCT, bold=True)

# ------------------------------------------------------------------ Top down
td = wb.create_sheet("Top Down")
ws_setup(td, [50, 16, 16, 16, 40])
put(td, "A1", "Top down: published estimates rolled to Europe and 2028 (EUR m)", bold=True); td["A1"].font = H1
for j, x in enumerate(["Estimate", "2025 Europe", "2028 Europe"]):
    put(td, f"{L(j+1)}3", x, bold=True)
g = v("Market growth 2025 to 2028 (CAGR)")
fx = v("EUR per USD")
put(td, "A4", "A: Fortune global x Europe share")
put(td, "B4", f"={v('Global ESG reporting software 2025, source A (USD m)')}*{v('Europe share of global market')}*{fx}", fmt=EURM)
put(td, "A5", "B: Verdantix global x Europe share")
put(td, "B5", f"={v('Global sustainability reporting software 2025, source B (USD m)')}*{v('Europe share of global market')}*{fx}", fmt=EURM)
put(td, "A6", "C: Market Data Forecast Europe")
put(td, "B6", f"={v('Europe ESG reporting software 2025, source C (USD m)')}*{fx}", fmt=EURM)
for rr in (4, 5, 6):
    put(td, f"C{rr}", f"=B{rr}*(1+{g})^3", fmt=EURM)
put(td, "A7", "Range low", bold=True); put(td, "C7", "=MIN(C4:C6)", fmt=EURM, bold=True)
put(td, "A8", "Range high", bold=True); put(td, "C8", "=MAX(C4:C6)", fmt=EURM, bold=True)
put(td, "A9", "Average", bold=True); put(td, "C9", "=AVERAGE(C4:C6)", fmt=EURM, bold=True)
put(td, "A11", "Bottom up 2028 (live scenario)", bold=True); put(td, "C11", "='Bottom Up'!E8", "link", EURM, bold=True)
put(td, "A12", "Bottom up vs top down average"); put(td, "C12", "=C11/C9-1", fmt=PCT)
put(td, "A13", "Bottom up inside the top down range?"); put(td, "C13", "=AND(C11>=C7*0.85,C11<=C8*1.15)")
put(td, "E13", "Tolerance of 15% either side of the range")

# ------------------------------------------------------------------ Scenarios (all three columns)
sc = wb.create_sheet("Scenarios")
ws_setup(sc, [44, 14, 14, 14])
put(sc, "A1", "2028 market by scenario (EUR m)", bold=True); sc["A1"].font = H1
for j, x in enumerate(["Segment", "Low", "Base", "High"]):
    put(sc, f"{L(j+1)}3", x, bold=True)


def fx_(lab, col):
    return f"Inputs!${col}${I[lab]}"


for j, col in enumerate(["B", "C", "D"]):
    c = L(j + 2)
    put(sc, f"{c}4", f"={fx_('EU companies in CSRD scope after Omnibus I', col)}*{fx_('Mandatory reporters', col)}*{fx_('Mandatory reporter (EU)', col)}/1000000", fmt=EURM)
    put(sc, f"{c}5", f"={fx_('Non EU groups in CSRD scope after Omnibus I', col)}*{fx_('Mandatory reporters', col)}*{fx_('Mandatory reporter (non EU group)', col)}/1000000", fmt=EURM)
    put(sc, f"{c}6", f"=({fx_('EU companies in original CSRD scope', col)}-{fx_('EU companies in CSRD scope after Omnibus I', col)})*{fx_('Companies dropped from scope that keep reporting with software', col)}*{fx_('Voluntary reporter', col)}/1000000", fmt=EURM)
    put(sc, f"{c}7", f"={fx_('EU medium sized enterprises (50 to 249 staff)', col)}*{fx_('Medium enterprises answering value chain requests with a tool', col)}*{fx_('Medium enterprise value chain tool', col)}/1000000", fmt=EURM)
    put(sc, f"{c}8", f"=SUM({c}4:{c}7)", fmt=EURM, bold=True)
for i, n in enumerate(["Mandatory: EU CSRD reporters", "Mandatory: non EU groups", "Voluntary: companies dropped from scope", "Value chain: medium enterprises"]):
    put(sc, f"A{4+i}", n)
put(sc, "A8", "Total", bold=True)

# ------------------------------------------------------------------ Sensitivity (one at a time, base)
se = wb.create_sheet("Sensitivity")
ws_setup(se, [52, 14, 14, 14])
put(se, "A1", "What moves the base case most? Each driver set to its low and high value alone (EUR m)", bold=True); se["A1"].font = H1
for j, x in enumerate(["Driver", "At low", "At high", "Swing"]):
    put(se, f"{L(j+1)}3", x, bold=True)
base = "Scenarios!$C$8"
drivers = [
    ("Mandatory reporter (EU)", "seg4"),
    ("Companies dropped from scope that keep reporting with software", "seg6"),
    ("Voluntary reporter", "seg6"),
    ("EU companies in CSRD scope after Omnibus I", "both"),
    ("Mandatory reporters", "mand"),
    ("Medium enterprises answering value chain requests with a tool", "seg7"),
]
for i, (lab, kind) in enumerate(drivers):
    rr = 4 + i
    put(se, f"A{rr}", lab)
    for j, col in enumerate(["B", "D"]):
        c = L(j + 2)
        ratio = f"(Inputs!${col}${I[lab]}/Inputs!$C${I[lab]})"
        if kind == "seg4":
            f = f"={base}+Scenarios!$C$4*({ratio}-1)"
        elif kind == "seg6":
            f = f"={base}+Scenarios!$C$6*({ratio}-1)"
        elif kind == "seg7":
            f = f"={base}+Scenarios!$C$7*({ratio}-1)"
        elif kind == "mand":
            f = f"={base}+(Scenarios!$C$4+Scenarios!$C$5)*({ratio}-1)"
        else:  # more in scope also means fewer dropped companies
            delta = f"(Inputs!${col}${I[lab]}-Inputs!$C${I[lab]})"
            f = (f"={base}+{delta}*Inputs!$C${I['Mandatory reporters']}*Inputs!$C${I['Mandatory reporter (EU)']}/1000000"
                 f"-{delta}*Inputs!$C${I['Companies dropped from scope that keep reporting with software']}*Inputs!$C${I['Voluntary reporter']}/1000000")
        put(se, f"{c}{rr}", f, fmt=EURM)
    put(se, f"D{rr}", f"=ABS(C{rr}-B{rr})", fmt=EURM)
put(se, "A11", "Base case", bold=True); put(se, "B11", f"={base}", "link", EURM, bold=True)

# ------------------------------------------------------------------ Entry economics
en = wb.create_sheet("Entry Case")
ws_setup(en, [52, 14, 70])
put(en, "A1", "Illustrative entrant: a European ESG software start up targeting the mid market", bold=True); en["A1"].font = H1
put(en, "A2", "Assumptions are illustrative, to show what share of which segment a new player needs.")
rows2 = [
    ("Target segment market 2028 (voluntary + value chain, EUR m)", "='Bottom Up'!E6+'Bottom Up'!E7", EURM, "n", "Segments where large incumbents are weakest"),
    ("Target share by 2030", 0.03, PCT, "in", "Assumption: 3% of the target segment"),
    ("Implied ARR 2030 (EUR m)", "=B4*B5", EURM, "n", ""),
    ("Blended ACV (EUR)", "=('Bottom Up'!E6+'Bottom Up'!E7)*1000000/('Bottom Up'!B6*'Bottom Up'!C6+'Bottom Up'!B7*'Bottom Up'!C7)", EUR, "n", "Weighted by paying customers in the two segments"),
    ("Customers needed", "=B6*1000000/B7", EUR, "n", ""),
    ("Gross revenue retention", 0.88, PCT, "in", "Assumption for a young mid market SaaS"),
    ("CAC payback target (months)", 18, '0', "in", "Assumption: common mid market SaaS benchmark"),
    ("Max acquisition cost per customer (EUR)", "=B7*0.75*B10/12", EUR, "n", "ACV x 75% gross margin (assumption) x payback months / 12"),
]
for i, (lab, f, fmt, kind, note) in enumerate(rows2):
    rr = 4 + i
    put(en, f"A{rr}", lab)
    put(en, f"B{rr}", f, kind, fmt)
    put(en, f"C{rr}", note)

# ------------------------------------------------------------------ Checks
ck = wb.create_sheet("Checks")
ws_setup(ck, [60, 12])
put(ck, "A1", "Model checks (TRUE = pass)", bold=True); ck["A1"].font = H1
checks = [
    ("Segment shares add to 100%", "=ABS('Bottom Up'!F8-1)<0.0001"),
    ("Live scenario matches the Scenarios sheet", f"=ABS('Bottom Up'!E8-INDEX(Scenarios!B8:D8,{SC}))<0.01"),
    ("Low < Base < High", "=AND(Scenarios!B8<Scenarios!C8,Scenarios!C8<Scenarios!D8)"),
    ("Bottom up within 15% of the top down range", "='Top Down'!C13"),
    ("Omnibus shrinks the market", "='Before vs After'!C8<'Before vs After'!B8"),
    ("Post Omnibus scope smaller than original scope", f"={v('EU companies in CSRD scope after Omnibus I')}<{v('EU companies in original CSRD scope')}"),
    ("Adoption rates between 0 and 100%", "=AND(MIN(Inputs!B11:D13)>=0,MAX(Inputs!B11:D13)<=1)"),
]
for i, (lab, f) in enumerate(checks):
    put(ck, f"A{3+i}", lab); put(ck, f"B{3+i}", f)
put(ck, f"A{4+len(checks)}", "All checks pass", bold=True)
put(ck, f"B{4+len(checks)}", f"=AND(B3:B{2+len(checks)})", bold=True)

# ------------------------------------------------------------------ Dashboard
db = wb.create_sheet("Dashboard", 0)
ws_setup(db, [56, 16, 16, 16])
put(db, "A1", "How big is Europe's ESG reporting software market after the EU cut CSRD scope by about 85%?", bold=True); db["A1"].font = H1
put(db, "A2", "Market sizing case on public data. All money in EUR millions unless stated.")
put(db, "A4", "Live scenario"); put(db, "B4", f"=INDEX(Inputs!B3:D3,{SC})", "link")
put(db, "A5", "Serviceable market 2028, bottom up"); put(db, "B5", "='Bottom Up'!E8", "link", EURM)
put(db, "A6", "Top down range 2028, low"); put(db, "B6", "='Top Down'!C7", "link", EURM)
put(db, "A7", "Top down range 2028, high"); put(db, "B7", "='Top Down'!C8", "link", EURM)
put(db, "A8", "Market under the original CSRD (counterfactual)"); put(db, "B8", "='Before vs After'!B8", "link", EURM)
put(db, "A9", "Market lost to Omnibus I"); put(db, "B9", "='Before vs After'!D11", "link", PCT)
put(db, "A10", "Mandatory reporters share of the new market"); put(db, "B10", "='Bottom Up'!E10", "link", PCT)
put(db, "A11", "Voluntary and value chain share"); put(db, "B11", "='Bottom Up'!E11", "link", PCT)
put(db, "A13", "Scenario range", bold=True)
put(db, "B13", "Low", bold=True); put(db, "C13", "Base", bold=True); put(db, "D13", "High", bold=True)
put(db, "A14", "2028 market")
for j, c in enumerate(["B", "C", "D"]):
    put(db, f"{c}14", f"=Scenarios!{c}8", "link", EURM)
put(db, "A16", "Entrant: ARR at 3% of the mid market by 2030"); put(db, "B16", "='Entry Case'!B6", "link", EURM)
put(db, "A17", "Entrant: customers needed"); put(db, "B17", "='Entry Case'!B8", "link", EUR)
put(db, "A18", "All model checks pass"); put(db, "B18", f"=Checks!B{4+len(checks)}", "link")

wb.save(OUT)
print("saved", I)
