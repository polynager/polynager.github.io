// Market-level parameters

const demandIntercept = 8;
const demandSlope = -0.008;
const supplySlope = 0.008;

// Market quantities
const marketQuantities = Array.from({length: 100}, (_, i) => i * 1000 / 99);

// Market demand and supply prices
const marketDemandPrice = marketQuantities.map(q => demandIntercept + demandSlope * q);
const marketSupplyPrice = marketQuantities.map(q => supplySlope * q);

// Firm-level quantities
const firmQuantities = Array.from({length: 100}, (_, i) => i * 200 / 99);
const firmDemandPrice = firmQuantities.map(_ => 4); // perfectly elastic at $4

// Plot market-level (left)
const marketTraceDemand = {
    x: marketQuantities,
    y: marketDemandPrice,
    name: "Market Demand",
    line: {color: "orange", dash: "dash"},
    type: "scatter"
};

const marketTraceSupply = {
    x: marketQuantities,
    y: marketSupplyPrice,
    name: "Market Supply",
    line: {color: "green", dash: "dash"},
    type: "scatter"
};

const marketEquilibrium = {
    x: [500],
    y: [4],
    mode: "markers",
    marker: {color: "black", size: 8},
    name: "Market Equilibrium Price ($4)"
};

// Plot firm-level (right)
const firmTrace = {
    x: firmQuantities,
    y: firmDemandPrice,
    name: "Firm Demand (Perfectly Elastic)",
    line: {color: "blue"},
    type: "scatter"
};

// Layout with two subplots side-by-side
const layout = {
    grid: {rows: 1, columns: 2, pattern: 'independent'},
    title: "Market and Firm Demand Curves at Equilibrium Price $4",
    showlegend: true,
    xaxis: {title: "Quantity"},
    yaxis: {title: "Price"},
    xaxis2: {title: "Quantity"},
    yaxis2: {title: "Price"}
};

Plotly.newPlot('market-firm-plot', 
    [ 
      {...marketTraceDemand, xaxis: 'x', yaxis: 'y'}, 
      {...marketTraceSupply, xaxis: 'x', yaxis: 'y'},
      {...marketEquilibrium, xaxis: 'x', yaxis: 'y'},
      {...firmTrace, xaxis: 'x2', yaxis: 'y2'}
    ], 
    layout
);
