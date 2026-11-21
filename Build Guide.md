# Build guide: ESG reporting software market sizing

Time: two to three evenings. Tools: Excel (or the Python script), PowerPoint.

## Evening 1: the regulation and the inputs

1. Read a law firm summary of the final Omnibus I text (thresholds, timing, voluntary standard).
2. On an **Inputs** sheet, create Low, Base and High columns. Enter in blue, with a source or reason next to each:
   * companies in scope after Omnibus I (EU and non EU) and before it
   * EU medium sized enterprises (Eurostat)
   * adoption rates for each segment
   * annual contract value for each segment
   * three published 2025 market estimates, Europe's share, a growth rate and an exchange rate
3. Add a live scenario cell (Low, Base or High) and `MATCH` it to 1, 2 or 3. Every other sheet reads inputs with `INDEX` on that number.

## Evening 2: build the market two ways

1. **Bottom Up**: one row per segment; market = companies x adoption x contract value. Add share of total and the mandatory against voluntary split.
2. **Top Down**: convert each published estimate to Europe and euros, grow it three years, then take the range and average. Compare with the bottom up total.
3. **Before vs After**: rebuild the mandatory rows with the original scope and an original blended contract value. Show the change by segment.
4. **Scenarios**: the bottom up total for Low, Base and High side by side.
5. **Sensitivity**: move one driver at a time to its low and high value and record the swing. Sort the drivers by swing for the chart.

## Evening 3: the entry case, checks and deck

1. **Entry Case**: target segment size, share by 2030, implied ARR, blended contract value, customers needed and the most it can spend to win a customer.
2. **Checks**: shares add to 100%, live scenario matches the scenario sheet, Low < Base < High, bottom up within 15% of the top down range, Omnibus shrinks the market.
3. Deck: answer first, then regulation, triangulation, segments, before and after, sensitivity, consolidation, where to play, entry case, risks, appendix. Every slide title is a full sentence takeaway with a source line underneath.

## Interview questions to prepare

* Why do the top down figures probably run high?
* Why does the scope estimate matter less than contract value?
* How would you test the 25% voluntary uptake assumption with real data?
* Why recommend the mid market when the mandatory tier is bigger?
