# Europe's ESG reporting software market after Omnibus I

**Question.** The EU's Omnibus I package cut the number of companies that must report under the Corporate Sustainability Reporting Directive (CSRD) by about 85% to 90%. How big is the European ESG reporting software market now, who still buys, and where can a new entrant win?

**Answer in one line.** The market is worth about €670m in 2028 (inside a €476m to €720m top down range), roughly two thirds smaller than the original CSRD would have made it. About 40% of it now comes from voluntary and supply chain demand from mid sized firms, which is where a new entrant should play.

## Approach

* **Regulation first.** Mapped the final Omnibus I rules (more than 1,000 staff and more than €450m turnover; applies from financial years starting 2027) to the number of reporters: about 6,500 EU companies and 1,200 non EU groups, against about 50,000 and 10,000 before.
* **Top down.** Three published 2025 estimates (Fortune Business Insights, Verdantix, Market Data Forecast) converted to Europe and grown to 2028.
* **Bottom up.** Four segments, each companies x share buying software x annual contract value: mandatory EU, mandatory non EU, voluntary (companies dropped from scope) and value chain (mid sized suppliers).
* **Before and after.** The same build under the original CSRD to size what Omnibus I removed.
* **Sensitivity and scenarios.** Each driver moved alone to its low and high value; full low, base and high scenarios.
* **Entry case.** What share, customer count and acquisition cost a new mid market player would need.

## Key findings

| Segment (2028, base) | Companies | Adoption | Contract value | Market |
|---|---|---|---|---|
| Mandatory EU | 6,500 | 75% | €70k | €341m |
| Mandatory non EU | 1,200 | 75% | €70k | €63m |
| Voluntary | 43,500 | 25% | €20k | €218m |
| Value chain | 240,000 | 5% | €4k | €48m |
| **Total** | | | | **€670m** |

* **Omnibus I removed about 68% of the market** (€2.07bn under the original rules against €0.67bn), and 80% of the mandatory part.
* **Two methods agree.** Bottom up sits 17% above the top down average and inside the range.
* **Demand has shifted.** Mandatory reporters are 60% of spend and are served by Workiva, SAP, Sphera and IBM Envizi. The other 40% is mid market demand with few strong vendors.
* **Contract size is the biggest swing factor** (€195m swing), then voluntary uptake (€174m). Scope estimates matter less, because a wider scope adds mandatory buyers but removes voluntary ones.
* **Consolidation is under way.** Seven acquisitions since September 2025, including osapiens buying Nasdaq Metrio and Position Green buying Greenomy.

## Recommendation

Enter the voluntary mid market with a VSME first product, AI based data collection and a channel through mid tier auditors and banks. At a 3% share of the €266m target segment, an entrant reaches about €8m of ARR by 2030 with roughly 690 customers at €11.6k a year, and can spend up to about €13k to win each one. Plan for a sale to a consolidator.

## Files

```
EsgSoftwareMarketSizing/
  README.md                          this summary
  ESG Software Market Model.xlsx     Dashboard, Inputs, Bottom Up, Before vs After, Top Down, Scenarios,
                                     Sensitivity, Entry Case, Checks (116 formulas, 7 checks)
  ESG Market Entry Deck.pptx         12 slide consulting style deck
  ESG Market Entry Deck.pdf          the same deck as PDF
  Build Guide.md                     how to rebuild it, step by step
  build.py, deck.js, deckkit.js      scripts that generate the workbook and deck
```

## What is an assumption

Reporter counts, enterprise prices and market estimates come from the sources below. Adoption rates, voluntary and value chain contract values, the original scope blended contract value, the 2025 to 2028 growth rate and the EUR/USD rate are **assumptions**, in blue on the Inputs sheet with low, base and high values. Switch the live scenario in Inputs and every sheet updates.

## Sources

* [A&O Shearman: agreement on the CSRD/CS3D Omnibus package](https://www.aoshearman.com/en/insights/agreement-on-the-csrd-cs3d-omnibus-package-key-changes-and-implications)
* [Linklaters: Omnibus I amendments finalised (published 26 Feb 2026, in force 18 Mar 2026)](https://sustainablefutures.linklaters.com/post/102ly34/eu-omnibus-i-csrd-and-cs3d-amendments-finalised-what-do-you-need-to-know)
* [XBRL International: about 6,500 companies remain in scope](https://www.xbrl.org/?p=18578)
* [RSM: waves 2 and 3 fall from about 50,000 to 7,000](https://www.rsm.global/insights/how-will-eu-omnibus-impact-middle-market-businesses)
* [ESG Today: EFRAG, non EU companies from 10,000 to 1,200](https://www.esgtoday.com/?p=24053)
* [ESG Today: osapiens survey, 90% of dropped companies keep reporting](https://www.esgtoday.com/?p=22947)
* [MoFo: revised ESRS cuts mandatory datapoints by 61%](https://www.mofo.com/resources/insights/260513-european-commission-proposes-revised-esrs)
* [Eurostat: about 240,000 medium sized enterprises](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20241025-1)
* [Fortune Business Insights: ESG reporting software market](https://www.fortunebusinessinsights.com/esg-reporting-software-market-109329)
* [Verdantix: sustainability reporting software market size 2025 to 2031](https://www.verdantix.com/venture/report/market-size-and-forecast--sustainability-reporting-software-2025-2031-global)
* [Market Data Forecast: Europe ESG reporting software](https://www.marketdataforecast.com/market-reports/europe-esg-reporting-software-market)
* [knowesg.com: CSRD platform pricing comparison](https://knowesg.com/csrd-compliance)
* [Verdantix: osapiens acquires Nasdaq Metrio](https://www.verdantix.com/insights/blog/osapiens-acquires-nasdaq-metrio-as-the-sustainability-software-market-continues-to-consolidate)
* [Verdantix: Position Green consolidation](https://www.verdantix.com/insights/blog/position-green's-european-consolidation-strategy-points-to-broader-2026-m-a-wave)
* [Tech.eu: Dcycle acquires ESG-X](https://tech.eu/2026/02/09/dcycle-acquires-esg-x-to-scale-sustainability-data-management-in-europe/)
